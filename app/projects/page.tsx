import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/site/page-hero'
import { ProductVisual } from '@/components/site/product-visual'
import { Reveal, Section } from '@/components/site/section'
import { projectCases } from '@/lib/content/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Nine project cases supplied by Anhui Zhenghui Decorative Materials.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        sectionId="projects-hero"
        eyebrow="Projects"
        title="Project cases"
        lead="Nine project cases. Project scope and details are shared on request."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />

      <Section sectionId="projects-list" labelledBy="projects-list-title" className="!pt-0">
        <div className="container-wide">
          <h2 id="projects-list-title" className="sr-only">
            All project cases
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectCases.map((p, i) => (
              <Reveal as="li" key={p.slug} index={i % 3} className="flex">
                <article id={p.slug} className="flex w-full scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-mineral ring-1 ring-border">
                  <ProductVisual
                    image={p.image}
                    aspect="aspect-[4/3]"
                    tone={p.image.background === 'white' ? 'bg-stone/50' : 'bg-stone'}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <span className="eyebrow">Case {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-xl text-ink">{p.nameEn}</h3>
                    <p lang="zh-CN" className="text-sm text-ink-soft">{p.nameZh}</p>
                  </div>
                  {p.gallery?.length ? <div className="grid grid-cols-3 gap-1 p-2 pt-0">
                    {p.gallery.map((src, index) => <div key={src} className="relative aspect-[4/3]"><Image src={src} alt={`${p.nameEn} image ${index + 2}`} fill sizes="(min-width: 1024px) 11vw, 30vw" className="object-cover" /></div>)}
                  </div> : null}
                </article>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm text-ink-soft">
            Images come from customer-supplied project materials and show the named developments.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-12 items-center rounded-full border border-ink px-7 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Discuss your project
          </Link>
        </div>
      </Section>
    </>
  )
}
