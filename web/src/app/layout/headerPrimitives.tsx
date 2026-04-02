import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

type HeaderSurfaceVariant = 'inline' | 'panel'

type HeaderSurfaceProps = {
  children: ReactNode
  className?: string
  variant?: HeaderSurfaceVariant
}

function getHeaderSurfaceClasses(variant: HeaderSurfaceVariant) {
  return variant === 'panel'
    ? 'rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 hover:border-white/15 hover:bg-slate-950/55 focus-within:border-cyan-300/40 focus-within:bg-slate-950/55 focus-within:ring-1 focus-within:ring-cyan-300/20'
    : 'rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-white/20 hover:bg-white/8 focus-within:border-cyan-300/40 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-cyan-300/20'
}

export function HeaderUtilityItem({ children, className, variant = 'inline' }: HeaderSurfaceProps) {
  return (
    <div
      className={[
        'group inline-flex items-center text-sm text-slate-200 transition',
        variant === 'panel' ? 'gap-3' : 'gap-2',
        getHeaderSurfaceClasses(variant),
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

type HeaderUtilityLinkProps = {
  href: string
  label: string
  icon: ReactNode
  onClick?: () => void
  className?: string
  variant?: HeaderSurfaceVariant
} & Pick<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'>

export function HeaderUtilityLink({
  href,
  label,
  icon,
  onClick,
  className,
  variant = 'inline',
  target,
  rel,
}: HeaderUtilityLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={[
        'group inline-flex items-center text-sm transition hover:text-white',
        variant === 'panel' ? 'gap-3' : 'gap-2',
        getHeaderSurfaceClasses(variant),
        className ?? '',
      ].join(' ')}
    >
      <span className="text-cyan-300">{icon}</span>
      <span>{label}</span>
    </a>
  )
}

type HeaderFeatureLinkProps = {
  href: string
  eyebrow: string
  label: string
  onClick?: () => void
  compact?: boolean
}

export function HeaderFeatureLink({ href, eyebrow, label, onClick, compact = false }: HeaderFeatureLinkProps) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={[
        'block min-w-0 rounded-xl outline-none transition hover:text-white focus-visible:ring-1 focus-visible:ring-cyan-300/50',
        compact
          ? 'border border-white/10 bg-slate-950/40 px-3 py-3 hover:border-white/15 hover:bg-slate-950/55'
          : 'border border-transparent px-3 py-2 hover:bg-white/5',
      ].join(' ')}
    >
      <span className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300/75">
        <BookOpen className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 transition">
        <span className="truncate">{label}</span>
        <ArrowRight className="h-4 w-4 text-cyan-300/90" />
      </span>
    </Link>
  )
}
