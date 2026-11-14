import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

const applications = [
  {
    id: 'facades',
    title: 'Facades',
    body: 'Window surrounds, cornices and insulated decorative panels that give an elevation its rhythm and surface.',
    href: '/products/grc-architectural-elements',
    cta: 'GRC architectural elements',
    image: {
      src: '/images/banners/hero-surfaces.jpg',
      alt: 'Curved pale facade forms with gold trim on a blue glazed building',
      focal: '40% 50%',
    },
  },
  {
    id: 'interiors',
    title: 'Interiors',
    body: 'Ornamental GRG components such as pedestals, columns and relief panels for lobbies and feature spaces.',
    href: '/products/grg-interior-elements',
    cta: 'GRG interior elements',
    image: {
      src: '/images/products/grg-ornamental-pedestals.jpg',
      alt: 'Row of cream ornamental pedestals with relief scrollwork',
      focal: '50% 55%',
    },
  },
  {
    id: 'public-space',
    title: 'Public space',
    body: 'UHPC and custom components developed from design intent for plazas, entrances and civic buildings.',
    href: '/products/uhpc-custom-components',
    cta: 'UHPC custom components',
    image: {
      src: '/images/banners/hero-public-space.jpg',
      alt: 'Modern blue and gold building complex beside open water at dusk',
      focal: '78% 50%',
    },
  },
]

export function Applications() {
  return (
    <Section sectionId="home-applications" labelledBy="applications-title" className="bg-secondary/60">
      <div className="container-wide">
        <SectionHeading
          id="applications-title"
          eyebrow="Applications"
          title="Materials for facades, interiors and public space"
          lead="Choose by where the material will sit. Each route leads to the product family best suited to that setting."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {applications.map((item, i) => (
            <Reveal key={item.id} as="li" index={i}>
              <Link
                href={item.href}
                className="group relative block overflow-hidden rounded-3xl bg-mineral transition-shadow duration-500 hover:shadow-[0_28px_50px_-30px_rgba(28,37,54,0.45)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    style={{ objectPosition: item.image.focal }}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.body}</p>
                  <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-terracotta">
                    {item.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
