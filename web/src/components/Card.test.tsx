import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello card</Card>)
    expect(screen.getByText('Hello card')).toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    render(<Card className="custom-class">Content</Card>)
    expect(screen.getByText('Content')).toHaveClass('custom-class')
  })

  it('renders as a different element via the "as" prop', () => {
    render(<Card as="section">Section card</Card>)
    const el = screen.getByText('Section card')
    expect(el.tagName).toBe('SECTION')
  })
})
