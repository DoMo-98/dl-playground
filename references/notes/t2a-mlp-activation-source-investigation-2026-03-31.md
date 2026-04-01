# T2a — MLP · activation functions and non-linearity · source investigation

Date: 2026-03-31
Outcome: SOURCE_CONFIRMED

## Scope

Confirm whether the planned primary anchor for the MLP non-linearity lesson can be read directly enough from the current environment to support a faithful lesson design.

## Primary paper investigated

- Rumelhart, Hinton, Williams (1986) — *Learning representations by back-propagating errors*

## Evidence collected

### 1. Nature landing page is only partial from current tooling
- URL checked: `https://www.nature.com/articles/323533a0`
- Result: the page is reachable and exposes the abstract plus metadata, but not the full article body from the current environment.
- Interpretation: the publisher page alone remains `abstract-or-metadata-only` for this setup.

### 2. Author-hosted full PDF is directly reachable
- URL checked: `https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf`
- Result: HTTP 200, content type `application/pdf`, content length `485917`.
- Interpretation: this is a practical readable full-text route from the current environment and is sufficient to treat the paper as operationally accessible.

### 3. Redundant mirrored full-text copies are also reachable
- URL checked: `https://raw.githubusercontent.com/tpn/pdfs/master/Learning%20Representations%20by%20Back-Propagating%20Errors%20(1986).pdf`
- Result: HTTP 200, binary PDF payload accessible.
- Interpretation: not the preferred canonical route, but useful as a resilience backup.

## Operational decision

The primary anchor does **not** need to be replaced.

Even though the Nature page itself is partial in this environment, the author-hosted PDF provides a workable full-text path, so the paper can remain the primary source for the lesson.

## Implication for roadmap execution

- The source-investigation requirement for the MLP non-linearity lesson is now closed.
- The next run can move directly into implementation work for the lesson without another access audit.
- He et al. (2015) remains the best supporting paper for activation-specific contrasts (especially ReLU-family behavior), but Rumelhart et al. (1986) can stay as the conceptual primary anchor for the linear-vs-hidden-representation transition.

## Lesson-design guidance unlocked by this investigation

For the implementation run, the safest claim remains:

> Stacking linear layers does not buy useful new expressivity by itself; hidden layers become meaningfully expressive when non-linear transformations are introduced.

Recommended first visual framing for the lesson:
- compare a purely linear stack against the same small network with selectable activations
- keep the visualization focused on output/function shape rather than full training
- use He et al. (2015) only to support activation comparisons, not to replace the core historical role of Rumelhart et al. (1986)
