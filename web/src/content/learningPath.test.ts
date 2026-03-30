import { describe, expect, it } from 'vitest'
import { learningSections } from './learningPath'

describe('learningPath', () => {
  it('keeps lesson hrefs unique across sections', () => {
    const hrefs = learningSections.flatMap((section) => section.lessons.map((lesson) => lesson.href))

    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('exposes at least one ready lesson in the learning path', () => {
    const readyLessons = learningSections.flatMap((section) =>
      section.lessons.filter((lesson) => lesson.status === 'ready'),
    )

    expect(readyLessons).toHaveLength(1)
    expect(readyLessons[0]).toMatchObject({
      title: 'Perceptron · weighted sum and bias',
      href: '/learn/mechanics/perceptron/weighted-sum',
    })
  })
})
