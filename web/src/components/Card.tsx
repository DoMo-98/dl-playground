import type { ComponentProps, ElementType } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentProps<T>

export function Card<T extends ElementType = 'div'>({ as, className, ...rest }: CardProps<T>) {
  const Component = as ?? 'div'
  return <Component className={twMerge(clsx('rounded-2xl border border-white/10 bg-white/5 p-5', className))} {...rest} />
}
