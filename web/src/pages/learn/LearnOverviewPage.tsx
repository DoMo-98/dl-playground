import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getNextReadyLesson,
  getSectionLessons,
  getSectionPath,
  getSectionStats,
  learningSections,
} from '../../content/learningPath'

const statusTone = {
  ready: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  planned: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
} as const

export function LearnOverviewPage() {
  const nextReadyLesson = getNextReadyLesson()

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">Learning path</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Interactive deep learning lessons</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-300">
          The learning path is organized into small visual lessons. Each page is designed to explain a
          concept, show it clearly, and let the learner change something meaningful.
        </p>
      </section>

      {nextReadyLesson ? (
        <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Start with the first live lesson
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">{nextReadyLesson.title}</h2>
                <p className="max-w-2xl text-sm leading-7 text-cyan-50">{nextReadyLesson.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100">
                <MetaBadge icon={<Clock3 className="h-3.5 w-3.5" />} label={`${nextReadyLesson.estimatedMinutes} min`} />
                <MetaBadge icon={<BookOpen className="h-3.5 w-3.5" />} label={nextReadyLesson.kind} />
                <MetaBadge
                  icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                  label={`${nextReadyLesson.objectives.length} objectives`}
                />
              </div>
            </div>

            <Link
              to={nextReadyLesson.href}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Open lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}

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
                  <MetaBadge icon={<CheckCircle2 className="h-3.5 w-3.5" />} label={`${stats.readyCount}/${stats.lessonCount} ready`} />
                  <MetaBadge icon={<Clock3 className="h-3.5 w-3.5" />} label={`${stats.totalMinutes} min total`} />
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
                          objectiveCount={lesson.objectives.length}
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
                          objectiveCount={lesson.objectives.length}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                to={getSectionPath(section)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                {stats.readyCount > 0 ? 'Open available lesson' : 'Section roadmap'}
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
  status: 'ready' | 'planned'
  objectiveCount: number
}

function LessonCardBody({ title, summary, estimatedMinutes, status, objectiveCount }: LessonCardBodyProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-white">{title}</span>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ${statusTone[status]}`}
        >
          {status}
        </span>
      </div>
      <p className="max-w-md text-sm leading-6 text-slate-400">{summary}</p>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-slate-500">
        <span>{estimatedMinutes} min</span>
        <span>{objectiveCount} objectives</span>
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
