import { describe, expect, it } from 'vitest'
import {
  applyValidConvolution,
  convolutionPresets,
  cycleKernelCell,
  getFeatureSummary,
  GRID_SIZE,
  KERNEL_SIZE,
  toggleBinaryCell,
} from './convolution'

describe('convolution helpers', () => {
  it('computes a strong response where the preset pattern matches the kernel', () => {
    const preset = convolutionPresets.find((candidate) => candidate.id === 'vertical-edge')!
    const featureMap = applyValidConvolution(preset.input, preset.kernel)
    const centerCell = featureMap.find((cell) => cell.row === 1 && cell.col === 1)

    expect(featureMap).toHaveLength(9)
    expect(centerCell?.value).toBe(3)
    expect(centerCell?.contributionTerms).toContain('1×1')
    expect(centerCell?.patch).toHaveLength(9)
  })

  it('tracks strongest local evidence and polarity counts for interpretation text', () => {
    const preset = convolutionPresets.find((candidate) => candidate.id === 'horizontal-edge')!
    const summary = getFeatureSummary(applyValidConvolution(preset.input, preset.kernel))

    expect(summary.strongest.value).toBe(3)
    expect(summary.positiveCount).toBeGreaterThan(0)
    expect(summary.negativeCount).toBe(0)
  })

  it('toggles input cells and cycles kernel weights through the teaching states', () => {
    const toggled = toggleBinaryCell(
      [
        [0, 1],
        [1, 0],
      ],
      0,
      0,
    )
    const cycledOnce = cycleKernelCell(
      [
        [-1, 0],
        [1, -1],
      ],
      0,
      0,
    )
    const cycledTwice = cycleKernelCell(cycledOnce, 0, 0)
    const cycledThrice = cycleKernelCell(cycledTwice, 0, 0)

    expect(toggled[0][0]).toBe(1)
    expect(cycledOnce[0][0]).toBe(0)
    expect(cycledTwice[0][0]).toBe(1)
    expect(cycledThrice[0][0]).toBe(-1)
  })

  it('every preset has input of GRID_SIZE×GRID_SIZE and kernel of KERNEL_SIZE×KERNEL_SIZE', () => {
    for (const preset of convolutionPresets) {
      expect(preset.input).toHaveLength(GRID_SIZE)
      preset.input.forEach((row) => expect(row).toHaveLength(GRID_SIZE))
      expect(preset.kernel).toHaveLength(KERNEL_SIZE)
      preset.kernel.forEach((row) => expect(row).toHaveLength(KERNEL_SIZE))
    }
  })
})
