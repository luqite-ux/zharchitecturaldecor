import { createClient } from '@supabase/supabase-js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import bcrypt from 'bcryptjs'
import { createHash, randomUUID } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const adminRoot = 'D:\\Cursor\\Grand\\huanqiu-admin'
for (const relative of ['.env', '.env.local', '_migrate-batch/.env']) {
  const file = path.join(adminRoot, relative)
  if (!existsSync(file)) continue
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.trim().match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!match) continue
    let value = match[2].trim()
    if (/^['"]/.test(value)) value = value.slice(1, -1)
    process.env[match[1]] ??= value
  }
}
const need = (key) => { if (!process.env[key]) throw new Error(`Missing ${key}`); return process.env[key] }
const db = createClient(need('NEXT_PUBLIC_SUPABASE_URL'), need('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false } })
const s3 = new S3Client({ region: 'auto', endpoint: need('R2_S3_ENDPOINT'), requestChecksumCalculation: 'WHEN_REQUIRED', responseChecksumValidation: 'WHEN_REQUIRED', credentials: { accessKeyId: need('R2_ACCESS_KEY_ID'), secretAccessKey: need('R2_SECRET_ACCESS_KEY') } })
const bucket = process.env.R2_BUCKET_NAME || 'sscewebsite'
const publicBase = (process.env.R2_PUBLIC_URL || need('R2_PUBLIC_URL_PREFIX')).replace(/\/$/, '')
const root = 'D:\\Cursor\\Grand\\dulizhan\\zharchitecturaldecor'
const taskId = '648889b1-6031-4c67-95af-1a49d8c7af95'
const initialPassword = need('ADMIN_INITIAL_PASSWORD')

async function upload(file, group) {
  const bytes = readFileSync(file)
  const hash = createHash('sha256').update(bytes).digest('hex')
  const ext = path.extname(file).toLowerCase()
  const key = `tenants/zharchitecturaldecor/${group}/${hash.slice(0, 20)}${ext}`
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: ext === '.png' ? 'image/png' : 'image/jpeg', CacheControl: 'public, max-age=31536000, immutable' }))
  return `${publicBase}/${key}`
}

