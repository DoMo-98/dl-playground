import type { ReactNode } from 'react'

export type MetaBadgeProps = {
  icon: ReactNode
  label: string
}

export function MetaBadge({ icon, label }: MetaBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
      {icon}
      {label}
    </span>
  )
}
