import { useMemo, useState } from 'react'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import {
  CoreIdeaCard,
  LessonNavigation,
  LessonObjectiveCard,
  ObservationPromptsCard,
} from '../../../../components/learning/LessonPrimitives'
import { getAdjacentLessons } from '../../../../content/learningPath'
import { useI18n } from '../../../../app/i18n-context'
import { NeuronDiagram } from '../../../../features/perceptron/components/NeuronDiagram'
import {
  computeBinaryOutput,
  computeWeightedSum,
} from '../../../../features/perceptron/lib/perceptronMath'

export function WeightedSumPage() {
  const { locale } = useI18n()
  const lessonSequence = getAdjacentLessons('perceptron-weighted-sum', locale)
  const [x1, setX1] = useState(1)
  const [x2, setX2] = useState(0.5)
  const [w1, setW1] = useState(0.8)
  const [w2, setW2] = useState(-0.2)
  const [bias, setBias] = useState(-0.1)

  const sum = useMemo(() => computeWeightedSum({ x1, x2, w1, w2, bias }), [x1, x2, w1, w2, bias])
  const output = useMemo(() => computeBinaryOutput(sum), [sum])

  return (
    <LearningPageLayout
      eyebrow="Architectural mechanics · Perceptron"
      title="Weighted sum and bias"
      description="A perceptron combines its inputs using weights, then shifts the result with a bias. This is the basic scoring step before any threshold or activation decides the final output."
      objective={
        <LessonObjectiveCard objective="How do weights and bias turn the same inputs into a higher or lower perceptron score?" />
      }
      preface={
        <CoreIdeaCard
          description="The perceptron does not decide in one jump. It first builds a score from weighted inputs, then compares that score with a threshold. This page isolates the scoring step so you can see exactly which parameter is pushing the result up or down."
          bullets={[
            'Each weight controls how strongly its input contributes to the score.',
            'The bias shifts the score even when the inputs stay fixed.',
            'Crossing zero changes the binary output, so small numeric changes can matter.',
          ]}
        />
      }
      controls={
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Adjust the perceptron ingredients</p>
            <p className="text-sm leading-6 text-slate-300">
              Move one control at a time when possible so the cause-and-effect stays easy to track.
            </p>
          </div>
          <Control label="Input x₁" value={x1} onChange={setX1} min={-2} max={2} step={0.1} />
          <Control label="Input x₂" value={x2} onChange={setX2} min={-2} max={2} step={0.1} />
          <Control label="Weight w₁" value={w1} onChange={setW1} min={-2} max={2} step={0.1} />
          <Control label="Weight w₂" value={w2} onChange={setW2} min={-2} max={2} step={0.1} />
          <Control label="Bias b" value={bias} onChange={setBias} min={-2} max={2} step={0.1} />
        </div>
      }
      visualization={<NeuronDiagram x1={x1} x2={x2} w1={w1} w2={w2} bias={bias} sum={sum} output={output} />}
      interpretation={
        <div className="space-y-4 text-sm leading-7 text-slate-300">
          <div>
            <p className="font-semibold text-white">Current computation</p>
            <p>
              ({x1.toFixed(2)} × {w1.toFixed(2)}) + ({x2.toFixed(2)} × {w2.toFixed(2)}) + {bias.toFixed(2)} ={' '}
              <span className="font-semibold text-cyan-300">{sum.toFixed(2)}</span>
            </p>
          </div>

          <div>
            <p className="font-semibold text-white">What to notice</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Positive weights push the sum upward when their input increases.</li>
              <li>Negative weights pull the sum downward when their input increases.</li>
              <li>The bias shifts the final score even if the inputs stay fixed.</li>
              <li>Once the sum crosses zero, the binary output flips from 0 to 1.</li>
            </ul>
          </div>
        </div>
      }
      exploration={
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <ObservationPromptsCard
            prompts={[
              'Increase only one positive weight. Which visual connection becomes more influential, and how quickly does the score move?',
              'Hold the inputs fixed and drag the bias. When does the score cross zero and flip the output?',
              'Make both weights very small. What part of the computation now dominates the decision?',
            ]}
          />

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-sm leading-7 text-cyan-50">
            <p className="font-semibold text-white">Try this</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Set both inputs positive, then flip one weight from positive to negative.</li>
              <li>Keep weights fixed and move only the bias to see how the threshold shifts.</li>
              <li>Try making both weights near zero and observe how much the bias dominates.</li>
            </ul>
          </div>
        </div>
      }
      navigation={
        <LessonNavigation
          previousLesson={lessonSequence.previous}
          nextLesson={lessonSequence.next}
        />
      }
    />
  )
}

type ControlProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}

function Control({ label, value, onChange, min, max, step }: ControlProps) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-200">
        <span>{label}</span>
        <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-cyan-300">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-400"
      />
    </label>
  )
}
