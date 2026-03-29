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

Implemented today:

- React + TypeScript + Vite frontend scaffold
- learning-path structure
- home page and overview flow
- first interactive lesson: **Perceptron · weighted sum and bias**

Planned next:

- more perceptron lessons
- MLP mechanics and non-linearity
- CNN intuition modules
- deeper sequence and memory topics

## Product intent

Each learning unit is designed to combine:

- **clear explanation**
- **visual representation**
- **meaningful interaction**
- **immediate feedback**

The goal is not just to describe deep learning concepts, but to make them feel more tangible and explorable.

## Roadmap

### 1. Architectural Mechanics (/mechanics)
Low-level implementations to analyze signal flow and inductive biases.
- [ ] **Dense Networks:** Perceptron and MLP implementations.
- [ ] **Stable Training:** Initialization (Xavier/He), activations (ReLU/GELU), regularization (dropout, weight decay), normalization (BatchNorm/LayerNorm), and residual connections.
- [ ] **CNNs:** ResNet architecture.
- [ ] **Autoencoders:** Latent space compression and manifold visualization.

### 2. Sequence & Memory (/memory)
Prototyping stateful architectures and sequence modeling.
- [ ] **RNNs/LSTMs:** State management and Backpropagation Through Time (BPTT).
- [ ] **Transformers:** Multi-head attention mechanisms.
- [ ] **Titans:** Long-term memory architectures.

### 3. Research: Optimization & Meta-Learning (/research)
Advanced optimization techniques and nested learning loops.
- [ ] **Meta-Learning:** Bilevel and nested optimization concepts.
- [ ] **Nested Learning:** Experiments with Hope.

## Repository structure

```text
.
├── docs/web/      # product definition, architecture, MVP, backlog, scaffold plan
├── web/           # interactive frontend
└── README.md
```

Important docs:

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

## Tech stack

Current web stack:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS v4

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
