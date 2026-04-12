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
  analyzeLayerNorm,
  layerNormContexts,
  layerNormPresets,
  type LayerNormContext,
  type LayerNormPreset,
} from '../../../../features/normalization/lib/layerNorm'

function formatValue(value: number) {
  return value.toFixed(2)
}

function FeatureRow({
  label,
  raw,
  batchNorm,
  layerNorm,
  rawLabel,
  batchNormLabel,
  layerNormLabel,
}: {
  label: string
  raw: number
  batchNorm: number
  layerNorm: number
  rawLabel: string
  batchNormLabel: string
  layerNormLabel: string
}) {
  const toWidth = (value: number) => `${Math.min(100, Math.abs(value) * 22)}%`

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
        <p className="font-medium text-white">{label}</p>
        <p>{formatValue(raw)} / {formatValue(batchNorm)} / {formatValue(layerNorm)}</p>
      </div>

      <div className="space-y-3">
        {[
          { value: raw, label: rawLabel, tone: raw >= 0 ? 'bg-amber-300' : 'bg-rose-300' },
          { value: batchNorm, label: batchNormLabel, tone: batchNorm >= 0 ? 'bg-cyan-300' : 'bg-violet-300' },
          { value: layerNorm, label: layerNormLabel, tone: layerNorm >= 0 ? 'bg-emerald-300' : 'bg-fuchsia-300' },
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

export function LayerNormPage() {
  const { locale, messages } = useI18n()
  const copy = messages.stableTraining.layerNormPage
  const lessonSequence = getAdjacentLessons('normalization-layernorm-intuition', locale)
  const [preset, setPreset] = useState<LayerNormPreset>('shifted')
  const [context, setContext] = useState<LayerNormContext>('steady-peers')

  const analysis = useMemo(() => analyzeLayerNorm(preset, context), [preset, context])
  const presetCopy = copy.presetOptions[preset]
  const contextCopy = copy.contextOptions[context]
  const focusSample = analysis.samples[analysis.focusIndex]

  return (
    <LearningPageLayout
      lessonId="normalization-layernorm-intuition"
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
              {layerNormPresets.map((option) => (
                <OptionCard
                  key={option}
                  name="layernorm-preset"
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
            <legend className="text-sm font-semibold text-white">{copy.contextTitle}</legend>
            <div className="grid gap-2">
              {layerNormContexts.map((option) => (
                <OptionCard
                  key={option}
                  name="layernorm-context"
                  value={option}
                  selected={context === option}
                  onChange={() => setContext(option)}
                >
                  <span>
                    <span className="block font-medium text-white">{copy.contextOptions[option].label}</span>
                    <span className="block text-slate-300">{copy.contextOptions[option].description}</span>
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
            <section className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-100">{copy.visualization.focusTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label={copy.stats.rawMean} value={formatValue(analysis.focusRawStats.mean)} accent />
                <StatCard label={copy.stats.rawStd} value={formatValue(analysis.focusRawStats.std)} />
              </div>
              <p className="mt-3 text-sm text-amber-50">{presetCopy.interpretation}</p>
            </section>

            <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{copy.visualization.peerTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label={copy.stats.batchVsLayerGap} value={formatValue(analysis.focusBatchVsLayerMaxGap)} accent />
                <StatCard label={copy.stats.layerMean} value={formatValue(analysis.focusLayerNormStats.mean)} />
              </div>
              <p className="mt-3 text-sm text-cyan-50">{contextCopy.interpretation}</p>
            </section>
          </div>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" aria-label={copy.visualization.ariaLabel}>
            {analysis.featureLabels.map((featureLabel, index) => (
              <FeatureRow
                key={featureLabel}
                label={featureLabel}
                raw={focusSample.raw[index]}
                batchNorm={focusSample.batchNorm[index]}
                layerNorm={focusSample.layerNorm[index]}
                rawLabel={copy.visualization.rawLabel}
                batchNormLabel={copy.visualization.batchNormLabel}
                layerNormLabel={copy.visualization.layerNormLabel}
              />
            ))}
          </section>
        </div>
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-4">
            <StatCard label={copy.stats.batchMean} value={formatValue(analysis.focusBatchNormStats.mean)} accent />
            <StatCard label={copy.stats.batchStd} value={formatValue(analysis.focusBatchNormStats.std)} />
            <StatCard label={copy.stats.layerMean} value={formatValue(analysis.focusLayerNormStats.mean)} />
            <StatCard label={copy.stats.layerStd} value={formatValue(analysis.focusLayerNormStats.std)} />
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
            <p>{copy.bridgeDescription(context, analysis.focusBatchVsLayerMaxGap)}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
