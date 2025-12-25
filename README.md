# dl-playground

A sandbox for refining intuition on Deep Learning architectures and researching memory modules. The focus is on analyzing the mechanics of neural networks and experimenting with Test-Time Training (TTT) approaches.

## Roadmap

### 1. Architectural Mechanics (/mechanics)
Low-level implementations to analyze signal flow and inductive biases.
- [ ] **CNNs:** Analysis of translational invariance and receptive fields.
- [ ] **Autoencoders:** Latent space compression and manifold visualization.
- [ ] **Dense Layers:** Information mixing dynamics.

### 2. Memory Systems & State (/memory)
Prototyping stateful architectures and sequence modeling.
- [ ] **RNNs:** Gradient flow analysis and state degradation.
- [ ] **Gating Mechanisms:** Implementing selection heuristics (LSTM/GRU style).
- [ ] **State Space Models (SSMs):** Experiments with linear recurrence (Mamba/RWKV).

### 3. Research: Test-Time Training (/ttt)
Experimental dynamic architectures that adapt during inference.
- [ ] **Hebbian learning rules** implementation.
- [ ] **Fast weights** and hypernetworks.
- [ ] **Custom differentiable memory modules.**

## Setup

This project uses uv for modern dependency management and reproducibility.

```bash
# 1. Sync dependencies (creates .venv based on uv.lock)
uv sync

# 2. Run experiments
uv run python <path/to/script.py>
