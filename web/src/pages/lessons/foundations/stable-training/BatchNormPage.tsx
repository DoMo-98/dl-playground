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
  analyzeBatchNorm,
  batchNormModes,
  batchNormPresets,
  type BatchNormMode,
  type BatchNormPreset,
} from '../../../../features/normalization/lib/batchNorm'

function formatValue(value: number) {
  return value.toFixed(2)
}

function SignalRow({ label, raw, output, outputLabel }: { label: string; raw: number; output: number; outputLabel: string }) {
  const rawWidth = `${Math.min(100, Math.abs(raw) * 20)}%`
  const outputWidth = `${Math.min(100, Math.abs(output) * 20)}%`

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
        <p className="font-medium text-white">{label}</p>
        <p>{formatValue(raw)} → {formatValue(output)}</p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span>Raw activation</span>
            <span>{formatValue(raw)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className={`h-2 rounded-full ${raw >= 0 ? 'bg-amber-300' : 'bg-rose-300'}`} style={{ width: rawWidth }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span>{outputLabel}</span>
            <span>{formatValue(output)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className={`h-2 rounded-full ${output >= 0 ? 'bg-cyan-300' : 'bg-violet-300'}`} style={{ width: outputWidth }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function BatchNormPage() {
  const { locale, messages } = useI18n()
  const copy = messages.stableTraining.batchNormPage
  const lessonSequence = getAdjacentLessons('normalization-batchnorm-intuition', locale)
  const [preset, setPreset] = useState<BatchNormPreset>('shifted')
  const [mode, setMode] = useState<BatchNormMode>('train')

  const analysis = useMemo(() => analyzeBatchNorm(preset, mode), [preset, mode])
  const modeCopy = copy.modeOptions[mode]
  const presetCopy = copy.presetOptions[preset]

  return (
    <LearningPageLayout
      lessonId="normalization-batchnorm-intuition"
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
              {batchNormPresets.map((option) => (
                <OptionCard
                  key={option}
                  name="batch-preset"
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
            <legend className="text-sm font-semibold text-white">{copy.modeTitle}</legend>
            <div className="grid gap-2">
              {batchNormModes.map((option) => (
                <OptionCard
                  key={option}
                  name="batchnorm-mode"
                  value={option}
                  selected={mode === option}
                  onChange={() => setMode(option)}
                >
                  <span>
                    <span className="block font-medium text-white">{copy.modeOptions[option].label}</span>
                    <span className="block text-slate-300">{copy.modeOptions[option].description}</span>
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
              <p className="text-xs uppercase tracking-[0.18em] text-amber-100">{copy.visualization.batchStatsTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label={copy.stats.batchMean} value={formatValue(analysis.batchStats.mean)} accent />
                <StatCard label={copy.stats.batchStd} value={formatValue(analysis.batchStats.std)} />
              </div>
              <p className="mt-3 text-sm text-amber-50">{presetCopy.interpretation}</p>
            </section>

            <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{copy.visualization.outputStatsTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <StatCard label={copy.stats.outputMean} value={formatValue(analysis.outputStats.mean)} accent />
                <StatCard label={copy.stats.outputStd} value={formatValue(analysis.outputStats.std)} />
              </div>
              <p className="mt-3 text-sm text-cyan-50">{modeCopy.interpretation}</p>
            </section>
          </div>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" aria-label={copy.visualization.ariaLabel}>
            {analysis.samples.map((sample) => (
              <SignalRow
                key={sample.index}
                label={copy.visualization.sampleLabel(sample.index)}
                raw={sample.raw}
                output={sample.output}
                outputLabel={mode === 'none' ? copy.visualization.outputLabels.none : copy.visualization.outputLabels.normalized}
              />
            ))}
          </section>
        </div>
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-4">
            <StatCard label={copy.stats.runningMean} value={formatValue(analysis.runningStats.mean)} accent />
            <StatCard label={copy.stats.runningStd} value={formatValue(analysis.runningStats.std)} />
            <StatCard label={copy.stats.meanShift} value={formatValue(analysis.meanShift)} />
            <StatCard label={copy.stats.range} value={`${formatValue(analysis.outputRange.min)} to ${formatValue(analysis.outputRange.max)}`} />
          </div>

          <div>
            <p className="font-semibold text-white">{copy.readingGuideTitle}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {copy.readingGuideBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-violet-50">
            <p className="font-semibold text-white">{copy.bridgeTitle}</p>
            <p>{copy.bridgeDescription(mode, analysis.batchStats.mean, analysis.outputStats.mean)}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
