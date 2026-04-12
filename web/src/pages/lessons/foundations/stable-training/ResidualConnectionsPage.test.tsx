import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { ResidualConnectionsPage } from './ResidualConnectionsPage'

describe('ResidualConnectionsPage', () => {
  it('renders the residual lesson after LayerNorm', () => {
    renderWithI18n(<ResidualConnectionsPage />, { initialEntries: ['/en/learn/stable-training/residual-connections/why-skip-connections-help'] })

    expect(screen.getByRole('heading', { name: 'Why skip connections help' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: normalization · layernorm intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/stable-training/normalization-and-regularization/layernorm-intuition',
    )
    expect(screen.getByText(/residual branch behavior/i)).toBeInTheDocument()
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<ResidualConnectionsPage />, { locale: 'es', initialEntries: ['/es/learn/stable-training/residual-connections/why-skip-connections-help'] })

    expect(screen.getByRole('heading', { name: 'Por qué ayudan las skip connections' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
  })

  it('shows stronger preservation when the stack gets deeper', () => {
    renderWithI18n(<ResidualConnectionsPage />, { initialEntries: ['/en/learn/stable-training/residual-connections/why-skip-connections-help'] })

    fireEvent.click(screen.getAllByRole('radio', { name: /8 blocks/i })[0])

    expect(screen.getAllByText(/the identity path still carries the original signal while each block only adds a correction/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/residual output/i).length).toBeGreaterThan(0)
  })
})
