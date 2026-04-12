export type LayerNormPreset = 'balanced' | 'shifted' | 'contrast'
export type LayerNormContext = 'steady-peers' | 'shifted-peers'

export type FeatureSummary = {
  mean: number
  variance: number
  std: number
}

export type NormalizedSample = {
  raw: number[]
  none: number[]
  batchNorm: number[]
  layerNorm: number[]
}

export type LayerNormAnalysis = {
  preset: LayerNormPreset
  context: LayerNormContext
  featureLabels: string[]
  focusIndex: number
  samples: NormalizedSample[]
  focusRawStats: FeatureSummary
  focusBatchNormStats: FeatureSummary
  focusLayerNormStats: FeatureSummary
  focusBatchVsLayerMaxGap: number
}

const epsilon = 1e-5
const featureLabels = ['Feature 1', 'Feature 2', 'Feature 3']

const presetContexts: Record<LayerNormPreset, Record<LayerNormContext, number[][]>> = {
  balanced: {
    'steady-peers': [
      [1.2, 3.4, 5.0],
      [1.1, 3.1, 4.9],
      [1.4, 3.5, 5.2],
    ],
    'shifted-peers': [
      [1.2, 3.4, 5.0],
      [6.2, 7.1, 7.9],
      [6.5, 7.4, 8.2],
    ],
  },
  shifted: {
    'steady-peers': [
      [3.6, 5.1, 6.4],
      [3.4, 4.9, 6.1],
      [3.8, 5.0, 6.5],
    ],
    'shifted-peers': [
      [3.6, 5.1, 6.4],
      [7.5, 8.8, 10.3],
      [8.1, 9.0, 10.8],
    ],
  },
  contrast: {
    'steady-peers': [
      [-2.4, 0.8, 4.6],
      [-2.0, 1.0, 4.0],
      [-2.7, 0.7, 5.1],
    ],
    'shifted-peers': [
      [-2.4, 0.8, 4.6],
      [2.3, 4.6, 8.2],
      [3.0, 5.1, 8.8],
    ],
  },
}

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function variance(values: number[]) {
  const avg = mean(values)
  return values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / values.length
}

function summarize(values: number[]): FeatureSummary {
  const valueVariance = variance(values)
  return {
    mean: mean(values),
    variance: valueVariance,
    std: Math.sqrt(valueVariance),
  }
}

function normalizeWithStats(value: number, stats: FeatureSummary) {
  return (value - stats.mean) / Math.sqrt(stats.variance + epsilon)
}

function maxAbsoluteGap(left: number[], right: number[]) {
  return left.reduce((max, value, index) => Math.max(max, Math.abs(value - right[index])), 0)
}

export function analyzeLayerNorm(preset: LayerNormPreset, context: LayerNormContext): LayerNormAnalysis {
  const rawSamples = presetContexts[preset][context]

  const batchFeatureStats = featureLabels.map((_, featureIndex) =>
    summarize(rawSamples.map((sample) => sample[featureIndex])),
  )

  const samples = rawSamples.map((sample) => {
    const layerStats = summarize(sample)

    return {
      raw: sample,
      none: sample,
      batchNorm: sample.map((value, featureIndex) => normalizeWithStats(value, batchFeatureStats[featureIndex])),
      layerNorm: sample.map((value) => normalizeWithStats(value, layerStats)),
    }
  })

  const focusSample = samples[0]

  return {
    preset,
    context,
    featureLabels,
    focusIndex: 0,
    samples,
    focusRawStats: summarize(focusSample.raw),
    focusBatchNormStats: summarize(focusSample.batchNorm),
    focusLayerNormStats: summarize(focusSample.layerNorm),
    focusBatchVsLayerMaxGap: maxAbsoluteGap(focusSample.batchNorm, focusSample.layerNorm),
  }
}

export const layerNormPresets: LayerNormPreset[] = ['balanced', 'shifted', 'contrast']
export const layerNormContexts: LayerNormContext[] = ['steady-peers', 'shifted-peers']
