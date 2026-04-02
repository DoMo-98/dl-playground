import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Locale } from '../types/i18n'
import { localizePath, persistLocale, stripLocalePrefix } from '../lib/i18n'
import { I18nContext, messagesByLocale, type I18nContextValue } from './i18n-context'

type I18nProviderProps = {
  locale: Locale
  children: React.ReactNode
}

export function I18nProvider({ locale, children }: I18nProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    persistLocale(locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages: messagesByLocale[locale],
      switchLocale: (nextLocale) => {
        const normalizedPath = stripLocalePrefix(location.pathname)
        navigate(localizePath(nextLocale, normalizedPath) + location.search + location.hash)
      },
      toLocalizedPath: (path) => localizePath(locale, path),
    }),
    [locale, location.pathname, location.search, location.hash, navigate],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
