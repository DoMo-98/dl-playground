# dl-playground subagent working philosophy

This document defines the persistent operating philosophy for subagents advancing `dl-playground`.

Its purpose is to keep implementation decisions consistent even when different runs or different agents touch the project over time.

---

## 1. Product type

`dl-playground` is an **interactive learning product grounded in canonical source papers**.

It is not:

- a generic deep-learning repo
- a passive note dump
- a loose collection of demos
- a sequence of lessons invented from vague prior knowledge

The correct model is:

**paper-grounded truth -> pedagogical distillation -> interactive lesson**

That means every meaningful implementation decision should optimize for:

- conceptual fidelity to the source papers
- pedagogical clarity
- visual intuition
- meaningful interaction
- immediate feedback
- low cognitive load
- incremental progression from simple to complex

If a change is visually attractive but conceptually misleading, it is the wrong default choice.

---

## 2. The paper is the source of truth

Every lesson should be anchored to one or more source papers.

Default rule:

- each lesson must have at least one **primary source paper**
- it may also have one or more **secondary support papers**
- blogs, tutorials, and generic explanations can help, but they are not the canonical truth layer

Subagents should treat the `references/` directory as the source-material system for lesson work.

The expected chain is:

`source paper(s) -> distilled mechanism -> lesson claim -> visualization -> interaction -> interpretation`

### 2.1 Mandatory source investigation when access is not confirmed

If a lesson's primary paper is not marked `full-text-ok` in `references/index.md`, the subagent must perform a **source investigation** before implementing the lesson.

This applies to both:
- `abstract-or-metadata-only`
- `blocked-or-closed`

Allowed outcomes:
- `SOURCE_CONFIRMED` — sufficient access/readability was found, so the paper can remain the main anchor
- `SOURCE_PARTIAL` — only partial confidence was achieved, so the lesson must either be clearly framed as provisional or be re-anchored
- `SOURCE_BLOCKED` — sufficient access was not achieved, so the subagent must propose an alternative paper, a reformulation, or a deferment

Hard rule:
- no lesson may be presented as a faithful distillation of a paper unless the source investigation confirms sufficient access to that paper

---

## 3. Lessons are translations, not summaries

A lesson should not be a paper summary pasted into the UI.

Instead, the lesson should translate the source paper into a form that lets the learner:

- see the mechanism
- manipulate the mechanism
- observe its effects
- form intuition about why it matters

Allowed:

- simplification for pedagogy
- narrowing scope to one teachable idea
- replacing formal wording with clearer language

Not allowed by default:

- distorting the mechanism until it becomes inaccurate
- inventing causal claims not supported by the source concept
- turning the lesson into a wall of academic exposition

---

## 4. One lesson = one core claim

Each lesson should teach **one central claim or mechanism** drawn from the source material.

Examples:

- a perceptron induces a linear decision boundary
- non-linearity changes what functions a network can represent
- learning rate changes the stability of gradient descent
- normalization changes training behavior by changing the scale/statistics the network sees

Subagents should avoid pages that try to teach too many claims at once.

If a lesson starts needing multiple distinct claims, split it.

---

## 5. Mandatory lesson design contract

Before implementing or revising a lesson, the subagent should be able to state all of these clearly:

1. **Primary source paper(s)**
2. **Secondary support paper(s)** if any
3. **Core teaching claim**
4. **What the learner will manipulate**
5. **What visible feedback should change**
6. **What simplification is being made**
7. **What conceptual fidelity must not be broken**

If these are unclear, the lesson is not ready for implementation.

---

## 6. Build intuition before formalism

Default teaching order:

1. show behavior
2. let the user manipulate it
3. explain the mechanism
4. only then introduce deeper formal framing if useful

Subagents should prefer:

- visible cause/effect over abstract description
- intuitive labels before mathematical jargon when possible
- simple demos before generalization
- short interpretation text over dense academic exposition

The target feeling is:

- “I can see what changed.”
- “I understand why this exists.”
- “I can predict what will happen if I modify it.”

---

## 7. Reuse before invention

When implementing a new lesson, subagents should first try to reuse:

- `LearningPageLayout`
- existing navigation patterns
- existing control styles
- existing explanatory section structure
- small math/visual helpers already in the app

The project should grow by composition, not by each lesson inventing a new mini-framework.

Create shared primitives when duplication is becoming real, not pre-emptively.

---

## 8. Exactly one meaningful roadmap task per run

