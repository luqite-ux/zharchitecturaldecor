import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { companyFacts, deliverySteps, equipment, monthlyCapacity } from '@/lib/content/company'

export const metadata: Metadata = {
  title: 'Manufacturing',
  description:
    'In-house production base: 25,600 m² site, 18,000 m² factory, and monthly capacity across GRC, UHPC, GRG and EPS architectural components.',
  alternates: { canonical: '/manufacturing' },
}

const fmt = new Intl.NumberFormat('en-US')

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        sectionId="manufacturing-hero"
        eyebrow="Manufacturing"
        title="From design intent to custom components"
        lead="Moulding, spraying, coating, cutting and engraving run on our own lines, so profiles, finishes and custom forms stay under one roof."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturing' }]}
      />

      <Section sectionId="manufacturing-facility" labelledBy="facility-title" className="!pt-0">
        <div className="container-wide grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone">
              <Image
                src="/images/factory/engraving-machine-daylight-cleaned.png"
                alt="Engraving machine with control cabinet inside a steel-framed factory hall"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={{ objectPosition: '40% 55%' }}
              />
            </figure>
          </Reveal>
          <div className="lg:col-span-5">
            <h2 id="facility-title" className="text-3xl sm:text-4xl">
              The facility
            </h2>
            <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-3 lg:grid-cols-1">
              {[
                { k: 'Founded', v: String(companyFacts.founded) },
                { k: 'Site area', v: `${fmt.format(companyFacts.siteArea.value)} m²` },
                { k: 'Factory area', v: `${fmt.format(companyFacts.factoryArea.value)} m²` },
              ].map((s) => (
                <div key={s.k} className="bg-mineral p-6">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{s.k}</dt>
                  <dd className="mt-1 font-serif text-4xl text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section sectionId="manufacturing-capacity" labelledBy="capacity-title" className="bg-mineral">
        <div className="container-wide">
          <SectionHeading id="capacity-title" eyebrow="Capacity" title="Monthly production capacity" />
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {monthlyCapacity.map((c, i) => (
              <Reveal key={c.id} index={i} className="rounded-3xl bg-ivory p-6">
                <dt className="text-sm text-ink-soft">{c.label}</dt>
                <dd className="mt-3 font-serif text-4xl text-ink">
                  {fmt.format(c.value)} <span className="text-2xl">{c.unit}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      <Section sectionId="manufacturing-equipment" labelledBy="equipment-title">
        <div className="container-wide">
          <SectionHeading id="equipment-title" eyebrow="Equipment" title="Machines on the floor" />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((e, i) => (
              <Reveal as="li" key={e.label} index={i % 4} className="flex items-baseline gap-4 rounded-2xl border border-border bg-mineral p-5">
                <span className="font-serif text-4xl text-terracotta">{e.count}</span>
                <span className="text-ink">{e.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section sectionId="manufacturing-process" labelledBy="process-title" className="bg-ivory">
        <div className="container-wide">
          <SectionHeading id="process-title" eyebrow="Workflow" title="How an order moves through us" />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {deliverySteps.map((s, i) => (
              <Reveal as="li" key={s.title} index={i} className="rounded-3xl bg-mineral p-6">
                <span className="font-serif text-3xl text-terracotta">0{i + 1}</span>
                <h3 className="mt-3 text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <Link
            href="/contact"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            Send your brief
          </Link>
        </div>
      </Section>
    </>
  )
}
