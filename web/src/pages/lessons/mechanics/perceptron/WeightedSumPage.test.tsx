import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WeightedSumPage } from './WeightedSumPage'

function getSummaryCard(title: string, hint: string) {
  const cardTitle = screen
    .getAllByText(title)
    .find((element) => element.parentElement?.textContent?.includes(hint))

  return cardTitle?.parentElement ?? null
}

describe('WeightedSumPage', () => {
  it('renders the initial weighted sum and binary output', () => {
    render(<WeightedSumPage />)

    expect(screen.getByRole('heading', { name: 'Weighted sum and bias' })).toBeInTheDocument()
    expect(getSummaryCard('Weighted sum', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('0.60')
    expect(getSummaryCard('Binary output', 'Threshold at 0')).toHaveTextContent('1')
  })

  it('updates the computation when controls change', () => {
    render(<WeightedSumPage />)

    const weightControl = screen.getAllByRole('slider')[2]

    fireEvent.change(weightControl, {
      target: { value: '-0.5' },
    })

    expect(getSummaryCard('Weighted sum', 'x₁·w₁ + x₂·w₂ + b')).toHaveTextContent('-0.70')
    expect(getSummaryCard('Binary output', 'Threshold at 0')).toHaveTextContent('0')
  })
})
