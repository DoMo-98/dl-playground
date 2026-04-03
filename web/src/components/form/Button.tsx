import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'default' | 'accent' | 'solid' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  default: clsx(
    'border-white/10 bg-slate-950/30 text-slate-100',
    'hover:bg-white/8',
    'active:scale-[0.97] active:bg-white/12',
  ),
  accent: clsx(
    'border-cyan-400/30 bg-cyan-400/10 text-cyan-50',
    'hover:bg-cyan-400/18',
    'active:scale-[0.97] active:bg-cyan-400/25',
  ),
  solid: clsx(
    'border-transparent bg-cyan-300 text-slate-950',
    'hover:bg-cyan-200',
    'active:scale-[0.97] active:bg-cyan-200',
  ),
  ghost: clsx(
    'border-transparent bg-transparent text-slate-300',
    'hover:bg-white/5 hover:text-slate-100',
    'active:scale-[0.97] active:bg-white/10',
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-3 py-3 text-sm',
  lg: 'px-4 py-3 text-sm',
}

const disabledStyles =
  'disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-slate-950/40 disabled:text-slate-500 disabled:active:scale-100'

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'

function Button({
  variant = 'default',
  size = 'md',
  asChild = false,
  className,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      {...(!asChild && { type: type ?? 'button' })}
      className={twMerge(
        clsx(
          'rounded-xl border font-medium transition-all',
          variantStyles[variant],
          sizeStyles[size],
          disabledStyles,
          focusStyles,
        ),
        className,
      )}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps }
