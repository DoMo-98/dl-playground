# dl-playground web

Frontend for the interactive learning layer of `dl-playground`.

## Stack

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS v4

## Current scope

Initial scaffold with:

- site shell
- learning path overview
- bilingual foundation (English + Spanish)
- first interactive lesson: perceptron weighted sum and bias

## Localization architecture

The SPA now uses locale-prefixed routes:

- `/en/...`
- `/es/...`

Implementation notes:

- locale preference is detected from `localStorage` first, then browser language
- switching language keeps the user on the equivalent route instead of sending them back home
- shell and short UI strings live in `src/content/locales/`
- curriculum metadata is merged through `src/content/learningPath.ts`
- long-form page copy can be split into per-language content modules as lessons grow

Key files:

- `src/i18n.ts` — locale detection, persistence, and path helpers
- `src/app/I18nProvider.tsx` + `src/app/i18n-context.ts` — locale context and switching
- `src/content/locales/en.ts`
- `src/content/locales/es.ts`

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:coverage
```

`pnpm test:coverage` generates a local baseline coverage report in `web/coverage/` (HTML + lcov + terminal summary). The project keeps coverage informational for now so the MVP can track visibility without turning it into a high-friction quality gate too early.

## Vercel deployment

This frontend is configured for deployment on Vercel as a static Vite SPA.

Recommended Vercel project setting:

- **Root Directory:** `web`

Why:

- the app uses `BrowserRouter`
- deep links like `/learn/mechanics/perceptron/weighted-sum` need an SPA rewrite to `index.html`
- `vercel.json` in this folder configures build/output, SPA rewrites, asset caching, and basic security headers

Old preview deployments for the same branch are cleaned up automatically by `.github/workflows/vercel-preview-cleanup.yml`. The cleanup now runs when GitHub receives a successful `deployment_status` event for a non-production deployment, so it only starts after the newest Vercel preview is actually ready instead of waiting a fixed amount of time. A manual `workflow_dispatch` fallback is still available for ad-hoc cleanup. To enable it, add these GitHub Actions secrets:

- `VERCEL_TOKEN`: a Vercel personal account token with access to this project
- `VERCEL_PROJECT_ID`: the Vercel project ID for this frontend
- `VERCEL_TEAM_ID` (optional): only needed if the Vercel project lives under a team scope instead of a personal Hobby account
