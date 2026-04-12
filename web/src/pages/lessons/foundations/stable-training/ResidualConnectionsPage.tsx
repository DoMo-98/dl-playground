import { useMemo, useState } from 'react'
import { OptionCard } from '../../../../components/form/OptionCard'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import { StatCard } from '../../../../components/visualization'
import { useI18n } from '../../../../app/i18n-context'
import { getAdjacentLessons } from '../../../../content/learningPath'
import {
  analyzeResidualStack,
  residualDepthOptions,
  residualPresets,
  type ResidualPreset,
} from '../../../../features/residuals/lib/residualConnections'

function formatValue(value: number) {
  return value.toFixed(2)
}

function FeatureRow({
  label,
  input,
  plain,
  residual,
  inputLabel,
  plainLabel,
  residualLabel,
}: {
  label: string
  input: number
  plain: number
  residual: number
  inputLabel: string
  plainLabel: string
  residualLabel: string
}) {
  const toWidth = (value: number) => `${Math.min(100, Math.abs(value) * 26)}%`

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
        <p className="font-medium text-white">{label}</p>
        <p>{formatValue(input)} / {formatValue(plain)} / {formatValue(residual)}</p>
      </div>

      <div className="space-y-3">
        {[
          { value: input, label: inputLabel, tone: input >= 0 ? 'bg-amber-300' : 'bg-rose-300' },
          { value: plain, label: plainLabel, tone: plain >= 0 ? 'bg-violet-300' : 'bg-fuchsia-300' },
          { value: residual, label: residualLabel, tone: residual >= 0 ? 'bg-cyan-300' : 'bg-emerald-300' },
        ].map((entry) => (
          <div key={entry.label}>
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
              <span>{entry.label}</span>
              <span>{formatValue(entry.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className={`h-2 rounded-full ${entry.tone}`} style={{ width: toWidth(entry.value) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ResidualConnectionsPage() {
  const { locale, messages } = useI18n()
  const copy = messages.stableTraining.residualConnectionsPage
  const lessonSequence = getAdjacentLessons('residual-connections-why-skip-connections-help', locale)
  const [preset, setPreset] = useState<ResidualPreset>('denoise')
  const [depth, setDepth] = useState<(typeof residualDepthOptions)[number]>(4)

  const analysis = useMemo(() => analyzeResidualStack(preset, depth), [preset, depth])
  const presetCopy = copy.presetOptions[preset]

  return (
    <LearningPageLayout
      lessonId="residual-connections-why-skip-connections-help"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.presetTitle}</legend>
            <div className="grid gap-2">
              {residualPresets.map((option) => (
                <OptionCard
                  key={option}
                  name="residual-preset"
                  value={option}
                  selected={preset === option}
                  onChange={() => setPreset(option)}
                >
                  <span>
                    <span className="block font-medium text-white">{copy.presetOptions[option].label}</span>
                    <span className="block text-slate-300">{copy.presetOptions[option].description}</span>
                  </span>
                </OptionCard>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.depthTitle}</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {residualDepthOptions.map((option) => (
                <OptionCard
                  key={option}
                  name="residual-depth"
                  value={String(option)}
                  selected={depth === option}
                  onChange={() => setDepth(option)}
                >
                  <span>
                    <span className="block font-medium text-white">{copy.depthOptionLabel(option)}</span>
                    <span className="block text-slate-300">{copy.depthOptionDescription(option)}</span>
                  </span>
                </OptionCard>
              ))}
            </div>
          </fieldset>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">{copy.controlsHintTitle}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {copy.controlsHintBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      }
      visualization={
        <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-violet-100">{copy.visualization.plainTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label={copy.stats.plainDistance} value={formatValue(analysis.finalPlainDistance)} accent />
                <StatCard label={copy.stats.plainNorm} value={formatValue(analysis.layers.at(-1)?.plainNorm ?? 0)} />
              </div>
              <p className="mt-3 text-sm text-violet-50">{presetCopy.plainInterpretation}</p>
            </section>

            <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{copy.visualization.residualTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label={copy.stats.residualDistance} value={formatValue(analysis.finalResidualDistance)} accent />
                <StatCard label={copy.stats.residualNorm} value={formatValue(analysis.layers.at(-1)?.residualNorm ?? 0)} />
              </div>
              <p className="mt-3 text-sm text-cyan-50">{presetCopy.residualInterpretation}</p>
            </section>
          </div>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label={copy.visualization.featureAriaLabel}>
            {analysis.features.map((feature) => (
              <FeatureRow
                key={feature.label}
                label={feature.label}
                input={feature.input}
                plain={feature.plain}
                residual={feature.residual}
                inputLabel={copy.visualization.inputLabel}
                plainLabel={copy.visualization.plainLabel}
                residualLabel={copy.visualization.residualLabel}
              />
            ))}
          </section>
        </div>
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.preservationGain} value={copy.stats.preservationGainValue(analysis.preservationGain)} accent />
            <StatCard label={copy.stats.residualDeltaNorm} value={formatValue(analysis.residualDeltaNorm)} />
            <StatCard label={copy.stats.depth} value={String(depth)} />
          </div>

          <div>
            <p className="font-semibold text-white">{copy.layerTraceTitle}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {analysis.layers.map((layer) => (
                <div key={layer.layerIndex} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.layerLabel(layer.layerIndex)}</p>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-violet-200">{copy.visualization.plainLabel}</p>
                      <p className="text-lg font-semibold text-white">{formatValue(layer.plainDistanceToInput)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{copy.visualization.residualLabel}</p>
                      <p className="text-lg font-semibold text-white">{formatValue(layer.residualDistanceToInput)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-white">{copy.readingGuideTitle}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {copy.readingGuideBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-50">
            <p className="font-semibold text-white">{copy.bridgeTitle}</p>
            <p>{copy.bridgeDescription(depth, analysis.preservationGain)}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
