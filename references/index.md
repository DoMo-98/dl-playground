# Paper Index

This file tracks the source papers relevant to `dl-playground`.

Current policy:

- prefer official or high-trust external sources instead of storing heavy PDFs in the repo
- store structured metadata here
- add notes in `references/notes/` when a paper starts informing lessons or roadmap decisions
- mark papers that may require OCR or manual summarization

## Field guide

- **Status**
  - `planned` — added to the reading map, source links still to verify
  - `linked` — official or preferred source identified
  - `summarized` — has a companion note in `references/notes/`
  - `lesson-linked` — already mapped to a concrete lesson or module
- **Access status**
  - `full-text-ok` — practical readable full text confirmed with current tools
  - `abstract-or-metadata-only` — source reachable, but full text not comfortably confirmed
  - `blocked-or-closed` — configured sources are blocked or closed from current environment
- **Source strategy**
  - `official-preferred` — publisher / proceedings / official archive to prioritize
  - `backup` — acceptable secondary source if needed
- **Format expectation**
  - `textual-pdf-likely`
  - `historical-scan-likely`
  - `html-or-pdf`
  - `unknown`
- **Lesson priority**
  - `high` — directly useful for near-term teaching content
  - `medium` — important but not immediately needed
  - `research` — more advanced or exploratory
- **Teaching fit**
  - `foundational` — core conceptual pillar for the project
  - `visual-first` — especially promising for interactive or intuitive lessons
  - `advanced-research` — strongest fit for exploratory/research modules

---

## Mechanics

### The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain
- Authors: Frank Rosenblatt
- Year: 1958
- Status: linked
- Topic(s): perceptron, foundations, classification
- Source strategy:
  - official-preferred: historical publisher / archival scan (Project Euclid or equivalent historical source)
  - backup: trusted university archive or author-hosted scan
- Official source: https://doi.org/10.1037/h0042519
- Backup source: https://pubmed.ncbi.nlm.nih.gov/13602029/
- Format expectation: historical-scan-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: foundational perceptron framing for the first mechanics lessons and historical context.
- Notes: `references/notes/1958-the-perceptron.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - perceptron origin story
  - threshold decision intuition
  - what early neural classification tried to achieve

### Learning representations by back-propagating errors
- Authors: David E. Rumelhart, Geoffrey E. Hinton, Ronald J. Williams
- Year: 1986
- Status: summarized
- Topic(s): backpropagation, mlp, training
- Source strategy:
  - official-preferred: Nature
  - backup: author-hosted copy or trusted archive
- Official source: https://doi.org/10.1038/323533a0
- Backup source: https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf
- Format expectation: html-or-pdf
- Lesson priority: high
- Teaching fit: foundational
- Relevance: core source for how multilayer networks became trainable in practice.
- Notes: `references/notes/t2a-mlp-activation-source-investigation-2026-03-31.md`
- Access status: full-text-ok
- Potential lesson use:
  - gradient flow intuition
  - hidden layers become learnable
  - why backprop changed neural nets

### Reducing the Dimensionality of Data with Neural Networks
- Authors: Geoffrey E. Hinton, Ruslan R. Salakhutdinov
- Year: 2006
- Status: linked
- Topic(s): autoencoders, representation-learning, dimensionality-reduction
- Source strategy:
  - official-preferred: Science
  - backup: author-hosted copy or trusted institutional mirror
- Official source: https://doi.org/10.1126/science.1127647
- Backup source: https://www.science.org/doi/10.1126/science.1127647
- Format expectation: html-or-pdf
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: classic reference for autoencoder-based compression and representation learning.
- Notes: `references/notes/2006-reducing-dimensionality-with-autoencoders.md`
- Access status: blocked-or-closed
- Potential lesson use:
  - bottleneck intuition
  - encoding vs decoding
  - latent compression as learned representation

### Visualizing Data using t-SNE
- Authors: Laurens van der Maaten, Geoffrey E. Hinton
- Year: 2008
- Status: linked
- Topic(s): visualization, embeddings, dimensionality-reduction
- Source strategy:
  - official-preferred: JMLR
  - backup: author page or trusted mirror
- Official source: https://jmlr.org/papers/v9/vandermaaten08a.html
- Backup source: https://www.jmlr.org/papers/volume9/vandermaaten08a/vandermaaten08a.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: strong candidate for visual lessons on embedding geometry and manifold intuition.
- Notes: `references/notes/2008-tsne.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - neighborhood preservation intuition
  - why 2D visualization can distort reality
  - latent space exploration caveats

