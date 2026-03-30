import { createContext, useContext } from 'react'
import type { Locale } from '../i18n'
import { esMessages } from '../content/locales/es'
import { enMessages } from '../content/locales/en'

export const messagesByLocale = {
  en: enMessages,
  es: esMessages,
} as const

export type I18nContextValue = {
  locale: Locale
  messages: (typeof messagesByLocale)[Locale]
  switchLocale: (nextLocale: Locale) => void
  toLocalizedPath: (path: string) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }

  return context
}
