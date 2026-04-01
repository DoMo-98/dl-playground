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

  it('renders Spanish lesson content on locale-prefixed lesson routes', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn/mechanics/perceptron/weighted-sum']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Suma ponderada y sesgo' })).toBeInTheDocument()
    expect(screen.getByText('Ajusta los ingredientes del perceptrón')).toBeInTheDocument()
  })

  it('opens the new MLP activation lesson on locale-prefixed routes', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn/mechanics/mlp/activations']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Funciones de activación y no linealidad' })).toBeInTheDocument()
    expect(screen.getByText('Activación en la capa oculta')).toBeInTheDocument()
  })

  it('switches locale while preserving the current lesson route', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/en/learn/mechanics/perceptron/weighted-sum']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await user.selectOptions(screen.getAllByLabelText('Language')[0], 'es')

    expect(screen.getAllByRole('heading', { name: 'Suma ponderada y sesgo' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /volver a la ruta de aprendizaje/i })[0]).toHaveAttribute('href', '/es/learn')
  })

  it('keeps the locale on invalid localized routes and shows a localized 404 page', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn/esto-no-existe']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Esta ruta no existe dentro del idioma actual.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ir al inicio' })).toHaveAttribute('href', '/es')
    expect(screen.getAllByRole('link', { name: 'Volver a la ruta de aprendizaje' })[0]).toHaveAttribute('href', '/es/learn')
  })
})
