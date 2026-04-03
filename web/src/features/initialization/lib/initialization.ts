export type InitializationMode = 'tiny' | 'xavier' | 'he' | 'large'
export type ActivationMode = 'tanh' | 'relu'
export type StabilityRegime = 'vanishing' | 'stable' | 'exploding'

export type LayerSummary = {
  layerIndex: number
  activationStd: number
  activationMeanAbs: number
  zeroFraction: number
  gradientStd: number
  gradientMeanAbs: number
}

export type InitializationAnalysis = {
  mode: InitializationMode
  activation: ActivationMode
  layerSummaries: LayerSummary[]
  finalActivationStd: number
  finalGradientStd: number
  regime: StabilityRegime
}

type Matrix = number[][]

type InitConfig = {
  id: InitializationMode
  weightStd: (fanIn: number, activation: ActivationMode) => number
}

const layerSizes = [6, 8, 8, 8, 8]
const sampleCount = 6

const initConfigs: InitConfig[] = [
  { id: 'tiny', weightStd: () => 0.12 },
  { id: 'xavier', weightStd: (fanIn) => Math.sqrt(1 / fanIn) },
  { id: 'he', weightStd: (fanIn) => Math.sqrt(2 / fanIn) },
  { id: 'large', weightStd: () => 1.35 },
]

function createSeededRandom(seed: number) {
  let current = seed >>> 0

  return () => {
    current = (1664525 * current + 1013904223) >>> 0
    return current / 0xffffffff
  }
}

function randomSigned(random: () => number) {
  return random() * 2 - 1
}

function createMatrix(rows: number, cols: number, seed: number, scale: number): Matrix {
  const random = createSeededRandom(seed)
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => randomSigned(random) * scale),
  )
}

function createInputSamples(): Matrix {
  const random = createSeededRandom(42)
  return Array.from({ length: sampleCount }, () =>
    Array.from({ length: layerSizes[0] }, () => randomSigned(random)),
  )
}

function transpose(matrix: Matrix): Matrix {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))
}

function matMul(left: Matrix, right: Matrix): Matrix {
  return left.map((leftRow) =>
    right[0].map((_, colIndex) =>
      leftRow.reduce((sum, value, innerIndex) => sum + value * right[innerIndex][colIndex], 0),
    ),
  )
}

function applyActivation(value: number, activation: ActivationMode) {
  if (activation === 'relu') {
    return Math.max(0, value)
  }

  return Math.tanh(value)
}

function applyDerivative(value: number, activation: ActivationMode) {
  if (activation === 'relu') {
    return value > 0 ? 1 : 0
  }

  const tanhValue = Math.tanh(value)
  return 1 - tanhValue * tanhValue
}

function flatten(matrix: Matrix) {
  return matrix.flat()
}

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function std(values: number[]) {
  const average = mean(values)
  return Math.sqrt(values.reduce((sum, value) => sum + (value - average) ** 2, 0) / values.length)
}

function meanAbs(values: number[]) {
  return mean(values.map((value) => Math.abs(value)))
}

function zeroFraction(values: number[]) {
  return values.filter((value) => Math.abs(value) < 1e-6).length / values.length
}

export function analyzeInitialization(mode: InitializationMode, activation: ActivationMode): InitializationAnalysis {
  const config = initConfigs.find((candidate) => candidate.id === mode) ?? initConfigs[0]
  const weights = layerSizes.slice(0, -1).map((fanIn, index) => {
    const fanOut = layerSizes[index + 1]
    const scale = config.weightStd(fanIn, activation)
    return createMatrix(fanIn, fanOut, 100 + index * 17 + mode.length * 13 + activation.length * 7, scale)
  })

  const preActivations: Matrix[] = []
  const activations: Matrix[] = [createInputSamples()]

  for (const weightMatrix of weights) {
    const z = matMul(activations[activations.length - 1], weightMatrix)
    preActivations.push(z)
    activations.push(z.map((row) => row.map((value) => applyActivation(value, activation))))
  }

  let gradients: Matrix = Array.from({ length: sampleCount }, () => Array.from({ length: layerSizes.at(-1) ?? 0 }, () => 1))
  const backwardGradients: Matrix[] = []

  for (let layerIndex = weights.length - 1; layerIndex >= 0; layerIndex -= 1) {
    const derivative = preActivations[layerIndex].map((row) => row.map((value) => applyDerivative(value, activation)))
    const gated = gradients.map((row, rowIndex) => row.map((value, colIndex) => value * derivative[rowIndex][colIndex]))
    backwardGradients[layerIndex] = gated
    gradients = matMul(gated, transpose(weights[layerIndex]))
  }

  const layerSummaries = preActivations.map((_, index) => {
    const activationValues = flatten(activations[index + 1])
    const gradientValues = flatten(backwardGradients[index])

    return {
      layerIndex: index + 1,
      activationStd: std(activationValues),
      activationMeanAbs: meanAbs(activationValues),
      zeroFraction: zeroFraction(activationValues),
      gradientStd: std(gradientValues),
      gradientMeanAbs: meanAbs(gradientValues),
    }
  })

  const finalActivationStd = layerSummaries.at(-1)?.activationStd ?? 0
  const finalGradientStd = layerSummaries[0]?.gradientStd ?? 0
  const regime = classifyRegime(finalActivationStd, finalGradientStd)

  return {
    mode,
    activation,
    layerSummaries,
    finalActivationStd,
    finalGradientStd,
    regime,
  }
}

function classifyRegime(finalActivationStd: number, finalGradientStd: number): StabilityRegime {
  if (finalActivationStd < 0.05 || finalGradientStd < 0.05) {
    return 'vanishing'
  }

  if (finalActivationStd > 2.2 || finalGradientStd > 2.2) {
    return 'exploding'
  }

  return 'stable'
}

export const hiddenLayerCount = layerSizes.length - 1
export const initializationModes: InitializationMode[] = initConfigs.map((config) => config.id)
export const activationModes: ActivationMode[] = ['relu', 'tanh']
