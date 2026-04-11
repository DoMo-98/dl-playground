import { describe, expect, it } from 'vitest'
import { analyzeBatchNorm } from './batchNorm'

describe('batchNorm helpers', () => {
  it('keeps training-mode outputs centered near zero for a shifted batch', () => {
    const analysis = analyzeBatchNorm('shifted', 'train')

    expect(Math.abs(analysis.outputStats.mean)).toBeLessThan(0.001)
    expect(analysis.outputStats.std).toBeGreaterThan(0.99)
    expect(analysis.outputStats.std).toBeLessThan(1.01)
  })

  it('leaves the batch untouched when BatchNorm is off', () => {
    const analysis = analyzeBatchNorm('balanced', 'none')

    expect(analysis.outputStats.mean).toBeCloseTo(analysis.batchStats.mean, 6)
    expect(analysis.outputRange.max).toBeCloseTo(1.4, 6)
  })

  it('uses running statistics during inference instead of recentering perfectly', () => {
    const analysis = analyzeBatchNorm('mixed', 'inference')

    expect(Math.abs(analysis.outputStats.mean)).toBeGreaterThan(0.05)
    expect(analysis.outputStats.std).toBeGreaterThan(1)
  })
})
