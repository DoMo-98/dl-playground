import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('defaults to type="button"', () => {
    render(<Button>Ok</Button>)
    expect(screen.getByRole('button', { name: 'Ok' })).toHaveAttribute('type', 'button')
  })

  it('renders accent variant', () => {
    render(<Button variant="accent">Accent</Button>)
    const btn = screen.getByRole('button', { name: 'Accent' })
    expect(btn.className).toContain('cyan')
  })

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button', { name: 'Ghost' })
    expect(btn.className).toContain('transparent')
  })

  it('fires click handler', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Press</Button>)
    await user.click(screen.getByRole('button', { name: 'Press' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    )
    await user.click(screen.getByRole('button', { name: 'Nope' }))

    expect(onClick).not.toHaveBeenCalled()
  })
})
