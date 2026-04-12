import { describe, expect, it } from 'vitest'
import { analyzeLayerNorm } from './layerNorm'

describe('layerNorm helpers', () => {
  it('keeps the focused sample unchanged under LayerNorm even when peer samples shift', () => {
    const steady = analyzeLayerNorm('shifted', 'steady-peers')
    const shifted = analyzeLayerNorm('shifted', 'shifted-peers')

    expect(steady.samples[0].raw).toEqual(shifted.samples[0].raw)
    expect(steady.samples[0].layerNorm).toEqual(shifted.samples[0].layerNorm)
    expect(steady.samples[0].batchNorm).not.toEqual(shifted.samples[0].batchNorm)
  })

  it('centers the focused sample across its own features under LayerNorm', () => {
    const analysis = analyzeLayerNorm('contrast', 'steady-peers')

    expect(Math.abs(analysis.focusLayerNormStats.mean)).toBeLessThan(0.001)
    expect(analysis.focusLayerNormStats.std).toBeGreaterThan(0.99)
    expect(analysis.focusLayerNormStats.std).toBeLessThan(1.01)
  })

  it('shows a meaningful gap between BatchNorm and LayerNorm when peers drift', () => {
    const analysis = analyzeLayerNorm('balanced', 'shifted-peers')

    expect(analysis.focusBatchVsLayerMaxGap).toBeGreaterThan(0.2)
  })
})
