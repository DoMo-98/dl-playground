# T3 source investigation — Gradient descent intuition

Date: 2026-04-01
Task: `T3 — Gradient descent intuition`
Result: `SOURCE_CONFIRMED`

## Goal

Confirm that the next gradient-descent lesson can be grounded with sufficient readable source access instead of relying on vague prior knowledge.

## Candidate source set

### Primary
- Rumelhart, Hinton, Williams (1986) — *Learning representations by back-propagating errors*

### Secondary
- Glorot & Bengio (2010) — *Understanding the difficulty of training deep feedforward neural networks*

## Access check

### Rumelhart et al. (1986)
- Operational source index already marks this paper as `full-text-ok`.
- Canonical prior note: `references/notes/t2a-mlp-activation-source-investigation-2026-03-31.md`.
- Practical route remains the Geoffrey Hinton author-hosted PDF backup:
  - `https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf`
- Conclusion: readable-enough operational route already confirmed for the gradient/backprop anchor.

### Glorot & Bengio (2010)
- Operational source index already marks this paper as `full-text-ok`.
- Practical route remains the readable PMLR proceedings page plus linked PDF:
  - `https://proceedings.mlr.press/v9/glorot10a.html`
  - `https://proceedings.mlr.press/v9/glorot10a/glorot10a.pdf`
- The readable proceedings page explicitly covers the parts most relevant to this lesson family:
  - why standard gradient descent can behave poorly from random initialization
  - saturation / plateaus
  - how gradients and activations vary across layers
  - why training can become unstable or slow
- Conclusion: sufficient operational readability is confirmed for the stabilization contrast needed in a simplified gradient-descent lesson.

## Operational conclusion

`SOURCE_CONFIRMED`

The lesson can now be implemented without another access pass.

## Pedagogical anchor for the future implementation

Recommended claim for the implementation task:
- gradient descent updates parameters by following local slope information, and the visible behavior of those updates depends strongly on step size and local geometry.

Recommended simplification:
- use a small 1D or 2D loss landscape rather than a full network-training simulation.

Recommended fidelity boundary:
- do not present gradient descent as guaranteed stable convergence;
- preserve visible contrast between convergence, overshoot, and oscillation;
- treat Glorot & Bengio as the supporting source for why optimization dynamics can degrade, not as a pretext to overload the lesson with initialization theory.

## Roadmap effect

The old combined `T3` item was too broad for the current source-readiness rule. It should now be split into:
- `T3a` — source investigation (`DONE`)
- `T3b` — implementation (`NEXT`)
