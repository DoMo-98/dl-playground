import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithI18n } from '../../../../test/renderWithI18n'
import { LocalPatternPage } from './LocalPatternPage'

describe('LocalPatternPage', () => {
  it('renders the convolution lesson and links it into the learning sequence', () => {
    renderWithI18n(<LocalPatternPage />, { initialEntries: ['/en/learn/cnns/convolutions/local-patterns'] })

    expect(screen.getByRole('heading', { name: 'Convolution as local pattern detector' })).toBeInTheDocument()
    expect(screen.getByText(/A convolution reuses the same kernel weights/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guided observation prompts' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /previous: gradient descent intuition/i })).toHaveAttribute(
      'href',
      '/en/learn/foundations/optimization/gradient-descent',
    )
  })

  it('localizes the page in Spanish', () => {
    renderWithI18n(<LocalPatternPage />, { locale: 'es', initialEntries: ['/es/learn/cnns/convolutions/local-patterns'] })

    expect(screen.getByRole('heading', { name: 'Convolución como detector local de patrones' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preguntas guiadas de observación' })).toBeInTheDocument()
    expect(screen.getByText('Coincidencia positiva')).toBeInTheDocument()
  })

  it('updates the feature map when the learner edits the grid and kernel', () => {
    renderWithI18n(<LocalPatternPage />, { initialEntries: ['/en/learn/cnns/convolutions/local-patterns'] })

    expect(screen.getAllByText('3')[0]).toBeInTheDocument()

    fireEvent.click(screen.getAllByLabelText('Input cell (1, 3)')[0])
    fireEvent.click(screen.getAllByLabelText('Kernel cell (1, 2)')[0])

    expect(screen.getByText((content) => content.includes('0×-1 + 0×1 + 0×1'))).toBeInTheDocument()
    expect(screen.getAllByText('4').length).toBeGreaterThan(0)
  })
})
