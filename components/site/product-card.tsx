import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/content/products'
import { ProductVisual } from '@/components/site/product-visual'
import { Reveal } from '@/components/site/section'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Reveal as="article" index={index} className="group relative flex flex-col overflow-hidden rounded-3xl bg-mineral ring-1 ring-border transition-shadow focus-within:ring-2 focus-within:ring-terracotta hover:shadow-[0_18px_50px_-30px_rgba(60,45,30,0.45)]">
      <ProductVisual
        image={{
          ...product.image,
          fit: product.cardFit ?? product.image.fit,
          focal: product.cardFocal ?? product.image.focal,
        }}
        aspect="aspect-[4/3]"
        tone={product.image.background === 'white' ? 'bg-stone/50' : 'bg-stone'}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">{product.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-terracotta">
          View product
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Reveal>
  )
}
