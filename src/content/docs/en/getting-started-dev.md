---
title: "Working on Candex"
description: Get your bearings in the Candex codebase — the system, the repositories, the stack, and your first step.
---

This page orients you if you are going to work on Candex. For the product itself — what it is and how it feels to use — start with [Understanding Candex](/en/getting-started/).

## The system at a glance

Candex is not one app but a few pieces working together. Users touch the **mobile app**. An **admin dashboard** keeps the drink catalogue accurate. Both talk to a single **REST API**, which holds the domain and stores everything in **PostgreSQL**. Sign-in is handled by **Firebase**.

```mermaid
flowchart LR
  subgraph clients [Clients]
    direction TB
    app["Mobile app<br/>(candex-app)"]
    dash["Admin dashboard<br/>(candex-dashboard)"]
  end
  api["REST API<br/>(candex-api)"]
  fb(["Firebase Auth"])
  pg[("PostgreSQL")]

  app -->|REST| api
  dash -->|REST| api
  app -.->|sign-in| fb
  api -->|verify token| fb
  api -->|JPA · Flyway| pg

  classDef svc fill:#00B1FF,stroke:#0089c4,color:#001018;
  classDef store fill:#033C44,stroke:#02262c,color:#ffffff;
  classDef ext fill:#eef3f6,stroke:#8aa0a6,color:#14323a;
  classDef client fill:#f4fbff,stroke:#00B1FF,color:#07202a;
  class api svc
  class pg store
  class fb ext
  class app,dash client
```

## Repositories

| Repository | Role | Status |
|------------|------|--------|
| `candex-app` | Mobile client (Angular + Ionic + Capacitor) | Active |
| `candex-dashboard` | Admin dashboard for managing the catalogue | Active |
| `candex-api` | REST API and domain model, backed by PostgreSQL | Active |
| `candex-handbook` | This documentation site (Astro Starlight) | Active |
| `candex-crawler` | Crawler that gathers drink and catalogue data | Active |
| `candex-ai` | AI module (Python) | Early / placeholder |
| `candex-backups` | Firestore backup tooling | Deprecated — predates the move to PostgreSQL |
| `candex-api-legacy` | Previous API (Node.js / Express) | Deprecated |

:::note
`candex-crawler` lives in its own repository (outside the main workspace); its role is summarised here from its purpose and will be detailed in its own handbook.
:::

## Tech stack

**Mobile app** — `candex-app`

<div class="tech-grid">
  <a class="tech-card" href="https://angular.dev" target="_blank" rel="noopener"><img src="/logos/angular.svg" alt="Angular" /><span class="tc-name">Angular<span class="tc-note">v20</span></span></a>
  <a class="tech-card" href="https://ionicframework.com" target="_blank" rel="noopener"><img src="/logos/ionic.svg" alt="Ionic" /><span class="tc-name">Ionic<span class="tc-note">v8</span></span></a>
  <a class="tech-card" href="https://capacitorjs.com" target="_blank" rel="noopener"><img src="/logos/capacitor.svg" alt="Capacitor" /><span class="tc-name">Capacitor<span class="tc-note">v7</span></span></a>
  <a class="tech-card" href="https://www.typescriptlang.org" target="_blank" rel="noopener"><img src="/logos/typescript.svg" alt="TypeScript" /><span class="tc-name">TypeScript</span></a>
  <a class="tech-card" href="https://ngrx.io" target="_blank" rel="noopener"><img src="/logos/ngrx.svg" alt="NgRx" /><span class="tc-name">NgRx<span class="tc-note">Store · Effects · Entity</span></span></a>
  <a class="tech-card" href="https://rxjs.dev" target="_blank" rel="noopener"><img src="/logos/rxjs.svg" alt="RxJS" /><span class="tc-name">RxJS</span></a>
  <a class="tech-card" href="https://firebase.google.com/products/auth" target="_blank" rel="noopener"><img src="/logos/firebase.svg" alt="Firebase" /><span class="tc-name">Firebase<span class="tc-note">Auth</span></span></a>
</div>

**Admin dashboard** — `candex-dashboard`

<div class="tech-grid">
  <a class="tech-card" href="https://angular.dev" target="_blank" rel="noopener"><img src="/logos/angular.svg" alt="Angular" /><span class="tc-name">Angular<span class="tc-note">v20</span></span></a>
  <a class="tech-card" href="https://ionicframework.com" target="_blank" rel="noopener"><img src="/logos/ionic.svg" alt="Ionic" /><span class="tc-name">Ionic<span class="tc-note">v8</span></span></a>
  <a class="tech-card" href="https://www.typescriptlang.org" target="_blank" rel="noopener"><img src="/logos/typescript.svg" alt="TypeScript" /><span class="tc-name">TypeScript</span></a>
  <a class="tech-card" href="https://material.angular.io" target="_blank" rel="noopener"><span class="tc-mono">Mat</span><span class="tc-name">Angular Material</span></a>
  <a class="tech-card" href="https://firebase.google.com/products/auth" target="_blank" rel="noopener"><img src="/logos/firebase.svg" alt="Firebase" /><span class="tc-name">Firebase<span class="tc-note">Auth</span></span></a>
