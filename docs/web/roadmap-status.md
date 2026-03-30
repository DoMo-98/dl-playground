# Web roadmap status and source of truth

This file is the **in-repo orientation point** for current status, current next lesson, and where planning truth lives.

## Canonical planning sources

Use these in order:

1. **Operational roadmap (canonical, outside the repo):** `/root/.openclaw/workspace/memory/2026-03-29-dl-roadmap.md`
2. **Subagent execution philosophy:** `docs/web/subagent-working-philosophy.md`
3. **Paper readiness / access truth:** `references/operational-paper-set.md`
4. **Tracked paper metadata:** `references/index.md`

Important distinction:

- The file in workspace `memory/` is the **operational source of truth** for task state (`DONE`, `NEXT`, `QUEUED`) and execution order.
- The files inside this repository are the **shareable project docs** that should help contributors understand the same state without guessing.

## Confirmed current product status

Implemented in the app today:

- React + TypeScript + Vite web foundation
- main shell and navigation
- home page
- learning path overview at `/learn`
- reusable `LearningPageLayout`
- interactive lesson: **Perceptron · weighted sum and bias**
- interactive lesson: **Perceptron · decision boundary intuition**

Not yet implemented in the app:

- **MLP · activation functions and non-linearity**
- **Gradient descent intuition**
- **Convolution as local pattern detector**
- the broader stable-training, autoencoder, sequence/memory, and research lesson blocks

## Current next lesson

**NEXT:** `T2 — MLP · activation functions and non-linearity`

In plain English:

- the next lesson should teach that a perceptron creates a **linear decision boundary**
- the learner should manipulate **weights and bias**
- the UI should show the boundary moving in 2D and points changing class immediately
- this lesson should be treated as the next execution target unless the canonical roadmap changes

## Why the next lesson is not just “build the next page”

The project follows a paper-grounded workflow:

`source paper(s) -> teaching claim -> visualization -> interaction -> interpretation`

That means roadmap execution depends on both:

- lesson sequencing
- source-readiness / anchor clarity

For the current next lesson:

- `T1b` is already closed and the decision-boundary lesson is now part of the shipped app
- `T2` is next, but its primary source path still requires focused investigation before the lesson can claim paper-grounded fidelity
- the next implementation run should therefore confirm the strongest usable anchor for non-linearity, then build the smallest coherent interactive lesson around that claim

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

- `/root/.openclaw/workspace/memory/2026-03-29-dl-roadmap.md`
- `references/operational-paper-set.md`

If they disagree, update the repo docs or explicitly label them as historical/non-canonical rather than leaving silent drift behind.
