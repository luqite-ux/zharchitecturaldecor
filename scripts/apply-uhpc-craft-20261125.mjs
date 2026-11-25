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
if (manifest.tenantId !== tenantId) throw new Error('Media manifest tenant mismatch')
const images = [5, 8, 14, 15].map((number) => manifest.media[`image${number}`]?.url)
if (images.some((url) => !url?.includes('/tenants/zharchitecturaldecor/customer-feedback-20261124/'))) {
  throw new Error('Missing tenant media')
}
const [craftImage, uhpcImage, outdoorImage, workshopImage] = images
const { data, error } = await db.from('products').select('*').eq('tenant_id', tenantId)
  .in('slug', ['uhpc-custom-components', 'cement-texture-design-objects'])
if (error) throw error
if (data?.length !== 2) throw new Error('Expected exactly two existing customer products')
const uhpc = data.find((row) => row.slug === 'uhpc-custom-components')
const craft = data.find((row) => row.slug === 'cement-texture-design-objects')
if (uhpc.category_slug !== 'uhpc-curtain-wall' || craft.category_slug !== 'cement-craft-ornaments') {
  throw new Error('Product category ownership mismatch')
}

const uhpcName = 'UHPC Curtain Wall Panels'
const uhpcDescription = 'UHPC curtain wall panels are project-specific facade components made from ultra-high performance concrete. Panel geometry, dimensions, surface finish and connection details are reviewed against the project drawings before production.'
const uhpcFeatures = [
  'Panel geometry developed from project drawings',
  'Surface texture and finish reviewed for each project',
  'Dimensions and connection details confirmed during technical review',
]
const craftName = 'Cement Craft Ornaments'
const craftDescription = 'The supplied craft collection includes sculptural objects for interior display and large planters shown in outdoor and workshop photos. Final shape, dimensions and surface finish are confirmed against the design reference for each order.'
const craftFeatures = [
  'Sculptural objects and functional planters in the supplied collection',
  'Indoor display and outdoor landscape references',
  'Shape and finish reviewed against the customer design reference',
]
const updates = [
  {
    row: uhpc,
    fields: {
      name: uhpcName, name_en: uhpcName, name_i18n: { ...uhpc.name_i18n, en: uhpcName },
      description: uhpcDescription, description_en: uhpcDescription, description_i18n: { ...uhpc.description_i18n, en: uhpcDescription },
      overview: uhpcDescription, overview_en: uhpcDescription, overview_i18n: { ...uhpc.overview_i18n, en: uhpcDescription },
      category: 'UHPC Curtain Wall', image_url: uhpcImage, is_active: true, sort_order: 0,
      features: uhpcFeatures, features_i18n: { ...uhpc.features_i18n, en: uhpcFeatures },
      applications: ['Exterior facades', 'Architectural feature walls'],
      applications_i18n: { ...uhpc.applications_i18n, en: ['Exterior facades', 'Architectural feature walls'] },
      specs: { 'Design input': 'Project drawings', 'Dimensions and connection details': 'Confirmed during technical review' },
      extra_data: { ...uhpc.extra_data, images: [uhpcImage], source: '2026-11-24 customer workbook image 8; 2026-11-25 customer-approved AI introduction, edited to remove unverified performance claims',
        seo_title_i18n: { ...uhpc.extra_data?.seo_title_i18n, en: `${uhpcName} | Zhenghui` },
        seo_description_i18n: { ...uhpc.extra_data?.seo_description_i18n, en: uhpcDescription } },
    },
  },
  {
    row: craft,
    fields: {
      name: craftName, name_en: craftName, name_i18n: { ...craft.name_i18n, en: craftName },
      description: craftDescription, description_en: craftDescription, description_i18n: { ...craft.description_i18n, en: craftDescription },
      overview: craftDescription, overview_en: craftDescription, overview_i18n: { ...craft.overview_i18n, en: craftDescription },
      category: 'Craft Ornaments', image_url: craftImage,
      features: craftFeatures, features_i18n: { ...craft.features_i18n, en: craftFeatures },
      applications: ['Interior display', 'Outdoor planters'],
      applications_i18n: { ...craft.applications_i18n, en: ['Interior display', 'Outdoor planters'] },
      extra_data: { ...craft.extra_data, images: [craftImage, outdoorImage, workshopImage],
        source: '2026-11-24 customer workbook row 8 images 5, 14 and 15; no named project case supplied',
        seo_title_i18n: { ...craft.extra_data?.seo_title_i18n, en: `${craftName} | Zhenghui` },
        seo_description_i18n: { ...craft.extra_data?.seo_description_i18n, en: craftDescription } },
    },
  },
]
console.log(JSON.stringify({ mode: process.argv[2] === '--apply' ? 'apply' : 'dry-run', tenantId,
  changes: updates.map(({ row, fields }) => ({ slug: row.slug, activeBefore: row.is_active, activeAfter: fields.is_active ?? row.is_active,
    oldImage: row.image_url, newImage: fields.image_url, galleryCount: fields.extra_data.images.length })) }))
if (process.argv[2] === '--apply') {
  const snapshotPath = path.resolve('deliverables/customer-feedback-20261125-before-db.json')
  writeFileSync(snapshotPath, JSON.stringify({ tenantId, rows: data }, null, 2) + '\n')
  for (const { row, fields } of updates) {
    const result = await db.from('products').update(fields).eq('tenant_id', tenantId).eq('id', row.id).eq('slug', row.slug)
      .select('id,tenant_id,slug,name_i18n,description_i18n,image_url,is_active,extra_data').single()
    if (result.error) throw result.error
    if (result.data.tenant_id !== tenantId || result.data.image_url !== fields.image_url ||
      result.data.is_active !== (fields.is_active ?? row.is_active) ||
      JSON.stringify(result.data.extra_data.images) !== JSON.stringify(fields.extra_data.images)) {
      throw new Error(`Readback mismatch: ${row.slug}`)
    }
    console.log(JSON.stringify({ slug: row.slug, id: row.id, active: result.data.is_active, galleryCount: result.data.extra_data.images.length }))
  }
}
