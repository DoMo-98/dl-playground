import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { OptionCard } from './OptionCard'

describe('OptionCard', () => {
  it('renders children', () => {
    render(
      <OptionCard selected={false} onChange={() => {}}>
        Option A
      </OptionCard>,
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('marks the radio as checked when selected', () => {
    const { container } = render(
      <OptionCard selected onChange={() => {}}>
        Selected
      </OptionCard>,
    )
    const radio = container.querySelector('input[type="radio"]')!
    expect(radio).toBeChecked()
  })

  it('marks the radio as unchecked when not selected', () => {
    const { container } = render(
      <OptionCard selected={false} onChange={() => {}}>
        Not selected
      </OptionCard>,
    )
    const radio = container.querySelector('input[type="radio"]')!
    expect(radio).not.toBeChecked()
  })

  it('applies selected styles when selected', () => {
    render(
      <OptionCard selected onChange={() => {}}>
        Styled
      </OptionCard>,
    )
    const label = screen.getByText('Styled').closest('label')!
    expect(label.className).toContain('cyan-400')
  })

  it('fires onChange when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <OptionCard selected={false} onChange={onChange}>
        Clickable
      </OptionCard>,
    )
    await user.click(screen.getByText('Clickable'))

    expect(onChange).toHaveBeenCalled()
  })
})
