# T1 source investigation — Perceptron · decision boundary intuition

Date (UTC): 2026-03-29T17:16:00Z
Task: `T1 — Perceptron · decision boundary intuition`
Primary anchor under investigation: Frank Rosenblatt (1958) — *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain*

## Goal
Determine whether the current environment has enough practical access to the primary paper to build the lesson as a faithful paper-grounded distillation.

## Sources checked
1. DOI landing page: `https://doi.org/10.1037/h0042519`
   - Result: no acceptable readable full text obtained from current tooling.
2. PubMed metadata page: `https://pubmed.ncbi.nlm.nih.gov/13602029/`
   - Result: metadata only.
   - Confirmed bibliographic details, but PubMed explicitly shows `No abstract available` and does not provide readable article text.
3. APA PsycNet record: `https://psycnet.apa.org/record/1959-09865-001`
   - Result: loading shell only from current tooling; no readable article text confirmed.
4. Project Euclid historical route attempt
   - Result: blocked behind anti-bot / unavailable path from current environment; no readable article text confirmed.

## Outcome
`SOURCE_BLOCKED`

## Why this is blocked
The current environment can confirm the paper exists and is the right historical anchor, but cannot obtain a practically readable full text or equivalent sufficiently detailed open copy.

That means we should **not** present a new lesson as a faithful distillation of Rosenblatt (1958) yet.

## Safe implication for roadmap execution
Do not implement `Perceptron · decision boundary intuition` as a paper-faithful lesson under the current anchor until one of these happens:
- a readable full-text source is confirmed for Rosenblatt (1958), or
- the lesson is re-anchored to an accessible canonical source that covers the linear decision-boundary mechanism clearly enough.

## Recommended next move
Create a small roadmap follow-up task to **re-anchor or reformulate** the lesson:
- keep Rosenblatt (1958) as historical context if desired
- choose an accessible canonical source for the linear-separator / hyperplane intuition
- then implement the lesson under that confirmed anchor

## Notes for future run
The existing implemented lesson `Perceptron · weighted sum and bias` already provides a good experiential bridge. Once an accessible anchor is confirmed, the decision-boundary lesson can likely be implemented quickly with:
- a 2D plane visualization
- weight/bias controls
- immediate movement of the separating line
- clear warning that a single perceptron remains linear only
