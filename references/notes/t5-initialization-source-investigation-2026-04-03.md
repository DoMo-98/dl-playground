# T5 — Initialization · bad vs stable · source investigation (retroactive)

Date: 2026-04-03
Outcome: SOURCE_CONFIRMED

## Context

This note is a retroactive documentation of sources. The initialization lesson was already implemented before this source investigation note was created. The purpose is to close the gap in the per-lesson source trail and confirm that the implementation aligns with readable primary sources.

## Scope

Confirm that the initialization lesson at `web/src/features/initialization/` is faithfully grounded in accessible source material, covering weight initialization strategies, variance analysis across layers, and stability regimes (vanishing / stable / exploding).

## Primary paper investigated

- Glorot & Bengio (2010) — *Understanding the difficulty of training deep feedforward neural networks*

## Secondary paper investigated

- He, Zhang, Ren, Sun (2015) — *Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification*

## Evidence collected

### 1. Glorot & Bengio (2010) — full-text-ok

- Operational source index already marks this paper as `full-text-ok`.
- Practical route is the PMLR proceedings page plus linked PDF:
  - `https://proceedings.mlr.press/v9/glorot10a.html`
  - `https://proceedings.mlr.press/v9/glorot10a/glorot10a.pdf`
- The readable proceedings page directly covers the concepts used in the lesson:
  - variance of activations across layers under different initialization scales
  - vanishing and exploding signal regimes
  - the Xavier initialization rule: weight variance = 1/fan_in (or the harmonic mean variant 2/(fan_in + fan_out))
  - empirical analysis of activation and gradient statistics layer by layer
- Conclusion: sufficient operational readability confirmed. This is the primary anchor for the lesson.

### 2. He et al. (2015) — abstract-or-metadata-only

- Operational source index marks this paper as `abstract-or-metadata-only`.
- The ICCV proceedings page and arXiv metadata confirm the core claim relevant to this lesson:
  - Xavier initialization underestimates variance for ReLU networks because ReLU zeroes out half the signal
  - He initialization corrects this with weight variance = 2/fan_in
- The lesson implements He initialization as `Math.sqrt(2 / fanIn)`, which matches the published derivation.
- Conclusion: metadata-level access is sufficient to confirm the He initialization formula used in the lesson. A full-text reading pass would strengthen confidence but is not required for the narrow claim made here.

## Alignment between sources and implementation

The lesson code (`web/src/features/initialization/lib/initialization.ts`) implements four initialization modes that map cleanly to the source material:

| Lesson mode | Weight std formula | Source grounding |
|---|---|---|
| `tiny` | 0.12 (constant, too small) | Pedagogical contrast: demonstrates vanishing regime described in Glorot & Bengio Sec. 4 |
| `xavier` | sqrt(1/fan_in) | Glorot & Bengio (2010), Eq. 12 / normalized initialization |
| `he` | sqrt(2/fan_in) | He et al. (2015), correcting for ReLU's zero-half property |
| `large` | 1.35 (constant, too large) | Pedagogical contrast: demonstrates exploding regime described in Glorot & Bengio Sec. 4 |

The lesson also supports two activation modes (`tanh`, `relu`) and computes per-layer statistics (activation std, gradient std, zero fraction), which directly reflect the layer-by-layer variance analysis methodology from Glorot & Bengio.

The stability regime classifier uses thresholds on final-layer activation std and first-layer gradient std to label outputs as vanishing, stable, or exploding — a simplified but faithful reflection of the signal propagation analysis in both papers.

## Operational conclusion

`SOURCE_CONFIRMED`

The primary anchor (Glorot & Bengio, 2010) has confirmed full-text readability and directly supports the lesson's core teaching claims. The secondary anchor (He et al., 2015) has sufficient metadata-level access to confirm the He initialization formula. The implementation is faithfully grounded.

## Pedagogical anchor confirmed by this investigation

The lesson teaches:

> Weight initialization scale controls whether signals and gradients vanish, explode, or remain stable as they propagate through layers. Xavier and He initialization derive the right scale from layer width and activation function to keep variance approximately constant.

## Fidelity boundaries

- The lesson correctly does **not** claim to reproduce the full experimental setup from either paper.
- The `tiny` and `large` modes are pedagogical bookends, not claims from the papers.
- The lesson does **not** overreach into batch normalization or other stabilization techniques.
- The network architecture (5 layers, widths 6-8-8-8-8) is a teaching simplification, not a paper reproduction.

## Roadmap effect

No split needed. The lesson is already implemented. This note closes the source trail retroactively:
- `T5a` — source investigation (`DONE`, retroactive)
- `T5b` — implementation (`DONE`, already merged)
