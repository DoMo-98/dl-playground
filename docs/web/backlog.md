# Initial Web Backlog

## Objective

Translate the product definition and MVP into an execution-ready backlog.

---

## Phase 0 — Foundation and alignment

### 0.1 Confirm technical direction
- [x] choose framework direction (React + Vite + TypeScript)
- [x] choose styling approach (Tailwind CSS)
- [x] define that the web will live inside `web/`
- [ ] decide initial supporting libraries (`clsx`, icon set, optional small math/visual helpers)

### 0.2 Lock initial information architecture
- [ ] confirm top-level routes
- [ ] confirm naming of sections (`foundations`, `mechanics`, `memory`, `research`)
- [ ] confirm URL conventions for learning pages

### 0.3 Persist planning links
- [ ] link all web planning docs from the main README or a web index page

---

## Phase 1 — App skeleton

### 1.1 Bootstrap the web app
- [ ] create app scaffold
- [ ] configure TypeScript
- [ ] configure styling system
- [ ] define base layout

### 1.2 Build navigation shell
- [ ] landing page
- [ ] learning path overview page
- [ ] top navigation / sidebar
- [ ] previous / next learning navigation

### 1.3 Establish shared UI primitives
- [ ] buttons
- [ ] cards
- [ ] sliders
- [ ] toggles
- [ ] panels
- [ ] callouts

---

## Phase 2 — Learning page system

### 2.1 Build reusable page primitives
- [ ] `LearningPageLayout`
- [ ] `ConceptSummary`
- [ ] `ParameterPanel`
- [ ] `VisualizationPanel`
- [ ] `InterpretationPanel`
- [ ] `GuidedExploration`

### 2.2 Define page authoring pattern
- [ ] decide how page metadata is stored
- [ ] define a standard file pattern for new pages
- [ ] define how prerequisites and sequencing are declared

---

## Phase 3 — MVP interactive pages

### 3.1 Learning path overview
- [ ] roadmap overview page
- [ ] explain how to use interactive lessons
- [ ] show progression through the curriculum

### 3.2 Perceptron: weighted sum and bias
- [ ] build input/weight/output visualization
- [ ] add controls for weights and bias
- [ ] show output update live
- [ ] add concise interpretation text

### 3.3 Perceptron: decision boundary intuition
- [ ] visualize 2D classification space
- [ ] expose boundary parameters
- [ ] support dragging or adjusting points if feasible
- [ ] explain linear separability intuition

### 3.4 MLP: activation functions and non-linearity
- [ ] create activation comparison view
- [ ] allow switching between functions
- [ ] visualize effect on output behavior
- [ ] add guided exploration prompts

### 3.5 Gradient descent intuition
- [ ] implement toy loss landscape
- [ ] expose learning rate control
- [ ] allow step-by-step or autoplay descent
- [ ] show convergence vs instability

### 3.6 Convolution as local pattern detector
- [ ] create input grid/image playground
- [ ] let user edit kernel values
- [ ] animate or step through convolution
- [ ] display resulting feature map

---

## Phase 4 — Quality and coherence

### 4.1 UX polish
- [ ] ensure pages are visually consistent
- [ ] reduce unnecessary text density
- [ ] improve mobile readability

### 4.2 Educational polish
- [ ] ensure each page teaches one clear idea
- [ ] add guided mini-explorations
- [ ] align interpretation text with interaction outcomes

### 4.3 Technical polish
- [ ] factor duplicated math helpers into shared modules
- [ ] factor duplicated visualization patterns into reusable components
- [ ] review performance of interactive rendering

---

## Nice-to-have after MVP

- [ ] glossary page
- [ ] shared legend for visual encodings
- [ ] compare-two-configurations mode
- [ ] lightweight progress tracking
- [ ] links from web pages to deeper sandbox experiments

---

## Suggested Build Order

1. technical stack decision
2. app skeleton
3. reusable page shell
4. learning path overview
5. perceptron weighted sum
6. perceptron decision boundary
7. activations
8. gradient descent
9. convolution
10. polish and reuse pass
