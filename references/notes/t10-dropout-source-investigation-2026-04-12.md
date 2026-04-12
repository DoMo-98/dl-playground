# T10 — Regularization · dropout behavior · source investigation

Date: 2026-04-12
Outcome: SOURCE_CONFIRMED

## Scope

Confirm whether the planned dropout lesson can be grounded in a practically readable primary source from the current environment, and define the safe implementation envelope for the next lesson run.

## Primary paper investigated

- Srivastava, Hinton, Krizhevsky, Sutskever, Salakhutdinov (2014) — *Dropout: A Simple Way to Prevent Neural Networks from Overfitting*

## Evidence collected

### 1. Official JMLR paper page is directly readable from the current environment
- URL checked: `https://jmlr.org/papers/v15/srivastava14a.html`
- Result: the official page is reachable and exposes title, authors, citation metadata, abstract, and a direct PDF route.
- Relevant readable claims confirmed there:
  - overfitting is a serious problem in large neural nets,
  - dropout randomly drops units and their connections during training,
  - this reduces excessive co-adaptation,
  - training samples from many thinned subnetworks,
  - test-time behavior is approximated with a single unthinned network with scaled weights.

### 2. Official PDF route is open and fetchable
- URL checked: `https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf`
- Result: HTTP 200 and a downloadable PDF payload were confirmed from the official JMLR source.
- Limitation: this run did not get a comfortable local text extraction pass from the PDF with the shell tooling currently installed.
- Interpretation: despite that tooling limitation, the combination of readable official JMLR HTML plus direct official PDF availability is sufficient operational evidence for this lesson family, matching the standard already used for other source-ready lessons.

## Operational decision

`SOURCE_CONFIRMED`

The dropout lesson can move from source investigation into implementation planning/execution. The primary anchor is sufficiently readable for the intended pedagogical scope.

## Safe implementation envelope unlocked

Recommended core teaching claim for the next task:

> During training, dropout randomly removes units from the active network, forcing more robust distributed representations; at evaluation time, the full network returns with scaled activations/weights to approximate the ensemble average.

Recommended interaction scope for the implementation run:
- toggle train mode vs eval mode
- adjust dropout probability on a small hidden layer or feature vector
- visualize which units are dropped in the sampled subnetwork
- compare raw activations before dropout, after masking, and after eval-time scaling
- show repeated train-time samples so the learner can see that different subnetworks are used across steps

Recommended fidelity boundaries:
- do not present dropout as deleting neurons permanently; the mask is stochastic and resampled during training
- do not erase the train-vs-eval distinction, because that is the main operational behavior the learner needs to see
- do not overclaim that dropout is universally beneficial for every modern architecture or always the best regularizer
- keep the lesson focused on masking, co-adaptation pressure, and ensemble-style intuition rather than benchmark performance tables

## Roadmap effect

This task should be represented operationally as:
- `T10` — source investigation (`DONE`)
- next `NEXT`: `Initialization · Xavier and He intuition` unless the roadmap is intentionally reprioritized again later

That keeps the source-readiness rule explicit and lets a future implementation run proceed without repeating the access audit.
