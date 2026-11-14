import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { getNewsPost } from '@/lib/content/news'
import { siteConfig } from '@/lib/site'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getNewsPost(slug)
  if (!post) return { title: 'Article not found', robots: { index: false } }
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/news/${post.slug}` } }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getNewsPost(slug)
  if (!post) notFound()
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteConfig.url}/news/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    mainEntityOfPage: `${siteConfig.url}/news/${post.slug}`,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    ...(post.coverImage ? { image: post.coverImage.src } : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageHero
        sectionId="news-article-hero"
        eyebrow={new Date(post.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
        title={post.title}
        lead={post.excerpt}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: post.title }]}
      />
      <Section sectionId="news-article-body" labelledBy="news-article-body-title" className="!pt-0">
        <article className="container-wide max-w-3xl">
          <h2 id="news-article-body-title" className="sr-only">
            Article
          </h2>
          {post.coverImage ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl bg-stone">
              <Image src={post.coverImage.src} alt={post.coverImage.alt} fill sizes="768px" className="object-cover" />
            </div>
          ) : null}
          <div className="space-y-5 whitespace-pre-line text-lg leading-relaxed text-ink">{post.body}</div>
        </article>
      </Section>
    </>
  )
}
