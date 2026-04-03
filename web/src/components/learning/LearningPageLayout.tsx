import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card } from '../Card'
import { useI18n } from '../../app/i18n-context'
import { ROUTES } from '../../config/routes'
import { getLessonBreadcrumb } from '../../content/learningPath'

type LearningPageLayoutProps = {
  lessonId: string
  eyebrow?: string
  title: string
  description: string
  objective?: ReactNode
  preface?: ReactNode
  controls: ReactNode
  visualization: ReactNode
  interpretation: ReactNode
  exploration?: ReactNode
  navigation?: ReactNode
}

function ChevronSeparator() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function Breadcrumb({ lessonId }: { lessonId: string }) {
  const { locale, messages, toLocalizedPath } = useI18n()
  const breadcrumb = getLessonBreadcrumb(lessonId, locale)

  if (!breadcrumb) return null

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            to={toLocalizedPath(ROUTES.LEARN)}
            className="text-slate-400 transition-colors hover:text-slate-200"
          >
            {messages.nav.learn}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronSeparator />
        </li>
        <li>
          <span className="text-slate-400">{breadcrumb.sectionTitle}</span>
        </li>
        <li aria-hidden="true">
          <ChevronSeparator />
        </li>
        <li>
          <span className="text-slate-200" aria-current="page">
            {breadcrumb.lessonTitle}
          </span>
        </li>
      </ol>
    </nav>
  )
}

export function LearningPageLayout({
  lessonId,
  eyebrow,
  title,
  description,
  objective,
  preface,
  controls,
  visualization,
  interpretation,
  exploration,
  navigation,
}: LearningPageLayoutProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Breadcrumb lessonId={lessonId} />
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
        ) : null}
        <div className="space-y-3">
          <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold tracking-tight text-white outline-none sm:text-4xl">{title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
        </div>
      </section>

      {objective ? <div>{objective}</div> : null}
      {preface ? <div>{preface}</div> : null}

      <section className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <Card as="aside" className="space-y-4">{controls}</Card>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">{visualization}</div>
          <Card>{interpretation}</Card>
        </div>
      </section>

      {exploration ? <section>{exploration}</section> : null}
      {navigation ? <section>{navigation}</section> : null}
    </div>
  )
}
