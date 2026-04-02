export type LessonStatus = 'ready' | 'planned'
export type LessonKind = 'interactive' | 'lab' | 'reading'

export type LearningLessonBase = {
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

export type LearningUnitBase = {
  slug: string
  order: number
  lessons: LearningLessonBase[]
}

export type LearningUnit = Omit<LearningUnitBase, 'lessons'> & {
  title: string
  description: string
  lessons: LearningLesson[]
}

export type LearningSectionBase = {
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
