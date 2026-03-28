# Initial Content Map

This map translates the repository learning path into web learning units.

## Structure Rule

- A roadmap point may be split into several pages.
- Every page must include explanation, visualization, and interaction.
- Splits should follow pedagogical clarity rather than strict taxonomy.

## 1. Architectural Mechanics

### 1.1 Dense Networks

#### Perceptron
- Page: weighted sum and bias
- Page: decision boundary intuition
- Page: what a perceptron cannot represent

#### MLP
- Page: hidden layers as feature composition
- Page: activation functions and non-linearity
- Page: depth, width, and expressivity
- Page: forward pass intuition

### 1.2 Stable Training

#### Initialization
- Page: bad initialization vs stable initialization
- Page: Xavier and He intuition

#### Activations
- Page: sigmoid, tanh, ReLU, GELU comparison
- Page: saturation, dead neurons, and gradient flow

#### Regularization
- Page: dropout behavior
- Page: weight decay intuition

#### Normalization
- Page: BatchNorm intuition
- Page: LayerNorm intuition
- Page: normalization placement and effect

#### Residual Connections
- Page: why skip connections help
- Page: residual pathways and signal preservation

### 1.3 CNNs
- Page: convolution as local pattern detector
- Page: kernels and feature maps
- Page: stride, padding, and receptive field
- Page: stacking convolutions into hierarchy
- Page: ResNet intuition

### 1.4 Autoencoders
- Page: encode/decode intuition
- Page: bottlenecks and compression
- Page: latent space structure
- Page: manifold visualization and interpolation

## 2. Sequence and Memory

### 2.1 RNNs and LSTMs
- Page: sequence processing over time
- Page: hidden state intuition
- Page: vanishing gradients and BPTT intuition
- Page: gates in LSTMs
- Page: memory retention vs forgetting

### 2.2 Transformers
- Page: token interactions without recurrence
- Page: attention scores and weighted mixing
- Page: multi-head attention intuition
- Page: positional information
- Page: layer stacking and representation building

### 2.3 Titans / Long-Term Memory
- Page: why long-term memory matters
- Page: memory storage and retrieval intuition
- Page: comparison with vanilla transformer behavior
- Page: exploratory visualizations for long-range dependency handling

## 3. Research: Optimization and Meta-Learning

### 3.1 Meta-Learning
- Page: learning to learn intuition
- Page: inner loop vs outer loop
- Page: bilevel optimization mental model

### 3.2 Nested Learning
- Page: nested learning intuition
- Page: stacked adaptation loops
- Page: candidate exploratory visual interfaces for research concepts

## Cross-Cutting Supporting Pages

### Foundations
- Page: tensors, shapes, and dimensions
- Page: loss functions and optimization overview
- Page: gradient descent intuition
- Page: training vs inference

### Navigation / Meta Pages
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
