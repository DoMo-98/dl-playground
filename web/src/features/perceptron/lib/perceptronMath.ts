export type WeightedSumInputs = {
  x1: number
  x2: number
  w1: number
  w2: number
  bias: number
}

export function computeWeightedSum({ x1, x2, w1, w2, bias }: WeightedSumInputs) {
  return x1 * w1 + x2 * w2 + bias
}

export function computeBinaryOutput(sum: number) {
  return sum >= 0 ? 1 : 0
}
