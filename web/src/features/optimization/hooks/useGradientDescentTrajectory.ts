import { useEffect, useMemo, useState } from 'react'
import {
  describeState,
  summarizeTrajectory,
  takeGradientDescentStep,
  type GradientDescentState,
} from '../lib/gradientDescent'

const DEFAULT_PARAMETER = -1.8
const DEFAULT_LEARNING_RATE = 0.15
const MAX_STEPS = 8
const AUTOPLAY_DELAY_MS = 950

export function useGradientDescentTrajectory() {
  const [learningRate, setLearningRate] = useState(DEFAULT_LEARNING_RATE)
  const [startParameter, setStartParameter] = useState(DEFAULT_PARAMETER)
  const [trajectory, setTrajectory] = useState<GradientDescentState[]>([describeState(DEFAULT_PARAMETER)])
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const [isAutoplaying, setIsAutoplaying] = useState(false)

  const current = trajectory[trajectory.length - 1]
  const nextStep = useMemo(() => takeGradientDescentStep(current.parameter, learningRate), [current.parameter, learningRate])
  const trajectorySummary = useMemo(() => summarizeTrajectory(trajectory), [trajectory])
  const canStep = trajectory.length - 1 < MAX_STEPS

  useEffect(() => {
    if (!isAutoplaying || !canStep || prefersReducedMotion) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setTrajectory((previous) => {
        const nextTrajectory = [...previous, describeState(nextStep.nextParameter)]

        if (nextTrajectory.length - 1 >= MAX_STEPS) {
          setIsAutoplaying(false)
        }

        return nextTrajectory
      })
    }, AUTOPLAY_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [canStep, isAutoplaying, nextStep.nextParameter, prefersReducedMotion])

  function resetTrajectory(nextStart = startParameter) {
    setTrajectory([describeState(nextStart)])
    setIsAutoplaying(false)
  }

  function handleStep() {
    if (!canStep) {
      return
    }

    setTrajectory((previous) => [...previous, describeState(nextStep.nextParameter)])
  }

  function handlePreset(nextLearningRate: number) {
    setLearningRate(nextLearningRate)
    resetTrajectory(startParameter)
  }

  return {
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
    maxSteps: MAX_STEPS,
    resetTrajectory,
    handleStep,
    handlePreset,
  }
}
