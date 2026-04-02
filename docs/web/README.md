# Web docs index

This folder contains the planning and operating docs for the interactive learning web inside `dl-playground`.

Start here if you need to understand the repo quickly.

## Read in this order

1. `roadmap-status.md` — current status, current next lesson, and where planning truth lives
2. `subagent-working-philosophy.md` — persistent execution rules and source-grounded lesson contract
3. `product-definition.md` — enduring product intent and page-design rules
4. `mvp.md` — MVP lesson cluster and product boundaries
5. `architecture.md` — technical structure and implementation direction
6. `ui-component-policy.md` — when to keep UI custom vs rely on robust primitives/libraries
7. `content-map.md` — broad curriculum decomposition
8. `backlog.md` — historical backlog for scope ideas; not the canonical task-state tracker
9. `scaffold-plan.md` — initial scaffold proposal reference

## Canonical planning truth

The canonical operational roadmap currently lives outside this repo at:

- `/root/.openclaw/workspace/memory/2026-03-29-dl-roadmap.md`

Inside the repo, the best orientation entry point is:

- `roadmap-status.md`

When docs in this folder mention the current state or the next lesson, they should align with those sources.

## Document responsibilities

- `roadmap-status.md` — in-repo orientation point for current status and next lesson
- `architecture.md` — technical implementation direction for the web app
- `ui-component-policy.md` — decision rule for custom UI vs external primitives
- `content-map.md` — expanded curriculum map
- `../../web/src/content/learningPath.ts` — learner-facing source of truth for app-visible structure and lesson sequencing
- `../../README.md` — concise repo-level summary

## Current intent

Build a visual, interactive learning web for deep learning where each page combines:

- explanation
- visualization
- interaction
- immediate feedback

## Current focus

The current focus is the web layer, not the experimental sandbox.
