import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Control } from './Control'

describe('Control', () => {
  function makeProps(overrides: Partial<Parameters<typeof Control>[0]> = {}) {
    return {
      label: 'Learning rate',
      value: 0.5,
      onChange: vi.fn(),
      min: 0,
      max: 1,
      step: 0.01,
      ...overrides,
    }
  }

  it('renders the label text', () => {
    const { container } = render(<Control {...makeProps()} />)
    expect(container).toHaveTextContent('Learning rate')
  })

  it('displays the formatted value', () => {
    const { container } = render(<Control {...makeProps()} />)
    expect(container).toHaveTextContent('0.50')
  })

  it('renders a range input with correct attributes', () => {
    const { container } = render(<Control {...makeProps()} />)
    const slider = container.querySelector('input[type="range"]')!
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '1')
    expect(slider).toHaveAttribute('step', '0.01')
  })

  it('calls onChange when the slider value changes', () => {
    const onChange = vi.fn()
    const { container } = render(<Control {...makeProps({ onChange })} />)
    const slider = container.querySelector('input[type="range"]')!

    fireEvent.change(slider, { target: { value: '0.75' } })

    expect(onChange).toHaveBeenCalledWith(0.75)
  })
})
