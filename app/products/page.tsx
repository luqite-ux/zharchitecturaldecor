import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { ProductCard } from '@/components/site/product-card'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { getProductCatalog } from '@/lib/products-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Architectural decorative elements and custom design objects, made in-house by Anhui Zhenghui Decorative Materials.',
  alternates: { canonical: '/products' },
}

export default async function ProductsPage() {
  const { products: liveProducts, groups: liveGroups } = await getProductCatalog()
  const displayGroups = liveGroups

  return (
    <>
      <PageHero
        sectionId="products-hero"
        eyebrow="Products"
        title="Two product systems for architectural surfaces"
        lead="Architectural decorative elements bring together mouldings and cast components. Custom design objects are developed separately from your design intent."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Jump to a product group">
          {displayGroups.map((g) => (
            <li key={g.id}>
              <Link
                href={`#${g.anchor}`}
                className="inline-flex h-11 items-center rounded-full border border-border bg-mineral px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                {g.name}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      {displayGroups.map((group, gi) => (
        <Section
          key={group.id}
          sectionId={`products-${group.id}`}
          labelledBy={`${group.id}-title`}
          className={gi % 2 === 0 ? 'bg-ivory' : 'bg-mineral'}
        >
          <div id={group.anchor} className="container-wide scroll-mt-28">
            <SectionHeading id={`${group.id}-title`} eyebrow={`Group 0${gi + 1}`} title={group.name} lead={group.summary} />
            <ul className="product-catalog-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveProducts
                .filter((product) => product.groupId === group.id)
                .map((p, i) => (
                  <li key={p.slug} className="flex">
                    <ProductCard product={p} index={i} />
                  </li>
                ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section sectionId="products-rfq" labelledBy="products-rfq-title" className="bg-navy text-white">
        <div className="container-wide flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <Reveal>
            <h2 id="products-rfq-title" className="max-w-xl text-3xl text-white sm:text-4xl">
              Not sure which system fits? Send us the drawing.
            </h2>
          </Reveal>
          <Reveal index={1}>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold text-navy transition-colors hover:bg-ivory"
            >
              Request a quotation
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
