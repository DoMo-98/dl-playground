export type LessonStatus = 'ready' | 'planned'
export type LessonKind = 'interactive' | 'lab' | 'reading'

export type LearningLesson = {
  id: string
  title: string
  shortTitle: string
  summary: string
  href: string
  status: LessonStatus
  kind: LessonKind
  sectionSlug: string
  unitSlug: string
  order: number
  estimatedMinutes: number
  objectives: string[]
  concepts: string[]
  prerequisites: string[]
}

export type LearningUnit = {
  slug: string
  title: string
  description: string
  order: number
  lessons: LearningLesson[]
}

export type LearningSection = {
  title: string
  slug: string
  description: string
  goal: string
  order: number
  units: LearningUnit[]
}

export const learningSections: LearningSection[] = [
  {
    title: 'Foundations',
    slug: 'foundations',
    description: 'Core concepts that support later deep learning intuition.',
    goal: 'Build the optimization and representation intuitions that later models rely on.',
    order: 1,
    units: [
      {
        slug: 'optimization',
        title: 'Optimization intuition',
        description: 'How parameters move, why loss changes, and what stable progress feels like.',
        order: 1,
        lessons: [
          {
            id: 'gradient-descent-intuition',
            title: 'Gradient descent intuition',
            shortTitle: 'Gradient descent',
            summary:
              'See how learning rate changes the path from noisy steps to stable convergence on a simple loss landscape.',
            href: '/learn/foundations/gradient-descent',
            status: 'planned',
            kind: 'interactive',
            sectionSlug: 'foundations',
            unitSlug: 'optimization',
            order: 1,
            estimatedMinutes: 12,
            objectives: [
              'Relate gradient direction to parameter updates',
              'Contrast stable convergence with oscillation and overshoot',
            ],
            concepts: ['loss landscape', 'gradient', 'learning rate'],
            prerequisites: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Architectural mechanics',
    slug: 'mechanics',
    description: 'Mechanisms that explain how neural network components behave.',
    goal: 'Move from single-neuron intuition to the building blocks of deeper models.',
    order: 2,
    units: [
      {
        slug: 'perceptron',
        title: 'Perceptron basics',
        description: 'The smallest decision unit: score inputs, shift with bias, and form a linear separator.',
        order: 1,
        lessons: [
          {
            id: 'perceptron-weighted-sum',
            title: 'Perceptron · weighted sum and bias',
            shortTitle: 'Weighted sum and bias',
            summary:
              'Manipulate inputs, weights, and bias to see how a perceptron computes its score before thresholding.',
            href: '/learn/mechanics/perceptron/weighted-sum',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'mechanics',
            unitSlug: 'perceptron',
            order: 1,
            estimatedMinutes: 8,
            objectives: [
              'Connect each input-weight product to the total score',
              'Understand how bias shifts the score before classification',
            ],
            concepts: ['weighted sum', 'bias', 'threshold'],
            prerequisites: [],
          },
          {
            id: 'perceptron-decision-boundary',
            title: 'Perceptron · decision boundary intuition',
            shortTitle: 'Decision boundary intuition',
            summary:
              'Move weights and bias to watch a linear boundary rotate and shift across a 2D classification plane.',
            href: '/learn/mechanics/perceptron/decision-boundary',
            status: 'ready',
            kind: 'interactive',
            sectionSlug: 'mechanics',
            unitSlug: 'perceptron',
            order: 2,
            estimatedMinutes: 10,
            objectives: [
              'Link weights to boundary orientation',
              'Link bias to boundary translation',
            ],
            concepts: ['linear separator', 'classification region', 'bias shift'],
            prerequisites: ['perceptron-weighted-sum'],
          },
        ],
      },
      {
        slug: 'mlp',
        title: 'Multi-layer perceptrons',
        description: 'Why stacking layers only becomes expressive once non-linearity enters the picture.',
        order: 2,
        lessons: [
          {
            id: 'mlp-activations',
            title: 'MLP · activation functions and non-linearity',
            shortTitle: 'Activations and non-linearity',
            summary:
              'Compare activation choices to see when a network stays effectively linear and when it becomes expressive.',
            href: '/learn/mechanics/mlp/activations',
            status: 'planned',
            kind: 'interactive',
            sectionSlug: 'mechanics',
            unitSlug: 'mlp',
            order: 3,
            estimatedMinutes: 12,
            objectives: [
              'See why stacked linear layers collapse into another linear map',
              'Compare how activations reshape representable behavior',
            ],
            concepts: ['activation function', 'non-linearity', 'representation power'],
            prerequisites: ['perceptron-weighted-sum'],
          },
        ],
      },
    ],
  },
  {
    title: 'CNNs',
    slug: 'cnn',
    description: 'Spatial pattern extraction and hierarchical feature building.',
    goal: 'Show how local receptive fields detect useful structure in images and grids.',
    order: 3,
    units: [
      {
        slug: 'convolutions',
        title: 'Local pattern detection',
        description: 'Understand kernels as small reusable detectors applied across space.',
        order: 1,
        lessons: [
          {
            id: 'cnn-local-patterns',
            title: 'Convolution as local pattern detector',
            shortTitle: 'Local pattern detector',
            summary:
              'Edit a small kernel and input grid to see how local matches build a feature map.',
            href: '/learn/cnn/local-patterns',
            status: 'planned',
            kind: 'interactive',
            sectionSlug: 'cnn',
            unitSlug: 'convolutions',
            order: 1,
            estimatedMinutes: 12,
            objectives: [
              'Relate kernel values to local match strength',
              'Interpret the feature map as a scan of local evidence',
            ],
            concepts: ['kernel', 'receptive field', 'feature map'],
            prerequisites: [],
          },
        ],
      },
    ],
  },
]

export const learningUnits = learningSections.flatMap((section) => section.units)

type IndexedLesson = {
  sectionOrder: number
  unitOrder: number
  lesson: LearningLesson
}

const indexedLessons: IndexedLesson[] = learningSections.flatMap((section) =>
  section.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      sectionOrder: section.order,
      unitOrder: unit.order,
      lesson,
    })),
  ),
)

export const learningLessons = indexedLessons
  .toSorted(
    (left, right) =>
      left.sectionOrder - right.sectionOrder ||
      left.unitOrder - right.unitOrder ||
      left.lesson.order - right.lesson.order ||
      left.lesson.title.localeCompare(right.lesson.title),
  )
  .map(({ lesson }) => lesson)

export const learningLessonById = Object.fromEntries(learningLessons.map((lesson) => [lesson.id, lesson]))

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

export function getLessonIndex(lessonId: string) {
  return learningLessons.findIndex((lesson) => lesson.id === lessonId)
}

export function getAdjacentLessons(lessonId: string) {
  const lessonIndex = getLessonIndex(lessonId)

  if (lessonIndex === -1) {
    return {
      previous: null,
      current: null,
      next: null,
    }
  }

  return {
    previous: learningLessons[lessonIndex - 1] ?? null,
    current: learningLessons[lessonIndex],
    next: learningLessons[lessonIndex + 1] ?? null,
  }
}

export function getNextReadyLesson() {
  return learningLessons.find((lesson) => lesson.status === 'ready') ?? null
}

export function getSectionPath(section: LearningSection) {
  const readyLesson = getSectionLessons(section).find((lesson) => lesson.status === 'ready')
  return readyLesson?.href ?? '/learn'
}
