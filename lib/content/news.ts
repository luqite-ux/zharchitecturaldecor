export interface NewsPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  modifiedAt: string
  coverImage?: { src: string; alt: string }
  body: string
}

/**
 * Data access boundary for news. Replace the body with a Supabase query
 * (ordered by publishedAt desc) without changing the components.
 */
export async function getNewsPosts(): Promise<NewsPost[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!url || !key || !tenantId) return []
  const { createClient } = await import('@supabase/supabase-js')
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data, error } = await client.from('articles').select('slug,title_i18n,excerpt_i18n,content_i18n,featured_image,published_at,updated_at').eq('tenant_id', tenantId).eq('is_published', true).order('sort_order').order('published_at', { ascending: false })
  if (error || !data) return []
  return data.map((row) => ({ slug: row.slug, title: row.title_i18n?.en || '', excerpt: row.excerpt_i18n?.en || '', body: row.content_i18n?.en || '', publishedAt: row.published_at || row.updated_at, modifiedAt: row.updated_at || row.published_at, ...(row.featured_image ? { coverImage: { src: row.featured_image, alt: row.title_i18n?.en || 'Article cover' } } : {}) })).filter((row) => row.slug && row.title)
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  const posts = await getNewsPosts()
  return posts.find((p) => p.slug === slug) ?? null
}
