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
      '/es/learn/foundations/perceptron/weighted-sum',
    )
  })

  it('renders Spanish lesson content on locale-prefixed lesson routes', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn/foundations/perceptron/weighted-sum']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Suma ponderada y sesgo' })).toBeInTheDocument()
    expect(screen.getByText('Ajusta los ingredientes del perceptrón')).toBeInTheDocument()
  })

  it('opens the new gradient descent lesson on locale-prefixed routes', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn/foundations/optimization/gradient-descent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Intuición de descenso por gradiente' })).toBeInTheDocument()
    expect(screen.getByText('Tasa de aprendizaje')).toBeInTheDocument()
  })


  it('opens the convolution lesson on localized routes once it is ready', () => {
    render(
      <MemoryRouter initialEntries={['/es/learn/cnns/convolutions/local-patterns']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Convolución como detector local de patrones' })).toBeInTheDocument()
    expect(screen.getAllByText('Detector local de patrones').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /anterior.*descenso por gradiente/i })).toHaveAttribute(
      'href',
      '/es/learn/foundations/optimization/gradient-descent',
    )
  })

  it('switches locale while preserving the current lesson route', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/en/learn/foundations/perceptron/weighted-sum']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await user.selectOptions(screen.getAllByLabelText('Language')[0], 'es')

    expect(screen.getAllByRole('heading', { name: 'Suma ponderada y sesgo' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /volver a la ruta de aprendizaje/i })[0]).toHaveAttribute('href', '/es/learn')
  })

  it('shows a repository link in the site header', () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('link', { name: 'GitHub repo' })[0]).toHaveAttribute(
      'href',
      'https://github.com/DoMo-98/dl-playground',
    )
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
