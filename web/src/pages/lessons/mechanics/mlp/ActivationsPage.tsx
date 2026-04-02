import { useMemo, useState } from 'react'
import { Control } from '../../../../components/form/Control'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import { getAdjacentLessons } from '../../../../content/learningPath'
import { useI18n } from '../../../../app/i18n-context'
import {
  activationKinds,
  createCurveSamples,
  summarizeCurveBehavior,
  type ActivationKind,
} from '../../../../features/mlp/lib/nonlinearity'

const SVG_WIDTH = 640
const SVG_HEIGHT = 320
const X_MIN = -2
const X_MAX = 2
const Y_MIN = -2.5
const Y_MAX = 2.5

export function ActivationsPage() {
  const { locale, messages } = useI18n()
  const copy = messages.mlp.activationsPage
  const lessonSequence = getAdjacentLessons('mlp-activations', locale)
  const [activation, setActivation] = useState<ActivationKind>('linear')
  const [hiddenScale, setHiddenScale] = useState(1.2)
  const [outputScale, setOutputScale] = useState(1)

  const samples = useMemo(() => createCurveSamples(activation, { hiddenScale, outputScale }), [activation, hiddenScale, outputScale])
  const summary = useMemo(() => summarizeCurveBehavior(activation, { hiddenScale, outputScale }), [activation, hiddenScale, outputScale])
  const activationCopy = copy.activationOptions[activation]

  return (
    <LearningPageLayout
      lessonId="mlp-activations"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.activationLabel}</legend>
            <div className="space-y-2">
              {activationKinds.map((candidate) => {
                const candidateCopy = copy.activationOptions[candidate]

                return (
                  <label
                    key={candidate}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                      candidate === activation
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                        : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="activation"
                      value={candidate}
                      checked={candidate === activation}
                      onChange={() => setActivation(candidate)}
                      className="mt-1 accent-cyan-400"
                    />
                    <span>
                      <span className="block font-medium text-white">{candidateCopy.label}</span>
                      <span className="block text-slate-300">{candidateCopy.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <Control label={copy.controlLabels.hiddenScale} value={hiddenScale} onChange={setHiddenScale} min={0.4} max={2.4} step={0.1} />
          <Control label={copy.controlLabels.outputScale} value={outputScale} onChange={setOutputScale} min={0.4} max={1.8} step={0.1} />
        </div>
      }
      visualization={<ActivationVisualization samples={samples} activationLabel={activationCopy.label} />}
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.behavior} value={copy.shapeLabels[summary.shape as keyof typeof copy.shapeLabels]} accent />
            <StatCard label={copy.stats.outputRange} value={`${summary.minOutput.toFixed(2)} → ${summary.maxOutput.toFixed(2)}`} />
            <StatCard label={copy.stats.centerValue} value={summary.middleOutput.toFixed(2)} />
          </div>

          <div>
            <p className="font-semibold text-white">{activationCopy.interpretationTitle}</p>
            <p>{activationCopy.interpretation}</p>
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
            <p className="font-semibold text-white">{copy.xorBridgeTitle}</p>
            <p>{copy.xorBridgeDescription}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}

function ActivationVisualization({
  samples,
  activationLabel,
}: {
  samples: ReturnType<typeof createCurveSamples>
  activationLabel: string
}) {
  const { messages } = useI18n()
  const copy = messages.mlp.activationsPage.visualization
  const outputPath = toPath(samples.map((sample) => ({ x: sample.x, y: sample.output })))
  const hiddenOnePath = toPath(samples.map((sample) => ({ x: sample.x, y: sample.hidden[0] })))
  const hiddenTwoPath = toPath(samples.map((sample) => ({ x: sample.x, y: sample.hidden[1] })))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{copy.eyebrow}</p>
          <h2 className="text-xl font-semibold text-white">{activationLabel}</h2>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
          {copy.badge}
        </div>
      </div>

      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full rounded-2xl border border-white/10 bg-slate-950" role="img" aria-label={copy.ariaLabel}>
        <title>{copy.ariaLabel}</title>
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="#020617" />
        <line x1="0" y1={projectY(0)} x2={SVG_WIDTH} y2={projectY(0)} stroke="rgba(148, 163, 184, 0.35)" strokeDasharray="4 6" />
        <line x1={projectX(0)} y1="0" x2={projectX(0)} y2={SVG_HEIGHT} stroke="rgba(148, 163, 184, 0.35)" strokeDasharray="4 6" />
        <path d={hiddenOnePath} fill="none" stroke="#f59e0b" strokeWidth="3" />
        <path d={hiddenTwoPath} fill="none" stroke="#38bdf8" strokeWidth="3" />
        <path d={outputPath} fill="none" stroke="#f8fafc" strokeWidth="4" />
      </svg>

      <div className="grid gap-3 sm:grid-cols-3">
        <LegendItem color="bg-white" label={copy.legend.output} />
        <LegendItem color="bg-amber-400" label={copy.legend.hiddenOne} />
        <LegendItem color="bg-sky-400" label={copy.legend.hiddenTwo} />
      </div>
    </div>
  )
}

function projectX(value: number) {
  return ((value - X_MIN) / (X_MAX - X_MIN)) * SVG_WIDTH
}

function projectY(value: number) {
  return SVG_HEIGHT - ((value - Y_MIN) / (Y_MAX - Y_MIN)) * SVG_HEIGHT
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
