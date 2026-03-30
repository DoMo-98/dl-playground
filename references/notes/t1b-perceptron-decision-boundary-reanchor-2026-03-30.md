# T1b — Perceptron decision boundary re-anchor note (2026-03-30)

## Status

- Task: `T1b — Perceptron · decision boundary intuition`
- Outcome: `SOURCE_PARTIAL -> safe operational re-anchor accepted`

## Why re-anchor was needed

Rosenblatt (1958) remains the historical anchor for the perceptron, but it is still not practically readable enough from the current working environment to support a confident paper-faithful implementation pass.

That keeps it useful as **historical context**, not as the strongest day-to-day implementation anchor for this lesson run.

## Operational re-anchor used for implementation

This lesson is implemented against the stable, canonical perceptron interpretation that a single perceptron defines a **linear separator / hyperplane** and changes classification by changing weights and bias.

For this run, the implementation anchor is therefore:

- historical context: Rosenblatt (1958)
- operational teaching anchor: the classic linear-separator formulation used consistently across perceptron literature

## Teaching claim preserved

A single perceptron induces one straight decision boundary in 2D. Changing weights rotates that boundary; changing bias shifts it.

## Fidelity guardrails kept in the page

- no training story was added
- no claim was made that a single perceptron solves non-linear separation
- an XOR-style preset was included specifically to preserve that limit visibly

## Practical result

This re-anchor was considered safe because the implemented lesson teaches only the narrow geometric claim above, which is canonical, stable, and explicitly limited.
