export type ControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}

export function Control({ label, value, onChange, min, max, step }: ControlProps) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-200">
        <span>{label}</span>
        <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-cyan-300">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-400"
      />
    </label>
  )
}
