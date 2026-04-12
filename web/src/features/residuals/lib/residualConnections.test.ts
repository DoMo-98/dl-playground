import { describe, expect, it } from 'vitest'
import { analyzeResidualStack } from './residualConnections'

describe('residual connection helpers', () => {
  it('preserves the input signal better than a plain stack at moderate depth', () => {
    const analysis = analyzeResidualStack('denoise', 4)

    expect(analysis.layers).toHaveLength(4)
    expect(analysis.finalResidualDistance).toBeLessThan(analysis.finalPlainDistance)
    expect(analysis.preservationGain).toBeGreaterThan(1.2)
  })

  it('keeps the residual path closer to the input even when depth increases', () => {
    const analysis = analyzeResidualStack('denoise', 8)

    expect(analysis.finalResidualDistance).toBeLessThan(analysis.finalPlainDistance)
    expect(analysis.features).toHaveLength(4)
  })

  it('shows that the plain stack collapses to a much smaller norm than the residual stack', () => {
    const analysis = analyzeResidualStack('context-mix', 8)
    const lastLayer = analysis.layers.at(-1)

    expect(lastLayer).toBeDefined()
    expect(lastLayer!.plainNorm).toBeLessThan(lastLayer!.residualNorm)
  })
})
