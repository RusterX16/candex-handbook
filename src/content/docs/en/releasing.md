---
title: "Releasing"
description: How the three Candex projects are versioned and shipped — the mobile app to the stores, the API via its deploy pipeline, and the admin dashboard.
---

Candex is three deployable projects, each versioned and released on its own: the mobile app (`candex-app`), the API (`candex-api`), and the admin dashboard (`candex-dashboard`). For the runtime and infrastructure side, see [Deployment](/en/deployment/).

## Mobile app (`candex-app`)

The app carries one version across web, Android, and iOS. A release is cut with the release script:

```bash
npm run release 1.2.0
```

`scripts/release.js` bumps the version everywhere it lives — `package.json`, the Android `build.gradle` (`versionName` and `versionCode`), and the iOS `project.pbxproj` — updates `CHANGELOG.md`, commits the change, and creates an **annotated git tag** whose message is that version's changelog section. If any step fails it rolls back (restores the files, deletes the tag). It then prints the push command:

```bash
git push && git push origin 1.2.0
```

Pushing the tag triggers **`github-release.yml`** ("Create GitHub Release"), which publishes the GitHub Release. Shipping to the stores is a separate, manual step: the **"Deploy to Stores"** workflow (`deploy.yml`, `workflow_dispatch`) takes an already-released tag and, via **Fastlane**, builds and submits **Android → Google Play** (an AAB) and **iOS → App Store** (an IPA to App Store Connect).

*(Current app version: 1.1.4.)*

## API (`candex-api`)

The API is a Maven project; its version lives in `pom.xml` (currently 1.1.10). It is released by deploying its Docker image: the **Deployment Development** (`deploy-dev.yml`) and **Deployment Production** (`deploy-prod.yml`) workflows run automatically after CI completes successfully (`workflow_run`), or manually (`workflow_dispatch`). The image build and the Compose stacks are covered in [Deployment](/en/deployment/).

## Admin dashboard (`candex-dashboard`)

The dashboard follows the same release-script style: `npm run release` bumps `package.json` and `CHANGELOG.md` and tags the version (web only, no mobile files). Its version is currently 1.0.0. CI runs on every change; there is no store or deploy workflow in the repository, so its deployment is handled elsewhere *(to confirm)*.

## Versioning

Each project has its own semantic version and its own `CHANGELOG.md` — the app, the API, and the dashboard move independently.

## Where to go next

- The runtime, images, and infrastructure → [Deployment](/en/deployment/)
- The checks that gate a release → [Testing](/en/testing/) · [Software Quality](/en/software-quality/)
