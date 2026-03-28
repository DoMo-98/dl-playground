import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { learningSections } from '../../content/learningPath'

export function LearnOverviewPage() {
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

      <section className="grid gap-5 lg:grid-cols-3">
        {learningSections.map((section) => (
          <article key={section.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="text-sm leading-6 text-slate-300">{section.description}</p>
            </div>

            <ul className="mt-5 space-y-3 text-sm">
              {section.lessons.map((lesson) => (
                <li key={lesson.href}>
                  <Link
                    to={lesson.href}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-3 py-3 text-slate-200 transition hover:bg-white/5"
                  >
                    <span>{lesson.title}</span>
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                      {lesson.status}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  )
}
