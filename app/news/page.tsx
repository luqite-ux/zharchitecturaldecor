import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Reveal, Section } from '@/components/site/section'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { getNewsPosts } from '@/lib/content/news'

export const metadata: Metadata = {
  title: 'News',
  description: 'Company news and updates from Anhui Zhenghui Decorative Materials.',
  alternates: { canonical: '/news' },
}

export const revalidate = 60

export default async function NewsPage() {
  const posts = await getNewsPosts()

  return (
    <>
      <PageHero
        sectionId="news-hero"
        eyebrow="News"
        title="Company news"
        lead="Updates from our production base and project work will appear here."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <Section sectionId="news-list" labelledBy="news-list-title" className="!pt-0">
        <div className="container-wide">
          <h2 id="news-list-title" className="sr-only">
            Latest articles
          </h2>
          {posts.length === 0 ? (
            <Empty className="rounded-3xl border border-dashed border-border bg-mineral py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Newspaper aria-hidden />
                </EmptyMedia>
                <EmptyTitle>No articles published yet</EmptyTitle>
                <EmptyDescription>
                  We have not posted any news. In the meantime, you can browse our products or send us a project
                  enquiry.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex h-11 items-center rounded-full bg-terracotta px-6 text-sm font-semibold text-white transition-colors hover:bg-ink"
                  >
                    Browse products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center rounded-full border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    Contact us
                  </Link>
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal as="li" key={post.slug} index={i % 3} className="flex">
                  <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-mineral ring-1 ring-border focus-within:ring-2 focus-within:ring-terracotta">
                    {post.coverImage ? (
                      <div className="relative aspect-[16/10] bg-stone">
                        <Image src={post.coverImage.src} alt={post.coverImage.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <time dateTime={post.publishedAt} className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
                      </time>
                      <h3 className="text-xl">
                        <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </>
  )
}