### Extracting and Composing Robust Features with Denoising Autoencoders
- Authors: Pascal Vincent, Hugo Larochelle, Yoshua Bengio, Pierre-Antoine Manzagol
- Year: 2008
- Status: linked
- Topic(s): denoising-autoencoders, robustness, representation-learning
- Source strategy:
  - official-preferred: ICML proceedings
  - backup: author-hosted copy or trusted archive
- Official source: https://doi.org/10.1145/1390156.1390294
- Backup source: https://dl.acm.org/doi/10.1145/1390156.1390294
- Format expectation: textual-pdf-likely
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: useful for teaching robustness, corruption, and reconstruction-based learning.
- Notes: `references/notes/2008-denoising-autoencoders.md`
- Access status: blocked-or-closed
- Potential lesson use:
  - noise removal intuition
  - robust feature learning
  - reconstruction as supervision

### Understanding the difficulty of training deep feedforward neural networks
- Authors: Xavier Glorot, Yoshua Bengio
- Year: 2010
- Status: lesson-linked
- Topic(s): initialization, optimization, stable-training
- Source strategy:
  - official-preferred: AISTATS / PMLR
  - backup: author page or trusted archive
- Official source: https://proceedings.mlr.press/v9/glorot10a.html
- Backup source: https://proceedings.mlr.press/v9/glorot10a/glorot10a.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: canonical source behind Xavier initialization and signal-scale stability.
- Notes: `references/notes/2010-glorot-bengio-initialization.md`
- Access status: full-text-ok
- Potential lesson use:
  - exploding vs vanishing activations
  - why initialization matters before learning starts
  - Xavier intuition demo

### Auto-Encoding Variational Bayes
- Authors: Diederik P. Kingma, Max Welling
- Year: 2013
- Status: linked
- Topic(s): vae, latent-variables, generative-modeling
- Source strategy:
  - official-preferred: arXiv
  - backup: conference or author page if needed
- Official source: https://arxiv.org/abs/1312.6114
- Backup source: https://arxiv.org/pdf/1312.6114.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: essential VAE reference for probabilistic latent-space teaching.
- Notes: `references/notes/2013-vae.md`
- Access status: full-text-ok
- Potential lesson use:
  - latent distribution intuition
  - reconstruction vs regularization tradeoff
  - sampling from latent space

### Dropout: A Simple Way to Prevent Neural Networks from Overfitting
- Authors: Nitish Srivastava, Geoffrey Hinton, Alex Krizhevsky, Ilya Sutskever, Ruslan Salakhutdinov
- Year: 2014
- Status: linked
- Topic(s): dropout, regularization, stable-training
- Source strategy:
  - official-preferred: JMLR
  - backup: author-hosted copy
- Official source: https://jmlr.org/papers/v15/srivastava14a.html
- Backup source: https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: visual-first
- Relevance: straightforward and teachable regularization mechanism with strong interactive potential.
- Notes: `references/notes/2014-dropout.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - overfitting intuition
  - subnetworks and robustness
  - train vs eval behavior

### Gradient-Based Learning Applied to Document Recognition
- Authors: Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner
- Year: 1998
- Status: summarized
- Topic(s): cnn, convolution, feature-maps, pooling
- Source strategy:
  - official-preferred: IEEE / canonical journal page
  - backup: author-hosted PDF
- Official source: https://ieeexplore.ieee.org/document/726791
- Backup source: http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: strongest classic anchor for introducing convolution as a local pattern detector with shared kernels and feature maps.
- Notes: `references/notes/t4-convolution-source-investigation-2026-04-02.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - local receptive field intuition
  - shared-kernel scanning across an input grid
  - feature maps and simple pooling intuition

