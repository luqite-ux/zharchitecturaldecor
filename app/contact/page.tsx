import type { Metadata } from 'next'
import { FileText, Mail, MapPin, Ruler } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { RfqForm } from '@/components/site/rfq-form'
import { Reveal, Section } from '@/components/site/section'
import { productGroups } from '@/lib/content/products'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact and RFQ',
  description: 'Send a request for quotation with your drawings, dimensions, quantity and project location.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[] }>
}) {
  const { product } = await searchParams
  const defaultProduct = Array.isArray(product) ? product[0] : (product ?? '')

  return (
    <>
      <PageHero
        sectionId="contact-hero"
        eyebrow="Contact"
        title="Request a quotation"
        lead="Share your product interest, project location, dimensions and quantity. Pricing is project-specific and is provided through the quotation process."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <Section sectionId="contact-form" labelledBy="contact-form-title" className="!pt-0">
        <div className="container-wide grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Reveal className="h-full">
              <div className="space-y-8 lg:sticky lg:top-28">
                <div>
                  <p className="eyebrow">Project review</p>
                  <h2 className="mt-3 text-3xl">Tell us what you are building</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    We manufacture architectural decorative elements and custom components from project drawings
                    and design references.
                  </p>
                </div>

                <div className="border-y border-border py-6">
                  <h3 className="text-lg">Product scope</h3>
                  <ul className="mt-4 space-y-3">
                    {productGroups.map((group) => (
                      <li key={group.id} className="text-sm leading-relaxed text-ink-soft">
                        {group.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg">Helpful project details</h3>
                  <ul className="mt-4 space-y-4 text-sm text-ink-soft">
                    <li className="flex gap-3">
                      <FileText className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden />
                      <span>Drawings, sketches or reference files</span>
                    </li>
                    <li className="flex gap-3">
                      <Ruler className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden />
                      <span>Dimensions, finish requirements and quantity</span>
                    </li>
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-terracotta" aria-hidden />
                      <span>Project location and intended application</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl bg-ivory p-6">
                  <Mail className="size-6 text-terracotta" aria-hidden />
                  <h3 className="mt-4 text-xl">Email</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 block break-all text-ink underline decoration-terracotta underline-offset-4 hover:text-terracotta"
                  >
                    {siteConfig.email}
                  </a>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    Drawings and files can be shared by email after your request is received. Mention the file names
                    in the form.
                  </p>
                </div>
              </div>
            </Reveal>
          </aside>
          <div className="lg:col-span-8">
            <h2 id="contact-form-title" className="sr-only">
              Quotation request form
            </h2>
            <RfqForm captchaScope="contact-page" defaultProduct={defaultProduct} />
          </div>
        </div>
      </Section>
    </>
  )
}
