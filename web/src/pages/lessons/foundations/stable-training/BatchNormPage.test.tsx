import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { BatchNormPage } from './BatchNormPage'

describe('BatchNormPage', () => {
  it('renders the BatchNorm lesson after initialization', () => {
    renderWithI18n(<BatchNormPage />, { initialEntries: ['/en/learn/stable-training/normalization-and-regularization/batchnorm-intuition'] })

    expect(screen.getByRole('heading', { name: 'BatchNorm intuition' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: initialization · bad init vs stable init/i })).toHaveAttribute(
      'href',
      '/en/learn/stable-training/initialization/bad-vs-stable',
    )
    expect(screen.getByText(/shifted upward batch/i)).toBeInTheDocument()
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<BatchNormPage />, { locale: 'es', initialEntries: ['/es/learn/stable-training/normalization-and-regularization/batchnorm-intuition'] })

    expect(screen.getByRole('heading', { name: 'Intuición de BatchNorm' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
  })

  it('switches between training and inference explanations for the same batch', () => {
    renderWithI18n(<BatchNormPage />, { initialEntries: ['/en/learn/stable-training/normalization-and-regularization/batchnorm-intuition'] })

    fireEvent.click(screen.getAllByRole('radio', { name: /batchnorm, inference mode/i })[0])

    expect(screen.getAllByText(/running statistics/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/train-vs-inference behavior matters in BatchNorm/i)).toBeInTheDocument()
  })
})
