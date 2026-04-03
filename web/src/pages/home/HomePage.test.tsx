import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../test/renderWithI18n'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('renders the primary CTA as a link to the learning path', () => {
    renderWithI18n(<HomePage />, { initialEntries: ['/en'] })

    const primaryLinks = screen.getAllByRole('link', { name: /explore learning path/i })
    const primaryLink = primaryLinks.find((el) => el.getAttribute('href') === '/en/learn')
    expect(primaryLink).toBeDefined()
  })

  it('renders the secondary CTA as a link to the first lesson', () => {
    renderWithI18n(<HomePage />, { initialEntries: ['/en'] })

    const secondaryLinks = screen.getAllByRole('link', { name: /open first lesson/i })
    const secondaryLink = secondaryLinks.find(
      (el) => el.getAttribute('href') === '/en/learn/foundations/perceptron/weighted-sum',
    )
    expect(secondaryLink).toBeDefined()
  })
})
