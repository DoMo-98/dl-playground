# Initial Scaffold Plan

> **Note:** This document is an early planning artifact and does not reflect what was actually built. The component families listed below (Panel, Slider, Toggle, etc.) are aspirational — none were implemented as described. See `web/src/components/` for the current, simpler component structure.

## Goal

Define the initial filesystem scaffold for the interactive web so implementation can begin with a clean, reusable structure.

## Chosen Stack

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS
- SVG/Canvas for visualizations
- frontend-only initial architecture

## Top-Level Structure

```text
web/
  public/
  src/
    app/
    pages/
    components/
    features/
    lib/
    content/
    styles/
    main.tsx
  index.html
  package.json
  tsconfig.json
  vite.config.ts
```

## Proposed `src/` Layout

```text
src/
  app/
    App.tsx
    routes.tsx
    providers.tsx
    layout/
      SiteShell.tsx
      LearnShell.tsx

  pages/
    home/
      HomePage.tsx
    learn/
      LearnOverviewPage.tsx
    lessons/
      foundations/
        perceptron/
          WeightedSumPage.tsx
          DecisionBoundaryPage.tsx
        mlp/
          ActivationsPage.tsx
        optimization/
          GradientDescentPage.tsx
      cnns/
        LocalPatternsPage.tsx

  components/
    ui/
      Button.tsx
      Card.tsx
      Panel.tsx
      Slider.tsx
      Toggle.tsx
      Select.tsx
    layout/
      PageHeader.tsx
      SidebarNav.tsx
      Breadcrumbs.tsx
    learning/
      LearningPageLayout.tsx
      ConceptSummary.tsx
      TakeawayList.tsx
      GuidedExploration.tsx
      InterpretationPanel.tsx
      ParameterPanel.tsx
      VisualizationPanel.tsx

  features/
    perceptron/
      components/
        NeuronDiagram.tsx
        DecisionBoundaryPlot.tsx
      lib/
        perceptronMath.ts
      data/
        samples.ts
    activations/
      components/
        FunctionPlot.tsx
      lib/
        activationMath.ts
    gradient-descent/
      components/
        LossLandscapePlot.tsx
      lib/
        gradientDescentMath.ts
    convolution/
      components/
        KernelGrid.tsx
        FeatureMapView.tsx
      lib/
        convolutionMath.ts

  lib/
    math/
      scales.ts
      interpolation.ts
    utils/
      cn.ts
    learning/
      sequencing.ts

  content/
    learningPath.ts
    lessons.ts

  styles/
    globals.css
    tokens.css
```

## Routing Recommendation

Use route paths like:

- `/`
- `/learn`
- `/learn/foundations/perceptron/weighted-sum`
- `/learn/foundations/perceptron/decision-boundary`
- `/learn/foundations/mlp/activations`
- `/learn/foundations/optimization/gradient-descent`
- `/learn/cnns/convolutions/local-patterns`

## Responsibility Split

### `pages/`
Route entrypoints and lesson assembly.

### `components/`
Reusable UI and pedagogical building blocks.

### `features/`
Topic-specific simulation logic and visualization components.

### `lib/`
Shared utilities and generic math helpers.

### `content/`
Learning path metadata, sequencing, and lesson descriptors.

## First Files to Create

### App shell
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/routes.tsx`
- `src/app/layout/SiteShell.tsx`
- `src/app/layout/LearnShell.tsx`

### Core UI primitives
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Panel.tsx`
- `src/components/ui/Slider.tsx`

### Learning primitives
- `src/components/learning/LearningPageLayout.tsx`
- `src/components/learning/ConceptSummary.tsx`
- `src/components/learning/ParameterPanel.tsx`
- `src/components/learning/VisualizationPanel.tsx`
- `src/components/learning/InterpretationPanel.tsx`
- `src/components/learning/GuidedExploration.tsx`

### First pages
- `src/pages/home/HomePage.tsx`
- `src/pages/learn/LearnOverviewPage.tsx`
- `src/pages/lessons/foundations/perceptron/WeightedSumPage.tsx`

### First feature logic
- `src/features/perceptron/components/NeuronDiagram.tsx`
- `src/features/perceptron/lib/perceptronMath.ts`

## Recommended First Milestone

The first milestone should deliver:

- app scaffold running locally
- routing operational
- basic site and learning layout
- `/learn` overview page
- first interactive lesson: perceptron weighted sum and bias

## Guiding Rule

Prefer explicit, small, reusable files over clever abstraction in the first iteration.
