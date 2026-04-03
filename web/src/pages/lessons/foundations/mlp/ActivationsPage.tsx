import { useMemo, useState } from 'react'
import { Control } from '../../../../components/form/Control'
import { OptionCard } from '../../../../components/form/OptionCard'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import { getAdjacentLessons } from '../../../../content/learningPath'
import { useI18n } from '../../../../app/i18n-context'
import {
  activationKinds,
  createCurveSamples,
  summarizeCurveBehavior,
  type ActivationKind,
} from '../../../../features/mlp/lib/nonlinearity'
import { StatCard } from '../../../../components/visualization'
import { ActivationVisualization } from '../../../../features/mlp/components/ActivationVisualization'

export function ActivationsPage() {
  const { locale, messages } = useI18n()
  const copy = messages.mlp.activationsPage
  const lessonSequence = getAdjacentLessons('mlp-activations', locale)
  const [activation, setActivation] = useState<ActivationKind>('linear')
  const [hiddenScale, setHiddenScale] = useState(1.2)
  const [outputScale, setOutputScale] = useState(1)

  const samples = useMemo(() => createCurveSamples(activation, { hiddenScale, outputScale }), [activation, hiddenScale, outputScale])
  const summary = useMemo(() => summarizeCurveBehavior(activation, { hiddenScale, outputScale }), [activation, hiddenScale, outputScale])
  const activationCopy = copy.activationOptions[activation]

  return (
    <LearningPageLayout
      lessonId="mlp-activations"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.activationLabel}</legend>
            <div className="space-y-2">
              {activationKinds.map((candidate) => {
                const candidateCopy = copy.activationOptions[candidate]

                return (
                  <OptionCard
                    key={candidate}
                    name="activation"
                    value={candidate}
                    selected={candidate === activation}
                    onChange={() => setActivation(candidate)}
                  >
                    <span>
                      <span className="block font-medium text-white">{candidateCopy.label}</span>
                      <span className="block text-slate-300">{candidateCopy.description}</span>
                    </span>
                  </OptionCard>
                )
              })}
            </div>
          </fieldset>

          <Control label={copy.controlLabels.hiddenScale} value={hiddenScale} onChange={setHiddenScale} min={0.4} max={2.4} step={0.1} />
          <Control label={copy.controlLabels.outputScale} value={outputScale} onChange={setOutputScale} min={0.4} max={1.8} step={0.1} />
        </div>
      }
      visualization={<ActivationVisualization samples={samples} activationLabel={activationCopy.label} />}
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.behavior} value={copy.shapeLabels[summary.shape as keyof typeof copy.shapeLabels]} accent />
            <StatCard label={copy.stats.outputRange} value={`${summary.minOutput.toFixed(2)} → ${summary.maxOutput.toFixed(2)}`} />
            <StatCard label={copy.stats.centerValue} value={summary.middleOutput.toFixed(2)} />
          </div>

          <div>
            <p className="font-semibold text-white">{activationCopy.interpretationTitle}</p>
            <p>{activationCopy.interpretation}</p>
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
            <p className="font-semibold text-white">{copy.xorBridgeTitle}</p>
            <p>{copy.xorBridgeDescription}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
