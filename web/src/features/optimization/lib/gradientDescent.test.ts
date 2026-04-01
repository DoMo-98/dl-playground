import { describe, expect, it } from 'vitest'
import {
  createLossCurveSamples,
  describeState,
  gradientDescentDomain,
  simulateGradientDescent,
  summarizeTrajectory,
  takeGradientDescentStep,
} from './gradientDescent'

describe('gradient descent helpers', () => {
  it('takes a downhill step opposite to the gradient sign', () => {
    const step = takeGradientDescentStep(-1.8, 0.15)

    expect(step.gradient).toBeLessThan(0)
    expect(step.delta).toBeGreaterThan(0)
    expect(step.nextParameter).toBeGreaterThan(step.parameter)
    expect(describeState(step.nextParameter).loss).toBeLessThan(step.loss)
  })

  it('classifies a moderate learning rate trajectory as stable', () => {
    const stableRun = simulateGradientDescent(-1.8, 0.15, 6)

    expect(summarizeTrajectory(stableRun)).toMatchObject({
      regime: 'stable',
    })
  })

  it('classifies an aggressive learning rate trajectory as unstable because loss rises and bounces', () => {
    const unstableRun = simulateGradientDescent(-1.8, 0.7, 6)

    expect(summarizeTrajectory(unstableRun)).toMatchObject({
      regime: 'unstable',
    })
  })

  it('creates a full loss curve across the configured parameter domain', () => {
    const samples = createLossCurveSamples(5)

    expect(samples[0].parameter).toBe(gradientDescentDomain.min)
    expect(samples[samples.length - 1].parameter).toBeCloseTo(gradientDescentDomain.max)
    expect(samples.every((sample) => Number.isFinite(sample.loss))).toBe(true)
  })
})
