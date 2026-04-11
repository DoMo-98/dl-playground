export type BatchNormPreset = 'balanced' | 'shifted' | 'mixed'
export type BatchNormMode = 'none' | 'train' | 'inference'

export type BatchNormSummary = {
  mean: number
  variance: number
  std: number
}

export type BatchNormSample = {
  index: number
  raw: number
  output: number
}

export type BatchNormAnalysis = {
  preset: BatchNormPreset
  mode: BatchNormMode
  samples: BatchNormSample[]
  batchStats: BatchNormSummary
  runningStats: BatchNormSummary
  outputStats: BatchNormSummary
  meanShift: number
  outputRange: { min: number; max: number }
}

const epsilon = 1e-5

const presetBatches: Record<BatchNormPreset, { batch: number[]; runningMean: number; runningVariance: number }> = {
  balanced: {
    batch: [-1.2, -0.4, 0.1, 0.5, 1.0, 1.4],
    runningMean: 0.18,
    runningVariance: 0.92,
  },
  shifted: {
    batch: [2.4, 2.8, 3.1, 3.4, 3.9, 4.2],
    runningMean: 1.1,
    runningVariance: 1.05,
  },
  mixed: {
    batch: [-2.5, -0.6, -0.2, 1.7, 2.9, 4.1],
    runningMean: 0.35,
    runningVariance: 1.45,
  },
}

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function variance(values: number[]) {
  const avg = mean(values)
  return values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / values.length
}

function summarize(values: number[]): BatchNormSummary {
  const valueVariance = variance(values)
  return {
    mean: mean(values),
    variance: valueVariance,
    std: Math.sqrt(valueVariance),
  }
}

function normalize(value: number, stats: BatchNormSummary) {
  return (value - stats.mean) / Math.sqrt(stats.variance + epsilon)
}

export function analyzeBatchNorm(preset: BatchNormPreset, mode: BatchNormMode): BatchNormAnalysis {
  const config = presetBatches[preset]
  const batchStats = summarize(config.batch)
  const runningStats: BatchNormSummary = {
    mean: config.runningMean,
    variance: config.runningVariance,
    std: Math.sqrt(config.runningVariance),
  }

  const outputValues = config.batch.map((raw) => {
    if (mode === 'none') {
      return raw
    }

    return normalize(raw, mode === 'train' ? batchStats : runningStats)
  })

  const outputStats = summarize(outputValues)
  const samples = config.batch.map((raw, index) => ({ index: index + 1, raw, output: outputValues[index] }))

  return {
    preset,
    mode,
    samples,
    batchStats,
    runningStats,
    outputStats,
    meanShift: outputStats.mean - batchStats.mean,
    outputRange: {
      min: Math.min(...outputValues),
      max: Math.max(...outputValues),
    },
  }
}

export const batchNormPresets: BatchNormPreset[] = ['balanced', 'shifted', 'mixed']
export const batchNormModes: BatchNormMode[] = ['none', 'train', 'inference']