### Deep Residual Learning for Image Recognition
- Authors: Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun
- Year: 2015
- Status: linked
- Topic(s): resnet, cnn, residual-connections
- Source strategy:
  - official-preferred: CVPR proceedings
  - backup: arXiv
- Official source: https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html
- Backup source: https://arxiv.org/abs/1512.03385
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: central paper for skip connections and stable deep network training.
- Notes: `references/notes/2015-resnet.md`
- Access status: full-text-ok
- Potential lesson use:
  - residual block intuition
  - identity path vs learned residual
  - why deeper models became easier to train

### Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification
- Authors: Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun
- Year: 2015
- Status: lesson-linked
- Topic(s): relu, initialization, activations, cnn
- Source strategy:
  - official-preferred: ICCV proceedings
  - backup: arXiv
- Official source: https://openaccess.thecvf.com/content_iccv_2015/html/He_Delving_Deep_into_ICCV_2015_paper.html
- Backup source: https://doi.org/10.1109/ICCV.2015.123
- Format expectation: textual-pdf-likely
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: key source for rectifier behavior and He initialization.
- Notes: `references/notes/2015-rectifiers.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - dead neurons intuition
  - ReLU family behavior
  - He initialization demo

### Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift
- Authors: Sergey Ioffe, Christian Szegedy
- Year: 2015
- Status: summarized
- Topic(s): batchnorm, normalization, stable-training
- Source strategy:
  - official-preferred: ICML / PMLR
  - backup: arXiv or author-hosted copy
- Official source: https://proceedings.mlr.press/v37/ioffe15.html
- Backup source: https://proceedings.mlr.press/v37/ioffe15.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: visual-first
- Relevance: core normalization paper with strong direct lesson value.
- Notes: `references/notes/t6-batchnorm-source-investigation-2026-04-11.md`
- Access status: full-text-ok
- Potential lesson use:
  - train-time batch statistics
  - running averages at inference
  - why normalization stabilizes optimization

### Layer Normalization
- Authors: Jimmy Lei Ba, Jamie Ryan Kiros, Geoffrey E. Hinton
- Year: 2016
- Status: linked
- Topic(s): layernorm, normalization, sequence-models
- Source strategy:
  - official-preferred: arXiv
  - backup: author page or later proceedings version if needed
- Official source: https://arxiv.org/abs/1607.06450
- Backup source: https://arxiv.org/pdf/1607.06450.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: highly relevant for sequence and transformer lessons where batch statistics are awkward.
- Notes: `references/notes/2016-layer-normalization.md`
- Access status: full-text-ok
- Potential lesson use:
  - batchnorm vs layernorm intuition
  - normalization axis comparison
  - why transformers prefer layernorm-style ideas

### UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction
- Authors: Leland McInnes, John Healy, James Melville
- Year: 2018
- Status: linked
- Topic(s): visualization, embeddings, dimensionality-reduction
- Source strategy:
  - official-preferred: arXiv
  - backup: project docs or author page
- Official source: https://arxiv.org/abs/1802.03426
- Backup source: https://arxiv.org/pdf/1802.03426.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: practical modern counterpart to t-SNE for manifold and embedding visualization lessons.
- Notes: `references/notes/2018-umap.md`
- Access status: full-text-ok
- Potential lesson use:
  - local vs global structure intuition
  - embedding visualization comparison with t-SNE
  - interactive neighborhood controls

---

## Memory

### Backpropagation through time: what it does and how to do it
- Authors: Paul J. Werbos
- Year: 1990
- Status: linked
- Topic(s): bptt, rnn, sequence-training
- Source strategy:
  - official-preferred: Proceedings of the IEEE or trusted historical archive
  - backup: author-hosted scan or institutional copy
- Official source: https://doi.org/10.1109/5.58337
- Backup source: https://ieeexplore.ieee.org/document/58337
- Format expectation: historical-scan-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: direct conceptual bridge from standard backprop to recurrent sequence training.
- Notes: `references/notes/1990-bptt.md`
- Access status: blocked-or-closed
- Potential lesson use:
  - unfolding through time
  - temporal credit assignment
  - why long sequences are hard

### Long Short-Term Memory
- Authors: Sepp Hochreiter, Jürgen Schmidhuber
- Year: 1997
- Status: linked
- Topic(s): lstm, rnn, memory
- Source strategy:
  - official-preferred: Neural Computation / MIT Press
  - backup: author-hosted copy
- Official source: https://doi.org/10.1162/neco.1997.9.8.1735
- Backup source: https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory
- Format expectation: html-or-pdf
- Lesson priority: high
- Teaching fit: foundational
- Relevance: foundational memory-gating architecture for sequence lessons.
- Notes: `references/notes/1997-lstm.md`
- Access status: blocked-or-closed
- Potential lesson use:
  - cell state intuition
  - gates as information filters
  - fixing long-term dependency failure

### Attention Is All You Need
- Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin
- Year: 2017
- Status: linked
- Topic(s): transformers, attention, sequence-models
- Source strategy:
  - official-preferred: NeurIPS proceedings
  - backup: arXiv
- Official source: https://papers.neurips.cc/paper/7181-attention-is-all-you-need
- Backup source: https://arxiv.org/abs/1706.03762
- Format expectation: textual-pdf-likely
- Lesson priority: high
- Teaching fit: foundational
- Relevance: foundational transformer source and central for the memory track.
- Notes: `references/notes/2017-attention-is-all-you-need.md`
- Access status: full-text-ok
- Potential lesson use:
  - self-attention intuition
  - token-to-token communication
  - positional information motivation

### Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context
- Authors: Zihang Dai, Zhilin Yang, Yiming Yang, Jaime Carbonell, Quoc V. Le, Ruslan Salakhutdinov
- Year: 2019
- Status: linked
- Topic(s): transformer-xl, long-context, memory
- Source strategy:
  - official-preferred: ACL proceedings
  - backup: arXiv
- Official source: https://aclanthology.org/P19-1285/
- Backup source: https://arxiv.org/abs/1901.02860
- Format expectation: textual-pdf-likely
- Lesson priority: medium
- Teaching fit: visual-first
- Relevance: useful bridge between standard attention and explicit recurrent memory extensions.
- Notes: `references/notes/2019-transformer-xl.md`
- Access status: full-text-ok
- Potential lesson use:
  - segment recurrence intuition
  - extending context beyond a single window
  - memory reuse across chunks

### Titans: Learning to Memorize at Test Time
- Authors: Ali Behrouz et al.
- Year: 2024
- Status: linked
- Topic(s): titans, test-time-memory, continual-learning, memory
- Source strategy:
  - official-preferred: arXiv
  - backup: ar5iv readable HTML or project page
- Official source: https://arxiv.org/abs/2501.00663
- Backup source: https://ar5iv.labs.arxiv.org/html/2501.00663
- Format expectation: textual-pdf-likely
- Lesson priority: research
- Teaching fit: advanced-research
- Relevance: highly aligned with the project's advanced memory and continual-learning direction.
- Notes: `references/notes/2024-titans.md`
- Access status: full-text-ok
- Potential lesson use:
  - test-time memory mechanisms
  - externalized memory intuition
  - contrast with fixed-context transformers

---

## Research

### Gradient-based Hyperparameter Optimization through Reversible Learning
- Authors: Dougal Maclaurin, David Duvenaud, Ryan P. Adams
- Year: 2015
- Status: linked
- Topic(s): hyperparameter-optimization, reversible-learning, meta-learning
- Source strategy:
  - official-preferred: ICML / PMLR
  - backup: arXiv or author page
- Official source: https://proceedings.mlr.press/v37/maclaurin15.html
- Backup source: https://proceedings.mlr.press/v37/maclaurin15.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: research
- Teaching fit: advanced-research
- Relevance: strong advanced source for teaching optimization-through-training dynamics.
- Notes: `references/notes/2015-reversible-learning.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - learning hyperparameters by differentiation
  - reversing optimization trajectories
  - why meta-optimization is expensive

