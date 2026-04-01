# dl-playground

An interactive deep learning playground for building intuition through explanation, visualization, and hands-on experimentation.

The project is evolving toward a learning experience where each lesson helps you understand **what a neural-network component does**, **why it exists**, and **how its behavior changes when you manipulate it**.

**Live demo:** https://dl-playground.vercel.app/

## Current direction

`dl-playground` has two complementary layers:

- **Web** — the main current focus: an interactive learning experience for deep learning
- **Sandbox** — a secondary layer for experiments, implementations, and research prototypes

Right now, the repository is primarily a **visual, interactive web for deep learning intuition**, not a generic experiment dump or model-serving project.

## Current status

Document roles in this repository:

- `web/src/content/learningPath.ts` — learner-facing source of truth used by the app for section structure, lesson metadata, and visible lesson sequencing
- `docs/web/content-map.md` — expanded curriculum decomposition beyond the currently shipped lessons
- `README.md` — concise entry-point summary for contributors

Implemented today:

- React + TypeScript + Vite frontend scaffold
- learning-path structure
- home page and overview flow
- interactive lesson: **Perceptron · weighted sum and bias**
- interactive lesson: **Perceptron · decision boundary intuition**
- interactive lesson: **MLP · activation functions and non-linearity**
- interactive lesson: **Gradient descent intuition**

Current learner-facing lesson order:

1. **Perceptron · weighted sum and bias**
2. **Perceptron · decision boundary intuition**
3. **MLP · activation functions and non-linearity**
4. **Gradient descent intuition**
5. **Convolution as local pattern detector** *(planned)*

Current top-level taxonomy:

- **Foundations**
  - **Perceptron**
  - **MLP**
  - **Optimization** *(this is where gradient descent formally lives)*
- **CNNs** *(kept as its own top-level section rather than folding convolution topics into foundations/mechanics)*
- **Stable Training**
- **Sequence & Memory**
- **Research**

Important rule: section taxonomy groups topics, while the learner-facing lesson order stays pedagogical and is sourced from `web/src/content/learningPath.ts`.

Immediate next lesson:

- **Convolution as local pattern detector**

Near-term queue after that:

- stable-training intuition modules
- deeper sequence and memory topics

For the canonical task state (`DONE`, `NEXT`, `QUEUED`) and the paper-readiness context behind that ordering, see:

- `docs/web/roadmap-status.md`
- `docs/web/subagent-working-philosophy.md`
- `references/operational-paper-set.md`

## Product intent

Each learning unit is designed to combine:

- **clear explanation**
- **visual representation**
- **meaningful interaction**
- **immediate feedback**

The goal is not just to describe deep learning concepts, but to make them feel more tangible and explorable.

## Roadmap

This roadmap is a contributor-facing summary of the current curriculum shape. For the learner-visible sequence in the app, defer to `web/src/content/learningPath.ts`. For the broader curriculum decomposition, defer to `docs/web/content-map.md`.

### 1. Foundations
Core thematic foundations and early intuition building.
- [x] **Perceptron:** weighted sum, bias, and decision boundaries.
- [x] **MLP:** activation functions and non-linearity.
- [x] **Optimization:** gradient descent intuition.
- [ ] Additional foundations pages such as tensors, losses, and training-vs-inference.

### 2. CNNs
Spatial pattern extraction and hierarchical visual feature building.
- [ ] **Convolutions:** local pattern detector, kernels and feature maps, receptive field intuition.
- [ ] **Deeper CNN intuition:** stacking convolutions and ResNet-style ideas.

### 3. Stable Training
Techniques that make optimization and depth behave reliably.
- [ ] **Initialization:** Xavier/He intuition.
- [ ] **Normalization and regularization:** BatchNorm/LayerNorm, dropout, weight decay.
- [ ] **Residual pathways:** why skip connections help.

### 4. Sequence & Memory
Stateful architectures and ordered-data modeling.
- [ ] **RNNs/LSTMs:** state management and BPTT intuition.
- [ ] **Transformers:** attention and representation mixing.
- [ ] **Long-term memory directions:** exploratory extensions beyond vanilla transformers.

### 5. Research
Advanced or exploratory topics beyond the core beginner curriculum.
- [ ] **Meta-learning:** bilevel and nested optimization concepts.
- [ ] **Nested learning:** experiments with Hope.

## Repository structure

```text
.
├── docs/web/      # product definition, architecture, MVP, backlog, scaffold plan
├── references/    # papers, notes, and source-material index for lessons/research
├── web/           # interactive frontend
└── README.md
```

Important docs:

- `docs/web/roadmap-status.md` — current status, current next lesson, and canonical planning links
- `docs/web/product-definition.md`
- `docs/web/content-map.md`
- `docs/web/mvp.md`
- `docs/web/architecture.md`
- `docs/web/backlog.md`
- `docs/web/scaffold-plan.md`

## Run the current project

The active runnable part of the repo is the web app.

```bash
cd web
pnpm install
pnpm dev
```

Other useful commands:

```bash
pnpm build
pnpm lint
```

## Vercel deployment

The recommended Vercel setup for this repository is:

- create the Vercel project from this repo
- set **Root Directory** to `web`
- keep the deployed app as a static SPA backed by the `web/vercel.json` configuration

This is important because the current frontend uses `react-router-dom` with `BrowserRouter`, so direct navigation to lesson URLs requires a rewrite to `index.html`.

## Tech stack

Current web stack:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS v4

The current SPA also includes a bilingual routing foundation for English and Spanish using locale-prefixed client routes (`/en/...`, `/es/...`) with in-app switching and persisted preference.

Associated research/programming direction:

- PyTorch

## Who this is for

This project is for people who want to understand deep learning more deeply through:

- visual explanations
- parameter manipulation
- progressive decomposition of concepts
- intuition before formalism overload

## Near-term goal

Build a small but genuinely useful interactive deep learning learning resource where each page teaches one concept clearly and lets the user experiment with it directly.
