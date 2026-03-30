import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { WeightedSumPage } from './WeightedSumPage'

function getSummaryCard(title: string, hint: string) {
  const cardTitle = screen
    .getAllByText(title)
    .find((element) => element.parentElement?.textContent?.includes(hint))

  return cardTitle?.parentElement ?? null
}

describe('WeightedSumPage', () => {
  it('renders the pedagogical structure alongside the initial weighted sum and binary output', () => {
    renderWithI18n(<WeightedSumPage />, { initialEntries: ['/en/learn/mechanics/perceptron/weighted-sum'] })

    expect(screen.getByRole('heading', { name: 'Weighted sum and bias' })).toBeInTheDocument()
    expect(screen.getByText('How do weights and bias turn the same inputs into a higher or lower perceptron score?')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Core idea' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guided observation prompts' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to learning path/i })).toHaveAttribute('href', '/en/learn')
    expect(screen.getByRole('link', { name: /next: perceptron · decision boundary intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/perceptron/decision-boundary',
    )
    expect(screen.queryByRole('link', { name: /previous: gradient descent intuition/i })).not.toBeInTheDocument()
    expect(screen.getByText(/Previous: Gradient descent intuition/i).closest('[aria-disabled="true"]')).not.toBeNull()
    expect(screen.getByText('Planned')).toBeInTheDocument()
    expect(getSummaryCard('Weighted sum', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('0.60')
    expect(getSummaryCard('Binary output', 'Threshold at 0')).toHaveTextContent('1')
  })

  it('renders Spanish lesson copy on locale-aware routes', () => {
    renderWithI18n(<WeightedSumPage />, { locale: 'es', initialEntries: ['/es/learn/mechanics/perceptron/weighted-sum'] })

    expect(screen.getByRole('heading', { name: 'Suma ponderada y sesgo' })).toBeInTheDocument()
    expect(screen.getByText(/¿Cómo hacen los pesos y el sesgo/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
    expect(getSummaryCard('Suma ponderada', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('0.60')
    expect(getSummaryCard('Salida binaria', 'Umbral en 0')).toHaveTextContent('1')
  })

  it('updates the computation when controls change', () => {
    renderWithI18n(<WeightedSumPage />, { initialEntries: ['/en/learn/mechanics/perceptron/weighted-sum'] })

    const weightControl = screen.getAllByRole('slider')[2]

    fireEvent.change(weightControl, {
      target: { value: '-0.5' },
    })

    expect(getSummaryCard('Weighted sum', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('-0.70')
    expect(getSummaryCard('Binary output', 'Threshold at 0')).toHaveTextContent('0')
  })
})
