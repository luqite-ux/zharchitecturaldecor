import { createClient } from '@supabase/supabase-js'
import {
  productGroups as fallbackGroups,
  products as fallbackProducts,
  type Product,
  type ProductGroup,
  type ProductGroupId,
} from '@/lib/content/products'

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null
}

export async function getProductCatalog(): Promise<{ products: Product[]; groups: ProductGroup[] }> {
  const client = publicClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!client || !tenantId) return { products: fallbackProducts, groups: fallbackGroups }
  const [{ data, error }, { data: categories, error: categoryError }] = await Promise.all([
    client.from('products').select('slug,name_i18n,description_i18n,image_url,category_slug,extra_data').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order'),
    client.from('product_categories').select('slug,name_i18n').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order'),
  ])
  if (error || categoryError || !data?.length || !categories?.length) return { products: fallbackProducts, groups: fallbackGroups }
  const groups = fallbackGroups
  const output: Product[] = []
  for (const row of data) {
    const fallback = fallbackProducts.find((item) => item.slug === row.slug)
    if (!fallback) continue
    const extra = row.extra_data as { images?: string[] } | null
    output.push({
      ...fallback,
      name: row.name_i18n?.en || fallback.name,
      groupId: fallback.groupId as ProductGroupId,
      description: row.description_i18n?.en || fallback.description,
      summary: row.description_i18n?.en || fallback.summary,
      image: row.image_url ? { ...fallback.image, src: row.image_url } : fallback.image,
      gallery: extra?.images?.length ? extra.images.map((src, index) => ({ src, alt: `${row.name_i18n?.en || fallback.name} — image ${index + 1}`, fit: 'contain' as const, background: 'white' as const })) : fallback.gallery,
    })
  }
  return { products: output.length ? output : fallbackProducts, groups }
}

export async function getPublishedProducts(): Promise<Product[]> {
  return (await getProductCatalog()).products
}

export async function getPublishedProduct(slug: string) {
  return (await getPublishedProducts()).find((item) => item.slug === slug) ?? null
}
