import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../test/renderWithI18n'
import { LearnOverviewPage } from './LearnOverviewPage'

describe('LearnOverviewPage', () => {
  it('highlights the first ready lesson and keeps planned lessons non-clickable', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    const startLink = screen.getByRole('link', { name: 'Open lesson' })
    expect(startLink).toHaveAttribute('href', '/en/learn/foundations/optimization/gradient-descent')

    expect(screen.getByRole('link', { name: /weighted sum and bias/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/perceptron/weighted-sum',
    )
    expect(screen.getByRole('link', { name: /decision boundary intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/perceptron/decision-boundary',
    )
    expect(screen.getByRole('link', { name: /activations and non-linearity/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/mlp/activations',
    )
    expect(screen.getAllByText('planned · Not available yet').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /gradient descent/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/optimization/gradient-descent',
    )
  })

  it('localizes visible metadata badges on Spanish routes', () => {
    renderWithI18n(<LearnOverviewPage />, { locale: 'es', initialEntries: ['/es/learn'] })

    expect(screen.getAllByText('interactiva').length).toBeGreaterThan(0)
    expect(screen.getAllByText('lista').length).toBeGreaterThan(0)
    expect(screen.getAllByText('planeada · Aún no disponible').length).toBeGreaterThan(0)
  })

  it('renders derived section readiness summaries from the curriculum registry', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    expect(screen.getAllByText('1/1 ready').length).toBeGreaterThan(0)
    expect(screen.getAllByText('12 min total').length).toBeGreaterThan(0)
    expect(screen.getAllByText('3/3 ready').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Section roadmap').length).toBeGreaterThan(0)
  })
})
