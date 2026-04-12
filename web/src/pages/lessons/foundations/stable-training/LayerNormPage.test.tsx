import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { LayerNormPage } from './LayerNormPage'

describe('LayerNormPage', () => {
  it('renders the LayerNorm lesson after BatchNorm', () => {
    renderWithI18n(<LayerNormPage />, { initialEntries: ['/en/learn/stable-training/normalization-and-regularization/layernorm-intuition'] })

    expect(screen.getByRole('heading', { name: 'LayerNorm intuition' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: normalization · batchnorm intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/stable-training/normalization-and-regularization/batchnorm-intuition',
    )
    expect(screen.getByText(/focused sample preset/i)).toBeInTheDocument()
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<LayerNormPage />, { locale: 'es', initialEntries: ['/es/learn/stable-training/normalization-and-regularization/layernorm-intuition'] })

    expect(screen.getByRole('heading', { name: 'Intuición de LayerNorm' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
  })

  it('explains the batch-dependence contrast when peer samples shift', () => {
    renderWithI18n(<LayerNormPage />, { initialEntries: ['/en/learn/stable-training/normalization-and-regularization/layernorm-intuition'] })

    fireEvent.click(screen.getAllByRole('radio', { name: /shifted peers/i })[0])

    expect(screen.getByText(/per-sample normalization does not depend on who else arrived in the batch/i)).toBeInTheDocument()
    expect(screen.getAllByText(/layernorm output/i).length).toBeGreaterThan(0)
  })
})
