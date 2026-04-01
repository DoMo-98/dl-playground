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

    expect(weightedSum.previous?.id).toBe('gradient-descent-intuition')
    expect(weightedSum.next?.id).toBe('perceptron-decision-boundary')
    expect(decisionBoundary.previous?.id).toBe('perceptron-weighted-sum')
    expect(decisionBoundary.next?.id).toBe('mlp-activations')
  })

  it('surfaces the first ready lesson for overview CTA scaffolding', () => {
    expect(getNextReadyLesson()).toMatchObject({
      id: 'perceptron-weighted-sum',
      href: '/en/learn/mechanics/perceptron/weighted-sum',
      status: 'ready',
    })
  })

  it('derives section statistics and first available section path from lesson metadata', () => {
    const mechanics = learningSections.find((section) => section.slug === 'mechanics')

    expect(mechanics).toBeDefined()
    expect(getSectionLessons(mechanics!)).toHaveLength(3)
    expect(getSectionStats(mechanics!)).toEqual({
      lessonCount: 3,
      readyCount: 3,
      plannedCount: 0,
      totalMinutes: 30,
      completionRatio: 1,
    })
    expect(getSectionPath(mechanics!)).toBe('/en/learn/mechanics/perceptron/weighted-sum')
  })

  it('falls back safely when adjacency is requested for an unknown lesson', () => {
    expect(getAdjacentLessons('missing-lesson')).toEqual({
      previous: null,
      current: null,
      next: null,
    })
  })
})
