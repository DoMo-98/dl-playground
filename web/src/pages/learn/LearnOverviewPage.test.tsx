import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../test/renderWithI18n'
import { LearnOverviewPage } from './LearnOverviewPage'

describe('LearnOverviewPage', () => {
  afterEach(cleanup)

  it('sets the document title', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    expect(document.title).toBe('Learn — DL Playground')
  })

  it('renders the primary CTA as a Button wrapping a link', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    const startLink = screen.getByRole('link', { name: /open lesson/i })
    // The Button component applies focus-visible ring classes
    expect(startLink.className).toContain('focus-visible:ring')
  })

  it('highlights the first ready lesson and keeps planned lessons non-clickable', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    const startLink = screen.getByRole('link', { name: 'Open lesson' })
    expect(startLink).toHaveAttribute('href', '/en/learn/foundations/perceptron/weighted-sum')

    expect(screen.getByRole('link', { name: /weighted sum and bias/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/perceptron/weighted-sum',
    )
    expect(screen.getByRole('link', { name: /decision boundary intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/perceptron/decision-boundary',
    )
    expect(screen.getByRole('link', { name: /activations and non-linearity/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/mlp/activations',
    )
    expect(screen.getByRole('link', { name: /gradient descent/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/optimization/gradient-descent',
    )
    expect(screen.getByRole('link', { name: /local pattern detector/i })).toHaveAttribute(
      'href',
      '/en/learn/cnns/convolutions/local-patterns',
    )
    expect(screen.getByRole('link', { name: /bad initialization vs stable initialization/i })).toHaveAttribute(
      'href',
      '/en/learn/stable-training/initialization/bad-vs-stable',
    )
  })

  it('localizes visible metadata badges on Spanish routes', () => {
    renderWithI18n(<LearnOverviewPage />, { locale: 'es', initialEntries: ['/es/learn'] })

    expect(screen.getAllByText('interactiva').length).toBeGreaterThan(0)
    expect(screen.getAllByText('lista').length).toBeGreaterThan(0)
  })

  it('renders derived section readiness summaries from the curriculum registry', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    expect(screen.getAllByText('4/4 ready').length).toBeGreaterThan(0)
    expect(screen.getAllByText('42 min total').length).toBeGreaterThan(0)
    expect(screen.getAllByText('1/1 ready').length).toBeGreaterThan(1)
    expect(screen.getAllByText('12 min total').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Section roadmap').length).toBeGreaterThan(0)
    expect(screen.queryAllByText(/thematic taxonomy/i).length).toBeGreaterThan(0)
  })
})
