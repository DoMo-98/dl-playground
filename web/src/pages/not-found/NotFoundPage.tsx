import { ArrowRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../app/i18n-context'
import { Card } from '../../components/Card'

export function NotFoundPage() {
  const { messages, toLocalizedPath } = useI18n()

  return (
    <Card as="section" className="rounded-3xl p-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{messages.notFound.eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{messages.notFound.title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">{messages.notFound.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={toLocalizedPath('/')}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          <Home className="h-4 w-4" />
          {messages.notFound.primaryCta}
        </Link>
        <Link
          to={toLocalizedPath('/learn')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
        >
          {messages.notFound.secondaryCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  )
}
