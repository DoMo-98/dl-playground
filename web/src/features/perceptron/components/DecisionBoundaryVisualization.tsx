import { useI18n } from '../../../app/i18n-context'
import { LegendItem, cyanRegion, slateRegion, slateAxis, white, cyan, slate, rose, slateDark } from '../../../components/visualization'
import { classifyPoint, describeDecisionBoundary, projectToViewport, summarizeDataset } from '../lib/decisionBoundary'

const VIEWBOX_SIZE = 320
const AXIS_MIN = -2
const AXIS_MAX = 2

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

export function DecisionBoundaryVisualization({ summary, boundary, datasetName, weights }: DecisionBoundaryVisualizationProps) {
  const { messages } = useI18n()
  const copy = messages.perceptron.decisionBoundaryPage.visualization
  const positiveRegion = cyanRegion
  const negativeRegion = slateRegion

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

        <line x1="0" y1={VIEWBOX_SIZE / 2} x2={VIEWBOX_SIZE} y2={VIEWBOX_SIZE / 2} stroke={slateAxis} strokeDasharray="4 6" />
        <line x1={VIEWBOX_SIZE / 2} y1="0" x2={VIEWBOX_SIZE / 2} y2={VIEWBOX_SIZE} stroke={slateAxis} strokeDasharray="4 6" />

        {renderBoundaryLine(boundary)}

        {summary.points.map((point) => {
          const x = projectToViewport(point.x)
          const y = VIEWBOX_SIZE - projectToViewport(point.y)
          const fill = point.prediction === 1 ? cyan : slate
          const stroke = point.correct ? white : rose

          return (
            <g key={point.id} aria-label={`point-${point.id}-${point.correct ? 'correct' : 'mismatch'}`}>
              <circle cx={x} cy={y} r="10" fill={fill} stroke={stroke} strokeWidth="3" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill={slateDark}>
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
    return <line x1={x} y1="0" x2={x} y2={VIEWBOX_SIZE} stroke={white} strokeWidth="3" />
  }

  return (
    <line
      x1={projectToViewport(boundary.p1.x)}
      y1={VIEWBOX_SIZE - projectToViewport(boundary.p1.y)}
      x2={projectToViewport(boundary.p2.x)}
      y2={VIEWBOX_SIZE - projectToViewport(boundary.p2.y)}
      stroke={white}
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
