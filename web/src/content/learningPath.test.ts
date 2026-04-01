import { describe, expect, it } from 'vitest'
import {
  getAdjacentLessons,
  getNextReadyLesson,
  getSectionLessons,
  getSectionPath,
  getSectionStats,
  learningLessonById,
  learningLessons,
  learningSections,
} from './learningPath'

describe('learningPath registry', () => {
  it('keeps lesson hrefs unique across the curriculum', () => {
    const hrefs = learningLessons.map((lesson) => lesson.href)

    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('exposes richer metadata for each lesson card and navigation contract', () => {
    for (const lesson of learningLessons) {
      expect(lesson.id).toBeTruthy()
      expect(lesson.shortTitle).toBeTruthy()
      expect(lesson.summary.length).toBeGreaterThan(20)
      expect(lesson.objectives.length).toBeGreaterThan(0)
      expect(lesson.concepts.length).toBeGreaterThan(0)
      expect(lesson.estimatedMinutes).toBeGreaterThan(0)
      expect(lesson.href.startsWith('/en/learn/')).toBe(true)
      expect(learningLessonById[lesson.id]).toEqual(lesson)
    }
  })

  it('derives curriculum order for adjacent-lesson navigation', () => {
    const weightedSum = getAdjacentLessons('perceptron-weighted-sum')
    const decisionBoundary = getAdjacentLessons('perceptron-decision-boundary')

    expect(weightedSum.previous).toBeNull()
    expect(weightedSum.next?.id).toBe('perceptron-decision-boundary')
    expect(decisionBoundary.previous?.id).toBe('perceptron-weighted-sum')
    expect(decisionBoundary.next?.id).toBe('mlp-activations')
  })

  it('keeps optimization after model-intuition lessons in the global sequence', () => {
    const activations = getAdjacentLessons('mlp-activations')
    const gradientDescent = getAdjacentLessons('gradient-descent-intuition')

    expect(activations.previous?.id).toBe('perceptron-decision-boundary')
    expect(activations.next?.id).toBe('gradient-descent-intuition')
    expect(gradientDescent.previous?.id).toBe('mlp-activations')
    expect(gradientDescent.next?.id).toBe('cnn-local-patterns')
  })

  it('surfaces the first ready lesson for overview CTA scaffolding', () => {
    expect(getNextReadyLesson()).toMatchObject({
      id: 'perceptron-weighted-sum',
      href: '/en/learn/foundations/perceptron/weighted-sum',
      status: 'ready',
    })
  })

  it('derives section statistics and first available section path from lesson metadata', () => {
    const foundations = learningSections.find((section) => section.slug === 'foundations')

    expect(foundations).toBeDefined()
    expect(getSectionLessons(foundations!)).toHaveLength(4)
    expect(getSectionStats(foundations!)).toEqual({
      lessonCount: 4,
      readyCount: 4,
      plannedCount: 0,
      totalMinutes: 42,
      completionRatio: 1,
    })
    expect(getSectionPath(foundations!)).toBe('/en/learn/foundations/perceptron/weighted-sum')
  })

  it('falls back safely when adjacency is requested for an unknown lesson', () => {
    expect(getAdjacentLessons('missing-lesson')).toEqual({
      previous: null,
      current: null,
      next: null,
    })
  })
})
