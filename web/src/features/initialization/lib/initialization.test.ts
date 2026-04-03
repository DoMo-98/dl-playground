import { describe, expect, it } from 'vitest'
import { analyzeInitialization } from './initialization'

describe('initialization helpers', () => {
  it('flags tiny ReLU initialization as vanishing', () => {
    const analysis = analyzeInitialization('tiny', 'relu')

    expect(analysis.regime).toBe('vanishing')
    expect(analysis.finalActivationStd).toBeLessThan(0.12)
  })

  it('keeps He initialization in a stable range for ReLU activations', () => {
    const analysis = analyzeInitialization('he', 'relu')

    expect(analysis.regime).toBe('stable')
    expect(analysis.layerSummaries).toHaveLength(4)
    expect(analysis.finalGradientStd).toBeGreaterThan(0.12)
  })

  it('flags oversized ReLU initialization as exploding', () => {
    const analysis = analyzeInitialization('large', 'relu')

    expect(analysis.regime).toBe('exploding')
    expect(analysis.finalGradientStd).toBeGreaterThan(2.2)
  })
})
