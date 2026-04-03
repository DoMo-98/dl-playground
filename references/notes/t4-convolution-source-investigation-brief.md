# T4 source investigation brief — Convolution as local pattern detector

Task: `T4 — Convolution as local pattern detector`
Roadmap source: `/root/.openclaw/workspace/memory/2026-03-29-dl-roadmap.md`

## Purpose
Prepare the source-grounding phase for the lesson `Convolution as local pattern detector` so a future subagent can quickly decide whether the lesson may proceed as a paper-faithful implementation.

## Primary anchor
- **LeCun et al. (1998)** — *Gradient-Based Learning Applied to Document Recognition*
- Canonical role:
  - classic CNN anchor for local receptive fields
  - shared-kernel scanning intuition
  - feature maps
  - simple pooling context

## Secondary context anchor
- **He et al. (2015)** — *Deep Residual Learning for Image Recognition*
- Use only as modern CNN context or downstream continuity, not as the primary source of the convolution mechanism lesson.
- Not re-audited in this investigation: already confirmed as `full-text-ok` in `references/index.md`, so no re-audit required.

## Current known access state
- LeCun et al. (1998): `abstract-or-metadata-only`
- He et al. (2015): `full-text-ok`

## Required source-investigation question
Can the subagent obtain enough direct readable access to LeCun et al. (1998) to treat it as the primary faithful anchor for a lesson centered on convolution as a local pattern detector?

## Valid outcomes

### SOURCE_CONFIRMED
Use when the subagent can access enough of LeCun et al. (1998) to support the lesson faithfully.

Expected follow-up:
- keep LeCun 1998 as primary anchor
- keep He 2015 as secondary context only
- implement the lesson

### SOURCE_PARTIAL
Use when the subagent gets only partial readable access but enough confidence to preserve the core claim safely.

Expected follow-up options:
- implement a clearly scoped MVP lesson focused only on local pattern detection + shared kernels
- avoid overclaiming broader CNN history/details not well supported by the accessible source text
- optionally recommend a stronger open auxiliary anchor for future refinement

### SOURCE_BLOCKED
Use when readable access to LeCun et al. (1998) remains too weak.

Expected follow-up:
- do not present the lesson as a faithful distillation of LeCun 1998
- propose one of:
  1. alternate open CNN anchor,
  2. reformulated lesson wording with narrower claim,
  3. deferment until a readable route is found

## Core teaching claim to preserve
A convolution acts as a **local pattern detector** by applying the same kernel across different spatial positions, producing a feature map that highlights where that pattern appears.

## Suggested learner interaction
- edit a small 2D input grid
- edit a small kernel
- slide/apply the kernel across the grid
- show output/feature-map changes immediately

## Suggested visible feedback
- highlight the current receptive field window
- show per-position response values
- render the output feature map live
- optionally animate scanning across the input

## Simplification allowed
- tiny grayscale grid
- tiny kernel (e.g. 2x2 or 3x3)
- no need for full training
- no need for full image-recognition pipeline

## Fidelity boundaries
Do not imply:
- that convolution is magic rather than repeated local dot-product-like matching
- that CNN power comes only from depth while ignoring local connectivity and weight sharing
- that ResNet is the foundational source for the convolution mechanism itself

## Source-investigation checklist for the next subagent
1. Re-open the configured LeCun 1998 sources.
2. Try to confirm a readable full-text path or a sufficiently trustworthy partial path.
3. Extract or verify the minimum conceptual anchors needed for this lesson:
   - local receptive fields
   - shared weights / kernel reuse
   - feature maps
   - optional pooling context
4. Record the outcome as `SOURCE_CONFIRMED`, `SOURCE_PARTIAL`, or `SOURCE_BLOCKED`.
5. Only then decide whether to implement, re-anchor, or defer.

## Decision heuristic
If the source situation is ambiguous, prefer a narrower but faithful lesson over a broader lesson with shaky source fidelity.

## Resolution
- **Outcome:** `SOURCE_PARTIAL`
- **Investigation report:** `references/notes/t4-convolution-source-investigation-2026-04-02.md`
- **Date:** 2026-04-02
