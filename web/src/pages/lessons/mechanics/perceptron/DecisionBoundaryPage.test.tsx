import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { DecisionBoundaryPage } from './DecisionBoundaryPage'

function renderPage(locale: 'en' | 'es' = 'en') {
  renderWithI18n(<DecisionBoundaryPage />, {
    locale,
    initialEntries: [`/${locale}/learn/mechanics/perceptron/decision-boundary`],
  })
}

describe('DecisionBoundaryPage', () => {
  it('renders the lesson with the initial separable dataset solved by the default boundary', () => {
    renderPage()

    expect(screen.getByRole('heading', { name: 'Decision boundary intuition' })).toBeInTheDocument()
    expect(screen.getByText('6 / 6')).toBeInTheDocument()
    expect(screen.getByText('1.00·x + 1.00·y + 0 = 0')).toBeInTheDocument()
  })

  it('renders Spanish dataset and legend copy on localized routes', () => {
    renderPage('es')

    expect(screen.getByRole('heading', { name: 'Intuición de frontera de decisión' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Separación diagonal' })).toBeInTheDocument()
    expect(screen.getByText('Plano de clasificación 2D')).toBeInTheDocument()
    expect(screen.getByText(/Región predicha como clase 1/)).toBeInTheDocument()
  })

  it('updates the boundary summary when a weight change makes the split worse', () => {
    renderPage()

    const w1Slider = screen.getAllByRole('slider')[0]

    fireEvent.change(w1Slider, {
      target: { value: '-1' },
    })

    expect(screen.getByText('2 / 6')).toBeInTheDocument()
    expect(screen.getByText('-1.00·x + 1.00·y + 0 = 0')).toBeInTheDocument()
  })

  it('switches to the xor preset and warns that one line cannot separate it cleanly', () => {
    renderPage()

    fireEvent.click(screen.getAllByRole('radio')[1])

    expect(screen.getByRole('heading', { name: 'XOR trap' })).toBeInTheDocument()
    expect(screen.getAllByText(/Mismatched points/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/A single perceptron stays linear/i)).toBeInTheDocument()
  })
})
