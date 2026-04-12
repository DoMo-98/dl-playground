import { enMessages } from './locales/en'
import { esMessages } from './locales/es'
import type { Locale } from '../types/i18n'
import type { LearningLesson, LearningLessonBase, LearningSection, LearningSectionBase, LearningUnit } from '../types/learning'

export type { LessonStatus, LessonKind, LearningLesson, LearningUnit, LearningSection } from '../types/learning'

const messagesByLocale = {
  en: enMessages,
  es: esMessages,
} as const

// Source-of-truth note:
// - This file defines the learner-facing information architecture used by the app.
// - Section/unit membership expresses thematic taxonomy.
// - Lesson `order` expresses the pedagogical sequence shown to learners.
// - Those two views are intentionally related but not identical.
// - Extended curriculum decomposition lives in `docs/web/content-map.md`.
const sectionBases: LearningSectionBase[] = [
  {
    slug: 'foundations',
    order: 1,
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
            sectionSlug: 'foundations',
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
            sectionSlug: 'foundations',
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
            sectionSlug: 'foundations',
            unitSlug: 'mlp',
            order: 3,
            estimatedMinutes: 12,
            concepts: ['activation function', 'non-linearity', 'representation power'],
            prerequisites: ['perceptron-weighted-sum'],
          },
        ],
      },
      {
        slug: 'optimization',
        order: 3,
        lessons: [
          {
            id: 'gradient-descent-intuition',
            slug: 'gradient-descent',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'foundations',
            unitSlug: 'optimization',
            order: 4,
            estimatedMinutes: 12,
            concepts: ['loss landscape', 'gradient', 'learning rate'],
            prerequisites: ['mlp-activations'],
          },
        ],
      },
    ],
  },
  {
    slug: 'cnns',
    order: 2,
    units: [
      {
        slug: 'convolutions',
        order: 1,
        lessons: [
          {
            id: 'cnn-local-patterns',
            slug: 'local-patterns',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'cnns',
            unitSlug: 'convolutions',
            order: 5,
            estimatedMinutes: 12,
            concepts: ['kernel', 'receptive field', 'feature map'],
            prerequisites: ['gradient-descent-intuition'],
          },
        ],
      },
    ],
  },
  {
    slug: 'stable-training',
    order: 3,
    units: [
      {
        slug: 'initialization',
        order: 1,
        lessons: [
          {
            id: 'initialization-bad-vs-stable',
            slug: 'bad-vs-stable',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'stable-training',
            unitSlug: 'initialization',
            order: 6,
            estimatedMinutes: 12,
            concepts: ['initialization', 'signal scale', 'gradient stability'],
            prerequisites: ['cnn-local-patterns'],
          },
        ],
      },
      {
        slug: 'normalization-and-regularization',
        order: 2,
        lessons: [
          {
            id: 'normalization-batchnorm-intuition',
            slug: 'batchnorm-intuition',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'stable-training',
            unitSlug: 'normalization-and-regularization',
            order: 7,
            estimatedMinutes: 12,
            concepts: ['batch statistics', 'normalization', 'train vs inference'],
            prerequisites: ['initialization-bad-vs-stable'],
          },
          {
            id: 'normalization-layernorm-intuition',
            slug: 'layernorm-intuition',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'stable-training',
            unitSlug: 'normalization-and-regularization',
            order: 8,
            estimatedMinutes: 12,
            concepts: ['per-sample normalization', 'feature statistics', 'batch independence'],
            prerequisites: ['normalization-batchnorm-intuition'],
          },
        ],
      },
      {
        slug: 'residual-connections',
        order: 3,
        lessons: [
          {
            id: 'residual-connections-why-skip-connections-help',
            slug: 'why-skip-connections-help',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'stable-training',
            unitSlug: 'residual-connections',
            order: 9,
            estimatedMinutes: 12,
            concepts: ['identity path', 'residual correction', 'depth stability'],
            prerequisites: ['normalization-layernorm-intuition'],
          },
        ],
      },
    ],
  },
  {
    slug: 'sequence-memory',
    order: 4,
    units: [
      {
        slug: 'rnns-and-lstms',
        order: 1,
        lessons: [],
      },
      {
        slug: 'transformers',
        order: 2,
        lessons: [],
      },
    ],
  },
  {
    slug: 'research',
    order: 5,
    units: [
      {
        slug: 'meta-learning',
        order: 1,
        lessons: [],
      },
      {
        slug: 'nested-learning',
        order: 2,
        lessons: [],
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
        left.lesson.order - right.lesson.order ||
        left.sectionOrder - right.sectionOrder ||
        left.unitOrder - right.unitOrder ||
        left.lesson.title.localeCompare(right.lesson.title),
    )
    .map(({ lesson }) => lesson)
}

function getLearningLessonById(locale: Locale = 'en') {
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

function getLessonIndex(lessonId: string, locale: Locale = 'en') {
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

export function getLessonBreadcrumb(lessonId: string, locale: Locale = 'en') {
  const sections = getLearningSections(locale)

  for (const section of sections) {
    for (const unit of section.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId) {
          return {
            sectionTitle: section.title,
            lessonTitle: lesson.shortTitle,
          }
        }
      }
    }
  }

  return null
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
