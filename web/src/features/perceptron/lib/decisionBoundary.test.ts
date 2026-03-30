import { describe, expect, it } from 'vitest'
import {
  classifyPoint,
  decisionBoundaryDatasets,
  describeDecisionBoundary,
  summarizeDataset,
} from './decisionBoundary'

describe('decisionBoundary helpers', () => {
  it('classifies points with a perceptron threshold at zero', () => {
    expect(classifyPoint({ x: 1, y: 1 }, { w1: 1, w2: 1, bias: -1 })).toBe(1)
    expect(classifyPoint({ x: -1, y: -1 }, { w1: 1, w2: 1, bias: -1 })).toBe(0)
  })

  it('describes a vertical boundary when the y weight is zero', () => {
    expect(describeDecisionBoundary({ w1: 2, w2: 0, bias: -1 })).toMatchObject({
      kind: 'vertical',
      x: 0.5,
      equation: 'x = 0.50',
    })
  })

  it('summarizes matches and mismatches for a prepared dataset', () => {
    const diagonal = decisionBoundaryDatasets[0]
    const summary = summarizeDataset(diagonal, { w1: 1, w2: 1, bias: 0 })

    expect(summary.correctCount).toBe(6)
    expect(summary.incorrectCount).toBe(0)
    expect(summary.accuracy).toBe(1)
  })

  it('still leaves at least one mismatch on the xor trap with a single diagonal line', () => {
    const xorTrap = decisionBoundaryDatasets[1]
    const summary = summarizeDataset(xorTrap, { w1: 1, w2: 1, bias: 0 })

    expect(summary.correctCount).toBe(3)
    expect(summary.incorrectCount).toBe(1)
    expect(summary.accuracy).toBeLessThan(1)
  })
})
