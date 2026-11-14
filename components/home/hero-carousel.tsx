'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '@/lib/content/hero'
import { cn } from '@/lib/utils'

const SLIDE_SECONDS = 8

export function HeroCarousel() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [userPlaying, setUserPlaying] = useState(true)
  const [visible, setVisible] = useState(true)
  const [held, setHeld] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Pointer and scroll depth: only CSS variables change, never layout.
  useEffect(() => {
    const el = rootRef.current
    if (!el || reduced) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let frame = 0
    let px = 0
    let py = 0
    const apply = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const sy = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)))
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
      el.style.setProperty('--sy', sy.toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      px = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      py = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      schedule()
    }
    const onLeave = () => {
      px = 0
      py = 0
      schedule()
    }
    if (fine) {
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    schedule()
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduced])

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length)
  }, [])

  const playing = userPlaying && !reduced
  const running = playing && visible
  const progressState = running ? (held ? 'paused' : 'true') : undefined

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured capabilities"
      className="relative"
      style={{ ['--hero-duration' as string]: `${SLIDE_SECONDS}s` }}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        if (e.key === 'ArrowLeft') go(index - 1)
      }}
    >
      <div className="grid" aria-live={playing ? 'off' : 'polite'}>
        {heroSlides.map((slide, i) => {
          const active = i === index
          const side = slide.copySide === 'right' ? 'lg:justify-end' : 'lg:justify-start'
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${heroSlides.length}: ${slide.role}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active}
              className={cn(
                'hero-slide col-start-1 row-start-1 flex flex-col transition-opacity duration-700 lg:block lg:min-h-[clamp(600px,82svh,760px)]',
                active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0',
              )}
            >
              <div className="relative h-[320px] overflow-hidden sm:h-[420px] lg:absolute lg:inset-0 lg:h-auto">
                <div
                  className="absolute -inset-[4%] will-change-transform"
                  style={{
                    transform:
                      'translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -8px + var(--sy, 0) * 40px), 0)',
                  }}
                >
                  <div className="hero-img-wrap absolute inset-0">
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="hero-img object-cover"
                      style={
                        {
                          '--focal-m': slide.image.focalMobile,
                          '--focal-t': slide.image.focalTablet,
                          '--focal-d': slide.image.focalDesktop,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-4 right-5 hidden font-serif text-[9rem] leading-none text-white/50 lg:block"
                  style={{
                    transform: 'translate3d(calc(var(--px, 0) * 22px), calc(var(--py, 0) * 12px), 0)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-white/50 lg:block"
                  style={{ transform: 'translate3d(calc(var(--px, 0) * 30px), 0, 0)' }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-white/50 lg:block"
                  style={{ transform: 'translate3d(calc(var(--px, 0) * 30px), 0, 0)' }}
                />
              </div>

              <div className="relative lg:absolute lg:inset-0 lg:flex lg:items-center">
                <div className={cn('container-wide w-full py-8 lg:flex lg:py-0', side)}>
                  <div className="hero-copy max-w-[34rem] lg:rounded-3xl lg:border lg:border-white/70 lg:bg-ivory/85 lg:p-10 lg:shadow-[0_30px_80px_-40px_rgba(28,37,54,0.45)] lg:backdrop-blur-md">
                    <p className="eyebrow" style={{ ['--i' as string]: 0 }}>
                      {String(i + 1).padStart(2, '0')} · {slide.role}
                    </p>
                    <h2
                      className="mt-3 text-balance text-4xl leading-[1.04] sm:text-5xl lg:text-[3.4rem]"
                      style={{ ['--i' as string]: 1 }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="mt-5 text-pretty text-base leading-relaxed text-ink-soft sm:text-lg"
                      style={{ ['--i' as string]: 2 }}
                    >
                      {slide.body}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3" style={{ ['--i' as string]: 3 }}>
                      <Link
                        href={slide.primary.href}
                        className="inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-7 text-base font-semibold text-white transition-colors hover:bg-[#8f3e1e]"
                      >
                        {slide.primary.label}
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                      <Link
                        href={slide.secondary.href}
                        className="inline-flex h-12 items-center rounded-full border border-ink/30 bg-mineral/70 px-7 text-base font-semibold text-ink transition-colors hover:border-terracotta hover:text-terracotta"
                      >
                        {slide.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative z-20 border-b border-border bg-ivory/90 backdrop-blur-sm lg:absolute lg:inset-x-0 lg:bottom-0 lg:border-b-0 lg:bg-transparent lg:backdrop-blur-none">
        <div className="container-wide flex items-center gap-4 py-4 lg:rounded-t-2xl lg:bg-ivory/85 lg:backdrop-blur-md">
          <ol className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
            {heroSlides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.role}`}
                  aria-current={i === index}
                  className="group flex w-full flex-col gap-2 py-1 text-left"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-border">
                    <span
                      key={i === index ? `active-${index}` : `idle-${i}`}
                      className="hero-progress-bar absolute inset-0 bg-terracotta"
                      data-running={i === index ? progressState : undefined}
                      data-done={i < index || (i === index && !progressState && reduced) ? 'true' : undefined}
                      onAnimationEnd={(e) => {
                        if (i === index && e.animationName === 'hero-progress') go(index + 1)
                      }}
                    />
                  </span>
                  <span
                    className={cn(
                      'hidden text-xs font-semibold uppercase tracking-[0.14em] transition-colors sm:block',
                      i === index ? 'text-terracotta' : 'text-ink-soft group-hover:text-ink',
                    )}
                  >
                    {slide.role}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-mineral text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-mineral text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setUserPlaying((v) => !v)}
                aria-label={userPlaying ? 'Pause slide rotation' : 'Start slide rotation'}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-mineral text-ink transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {userPlaying ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
