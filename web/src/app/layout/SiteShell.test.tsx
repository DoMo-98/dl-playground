import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SiteShell } from './SiteShell'
import { renderWithI18n } from '../../test/renderWithI18n'

describe('SiteShell', () => {
  it('keeps Learn as the only structural top-level navigation item', () => {
    renderWithI18n(<SiteShell />, { initialEntries: ['/en'] })

    const primaryNav = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(within(primaryNav).getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/en/learn')
    expect(within(primaryNav).queryByRole('link', { name: 'First lesson' })).not.toBeInTheDocument()

    expect(screen.getAllByRole('link', { name: 'First lesson' })[0]).toHaveAttribute(
      'href',
      '/en/learn/foundations/perceptron/weighted-sum',
    )
  })

  it('shows distinct accessible names for desktop navigation and mobile menu controls', async () => {
    const user = userEvent.setup()
    renderWithI18n(<SiteShell />, { locale: 'es', initialEntries: ['/es'] })

    expect(screen.getByRole('navigation', { name: 'Navegación principal' })).toBeInTheDocument()

    const menuButton = screen.getByRole('button', { name: 'Abrir menú principal' })
    await user.click(menuButton)

    expect(screen.getByRole('button', { name: 'Cerrar menú principal' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('dialog', { name: 'Menú de navegación móvil' })).toBeInTheDocument()
  })

  it('closes the mobile menu on Escape and outside click', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWithI18n(<SiteShell />, { initialEntries: ['/en'] })

    await user.click(screen.getAllByRole('button', { name: 'Open main menu' })[0])
    expect(screen.getByRole('dialog', { name: 'Mobile navigation menu' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Mobile navigation menu' })).not.toBeInTheDocument()

    unmount()
    renderWithI18n(<SiteShell />, { initialEntries: ['/en'] })

    await user.click(screen.getAllByRole('button', { name: 'Open main menu' })[0])
    expect(screen.getByRole('dialog', { name: 'Mobile navigation menu' })).toBeInTheDocument()

    await user.pointer([{ keys: '[MouseLeft]', target: document.body }])
    expect(screen.queryByRole('dialog', { name: 'Mobile navigation menu' })).not.toBeInTheDocument()
  })
})
