# Operational paper set for lesson authoring

Purpose: define the subset of papers that can be used right now for low-friction lesson work in `dl-playground`.

Rule:
- prefer papers with `full-text-ok`
- use `abstract-or-metadata-only` papers only when the key claim is already well-established and the lesson does not depend on subtle details from the original text
- avoid making a blocked paper the sole epistemic anchor for a lesson until an open readable source is secured

## Tier A — ready now (`full-text-ok`)

These are safe default anchors for immediate lesson work.

### Mechanics / stable training
- 2013 — Auto-Encoding Variational Bayes
- 2015 — Deep Residual Learning for Image Recognition
- 2016 — Layer Normalization
- 2018 — UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction

### Memory
- 2017 — Attention Is All You Need
- 2019 — Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context
- 2024 — Titans: Learning to Memorize at Test Time

### Research
- 2016 — Learning to learn by gradient descent by gradient descent
- 2025 — Nested Learning: The Illusion of Deep Learning Architectures

## Tier B — usable with caution (`abstract-or-metadata-only`)

These can still support lesson planning, but should not be the only fidelity anchor when the lesson depends on details not visible from the abstract/metadata path.

- 1958 — The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain
- 1986 — Learning representations by back-propagating errors
- 2008 — Visualizing Data using t-SNE
- 2010 — Understanding the difficulty of training deep feedforward neural networks
- 2014 — Dropout: A Simple Way to Prevent Neural Networks from Overfitting
- 2015 — Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification
- 2015 — Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift
- 2015 — Gradient-based Hyperparameter Optimization through Reversible Learning
- 2017 — Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks
- 2018 — Bilevel Programming for Hyperparameter Optimization and Meta-Learning

## Tier C — blocked for now (`blocked-or-closed`)

Do not make these the sole required source for a lesson until an open readable route is found.

- 2006 — Reducing the Dimensionality of Data with Neural Networks
- 2008 — Extracting and Composing Robust Features with Denoising Autoencoders
- 1990 — Backpropagation through time: what it does and how to do it
- 1997 — Long Short-Term Memory

## Practical substitution policy

When a blocked paper is in the roadmap, use one of these strategies:

### 1. Keep the concept, swap the anchor
Use an adjacent open paper that supports the same teaching objective closely enough for an MVP lesson.

Examples:
- autoencoder bottleneck / latent-space lessons:
  - prefer `2013 — Auto-Encoding Variational Bayes`
  - optionally pair with `2018 — UMAP` for latent-space exploration UI ideas
- long-context / memory lessons:
  - prefer `2017 — Attention Is All You Need`
  - then `2019 — Transformer-XL`
  - then `2024 — Titans`
- research / continual-learning framing:
  - prefer `2016 — Learning to learn by gradient descent by gradient descent`
  - then `2025 — Nested Learning`

### 2. Defer exact blocked-paper fidelity
If the exact historical paper matters for wording or a claim boundary, postpone that lesson or mark it as requiring a source-unblocking pass first.

### 3. Avoid false precision
Do not present a lesson as a faithful distillation of a blocked paper if only metadata/secondary knowledge is currently accessible.

## Immediate roadmap effect

### Safe near-term lessons
The current MVP queue can still move forward, because the next items do not strictly require blocked papers, but several now require source investigation first:
- Perceptron · decision boundary intuition
- MLP · activation functions and non-linearity
- Gradient descent intuition
- Convolution as local pattern detector (anchor selected: LeCun et al., 1998; investigate source readability first)

### Lessons that need extra care later
- Autoencoder block: the 2006 paper is blocked, so use VAE-centered anchoring unless/until a readable route to the 2006 paper is secured.
- RNN/LSTM memory block: LSTM and BPTT originals are blocked, so sequence-memory lessons should initially lean on open transformer / long-context sources unless an open readable classical source is found.

## Default authoring rule

For now, any subagent working on `dl-playground` should treat `references/access-audit-2026-03-29.md` and this file as the operational truth when deciding whether a paper can safely anchor a lesson.
