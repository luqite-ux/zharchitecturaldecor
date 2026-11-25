import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/site/page-hero'
import { ProductCard } from '@/components/site/product-card'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { getProductCatalog } from '@/lib/products-db'
import { pendingProductTypes } from '@/lib/content/products'
import { feedbackMedia } from '@/lib/content/customer-feedback-media'

const decorativeLineReferences = [
  { src: feedbackMedia.decorativeLineReferences[0], alt: 'Customer supplied decorative line installation', width: 790, height: 576 },
  { src: feedbackMedia.decorativeLineReferences[1], alt: 'Customer supplied facade line detail', width: 1279, height: 1706 },
  { src: feedbackMedia.decorativeLineReferences[2], alt: 'Customer supplied decorative relief samples', width: 642, height: 645 },
  { src: feedbackMedia.decorativeLineReferences[3], alt: 'Customer supplied profile stock', width: 800, height: 800 },
  { src: feedbackMedia.decorativeLineReferences[4], alt: 'Customer supplied formed line sample', width: 600, height: 834 },
]

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
        title="Product series"
        lead="Explore customer supplied facade components, decorative lines, interior forms and craft ornaments."
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
            {group.id === 'decorative-mouldings' ? (
              <div id="decorative-line-references" className="mt-10 scroll-mt-28">
                <h3 className="text-2xl text-ink">Supplied decorative line references</h3>
                <p className="mt-2 text-sm text-ink-soft">Additional photos from the customer workbook, shown as material references.</p>
                <ul className="mt-5 grid grid-cols-2 items-start gap-4 lg:grid-cols-5">
                  {decorativeLineReferences.map((image, index) => (
                    <Reveal as="li" key={image.src} index={index} className="overflow-hidden rounded-2xl bg-stone">
                      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 18vw, 48vw" className="h-auto w-full" />
                    </Reveal>
                  ))}
                </ul>
              </div>
            ) : null}
            {(pendingProductTypes[group.id] ?? []).length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-3" aria-label={`${group.name} additional types`}>
                {pendingProductTypes[group.id]?.map((name) => (
                  <li key={name} className="rounded-full border border-border bg-mineral px-5 py-3 text-sm text-ink">
                    {name} · details on request
                  </li>
                ))}
              </ul>
            ) : null}
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
