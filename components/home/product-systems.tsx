import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getProductCatalog } from '@/lib/products-db'
import { ProductVisual } from '@/components/site/product-visual'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

export async function ProductSystems() {
  const { products, groups } = await getProductCatalog()
  return (
    <Section sectionId="home-product-systems" labelledBy="product-systems-title">
      <div className="container-wide">
        <SectionHeading
          id="product-systems-title"
          eyebrow="Products"
          title="Product series"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {groups.map((group, i) => {
            const items = products.filter((product) => product.groupId === group.id)
            const lead = items[0]
            return (
              <Reveal
                key={group.id}
                index={i}
                as="article"
                className="h-full"
              >
                <div className="group/card flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-mineral transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-stone-deep hover:shadow-[0_24px_48px_-28px_rgba(28,37,54,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {lead ? <ProductVisual
                    image={lead.image}
                    aspect="aspect-[4/3]"
                    tone="bg-transparent"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  /> : null}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl">{group.name}</h3>
                    <p className="mt-3 text-pretty text-ink-soft">{group.summary}</p>
                    <ul className="mt-6 divide-y divide-border border-t border-border">
                      {items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/products/${item.slug}`}
                            className="flex min-h-12 items-center justify-between gap-4 py-3 text-sm font-medium text-ink transition-colors hover:text-terracotta"
                          >
                            {item.name}
                            <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/card:translate-x-0.5" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/products#${group.anchor}`}
                      className="mt-auto pt-6 text-sm font-semibold text-terracotta underline-offset-4 hover:underline"
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
