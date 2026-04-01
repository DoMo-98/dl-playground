import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { GradientDescentPage } from './GradientDescentPage'

describe('GradientDescentPage', () => {
  it('renders the lesson structure and keeps the sequence linked to the next ready lesson', () => {
    renderWithI18n(<GradientDescentPage />, { initialEntries: ['/en/learn/foundations/optimization/gradient-descent'] })

    expect(screen.getByRole('heading', { name: 'Gradient descent intuition' })).toBeInTheDocument()
    expect(screen.getByText(/How does the learning rate change whether gradient descent converges smoothly/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guided observation prompts' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: mlp · activation functions and non-linearity/i })).toHaveAttribute(
      'href',
      '/en/learn/mechanics/mlp/activations',
    )
    expect(screen.getByText('Stable')).toBeInTheDocument()
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<GradientDescentPage />, { locale: 'es', initialEntries: ['/es/learn/foundations/optimization/gradient-descent'] })

    expect(screen.getByRole('heading', { name: 'Intuición de descenso por gradiente' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
    expect(screen.getByText('Estable')).toBeInTheDocument()
  })

  it('updates the controls and step counter when switching presets and taking a step', () => {
    renderWithI18n(<GradientDescentPage />, { initialEntries: ['/en/learn/foundations/optimization/gradient-descent'] })

    fireEvent.click(screen.getAllByRole('button', { name: /Unstable overshoot/i })[0])
    fireEvent.click(screen.getAllByRole('button', { name: 'Take one step' })[0])

    expect(screen.getByText('0.70')).toBeInTheDocument()
    expect(screen.getByText('1/8')).toBeInTheDocument()
    expect(screen.getAllByText('Current update rule').length).toBeGreaterThan(0)
  })

})
