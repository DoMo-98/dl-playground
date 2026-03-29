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
- first interactive lesson: perceptron weighted sum and bias

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

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
