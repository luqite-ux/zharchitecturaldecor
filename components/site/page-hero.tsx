import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Reveal, Section } from './section'

interface Crumb {
  label: string
  href?: string
}

export function PageHero({
  sectionId,
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  sectionId: string
  eyebrow: string
  title: string
  lead?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <Section sectionId={sectionId} labelledBy={`${sectionId}-title`} className="overflow-hidden !py-16 sm:!py-20 lg:!py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px)',
          backgroundSize: 'calc(100% / 6) 100%',
          maskImage: 'linear-gradient(to bottom, black, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 90%)',
        }}
      />
      <div className="container-wide relative">
        {crumbs ? (
          <Reveal index={0}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    {c.href ? (
                      <Link href={c.href} className="hover:text-terracotta">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {c.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 ? <ChevronRight className="size-3.5" aria-hidden /> : null}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}
        <div className="max-w-4xl">
          <Reveal index={1}>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal index={2}>
            <h1 id={`${sectionId}-title`} className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>
          {lead ? (
            <Reveal index={3}>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{lead}</p>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal index={4} className="mt-8">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  )
}
