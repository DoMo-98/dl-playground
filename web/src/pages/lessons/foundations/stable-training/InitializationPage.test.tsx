import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { InitializationPage } from './InitializationPage'

describe('InitializationPage', () => {
  it('renders the initialization lesson and links it after convolution', () => {
    renderWithI18n(<InitializationPage />, { initialEntries: ['/en/learn/stable-training/initialization/bad-vs-stable'] })

    expect(screen.getByRole('heading', { name: 'Bad initialization vs stable initialization' })).toBeInTheDocument()
    expect(screen.getByText(/How much can the starting weight scale change what a deep network passes forward/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: convolution as local pattern detector/i })).toHaveAttribute(
      'href',
      '/en/learn/cnns/convolutions/local-patterns',
    )
    expect(screen.getAllByText('Stable range').length).toBeGreaterThan(0)
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<InitializationPage />, { locale: 'es', initialEntries: ['/es/learn/stable-training/initialization/bad-vs-stable'] })

    expect(screen.getByRole('heading', { name: 'Mala inicialización vs inicialización estable' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
    expect(screen.getAllByText('Rango estable').length).toBeGreaterThan(0)
  })

  it('updates the interpretation when switching from a stable preset to an oversized one', () => {
    renderWithI18n(<InitializationPage />, { initialEntries: ['/en/learn/stable-training/initialization/bad-vs-stable'] })

    fireEvent.click(screen.getAllByRole('radio', { name: /oversized weights/i })[0])

    expect(screen.getAllByText('Exploding range').length).toBeGreaterThan(0)
    expect(screen.getByText(/oversized weights with RELU changes the network before training even starts/i)).toBeInTheDocument()
  })
})
