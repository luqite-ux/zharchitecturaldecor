export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/** Builds a public path for a locale. The default locale has no prefix. */
export function localizedPath(path: string, locale: Locale = defaultLocale) {
  if (locale === defaultLocale) return path
  return `/${locale}${path === '/' ? '' : path}`
}
