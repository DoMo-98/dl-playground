export { locales, type Locale } from '../types/i18n'
import type { Locale } from '../types/i18n'

const defaultLocale: Locale = 'en'
const localeStorageKey = 'dl-playground-locale'

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'es'
}

function normalizeLocale(value: string | undefined | null): Locale | null {
  if (!value) {
    return null
  }

  const normalized = value.toLowerCase()

  if (normalized.startsWith('es')) {
    return 'es'
  }

  if (normalized.startsWith('en')) {
    return 'en'
  }

  return null
}

export function detectPreferredLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const stored = normalizeLocale(window.localStorage.getItem(localeStorageKey))

  if (stored) {
    return stored
  }

  const browserLocale = normalizeLocale(window.navigator.language)
  return browserLocale ?? defaultLocale
}

export function persistLocale(locale: Locale) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(localeStorageKey, locale)
}

export function localizePath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${normalizedPath === '/' ? '' : normalizedPath}`
}

export function stripLocalePrefix(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const [first, ...rest] = segments

  if (!isLocale(first)) {
    return pathname.startsWith('/') ? pathname : `/${pathname}`
  }

  return rest.length === 0 ? '/' : `/${rest.join('/')}`
}

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
}
