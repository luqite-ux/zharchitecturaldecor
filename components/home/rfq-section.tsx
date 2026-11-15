import { Mail } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import { RfqForm } from '@/components/site/rfq-form'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

const checklist = [
  'Product interest and finish',
  'Project location',
  'Dimensions or specifications',
  'Quantity',
  'Drawings or reference files',
]

export function RfqSection() {
  return (
    <Section sectionId="home-rfq" labelledBy="rfq-title" className="bg-secondary/60">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <div className="self-start lg:sticky lg:top-28 lg:col-span-5">
          <SectionHeading
            id="rfq-title"
            eyebrow="Request a quotation"
            title="Tell us what you are building"
            lead="Share your drawings and project conditions and we will review the right material family, finish and core."
          />
          <Reveal index={3}>
            <ul className="mt-8 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink">
                  <span aria-hidden className="size-1.5 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta underline underline-offset-4"
            >
              <Mail className="size-4" aria-hidden />
              {siteConfig.email}
            </a>
          </Reveal>
        </div>
        <Reveal index={1} className="lg:col-span-7">
          <div className="rounded-3xl border border-border bg-mineral p-6 sm:p-8">
            <RfqForm captchaScope="home-rfq" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
