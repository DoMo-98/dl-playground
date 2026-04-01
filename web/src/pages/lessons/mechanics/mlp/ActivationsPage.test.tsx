import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { ActivationsPage } from './ActivationsPage'

describe('ActivationsPage', () => {
  it('renders the MLP lesson structure and links it into the lesson sequence', () => {
    renderWithI18n(<ActivationsPage />, { initialEntries: ['/en/learn/mechanics/mlp/activations'] })

    expect(screen.getByRole('heading', { name: 'Activation functions and non-linearity' })).toBeInTheDocument()
    expect(
      screen.getByText(
        'What changes when the same tiny multilayer network keeps its hidden layer linear versus passing it through a non-linear activation?',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guided observation prompts' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: perceptron · decision boundary intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/perceptron/decision-boundary',
    )
    expect(screen.getByRole('link', { name: /next: gradient descent intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/optimization/gradient-descent',
    )
    expect(screen.queryByText('Planned')).not.toBeInTheDocument()
    expect(screen.getByText('Affine / still effectively one line')).toBeInTheDocument()
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<ActivationsPage />, { locale: 'es', initialEntries: ['/es/learn/mechanics/mlp/activations'] })

    expect(screen.getByRole('heading', { name: 'Funciones de activación y no linealidad' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
    expect(screen.getByText('Afín / sigue siendo prácticamente una línea')).toBeInTheDocument()
  })

  it('updates the interpretation when switching to a non-linear activation', () => {
    renderWithI18n(<ActivationsPage />, { initialEntries: ['/en/learn/mechanics/mlp/activations'] })

    fireEvent.click(screen.getAllByRole('radio', { name: /relu/i })[0])

    expect(screen.getByText('Piecewise-linear / bends by switching units on')).toBeInTheDocument()
    expect(screen.getByText(/ReLU introduces kinks where hidden units switch on or off/i)).toBeInTheDocument()
  })
})
