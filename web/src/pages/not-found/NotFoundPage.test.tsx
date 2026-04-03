import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../test/renderWithI18n'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  it('sets document.title', () => {
    renderWithI18n(<NotFoundPage />, { initialEntries: ['/en'] })

    expect(document.title).toBe('Page not found — DL Playground')
  })

  it('renders CTAs linking to home and the learning path', () => {
    renderWithI18n(<NotFoundPage />, { initialEntries: ['/en'] })

    const links = screen.getAllByRole('link')
    const homeLink = links.find((l) => l.textContent?.includes('Go to home'))
    const learnLink = links.find((l) => l.textContent?.includes('Back to learning path'))

    expect(homeLink).toHaveAttribute('href', '/en')
    expect(learnLink).toHaveAttribute('href', '/en/learn')
  })
})
