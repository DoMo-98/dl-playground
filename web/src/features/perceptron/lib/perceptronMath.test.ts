import { describe, expect, it } from 'vitest'
import { computeBinaryOutput, computeWeightedSum } from './perceptronMath'

describe('perceptronMath', () => {
  it('computes the weighted sum including bias', () => {
    expect(
      computeWeightedSum({
        x1: 1.5,
        x2: -0.5,
        w1: 0.4,
        w2: 0.8,
        bias: -0.1,
      }),
    ).toBeCloseTo(0.1)
  })

  it('returns 1 when the sum is zero or positive', () => {
    expect(computeBinaryOutput(0)).toBe(1)
    expect(computeBinaryOutput(0.01)).toBe(1)
  })

  it('returns 0 when the sum is negative', () => {
    expect(computeBinaryOutput(-0.01)).toBe(0)
  })
})
