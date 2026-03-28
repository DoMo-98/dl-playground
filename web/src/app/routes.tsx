import { Route, Routes } from 'react-router-dom'
import { SiteShell } from './layout/SiteShell'
import { HomePage } from '../pages/home/HomePage'
import { LearnOverviewPage } from '../pages/learn/LearnOverviewPage'
import { WeightedSumPage } from '../pages/lessons/mechanics/perceptron/WeightedSumPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnOverviewPage />} />
        <Route
          path="learn/mechanics/perceptron/weighted-sum"
          element={<WeightedSumPage />}
        />
      </Route>
    </Routes>
  )
}
