# Web roadmap status and source of truth

This file is the **in-repo orientation point** for current status, current next lesson, and where planning truth lives.

## Canonical planning sources

Use these in order:

1. **This file** — canonical source for task state (`DONE`, `NEXT`, `QUEUED`) and execution order.
2. **Cleaned roadmap model / wording reference:** `/root/.openclaw/workspace/memory/2026-03-29-dl-roadmap.md`
3. **Subagent execution philosophy:** `docs/web/subagent-working-philosophy.md`
4. **Paper readiness / access truth:** `references/operational-paper-set.md`
5. **Tracked paper metadata:** `references/index.md`

Execution truth is maintained in-repo, with the memory roadmap still used as a wording/checkpoint reference to prevent status drift.

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
- interactive lesson: **Normalization · BatchNorm intuition**
- interactive lesson: **Normalization · LayerNorm intuition**
- interactive lesson: **Residual connections · why skip connections help**

Current learner-facing lesson order:

1. **Perceptron · weighted sum and bias**
2. **Perceptron · decision boundary intuition**
3. **MLP · activation functions and non-linearity**
4. **Gradient descent intuition**
5. **Convolution as local pattern detector**
6. **Initialization · bad init vs stable init**
7. **Normalization · BatchNorm intuition**
8. **Normalization · LayerNorm intuition**
9. **Residual connections · why skip connections help**

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

- **Initialization · Xavier and He intuition** *(this is the current `NEXT` implementation target; source investigation is already closed)*
- **Regularization · dropout behavior** *(source-ready, but not yet implemented in the app)*
- activation-comparison and gradient-flow stable-training follow-ups
- the broader sequence/memory and research lesson blocks

## Current next lesson

**Status:** The first 9 lessons (through Residual connections) are shipped.

**NEXT · direct implementation:** **Initialization · Xavier and He intuition**

This distinction matters:

- **implemented** means learner-visible in the app today
- **source-ready** means research/anchor work is complete, but the lesson page is not shipped yet

Right now, `dropout behavior` is source-ready but still unimplemented, while `Xavier and He intuition` is the immediate next implementation target.

## Why the next lesson is not just “build the next page”

The project follows a paper-grounded workflow:

`source paper(s) -> teaching claim -> visualization -> interaction -> interpretation`

That means roadmap execution depends on both:

- lesson sequencing
- source-readiness / anchor clarity

For the current state:

- the perceptron, MLP, gradient-descent, convolution, initialization, normalization, and residual lessons above are already shipped in the app
- the next implementation run should target `Initialization · Xavier and He intuition`
- other tasks may already be source-ready, but that does not mean they are implemented or that they supersede `NEXT`

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
