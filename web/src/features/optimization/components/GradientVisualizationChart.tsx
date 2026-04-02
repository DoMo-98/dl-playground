import { useI18n } from '../../../app/i18n-context'
import { LegendItem, slateAxisSubtle, slateDark, white, cyan, amber, sky, slateLight, cyanGuide } from '../../../components/visualization'
import {
  createLossCurveSamples,
  describeState,
  gradientDescentDomain,
  type GradientDescentState,
} from '../lib/gradientDescent'

const SVG_WIDTH = 640
const SVG_HEIGHT = 320
const LOSS_CURVE = createLossCurveSamples()
const MIN_LOSS = Math.min(...LOSS_CURVE.map((sample) => sample.loss))
const MAX_LOSS = Math.max(...LOSS_CURVE.map((sample) => sample.loss))

type GradientVisualizationChartProps = {
  trajectory: GradientDescentState[]
  currentParameter: number
}

export function GradientVisualizationChart({ trajectory, currentParameter }: GradientVisualizationChartProps) {
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
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill={slateDark} />
        <line x1="0" y1={projectY(1.8)} x2={SVG_WIDTH} y2={projectY(1.8)} stroke={slateAxisSubtle} strokeDasharray="4 6" />
        <line x1={projectX(0)} y1="0" x2={projectX(0)} y2={SVG_HEIGHT} stroke={slateAxisSubtle} strokeDasharray="4 6" />
        <path d={curvePath} fill="none" stroke={white} strokeWidth="4" />
        <path d={trajectoryPath} fill="none" stroke={sky} strokeWidth="3" strokeDasharray="8 6" />
        {trajectory.map((state, index) => (
          <circle
            key={`${state.parameter}-${index}`}
            cx={projectX(state.parameter)}
            cy={projectY(state.loss)}
            r={index === trajectory.length - 1 ? 7 : 5}
            fill={index === trajectory.length - 1 ? cyan : amber}
            stroke={slateLight}
            strokeWidth="2"
          />
        ))}
        <line
          x1={projectX(currentParameter)}
          x2={projectX(currentParameter)}
          y1={projectY(MIN_LOSS)}
          y2={projectY(currentLoss)}
          stroke={cyanGuide}
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
