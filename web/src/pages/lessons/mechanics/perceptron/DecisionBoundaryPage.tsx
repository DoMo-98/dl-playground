import { useMemo, useState } from 'react'
import { Control } from '../../../../components/form/Control'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import {
  classifyPoint,
  decisionBoundaryDatasets,
  describeDecisionBoundary,
  projectToViewport,
  summarizeDataset,
} from '../../../../features/perceptron/lib/decisionBoundary'
import { getAdjacentLessons } from '../../../../content/learningPath'
import { useI18n } from '../../../../app/i18n-context'

const VIEWBOX_SIZE = 320
const AXIS_MIN = -2
const AXIS_MAX = 2

export function DecisionBoundaryPage() {
  const { locale, messages } = useI18n()
  const copy = messages.perceptron.decisionBoundaryPage
  const lessonSequence = getAdjacentLessons('perceptron-decision-boundary', locale)
  const [datasetId, setDatasetId] = useState(decisionBoundaryDatasets[0].id)
  const [w1, setW1] = useState(1)
  const [w2, setW2] = useState(1)
  const [bias, setBias] = useState(0)

  const dataset = decisionBoundaryDatasets.find((candidate) => candidate.id === datasetId) ?? decisionBoundaryDatasets[0]
  const boundary = useMemo(() => describeDecisionBoundary({ w1, w2, bias }), [w1, w2, bias])
  const summary = useMemo(() => summarizeDataset(dataset, { w1, w2, bias }), [dataset, w1, w2, bias])
  const datasetName = copy.datasetNames[dataset.id as keyof typeof copy.datasetNames]
  const datasetDescription = copy.datasetDescriptions[dataset.id as keyof typeof copy.datasetDescriptions]
  const datasetNote = copy.datasetNotes[dataset.id as keyof typeof copy.datasetNotes] ?? dataset.note

  return (
    <LearningPageLayout
      lessonId="perceptron-decision-boundary"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.preparedDataset}</legend>
            <div className="space-y-2">
              {decisionBoundaryDatasets.map((candidate) => {
                const candidateName = copy.datasetNames[candidate.id as keyof typeof copy.datasetNames]
                const candidateDescription = copy.datasetDescriptions[candidate.id as keyof typeof copy.datasetDescriptions]

                return (
                  <label
                    key={candidate.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                      candidate.id === dataset.id
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                        : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dataset"
                      value={candidate.id}
                      checked={candidate.id === dataset.id}
                      onChange={() => setDatasetId(candidate.id)}
                      className="mt-1 accent-cyan-400"
                    />
                    <span>
                      <span className="block font-medium text-white">{candidateName}</span>
                      <span className="block text-slate-300">{candidateDescription}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <Control label={copy.controlLabels.w1} value={w1} onChange={setW1} min={-2} max={2} step={0.1} />
          <Control label={copy.controlLabels.w2} value={w2} onChange={setW2} min={-2} max={2} step={0.1} />
          <Control label={copy.controlLabels.bias} value={bias} onChange={setBias} min={-2} max={2} step={0.1} />
        </div>
      }
      visualization={
        <DecisionBoundaryVisualization
          summary={summary}
          boundary={boundary}
          datasetName={datasetName}
          weights={{ w1, w2, bias }}
        />
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.correct} value={`${summary.correctCount} / ${dataset.points.length}`} />
            <StatCard label={copy.stats.mismatched} value={String(summary.incorrectCount)} />
            <StatCard label={copy.stats.equation} value={boundary.equation} accent />
          </div>

          <div>
            <p className="font-semibold text-white">{copy.movementTitle}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {copy.movementBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="font-semibold text-white">{datasetName}</p>
            <p>{datasetDescription}</p>
          </div>

          {datasetNote ? (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-50">
              <p className="font-semibold text-white">{copy.presetNoteTitle}</p>
              <p>{datasetNote}</p>
            </div>
          ) : null}
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}

type DecisionBoundaryVisualizationProps = {
  summary: ReturnType<typeof summarizeDataset>
  boundary: ReturnType<typeof describeDecisionBoundary>
  datasetName: string
  weights: {
    w1: number
    w2: number
    bias: number
  }
}

function DecisionBoundaryVisualization({ summary, boundary, datasetName, weights }: DecisionBoundaryVisualizationProps) {
  const { messages } = useI18n()
  const copy = messages.perceptron.decisionBoundaryPage.visualization
  const positiveRegion = 'rgba(34, 211, 238, 0.15)'
  const negativeRegion = 'rgba(148, 163, 184, 0.10)'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">{copy.eyebrow}</p>
          <h2 className="text-xl font-semibold text-white">{datasetName}</h2>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
          {copy.regionBadge}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="w-full rounded-2xl border border-white/10 bg-slate-950"
        role="img"
        aria-label={copy.ariaLabel}
      >
        <title>{copy.ariaLabel}</title>
        <rect x="0" y="0" width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill={negativeRegion} />
        {renderRegionTiles(weights, positiveRegion)}

        <line x1="0" y1={VIEWBOX_SIZE / 2} x2={VIEWBOX_SIZE} y2={VIEWBOX_SIZE / 2} stroke="rgba(148, 163, 184, 0.35)" strokeDasharray="4 6" />
        <line x1={VIEWBOX_SIZE / 2} y1="0" x2={VIEWBOX_SIZE / 2} y2={VIEWBOX_SIZE} stroke="rgba(148, 163, 184, 0.35)" strokeDasharray="4 6" />

        {renderBoundaryLine(boundary)}

        {summary.points.map((point) => {
          const x = projectToViewport(point.x)
          const y = VIEWBOX_SIZE - projectToViewport(point.y)
          const fill = point.prediction === 1 ? '#22d3ee' : '#94a3b8'
          const stroke = point.correct ? '#f8fafc' : '#fb7185'

          return (
            <g key={point.id} aria-label={`point-${point.id}-${point.correct ? 'correct' : 'mismatch'}`}>
              <circle cx={x} cy={y} r="10" fill={fill} stroke={stroke} strokeWidth="3" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="#020617">
                {point.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="grid gap-3 sm:grid-cols-2">
        <LegendItem color="bg-cyan-400" label={copy.legend.positiveRegion} />
        <LegendItem color="bg-slate-400" label={copy.legend.negativeRegion} />
        <LegendItem color="bg-white" label={copy.legend.correctOutline} />
        <LegendItem color="bg-rose-400" label={copy.legend.mismatchOutline} />
      </div>
    </div>
  )
}

function renderBoundaryLine(boundary: ReturnType<typeof describeDecisionBoundary>) {
  if (boundary.kind === 'none') {
    return null
  }

  if (boundary.kind === 'vertical') {
    const x = projectToViewport(boundary.x)
    return <line x1={x} y1="0" x2={x} y2={VIEWBOX_SIZE} stroke="#f8fafc" strokeWidth="3" />
  }

  return (
    <line
      x1={projectToViewport(boundary.p1.x)}
      y1={VIEWBOX_SIZE - projectToViewport(boundary.p1.y)}
      x2={projectToViewport(boundary.p2.x)}
      y2={VIEWBOX_SIZE - projectToViewport(boundary.p2.y)}
      stroke="#f8fafc"
      strokeWidth="3"
    />
  )
}

function renderRegionTiles(weights: { w1: number; w2: number; bias: number }, fill: string) {
  const tilesPerAxis = 12
  const tileSize = VIEWBOX_SIZE / tilesPerAxis

  return Array.from({ length: tilesPerAxis * tilesPerAxis }, (_, index) => {
    const xi = index % tilesPerAxis
    const yi = Math.floor(index / tilesPerAxis)
    const x = AXIS_MIN + ((xi + 0.5) / tilesPerAxis) * (AXIS_MAX - AXIS_MIN)
    const y = AXIS_MAX - ((yi + 0.5) / tilesPerAxis) * (AXIS_MAX - AXIS_MIN)
    const prediction = classifyPoint({ x, y }, weights)

    if (prediction !== 1) {
      return null
    }

    return <rect key={`${xi}-${yi}`} x={xi * tileSize} y={yi * tileSize} width={tileSize} height={tileSize} fill={fill} />
  })
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
