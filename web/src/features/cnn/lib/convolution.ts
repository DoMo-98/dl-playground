export type GridSize = 5
export type KernelSize = 3

export type ConvolutionPresetId = 'vertical-edge' | 'horizontal-edge' | 'center-focus'

export type InputCell = {
  id: string
  row: number
  col: number
  value: number
}

export type FeatureCell = {
  id: string
  row: number
  col: number
  value: number
  normalizedValue: number
  patch: InputCell[]
  contributionTerms: string[]
}

export type ConvolutionPreset = {
  id: ConvolutionPresetId
  input: number[][]
  kernel: number[][]
}

export const convolutionPresets: ConvolutionPreset[] = [
  {
    id: 'vertical-edge',
    input: [
      [0, 0, 1, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 0, 1, 1, 1],
      [0, 0, 1, 1, 1],
    ],
    kernel: [
      [-1, 0, 1],
      [-1, 0, 1],
      [-1, 0, 1],
    ],
  },
  {
    id: 'horizontal-edge',
    input: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    kernel: [
      [-1, -1, -1],
      [0, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    id: 'center-focus',
    input: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
    ],
    kernel: [
      [0, 1, 0],
      [1, 2, 1],
      [0, 1, 0],
    ],
  },
]

export function cloneGrid(grid: number[][]) {
  return grid.map((row) => [...row])
}

export function toggleBinaryCell(grid: number[][], row: number, col: number) {
  return grid.map((currentRow, rowIndex) =>
    currentRow.map((value, colIndex) => (rowIndex === row && colIndex === col ? (value === 0 ? 1 : 0) : value)),
  )
}

export function cycleKernelCell(kernel: number[][], row: number, col: number) {
  const current = kernel[row]?.[col] ?? 0
  const next = current === -1 ? 0 : current === 0 ? 1 : -1

  return kernel.map((currentRow, rowIndex) =>
    currentRow.map((value, colIndex) => (rowIndex === row && colIndex === col ? next : value)),
  )
}

export function applyValidConvolution(input: number[][], kernel: number[][]): FeatureCell[] {
  const outputRows = input.length - kernel.length + 1
  const outputCols = input[0].length - kernel[0].length + 1
  const rawCells: Omit<FeatureCell, 'normalizedValue'>[] = []

  for (let row = 0; row < outputRows; row += 1) {
    for (let col = 0; col < outputCols; col += 1) {
      let value = 0
      const patch: InputCell[] = []
      const contributionTerms: string[] = []

      for (let kernelRow = 0; kernelRow < kernel.length; kernelRow += 1) {
        for (let kernelCol = 0; kernelCol < kernel[0].length; kernelCol += 1) {
          const inputValue = input[row + kernelRow][col + kernelCol]
          const kernelValue = kernel[kernelRow][kernelCol]
          value += inputValue * kernelValue
          patch.push({
            id: `${row + kernelRow}-${col + kernelCol}`,
            row: row + kernelRow,
            col: col + kernelCol,
            value: inputValue,
          })
          contributionTerms.push(`${inputValue}×${kernelValue}`)
        }
      }

      rawCells.push({
        id: `${row}-${col}`,
        row,
        col,
        value,
        patch,
        contributionTerms,
      })
    }
  }

  const maxMagnitude = rawCells.reduce((max, cell) => Math.max(max, Math.abs(cell.value)), 0)

  return rawCells.map((cell) => ({
    ...cell,
    normalizedValue: maxMagnitude === 0 ? 0 : cell.value / maxMagnitude,
  }))
}

export function getFeatureSummary(featureMap: FeatureCell[]) {
  const strongest = featureMap.reduce((best, cell) => (Math.abs(cell.value) > Math.abs(best.value) ? cell : best), featureMap[0])
  const positiveCount = featureMap.filter((cell) => cell.value > 0).length
  const negativeCount = featureMap.filter((cell) => cell.value < 0).length

  return {
    strongest,
    positiveCount,
    negativeCount,
  }
}
