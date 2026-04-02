import { useMemo, useState } from 'react'
import { ActionButton } from '../../../../components/form/ActionButton'
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
import { ConvolutionVisualization } from '../../../../features/cnn/components/ConvolutionVisualization'
import {
  applyValidConvolution,
  cloneGrid,
  convolutionPresets,
  cycleKernelCell,
  getFeatureSummary,
  toggleBinaryCell,
  type ConvolutionPresetId,
} from '../../../../features/cnn/lib/convolution'

const defaultPreset = convolutionPresets[0]

export function LocalPatternPage() {
  const { locale, messages } = useI18n()
  const copy = messages.cnn.localPatternPage
  const lessonSequence = getAdjacentLessons('cnn-local-patterns', locale)
  const [presetId, setPresetId] = useState<ConvolutionPresetId>(defaultPreset.id)
  const [input, setInput] = useState(() => cloneGrid(defaultPreset.input))
  const [kernel, setKernel] = useState(() => cloneGrid(defaultPreset.kernel))

  const featureMap = useMemo(() => applyValidConvolution(input, kernel), [input, kernel])
  const [selectedFeatureId, setSelectedFeatureId] = useState(featureMap[0]?.id ?? '0-0')

  const selectedPreset = convolutionPresets.find((candidate) => candidate.id === presetId) ?? defaultPreset
  const summary = getFeatureSummary(featureMap)
  const strongestMessage = copy.presetOptions[selectedPreset.id]
  const polarityLabel =
    summary.strongest.value > 0
      ? copy.polarity.positive
      : summary.strongest.value < 0
        ? copy.polarity.negative
        : copy.polarity.neutral

  function applyPreset(nextPresetId: ConvolutionPresetId) {
    const preset = convolutionPresets.find((candidate) => candidate.id === nextPresetId) ?? defaultPreset
    setPresetId(preset.id)
    setInput(cloneGrid(preset.input))
    setKernel(cloneGrid(preset.kernel))
    setSelectedFeatureId('0-0')
  }

  return (
    <LearningPageLayout
      lessonId="cnn-local-patterns"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.presetTitle}</legend>
            <div className="space-y-2">
              {convolutionPresets.map((preset) => {
                const presetCopy = copy.presetOptions[preset.id]

                return (
                  <label
                    key={preset.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                      preset.id === presetId
                        ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                        : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cnn-preset"
                      value={preset.id}
                      checked={preset.id === presetId}
                      onChange={() => applyPreset(preset.id)}
                      className="mt-1 accent-cyan-400"
                    />
                    <span>
                      <span className="block font-medium text-white">{presetCopy.label}</span>
                      <span className="block text-slate-300">{presetCopy.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="grid gap-2 sm:grid-cols-2">
            <ActionButton label={copy.actions.resetPreset} onClick={() => applyPreset(presetId)} accent />
            <ActionButton
              label={copy.actions.clearKernel}
              onClick={() => setKernel(kernel.map((row) => row.map(() => 0)))}
            />
          </div>

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
        <ConvolutionVisualization
          input={input}
          kernel={kernel}
          featureMap={featureMap}
          selectedFeatureId={selectedFeatureId}
          onSelectFeature={setSelectedFeatureId}
          onToggleInput={(row, col) => setInput((current) => toggleBinaryCell(current, row, col))}
          onCycleKernel={(row, col) => setKernel((current) => cycleKernelCell(current, row, col))}
        />
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.strongestCell} value={`r${summary.strongest.row + 1} c${summary.strongest.col + 1}`} accent />
            <StatCard label={copy.stats.strongestValue} value={summary.strongest.value.toFixed(0)} />
            <StatCard label={copy.stats.polarity} value={polarityLabel} />
          </div>

          <div>
            <p className="font-semibold text-white">{copy.interpretationTitle}</p>
            <p>{strongestMessage.interpretation}</p>
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
            <p>{copy.bridgeDescription(summary.positiveCount, summary.negativeCount)}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
