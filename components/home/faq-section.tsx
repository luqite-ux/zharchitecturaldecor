import Link from 'next/link'
import { faqs } from '@/lib/content/company'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

export function FaqSection() {
  return (
    <Section sectionId="home-faq" labelledBy="faq-title">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions before you request a quote" />
          <Reveal index={3} className="mt-6">
            <p className="text-ink-soft">
              Something else?{' '}
              <Link href="/contact" className="font-semibold text-terracotta underline underline-offset-4">
                Contact our team
              </Link>
              .
            </p>
          </Reveal>
        </div>
        <Reveal index={1} className="lg:col-span-8">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-mineral px-5 transition-colors data-[state=open]:border-terracotta data-[state=open]:bg-terracotta-soft/40 motion-reduce:transition-none"
              >
                <AccordionTrigger className="min-h-14 items-center py-4 text-base font-semibold text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-ink-soft">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  )
}
