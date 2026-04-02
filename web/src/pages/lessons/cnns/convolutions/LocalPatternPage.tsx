import { useMemo, useReducer } from 'react'
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
  makeFeatureId,
  toggleBinaryCell,
  type ConvolutionPreset,
  type ConvolutionPresetId,
} from '../../../../features/cnn/lib/convolution'

const defaultPreset = convolutionPresets[0]

type ConvolutionState = {
  presetId: ConvolutionPresetId
  input: number[][]
  kernel: number[][]
  selectedFeatureId: string
}

type ConvolutionAction =
  | { type: 'apply-preset'; presetId: ConvolutionPresetId }
  | { type: 'toggle-input'; row: number; col: number }
  | { type: 'cycle-kernel'; row: number; col: number }
  | { type: 'select-feature'; featureId: string }
  | { type: 'clear-kernel' }

function convolutionReducer(state: ConvolutionState, action: ConvolutionAction): ConvolutionState {
  switch (action.type) {
    case 'apply-preset': {
      const preset = convolutionPresets.find((candidate) => candidate.id === action.presetId) ?? defaultPreset
      return {
        presetId: preset.id,
        input: cloneGrid(preset.input),
        kernel: cloneGrid(preset.kernel),
        selectedFeatureId: makeFeatureId(0, 0),
      }
    }
    case 'toggle-input':
      return { ...state, input: toggleBinaryCell(state.input, action.row, action.col) }
    case 'cycle-kernel':
      return { ...state, kernel: cycleKernelCell(state.kernel, action.row, action.col) }
    case 'select-feature':
      return { ...state, selectedFeatureId: action.featureId }
    case 'clear-kernel':
      return { ...state, kernel: state.kernel.map((row) => row.map(() => 0)) }
  }
}

function createInitialState(): ConvolutionState {
  return {
    presetId: defaultPreset.id,
    input: cloneGrid(defaultPreset.input),
    kernel: cloneGrid(defaultPreset.kernel),
    selectedFeatureId: makeFeatureId(0, 0),
  }
}

function PresetRadioGroup({
  presets,
  selectedId,
  presetOptions,
  onSelect,
}: {
  presets: ConvolutionPreset[]
  selectedId: ConvolutionPresetId
  presetOptions: Record<ConvolutionPresetId, { label: string; description: string }>
  onSelect: (id: ConvolutionPresetId) => void
}) {
  return (
    <div className="space-y-2">
      {presets.map((preset) => {
        const presetCopy = presetOptions[preset.id]

        return (
          <label
            key={preset.id}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
              preset.id === selectedId
                ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              name="cnn-preset"
              value={preset.id}
              checked={preset.id === selectedId}
              onChange={() => onSelect(preset.id)}
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
  )
}

export function LocalPatternPage() {
  const { locale, messages } = useI18n()
  const copy = messages.cnn.localPatternPage
  const lessonSequence = getAdjacentLessons('cnn-local-patterns', locale)
  const [state, dispatch] = useReducer(convolutionReducer, undefined, createInitialState)

  const featureMap = useMemo(() => applyValidConvolution(state.input, state.kernel), [state.input, state.kernel])

  const selectedPreset = convolutionPresets.find((candidate) => candidate.id === state.presetId) ?? defaultPreset
  const summary = getFeatureSummary(featureMap)
  const strongestMessage = copy.presetOptions[selectedPreset.id]
  const polarityLabel =
    summary.strongest.value > 0
      ? copy.polarity.positive
      : summary.strongest.value < 0
        ? copy.polarity.negative
        : copy.polarity.neutral

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
            <PresetRadioGroup
              presets={convolutionPresets}
              selectedId={state.presetId}
              presetOptions={copy.presetOptions}
              onSelect={(id) => dispatch({ type: 'apply-preset', presetId: id })}
            />
          </fieldset>

          <div className="grid gap-2 sm:grid-cols-2">
            <ActionButton label={copy.actions.resetPreset} onClick={() => dispatch({ type: 'apply-preset', presetId: state.presetId })} accent />
            <ActionButton
              label={copy.actions.clearKernel}
              onClick={() => dispatch({ type: 'clear-kernel' })}
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
          input={state.input}
          kernel={state.kernel}
          featureMap={featureMap}
          selectedFeatureId={state.selectedFeatureId}
          onSelectFeature={(featureId) => dispatch({ type: 'select-feature', featureId })}
          onToggleInput={(row, col) => dispatch({ type: 'toggle-input', row, col })}
          onCycleKernel={(row, col) => dispatch({ type: 'cycle-kernel', row, col })}
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
