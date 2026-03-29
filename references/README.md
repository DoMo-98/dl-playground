# References

This folder is the source-material area for `dl-playground`.

## Current policy

For now, the repository stores:

- paper metadata
- official or preferred external source links
- per-paper notes and summaries
- lesson mapping and relevance

For now, the repository does **not** need to store the full PDFs when they are too heavy or inconvenient.

## Structure

- `references/index.md` — master index of tracked papers
- `references/notes/` — per-paper notes, summaries, excerpts, lesson ideas
- `references/papers/` — optional curated local copies only if ever worth keeping
- `references/inbox/` — optional temporary landing zone for lightweight files or extracted notes

## Source policy

Preferred source order:

1. official proceedings or publisher page
2. official archive (`arXiv`, `OpenReview`, `PMLR`, `JMLR`)
3. author page or trusted institutional mirror

## Format notes

Possible source/file states:

- `textual-pdf-likely`
- `historical-scan-likely`
- `html-or-pdf`
- `unknown`

If a source is scanned or awkward to parse, the fallback is to create a concise markdown note capturing the useful parts.

## Goal

The repo should act as the structured knowledge layer for lesson creation, not as a heavy binary warehouse.
