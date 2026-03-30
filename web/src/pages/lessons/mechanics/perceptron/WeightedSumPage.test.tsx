import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WeightedSumPage } from './WeightedSumPage'

function getSummaryCard(title: string, hint: string) {
  const cardTitle = screen
    .getAllByText(title)
    .find((element) => element.parentElement?.textContent?.includes(hint))

  return cardTitle?.parentElement ?? null
}

describe('WeightedSumPage', () => {
  it('renders the pedagogical structure alongside the initial weighted sum and binary output', () => {
    render(
      <MemoryRouter>
        <WeightedSumPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Weighted sum and bias' })).toBeInTheDocument()
    expect(screen.getByText('How do weights and bias turn the same inputs into a higher or lower perceptron score?')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Core idea' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guided observation prompts' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to learning path/i })).toHaveAttribute('href', '/learn')
    expect(screen.getByRole('link', { name: /next: perceptron · decision boundary intuition/i })).toHaveAttribute(
      'href',
      '/learn/mechanics/perceptron/decision-boundary',
    )
    expect(getSummaryCard('Weighted sum', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('0.60')
    expect(getSummaryCard('Binary output', 'Threshold at 0')).toHaveTextContent('1')
  })

  it('updates the computation when controls change', () => {
    render(
      <MemoryRouter>
        <WeightedSumPage />
      </MemoryRouter>,
    )

    const weightControl = screen.getAllByRole('slider')[2]

    fireEvent.change(weightControl, {
      target: { value: '-0.5' },
    })

    expect(getSummaryCard('Weighted sum', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('-0.70')
    expect(getSummaryCard('Binary output', 'Threshold at 0')).toHaveTextContent('0')
  })
})
