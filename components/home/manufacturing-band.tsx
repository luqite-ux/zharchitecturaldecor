import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { companyFacts, equipment, monthlyCapacity } from '@/lib/content/company'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { FactoryCarousel } from '@/components/home/factory-carousel'

const fmt = new Intl.NumberFormat('en-US')

export function ManufacturingBand() {
  return (
    <Section sectionId="home-manufacturing" labelledBy="manufacturing-title">
      <div className="container-wide">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHeading
            id="manufacturing-title"
            className="lg:col-span-7"
            eyebrow="Manufacturing"
            title="An in-house production base built since 2018"
            lead="Moulding, spraying, coating, cutting and engraving run on our own lines, so profiles, finishes and custom forms stay under one roof."
          />
          <Reveal index={3} className="lg:col-span-5 lg:justify-self-end">
            <Link
              href="/manufacturing"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              See the factory
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal index={0} className="lg:col-span-7">
            <FactoryCarousel />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <Reveal index={1}>
              <dl className="grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl bg-border">
                {[
                  { k: 'Founded', v: String(companyFacts.founded) },
                  { k: 'Site area', v: `${fmt.format(companyFacts.siteArea.value)} m²` },
                  { k: 'Factory area', v: `${fmt.format(companyFacts.factoryArea.value)} m²` },
                  { k: 'Engraving machines', v: '3' },
                ].map((s) => (
                  <div key={s.k} className="bg-mineral p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{s.k}</dt>
                    <dd className="mt-1 font-serif text-3xl text-ink">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal index={2}>
              <div className="h-full rounded-3xl bg-navy p-6 text-white">
                <h3 className="text-xl text-white">Monthly capacity</h3>
                <ul className="mt-4 space-y-3">
                  {monthlyCapacity.map((c) => (
                    <li key={c.id} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm text-white/85">{c.label}</span>
                      <span className="font-serif text-xl whitespace-nowrap">
                        {fmt.format(c.value)} {c.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal index={3} className="mt-5">
          <ul className="flex flex-wrap gap-2" aria-label="Equipment">
            {equipment.map((e) => (
              <li
                key={e.label}
                className="rounded-full border border-border bg-mineral px-4 py-2 text-sm text-ink"
              >
                <span className="font-semibold">{e.count}</span> {e.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
