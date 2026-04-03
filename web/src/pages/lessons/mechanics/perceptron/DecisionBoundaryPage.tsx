import { useMemo, useState } from 'react'
import { Control } from '../../../../components/form/Control'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import {
  decisionBoundaryDatasets,
  describeDecisionBoundary,
  summarizeDataset,
} from '../../../../features/perceptron/lib/decisionBoundary'
import { DecisionBoundaryVisualization } from '../../../../features/perceptron/components/DecisionBoundaryVisualization'
import { getAdjacentLessons } from '../../../../content/learningPath'
import { useI18n } from '../../../../app/i18n-context'
import { StatCard } from '../../../../components/visualization'
import { OptionCard } from '../../../../components/form/OptionCard'

export function DecisionBoundaryPage() {
  const { locale, messages } = useI18n()
  const copy = messages.perceptron.decisionBoundaryPage
  const lessonSequence = getAdjacentLessons('perceptron-decision-boundary', locale)
  const [datasetId, setDatasetId] = useState(decisionBoundaryDatasets[0].id)
  const [w1, setW1] = useState(1)
  const [w2, setW2] = useState(1)
  const [bias, setBias] = useState(0)

  const dataset = decisionBoundaryDatasets.find((candidate) => candidate.id === datasetId) ?? decisionBoundaryDatasets[0]
  const boundary = useMemo(() => describeDecisionBoundary({ w1, w2, bias }), [w1, w2, bias])
  const summary = useMemo(() => summarizeDataset(dataset, { w1, w2, bias }), [dataset, w1, w2, bias])
  const datasetName = copy.datasetNames[dataset.id as keyof typeof copy.datasetNames]
  const datasetDescription = copy.datasetDescriptions[dataset.id as keyof typeof copy.datasetDescriptions]
  const datasetNote = copy.datasetNotes[dataset.id as keyof typeof copy.datasetNotes] ?? dataset.note

  return (
    <LearningPageLayout
      lessonId="perceptron-decision-boundary"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-white">{copy.preparedDataset}</legend>
            <div className="space-y-2">
              {decisionBoundaryDatasets.map((candidate) => {
                const candidateName = copy.datasetNames[candidate.id as keyof typeof copy.datasetNames]
                const candidateDescription = copy.datasetDescriptions[candidate.id as keyof typeof copy.datasetDescriptions]

                return (
                  <OptionCard
                    key={candidate.id}
                    name="dataset"
                    value={candidate.id}
                    selected={candidate.id === dataset.id}
                    onChange={() => setDatasetId(candidate.id)}
                  >
                    <span>
                      <span className="block font-medium text-white">{candidateName}</span>
                      <span className="block text-slate-300">{candidateDescription}</span>
                    </span>
                  </OptionCard>
                )
              })}
            </div>
          </fieldset>

          <Control label={copy.controlLabels.w1} value={w1} onChange={setW1} min={-2} max={2} step={0.1} />
          <Control label={copy.controlLabels.w2} value={w2} onChange={setW2} min={-2} max={2} step={0.1} />
          <Control label={copy.controlLabels.bias} value={bias} onChange={setBias} min={-2} max={2} step={0.1} />
        </div>
      }
      visualization={
        <DecisionBoundaryVisualization
          summary={summary}
          boundary={boundary}
          datasetName={datasetName}
          weights={{ w1, w2, bias }}
        />
      }
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label={copy.stats.correct} value={`${summary.correctCount} / ${dataset.points.length}`} />
            <StatCard label={copy.stats.mismatched} value={String(summary.incorrectCount)} />
            <StatCard label={copy.stats.equation} value={boundary.equation} accent />
          </div>

          <div>
            <p className="font-semibold text-white">{copy.movementTitle}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {copy.movementBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <p className="font-semibold text-white">{datasetName}</p>
            <p>{datasetDescription}</p>
          </div>

          {datasetNote ? (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-amber-50">
              <p className="font-semibold text-white">{copy.presetNoteTitle}</p>
              <p>{datasetNote}</p>
            </div>
          ) : null}
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}

