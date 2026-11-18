'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, Box, Layers, PanelTop } from 'lucide-react'
import {
  insulationCores,
  panelFinishes,
  structuralLayer,
  type CoreId,
  type FinishId,
} from '@/lib/content/panels'
import { PanelStackFallback } from './panel-stack-fallback'
import type { PanelView } from './panel-scene'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

const PanelScene = dynamic(() => import('./panel-scene'), { ssr: false })

const views: { id: PanelView; label: string; icon: typeof Box }[] = [
  { id: 'angle', label: 'Angle', icon: Box },
  { id: 'section', label: 'Section', icon: Layers },
  { id: 'front', label: 'Front', icon: PanelTop },
]

function canUseWebGL() {
  try {
    const c = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
  meta,
  swatch,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
  meta?: string
  swatch: string
}) {
  return (
    <label className="relative block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-mineral px-3.5 py-2.5 text-sm font-medium text-ink transition-all peer-checked:border-terracotta peer-checked:bg-terracotta-soft/60 peer-checked:shadow-[inset_0_0_0_1px_var(--terracotta)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracotta hover:border-stone-deep">
        <span
          aria-hidden
          className="size-5 shrink-0 rounded-full border border-ink/20"
          style={{ background: swatch }}
        />
        <span className="flex-1 leading-tight">{label}</span>
        {meta ? (
          <span className="rounded-full bg-ivory px-2 py-0.5 text-xs font-semibold text-ink-soft">{meta}</span>
        ) : null}
      </span>
    </label>
  )
}

export function MaterialExplorer() {
  const uid = useId()
  const stageRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [webgl, setWebgl] = useState<'checking' | 'ok' | 'unavailable'>('checking')
  const [ready, setReady] = useState(false)
  const [finishId, setFinishId] = useState<FinishId>('real-stone-finish')
  const [coreId, setCoreId] = useState<CoreId>('eps')
  const [explode, setExplode] = useState(0.7)
  const [view, setView] = useState<PanelView>('angle')
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [coarse] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '320px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    const frame = requestAnimationFrame(() => setWebgl(canUseWebGL() ? 'ok' : 'unavailable'))
    return () => cancelAnimationFrame(frame)
  }, [near])

  const finish = panelFinishes.find((f) => f.id === finishId)!
  const core = insulationCores.find((c) => c.id === coreId)!
  const showCanvas = near && webgl === 'ok'
  const description = `Exploded cross-section of an insulated decorative panel: ${finish.label} surface, ${structuralLayer.label} structural layer and ${core.label} insulation core.`

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div
          ref={stageRef}
          role="img"
          aria-label={description}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_50%_40%,#fcfbf8_0%,#efe8da_70%,#e7dfd2_100%)] sm:aspect-[16/11]"
        >
          <PanelStackFallback finishId={finishId} coreId={coreId} explode={explode} />
          {showCanvas ? (
            <div
              className={cn('absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#fcfbf8_0%,#efe8da_70%,#e7dfd2_100%)] transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
            >
              <PanelScene
                finishId={finishId}
                coreId={coreId}
                explode={explode}
                view={view}
                reducedMotion={reduced}
                coarsePointer={coarse}
                onReady={() => setReady(true)}
                onUnavailable={() => setWebgl('unavailable')}
              />
            </div>
          ) : null}

          {showCanvas && !ready ? (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-mineral/90 px-3 py-1.5 text-xs font-medium text-ink-soft">
              <Spinner className="size-3.5" />
              Loading 3D model
            </div>
          ) : null}
          {webgl === 'unavailable' ? (
            <p className="absolute bottom-4 left-4 right-4 rounded-lg bg-mineral/90 px-3 py-2 text-xs text-ink-soft">
              3D view is not available on this device. Showing a static exploded section instead.
            </p>
          ) : null}

          <ul className="pointer-events-none absolute left-4 top-4 hidden space-y-1.5 text-xs font-semibold text-ink sm:block">
            <li className="rounded-full bg-mineral/90 px-3 py-1">Finish · {finish.label}</li>
            <li className="rounded-full bg-mineral/90 px-3 py-1">Structure · {structuralLayer.label}</li>
            <li className="rounded-full bg-mineral/90 px-3 py-1">Core · {core.label}</li>
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div role="group" aria-label="Camera view" className="inline-flex rounded-full border border-border bg-mineral p-1">
            {views.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                aria-pressed={view === id}
                className={cn(
                  'inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors',
                  view === id ? 'bg-ink text-white' : 'text-ink hover:text-terracotta',
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>
          <div className="flex min-w-[220px] flex-1 items-center gap-3">
            <label htmlFor={`${uid}-explode`} className="text-sm font-medium text-ink">
              Explode
            </label>
            <input
              id={`${uid}-explode`}
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={explode}
              onChange={(e) => setExplode(Number(e.target.value))}
              aria-valuetext={`${Math.round(explode * 100)} percent separated`}
              className="h-11 flex-1 cursor-pointer accent-[#a64a27]"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-soft">
          Drag the model on desktop to rotate it. Core colours in the model are illustrative.
        </p>
      </div>

      <div className="space-y-7 lg:col-span-5">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">1 · Finish family</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {panelFinishes.map((f) => (
              <RadioCard
                key={f.id}
                name={`${uid}-finish`}
                value={f.id}
                checked={finishId === f.id}
                onChange={() => setFinishId(f.id)}
                label={f.label}
                swatch={f.swatch.base}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-ink">2 · Insulation core</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {insulationCores.map((c) => (
              <RadioCard
                key={c.id}
                name={`${uid}-core`}
                value={c.id}
                checked={coreId === c.id}
                onChange={() => setCoreId(c.id)}
                label={c.label}
                meta={c.fireClass}
                swatch={c.color}
              />
            ))}
          </div>
        </fieldset>

        <div className="rounded-2xl border border-border bg-mineral p-5" aria-live="polite">
          <p className="eyebrow">Your selection</p>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-ink">{finish.label}</dt>
              <dd className="text-ink-soft">{finish.summary}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{structuralLayer.label}</dt>
              <dd className="text-ink-soft">{structuralLayer.description}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">
                {core.label} · Fire class {core.fireClass}
              </dt>
              <dd className="text-ink-soft">{core.description}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-ink-soft">
            Thickness and thermal values are confirmed per project.
          </p>
          <Link
            href={`/contact?product=${finishId}`}
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-terracotta px-6 text-sm font-semibold text-white transition-colors hover:bg-[#8f3e1e]"
          >
            Request this configuration
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
