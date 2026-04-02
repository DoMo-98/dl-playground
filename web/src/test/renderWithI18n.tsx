import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../app/I18nProvider'
import type { Locale } from '../types/i18n'

export function renderWithI18n(ui: ReactElement, options?: { locale?: Locale; initialEntries?: string[] }) {
  const locale = options?.locale ?? 'en'
  const initialEntries = options?.initialEntries ?? [`/${locale}`]

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <I18nProvider locale={locale}>{ui}</I18nProvider>
    </MemoryRouter>,
  )
}
