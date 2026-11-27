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
const manifestPath = path.resolve('deliverables/customer-feedback-20261127-media.json')

if (mode === 'upload') {
  const sourceFile = process.argv[3]
  if (!sourceFile) throw new Error('Usage: node scripts/apply-feedback-20261127.mjs upload <jiangyin-image-path>')
  const bytes = readFileSync(sourceFile)
  const sha256 = createHash('sha256').update(bytes).digest('hex')
  const ext = path.extname(sourceFile).toLowerCase() || '.png'
  const key = `tenants/zharchitecturaldecor/customer-feedback-20261127/jiangyin-tunnel-toll-station-${sha256.slice(0, 20)}${ext}`
  const s3 = new S3Client({
    region: 'auto',
    endpoint: required('R2_S3_ENDPOINT'),
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
    credentials: { accessKeyId: required('R2_ACCESS_KEY_ID'), secretAccessKey: required('R2_SECRET_ACCESS_KEY') },
  })
  const bucket = process.env.R2_BUCKET_NAME || 'sscewebsite'
  const base = (process.env.R2_PUBLIC_URL || required('R2_PUBLIC_URL_PREFIX')).replace(/\/$/, '')
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: bytes,
    ContentType: ext === '.png' ? 'image/png' : 'image/jpeg',
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  const url = `${base}/${key}`
  const manifest = {
    tenantId,
    source: '20261127新添加幕墙线条综合图片.xlsx (Row 14, No. 11 江阴隧道收费站)',
    media: {
      jiangyinTunnelTollStation: { source: sourceFile, sha256, bytes: bytes.length, key, url },
    },
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  const head = await fetch(url, { method: 'HEAD' })
  console.log(JSON.stringify({ uploaded: true, status: head.status, contentType: head.headers.get('content-type'), url }))
  if (!head.ok) throw new Error(`R2 public readback failed: ${head.status}`)
} else if (mode === 'apply-db' || mode === 'dry-run-db') {
  const db = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
  const { data, error } = await db
    .from('products')
    .select('id,tenant_id,slug,image_url,extra_data')
    .eq('tenant_id', tenantId)
    .eq('slug', 'grc-architectural-elements')
    .single()
  if (error) throw error
  if (!data || data.tenant_id !== tenantId) throw new Error('Tenant/product mismatch')

  const currentImages = Array.isArray(data.extra_data?.images) ? data.extra_data.images : []
  const targetCover = currentImages.find((u) => u.endsWith('/grc-architectural-elements/9.jpg'))
  if (!targetCover) throw new Error('Target cover 9.jpg not found in current GRC gallery')

  const filtered = currentImages.filter((u) => !u.endsWith('/grc-architectural-elements/7.jpg') && u !== targetCover)
  const nextImages = [targetCover, ...filtered]

  console.log(JSON.stringify({
    mode,
    tenantId,
    slug: data.slug,
    beforeCover: data.image_url,
    afterCover: targetCover,
    beforeCount: currentImages.length,
    afterCount: nextImages.length,
    removed7: currentImages.some((u) => u.endsWith('/grc-architectural-elements/7.jpg')) && !nextImages.some((u) => u.endsWith('/grc-architectural-elements/7.jpg')),
  }, null, 2))

  if (mode === 'apply-db') {
    writeFileSync(
      path.resolve('deliverables/customer-feedback-20261127-before-db.json'),
      JSON.stringify({ tenantId, row: data }, null, 2) + '\n',
    )
    const nextExtra = { ...data.extra_data, images: nextImages }
    const updated = await db
      .from('products')
      .update({ image_url: targetCover, extra_data: nextExtra })
      .eq('tenant_id', tenantId)
      .eq('id', data.id)
      .eq('slug', 'grc-architectural-elements')
      .select('id,tenant_id,slug,image_url,extra_data')
      .single()
    if (updated.error) throw updated.error
    const rb = updated.data
    if (
      rb.tenant_id !== tenantId ||
      rb.image_url !== targetCover ||
      rb.extra_data.images[0] !== targetCover ||
      rb.extra_data.images.some((u) => u.endsWith('/grc-architectural-elements/7.jpg')) ||
      rb.extra_data.images.length !== nextImages.length
    ) {
      throw new Error('Readback verification failed')
    }
    console.log(JSON.stringify({ applied: true, readbackCover: rb.image_url, readbackCount: rb.extra_data.images.length }))
  }
} else {
  throw new Error('Usage: node scripts/apply-feedback-20261127.mjs <upload|dry-run-db|apply-db>')
}
