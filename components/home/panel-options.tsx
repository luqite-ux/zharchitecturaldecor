import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { insulationCores, structuralLayer } from '@/lib/content/panels'
import { getProduct } from '@/lib/content/products'
import { ProductVisual } from '@/components/site/product-visual'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

const finishSlugs = [
  'real-stone-finish',
  'stone-effect-finish',
  'water-in-sand-finish',
  'natural-ultrathin-stone',
] as const

export function PanelOptions() {
  return (
    <Section sectionId="home-panel-options" labelledBy="panel-options-title" className="bg-secondary/60">
      <div className="container-wide">
        <SectionHeading
          id="panel-options-title"
          eyebrow="Panel options"
          title="Build the panel around your project"
          lead={`Select one of four surface finishes and one of six insulation cores. A ${structuralLayer.label.toLowerCase()} board forms the structural layer between them.`}
        />

        <h3 className="mt-12 text-xl font-semibold text-ink">1. Select a surface finish</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {finishSlugs.map((slug, i) => {
            const product = getProduct(slug)
            if (!product) return null
            return (
              <Reveal as="li" key={slug} index={i}>
                <Link
                  href={`/products/${slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-mineral transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-stone-deep motion-reduce:hover:translate-y-0"
                >
                  <ProductVisual image={product.image} aspect="aspect-square" tone="bg-transparent" sizes="(min-width: 1024px) 25vw, 50vw" />
                  <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
                    <span className="text-base font-semibold text-ink">{product.name}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-terracotta" aria-hidden />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>

        <Reveal index={2} className="mt-10">
          <h3 className="mb-5 text-xl font-semibold text-ink">2. Select an insulation core</h3>
          <div className="overflow-hidden rounded-3xl border border-border bg-mineral">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Available insulation core options and material fire classifications indicated in the supplied product information</caption>
              <thead className="bg-ivory text-xs uppercase tracking-wider text-ink-soft">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Insulation core</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Material fire classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {insulationCores.map((core) => (
                  <tr key={core.id}>
                    <th scope="row" className="px-5 py-3.5 font-medium text-ink">{core.label}</th>
                    <td className="px-5 py-3.5">
                      <span
                        className={
                          core.fireClass === 'A1'
                            ? 'rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white'
                            : 'rounded-full bg-terracotta-soft px-3 py-1 text-xs font-semibold text-ink'
                        }
                      >
                        {core.fireClass}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            Classifications shown are material options indicated in the supplied product information. Final panel composition, thickness, thermal values and project compliance must be confirmed for each order.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
