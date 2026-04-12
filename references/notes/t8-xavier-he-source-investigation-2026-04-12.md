# T8 — Initialization · Xavier and He intuition · source investigation

Date: 2026-04-12
Outcome: SOURCE_CONFIRMED

## Context

The roadmap's next lesson after the already shipped `bad init vs stable init` page is a narrower explanation of why Xavier and He choose different scales.

This investigation closes the remaining source-readiness gap before implementing that lesson directly.

## Scope

Confirm that the lesson can be anchored to readable primary material for:

- Xavier initialization as a variance-preserving rule for deep feedforward networks
- He initialization as the rectifier-aware correction for ReLU-family activations

## Primary paper investigated

- Glorot & Bengio (2010) — *Understanding the difficulty of training deep feedforward neural networks*

## Secondary paper investigated

- He, Zhang, Ren, Sun (2015) — *Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification*

## Evidence collected

### 1. Glorot & Bengio (2010) — full-text-ok

- The existing source index already marks the paper as `full-text-ok`.
- The operational route remains readable via the official PMLR HTML page and linked PDF:
  - `https://proceedings.mlr.press/v9/glorot10a.html`
  - `https://proceedings.mlr.press/v9/glorot10a/glorot10a.pdf`
- This source directly supports the lesson claim that initialization scale should keep variance from drifting across depth, and that Xavier is derived from layer width statistics.

### 2. He et al. (2015) — full-text-ok

- The official ICCV Open Access page is readable from the current environment and exposes the abstract plus a direct PDF link:
  - `https://openaccess.thecvf.com/content_iccv_2015/html/He_Delving_Deep_into_ICCV_2015_paper.html`
  - `https://openaccess.thecvf.com/content_iccv_2015/papers/He_Delving_Deep_into_ICCV_2015_paper.pdf`
- Live checks from this run confirmed HTTP 200 for both the HTML page and the PDF.
- The official page makes the relevant claim explicit: the initialization method is derived to account for rectifier nonlinearities and lets very deep rectified networks train from scratch.
- This is enough to upgrade the paper from `abstract-or-metadata-only` to `full-text-ok` for the narrow lesson scope.

## Operational conclusion

`SOURCE_CONFIRMED`

The upcoming lesson can now stay anchored to:

- primary: Glorot & Bengio (2010)
- secondary: He et al. (2015)

No further source-investigation pass is needed before implementation.

## Pedagogical anchor confirmed by this investigation

The lesson should teach:

> Xavier and He are not arbitrary presets. They choose weight scale from fan-in or fan-in/fan-out so that signal variance stays better behaved across depth, with He adding the rectifier-aware correction needed for ReLU-family activations.

## Fidelity boundaries

- The lesson should compare variance-preserving intuition, not reproduce ImageNet experiments.
- It should not collapse Xavier and He into “basically the same” because the rectifier correction is the core teaching contrast.
- It should stay focused on initialization-scale reasoning, not expand into full activation-comparison territory.

## Roadmap effect

- `Initialization · Xavier and He intuition` is now source-ready for direct implementation.
- The next run should implement the lesson itself rather than repeat source validation.
