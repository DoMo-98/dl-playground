# Web Architecture

## Goal of the Architecture

Provide a technical structure that supports the product goals of the interactive learning web:

- explanation
- visualization
- experimentation
- immediate feedback
- scalable addition of new learning pages

The architecture should optimize for pedagogical clarity and iteration speed, not premature complexity.

## Recommended Direction

Build the web as a frontend-first application with a strong component system for educational pages.

Recommended stack direction:

- **Framework:** React + Vite
- **Language:** TypeScript
- **Routing:** React Router
- **Styling:** Tailwind CSS (or equivalent utility-first styling)
- **Interactive visuals:** SVG + Canvas, with selective use of motion/animation libraries only where they improve teaching
- **State:** local React state first; lightweight shared state only when needed
- **Content model:** route/page driven, with reusable page primitives

This direction fits the product because it supports:

- reusable UI building blocks
- interactive controls
- visual rendering
- modular page composition
- easy expansion over time

## High-Level App Structure

```text
web/
  app/
    page.tsx
    learn/
      page.tsx
      foundations/
        perceptron/
          weighted-sum/page.tsx
          decision-boundary/page.tsx
        mlp/
          activations/page.tsx
        optimization/
          gradient-descent/page.tsx
      cnns/
        local-patterns/page.tsx
  components/
    layout/
    learning/
    controls/
    visualizations/
    ui/
  lib/
    learning/
    math/
    formatting/
  content/
    learning-path.ts
    pages/
  styles/
```

## Core Architectural Principle

The main unit of implementation should be the **interactive learning page**.

Each page should be assembled from reusable primitives rather than hardcoded from scratch.

## UI Component Policy

When deciding whether to build or buy a UI behavior, follow `ui-component-policy.md`.

Short version:

- keep visual composition, pedagogy, branding, and product language custom
- rely on robust primitives/libraries for complex interaction and accessibility behavior

This keeps the web flexible without re-implementing behavior-heavy UI from scratch.

## Recommended Page Composition Model

A page should be composed from these layers:

1. **Learning shell**
   - title
   - breadcrumbs / progression
   - page objective

2. **Explanation layer**
   - concise concept explanation
   - key takeaways

3. **Interactive lab layer**
   - visualization surface
   - controls
   - derived outputs

4. **Interpretation layer**
   - explain what changed and why

5. **Guided exploration layer**
   - prompts, mini-exercises, or comparisons

## Reusable Component Families

### 1. Layout Components
- `LearningPageLayout`
- `SectionBlock`
- `StickyControlsLayout`
- `LearningPathSidebar`

### 2. Pedagogical Components
- `ConceptSummary`
- `KeyIdeaCard`
- `TakeawayList`
- `GuidedExploration`
- `CommonMistakeNote`

### 3. Interaction Components
- `SliderControl`
- `ToggleControl`
- `SelectControl`
- `PlaybackControls`
- `ParameterPanel`

### 4. Visualization Components
- `NeuronDiagram`
- `DecisionBoundaryPlot`
- `FunctionPlot`
- `LossLandscapePlot`
- `KernelGrid`
- `FeatureMapView`
- `SequenceStateTimeline`
- `AttentionMatrixView`

### 5. Result Components
- `MetricBadge`
- `ResultSummary`
- `ChangeExplanation`
- `ComparisonView`

## Separation of Concerns

Keep these concerns separate:

### Pedagogy
The teaching structure and explanatory text.

### Simulation logic
The simplified math or behavioral model behind the interaction.

### Visualization rendering
The visual output of the current state.

### UI controls
The user inputs that manipulate the page state.

This separation will make pages easier to evolve and reuse.

## Simulation Philosophy

The web does not need full production-grade ML execution for every page.

Use the lightest valid simulation that teaches the intended concept well.

Examples:
- direct mathematical computation in browser for perceptrons and MLP toy examples
- simplified optimization landscapes for gradient descent
- small matrix or grid demos for convolution and attention
- reduced-scale educational abstractions when full realism would add noise

Rule:

> Prefer pedagogically faithful simplification over technically heavy realism when the latter hurts clarity.

## Content Representation Strategy

Use a hybrid approach:

### Static page metadata
For route identity and sequencing:
- title
- short title
- path
- section + unit
- prerequisites
- learning objectives
- key concepts
- estimated time
- readiness status

A lightweight curriculum registry should own this metadata so overview pages, route scaffolding, and future progression UI all derive from one source of truth.

### Component-driven page content
For the interactive experience itself.

This avoids over-abstracting content into CMS-like schemas too early while still keeping navigation structured.

## Routing Model

Use nested routes by learning path hierarchy.

Examples:
- `/learn`
- `/learn/foundations/optimization/gradient-descent`
- `/learn/foundations/perceptron/weighted-sum`
- `/learn/foundations/perceptron/decision-boundary`
- `/learn/foundations/mlp/activations`
- `/learn/cnns/convolutions/local-patterns`

Benefits:
- intuitive URL design
- scalable hierarchy
- easy grouping by topic

## State Model

Default to local page-level state.

Recommended pattern:
- controls update local state
- derived quantities are recomputed from that state
- visualization reacts immediately
- interpretation text can depend on derived state

Avoid introducing heavy global stores unless a real cross-page need appears.

## Visual Design Direction

The visual style should communicate:

- clarity
- calmness
- precision
- approachability

Recommendations:
- generous spacing
- restrained color system
- clear emphasis states
- animations used to explain, not decorate
- mobile-readable layouts even if some interactions work best on larger screens

## Accessibility Direction

Target reasonable accessibility from the start:

- semantic headings
- labeled controls
- keyboard-usable sliders/toggles where feasible
- sufficient contrast
- textual interpretation paired with visuals

Not every visualization will be fully accessible in its first version, but explanatory redundancy should be built in.

## Suggested Implementation Boundaries

### Phase 1: Frontend-only educational core
- all interactions computed in browser
- no backend dependency required
- fast iteration

### Phase 2: Optional deeper computation
Add only if needed later:
- heavier simulations
- generated exercises
- saved user progress
- integration with sandbox outputs

## Relationship with the Sandbox

The web and sandbox should stay conceptually related but technically decoupled at first.

Initial rule:
- the web should stand on its own as a learning product
- sandbox integration should be optional and deferred

Possible future bridge:
- selected sandbox experiments export reduced interactive demos into the web

## Architectural Success Criteria

The architecture is successful if:

- new pages can be added without rewriting core layout
- visualizations and controls are reusable
- the product remains understandable as content scales
- pedagogy remains the driver of technical decisions
- the MVP can be shipped without backend complexity
