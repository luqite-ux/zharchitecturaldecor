import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'

export default function NotFound() {
  return (
    <PageHero
      sectionId="not-found"
      eyebrow="404"
      title="This page could not be found"
      lead="The page may have moved. Head back to the homepage or browse our products."
    >
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-terracotta px-7 text-sm font-semibold text-white hover:bg-ink">
          Home
        </Link>
        <Link href="/products" className="inline-flex h-12 items-center rounded-full border border-ink px-7 text-sm font-semibold text-ink hover:bg-ink hover:text-white">
          Products
        </Link>
      </div>
    </PageHero>
  )
}
