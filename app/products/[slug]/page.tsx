import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { ProductCard } from '@/components/site/product-card'
import { ProductVisual } from '@/components/site/product-visual'
import { RfqForm } from '@/components/site/rfq-form'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { insulationCores, panelFinishes, structuralLayer } from '@/lib/content/panels'
import { getGroup, getProduct, products } from '@/lib/content/products'
import { getPublishedProduct, getPublishedProducts } from '@/lib/products-db'

export const revalidate = 60
export const dynamicParams = true

const fmt = new Intl.NumberFormat('en-US')

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getPublishedProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getPublishedProduct(slug)
  if (!product) notFound()

  const group = getGroup(product.groupId)
  const related = (await getPublishedProducts()).filter((p) => p.groupId === product.groupId && p.slug !== product.slug)
  const isPanel = product.groupId === 'insulated-decorative-panels'
  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product',
    '@id': `https://zharchitecturaldecor.com/products/${product.slug}#product`,
    name: product.name, description: product.description,
    image: [product.image.src, ...(product.gallery ?? []).map((image) => image.src)].map((src) => src.startsWith('http') ? src : `https://zharchitecturaldecor.com${src}`),
    manufacturer: { '@id': 'https://zharchitecturaldecor.com/#organization' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageHero
        sectionId="product-hero"
        eyebrow={group.name}
        title={product.name}
        lead={product.summary}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      />

      <Section sectionId="product-overview" labelledBy="product-overview-title" className="!pt-0">
        <div className="container-wide grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <ProductVisual
              image={product.image}
              aspect="aspect-[4/3]"
              tone={product.image.background === 'white' ? 'bg-stone/50' : 'bg-stone'}
              className="rounded-3xl"
              sizes="(min-width: 1024px) 58vw, 100vw"
              priority
            />
          </Reveal>
          <div className="lg:col-span-5">
            <h2 id="product-overview-title" className="text-3xl sm:text-4xl">
              Overview
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">{product.description}</p>
            <ul className="mt-6 space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-terracotta" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {product.capacity ? (
              <p className="mt-8 rounded-2xl bg-ivory p-5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {product.capacity.label}
                </span>
                <span className="mt-1 block font-serif text-3xl text-ink">
                  {fmt.format(product.capacity.value)} {product.capacity.unit}
                </span>
              </p>
            ) : null}
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              Request a quotation
            </Link>
          </div>
        </div>
      </Section>

      {product.gallery?.length ? (
        <Section sectionId="product-gallery" labelledBy="product-gallery-title" className="bg-ivory">
          <div className="container-wide">
            <SectionHeading
              id="product-gallery-title"
              eyebrow="Source gallery"
              title={`${product.name} in the supplied material set`}
              lead="These images come from the customer-supplied product material and are shown without changing the product structure or proportions."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((image, index) => (
                <Reveal as="li" key={image.src} index={index} className="overflow-hidden rounded-3xl bg-white">
                  <ProductVisual image={image} aspect="aspect-[4/3]" tone="bg-white" sizes="(min-width: 1024px) 33vw, 50vw" />
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {isPanel ? (
        <Section sectionId="product-panel-build" labelledBy="product-build-title" className="bg-mineral">
          <div className="container-wide">
            <SectionHeading
              id="product-build-title"
              eyebrow="Panel build"
              title="Finish, structural layer and a selectable core"
              lead={`${structuralLayer.label}: ${structuralLayer.description} Technical values are confirmed per project.`}
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <h3 className="text-xl">Finish families</h3>
                <ul className="mt-4 space-y-2">
                  {panelFinishes.map((f) => (
                    <li
                      key={f.id}
                      className={`rounded-2xl px-5 py-3 text-sm ${f.label === product.name.replace(' Finish', '') || product.name.startsWith(f.label) ? 'bg-ink text-white' : 'bg-ivory text-ink'}`}
                    >
                      {f.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal index={1}>
                <h3 className="text-xl">Insulation core variants</h3>
                <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl bg-ivory">
                  {insulationCores.map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                      <span className="text-ink">{c.label}</span>
                      <span className="rounded-full bg-mineral px-3 py-1 text-xs font-semibold text-ink">
                        Fire class {c.fireClass}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Section>
      ) : null}

      <Section sectionId="product-confirm" labelledBy="product-confirm-title">
        <div className="container-wide grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="product-confirm-title"
              eyebrow="Before we quote"
              title="Details to confirm with us"
              lead="Share what you have. Pricing and technical values are project-specific and are provided through the quotation process."
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {product.confirmWithUs.map((c, i) => (
              <Reveal as="li" key={c} index={i} className="rounded-2xl bg-ivory p-5 text-ink">
                <span className="font-serif text-2xl text-terracotta">0{i + 1}</span>
                <span className="mt-2 block">{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {related.length ? (
        <Section sectionId="product-related" labelledBy="product-related-title" className="bg-ivory">
          <div className="container-wide">
            <h2 id="product-related-title" className="text-3xl sm:text-4xl">
              More in {group.name}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.slug} className="flex">
                  <ProductCard product={p} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <Section sectionId="product-rfq" labelledBy="product-rfq-title" className="bg-mineral">
        <div className="container-wide max-w-4xl">
          <SectionHeading id="product-rfq-title" eyebrow="Quotation" title={`Request a quotation for ${product.name}`} />
          <div className="mt-10">
            <RfqForm captchaScope={`product-${product.slug}`} defaultProduct={product.name} />
          </div>
        </div>
      </Section>
    </>
  )
}
