'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { projectCases } from '@/lib/content/projects'
import { ProductVisual } from '@/components/site/product-visual'
import { Reveal, Section, SectionHeading } from '@/components/site/section'

const STACK_QUERY = '(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)'
const STICKY_TOP = 112
const STEP = 14

export function ProjectsStack() {
  const listRef = useRef<HTMLOListElement>(null)
  const [stacked, setStacked] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(STACK_QUERY)
    const sync = () => setStacked(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const list = listRef.current
    if (!list || !stacked) return
    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-stack-card]'))
    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        let progress = 0
        if (next) {
          const top = STICKY_TOP + (i + 1) * STEP
          const distance = next.getBoundingClientRect().top - top
          progress = Math.min(1, Math.max(0, 1 - distance / card.offsetHeight))
        }
        card.style.setProperty('--stack-scale', String(1 - progress * 0.05))
        card.style.setProperty('--stack-dim', String(progress * 0.5))
      })
    }
    const schedule = () => {
      if (!visible || frame) return
      frame = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) schedule()
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(list)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
      cards.forEach((c) => {
        c.style.removeProperty('--stack-scale')
        c.style.removeProperty('--stack-dim')
      })
    }
  }, [stacked])

  return (
    <Section sectionId="home-projects" labelledBy="projects-title" className="bg-secondary/60">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-title"
            eyebrow="Projects"
            title="Nine project cases"
            lead="Cases where our materials were supplied. Scope and details are shared on request."
          />
          <Reveal index={3}>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              All project cases
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ol ref={listRef} data-stacked={stacked} className="mt-12 space-y-5 lg:space-y-8">
          {projectCases.map((project, i) => (
            <li
              key={project.slug}
              data-stack-card
              className="data-[stacked=true]:sticky"
              data-stacked={stacked}
              style={stacked ? { top: STICKY_TOP + i * STEP } : undefined}
            >
              <article
                className="relative grid overflow-hidden rounded-3xl border border-border bg-mineral md:grid-cols-12"
                style={
                  stacked
                    ? {
                        transform: 'scale(var(--stack-scale, 1))',
                        transformOrigin: 'center top',
                        willChange: 'transform',
                      }
                    : undefined
                }
              >
                <div className="md:col-span-7">
                  <ProductVisual
                    image={project.image}
                    aspect="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[300px]"
                    tone="bg-transparent"
                    sizes="(min-width: 768px) 58vw, 100vw"
                  />
                </div>
                <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:col-span-5">
                  <div>
                    <p className="eyebrow">
                      Case {String(i + 1).padStart(2, '0')} / {String(projectCases.length).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-balance text-2xl sm:text-3xl">{project.nameEn}</h3>
                  </div>
                  <Link
                    href={`/projects#${project.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-terracotta"
                  >
                    View case
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                {stacked ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-secondary"
                    style={{ opacity: 'var(--stack-dim, 0)' }}
                  />
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
