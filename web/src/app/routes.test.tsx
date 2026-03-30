import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './routes'

describe('localized app routing', () => {
  it('renders Spanish content on locale-prefixed routes', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Lecciones interactivas de deep learning' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Abrir lección' })).toHaveAttribute(
      'href',
      '/es/learn/mechanics/perceptron/weighted-sum',
    )
  })

  it('switches locale while preserving the current lesson route', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/en/learn/mechanics/perceptron/weighted-sum']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await user.selectOptions(screen.getAllByLabelText('Language')[0], 'es')

    expect(screen.getByRole('heading', { name: 'Weighted sum and bias' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver a la ruta de aprendizaje/i })).toHaveAttribute('href', '/es/learn')
  })
})
