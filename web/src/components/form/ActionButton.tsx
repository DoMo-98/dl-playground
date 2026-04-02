export type ActionButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
  accent?: boolean
}

export function ActionButton({ label, onClick, disabled = false, accent = false }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
        disabled
          ? 'cursor-not-allowed border-white/10 bg-slate-950/40 text-slate-500'
          : accent
            ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-50 hover:bg-cyan-400/15'
            : 'border-white/10 bg-slate-950/30 text-slate-100 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  )
}
