import { insulationCores, panelFinishes, type CoreId, type FinishId } from '@/lib/content/panels'

function speckle(flecks: string[]) {
  return flecks
    .map((c, i) => {
      const size = 5 + i * 2
      return `radial-gradient(circle at ${(i * 29 + 12) % 100}% ${(i * 47 + 20) % 100}%, ${c} 0 1.5px, transparent 2px)`
        .concat(`, radial-gradient(circle at ${(i * 61 + 40) % 100}% ${(i * 23 + 60) % 100}%, ${c} 0 1px, transparent ${size / 4}px)`)
    })
    .join(', ')
}

/**
 * Static, CSS-only exploded cross-section used while the 3D model loads,
 * when WebGL is unavailable, and for reduced-motion users who prefer no canvas.
 */
export function PanelStackFallback({
  finishId,
  coreId,
  explode,
}: {
  finishId: FinishId
  coreId: CoreId
  explode: number
}) {
  const finish = panelFinishes.find((f) => f.id === finishId)!
  const core = insulationCores.find((c) => c.id === coreId)!
  const gap = 22 + explode * 54

  const layers = [
    {
      key: 'finish',
      label: finish.label,
      z: gap * 2,
      style: {
        backgroundColor: finish.swatch.base,
        backgroundImage: speckle(finish.swatch.flecks),
        backgroundSize: '22px 22px, 31px 31px',
      },
    },
    {
      key: 'board',
      label: 'Calcium-silicate board',
      z: gap,
      style: { backgroundColor: '#e4e0d6' },
    },
    {
      key: 'core',
      label: core.label,
      z: 0,
      style: { backgroundColor: core.color },
    },
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1400px' }}>
      <div
        className="relative h-[46%] w-[52%] max-w-[380px] min-w-[200px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(58deg) rotateZ(-36deg) translateZ(-40px)',
        }}
      >
        {layers.map((layer) => (
          <div
            key={layer.key}
            className="absolute inset-0 rounded-sm border border-ink/30 shadow-[0_18px_30px_-12px_rgba(28,37,54,0.35)] transition-transform duration-700"
            style={{ ...layer.style, transform: `translateZ(${layer.z}px)` }}
          />
        ))}
      </div>
    </div>
  )
}
