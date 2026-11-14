import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { siteConfig } from '@/lib/site'
import { cookies } from 'next/headers'
import { PREVIEW_COOKIE } from '@/lib/site-content/site-content'
import './globals.css'

const display = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const body = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Anhui Zhenghui Decorative Materials | Architectural Decorative Elements and Insulated Panels',
    template: '%s | Anhui Zhenghui Decorative Materials',
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/images/banners/hero-surfaces.jpg'],
  },
  icons: { icon: '/images/brand/zhenghui-logo.png', apple: '/images/brand/zhenghui-logo.png' },
}

export const viewport: Viewport = {
  themeColor: '#f7f3ec',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const preview = Boolean((await cookies()).get(PREVIEW_COOKIE)?.value)
  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': `${siteConfig.url}/#organization`,
    name: 'Anhui Zhenghui Decorative Materials Co., Ltd.', url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/zhenghui-logo.png`, email: siteConfig.email,
    telephone: '+86 135 8512 6655',
    address: { '@type': 'PostalAddress', addressLocality: 'Tianchang', addressRegion: 'Anhui', addressCountry: 'CN' },
  }
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteConfig.url}/#website`, url: siteConfig.url, name: siteConfig.name, publisher: { '@id': `${siteConfig.url}/#organization` }, inLanguage: 'en' }
  return (
    <html lang={siteConfig.locale} className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organization, website]) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {preview ? (
          <div className="sticky top-0 z-[90] border-b border-terracotta/30 bg-[#fff5ec] px-4 py-2 text-center text-sm text-ink">
            Content preview is active. Changes are private and not indexed.
            <form action="/api/site-content/exit-preview" method="post" className="ml-3 inline">
              <button type="submit" className="font-semibold text-terracotta underline underline-offset-4">Exit preview</button>
            </form>
          </div>
        ) : null}
        <main id="main-content" className="min-h-[60vh]">
          {children}
        </main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && !preview && <Analytics />}
      </body>
    </html>
  )
}
