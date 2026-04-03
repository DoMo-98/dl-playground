import { useMemo, useState } from 'react'
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
  activationModes,
  analyzeInitialization,
  initializationModes,
  type ActivationMode,
  type InitializationMode,
} from '../../../../features/initialization/lib/initialization'

function Meter({ label, value, tone }: { label: string; value: number; tone: 'cyan' | 'amber' | 'rose' }) {
  const width = `${Math.min(100, value * 35)}%`
  const toneClass = tone === 'cyan' ? 'bg-cyan-400' : tone === 'amber' ? 'bg-amber-400' : 'bg-rose-400'

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{label}</span>
        <span>{value.toFixed(2)}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className={`h-2 rounded-full ${toneClass}`} style={{ width }} />
      </div>
    </div>
  )
}

export function InitializationPage() {
  const { locale, messages } = useI18n()
  const copy = messages.stableTraining.initializationPage
  const lessonSequence = getAdjacentLessons('initialization-bad-vs-stable', locale)
  const [mode, setMode] = useState<InitializationMode>('he')
  const [activation, setActivation] = useState<ActivationMode>('relu')

  const analysis = useMemo(() => analyzeInitialization(mode, activation), [mode, activation])
  const regimeCopy = copy.regimes[analysis.regime]

  return (
    <LearningPageLayout
      lessonId="initialization-bad-vs-stable"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.initializationTitle}</legend>
            <div className="grid gap-2">
              {initializationModes.map((option) => {
                const optionCopy = copy.initializationOptions[option]
                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                      mode === option
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                        : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="init-mode"
                      value={option}
                      checked={mode === option}
                      onChange={() => setMode(option)}
                      className="mt-1 accent-cyan-400"
                    />
                    <span>
                      <span className="block font-medium text-white">{optionCopy.label}</span>
                      <span className="block text-slate-300">{optionCopy.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.activationTitle}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {activationModes.map((option) => {
                const optionCopy = copy.activationOptions[option]
                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                      activation === option
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                        : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="activation-mode"
                      value={option}
                      checked={activation === option}
                      onChange={() => setActivation(option)}
                      className="mt-1 accent-cyan-400"
                    />
                    <span>
                      <span className="block font-medium text-white">{optionCopy.label}</span>
                      <span className="block text-slate-300">{optionCopy.description}</span>
                    </span>
                  </label>
                )
              })}
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
          {analysis.layerSummaries.map((summary) => (
            <section key={summary.layerIndex} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{copy.layerLabel(summary.layerIndex)}</p>
                  <p className="text-sm text-slate-300">{copy.layerDescription(summary.layerIndex)}</p>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{copy.zeroFractionLabel(summary.zeroFraction)}</div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{copy.activationCardTitle}</p>
                  <div className="mt-4 space-y-4">
                    <Meter label={copy.meterLabels.activationStd} value={summary.activationStd} tone="cyan" />
                    <Meter label={copy.meterLabels.activationMeanAbs} value={summary.activationMeanAbs} tone="amber" />
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-rose-100">{copy.gradientCardTitle}</p>
                  <div className="mt-4 space-y-4">
                    <Meter label={copy.meterLabels.gradientStd} value={summary.gradientStd} tone="rose" />
                    <Meter label={copy.meterLabels.gradientMeanAbs} value={summary.gradientMeanAbs} tone="amber" />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.regime} value={regimeCopy.label} accent />
            <StatCard label={copy.stats.finalActivationStd} value={analysis.finalActivationStd.toFixed(2)} />
            <StatCard label={copy.stats.firstLayerGradientStd} value={analysis.finalGradientStd.toFixed(2)} />
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
            <p>{copy.bridgeDescription(mode, activation)}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
