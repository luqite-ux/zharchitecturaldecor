import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

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
const db = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
const manifest = JSON.parse(readFileSync(path.resolve('deliverables/customer-feedback-20261124-media.json'), 'utf8'))
if (manifest.tenantId !== tenantId) throw new Error('Tenant mismatch')
const media = (number) => {
  const url = manifest.media[`image${number}`]?.url
  if (!url?.includes('/tenants/zharchitecturaldecor/customer-feedback-20261124/')) throw new Error(`Missing image ${number}`)
  return url
}
const additions = {
  'uhpc-custom-components': [9, 10, 1, 7, 11, 12],
  'eps-decorative-mouldings': [20],
  'grg-interior-elements': [13, 16],
}
const { data, error } = await db.from('products').select('id,tenant_id,slug,image_url,extra_data')
  .eq('tenant_id', tenantId).in('slug', Object.keys(additions))
if (error) throw error
if (data?.length !== 3 || data.some((row) => row.tenant_id !== tenantId)) throw new Error('Target products mismatch')
const updates = data.map((row) => {
  if (!Array.isArray(row.extra_data?.images) || row.extra_data.images[0] !== row.image_url) {
    throw new Error(`Unexpected current gallery: ${row.slug}`)
  }
  const images = [...row.extra_data.images]
  for (const number of additions[row.slug]) {
    const url = media(number)
    if (!images.includes(url)) images.push(url)
  }
  return { row, images }
})
console.log(JSON.stringify({ mode: process.argv[2] === '--apply' ? 'apply' : 'dry-run', tenantId,
  changes: updates.map(({ row, images }) => ({ slug: row.slug, before: row.extra_data.images.length, after: images.length })) }))
if (process.argv[2] === '--apply') {
  writeFileSync(path.resolve('deliverables/customer-feedback-20261125-additional-before-db.json'),
    JSON.stringify({ tenantId, rows: data }, null, 2) + '\n')
  for (const { row, images } of updates) {
    const extra_data = { ...row.extra_data, images }
    const result = await db.from('products').update({ extra_data }).eq('tenant_id', tenantId).eq('id', row.id).eq('slug', row.slug)
      .select('id,tenant_id,slug,image_url,extra_data').single()
    if (result.error) throw result.error
    if (result.data.tenant_id !== tenantId || result.data.image_url !== row.image_url ||
      JSON.stringify(result.data.extra_data.images) !== JSON.stringify(images)) throw new Error(`Readback mismatch: ${row.slug}`)
    console.log(JSON.stringify({ slug: row.slug, galleryCount: images.length }))
  }
}
