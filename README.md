# Candex Handbook

The documentation ecosystem for [Candex](https://candex.app) — a set of focused
handbooks covering the product, domain, and engineering. Built with
[Astro Starlight](https://starlight.astro.build).

English is the canonical language; a French version is available from the
language selector. Every page supports System / Light / Dark themes, full-text
search, and a per-handbook PDF export.

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
```

## Build & preview

```bash
npm run build
npm run preview
```

## PDF export

```bash
npm i -D playwright && npx playwright install chromium   # once
npm run build && npm run pdf                             # outputs to ./pdf
```

## Versioning & history

Each reviewed version is a git tag, with a matching entry in `CHANGELOG.md` and
a rendered PDF snapshot under `releases/<version>/`. To see an earlier version,
check out its tag and run `npm run dev`, or open its PDF under `releases/`.

## Structure

- `src/content/docs/en` — canonical English handbooks
- `src/content/docs/fr` — French translations
- `src/styles/candex.css` — Candex brand tokens (from candex-app)
- `src/components/Head.astro` — client-side Mermaid rendering
- `scripts/export-pdf.mjs` — PDF export
- `public/logos` — tech-stack logos

## Releasing

Each release is historised: the PDFs are snapshotted under `releases/v<version>/`, the
`CHANGELOG.md` records what changed, and a `v<version>` tag is created.

```bash
# 1. write the notes for the new version under a "## [x.y.z]" heading in CHANGELOG.md
# 2. cut the release (build + export PDFs + snapshot + commit + tag):
npm run release -- 0.19.0
```

Options: `--skip-build` reuses the current build/PDFs, `--no-git` skips the commit/tag.
The script never pushes — publish yourself with `git push && git push --tags`.
