import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { detectPreferredLocale, isLocale, locales, type Locale } from '../i18n'
import { SiteShell } from './layout/SiteShell'
import { I18nProvider } from './I18nProvider'
import { HomePage } from '../pages/home/HomePage'
import { LearnOverviewPage } from '../pages/learn/LearnOverviewPage'
import { getLearningLessons } from '../content/learningPath'
import { WeightedSumPage } from '../pages/lessons/mechanics/perceptron/WeightedSumPage'
import { DecisionBoundaryPage } from '../pages/lessons/mechanics/perceptron/DecisionBoundaryPage'

const lessonRouteElements = {
  'perceptron-weighted-sum': <WeightedSumPage />,
  'perceptron-decision-boundary': <DecisionBoundaryPage />,
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
      </Route>
      <Route path="*" element={<Navigate to={`/${detectPreferredLocale()}`} replace />} />
    </Routes>
  )
}
