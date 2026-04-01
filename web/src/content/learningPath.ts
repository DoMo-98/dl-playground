import { enMessages } from './locales/en'
import { esMessages } from './locales/es'
import type { Locale } from '../i18n'

export type LessonStatus = 'ready' | 'planned'
export type LessonKind = 'interactive' | 'lab' | 'reading'

type LearningLessonBase = {
  id: string
  slug: string
  status: LessonStatus
  kind: LessonKind
  sectionSlug: string
  unitSlug: string
  order: number
  estimatedMinutes: number
  concepts: string[]
  prerequisites: string[]
}

export type LearningLesson = LearningLessonBase & {
  title: string
  shortTitle: string
  summary: string
  href: string
  objectives: string[]
}

type LearningUnitBase = {
  slug: string
  order: number
  lessons: LearningLessonBase[]
}

export type LearningUnit = Omit<LearningUnitBase, 'lessons'> & {
  title: string
  description: string
  lessons: LearningLesson[]
}

type LearningSectionBase = {
  slug: string
  order: number
  units: LearningUnitBase[]
}

export type LearningSection = Omit<LearningSectionBase, 'units'> & {
  title: string
  description: string
  goal: string
  units: LearningUnit[]
}

const messagesByLocale = {
  en: enMessages,
  es: esMessages,
} as const

const sectionBases: LearningSectionBase[] = [
  {
    slug: 'foundations',
    order: 1,
    units: [
      {
        slug: 'optimization',
        order: 1,
        lessons: [
          {
            id: 'gradient-descent-intuition',
            slug: 'gradient-descent',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'foundations',
            unitSlug: 'optimization',
            order: 1,
            estimatedMinutes: 12,
            concepts: ['loss landscape', 'gradient', 'learning rate'],
            prerequisites: [],
          },
        ],
      },
    ],
  },
  {
    slug: 'mechanics',
    order: 2,
    units: [
      {
        slug: 'perceptron',
        order: 1,
        lessons: [
          {
            id: 'perceptron-weighted-sum',
            slug: 'weighted-sum',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'mechanics',
            unitSlug: 'perceptron',
            order: 1,
            estimatedMinutes: 8,
            concepts: ['weighted sum', 'bias', 'threshold'],
            prerequisites: [],
          },
          {
            id: 'perceptron-decision-boundary',
            slug: 'decision-boundary',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'mechanics',
            unitSlug: 'perceptron',
            order: 2,
            estimatedMinutes: 10,
            concepts: ['linear separator', 'classification region', 'bias shift'],
            prerequisites: ['perceptron-weighted-sum'],
          },
        ],
      },
      {
        slug: 'mlp',
        order: 2,
        lessons: [
          {
            id: 'mlp-activations',
            slug: 'activations',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'mechanics',
            unitSlug: 'mlp',
            order: 3,
            estimatedMinutes: 12,
            concepts: ['activation function', 'non-linearity', 'representation power'],
            prerequisites: ['perceptron-weighted-sum'],
          },
        ],
      },
    ],
  },
  {
    slug: 'cnn',
    order: 3,
    units: [
      {
        slug: 'convolutions',
        order: 1,
        lessons: [
          {
            id: 'cnn-local-patterns',
            slug: 'local-patterns',
            status: 'planned',
            kind: 'interactive',
            sectionSlug: 'cnn',
            unitSlug: 'convolutions',
            order: 1,
            estimatedMinutes: 12,
            concepts: ['kernel', 'receptive field', 'feature map'],
            prerequisites: [],
          },
        ],
      },
    ],
  },
]

function getMessages(locale: Locale) {
  return messagesByLocale[locale]
}

function createLessonHref(locale: Locale, lesson: LearningLessonBase) {
  return `/${locale}/learn/${lesson.sectionSlug}/${lesson.unitSlug}/${lesson.slug}`
}

export function getLearningSections(locale: Locale = 'en'): LearningSection[] {
  const messages = getMessages(locale)

  return sectionBases.map((section): LearningSection => ({
    ...section,
    ...messages.sections[section.slug],
    units: section.units.map((unit): LearningUnit => ({
      ...unit,
      ...messages.units[unit.slug],
      lessons: unit.lessons.map((lesson): LearningLesson => ({
        ...lesson,
        ...messages.lessons[lesson.id],
        href: createLessonHref(locale, lesson),
      })),
    })),
  }))
}

type IndexedLesson = {
  sectionOrder: number
  unitOrder: number
  lesson: LearningLesson
}

export function getLearningLessons(locale: Locale = 'en') {
  const learningSections = getLearningSections(locale)
  const indexedLessons: IndexedLesson[] = learningSections.flatMap((section) =>
    section.units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        sectionOrder: section.order,
        unitOrder: unit.order,
        lesson,
      })),
    ),
  )

  return indexedLessons
    .toSorted(
      (left, right) =>
        left.sectionOrder - right.sectionOrder ||
        left.unitOrder - right.unitOrder ||
        left.lesson.order - right.lesson.order ||
        left.lesson.title.localeCompare(right.lesson.title),
    )
    .map(({ lesson }) => lesson)
}

export function getLearningLessonById(locale: Locale = 'en') {
  const learningLessons = getLearningLessons(locale)
  return Object.fromEntries(learningLessons.map((lesson) => [lesson.id, lesson]))
}

export function getSectionLessons(section: LearningSection) {
  return section.units.flatMap((unit) => unit.lessons)
}

export function getSectionStats(section: LearningSection) {
  const lessons = getSectionLessons(section)
  const readyCount = lessons.filter((lesson) => lesson.status === 'ready').length
  const plannedCount = lessons.length - readyCount
  const totalMinutes = lessons.reduce((total, lesson) => total + lesson.estimatedMinutes, 0)

  return {
    lessonCount: lessons.length,
    readyCount,
    plannedCount,
    totalMinutes,
    completionRatio: lessons.length === 0 ? 0 : readyCount / lessons.length,
  }
}

export function getLessonIndex(lessonId: string, locale: Locale = 'en') {
  return getLearningLessons(locale).findIndex((lesson) => lesson.id === lessonId)
}

export function getAdjacentLessons(lessonId: string, locale: Locale = 'en') {
  const learningLessons = getLearningLessons(locale)
  const lessonIndex = getLessonIndex(lessonId, locale)

  if (lessonIndex === -1) {
    return {
      previous: null,
      current: null,
      next: null,
    }
  }

  return {
    previous: learningLessons[lessonIndex - 1] ?? null,
    current: learningLessons[lessonIndex] ?? null,
    next: learningLessons[lessonIndex + 1] ?? null,
  }
}

export function getNextReadyLesson(locale: Locale = 'en') {
  return getLearningLessons(locale).find((lesson) => lesson.status === 'ready') ?? null
}

export function getSectionPath(section: LearningSection, locale: Locale = 'en') {
  const readyLesson = getSectionLessons(section).find((lesson) => lesson.status === 'ready')
  return readyLesson?.href ?? `/${locale}/learn`
}

export const learningSections = getLearningSections('en')
export const learningLessons = getLearningLessons('en')
export const learningLessonById = getLearningLessonById('en')
