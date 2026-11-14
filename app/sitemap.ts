import type { MetadataRoute } from 'next'
import { getPublishedProducts } from '@/lib/products-db'
import { getNewsPosts } from '@/lib/content/news'
import { siteConfig } from '@/lib/site'

export const revalidate = 60
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '')
  const staticRoutes = ['', '/products', '/projects', '/manufacturing', '/about', '/news', '/contact']
  const [products, articles] = await Promise.all([getPublishedProducts(), getNewsPosts()])
  const now = new Date()
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: now, changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : 0.7 })),
    ...products.map((product) => ({ url: `${base}/products/${product.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...articles.map((article) => ({ url: `${base}/news/${article.slug}`, lastModified: new Date(article.publishedAt), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
