'use client'

import Image from 'next/image'
import { useState } from 'react'
import { feedbackMedia } from '@/lib/content/customer-feedback-media'

const slides = [
  { src: '/images/factory/engraving-machine-daylight.png', alt: 'Engraving machine in the production hall', caption: 'Engraving line' },
  { src: '/images/company/production-workshop.png', alt: 'Customer supplied production workshop', caption: 'Production workshop' },
  { src: '/images/company/factory-exterior.jpg', alt: 'Customer supplied factory exterior', caption: 'Factory exterior' },
  { src: feedbackMedia.factoryForming, alt: 'Workers forming a curved component in the production hall', caption: 'Component forming' },
  { src: feedbackMedia.factoryYard, alt: 'Finished components in the customer factory yard', caption: 'Factory yard' },
  { src: feedbackMedia.factoryWorkshop, alt: 'Workers handling a large component in the production workshop', caption: 'Production workshop' },
]

export function FactoryCarousel() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  return (
    <figure className="relative h-full min-h-[320px] overflow-hidden rounded-3xl bg-stone">
      <Image key={slide.src} src={slide.src} alt={slide.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-mineral/95 px-4 py-1.5 text-xs font-semibold text-ink">{slide.caption}</figcaption>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button type="button" onClick={() => setIndex((index + slides.length - 1) % slides.length)} aria-label="Previous factory image" className="rounded-full bg-mineral/95 px-4 py-2 text-sm font-semibold text-ink">←</button>
        <button type="button" onClick={() => setIndex((index + 1) % slides.length)} aria-label="Next factory image" className="rounded-full bg-mineral/95 px-4 py-2 text-sm font-semibold text-ink">→</button>
      </div>
    </figure>
  )
}
