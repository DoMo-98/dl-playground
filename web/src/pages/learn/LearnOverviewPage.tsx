import { ArrowRight, BookOpen, CheckCircle2, Clock3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../app/i18n-context'
import { Button } from '../../components/form/Button'
import { Card } from '../../components/Card'
import { LessonCardBody } from '../../components/learning/LessonCardBody'
import { MetaBadge } from '../../components/learning/MetaBadge'
import {
  getNextReadyLesson,
  getLearningSections,
  getSectionLessons,
  getSectionPath,
  getSectionStats,
} from '../../content/learningPath'

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

            <Button asChild variant="solid" size="lg">
              <Link to={nextReadyLesson.href} className="inline-flex items-center gap-2 rounded-full px-5 font-semibold">
                {messages.learn.openLesson}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}

      <Card as="section">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-200">{messages.learn.taxonomyNoteTitle}</p>
          <p className="max-w-4xl text-sm leading-7 text-slate-300">{messages.learn.taxonomyNote}</p>
        </div>
      </Card>

      <section className="grid gap-5 lg:grid-cols-3">
        {learningSections.map((section) => {
          const lessons = getSectionLessons(section)
          const stats = getSectionStats(section)

          return (
            <Card as="article" key={section.slug}>
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
            </Card>
          )
        })}
      </section>
    </div>
  )
}
