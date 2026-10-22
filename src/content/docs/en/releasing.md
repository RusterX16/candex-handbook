---
title: "Releasing"
description: How the handbook is versioned and released — the historisation model, the release script, and how to revisit any past version.
---

The handbook is versioned so any past state can be revisited. Each release keeps three things together: a git tag, a `CHANGELOG.md` entry, and a rendered PDF snapshot.

## The historisation model

Every reviewed version `vX.Y.Z` has:

- a **git tag** `vX.Y.Z`,
- a **`CHANGELOG.md`** entry describing what changed,
- a **PDF snapshot** under `releases/vX.Y.Z/` — every handbook, in English and French, plus the combined PDF.

## Cutting a release

First, write the notes for the new version under a `## [x.y.z]` heading in `CHANGELOG.md`. Then run the release script:

```bash
npm run release -- 0.21.0
```

It checks the CHANGELOG entry (and stops if it is missing), builds the site, exports the PDFs, snapshots them under `releases/v0.21.0/`, and creates the commit and tag.

Options: `--skip-build` reuses the current build and PDFs; `--no-git` does the snapshot without committing. The script **never pushes** — you publish yourself:

```bash
git push && git push --tags
```

## PDF export

`npm run pdf` (`scripts/export-pdf.mjs`) renders every handbook to A4 PDF — forcing the light theme, waiting for Mermaid diagrams to render, and stamping each page with a header (the document title) and a footer (`Candex Handbook · Eliott Barbet` and `Page X / Y`). It then merges them, in reading order, into a single `candex-handbook-en.pdf` and `candex-handbook-fr.pdf` (via `pdf-lib`). PDFs are written to both `dist/pdf` (served by the site) and `public/pdf`.

## Revisiting a past version

Two ways:

- **Read the snapshot** — open the PDF under `releases/vX.Y.Z/`.
- **Run the source** — `git checkout vX.Y.Z`, then `npm run dev`.

## Where to go next

- Running it locally → [Local Installation](/en/local-installation/)
- Deploying the apps → [Deployment](/en/deployment/)
