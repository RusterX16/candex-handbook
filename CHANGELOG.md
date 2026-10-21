# Changelog

All notable changes to the Candex Handbook are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/).

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
