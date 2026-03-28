type NeuronDiagramProps = {
  x1: number
  x2: number
  w1: number
  w2: number
  bias: number
  sum: number
  output: number
}

export function NeuronDiagram({ x1, x2, w1, w2, bias, sum, output }: NeuronDiagramProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_180px_1fr] md:items-center">
        <div className="space-y-3 text-sm text-slate-300">
          <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p className="font-medium text-white">Inputs</p>
            <p>x₁ = {x1.toFixed(2)}</p>
            <p>x₂ = {x2.toFixed(2)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p className="font-medium text-white">Weights</p>
            <p>w₁ = {w1.toFixed(2)}</p>
            <p>w₂ = {w2.toFixed(2)}</p>
            <p>b = {bias.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-center shadow-[0_0_60px_rgba(34,211,238,0.08)]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Neuron</p>
              <p className="mt-2 text-3xl font-semibold text-white">Σ</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p className="font-medium text-white">Weighted sum</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-300">{sum.toFixed(2)}</p>
            <p className="mt-2 text-slate-400">x₁·w₁ + x₂·w₂ + b</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
            <p className="font-medium text-white">Binary output</p>
            <p className="mt-1 text-2xl font-semibold text-white">{output}</p>
            <p className="mt-2 text-slate-400">Threshold at 0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
