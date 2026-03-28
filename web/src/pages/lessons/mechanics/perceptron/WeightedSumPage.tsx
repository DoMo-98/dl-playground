import { useMemo, useState } from 'react'
import { LearningPageLayout } from '../../../../components/learning/LearningPageLayout'
import { NeuronDiagram } from '../../../../features/perceptron/components/NeuronDiagram'
import {
  computeBinaryOutput,
  computeWeightedSum,
} from '../../../../features/perceptron/lib/perceptronMath'

export function WeightedSumPage() {
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
      controls={
        <div className="space-y-6">
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
        <div className="space-y-3 text-sm leading-7 text-cyan-50">
          <p className="font-semibold text-white">Try this</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Set both inputs positive, then flip one weight from positive to negative.</li>
            <li>Keep weights fixed and move only the bias to see how the threshold shifts.</li>
            <li>Try making both weights near zero and observe how much the bias dominates.</li>
          </ul>
        </div>
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
