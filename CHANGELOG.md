# Changelog

All notable changes to the Candex Handbook are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.20.0] — 2026-10-22

### Added
- **UI / UX**: a **Styling conventions** section — cascade-first SCSS, the fixed
  spacing scale (2/4/8/16/32; 12 and 24 only as exceptions), global variables for
  colours/fonts/sizes, no floating CSS outside `.scss`, and strict consistency.

### Fixed
- **Mermaid dev server**: switched Vite `optimizeDeps` from `include` to
  `exclude: ['mermaid']` so diagram modules (e.g. `erDiagram`) stop failing to load
  in `astro dev` after dependency changes. Build and PDF output are unaffected.

## [0.19.0] — 2026-10-22

### Added
- **Release script** (`scripts/release.mjs`, `npm run release -- <version>`):
  automates the historisation ritual — checks the CHANGELOG entry, builds,
  exports the PDFs, snapshots them under `releases/v<version>/`, and creates the
  commit and tag (never pushes).
- A **Releasing** section in the README.

## [0.18.0] — 2026-10-22

### Added
- **Home hub**: the landing page now presents all 16 handbooks as a grouped card
  grid (Start here / Architecture / Operations & Quality / Reference), with an
  author line and a one-click link to the full combined PDF.
- **Diagrams**: an auth sequence diagram (Security), a CI/CD pipeline diagram
  (Deployment), and a test-setup diagram (Testing).
- **PDF author & pagination**: every exported PDF now carries a header (document
  title) and a footer (“Candex Handbook · Eliott Barbet” + “Page X / Y”).
- **Combined PDF**: a single `candex-handbook-en.pdf` / `candex-handbook-fr.pdf`
  bundling every handbook in reading order (EN 66 pages, FR 68 pages).

### Changed
- Added the missing “Where to go next” sections to Architecture, Back-end, and
  Database for consistent cross-linking.
- `export-pdf.mjs` now stamps the header/footer and builds the combined PDF
  (via `pdf-lib`).

## [0.17.0] — 2026-10-22

### Added
- **Product** handbook (EN + FR): the pitch, the audience, a status-tagged feature
  set (Live / In progress / Planned / Exploring), the near-term roadmap, and the
  product principles — grounded in the product notes, with forward-looking items
  clearly marked as not yet shipped.
- **Product** entry added at the top of the Getting Started sidebar group.

## [0.16.0] — 2026-10-22

### Changed
- **UI / UX**: reordered the colour swatches (primary, secondary, tertiary,
  success, warning, danger), fixed their alignment, and gave them clean labels.

### Added
- **UI / UX**: a **Typography** section — Rubik with its three loaded weights
  (Regular 400, Medium 500, Bold 700) and the Ionic-based text sizing.

## [0.15.0] — 2026-10-22

### Added
- **Glossary** handbook (EN + FR): the domain vocabulary — Dex, Unlock, World Dex
  and its history; the catalogue terms (Drink, Can, Brand, Series, Category,
  Flavor, Edition, Predecessor); the per-country localized data (Localization,
  Composition, Claim); reference data; and User — all grounded in the data model.
- New **Reference** sidebar group holding the Glossary.

## [0.14.0] — 2026-10-22

### Added
- **UI / UX** handbook (EN + FR): the app's Ionic design tokens (brand palette +
  Rubik typography), the Light/Dark/System theming via `ThemeService`, the shared
  component library, the three-tab navigation shell and auth stack, the recurring
  interaction patterns (modals, inline validation, banners), and the ngx-translate
  EN/FR internationalization.
- Rendered the design tokens as visible colour swatches (print-safe) instead of a
  plain hex table.
- New **UI / UX** entry in the Architecture sidebar group.

## [0.13.0] — 2026-10-22

### Added
- **Security** handbook (EN + FR): the API's two authentication mechanisms
  (Firebase ID tokens → `ROLE_USER`, and an interim in-memory Basic Auth for the
  admin), the stateless / CSRF-off / CORS setup, the two authorization layers
  (thin HTTP rules plus `@PreAuthorize` method security with `SecurityExpressions`
  and `@securityAccess` ownership checks), and how secrets stay out of the repos.
- New **Security** entry in the Architecture sidebar group.

## [0.12.0] — 2026-10-22

### Added
- **Software Quality** handbook (EN + FR): the API's custom Checkstyle config
  (120-col lines, naming, imports, and complexity caps — method length 60,
  params 7, cyclomatic 10, NPath 200), its suppressions, the front-ends' ESLint 9
  + Prettier + `.editorconfig`, and JetBrains Qodana (active on the API, disabled
  on the app, absent on the dashboard).
- **DeepSource** continuous analysis across all three repositories (Java analyzer
  on the API with fixture-aware `test_patterns`, JavaScript + Angular analyzer on
  the app and dashboard).
- New **Software Quality** entry in the Quality sidebar group.

### Changed
- Linked Software Quality ↔ Testing (replaced the “planned” placeholder).

## [0.11.0] — 2026-10-21

### Added
- **Testing** handbook (EN + FR): the two-level API test strategy (JUnit 5 +
  Mockito unit tests, Testcontainers integration against a real PostgreSQL),
  the JaCoCo 100% coverage gate and Checkstyle, the Angular front-ends'
  Karma/Jasmine unit tests and Cypress e2e, and the per-repo CI quality gates.
- Testing **conventions** grounded in the codebase: one unit per file, one
  `@Nested`/`describe` per method, one `@Test`/`it` per case, a smoke test per
  file (`contextLoads` / `should be created`), and shared fixtures
  (`util/test/fixture`, `utils/tests/mocks.ts`) instead of re-created objects.
