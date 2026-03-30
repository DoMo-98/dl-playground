import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../test/renderWithI18n'
import { LearnOverviewPage } from './LearnOverviewPage'

describe('LearnOverviewPage', () => {
  it('highlights the first ready lesson and keeps planned lessons non-clickable', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    const startLink = screen.getByRole('link', { name: 'Open lesson' })
    expect(startLink).toHaveAttribute('href', '/en/learn/mechanics/perceptron/weighted-sum')

    expect(screen.getByRole('link', { name: /weighted sum and bias/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/perceptron/weighted-sum',
    )
    expect(screen.getByRole('link', { name: /decision boundary intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/perceptron/decision-boundary',
    )
    expect(screen.queryByRole('link', { name: /activations and non-linearity/i })).not.toBeInTheDocument()
    expect(screen.getByText('Activations and non-linearity')).toBeInTheDocument()
  })

  it('renders derived section readiness summaries from the curriculum registry', () => {
    renderWithI18n(<LearnOverviewPage />, { initialEntries: ['/en/learn'] })

    expect(screen.getAllByText('2/3 ready').length).toBeGreaterThan(0)
    expect(screen.getAllByText('30 min total').length).toBeGreaterThan(0)
    expect(screen.getAllByText('0/1 ready').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Section roadmap').length).toBeGreaterThan(0)
  })
})
