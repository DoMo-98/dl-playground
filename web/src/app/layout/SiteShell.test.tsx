import { cleanup, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { SiteShell } from './SiteShell'
import { renderWithI18n } from '../../test/renderWithI18n'

afterEach(() => {
  cleanup()
})

describe('SiteShell', () => {
  it('keeps Learn as the only structural top-level navigation item', () => {
    renderWithI18n(<SiteShell />, { initialEntries: ['/en'] })

    const primaryNav = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(within(primaryNav).getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/en/learn')
    expect(within(primaryNav).queryByRole('link', { name: 'First lesson' })).not.toBeInTheDocument()

    expect(screen.getByText('Start here')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /First lesson/ })[0]).toHaveAttribute(
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

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(menuButton).toHaveAccessibleName('Cerrar menú principal')
    expect(screen.getByRole('dialog', { name: 'Menú de navegación móvil' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
  })

  it('closes the mobile menu on Escape and outside click while restoring focus to the trigger', async () => {
    const user = userEvent.setup()
    renderWithI18n(<SiteShell />, { initialEntries: ['/en'] })

    const openButton = screen.getByRole('button', { name: 'Open main menu' })
    await user.click(openButton)

    const dialog = screen.getByRole('dialog', { name: 'Mobile navigation menu' })
    expect(dialog).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Mobile navigation menu' })).not.toBeInTheDocument()
    await waitFor(() => expect(openButton).toHaveFocus())

    await user.click(openButton)
    expect(screen.getByRole('dialog', { name: 'Mobile navigation menu' })).toBeInTheDocument()

    await user.click(screen.getByTestId('mobile-menu-overlay'))
    expect(screen.queryByRole('dialog', { name: 'Mobile navigation menu' })).not.toBeInTheDocument()
    await waitFor(() => expect(openButton).toHaveFocus())
  })
})
