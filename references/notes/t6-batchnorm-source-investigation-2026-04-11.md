# T6a — Normalization · BatchNorm intuition · source investigation

Date: 2026-04-11
Outcome: SOURCE_CONFIRMED

## Scope

Confirm whether the planned BatchNorm lesson can be grounded in a practically readable primary source from the current environment, and define the safe implementation envelope for the next lesson run.

## Primary paper investigated

- Ioffe, Szegedy (2015) — *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*

## Evidence collected

### 1. PMLR proceedings page is directly readable from the current environment
- URL checked: `https://proceedings.mlr.press/v37/ioffe15.html`
- Result: the proceedings page is reachable and exposes the paper title, abstract, citation metadata, and direct PDF link in a clean readable HTML page.
- Relevant readable claims confirmed there:
  - training gets harder when layer-input distributions shift during optimization,
  - BatchNorm normalizes activations using training mini-batches,
  - normalization enables higher learning rates and reduces sensitivity to initialization,
  - the method uses a train-time batch-based mechanism rather than a generic fixed rescaling.

### 2. Official PDF route is open and fetchable
- URL checked: `https://proceedings.mlr.press/v37/ioffe15.pdf`
- Result: HTTP 200 and downloadable PDF confirmed from the same official proceedings source.
- Limitation: this run did not get a comfortable local PDF text extraction through the currently installed shell tooling.
- Interpretation: despite that local extraction limitation, the combination of readable official proceedings HTML plus open official PDF access is sufficient operational evidence for this lesson family, consistent with the earlier MVP source-grounding audit.

### 3. Prior project audit already treated this paper as source-ready
- Existing note: `references/notes/t0-mvp-source-grounding-closure-2026-03-30.md`
- Prior conclusion already recorded there: `Ioffe & Szegedy (2015)` is practically readable enough for BatchNorm lesson work.
- This run closes the per-task source trail so the roadmap no longer depends on that earlier high-level audit implicitly.

## Operational decision

`SOURCE_CONFIRMED`

The BatchNorm lesson can move from source investigation into implementation planning/execution. The primary anchor is sufficiently readable for the intended pedagogical scope.

## Safe implementation envelope unlocked

Recommended core teaching claim for the next task:

> BatchNorm stabilizes hidden activations during training by normalizing each feature with mini-batch statistics, then restoring learnable scale and shift.

Recommended interaction scope for the implementation run:
- toggle `with BatchNorm` / `without BatchNorm`
- show one small batch flowing through a hidden layer
- expose per-feature batch mean and variance
- visualize normalized activations before/after affine rescaling
- contrast train-time batch statistics with inference-time running statistics at a simplified level

Recommended fidelity boundaries:
- do not present BatchNorm as a generic per-example normalization, because the batch dependency is the main mechanism
- do not erase the train-vs-inference distinction
- do not overclaim that BatchNorm universally replaces all regularization or solves optimization on its own
- keep the lesson focused on activation statistics and stability, not on reproducing ImageNet-scale experiments

## Roadmap effect

This task should be represented operationally as:
- `T6a` — source investigation (`DONE`)
- `T6b` — `Normalization · BatchNorm intuition` implementation (`NEXT`)

That keeps the source-readiness rule explicit and lets the next implementation run proceed without repeating the access audit.
