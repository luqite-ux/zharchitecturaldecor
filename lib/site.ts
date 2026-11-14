import { defaultLocale } from './i18n'

export const siteConfig = {
  name: 'Anhui Zhenghui Decorative Materials Co., Ltd.',
  shortName: 'Zhenghui',
  url: 'https://zharchitecturaldecor.com',
  email: 'info@zharchitecturaldecor.com',
  locale: defaultLocale,
  description:
    'Architectural decorative elements, insulated decorative panels and custom design objects from Anhui Zhenghui Decorative Materials Co., Ltd.',
  logo: '/images/brand/zhenghui-logo.png',
} as const

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/projects' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const
