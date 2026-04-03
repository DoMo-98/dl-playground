export type ActivationKind = 'linear' | 'relu' | 'tanh' | 'sigmoid'

export type TinyMlpParams = {
  hiddenScale: number
  outputScale: number
}

export const activationKinds: ActivationKind[] = ['linear', 'relu', 'tanh', 'sigmoid']

export function applyActivation(kind: ActivationKind, value: number) {
  switch (kind) {
    case 'linear':
      return value
    case 'relu':
      return Math.max(0, value)
    case 'tanh':
      return Math.tanh(value)
    case 'sigmoid':
      return 1 / (1 + Math.exp(-value))
  }
}

function evaluateTinyMlp(x: number, activation: ActivationKind, params: TinyMlpParams) {
  const h1Pre = params.hiddenScale * (1.4 * x - 0.6)
  const h2Pre = params.hiddenScale * (-1.1 * x + 0.9)
  const h1 = applyActivation(activation, h1Pre)
  const h2 = applyActivation(activation, h2Pre)
  const output = params.outputScale * (1.2 * h1 - 1.05 * h2) + 0.15

  return {
    hidden: [h1, h2],
    hiddenPre: [h1Pre, h2Pre],
    output,
  }
}

export function createCurveSamples(activation: ActivationKind, params: TinyMlpParams, steps = 49) {
  return Array.from({ length: steps }, (_, index) => {
    const x = -2 + (4 * index) / (steps - 1)
    const result = evaluateTinyMlp(x, activation, params)

    return {
      x,
      ...result,
    }
  })
}

export function summarizeCurveBehavior(activation: ActivationKind, params: TinyMlpParams) {
  const samples = createCurveSamples(activation, params, 9)
  const outputs = samples.map((sample) => sample.output)
  const minOutput = Math.min(...outputs)
  const maxOutput = Math.max(...outputs)
  const middle = samples[Math.floor(samples.length / 2)]

  const shape =
    activation === 'linear'
      ? 'affine'
      : activation === 'relu'
        ? 'piecewise-linear'
        : activation === 'tanh'
          ? 'smooth-saturated'
          : 'bounded-squashing'

  return {
    shape,
    minOutput,
    maxOutput,
    middleOutput: middle.output,
    samples,
  }
}
