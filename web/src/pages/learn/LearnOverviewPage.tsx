import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../app/i18n-context'
import {
  getNextReadyLesson,
  getLearningSections,
  getSectionLessons,
  getSectionPath,
  getSectionStats,
  type LessonStatus,
} from '../../content/learningPath'

const statusTone: Record<LessonStatus, string> = {
  ready: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  planned: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
}

export function LearnOverviewPage() {
  const { locale, messages } = useI18n()
  const learningSections = getLearningSections(locale)
  const nextReadyLesson = getNextReadyLesson(locale)

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{messages.learn.eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">{messages.learn.title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-300">{messages.learn.description}</p>
      </section>

      {nextReadyLesson ? (
        <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                {messages.learn.startEyebrow}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">{nextReadyLesson.title}</h2>
                <p className="max-w-2xl text-sm leading-7 text-cyan-50">{nextReadyLesson.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100">
                <MetaBadge icon={<Clock3 className="h-3.5 w-3.5" />} label={`${nextReadyLesson.estimatedMinutes} ${messages.learn.metaMinutes}`} />
                <MetaBadge icon={<BookOpen className="h-3.5 w-3.5" />} label={messages.learn.lessonKind[nextReadyLesson.kind]} />
                <MetaBadge
                  icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                  label={`${nextReadyLesson.objectives.length} ${messages.learn.metaObjectives}`}
                />
              </div>
            </div>

            <Link
              to={nextReadyLesson.href}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              {messages.learn.openLesson}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-200">{messages.learn.taxonomyNoteTitle}</p>
          <p className="max-w-4xl text-sm leading-7 text-slate-300">{messages.learn.taxonomyNote}</p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {learningSections.map((section) => {
          const lessons = getSectionLessons(section)
          const stats = getSectionStats(section)

          return (
            <article key={section.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="space-y-3">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  <p className="text-sm leading-6 text-slate-300">{section.description}</p>
                </div>

                <p className="text-sm leading-6 text-slate-400">{section.goal}</p>

                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-slate-300">
                  <MetaBadge icon={<CheckCircle2 className="h-3.5 w-3.5" />} label={messages.learn.readyCount(stats.readyCount, stats.lessonCount)} />
                  <MetaBadge icon={<Clock3 className="h-3.5 w-3.5" />} label={messages.learn.totalMinutes(stats.totalMinutes)} />
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm">
                {lessons.map((lesson) => (
                  <li key={lesson.href}>
                    {lesson.status === 'ready' ? (
                      <Link
                        to={lesson.href}
                        className="flex items-start justify-between gap-3 rounded-xl border border-white/10 px-3 py-3 text-slate-200 transition hover:bg-white/5"
                      >
                        <LessonCardBody
                          title={lesson.shortTitle}
                          summary={lesson.summary}
                          estimatedMinutes={lesson.estimatedMinutes}
                          status={lesson.status}
                          statusLabel={messages.learn.status[lesson.status]}
                          objectiveCount={lesson.objectives.length}
                          objectiveLabel={messages.learn.metaObjectives}
                          minutesLabel={messages.learn.metaMinutes}
                        />
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                      </Link>
                    ) : (
                      <div className="flex items-start justify-between gap-3 rounded-xl border border-dashed border-white/10 px-3 py-3 text-slate-200 opacity-85">
                        <LessonCardBody
                          title={lesson.shortTitle}
                          summary={lesson.summary}
                          estimatedMinutes={lesson.estimatedMinutes}
                          status={lesson.status}
                          statusLabel={`${messages.learn.status[lesson.status]} · ${messages.learn.unavailableLabel}`}
                          objectiveCount={lesson.objectives.length}
                          objectiveLabel={messages.learn.metaObjectives}
                          minutesLabel={messages.learn.metaMinutes}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                to={getSectionPath(section, locale)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                {stats.readyCount > 0 ? messages.learn.openAvailableLesson : messages.learn.sectionRoadmap}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          )
        })}
      </section>
    </div>
  )
}

type LessonCardBodyProps = {
  title: string
  summary: string
  estimatedMinutes: number
  status: LessonStatus
  statusLabel: string
  objectiveCount: number
  objectiveLabel: string
  minutesLabel: string
}

function LessonCardBody({
  title,
  summary,
  estimatedMinutes,
  status,
  statusLabel,
  objectiveCount,
  objectiveLabel,
  minutesLabel,
}: LessonCardBodyProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-white">{title}</span>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${statusTone[status]}`}
        >
          {statusLabel}
        </span>
      </div>
      <p className="max-w-md text-sm leading-6 text-slate-400">{summary}</p>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-slate-500">
        <span>{estimatedMinutes} {minutesLabel}</span>
        <span>{objectiveCount} {objectiveLabel}</span>
      </div>
    </div>
  )
}

type MetaBadgeProps = {
  icon: ReactNode
  label: string
}

function MetaBadge({ icon, label }: MetaBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
      {icon}
      {label}
    </span>
  )
}
