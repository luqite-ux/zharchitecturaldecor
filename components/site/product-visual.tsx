import Image from 'next/image'
import { cn } from '@/lib/utils'

interface VisualImage {
  src: string
  alt: string
  fit: 'contain' | 'cover'
  focal?: string
  background: 'white' | 'photo'
}

/**
 * Shows the whole product subject. White-background artwork is multiplied into the
 * surrounding tone so there is no picture-frame edge.
 */
export function ProductVisual({
  image,
  className,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
  aspect = 'aspect-square',
  tone = 'bg-stone/60',
}: {
  image: VisualImage
  className?: string
  sizes?: string
  priority?: boolean
  aspect?: string
  tone?: string
}) {
  return (
    <div className={cn('relative overflow-hidden', aspect, tone, className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={image.focal ? { objectPosition: image.focal } : undefined}
        className={cn(
          image.fit === 'contain' ? 'object-contain' : 'object-cover',
          image.background === 'white' && 'mix-blend-multiply',
          image.fit === 'contain' && image.background === 'white' && 'p-3 sm:p-4',
        )}
      />
    </div>
  )
}