</div>

**Back-end** — `candex-api`

<div class="tech-grid">
  <a class="tech-card" href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener"><img src="/logos/spring.svg" alt="Spring Boot" /><span class="tc-name">Spring Boot<span class="tc-note">v3.5</span></span></a>
  <a class="tech-card" href="https://openjdk.org" target="_blank" rel="noopener"><img src="/logos/java.svg" alt="Java" /><span class="tc-name">Java<span class="tc-note">21</span></span></a>
  <a class="tech-card" href="https://maven.apache.org" target="_blank" rel="noopener"><img src="/logos/maven.svg" alt="Maven" /><span class="tc-name">Maven<span class="tc-note">build (wrapper)</span></span></a>
  <a class="tech-card" href="https://www.postgresql.org" target="_blank" rel="noopener"><img src="/logos/postgresql.svg" alt="PostgreSQL" /><span class="tc-name">PostgreSQL</span></a>
  <a class="tech-card" href="https://www.red-gate.com/products/flyway/" target="_blank" rel="noopener"><img src="/logos/flyway.svg" alt="Flyway" /><span class="tc-name">Flyway<span class="tc-note">migrations</span></span></a>
  <a class="tech-card" href="https://mapstruct.org" target="_blank" rel="noopener"><span class="tc-mono">Ms</span><span class="tc-name">MapStruct<span class="tc-note">mapping</span></span></a>
  <a class="tech-card" href="https://spring.io/projects/spring-security" target="_blank" rel="noopener"><img src="/logos/springsecurity.svg" alt="Spring Security" /><span class="tc-name">Spring Security<span class="tc-note">OAuth2</span></span></a>
  <a class="tech-card" href="https://swagger.io" target="_blank" rel="noopener"><img src="/logos/swagger.svg" alt="OpenAPI" /><span class="tc-name">OpenAPI<span class="tc-note">springdoc</span></span></a>
</div>

**Quality & delivery**

<div class="tech-grid">
  <a class="tech-card" href="https://www.docker.com" target="_blank" rel="noopener"><img src="/logos/docker.svg" alt="Docker" /><span class="tc-name">Docker<span class="tc-note">Compose</span></span></a>
  <a class="tech-card" href="https://junit.org" target="_blank" rel="noopener"><img src="/logos/junit.svg" alt="JUnit" /><span class="tc-name">JUnit<span class="tc-note">+ Mockito</span></span></a>
  <a class="tech-card" href="https://testcontainers.com" target="_blank" rel="noopener"><span class="tc-mono">Tc</span><span class="tc-name">Testcontainers</span></a>
  <a class="tech-card" href="https://www.jacoco.org/jacoco/" target="_blank" rel="noopener"><span class="tc-mono">Jc</span><span class="tc-name">JaCoCo<span class="tc-note">coverage</span></span></a>
  <a class="tech-card" href="https://eslint.org" target="_blank" rel="noopener"><img src="/logos/eslint.svg" alt="ESLint" /><span class="tc-name">ESLint</span></a>
  <a class="tech-card" href="https://prettier.io" target="_blank" rel="noopener"><img src="/logos/prettier.svg" alt="Prettier" /><span class="tc-name">Prettier</span></a>
  <a class="tech-card" href="https://www.cypress.io" target="_blank" rel="noopener"><img src="/logos/cypress.svg" alt="Cypress" /><span class="tc-name">Cypress<span class="tc-note">e2e</span></span></a>
</div>

## Where things live

- **Domain & API** — `candex-api`. Entities and business rules in `src/main/java`; schema in PostgreSQL, evolved through Flyway migrations under `src/main/resources/db/migration`.
- **Mobile UI** — `candex-app` (Angular + Ionic, NgRx for state).
- **Admin UI** — `candex-dashboard` (Angular + Ionic + Angular Material).

The codebase is the source of truth: when documentation and code disagree, the code wins and the docs are corrected.

## Running it locally

Candex runs as three apps — the mobile app and the dashboard (Ionic/Angular, run with npm) and the API (Maven + Spring Boot, with PostgreSQL), each in three environments (local, dev, prod). The full setup — prerequisites, cloning, environment files, the database, and the per-app commands — lives in the **[Local Installation](/en/local-installation/)** handbook.

## Where to go next

- Set up your machine → [Local Installation](/en/local-installation/)
- Understand how the pieces fit, and why → [Architecture & Overview](/en/architecture/)
- The precise domain language → Glossary / Domain *(planned)*

**Your first step:** clone the repositories, then follow [Local Installation](/en/local-installation/) to get the API and at least one front-end running against a local database.
