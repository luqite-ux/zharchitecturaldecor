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
          title="Four finishes, six insulation cores"
          lead={`Every insulated decorative panel pairs a finish with a ${structuralLayer.label.toLowerCase()} structural layer and the insulation core you select.`}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

        <Reveal index={2} className="mt-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-mineral">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Insulation core options and indicated fire class</caption>
              <thead className="bg-ivory text-xs uppercase tracking-wider text-ink-soft">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Insulation core</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Indicated fire class</th>
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
            Thickness, thermal values and project-specific compliance are confirmed with our team per project.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
