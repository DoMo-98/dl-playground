# T4a — Convolution as local pattern detector · source investigation

Date: 2026-04-02
Outcome: SOURCE_PARTIAL

## Scope

Determine whether the planned primary anchor for the convolution lesson can be read directly enough from the current environment to support a faithful implementation, or whether the lesson should be narrowed/re-anchored first.

## Primary paper investigated

- LeCun, Bottou, Bengio, Haffner (1998) — *Gradient-Based Learning Applied to Document Recognition*

## Secondary context paper

- He, Zhang, Ren, Sun (2015/2016) — *Deep Residual Learning for Image Recognition*

## Evidence collected

### 1. IEEE Xplore remains metadata-only from the current environment
- URL checked: `https://ieeexplore.ieee.org/document/726791`
- Result: the reachable page exposes publisher shell + account/navigation metadata, but not a readable article body from the current tooling.
- Interpretation: the official publisher route is still not a practical reading path here.

### 2. Author-hosted PDF is directly downloadable, but not comfortably readable through the current tooling stack
- URL checked: `http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf`
- Result: HTTP 200 and a downloadable PDF payload (`955058` bytes) are available from the host.
- Supporting evidence: Yann LeCun's publications index also lists the same title with a matching `955KB PDF` entry.
- Limitation: in this environment, the available PDF extraction routes did not yield a comfortably readable text pass from the downloaded file, so the presence of the PDF alone is not enough to call the paper operationally `full-text-ok`.

### 3. Trusted metadata/summary routes confirm the core conceptual anchors
- DBLP confirms the canonical journal record and DOI for the paper.
- Google Scholar exposes an abstract-like summary that is sufficient to confirm the main high-level claims most relevant to this lesson family:
  - convolutional neural networks are designed to handle variability of 2D patterns,
  - convolutional networks outperform alternative methods on the document-recognition task discussed there,
  - the paper is clearly positioned as a canonical CNN/document-recognition reference.
- Interpretation: this does not replace a comfortable full reading pass, but it does support a narrow, safe teaching claim around local pattern detection.

## Operational decision

`SOURCE_PARTIAL`

The current environment does **not** justify upgrading LeCun et al. (1998) to `full-text-ok`, but it does justify a narrow operational continuation:
- keep LeCun et al. (1998) as the historical/canonical primary anchor,
- keep He et al. (2015) only as modern CNN context,
- constrain the implementation task to the smallest faithful mechanism that is strongly supported by the accessible evidence.

## Safe implementation envelope unlocked

Recommended implementation claim for the follow-up task:

> A convolution acts as a local pattern detector by reusing the same small kernel across spatial positions and producing a feature map that shows where that pattern matches strongly.

Recommended scope for the next implementation run:
- tiny editable 2D grayscale/input grid
- tiny editable kernel (2x2 or 3x3)
- live feature-map response
- visible receptive-field sweep or per-position highlighting

Recommended fidelity boundaries:
- do **not** overclaim full CNN history or broader document-recognition system details from this access state;
- do **not** frame convolution as vision magic;
- keep the lesson focused on local receptive fields, weight sharing, and feature-map generation.

## Roadmap effect

This task should be split operationally into:
- `T4a` — source investigation (`DONE`)
- `T4b` — implementation (`NEXT`)

That keeps the source-readiness rule explicit and lets a future run implement the lesson cleanly without repeating the access audit.
