import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, NotebookPen, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../app/i18n-context'

type LessonCardProps = {
  icon: ReactNode
  label: string
  title: string
  children: ReactNode
  tone?: 'default' | 'accent'
}

function LessonCard({ icon, label, title, children, tone = 'default' }: LessonCardProps) {
  const toneClasses =
    tone === 'accent'
      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
      : 'border-white/10 bg-white/5 text-slate-200'

  return (
    <section className={`rounded-2xl border p-5 ${toneClasses}`}>
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-0.5 rounded-xl bg-slate-950/60 p-2 text-cyan-300">{icon}</div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{label}</p>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
      </div>
      <div className="text-sm leading-7">{children}</div>
    </section>
  )
}

type LessonObjectiveCardProps = {
  objective: string
}

export function LessonObjectiveCard({ objective }: LessonObjectiveCardProps) {
  const { messages } = useI18n()

  return (
    <LessonCard
      icon={<Target className="h-4 w-4" />}
      label={messages.lessonChrome.objectiveLabel}
      title={messages.lessonChrome.objectiveTitle}
      tone="accent"
    >
      <p>{objective}</p>
    </LessonCard>
  )
}

type CoreIdeaCardProps = {
  title?: string
  description: string
  bullets?: string[]
}

export function CoreIdeaCard({ title, description, bullets }: CoreIdeaCardProps) {
  const { messages } = useI18n()

  return (
    <LessonCard
      icon={<Lightbulb className="h-4 w-4" />}
      label={messages.lessonChrome.coreIdeaLabel}
      title={title ?? messages.lessonChrome.coreIdeaTitle}
    >
      <div className="space-y-3">
        <p>{description}</p>
        {bullets?.length ? (
          <ul className="list-disc space-y-2 pl-5 text-slate-300">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </LessonCard>
  )
}

type ObservationPromptsCardProps = {
  prompts: string[]
}

export function ObservationPromptsCard({ prompts }: ObservationPromptsCardProps) {
  const { messages } = useI18n()

  return (
    <LessonCard
      icon={<NotebookPen className="h-4 w-4" />}
      label={messages.lessonChrome.observeLabel}
      title={messages.lessonChrome.observeTitle}
    >
      <ol className="list-decimal space-y-2 pl-5 text-slate-300">
        {prompts.map((prompt) => (
          <li key={prompt}>{prompt}</li>
        ))}
      </ol>
    </LessonCard>
  )
}

type LessonNavigationProps = {
  overviewHref?: string
  previousLesson?: {
    title: string
    href: string
  } | null
  nextLesson?: {
    title: string
    href: string
    status?: string
  } | null
}

export function LessonNavigation({ overviewHref, previousLesson, nextLesson }: LessonNavigationProps) {
  const { messages, toLocalizedPath } = useI18n()

  return (
    <LessonCard
      icon={<BookOpen className="h-4 w-4" />}
      label={messages.lessonChrome.navigationLabel}
      title={messages.lessonChrome.navigationTitle}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          to={overviewHref ?? toLocalizedPath('/learn')}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
        >
          <BookOpen className="h-4 w-4" />
          {messages.lessonChrome.backToLearningPath}
        </Link>

        {previousLesson ? (
          <Link
            to={previousLesson.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            {messages.lessonChrome.previous}: {previousLesson.title}
          </Link>
        ) : null}

        {nextLesson ? (
          <Link
            to={nextLesson.href}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-400/15"
          >
            {messages.lessonChrome.next}: {nextLesson.title}
            {nextLesson.status ? (
              <span className="rounded-full border border-cyan-300/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                {nextLesson.status}
              </span>
            ) : null}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </LessonCard>
  )
}
