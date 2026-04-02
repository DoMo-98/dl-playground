import { useI18n } from '../../../app/i18n-context'
import { LegendItem, slateAxis, slateDark, white, amber, sky } from '../../../components/visualization'
import type { createCurveSamples } from '../lib/nonlinearity'

const SVG_WIDTH = 640
const SVG_HEIGHT = 320
const X_MIN = -2
const X_MAX = 2
const Y_MIN = -2.5
const Y_MAX = 2.5

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

export type ActivationVisualizationProps = {
  samples: ReturnType<typeof createCurveSamples>
  activationLabel: string
}

export function ActivationVisualization({ samples, activationLabel }: ActivationVisualizationProps) {
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
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill={slateDark} />
        <line x1="0" y1={projectY(0)} x2={SVG_WIDTH} y2={projectY(0)} stroke={slateAxis} strokeDasharray="4 6" />
        <line x1={projectX(0)} y1="0" x2={projectX(0)} y2={SVG_HEIGHT} stroke={slateAxis} strokeDasharray="4 6" />
        <path d={hiddenOnePath} fill="none" stroke={amber} strokeWidth="3" />
        <path d={hiddenTwoPath} fill="none" stroke={sky} strokeWidth="3" />
        <path d={outputPath} fill="none" stroke={white} strokeWidth="4" />
      </svg>

      <div className="grid gap-3 sm:grid-cols-3">
        <LegendItem color="bg-white" label={copy.legend.output} />
        <LegendItem color="bg-amber-400" label={copy.legend.hiddenOne} />
        <LegendItem color="bg-sky-400" label={copy.legend.hiddenTwo} />
      </div>
    </div>
  )
}
