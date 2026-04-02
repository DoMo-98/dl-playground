import { ArrowRight, Orbit } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import { useI18n } from '../../app/i18n-context'
import { Card } from '../../components/Card'

export function HomePage() {
  const { messages, toLocalizedPath } = useI18n()

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
            {messages.home.badge}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {messages.home.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{messages.home.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={toLocalizedPath(ROUTES.LEARN)}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              {messages.home.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={toLocalizedPath(ROUTES.FIRST_LESSON)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-medium text-slate-100 transition hover:bg-white/5"
            >
              {messages.home.secondaryCta}
            </Link>
          </div>
        </div>

        <Card className="rounded-3xl p-6 shadow-2xl shadow-cyan-950/20">
          <div className="mb-5 flex items-center gap-3 text-cyan-200">
            <Orbit className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-[0.18em]">{messages.home.pillarsEyebrow}</span>
          </div>

          <ul className="space-y-4 text-sm leading-7 text-slate-300">
            {messages.home.pillars.map((pillar) => (
              <li key={pillar.title}>
                <span className="font-semibold text-white">{pillar.title}:</span> {pillar.description}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  )
}
