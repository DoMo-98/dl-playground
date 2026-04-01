# Initial Content Map

This map translates the repository learning path into web learning units.

## Structure Rule

- A roadmap point may be split into several pages.
- Every page must include explanation, visualization, and interaction.
- Splits should follow pedagogical clarity rather than strict taxonomy.
- **Important:** thematic taxonomy and learner-facing lesson order are related but not identical. `web/src/content/learningPath.ts` is the source of truth for the learner-facing sequence.

## 1. Foundations

### 1.1 Perceptron basics
- Page: weighted sum and bias
- Page: decision boundary intuition
- Page: what a perceptron cannot represent

### 1.2 MLPs
- Page: hidden layers as feature composition
- Page: activation functions and non-linearity
- Page: depth, width, and expressivity
- Page: forward pass intuition

### 1.3 Optimization
- Page: loss functions and optimization overview
- Page: gradient descent intuition
- Page: training vs inference

## 2. CNNs

### 2.1 Convolutions
- Page: convolution as local pattern detector
- Page: kernels and feature maps
- Page: stride, padding, and receptive field
- Page: stacking convolutions into hierarchy
- Page: ResNet intuition

## 3. Stable Training

### 3.1 Initialization
- Page: bad initialization vs stable initialization
- Page: Xavier and He intuition

### 3.2 Activations
- Page: sigmoid, tanh, ReLU, GELU comparison
- Page: saturation, dead neurons, and gradient flow

### 3.3 Regularization and normalization
- Page: dropout behavior
- Page: weight decay intuition
- Page: BatchNorm intuition
- Page: LayerNorm intuition
- Page: normalization placement and effect

### 3.4 Residual connections
- Page: why skip connections help
- Page: residual pathways and signal preservation

## 4. Sequence & Memory

### 4.1 RNNs and LSTMs
- Page: sequence processing over time
- Page: hidden state intuition
- Page: vanishing gradients and BPTT intuition
- Page: gates in LSTMs
- Page: memory retention vs forgetting

### 4.2 Transformers
- Page: token interactions without recurrence
- Page: attention scores and weighted mixing
- Page: multi-head attention intuition
- Page: positional information
- Page: layer stacking and representation building

### 4.3 Long-term memory directions
- Page: why long-term memory matters
- Page: memory storage and retrieval intuition
- Page: comparison with vanilla transformer behavior
- Page: exploratory visualizations for long-range dependency handling

## 5. Research

### 5.1 Meta-learning
- Page: learning to learn intuition
- Page: inner loop vs outer loop
- Page: bilevel optimization mental model

### 5.2 Nested learning
- Page: nested learning intuition
- Page: stacked adaptation loops
- Page: candidate exploratory visual interfaces for research concepts

## Navigation / Meta Pages
- Page: learning path overview
- Page: glossary
- Page: visual legend / interaction guide

## Suggested Sequencing for an MVP

Start with pages that are:

- foundational
- visually legible
- strongly interactive
- useful as reusable design patterns

Recommended first cluster:

1. learning path overview
2. perceptron: weighted sum and bias
3. perceptron: decision boundary intuition
4. MLP: activation functions and non-linearity
5. gradient descent intuition
6. convolution as local pattern detector
