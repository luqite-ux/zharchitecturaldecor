'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-border bg-ivory/90 backdrop-blur-md'
          : 'border-transparent bg-ivory/70 backdrop-blur-sm',
      )}
    >
      <div className="container-wide flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.shortName} home`}>
          <Image
            src={siteConfig.logo}
            alt=""
            width={683}
            height={598}
            priority
            className="h-12 w-auto mix-blend-multiply lg:h-14"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-lg font-medium text-ink">Zhenghui</span>
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-soft">
              Decorative Materials
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-terracotta',
                      active ? 'text-terracotta' : 'text-ink',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-terracotta transition-transform duration-300',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-full bg-terracotta px-5 text-sm font-semibold text-white transition-colors hover:bg-[#8f3e1e] sm:inline-flex"
          >
            Request a Quote
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-mineral text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto border-t border-border bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container-wide py-6">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-14 items-center justify-between font-serif text-2xl',
                      active ? 'text-terracotta' : 'text-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-terracotta px-6 text-base font-semibold text-white"
          >
            Request a Quote
          </Link>
          <p className="mt-6 text-sm text-ink-soft">
            <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
        </nav>
      </div>
    </header>
  )
}