### Learning to learn by gradient descent by gradient descent
- Authors: Marcin Andrychowicz et al.
- Year: 2016
- Status: linked
- Topic(s): learned-optimizers, meta-learning, optimization
- Source strategy:
  - official-preferred: NeurIPS proceedings
  - backup: arXiv
- Official source: https://arxiv.org/abs/1606.04474
- Backup source: https://papers.nips.cc/paper/6461-learning-to-learn-by-gradient-descent-by-gradient-descent
- Format expectation: textual-pdf-likely
- Lesson priority: research
- Teaching fit: advanced-research
- Relevance: canonical learned-optimizer paper for the research track.
- Notes: `references/notes/2016-learning-to-learn-by-gradient-descent.md`
- Access status: full-text-ok
- Potential lesson use:
  - optimizer as trainable model
  - inner loop vs outer loop intuition
  - why learning to optimize is different from optimizing

### Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks
- Authors: Chelsea Finn, Pieter Abbeel, Sergey Levine
- Year: 2017
- Status: linked
- Topic(s): maml, few-shot-learning, meta-learning
- Source strategy:
  - official-preferred: PMLR
  - backup: arXiv
- Official source: https://proceedings.mlr.press/v70/finn17a.html
- Backup source: https://proceedings.mlr.press/v70/finn17a/finn17a.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: research
- Teaching fit: advanced-research
- Relevance: standard reference for fast adaptation and meta-learning loops.
- Notes: `references/notes/2017-maml.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - learn an initialization that adapts quickly
  - task distribution intuition
  - inner/outer gradient separation

### Bilevel Programming for Hyperparameter Optimization and Meta-Learning
- Authors: Luca Franceschi, Paolo Frasconi, Saverio Salzo, Riccardo Grazzi, Massimiliano Pontil
- Year: 2018
- Status: linked
- Topic(s): bilevel-optimization, hyperparameter-optimization, meta-learning
- Source strategy:
  - official-preferred: ICML / PMLR
  - backup: arXiv
- Official source: https://proceedings.mlr.press/v80/franceschi18a.html
- Backup source: https://proceedings.mlr.press/v80/franceschi18a/franceschi18a.pdf
- Format expectation: textual-pdf-likely
- Lesson priority: research
- Teaching fit: advanced-research
- Relevance: mathematically important paper for the research branch and nested optimization framing.
- Notes: `references/notes/2018-bilevel-programming.md`
- Access status: abstract-or-metadata-only
- Potential lesson use:
  - inner objective vs outer objective
  - constraint intuition in meta-learning
  - bilevel optimization visual explanation

### Nested Learning: The Illusion of Deep Learning Architectures
- Authors: Ali Behrouz et al.
- Year: 2025
- Status: linked
- Topic(s): nested-learning, continual-learning, architecture-research
- Source strategy:
  - official-preferred: arXiv
  - backup: ar5iv readable HTML or official project page
- Official source: https://arxiv.org/abs/2512.24695
- Backup source: https://ar5iv.labs.arxiv.org/html/2512.24695
- Format expectation: textual-pdf-likely
- Lesson priority: research
- Teaching fit: advanced-research
- Relevance: directly aligned with the exploratory research direction of the project.
- Notes: `references/notes/2025-nested-learning.md`
- Access status: full-text-ok
- Potential lesson use:
  - nested learning loops intuition
  - alternative framing for depth and adaptation
  - speculative architecture exploration
