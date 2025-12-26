# dl-playground

A sandbox for refining intuition on Deep Learning architectures and researching memory modules. The focus is on analyzing the mechanics of neural networks and experimenting with Test-Time Training (TTT) approaches.

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

## Setup

This project uses [uv](https://github.com/astral-sh/uv) for modern dependency management and reproducibility.

```bash
# 1. Install uv (if you don't have it)
# curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Sync dependencies (creates .venv based on uv.lock)
uv sync

# 3. Run experiments
uv run python <path/to/script.py>
