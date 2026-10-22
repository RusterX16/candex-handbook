---
title: "Releases"
description: Comment les trois projets Candex sont versionnés et livrés — l'app mobile vers les stores, l'API via son pipeline de déploiement, et le dashboard admin.
---

Candex, ce sont trois projets déployables, chacun versionné et releasé de son côté : l'app mobile (`candex-app`), l'API (`candex-api`) et le dashboard admin (`candex-dashboard`). Pour le runtime et l'infrastructure, voir [Déploiement](/fr/deployment/).

## App mobile (`candex-app`)

L'app porte une seule version sur web, Android et iOS. Une release se coupe avec le script de release :

```bash
npm run release 1.2.0
```

`scripts/release.js` bumpe la version partout où elle vit — `package.json`, le `build.gradle` Android (`versionName` et `versionCode`), et le `project.pbxproj` iOS — met à jour `CHANGELOG.md`, commite le changement, et crée un **tag git annoté** dont le message est la section du changelog de cette version. Si une étape échoue, il rollback (restaure les fichiers, supprime le tag). Il affiche ensuite la commande de push :

```bash
git push && git push origin 1.2.0
```

Pousser le tag déclenche **`github-release.yml`** (« Create GitHub Release »), qui publie la Release GitHub. La livraison aux stores est une étape séparée et manuelle : le workflow **« Deploy to Stores »** (`deploy.yml`, `workflow_dispatch`) prend un tag déjà releasé et, via **Fastlane**, build et soumet **Android → Google Play** (un AAB) et **iOS → App Store** (un IPA vers App Store Connect).

*(Version actuelle de l'app : 1.1.4.)*

## API (`candex-api`)

L'API est un projet Maven ; sa version vit dans `pom.xml` (actuellement 1.1.10). Elle est releasée en déployant son image Docker : les workflows **Deployment Development** (`deploy-dev.yml`) et **Deployment Production** (`deploy-prod.yml`) se lancent automatiquement après une CI réussie (`workflow_run`), ou manuellement (`workflow_dispatch`). Le build de l'image et les stacks Compose sont couverts dans [Déploiement](/fr/deployment/).

## Dashboard admin (`candex-dashboard`)

Le dashboard suit le même style de script de release : `npm run release` bumpe `package.json` et `CHANGELOG.md` et tague la version (web uniquement, pas de fichiers mobiles). Sa version est actuellement 1.0.0. La CI tourne à chaque changement ; il n'y a pas de workflow de store ou de déploiement dans le dépôt, donc son déploiement est géré ailleurs *(à confirmer)*.

## Versioning

Chaque projet a sa propre version sémantique et son propre `CHANGELOG.md` — l'app, l'API et le dashboard évoluent indépendamment.

## Pour aller plus loin

- Le runtime, les images et l'infrastructure → [Déploiement](/fr/deployment/)
- Les contrôles qui gardent une release → [Tests](/fr/testing/) · [Qualité logicielle](/fr/software-quality/)
