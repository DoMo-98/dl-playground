import { useEffect, useMemo, useState } from 'react'
import { ActionButton } from '../../../../components/form/ActionButton'
import { Control } from '../../../../components/form/Control'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import { useI18n } from '../../../../app/i18n-context'
import { getAdjacentLessons } from '../../../../content/learningPath'
import {
  createLossCurveSamples,
  describeState,
  gradientDescentDomain,
  summarizeTrajectory,
  takeGradientDescentStep,
  type GradientDescentState,
} from '../../../../features/optimization/lib/gradientDescent'

const SVG_WIDTH = 640
const SVG_HEIGHT = 320
const LOSS_CURVE = createLossCurveSamples()
const MIN_LOSS = Math.min(...LOSS_CURVE.map((sample) => sample.loss))
const MAX_LOSS = Math.max(...LOSS_CURVE.map((sample) => sample.loss))
const DEFAULT_PARAMETER = -1.8
const DEFAULT_LEARNING_RATE = 0.15
const MAX_STEPS = 8
const AUTOPLAY_DELAY_MS = 950

export function GradientDescentPage() {
  const { locale, messages } = useI18n()
  const copy = messages.optimization.gradientDescentPage
  const lessonSequence = getAdjacentLessons('gradient-descent-intuition', locale)
  const [learningRate, setLearningRate] = useState(DEFAULT_LEARNING_RATE)
  const [startParameter, setStartParameter] = useState(DEFAULT_PARAMETER)
  const [trajectory, setTrajectory] = useState<GradientDescentState[]>([describeState(DEFAULT_PARAMETER)])
  const prefersReducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const [isAutoplaying, setIsAutoplaying] = useState(false)

  const current = trajectory[trajectory.length - 1]
  const nextStep = useMemo(() => takeGradientDescentStep(current.parameter, learningRate), [current.parameter, learningRate])
  const trajectorySummary = useMemo(() => summarizeTrajectory(trajectory), [trajectory])
  const canStep = trajectory.length - 1 < MAX_STEPS

  useEffect(() => {
    if (!isAutoplaying || !canStep || prefersReducedMotion) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setTrajectory((previous) => {
        const nextTrajectory = [...previous, describeState(nextStep.nextParameter)]

        if (nextTrajectory.length - 1 >= MAX_STEPS) {
          setIsAutoplaying(false)
        }

        return nextTrajectory
      })
    }, AUTOPLAY_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [canStep, isAutoplaying, nextStep.nextParameter, prefersReducedMotion])

  const regimeCopy = copy.regimes[trajectorySummary.regime]

  function resetTrajectory(nextStart = startParameter) {
    setTrajectory([describeState(nextStart)])
    setIsAutoplaying(false)
  }

  function handleStep() {
    if (!canStep) {
      return
    }

    setTrajectory((previous) => [...previous, describeState(nextStep.nextParameter)])
  }

  function handlePreset(nextLearningRate: number) {
    setLearningRate(nextLearningRate)
    resetTrajectory(startParameter)
  }

  return (
    <LearningPageLayout
      lessonId="gradient-descent-intuition"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">{copy.presetLabel}</p>
            <div className="grid gap-2">
              {copy.presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePreset(preset.learningRate)}
                  className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                    Math.abs(learningRate - preset.learningRate) < 0.001
                      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                      : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className="block font-medium text-white">{preset.label}</span>
                  <span className="block text-slate-300">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <Control
            label={copy.controlLabels.learningRate}
            value={learningRate}
            min={0.05}
            max={0.75}
            step={0.05}
            onChange={(value) => {
              setLearningRate(value)
              resetTrajectory(startParameter)
            }}
          />
          <Control
            label={copy.controlLabels.startParameter}
            value={startParameter}
            min={gradientDescentDomain.min}
            max={0.4}
            step={0.1}
            onChange={(value) => {
              setStartParameter(value)
              resetTrajectory(value)
            }}
          />

          <div className="grid gap-2 sm:grid-cols-3">
            <ActionButton label={copy.actions.step} onClick={handleStep} disabled={!canStep} accent />
            <ActionButton
              label={isAutoplaying ? copy.actions.pause : copy.actions.autoplay}
              onClick={() => setIsAutoplaying((value) => !value)}
              disabled={!canStep}
            />
            <ActionButton label={copy.actions.reset} onClick={() => resetTrajectory()} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">{copy.updateTitle}</p>
            <p className="mt-2 font-mono text-cyan-300">
              w ← {current.parameter.toFixed(2)} - {learningRate.toFixed(2)} × ({nextStep.gradient.toFixed(2)})
            </p>
            <p className="mt-2">{copy.updateDescription}</p>
          </div>
        </div>
      }
      visualization={<GradientVisualization trajectory={trajectory} currentParameter={current.parameter} />}
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-4">
            <StatCard label={copy.stats.step} value={`${trajectory.length - 1}/${MAX_STEPS}`} accent />
            <StatCard label={copy.stats.loss} value={current.loss.toFixed(3)} />
            <StatCard label={copy.stats.gradient} value={current.gradient.toFixed(3)} />
            <StatCard label={copy.stats.regime} value={regimeCopy.label} />
          </div>

          <div>
            <p className="font-semibold text-white">{regimeCopy.title}</p>
            <p>{regimeCopy.description}</p>
          </div>

          <div>
            <p className="font-semibold text-white">{copy.readingGuideTitle}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {copy.readingGuideBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-50">
            <p className="font-semibold text-white">{copy.bridgeTitle}</p>
            <p>{copy.bridgeDescription}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}

function GradientVisualization({ trajectory, currentParameter }: { trajectory: GradientDescentState[]; currentParameter: number }) {
  const { messages } = useI18n()
  const copy = messages.optimization.gradientDescentPage.visualization
  const curvePath = toPath(LOSS_CURVE.map((sample) => ({ x: sample.parameter, y: sample.loss })))
  const trajectoryPath = toPath(trajectory.map((state) => ({ x: state.parameter, y: state.loss })))
  const currentLoss = describeState(currentParameter).loss

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{copy.eyebrow}</p>
          <h2 className="text-xl font-semibold text-white">{copy.title}</h2>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
          {copy.badge}
        </div>
      </div>

      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full rounded-2xl border border-white/10 bg-slate-950" role="img" aria-label={copy.ariaLabel}>
        <title>{copy.ariaLabel}</title>
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="#020617" />
        <line x1="0" y1={projectY(1.8)} x2={SVG_WIDTH} y2={projectY(1.8)} stroke="rgba(148, 163, 184, 0.22)" strokeDasharray="4 6" />
        <line x1={projectX(0)} y1="0" x2={projectX(0)} y2={SVG_HEIGHT} stroke="rgba(148, 163, 184, 0.22)" strokeDasharray="4 6" />
        <path d={curvePath} fill="none" stroke="#f8fafc" strokeWidth="4" />
        <path d={trajectoryPath} fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 6" />
        {trajectory.map((state, index) => (
          <circle
            key={`${state.parameter}-${index}`}
            cx={projectX(state.parameter)}
            cy={projectY(state.loss)}
            r={index === trajectory.length - 1 ? 7 : 5}
            fill={index === trajectory.length - 1 ? '#22d3ee' : '#f59e0b'}
            stroke="#e2e8f0"
            strokeWidth="2"
          />
        ))}
        <line
          x1={projectX(currentParameter)}
          x2={projectX(currentParameter)}
          y1={projectY(MIN_LOSS)}
          y2={projectY(currentLoss)}
          stroke="rgba(34, 211, 238, 0.35)"
          strokeDasharray="4 6"
        />
      </svg>

      <div className="grid gap-3 sm:grid-cols-3">
        <LegendItem color="bg-white" label={copy.legend.loss} />
        <LegendItem color="bg-sky-400" label={copy.legend.trajectory} />
        <LegendItem color="bg-amber-400" label={copy.legend.visitedStep} />
      </div>
    </div>
  )
}

function projectX(parameter: number) {
  return ((parameter - gradientDescentDomain.min) / (gradientDescentDomain.max - gradientDescentDomain.min)) * SVG_WIDTH
}

function projectY(loss: number) {
  return SVG_HEIGHT - ((loss - MIN_LOSS) / (MAX_LOSS - MIN_LOSS)) * SVG_HEIGHT
}

function toPath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${projectX(point.x).toFixed(2)} ${projectY(point.y).toFixed(2)}`)
    .join(' ')
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  )
}

function StatCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? 'border-cyan-400/20 bg-cyan-400/10' : 'border-white/10 bg-slate-950/40'}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}
