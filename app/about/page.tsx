import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/site/page-hero'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { companyFacts, equipment } from '@/lib/content/company'
import { productGroups } from '@/lib/content/products'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Anhui Zhenghui Decorative Materials Co., Ltd. was founded in 2018 and manufactures architectural decorative elements, insulated decorative panels and custom design objects.',
  alternates: { canonical: '/about' },
}

const fmt = new Intl.NumberFormat('en-US')

export default function AboutPage() {
  return (
    <>
      <PageHero
        sectionId="about-hero"
        eyebrow="About us"
        title="Decorative building materials, made in-house"
        lead={`${siteConfig.name} was founded in ${companyFacts.founded}. We make architectural decorative elements, insulated decorative panels and custom design objects.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <Section sectionId="about-facts" labelledBy="about-facts-title" className="!pt-0">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="about-facts-title" className="text-3xl sm:text-4xl">
              What we do
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Our production base covers a {fmt.format(companyFacts.siteArea.value)} m² site with an{' '}
              {fmt.format(companyFacts.factoryArea.value)} m² factory. Mouldings, finished panels and custom
              components are developed from your drawings and produced on our own lines.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-border py-7 sm:grid-cols-3 lg:grid-cols-2">
              <div>
                <dt className="text-sm text-ink-soft">Established</dt>
                <dd className="mt-1 font-serif text-3xl text-ink">{companyFacts.founded}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Production site</dt>
                <dd className="mt-1 font-serif text-3xl text-ink">{fmt.format(companyFacts.siteArea.value)} m²</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Factory area</dt>
                <dd className="mt-1 font-serif text-3xl text-ink">{fmt.format(companyFacts.factoryArea.value)} m²</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Production equipment</dt>
                <dd className="mt-1 font-serif text-3xl text-ink">
                  {equipment.reduce((total, item) => total + item.count, 0)} units
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              <h3 className="text-xl">From design intent to production</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Our in-house scope covers moulding, spraying, coating, cutting, mesh laminating, engraving and
                3D-assisted form development. The route is selected around the material, finish and geometry in
                your project.
              </p>
            </div>
          </div>
          <ul className="grid content-start gap-4 lg:col-span-7">
            {productGroups.map((g, i) => (
              <Reveal as="li" key={g.id} index={i} className="rounded-3xl bg-ivory p-6 sm:p-8">
                <h3 className="text-xl">{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.summary}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section sectionId="about-contact" labelledBy="about-contact-title" className="bg-mineral">
        <div className="container-wide">
          <SectionHeading
            id="about-contact-title"
            eyebrow="Work with us"
            title="Bring us a drawing, a sketch or a direction"
            lead="Tell us what you are building and we will review the right material family, finish and core option."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              Request a quotation
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-12 items-center rounded-full border border-ink px-7 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
