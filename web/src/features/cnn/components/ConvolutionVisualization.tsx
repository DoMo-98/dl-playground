import { useMemo } from 'react'
import { useI18n } from '../../../app/i18n-context'
import type { FeatureCell } from '../lib/convolution'

type ConvolutionVisualizationProps = {
  input: number[][]
  kernel: number[][]
  featureMap: FeatureCell[]
  selectedFeatureId: string
  onSelectFeature: (featureId: string) => void
  onToggleInput: (row: number, col: number) => void
  onCycleKernel: (row: number, col: number) => void
}

function GridCellButton({
  value,
  label,
  tone,
  onClick,
}: {
  value: number
  label: string
  tone: 'input' | 'kernel' | 'feature'
  onClick?: () => void
}) {
  const baseTone =
    tone === 'kernel'
      ? value > 0
        ? 'bg-cyan-400/15 text-cyan-50 border-cyan-400/30'
        : value < 0
          ? 'bg-rose-400/15 text-rose-50 border-rose-400/30'
          : 'bg-slate-950/40 text-slate-300 border-white/10'
      : value > 0
        ? 'bg-cyan-400/15 text-cyan-50 border-cyan-400/20'
        : value < 0
          ? 'bg-rose-400/15 text-rose-50 border-rose-400/20'
          : 'bg-slate-950/40 text-slate-300 border-white/10'

  const Element = onClick ? 'button' : 'div'

  return (
    <Element
      type={onClick ? 'button' : undefined}
      aria-label={label}
      onClick={onClick}
      className={`flex aspect-square min-h-12 items-center justify-center rounded-xl border text-sm font-semibold transition ${baseTone} ${
        onClick ? 'hover:bg-white/10' : ''
      }`}
    >
      {value}
    </Element>
  )
}

export function ConvolutionVisualization({
  input,
  kernel,
  featureMap,
  selectedFeatureId,
  onSelectFeature,
  onToggleInput,
  onCycleKernel,
}: ConvolutionVisualizationProps) {
  const { messages } = useI18n()
  const copy = messages.cnn.localPatternPage.visualization
  const selectedFeature = featureMap.find((cell) => cell.id === selectedFeatureId) ?? featureMap[0]
  const selectedPatchIds = useMemo(() => new Set(selectedFeature.patch.map((cell) => cell.id)), [selectedFeature])

  return (
    <div className="space-y-6" aria-label={copy.ariaLabel}>
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{copy.eyebrow}</span>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-100">{copy.badge}</span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.75fr)_minmax(0,1fr)]">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-white">{copy.inputTitle}</h2>
            <p className="text-xs text-slate-400">{copy.inputHint}</p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {input.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                const isInSelectedPatch = selectedPatchIds.has(`${rowIndex}-${colIndex}`)
                return (
                  <button
                    key={`input-${rowIndex}-${colIndex}`}
                    type="button"
                    aria-pressed={value === 1}
                    aria-label={`${copy.inputCellLabel} (${rowIndex + 1}, ${colIndex + 1})`}
                    onClick={() => onToggleInput(rowIndex, colIndex)}
                    className={`flex aspect-square min-h-12 items-center justify-center rounded-xl border text-sm font-semibold transition ${
                      value === 1
                        ? 'border-cyan-400/30 bg-cyan-400/15 text-cyan-50'
                        : 'border-white/10 bg-slate-950/40 text-slate-300'
                    } ${isInSelectedPatch ? 'ring-2 ring-amber-300/70 ring-offset-2 ring-offset-slate-900' : 'hover:bg-white/10'}`}
                  >
                    {value}
                  </button>
                )
              }),
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-white">{copy.kernelTitle}</h2>
            <p className="text-xs text-slate-400">{copy.kernelHint}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {kernel.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <GridCellButton
                  key={`kernel-${rowIndex}-${colIndex}`}
                  value={value}
                  tone="kernel"
                  label={`${copy.kernelCellLabel} (${rowIndex + 1}, ${colIndex + 1})`}
                  onClick={() => onCycleKernel(rowIndex, colIndex)}
                />
              )),
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-white">{copy.featureMapTitle}</h2>
            <p className="text-xs text-slate-400">{copy.featureMapHint}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {featureMap.map((cell) => (
              <button
                key={cell.id}
                type="button"
                onClick={() => onSelectFeature(cell.id)}
                className={`rounded-xl border p-3 text-center text-sm transition ${
                  cell.id === selectedFeature.id
                    ? 'border-amber-300/70 bg-amber-300/15 text-amber-50'
                    : cell.value > 0
                      ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-50 hover:bg-cyan-400/15'
                      : cell.value < 0
                        ? 'border-rose-400/20 bg-rose-400/10 text-rose-50 hover:bg-rose-400/15'
                        : 'border-white/10 bg-slate-950/40 text-slate-300 hover:bg-white/5'
                }`}
                aria-pressed={cell.id === selectedFeature.id}
                aria-label={`${copy.featureCellLabel} (${cell.row + 1}, ${cell.col + 1})`}
              >
                <span className="block font-semibold">{cell.value.toFixed(0)}</span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-slate-300">r{cell.row + 1} c{cell.col + 1}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
        <p className="font-semibold text-white">{copy.selectedPatchTitle}</p>
        <p className="mt-2">
          {copy.selectedPatchDescription} <span className="font-mono text-amber-200">{selectedFeature.contributionTerms.join(' + ')}</span> ={' '}
          <span className="font-mono text-cyan-300">{selectedFeature.value}</span>
        </p>
      </div>
    </div>
  )
}