Daily execution runs should complete **exactly one meaningful roadmap task** whenever feasible.

Preferred task shape:

- visible user-facing progress
- clear definition of done
- clean stopping point
- does not leave half-built UX unless that is explicitly the chosen deliverable

Bad default behavior:

- touching many unrelated files for tiny improvements
- mixing roadmap execution with broad speculative refactors
- partially implementing several lessons at once

---

## 9. Roadmap discipline

The active roadmap is operational, not decorative.

Subagents should:

- execute the task marked `NEXT` by default
- use the lesson's mapped source papers before implementing
- only replan when the task is stale, blocked, already done, or too large
- split oversized tasks into executable units
- preserve a single obvious next step after each run

The roadmap should always answer:

- what is already done
- what is next
- which paper(s) ground that lesson
- what claim the lesson is supposed to teach
- what counts as done

---

## 10. Current execution sequence

Until a strong reason appears to change it, the default execution order is:

1. Perceptron · decision boundary intuition
2. MLP · activation functions and non-linearity
3. Gradient descent intuition
4. Convolution as local pattern detector
5. Stable training lessons (initialization, activations, normalization, regularization)
6. Autoencoder lessons
7. Sequence and memory lessons
8. Research lessons

Rationale:

- preserve pedagogical continuity
- reuse earlier interaction patterns
- keep the MVP coherent before branching outward

---

## 11. Near-term paper priority

Given the currently implemented state of the app, the most important source papers for near-term lesson work are:

1. Rosenblatt (1958) — perceptron / decision boundary intuition
2. Rumelhart et al. (1986) — backpropagation / MLP transition
3. He et al. (2015) — rectifiers / activation behavior
4. Glorot & Bengio (2010) — initialization / training stability intuition
5. Ioffe & Szegedy (2015) — normalization / stable training

Subagents should treat these as the first-reference set for the next block of lesson creation.

---

## 12. UX rules for educational comfort

Subagents should optimize for mobile-friendly, low-friction reading and interaction.

Prefer:

- short explanation blocks
- visible parameter/result coupling
- simple labels
- one strong visualization over multiple weak ones
- progressive disclosure instead of overwhelming control density

Avoid by default:

- text walls
- overloaded dashboards
- controls with no clear teaching purpose
- decorative animations that do not improve understanding

---

## 13. Quality bar for shipping a lesson

A lesson is not done just because a route exists.

Minimum quality bar:

- the page is reachable
- the core claim is clear
- the interaction teaches something real
- the output visibly reacts to changes
- the interpretation text helps the user understand what happened
- the lesson remains faithful to the underlying source concept
- the page feels coherent with the rest of the app

If these are not true, the task should remain incomplete or be explicitly reframed as scaffold/unblocking work.

### 13.1 Testing rule for non-trivial functional changes

If a lesson or supporting app behavior changes in a non-trivial way, the subagent should add or update tests unless there is a clear written reason why tests do not apply.

Expected testing standard:

- prefer behavioral tests that prove the teaching interaction or user-visible behavior works
- avoid treating trivial markup-only assertions as sufficient coverage for functional changes
- cover the main path plus at least one meaningful edge case, regression risk, or failure mode
- run the applicable validation commands before claiming completion: test, coverage, lint, and build when available for the changed scope
- report in the final summary which tests were added or updated and what risk they cover; if none were added, state why

---

## 14. Summary style for subagent completions

When a subagent reports progress back to the main session, the summary should be:

- easy to scan
- concrete
- implementation-first
- source-aware
- focused on user-visible impact

Preferred format:

- what changed
- which task closed
- which source paper(s) grounded it
- which files changed
- why it matters
- what is next

---

## 15. Default decision heuristic

When uncertain, subagents should choose the option that best satisfies this stack, in order:

1. stronger conceptual fidelity to the source paper(s)
2. clearer learning experience
3. stronger visual intuition
4. meaningful interaction
5. cleaner reuse of existing app patterns
6. smaller and more reviewable execution step
7. better long-term extensibility

If a choice improves architecture but weakens conceptual fidelity or lesson clarity, it should usually lose.

---

## 16. Persistent principle

`dl-playground` should evolve like a carefully designed interactive textbook grounded in primary sources, chapter by chapter, not like a loose collection of demos.

That means each run should make the product:

- more faithful to the core concepts
- clearer
- more teachable
- more cohesive
- easier to extend without increasing cognitive clutter
