# Web roadmap status and source of truth

This file is the **in-repo orientation point** for current status, current next lesson, and where planning truth lives.

## Canonical planning sources

Use these in order:

1. **This file** — canonical source for task state (`DONE`, `NEXT`, `QUEUED`) and execution order. (Previously tracked in an external planning system at `/root/.openclaw/workspace/memory/2026-03-29-dl-roadmap.md`, which is no longer in use.)
2. **Subagent execution philosophy:** `docs/web/subagent-working-philosophy.md`
3. **Paper readiness / access truth:** `references/operational-paper-set.md`
4. **Tracked paper metadata:** `references/index.md`

All planning truth now lives inside this repository.

## Confirmed current product status

Implemented in the app today:

- React + TypeScript + Vite web foundation
- main shell and navigation
- home page
- learning path overview at `/learn`
- reusable `LearningPageLayout`
- interactive lesson: **Perceptron · weighted sum and bias**
- interactive lesson: **Perceptron · decision boundary intuition**
- interactive lesson: **MLP · activation functions and non-linearity**
- interactive lesson: **Gradient descent intuition**
- interactive lesson: **Convolution as local pattern detector**
- interactive lesson: **Initialization · bad init vs stable init**

Current learner-facing lesson order:

1. **Perceptron · weighted sum and bias**
2. **Perceptron · decision boundary intuition**
3. **MLP · activation functions and non-linearity**
4. **Gradient descent intuition**
5. **Convolution as local pattern detector**
6. **Initialization · bad init vs stable init**

Current top-level taxonomy in the app:

- **Foundations**
  - **Perceptron**
  - **MLP**
  - **Optimization** *(formal home of `gradient descent intuition`)*
- **CNNs** *(kept as its own top-level section for product clarity and continuity with the current app structure)*
- **Stable Training**
- **Sequence & Memory**
- **Research**

Rule of thumb: taxonomy groups lessons by theme; the learner-facing sequence may cross section boundaries when that produces a clearer beginner path. In that taxonomy, convolution/CNN work belongs to the dedicated **CNNs** top-level block rather than being nested under the foundations/mechanics grouping.

Not yet implemented in the app:

- the broader stable-training, sequence/memory, and research lesson blocks (beyond the initialization lesson already shipped)

## Current next lesson

**Status:** The first 6 lessons (through Initialization) are shipped. The next lesson is determined by this file's roadmap state.

## Why the next lesson is not just “build the next page”

The project follows a paper-grounded workflow:

`source paper(s) -> teaching claim -> visualization -> interaction -> interpretation`

That means roadmap execution depends on both:

- lesson sequencing
- source-readiness / anchor clarity

For the current state:

- the perceptron, MLP, gradient-descent, convolution, and initialization lessons are already shipped in the app
- the next implementation run should consult this file for the next execution target

## How to use the rest of the docs in this folder

- `README.md` — index of the web docs and what each one is for
- `product-definition.md` — enduring product intent and lesson design rules
- `content-map.md` — broad curriculum decomposition
- `mvp.md` — MVP shape and lesson cluster
- `architecture.md` — technical structure and component boundaries
- `backlog.md` — historical planning backlog; useful for scope ideas, but defer to the canonical roadmap for execution order and task state
- `subagent-working-philosophy.md` — persistent execution rules for future workers

## Drift-prevention rule

When a contributor changes repo-level docs that mention status, next steps, or roadmap order, they should verify those statements against:

- This file (the canonical roadmap status)
- `references/operational-paper-set.md`

If they disagree, update the repo docs or explicitly label them as historical/non-canonical rather than leaving silent drift behind.
