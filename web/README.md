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
