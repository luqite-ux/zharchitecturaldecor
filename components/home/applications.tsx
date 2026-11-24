import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal, Section, SectionHeading } from '@/components/site/section'
import { feedbackMedia } from '@/lib/content/customer-feedback-media'

const applications = [
  {
    id: 'interiors',
    title: 'Indoor Scenes',
    body: 'Ornamental GRG components such as pedestals, columns and relief panels for lobbies and feature spaces.',
    href: '/projects#suzhou-shengze-school',
    cta: 'Project scenes',
    image: {
      src: '/images/projects-optimized/suzhou-shengze-school.jpg',
      alt: 'Interior arched corridor at Suzhou Shengze Silk Vocational School',
      focal: '50% 55%',
    },
  },
  {
    id: 'outdoor',
    title: 'Outdoor Scenes',
    body: 'Window surrounds, cornices and architectural elements that give an elevation its rhythm and surface.',
    href: '/projects#taian-city-landscape',
    cta: 'Project scenes',
    image: {
      src: '/images/projects-optimized/taian-city-landscape.jpg',
      alt: 'Customer supplied outdoor landscape project in Tai’an',
      focal: '50% 44%',
    },
  },
  {
    id: 'custom-objects',
    title: 'Craft Ornaments',
    body: 'Cement-texture objects developed from sketches and design intent for interiors, displays and bespoke applications.',
    href: '/products/cement-texture-design-objects',
    cta: 'View ornaments',
    image: {
      src: feedbackMedia.craftObjects,
      alt: 'Customer supplied cement-texture craft ornament',
      focal: '50% 70%',
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
          title="Materials for facades, interiors and custom objects"
          lead="Browse customer supplied project scenes and craft ornaments by application."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {applications.map((item, i) => (
            <Reveal key={item.id} as="li" index={i} className="h-full">
              <Link
                href={item.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-mineral transition-shadow duration-500 hover:shadow-[0_28px_50px_-30px_rgba(28,37,54,0.45)]"
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
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{item.body}</p>
                  <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-4 text-sm font-semibold text-terracotta">
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
