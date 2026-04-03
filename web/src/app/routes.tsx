import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import type { Locale } from '../types/i18n'
import { detectPreferredLocale, isLocale, locales } from '../lib/i18n'
import { SiteShell } from './layout/SiteShell'
import { I18nProvider } from './I18nProvider'
import { HomePage } from '../pages/home/HomePage'
import { LearnOverviewPage } from '../pages/learn/LearnOverviewPage'
import { getLearningLessons } from '../content/learningPath'
import { WeightedSumPage } from '../pages/lessons/foundations/perceptron/WeightedSumPage'
import { DecisionBoundaryPage } from '../pages/lessons/foundations/perceptron/DecisionBoundaryPage'
import { ActivationsPage } from '../pages/lessons/foundations/mlp/ActivationsPage'
import { GradientDescentPage } from '../pages/lessons/foundations/optimization/GradientDescentPage'
import { LocalPatternPage } from '../pages/lessons/cnns/convolutions/LocalPatternPage'
import { InitializationPage } from '../pages/lessons/foundations/stable-training/InitializationPage'
import { NotFoundPage } from '../pages/not-found/NotFoundPage'

const lessonRouteElements = {
  'gradient-descent-intuition': <GradientDescentPage />,
  'perceptron-weighted-sum': <WeightedSumPage />,
  'perceptron-decision-boundary': <DecisionBoundaryPage />,
  'mlp-activations': <ActivationsPage />,
  'cnn-local-patterns': <LocalPatternPage />,
  'initialization-bad-vs-stable': <InitializationPage />,
} as const

function LocaleLayout() {
  const { locale } = useParams()

  if (!isLocale(locale)) {
    return <Navigate to={`/${detectPreferredLocale()}`} replace />
  }

  return (
    <I18nProvider locale={locale}>
      <SiteShell />
    </I18nProvider>
  )
}

function createLessonRoutes(locale: Locale) {
  return getLearningLessons(locale)
    .filter((lesson) => lesson.status === 'ready')
    .flatMap((lesson) => {
      const element = lessonRouteElements[lesson.id as keyof typeof lessonRouteElements]

      return element
        ? [
            <Route
              key={`${locale}-${lesson.id}`}
              path={lesson.href.replace(`/${locale}/`, '')}
              element={element}
            />,
          ]
        : []
    })
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${detectPreferredLocale()}`} replace />} />
      <Route path=":locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnOverviewPage />} />
        {locales.flatMap((locale) => createLessonRoutes(locale))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${detectPreferredLocale()}`} replace />} />
    </Routes>
  )
}
