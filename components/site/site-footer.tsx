import Image from 'next/image'
import Link from 'next/link'
import { navItems, siteConfig } from '@/lib/site'
import { productGroups, getProductsByGroup } from '@/lib/content/products'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-stone/60">
      <div className="container-wide grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${siteConfig.shortName} home`}>
            <Image
              src={siteConfig.logo}
              alt=""
              width={683}
              height={598}
              className="h-20 w-auto mix-blend-multiply sm:h-24"
            />
            <span className="font-serif text-xl text-ink">Zhenghui</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
            Architectural decorative elements, insulated decorative panels and custom design objects,
            manufactured by {siteConfig.name}
          </p>
          <p className="mt-5 text-sm">
            <span className="text-ink-soft">Email: </span>
            <a className="font-medium text-ink underline underline-offset-4 hover:text-terracotta" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          <nav aria-label="Footer site links">
            <h2 className="eyebrow !text-ink">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link className="text-ink-soft transition-colors hover:text-terracotta" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {productGroups.map((group) => (
            <nav key={group.id} aria-label={group.name}>
              <h2 className="eyebrow !text-ink">{group.name}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {getProductsByGroup(group.id).map((p) => (
                  <li key={p.slug}>
                    <Link className="text-ink-soft transition-colors hover:text-terracotta" href={`/products/${p.slug}`}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-wide flex flex-col gap-2 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${year} Anhui Zhenghui Decorative Materials Co., Ltd. All rights reserved.`}</p>
          <p>{siteConfig.url.replace('https://', '')}</p>
        </div>
      </div>
    </footer>
  )
}