async function uploadDir(relative, group) {
  const directory = path.join(root, relative)
  const files = readdirSync(directory).filter((name) => /\.(?:png|jpe?g)$/i.test(name)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  const output = []
  for (const name of files) output.push(await upload(path.join(directory, name), `${group}/${String(output.length + 1).padStart(2, '0')}`))
  return output
}

const assets = {
  logo: await upload(path.join(root, 'public/images/brand/zhenghui-logo.png'), 'brand'),
  banners: await uploadDir('public/images/banners', 'banners'),
  eps: await uploadDir('public/images/source/products/eps', 'products/eps'),
  grc: await uploadDir('public/images/source/products/grc', 'products/grc'),
  grg: await uploadDir('public/images/source/products/grg', 'products/grg'),
  cement: await uploadDir('public/images/source/products/cement-design', 'products/cement-design'),
  samples: await uploadDir('public/images/source/products/samples', 'products/samples'),
  factory: await uploadDir('public/images/source/factory', 'factory'),
  projects: await uploadDir('public/images/source/projects', 'projects'),
  technical: await uploadDir('public/images/source/technical', 'technical'),
}

const categories = [
  ['architectural-decorative-elements', 'Architectural Decorative Elements'],
  ['custom-design-objects', 'Custom Design Objects'],
]
const productRows = [
  ['eps-decorative-mouldings','EPS Decorative Mouldings','architectural-decorative-elements','Profiled EPS mouldings for cornices, bands and façade lines.','EPS',assets.eps,{ 'Monthly capacity':'20,000 m', 'Profile geometry':'Produced from customer drawings' }],
  ['grc-architectural-elements','GRC Architectural Decorative Elements','architectural-decorative-elements','Project-specific GRC window surrounds, arches, cornices and ornamental façade components.','GRC',assets.grc,{ 'Monthly GRC / UHPC capacity':'12,000 m²', 'Production basis':'Project elevation and detail drawings' }],
  ['grg-interior-elements','GRG Interior Decorative Elements','architectural-decorative-elements','GRG columns, relief panels and ornamental components for interior public spaces.','GRG',assets.grg,{ 'Monthly capacity':'5,000 m²', 'Production basis':'Interior design reference and drawings' }],
  ['cement-texture-design-objects','Cement-Texture Design Objects','custom-design-objects','Cement-textured sculptural and functional objects developed with engraving and 3D-printing support.','Custom',assets.cement,{ 'Development input':'Reference image, drawing or 3D file', 'Final dimensions':'Confirmed during RFQ' }],
]

const domain = 'zharchitecturaldecor.com'
const email = 'info@zharchitecturaldecor.com'
const existing = await db.from('tenants').select('id').eq('domain', domain).maybeSingle()
if (existing.error) throw existing.error
const tenantId = existing.data?.id || randomUUID()
const now = new Date().toISOString()
const tenantPayload = {
  id: tenantId, name: 'zharchitecturaldecor', display_name: '安徽正辉装饰材料有限公司', domain, email,
  password_hash: await bcrypt.hash(initialPassword, 12), admin_group: null, brand_color: '#B44D25', logo_url: assets.logo, favicon_url: assets.logo,
  default_language: 'en', supported_languages: ['en'], contact_email: email, public_contact_email: email, inquiry_notification_email: email,
  contact_phone: '+86 135 8512 6655', contact_whatsapp: '', contact_address_short: 'Tianchang, Anhui, China',
  contact_address_i18n: { en: 'Shibaji Community, Shiliang Town, Tianchang, Anhui, China', zh: '安徽省天长市石梁镇十八集街道' },
  site_title_i18n: { en: 'Anhui Zhenghui Decorative Materials Co., Ltd.' },
  site_tagline_i18n: { en: 'Architectural Decorative Elements and Custom Components' },
  site_description_i18n: { en: 'Architectural decorative elements and custom GRC, GRG, EPS and UHPC components manufactured in Tianchang, Anhui.' },
  seo_title_i18n: { en: 'Architectural Decorative Elements | Zhenghui' },
  seo_description_i18n: { en: 'Explore EPS, GRC, GRG and UHPC architectural components from Anhui Zhenghui.' },
  seo_keywords_i18n: { en: ['architectural decorative elements','GRC components','GRG elements','EPS mouldings','UHPC components'] },
  social_links: {}, google_analytics_id: '', google_tag_manager_id: '',
  notes: 'Sources: verified customer workbook including embedded images, supplied logo, banner/product/factory folders, and 29-page brochure image set. No PDF or PPT file was supplied.',
  extra_settings: {
    company_delivery_task_id: taskId,
    service_expiry: { expires_on: null, enforcement_enabled: false },
    translation_profile: { industry: 'Architectural decorative materials and custom façade/interior components', company_summary: 'Anhui Zhenghui Decorative Materials Co., Ltd. manufactures EPS, GRC, GRG and UHPC decorative elements in Tianchang, Anhui.', main_products: productRows.map((row) => row[1]), target_markets: ['Overseas B2B architects, façade contractors, developers, distributors and project buyers'], glossary: { 'EPS装饰线条':'EPS decorative mouldings','GRC建筑装饰构件':'GRC architectural decorative elements','GRG室内装饰构件':'GRG interior decorative elements' } },
    legal_name_zh: '安徽正辉装饰材料有限公司', legal_name_en: 'Anhui Zhenghui Decorative Materials Co., Ltd.', legal_name_en_status: 'derived_direct_translation',
    legal_name_source: 'Customer workbook and supplied business licence image', site_assets: { banners: assets.banners, factory: assets.factory, projects: assets.projects, technical: assets.technical, certificates: [] },
    certificate_publication_note: 'Only a business licence was supplied; it is retained as internal identity evidence and is not published as a certificate.',
    site_settings_source: 'Customer workbook, embedded workbook images, supplied folders and brochure image pages', site_settings_initialized_at: now, site_settings_manual_fields: [],
  },
}
const tenantWrite = await db.from('tenants').upsert(tenantPayload, { onConflict: 'domain' }).select('id,domain,display_name,admin_group').single()
if (tenantWrite.error) throw tenantWrite.error

const conflict = await db.from('admin_users').select('id,tenant_id').eq('email', email).maybeSingle()
if (conflict.error) throw conflict.error
if (conflict.data && conflict.data.tenant_id !== tenantId) throw new Error('Admin email belongs to another tenant')
const adminPayload = { tenant_id: tenantId, email, password_hash: await bcrypt.hash(initialPassword, 12), name: '安徽正辉装饰材料有限公司', role: 'admin', is_active: true, must_change_password: false, admin_group: null }
const adminWrite = conflict.data ? await db.from('admin_users').update(adminPayload).eq('id', conflict.data.id) : await db.from('admin_users').insert(adminPayload)
if (adminWrite.error) throw adminWrite.error

for (const [index, [slug, name]] of categories.entries()) {
  const result = await db.from('product_categories').upsert({ tenant_id: tenantId, slug, name, name_en: name, name_i18n: { en: name }, description: '', description_en: '', description_i18n: { en: '' }, sort_order: index, is_active: true, extra_data: {} }, { onConflict: 'tenant_id,slug' })
  if (result.error) throw result.error
}
for (const [index, [slug, name, categorySlug, description, model, images, specs]] of productRows.entries()) {
  const features = ['Developed from project drawings or design reference','Manufactured on dedicated in-house equipment','Dimensions and finish confirmed during RFQ']
  const payload = { tenant_id: tenantId, slug, name, name_en: name, name_i18n: { en: name }, description, description_en: description, description_i18n: { en: description }, overview: description, overview_en: description, overview_i18n: { en: description }, image_url: images[0], category: categories.find((item) => item[0] === categorySlug)?.[1], category_slug: categorySlug, model, features, features_i18n: { en: features }, applications: ['Architectural façades','Interior public spaces','Residential and public building projects'], applications_i18n: { en: ['Architectural façades','Interior public spaces','Residential and public building projects'] }, advantages: [], advantages_i18n: { en: [] }, specs, sort_order: index, is_active: true, extra_data: { images, source: 'customer-supplied material set', seo_title_i18n: { en: `${name} | Zhenghui` }, seo_description_i18n: { en: description } } }
  const result = await db.from('products').upsert(payload, { onConflict: 'tenant_id,slug' })
  if (result.error) throw result.error
}
for (const write of [
  db.from('seo_tenant_config').upsert({ tenant_id: tenantId, enabled: false }, { onConflict: 'tenant_id' }),
  db.from('tenant_service_terms').upsert({ tenant_id: tenantId, expires_on: null, enforcement_enabled: false }, { onConflict: 'tenant_id' }),
]) { const result = await write; if (result.error) throw result.error }

const [tenantRead, adminRead, productsRead, categoriesRead, seoRead, termRead] = await Promise.all([
  db.from('tenants').select('id,domain,display_name,admin_group,logo_url,favicon_url,extra_settings').eq('id', tenantId).single(),
  db.from('admin_users').select('email,tenant_id,admin_group,must_change_password').eq('email', email).single(),
  db.from('products').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId).eq('is_active', true),
  db.from('product_categories').select('*', { count: 'exact', head: true }).eq('tenant_id', tenantId).eq('is_active', true),
  db.from('seo_tenant_config').select('enabled').eq('tenant_id', tenantId).single(),
  db.from('tenant_service_terms').select('expires_on,enforcement_enabled').eq('tenant_id', tenantId).single(),
])
for (const result of [tenantRead, adminRead, productsRead, categoriesRead, seoRead, termRead]) if (result.error) throw result.error
if (productsRead.count !== 4 || categoriesRead.count !== 2 || tenantRead.data.admin_group !== null || adminRead.data.admin_group !== null || adminRead.data.must_change_password !== false || seoRead.data.enabled !== false || termRead.data.enforcement_enabled !== false || termRead.data.expires_on !== null) throw new Error('Readback contract failed')
console.log(JSON.stringify({ result: 'PASS', tenantId, domain, products: productsRead.count, categories: categoriesRead.count, uploadedAssets: Object.values(assets).flat().length, adminGroup: null, seoEnabled: false, serviceExpiry: termRead.data }))
