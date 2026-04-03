import { ArrowRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../app/i18n-context'
import { Button } from '../../components/form/Button'
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
        <Button asChild variant="solid" size="lg">
          <Link to={toLocalizedPath('/')} className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            {messages.notFound.primaryCta}
          </Link>
        </Button>
        <Button asChild variant="default" size="lg">
          <Link to={toLocalizedPath('/learn')} className="inline-flex items-center gap-2">
            {messages.notFound.secondaryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
