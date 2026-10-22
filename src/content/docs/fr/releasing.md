---
title: "Releases"
description: Comment le handbook est versionné et releasé — le modèle d'historisation, le script de release, et comment revisiter n'importe quelle version passée.
---

Le handbook est versionné pour qu'on puisse revisiter n'importe quel état passé. Chaque release garde trois choses ensemble : un tag git, une entrée `CHANGELOG.md`, et un snapshot PDF rendu.

## Le modèle d'historisation

Chaque version revue `vX.Y.Z` a :

- un **tag git** `vX.Y.Z`,
- une entrée **`CHANGELOG.md`** décrivant ce qui a changé,
- un **snapshot PDF** sous `releases/vX.Y.Z/` — chaque handbook, en anglais et en français, plus le PDF combiné.

## Couper une release

D'abord, écris les notes de la nouvelle version sous un titre `## [x.y.z]` dans `CHANGELOG.md`. Ensuite, lance le script de release :

```bash
npm run release -- 0.21.0
```

Il vérifie l'entrée du CHANGELOG (et s'arrête si elle manque), build le site, exporte les PDFs, les snapshot sous `releases/v0.21.0/`, et crée le commit et le tag.

Options : `--skip-build` réutilise le build et les PDFs actuels ; `--no-git` fait le snapshot sans committer. Le script **ne push jamais** — tu publies toi-même :

```bash
git push && git push --tags
```

## Export PDF

`npm run pdf` (`scripts/export-pdf.mjs`) rend chaque handbook en PDF A4 — en forçant le thème clair, en attendant le rendu des diagrammes Mermaid, et en estampillant chaque page d'un en-tête (le titre du document) et d'un pied de page (`Candex Handbook · Eliott Barbet` et `Page X / Y`). Il les fusionne ensuite, dans l'ordre de lecture, en un seul `candex-handbook-en.pdf` et `candex-handbook-fr.pdf` (via `pdf-lib`). Les PDFs sont écrits à la fois dans `dist/pdf` (servi par le site) et `public/pdf`.

## Revisiter une version passée

Deux façons :

- **Lire le snapshot** — ouvrir le PDF sous `releases/vX.Y.Z/`.
- **Lancer la source** — `git checkout vX.Y.Z`, puis `npm run dev`.

## Pour aller plus loin

- Le lancer en local → [Installation locale](/fr/local-installation/)
- Déployer les apps → [Déploiement](/fr/deployment/)
