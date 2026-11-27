import Link from 'next/link'
import { getProductCatalog } from '@/lib/products-db'
import { feedbackMedia } from '@/lib/content/customer-feedback-media'
import { ProductVisual } from '@/components/site/product-visual'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

export async function ProductSystems() {
  const { products, groups } = await getProductCatalog()
  const suppliedCovers: Record<string, { src: string; alt: string; fit: 'contain' | 'cover'; focal?: string; background: 'white' | 'photo' }> = {
    'uhpc-curtain-wall': { src: feedbackMedia.uhpc, alt: 'Customer supplied UHPC formed component', fit: 'cover', background: 'photo' },
    'decorative-mouldings': { src: '/images/products/decorative-mouldings-cover.jpg', alt: 'Customer supplied decorative moulding profiles in production', fit: 'cover', background: 'photo' },
    'grc-components': { src: feedbackMedia.grcFacade, alt: 'Customer supplied facade showing GRC architectural components', fit: 'cover', background: 'photo' },
    'craft-ornaments': { src: '/images/products/craft-ornaments-cover.jpg', alt: 'Customer supplied sculptural design object', fit: 'cover', background: 'photo' },
  }
  return (
    <Section sectionId="home-product-systems" labelledBy="product-systems-title">
      <div className="container-wide">
        <SectionHeading
          id="product-systems-title"
          eyebrow="Products"
          title="Product series"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {groups.map((group, i) => {
            const items = products.filter((product) => product.groupId === group.id)
            const lead = items[0]
            const cover = suppliedCovers[group.id] ?? (lead?.image ? {
              ...lead.image,
              fit: lead.cardFit ?? 'cover',
              focal: lead.cardFocal ?? lead.image.focal,
            } : undefined)
            return (
              <Reveal
                key={group.id}
                index={i}
                as="article"
                className="h-full"
              >
                <div className="group/card flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-mineral transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-stone-deep hover:shadow-[0_24px_48px_-28px_rgba(28,37,54,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {cover ? <ProductVisual
                    image={cover}
                    aspect="aspect-[4/3]"
                    tone="bg-transparent"
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  /> : null}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl xl:text-2xl">{group.name}</h3>
                    <p className="mt-3 text-pretty text-ink-soft">{group.summary}</p>
                    <Link
                      href={`/products#${group.anchor}`}
                      className="mt-auto inline-flex min-h-11 items-end pt-6 text-sm font-semibold text-terracotta underline-offset-4 hover:underline"
                    >
                      View {group.name}
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
