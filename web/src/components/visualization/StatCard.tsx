import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type StatCardProps = {
  label: string
  value: string
  accent?: boolean
}

export function StatCard({ label, value, accent = false }: StatCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border p-4',
          accent
            ? 'border-cyan-400/20 bg-cyan-400/10'
            : 'border-white/10 bg-slate-950/40',
        ),
      )}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}
