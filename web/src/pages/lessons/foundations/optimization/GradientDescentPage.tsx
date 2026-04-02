import { ActionButton } from '../../../../components/form/ActionButton'
import { Control } from '../../../../components/form/Control'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import { useI18n } from '../../../../app/i18n-context'
import { getAdjacentLessons } from '../../../../content/learningPath'
import { gradientDescentDomain } from '../../../../features/optimization/lib/gradientDescent'
import { useGradientDescentTrajectory } from '../../../../features/optimization/hooks/useGradientDescentTrajectory'
import { GradientVisualizationChart } from '../../../../features/optimization/components/GradientVisualizationChart'
import { StatCard } from '../../../../components/visualization'

export function GradientDescentPage() {
  const { locale, messages } = useI18n()
  const copy = messages.optimization.gradientDescentPage
  const lessonSequence = getAdjacentLessons('gradient-descent-intuition', locale)

  const {
    trajectory,
    learningRate,
    setLearningRate,
    startParameter,
    setStartParameter,
    isAutoplaying,
    setIsAutoplaying,
    current,
    nextStep,
    canStep,
    trajectorySummary,
    maxSteps,
    resetTrajectory,
    handleStep,
    handlePreset,
  } = useGradientDescentTrajectory()

  const regimeCopy = copy.regimes[trajectorySummary.regime]

  return (
    <LearningPageLayout
      lessonId="gradient-descent-intuition"
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      objective={<LessonObjectiveCard objective={copy.objective} />}
      preface={<CoreIdeaCard description={copy.coreIdeaDescription} bullets={copy.coreIdeaBullets} />}
      controls={
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">{copy.presetLabel}</p>
            <div className="grid gap-2">
              {copy.presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePreset(preset.learningRate)}
                  className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                    Math.abs(learningRate - preset.learningRate) < 0.001
                      ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
                      : 'border-white/10 bg-slate-950/30 text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className="block font-medium text-white">{preset.label}</span>
                  <span className="block text-slate-300">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <Control
            label={copy.controlLabels.learningRate}
            value={learningRate}
            min={0.05}
            max={0.75}
            step={0.05}
            onChange={(value) => {
              setLearningRate(value)
              resetTrajectory(startParameter)
            }}
          />
          <Control
            label={copy.controlLabels.startParameter}
            value={startParameter}
            min={gradientDescentDomain.min}
            max={0.4}
            step={0.1}
            onChange={(value) => {
              setStartParameter(value)
              resetTrajectory(value)
            }}
          />

          <div className="grid gap-2 sm:grid-cols-3">
            <ActionButton label={copy.actions.step} onClick={handleStep} disabled={!canStep} accent />
            <ActionButton
              label={isAutoplaying ? copy.actions.pause : copy.actions.autoplay}
              onClick={() => setIsAutoplaying((value) => !value)}
              disabled={!canStep}
            />
            <ActionButton label={copy.actions.reset} onClick={() => resetTrajectory()} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">{copy.updateTitle}</p>
            <p className="mt-2 font-mono text-cyan-300">
              w ← {current.parameter.toFixed(2)} - {learningRate.toFixed(2)} × ({nextStep.gradient.toFixed(2)})
            </p>
            <p className="mt-2">{copy.updateDescription}</p>
          </div>
        </div>
      }
      visualization={<GradientVisualizationChart trajectory={trajectory} currentParameter={current.parameter} />}
      interpretation={
        <div className="space-y-5 text-sm leading-7 text-slate-300">
          <div className="grid gap-3 sm:grid-cols-4">
            <StatCard label={copy.stats.step} value={`${trajectory.length - 1}/${maxSteps}`} accent />
            <StatCard label={copy.stats.loss} value={current.loss.toFixed(3)} />
            <StatCard label={copy.stats.gradient} value={current.gradient.toFixed(3)} />
            <StatCard label={copy.stats.regime} value={regimeCopy.label} />
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
            <p>{copy.bridgeDescription}</p>
          </div>
        </div>
      }
      exploration={<ObservationPromptsCard prompts={copy.prompts} />}
      navigation={<LessonNavigation previousLesson={lessonSequence.previous} nextLesson={lessonSequence.next} />}
    />
  )
}
