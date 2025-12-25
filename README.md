# dl-playground

A sandbox for refining intuition on Deep Learning architectures and researching memory modules. The focus is on analyzing the mechanics of neural networks and experimenting with Test-Time Training (TTT) approaches.

## Roadmap

### 1. Architectural Mechanics (/mechanics)
Focus on signal flow, inductive biases, and information processing.
- **The Mixer (Dense Layers):** Analysis of information mixing, saturation, and layer width dynamics.
- **The Pipe (ResNets / Skip Connections):** Gradient flow experiments and residual learning mechanics.
- **Visual Extraction (CNNs):** Spatial patterns, receptive fields, and translational invariance.

### 2. Memory Systems & State (/memory)
Prototyping how networks compress and retain information over time.
- **RNNs & Gating:** Analyzing state degradation and implementing selection heuristics (LSTM/GRU).
- **Linear Recurrence (Mamba / SSMs):** Experiments with State Space Models for efficient constant-state memory.
- **Autoencoders:** Understanding the bottleneck effect and latent space manifold representation.

### 3. Dynamic Architectures & TTT (/ttt)
Experimental systems where weights and states adapt during inference.
- **The Fast Multiplier (Hypernetworks / Fast Weights):** Implementing networks that generate weights for other layers at runtime.
- **Hebbian Learning:** Integrating activity-based weight updates within the forward pass.
- **Test-Time Training (TTT):** Developing self-supervised loops for inference-time adaptation.

## Setup

This project uses [uv](https://github.com/astral-sh/uv) for modern dependency management and reproducibility.

```bash
# 1. Install uv (if you don't have it)
# curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Sync dependencies (creates .venv based on uv.lock)
uv sync

# 3. Run experiments
uv run python <path/to/script.py>
