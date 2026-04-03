import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type OptionCardProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'checked' | 'children'
> & {
  selected: boolean
  children: ReactNode
}

export function OptionCard({
  selected,
  children,
  className,
  ...rest
}: OptionCardProps) {
  return (
    <label
      className={twMerge(
        clsx(
          'flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition-all',
          'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan-400/50 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-slate-900',
          selected
            ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
            : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/8 has-[:active]:scale-[0.97]',
          className,
        ),
      )}
    >
      <input
        type="radio"
        className="sr-only"
        checked={selected}
        {...rest}
      />
      {children}
    </label>
  )
}
