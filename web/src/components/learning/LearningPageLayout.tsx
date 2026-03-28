import type { ReactNode } from 'react'

type LearningPageLayoutProps = {
  eyebrow?: string
  title: string
  description: string
  controls: ReactNode
  visualization: ReactNode
  interpretation: ReactNode
  exploration?: ReactNode
}

export function LearningPageLayout({
  eyebrow,
  title,
  description,
  controls,
  visualization,
  interpretation,
  exploration,
}: LearningPageLayoutProps) {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
        ) : null}
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">{controls}</aside>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">{visualization}</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">{interpretation}</div>
        </div>
      </section>

      {exploration ? (
        <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">{exploration}</section>
      ) : null}
    </div>
  )
}
