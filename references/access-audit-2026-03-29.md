# Paper access audit — 2026-03-29

Purpose: record the current real-world accessibility and practical readability of the `dl-playground` paper set.

Method used:
- check that the configured URL responds
- distinguish landing-page/abstract access from practical full-text readability
- prefer HTML full text when available (`ar5iv`, open proceedings, open archives)
- mark publisher-only closed pages as blocked even if metadata is visible

Legend:
- `FULL_TEXT_OK` — practical readable full text confirmed with current tools
- `ABSTRACT_OR_METADATA_ONLY` — source reachable, but full text not confirmed as comfortably readable
- `BLOCKED_OR_CLOSED` — configured sources blocked/paywalled/closed from current environment
- `INDEX_FIX_REQUIRED` — catalog entry was incorrect or incomplete and should be corrected

## Mechanics

### 1958 — The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - DOI landing page is thin.
  - PubMed metadata is reachable and readable.
  - Full text was not confirmed as comfortably readable from the current environment.

### 1986 — Learning representations by back-propagating errors
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - Nature page is reachable.
  - Abstract/preview is readable.
  - Full text beyond preview was not confirmed.

### 2006 — Reducing the Dimensionality of Data with Neural Networks
- access_status: `BLOCKED_OR_CLOSED`
- notes:
  - Science source returned 403 from current environment.
  - Unpaywall reports the DOI as closed.

### 2008 — Visualizing Data using t-SNE
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - JMLR page and PDF both respond.
  - Full text has not yet been confirmed through a comfortable extraction path in this environment.

### 2008 — Extracting and Composing Robust Features with Denoising Autoencoders
- access_status: `BLOCKED_OR_CLOSED`
- notes:
  - ACM sources returned 403 from current environment.
  - Unpaywall reports the DOI as closed.

### 2010 — Understanding the difficulty of training deep feedforward neural networks
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - PMLR page and PDF respond.
  - Full text not yet confirmed end-to-end through current extraction path.

### 2013 — Auto-Encoding Variational Bayes
- access_status: `FULL_TEXT_OK`
- notes:
  - arXiv and ar5iv readable.

### 2014 — Dropout: A Simple Way to Prevent Neural Networks from Overfitting
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - JMLR page and PDF respond.
  - Full text not yet confirmed through current extraction path.

### 2015 — Deep Residual Learning for Image Recognition
- access_status: `FULL_TEXT_OK`
- notes:
  - Open CVF page is readable.
  - ar5iv full text also readable.

### 2015 — Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - CVF landing/abstract readable.
  - Practical full text not yet confirmed.

### 2015 — Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - PMLR abstract/metadata readable.
  - Full text not yet confirmed through current extraction path.

### 2016 — Layer Normalization
- access_status: `FULL_TEXT_OK`
- notes:
  - arXiv/ar5iv readable.

### 2018 — UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction
- access_status: `FULL_TEXT_OK`
- notes:
  - arXiv/ar5iv readable.

## Memory

### 1990 — Backpropagation through time: what it does and how to do it
- access_status: `BLOCKED_OR_CLOSED`
- notes:
  - IEEE Xplore landing page is reachable.
  - Full text was not confirmed.
  - Treat as blocked for lesson-authoring purposes until an open readable copy is found.

### 1997 — Long Short-Term Memory
- access_status: `BLOCKED_OR_CLOSED`
- notes:
  - MIT Press / DOI pages returned 403 from current environment.
  - Unpaywall reports the DOI as closed.

### 2017 — Attention Is All You Need
- access_status: `FULL_TEXT_OK`
- notes:
  - arXiv/ar5iv readable.

### 2019 — Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context
- access_status: `FULL_TEXT_OK`
- notes:
  - ACL Anthology page reachable.
  - ar5iv readable.

### 2024 — Titans: Learning to Memorize at Test Time
- access_status: `FULL_TEXT_OK`
- notes:
  - exact paper identified at arXiv `2501.00663`
  - previous catalog entry pointed to a search results page
- catalog_action: `INDEX_FIX_REQUIRED`

## Research

### 2015 — Gradient-based Hyperparameter Optimization through Reversible Learning
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - PMLR page and PDF respond.
  - Full text not yet confirmed through current extraction path.

### 2016 — Learning to learn by gradient descent by gradient descent
- access_status: `FULL_TEXT_OK`
- notes:
  - arXiv/ar5iv readable.

### 2017 — Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - PMLR page and PDF respond.
  - Full text not yet confirmed through current extraction path.

### 2018 — Bilevel Programming for Hyperparameter Optimization and Meta-Learning
- access_status: `ABSTRACT_OR_METADATA_ONLY`
- notes:
  - PMLR page and PDF respond.
  - Full text not yet confirmed through current extraction path.

### 2025 — Nested Learning: The Illusion of Deep Learning Architectures
- access_status: `FULL_TEXT_OK`
- notes:
  - exact paper identified at arXiv `2512.24695`
  - public title includes the word `Learning`
- catalog_action: `INDEX_FIX_REQUIRED`
