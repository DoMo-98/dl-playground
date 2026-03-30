import { Route, Routes } from 'react-router-dom'
import { SiteShell } from './layout/SiteShell'
import { HomePage } from '../pages/home/HomePage'
import { LearnOverviewPage } from '../pages/learn/LearnOverviewPage'
import { learningLessons } from '../content/learningPath'
import { WeightedSumPage } from '../pages/lessons/mechanics/perceptron/WeightedSumPage'
import { DecisionBoundaryPage } from '../pages/lessons/mechanics/perceptron/DecisionBoundaryPage'

const lessonRouteElements = {
  'perceptron-weighted-sum': <WeightedSumPage />,
  'perceptron-decision-boundary': <DecisionBoundaryPage />,
} as const

const readyLessonRoutes = learningLessons
  .filter((lesson) => lesson.status === 'ready')
  .flatMap((lesson) => {
    const element = lessonRouteElements[lesson.id as keyof typeof lessonRouteElements]

    return element
      ? [
          <Route
            key={lesson.id}
            path={lesson.href.replace(/^\//, '')}
            element={element}
          />,
        ]
      : []
  })

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnOverviewPage />} />
        {readyLessonRoutes}
      </Route>
    </Routes>
  )
}
