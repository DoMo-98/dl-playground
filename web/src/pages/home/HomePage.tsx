import { ArrowRight, Orbit } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
            Visual, interactive deep learning intuition
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Learn neural networks by seeing them, touching them, and changing them.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              This web layer of dl-playground is being built as an academic interactive resource:
              every lesson combines explanation, visualization, and experimentation.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              Explore learning path
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/learn/mechanics/perceptron/weighted-sum"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-medium text-slate-100 transition hover:bg-white/5"
            >
              Open first lesson
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="mb-5 flex items-center gap-3 text-cyan-200">
            <Orbit className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-[0.18em]">Design pillars</span>
          </div>

          <ul className="space-y-4 text-sm leading-7 text-slate-300">
            <li><span className="font-semibold text-white">Explain clearly:</span> each page teaches one idea at a time.</li>
            <li><span className="font-semibold text-white">Show visually:</span> mechanisms should be visible, not only described.</li>
            <li><span className="font-semibold text-white">Let users experiment:</span> every page includes meaningful interaction.</li>
            <li><span className="font-semibold text-white">Give immediate feedback:</span> changes should produce visible effects.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
