export type ResidualPreset = 'denoise' | 'feature-boost' | 'context-mix'

export type ResidualFeatureSnapshot = {
  label: string
  input: number
  plain: number
  residual: number
}

export type ResidualLayerSnapshot = {
  layerIndex: number
  plainDistanceToInput: number
  residualDistanceToInput: number
  plainNorm: number
  residualNorm: number
}

export type ResidualAnalysis = {
  preset: ResidualPreset
  depth: number
  features: ResidualFeatureSnapshot[]
  layers: ResidualLayerSnapshot[]
  finalPlainDistance: number
  finalResidualDistance: number
  preservationGain: number
  residualDeltaNorm: number
}

type PresetConfig = {
  id: ResidualPreset
  scale: number
  bias: number[]
  matrix: number[][]
}

const featureLabels = ['Feature A', 'Feature B', 'Feature C', 'Feature D']
const inputVector = [1.15, -0.55, 0.85, -1.05]

const presetConfigs: PresetConfig[] = [
  {
    id: 'denoise',
    scale: 0.22,
    bias: [0.12, -0.08, 0.05, -0.04],
    matrix: [
      [0.32, -0.12, 0.08, 0.03],
      [-0.18, 0.28, 0.05, -0.09],
      [0.06, 0.14, 0.24, -0.11],
      [0.03, -0.08, -0.16, 0.26],
    ],
  },
  {
    id: 'feature-boost',
    scale: 0.27,
    bias: [0.08, 0.04, -0.07, 0.02],
    matrix: [
      [0.27, 0.16, -0.06, 0.05],
      [-0.09, 0.24, 0.11, -0.04],
      [0.12, -0.03, 0.29, 0.08],
      [0.04, 0.07, -0.1, 0.22],
    ],
  },
  {
    id: 'context-mix',
    scale: 0.31,
    bias: [-0.05, 0.1, 0.04, -0.08],
    matrix: [
      [0.24, -0.18, 0.16, 0.06],
      [0.11, 0.22, -0.14, 0.05],
      [0.15, 0.09, 0.21, -0.17],
      [-0.07, 0.13, 0.08, 0.25],
    ],
  },
]

export const residualPresets = presetConfigs.map((preset) => preset.id)
export const residualDepthOptions = [2, 4, 8] as const

function matVec(matrix: number[][], vector: number[]) {
  return matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0))
}

function addVectors(left: number[], right: number[]) {
  return left.map((value, index) => value + right[index])
}

function subtractVectors(left: number[], right: number[]) {
  return left.map((value, index) => value - right[index])
}

function euclideanNorm(vector: number[]) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0))
}

function distanceBetween(left: number[], right: number[]) {
  return euclideanNorm(subtractVectors(left, right))
}

function branchTransform(vector: number[], config: PresetConfig) {
  return matVec(config.matrix, vector).map((value, index) => Math.tanh(value + config.bias[index]) * config.scale)
}

export function analyzeResidualStack(preset: ResidualPreset, depth: number): ResidualAnalysis {
  const config = presetConfigs.find((candidate) => candidate.id === preset) ?? presetConfigs[0]

  let plainState = [...inputVector]
  let residualState = [...inputVector]
  const layers: ResidualLayerSnapshot[] = []

  for (let layerIndex = 1; layerIndex <= depth; layerIndex += 1) {
    plainState = branchTransform(plainState, config)
    residualState = addVectors(residualState, branchTransform(residualState, config))

    layers.push({
      layerIndex,
      plainDistanceToInput: distanceBetween(plainState, inputVector),
      residualDistanceToInput: distanceBetween(residualState, inputVector),
      plainNorm: euclideanNorm(plainState),
      residualNorm: euclideanNorm(residualState),
    })
  }

  return {
    preset,
    depth,
    features: featureLabels.map((label, index) => ({
      label,
      input: inputVector[index],
      plain: plainState[index],
      residual: residualState[index],
    })),
    layers,
    finalPlainDistance: distanceBetween(plainState, inputVector),
    finalResidualDistance: distanceBetween(residualState, inputVector),
    preservationGain: layers.at(-1)
      ? layers.at(-1)!.plainDistanceToInput / Math.max(layers.at(-1)!.residualDistanceToInput, 1e-6)
      : 1,
    residualDeltaNorm: euclideanNorm(subtractVectors(residualState, inputVector)),
  }
}
