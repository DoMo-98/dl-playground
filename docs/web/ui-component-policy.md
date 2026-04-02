# UI Component Policy

## Purpose

Keep the product's visual language custom where it matters, while relying on proven primitives for complex interaction behavior.

## Operating Rule

> Externalize complex behavior. Keep visual composition and product language in-house.

## Policy

- Do **not** reinvent the wheel for components with complex UX or accessibility behavior.
- Prefer robust primitives or well-maintained libraries for behavior such as:
  - focus management
  - keyboard navigation
  - overlays and stacking
  - dismiss behavior
  - portals
  - complex ARIA patterns
  - modal and non-modal interaction rules
- Keep product-specific composition custom when it expresses the `dl-playground` brand, pedagogy, or layout:
  - page shells
  - lesson layouts
  - branded cards and callouts
  - curriculum-specific navigation
  - domain-specific controls and visualization wrappers
- Choose the smallest abstraction that gives reliable behavior without giving up too much flexibility.

## Practical Guidance for This Project

Use external primitives or behavior helpers for components such as:

- **Mobile menu / sheet** — open/close state, focus trap, escape handling, outside click, portal layering
- **Dialog** — modal semantics, focus return, aria wiring, overlay dismissal
- **Popover** — anchored positioning, collision handling, focus behavior, dismiss logic
- **Tooltip** — trigger semantics, delay behavior, aria relationships, layering
- **Complex composite controls** — roving tabindex, keyboard navigation, typeahead, selection state

Keep custom implementations for components such as:

- **Lesson page composition** — `LearningPageLayout`, section structure, explanatory blocks
- **Brand and pedagogy surfaces** — hero areas, cards, content framing, curriculum overview blocks
- **Domain-specific UI** — parameter panels, learning callouts, visualization wrappers, interpretation panels
- **Product layout language** — shell composition, spacing systems, page rhythm, branded navigation presentation

## Decision Heuristic

When adding or refactoring a component, ask:

1. Is the hard part mostly interaction behavior or accessibility mechanics?
   - If yes, start from a primitive/library.
2. Is the hard part mostly visual composition, pedagogy, or product language?
   - If yes, keep it custom.
3. Does a hybrid approach work better?
   - Use a primitive for behavior and wrap it with project-specific styling and composition.

## Default Recommendation

For `dl-playground`, default to:

- **external primitives for behavior-heavy UI**
- **custom components for educational composition and brand expression**

This keeps the app robust without flattening its product identity.
