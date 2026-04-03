export type GradientDescentState = {
  parameter: number
  loss: number
  gradient: number
}

export type GradientDescentStep = GradientDescentState & {
  learningRate: number
  nextParameter: number
  delta: number
}

export type TrajectoryRegime = 'stable' | 'oscillating' | 'unstable'

export const gradientDescentDomain = {
  min: -2.8,
  max: 1.8,
} as const

function evaluateLoss(parameter: number) {
  return 0.12 * (parameter + 1.8) ** 4 + 0.55 * (parameter - 1) ** 2 + 0.2
}

function evaluateGradient(parameter: number) {
  return 0.48 * (parameter + 1.8) ** 3 + 1.1 * (parameter - 1)
}

export function describeState(parameter: number): GradientDescentState {
  return {
    parameter,
    loss: evaluateLoss(parameter),
    gradient: evaluateGradient(parameter),
  }
}

export function takeGradientDescentStep(parameter: number, learningRate: number): GradientDescentStep {
  const current = describeState(parameter)
  const delta = -learningRate * current.gradient
  const nextParameter = current.parameter + delta

  return {
    ...current,
    learningRate,
    delta,
    nextParameter,
  }
}

export function simulateGradientDescent(startParameter: number, learningRate: number, steps: number) {
  const states: GradientDescentState[] = [describeState(startParameter)]
  let currentParameter = startParameter

  for (let index = 0; index < steps; index += 1) {
    currentParameter = takeGradientDescentStep(currentParameter, learningRate).nextParameter
    states.push(describeState(currentParameter))
  }

  return states
}

export function createLossCurveSamples(steps = 80) {
  return Array.from({ length: steps }, (_, index) => {
    const parameter =
      gradientDescentDomain.min +
      ((gradientDescentDomain.max - gradientDescentDomain.min) * index) / (steps - 1)

    return {
      parameter,
      loss: evaluateLoss(parameter),
    }
  })
}

export function summarizeTrajectory(states: GradientDescentState[]): {
  regime: TrajectoryRegime
  signFlips: number
  improvingSteps: number
  lossDelta: number
} {
  if (states.length <= 1) {
    return {
      regime: 'stable',
      signFlips: 0,
      improvingSteps: 0,
      lossDelta: 0,
    }
  }

  let signFlips = 0
  let improvingSteps = 0

  for (let index = 1; index < states.length; index += 1) {
    const previous = states[index - 1]
    const current = states[index]

    if (Math.sign(previous.gradient) !== Math.sign(current.gradient)) {
      signFlips += 1
    }

    if (current.loss < previous.loss) {
      improvingSteps += 1
    }
  }

  const firstLoss = states[0].loss
  const lastLoss = states[states.length - 1].loss
  const lossDelta = lastLoss - firstLoss
  const improvingRatio = improvingSteps / (states.length - 1)

  const regime: TrajectoryRegime =
    lossDelta > 0.2 || improvingRatio < 0.45
      ? 'unstable'
      : signFlips >= 2
        ? 'oscillating'
        : 'stable'

  return {
    regime,
    signFlips,
    improvingSteps,
    lossDelta,
  }
}
