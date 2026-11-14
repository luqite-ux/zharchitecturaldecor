'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  sectionId: string
  labelledBy?: string
  className?: string
  children: ReactNode
}

/**
 * Marks a section as in view only when it actually enters the viewport.
 * Without JS, reduced motion, or no IntersectionObserver, content is simply visible.
 */
export function Section({ sectionId, labelledBy, className, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      el.dataset.inview = 'true'
      return
    }
    el.dataset.armed = 'true'
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.inview = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      data-section-id={sectionId}
      aria-labelledby={labelledBy}
      className={cn('relative py-20 sm:py-24 lg:py-28', className)}
    >
      {children}
    </section>
  )
}

export function Reveal({
  index = 0,
  className,
  children,
  as: Tag = 'div',
}: {
  index?: number
  className?: string
  children: ReactNode
  as?: 'div' | 'li' | 'article' | 'p'
}) {
  return (
    <Tag
      className={cn('reveal-item', className)}
      style={{ ['--i' as string]: index }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
  as: Heading = 'h2',
}: {
  id: string
  eyebrow: string
  title: string
  lead?: string
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <Reveal index={0}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal index={1}>
        <Heading id={id} className="mt-3 text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
          {title}
        </Heading>
      </Reveal>
      {lead ? (
        <Reveal index={2}>
          <p className="mt-5 text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
