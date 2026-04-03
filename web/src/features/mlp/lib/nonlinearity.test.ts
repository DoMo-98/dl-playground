import { describe, expect, it } from 'vitest'
import { applyActivation, createCurveSamples, summarizeCurveBehavior } from './nonlinearity'

describe('applyActivation', () => {
  it('linear returns the input unchanged', () => {
    expect(applyActivation('linear', -3)).toBe(-3)
    expect(applyActivation('linear', 5)).toBe(5)
  })

  it('relu clamps negative values to zero', () => {
    expect(applyActivation('relu', -1)).toBe(0)
    expect(applyActivation('relu', 0)).toBe(0)
    expect(applyActivation('relu', 2.5)).toBe(2.5)
  })

  it('tanh is bounded between -1 and 1', () => {
    expect(applyActivation('tanh', 0)).toBeCloseTo(0)
    expect(applyActivation('tanh', 100)).toBeCloseTo(1)
    expect(applyActivation('tanh', -100)).toBeCloseTo(-1)
  })

  it('sigmoid is bounded between 0 and 1', () => {
    expect(applyActivation('sigmoid', 0)).toBeCloseTo(0.5)
    expect(applyActivation('sigmoid', 100)).toBeCloseTo(1)
    expect(applyActivation('sigmoid', -100)).toBeCloseTo(0)
  })
})

describe('createCurveSamples', () => {
  it('returns the expected number of samples with correct shape', () => {
    const samples = createCurveSamples('relu', { hiddenScale: 1, outputScale: 1 }, 5)
    expect(samples).toHaveLength(5)
    expect(samples[0]).toHaveProperty('x')
    expect(samples[0]).toHaveProperty('hidden')
    expect(samples[0]).toHaveProperty('hiddenPre')
    expect(samples[0]).toHaveProperty('output')
    expect(samples[0].hidden).toHaveLength(2)
  })

  it('produces different outputs for linear vs relu', () => {
    const linear = createCurveSamples('linear', { hiddenScale: 1, outputScale: 1 }, 5)
    const relu = createCurveSamples('relu', { hiddenScale: 1, outputScale: 1 }, 5)
    const allSame = linear.every((s, i) => s.output === relu[i].output)
    expect(allSame).toBe(false)
  })
})

describe('summarizeCurveBehavior', () => {
  it('returns affine shape for linear activation', () => {
    const summary = summarizeCurveBehavior('linear', { hiddenScale: 1, outputScale: 1 })
    expect(summary.shape).toBe('affine')
  })

  it('returns piecewise-linear shape for relu', () => {
    const summary = summarizeCurveBehavior('relu', { hiddenScale: 1, outputScale: 1 })
    expect(summary.shape).toBe('piecewise-linear')
  })

  it('returns smooth-saturated shape for tanh', () => {
    const summary = summarizeCurveBehavior('tanh', { hiddenScale: 1, outputScale: 1 })
    expect(summary.shape).toBe('smooth-saturated')
  })

  it('returns bounded-squashing shape for sigmoid', () => {
    const summary = summarizeCurveBehavior('sigmoid', { hiddenScale: 1, outputScale: 1 })
    expect(summary.shape).toBe('bounded-squashing')
  })

  it('includes min, max, and middle output values', () => {
    const summary = summarizeCurveBehavior('relu', { hiddenScale: 1, outputScale: 1 })
    expect(typeof summary.minOutput).toBe('number')
    expect(typeof summary.maxOutput).toBe('number')
    expect(typeof summary.middleOutput).toBe('number')
    expect(summary.maxOutput).toBeGreaterThanOrEqual(summary.minOutput)
  })
})
