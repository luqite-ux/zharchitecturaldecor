import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const tenantId = '831d7976-d1b4-4f3d-b09c-1b2448c1e86b'
const adminRoot = 'D:/Cursor/Grand/huanqiu-admin'
for (const relative of ['.env', '.env.local', '_migrate-batch/.env']) {
  try {
    for (const line of readFileSync(path.join(adminRoot, relative), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
      if (match) process.env[match[1]] ??= match[2].trim().replace(/^['"]|['"]$/g, '')
    }
  } catch { /* optional environment source */ }
}
const required = (key) => {
  if (!process.env[key]) throw new Error(`Missing ${key}`)
  return process.env[key]
}
const mode = process.argv[2]
const manifestPath = path.resolve('deliverables/customer-feedback-20261124-media.json')
const selected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 26, 27, 28, 29, 30, 31]

if (mode === 'upload') {
  const sourceDir = process.argv[3]
  if (!sourceDir) throw new Error('Usage: node scripts/apply-feedback-20261124.mjs upload <extracted-xl-media-directory>')
  const s3 = new S3Client({
    region: 'auto', endpoint: required('R2_S3_ENDPOINT'),
    requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED',
    credentials: { accessKeyId: required('R2_ACCESS_KEY_ID'), secretAccessKey: required('R2_SECRET_ACCESS_KEY') },
  })
  const bucket = process.env.R2_BUCKET_NAME || 'sscewebsite'
  const base = (process.env.R2_PUBLIC_URL || required('R2_PUBLIC_URL_PREFIX')).replace(/\/$/, '')
  const media = {}
  for (const number of selected) {
    const name = [path.join(sourceDir, `image${number}.png`), path.join(sourceDir, `image${number}.jpeg`)].find((p) => {
      try { readFileSync(p); return true } catch { return false }
    })
    if (!name) throw new Error(`Missing workbook image ${number}`)
    const bytes = readFileSync(name)
    const sha256 = createHash('sha256').update(bytes).digest('hex')
    const extension = path.extname(name).toLowerCase()
    const key = `tenants/zharchitecturaldecor/customer-feedback-20261124/image${number}-${sha256.slice(0, 20)}${extension}`
    await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes,
      ContentType: extension === '.png' ? 'image/png' : 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable' }))
    media[`image${number}`] = { source: name, sha256, bytes: bytes.length, url: `${base}/${key}` }
  }
  writeFileSync(manifestPath, JSON.stringify({ tenantId, source: '2026.11.24-正辉补充资料和细节调整.rar / 幕墙线条综合图片.xlsx', media }, null, 2) + '\n')
  console.log(JSON.stringify({ uploaded: Object.keys(media).length, manifestPath }))
} else if (mode === 'apply-db') {
  const db = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (manifest.tenantId !== tenantId) throw new Error('Manifest tenant mismatch')
  const { data, error } = await db.from('products').select('id,tenant_id,slug,image_url,extra_data')
    .eq('tenant_id', tenantId).in('slug', ['eps-decorative-mouldings', 'grc-architectural-elements', 'grg-interior-elements'])
  if (error) throw error
  if (data?.length !== 3 || data.some((row) => row.tenant_id !== tenantId)) throw new Error('Target product set mismatch')
  const expected = {
    'eps-decorative-mouldings': { length: 9, remove: [2, 4, 8], add: [29] },
    'grc-architectural-elements': { length: 16, remove: [1], add: [] },
    'grg-interior-elements': { length: 12, remove: [1, 12], add: [30, 31] },
  }
  const snapshot = data.map(({ id, slug, image_url, extra_data }) => ({ id, slug, image_url, extra_data }))
  writeFileSync(path.resolve('deliverables/customer-feedback-20261124-before-db.json'), JSON.stringify({ tenantId, snapshot }, null, 2) + '\n')
  for (const row of data) {
    const spec = expected[row.slug]
    const images = row.extra_data?.images
    if (!Array.isArray(images) || images.length !== spec.length || images[0] !== row.image_url ||
      images.some((url, index) => !url.includes(`/products/${tenantId}/optimized-20261118/${row.slug}/${index + 1}.jpg`))) {
      throw new Error(`Unexpected source gallery: ${row.slug}`)
    }
  }
  for (const row of data) {
    const spec = expected[row.slug]
    const images = row.extra_data.images.filter((_, index) => !spec.remove.includes(index + 1))
    images.push(...spec.add.map((number) => manifest.media[`image${number}`]?.url))
    if (images.some((url) => !url)) throw new Error(`Missing uploaded image: ${row.slug}`)
    const image_url = images[0]
    const extra_data = { ...row.extra_data, images }
    const updated = await db.from('products').update({ image_url, extra_data }).eq('tenant_id', tenantId).eq('id', row.id).select('id,image_url,extra_data').single()
    if (updated.error) throw updated.error
    if (updated.data.image_url !== image_url || JSON.stringify(updated.data.extra_data.images) !== JSON.stringify(images)) {
      throw new Error(`Readback mismatch: ${row.slug}`)
    }
    console.log(JSON.stringify({ slug: row.slug, galleryCount: images.length, image_url }))
  }
} else {
  throw new Error('Mode must be upload or apply-db')
}
