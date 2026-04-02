import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Lock, NotebookPen, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../app/i18n-context'
import type { LessonStatus } from '../../types/learning'

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

type AdjacentLessonLink = {
  title: string
  href: string
  status?: LessonStatus
}

type LessonNavigationProps = {
  overviewHref?: string
  previousLesson?: AdjacentLessonLink | null
  nextLesson?: AdjacentLessonLink | null
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

        <LessonNavigationAction direction="previous" lesson={previousLesson} />
        <LessonNavigationAction direction="next" lesson={nextLesson} />
      </div>
    </LessonCard>
  )
}

type LessonNavigationActionProps = {
  direction: 'previous' | 'next'
  lesson?: AdjacentLessonLink | null
}

function LessonNavigationAction({ direction, lesson }: LessonNavigationActionProps) {
  const { messages } = useI18n()

  if (!lesson) {
    return null
  }

  const label = `${messages.lessonChrome[direction]}: ${lesson.title}`
  const icon = direction === 'previous' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />

  if (lesson.status === 'ready') {
    return (
      <Link
        to={lesson.href}
        className={
          direction === 'next'
            ? 'inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-400/15'
            : 'inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5'
        }
      >
        {direction === 'previous' ? icon : null}
        <span>{label}</span>
        {direction === 'next' ? icon : null}
      </Link>
    )
  }

  return (
    <div
      aria-disabled="true"
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-medium text-slate-400"
      title={messages.lessonChrome.unavailableDescription}
    >
      {direction === 'previous' ? icon : null}
      <span>{label}</span>
      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-300">
        <Lock className="h-3 w-3" />
        {messages.lessonChrome.unavailableBadge}
      </span>
      {direction === 'next' ? icon : null}
    </div>
  )
}