- New **Quality** sidebar group (FR: Qualité).

### Changed
- Added `/en/testing/` and `/fr/testing/` to the PDF export routes.

## [0.10.0] — 2026-10-21

### Added
- **Backups** handbook (EN + FR): the production PostgreSQL backup strategy
  (daily `pg_dump -Fc` + GFS retention + a kept-forever per-version snapshot),
  the `daily_backup.sh` / selective `dump_*.sh` scripts, restore testing, and the
  GitHub Actions automation (`backup-prod.yml`, pre-deploy snapshot).

### Changed
- Linked Backups from the Deployment handbook.

## [0.9.0] — 2026-10-21

### Added
- **Deployment** handbook (EN + FR): per-environment Docker Compose stacks, the
  multi-stage API image, operating a running stack (`candex.sh`), the CI/CD
  workflows, the server-level reverse proxy (to confirm), and the mobile app's
  store releases via Fastlane.

### Changed
- Linked Deployment from Architecture and Back-end.

## [0.8.0] — 2026-10-21

### Added
- **API / Contracts** handbook (EN + FR): the contract conventions (envelope,
  status codes, headers, authentication, access model), per-resource endpoint
  tables (~45 endpoints), the bulk-import flow, and Swagger as the live reference.

### Changed
- Linked API / Contracts from the Back-end handbook.

## [0.7.0] — 2026-10-21

### Added
- **Front-end** handbook (EN + FR): the mobile app (standalone Angular, NgRx
  slices with a one-way flow diagram, services, guards, interceptors, pipes,
  navigation, cross-cutting concerns) and the admin dashboard (Angular Material,
  service-based state).

### Changed
- Back-end handbook: detailed each layer's responsibility, and documented every
  exception with its HTTP status and when it is raised.
- Linked the Front-end handbook from Architecture.

## [0.6.0] — 2026-10-21

### Added
- **Back-end** handbook (EN + FR): request flow, the `Result` response envelope,
  the API surface, services, error handling (`api` / `business` taxonomy),
  authorization, scheduled jobs, and configuration.

### Changed
- Linked the Back-end handbook from the Database handbook.

## [0.5.0] — 2026-10-21

### Added
- **Database & Model** handbook (EN + FR): schema organisation, the full entity
  ER diagram, reference & seed data, the Flyway migration strategy, World Dex
  ordering (routines & triggers), and the read-only SQL console role.

### Changed
- Linked the Database handbook from the Architecture domain section.

### Fixed
- Pre-bundle Mermaid in Vite (`optimizeDeps`) so diagrams render in `npm run dev`.

## [0.4.0] — 2026-10-21

### Added
- **Architecture & Overview** handbook (EN + FR): the domain model (ER diagram),
  the API's layered structure, the Firebase authentication flow (sequence
  diagram), data & Flyway migrations, the front-ends, deployment topology, and
  grounded design notes (with "to confirm" items).
- A new **Architecture** section in the navigation.

## [0.3.0] — 2026-10-21

### Added
- **Local Installation** handbook (EN + FR): run the API with a local PostgreSQL
  (built from scratch by Flyway), the mobile app, and the admin dashboard —
  with ports, prerequisites, env files, a secret-free Firebase section, and
  troubleshooting.
- `.env.example` templates for `candex-api`, `candex-app`, and `candex-dashboard`
  (placeholders only).
- A new **Guides** section in the navigation.

### Changed
- Added a "curious" audience to the Understanding Candex handbook.
- Linked Local Installation from the developer handbook.

## [0.2.1] — 2026-10-21

### Changed
- Reworked the "Download PDF" action into a subtle link under the page title.
- Renamed the Getting Started handbooks to **Understanding Candex** (product) and
  **Working on Candex** (developers).
- Redrew the system diagram: grouped clients, brand colours, clearer edges.

### Added
- Brand logos for NgRx, Maven, Flyway, Spring Security, JUnit, and Prettier.
- Split the developer tech stack into **Mobile app** and **Admin dashboard**.
- Listed `candex-handbook`, `candex-crawler`, and `candex-ai` in the repositories table.

## [0.2.0] — 2026-10-21

### Changed
- Split **Getting Started** into two handbooks: **Product** (what Candex is — for
  everyone) and **For developers** (system, repositories, stack, local setup).
  The Product handbook opens on a concrete scene, merges the feature list into
  the core loop, and drops the engineering detail.

### Added
- Real, theme-aware app screenshots (the World Dex and a drink page) in the
  Product handbook.
- A **Download PDF** button on every handbook page; PDFs for both handbooks
  (EN + FR) served from the site.
- A new planned handbook: **Local Installation**.

### Notes
- A dedicated product schematic is deferred.

## [0.1.0] — 2026-10-21

First version of the documentation ecosystem — the pilot.

### Added
- Astro Starlight site scaffold with EN/FR localisation, System/Light/Dark
  themes, full-text search (Pagefind), and sitemap.
- Candex brand identity (primary `#00B1FF`, teal `#033C44`, self-hosted Rubik).
- **Getting Started** handbook (English), product-first: what Candex is, how it
  works, core concepts, the system behind it, tech stack, running it locally,
  and where to go next.
- Client-side, theme-aware Mermaid rendering.
- Per-handbook PDF export (`npm run pdf`) with an intentional print style.
- French translation of the Getting Started handbook.
- Versioned PDF snapshots under `releases/` (EN + FR).
