export type PerceptronBoundaryParams = {
  w1: number
  w2: number
  bias: number
}

export type DecisionPoint = {
  id: string
  x: number
  y: number
  label: 0 | 1
}

export type DecisionDataset = {
  id: string
  name: string
  description: string
  note?: string
  points: DecisionPoint[]
}

export type BoundaryLine =
  | {
      kind: 'line'
      p1: { x: number; y: number }
      p2: { x: number; y: number }
      equation: string
    }
  | {
      kind: 'vertical'
      x: number
      equation: string
    }
  | {
      kind: 'none'
      equation: string
    }

export const decisionBoundaryDatasets: DecisionDataset[] = [
  {
    id: 'diagonal-separable',
    name: 'Diagonal split',
    description: 'A small linearly separable set where the positive class lives toward the upper-right.',
    points: [
      { id: 'a', x: -1.4, y: -1.2, label: 0 },
      { id: 'b', x: -0.9, y: -0.6, label: 0 },
      { id: 'c', x: -0.4, y: -1.1, label: 0 },
      { id: 'd', x: 0.6, y: 0.9, label: 1 },
      { id: 'e', x: 1.2, y: 0.4, label: 1 },
      { id: 'f', x: 1.4, y: 1.3, label: 1 },
    ],
  },
  {
    id: 'xor-trap',
    name: 'XOR trap',
    description: 'This preset shows a classic limit: one straight line cannot separate opposite corners cleanly.',
    note: 'A single perceptron stays linear, so some points remain mismatched no matter how you rotate the boundary.',
    points: [
      { id: 'a', x: -1.2, y: -1.2, label: 0 },
      { id: 'b', x: -1.2, y: 1.2, label: 1 },
      { id: 'c', x: 1.2, y: -1.2, label: 1 },
      { id: 'd', x: 1.2, y: 1.2, label: 0 },
    ],
  },
]

export function classifyPoint(point: Pick<DecisionPoint, 'x' | 'y'>, params: PerceptronBoundaryParams) {
  const score = params.w1 * point.x + params.w2 * point.y + params.bias
  return score >= 0 ? 1 : 0
}

export function summarizeDataset(dataset: DecisionDataset, params: PerceptronBoundaryParams) {
  const predicted = dataset.points.map((point) => {
    const prediction = classifyPoint(point, params)

    return {
      ...point,
      prediction,
      correct: prediction === point.label,
    }
  })

  const correctCount = predicted.filter((point) => point.correct).length

  return {
    points: predicted,
    correctCount,
    incorrectCount: predicted.length - correctCount,
    accuracy: predicted.length ? correctCount / predicted.length : 0,
  }
}

function formatSigned(value: number) {
  const rounded = Number(value.toFixed(2))
  return rounded >= 0 ? `+ ${rounded}` : `- ${Math.abs(rounded)}`
}

export function describeDecisionBoundary({ w1, w2, bias }: PerceptronBoundaryParams): BoundaryLine {
  if (w1 === 0 && w2 === 0) {
    return {
      kind: 'none',
      equation: `0·x + 0·y ${formatSigned(bias)} = 0`,
    }
  }

  if (w2 === 0) {
    const x = -bias / w1
    return {
      kind: 'vertical',
      x,
      equation: `x = ${x.toFixed(2)}`,
    }
  }

  const x1 = -2
  const y1 = (-bias - w1 * x1) / w2
  const x2 = 2
  const y2 = (-bias - w1 * x2) / w2

  return {
    kind: 'line',
    p1: { x: x1, y: y1 },
    p2: { x: x2, y: y2 },
    equation: `${w1.toFixed(2)}·x + ${w2.toFixed(2)}·y ${formatSigned(bias)} = 0`,
  }
}

export function projectToViewport(value: number, min = -2, max = 2, size = 320) {
  return ((value - min) / (max - min)) * size
}
