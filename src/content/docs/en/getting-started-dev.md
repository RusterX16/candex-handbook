---
title: "Getting Started — For developers"
description: Get your bearings in the Candex codebase — the system, the repositories, the stack, and your first step.
---

This page orients you if you are going to work on Candex. For the product itself — what it is and how it feels to use — start with [Getting Started — Product](/en/getting-started/).

## The system at a glance

Candex is not one app but a few pieces working together. Users touch the **mobile app**. An **admin dashboard** keeps the drink catalogue accurate. Both talk to a single **REST API**, which holds the domain and stores everything in **PostgreSQL**. Sign-in is handled by **Firebase**.

```mermaid
flowchart LR
  app["Mobile app<br/>(candex-app)"]
  dash["Admin dashboard<br/>(candex-dashboard)"]
  api["REST API<br/>(candex-api)"]
  pg[("PostgreSQL")]
  fb["Firebase Auth"]

  app -->|REST| api
  dash -->|REST| api
  app -->|sign-in| fb
  api -->|verify token| fb
  api -->|JPA + Flyway| pg
```

## Repositories

The workspace holds six repositories. Three are the live system above; the others are either superseded or early.

| Repository | Role | Status |
|------------|------|--------|
| `candex-app` | Mobile client (Angular + Ionic + Capacitor) | Active |
| `candex-dashboard` | Admin dashboard for managing the catalogue | Active |
| `candex-api` | REST API and domain model, backed by PostgreSQL | Active |
| `candex-backups` | Firestore backup tooling | Deprecated — predates the move to PostgreSQL |
| `candex-api-legacy` | Previous API (Node.js / Express) | Deprecated |
| `candex-ai` | AI module (Python) | Early / placeholder |

## Tech stack

**Front-end** — the mobile app and the admin dashboard

<div class="tech-grid">
  <a class="tech-card" href="https://angular.dev" target="_blank" rel="noopener"><img src="/logos/angular.svg" alt="Angular" /><span class="tc-name">Angular<span class="tc-note">v20</span></span></a>
  <a class="tech-card" href="https://ionicframework.com" target="_blank" rel="noopener"><img src="/logos/ionic.svg" alt="Ionic" /><span class="tc-name">Ionic<span class="tc-note">v8</span></span></a>
  <a class="tech-card" href="https://capacitorjs.com" target="_blank" rel="noopener"><img src="/logos/capacitor.svg" alt="Capacitor" /><span class="tc-name">Capacitor<span class="tc-note">v7</span></span></a>
  <a class="tech-card" href="https://www.typescriptlang.org" target="_blank" rel="noopener"><img src="/logos/typescript.svg" alt="TypeScript" /><span class="tc-name">TypeScript</span></a>
  <a class="tech-card" href="https://ngrx.io" target="_blank" rel="noopener"><span class="tc-mono">Ng</span><span class="tc-name">NgRx<span class="tc-note">Store · Effects · Entity</span></span></a>
  <a class="tech-card" href="https://rxjs.dev" target="_blank" rel="noopener"><img src="/logos/rxjs.svg" alt="RxJS" /><span class="tc-name">RxJS</span></a>
  <a class="tech-card" href="https://material.angular.io" target="_blank" rel="noopener"><span class="tc-mono">Mat</span><span class="tc-name">Angular Material<span class="tc-note">dashboard</span></span></a>
  <a class="tech-card" href="https://firebase.google.com/products/auth" target="_blank" rel="noopener"><img src="/logos/firebase.svg" alt="Firebase" /><span class="tc-name">Firebase<span class="tc-note">Auth</span></span></a>
</div>

**Back-end** — the REST API

<div class="tech-grid">
  <a class="tech-card" href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener"><img src="/logos/spring.svg" alt="Spring Boot" /><span class="tc-name">Spring Boot<span class="tc-note">v3.5</span></span></a>
  <a class="tech-card" href="https://openjdk.org" target="_blank" rel="noopener"><img src="/logos/java.svg" alt="Java" /><span class="tc-name">Java<span class="tc-note">21</span></span></a>
  <a class="tech-card" href="https://maven.apache.org" target="_blank" rel="noopener"><span class="tc-mono">Mvn</span><span class="tc-name">Maven<span class="tc-note">build (wrapper)</span></span></a>
  <a class="tech-card" href="https://www.postgresql.org" target="_blank" rel="noopener"><img src="/logos/postgresql.svg" alt="PostgreSQL" /><span class="tc-name">PostgreSQL</span></a>
  <a class="tech-card" href="https://www.red-gate.com/products/flyway/" target="_blank" rel="noopener"><span class="tc-mono">Fw</span><span class="tc-name">Flyway<span class="tc-note">migrations</span></span></a>
  <a class="tech-card" href="https://mapstruct.org" target="_blank" rel="noopener"><span class="tc-mono">Ms</span><span class="tc-name">MapStruct<span class="tc-note">mapping</span></span></a>
  <a class="tech-card" href="https://spring.io/projects/spring-security" target="_blank" rel="noopener"><span class="tc-mono">OA2</span><span class="tc-name">Spring Security<span class="tc-note">OAuth2</span></span></a>
  <a class="tech-card" href="https://swagger.io" target="_blank" rel="noopener"><img src="/logos/swagger.svg" alt="OpenAPI" /><span class="tc-name">OpenAPI<span class="tc-note">springdoc</span></span></a>
</div>

**Quality & delivery**

<div class="tech-grid">
  <a class="tech-card" href="https://www.docker.com" target="_blank" rel="noopener"><img src="/logos/docker.svg" alt="Docker" /><span class="tc-name">Docker<span class="tc-note">Compose</span></span></a>
  <a class="tech-card" href="https://junit.org" target="_blank" rel="noopener"><span class="tc-mono">JU</span><span class="tc-name">JUnit<span class="tc-note">+ Mockito</span></span></a>
  <a class="tech-card" href="https://testcontainers.com" target="_blank" rel="noopener"><span class="tc-mono">Tc</span><span class="tc-name">Testcontainers</span></a>
  <a class="tech-card" href="https://www.jacoco.org/jacoco/" target="_blank" rel="noopener"><span class="tc-mono">Jc</span><span class="tc-name">JaCoCo<span class="tc-note">couverture</span></span></a>
  <a class="tech-card" href="https://eslint.org" target="_blank" rel="noopener"><img src="/logos/eslint.svg" alt="ESLint" /><span class="tc-name">ESLint</span></a>
  <a class="tech-card" href="https://www.cypress.io" target="_blank" rel="noopener"><img src="/logos/cypress.svg" alt="Cypress" /><span class="tc-name">Cypress<span class="tc-note">e2e</span></span></a>
</div>

## Where things live

- **Domain & API** — `candex-api`. Entities and business rules in `src/main/java`; schema in PostgreSQL, evolved through Flyway migrations under `src/main/resources/db/migration`.
- **Mobile UI** — `candex-app` (Angular + Ionic, NgRx for state).
- **Admin UI** — `candex-dashboard` (Angular + Ionic + Angular Material).

The codebase is the source of truth: when documentation and code disagree, the code wins and the docs are corrected.

## Running it locally

Candex runs as three apps — the mobile app and the dashboard (Ionic/Angular, run with npm) and the API (Maven + Spring Boot, with PostgreSQL), each in three environments (local, dev, prod). The full setup — prerequisites, cloning, environment files, the database, and the per-app commands — lives in the **Local Installation** handbook *(planned)*.

## Where to go next

- Set up your machine → Local Installation *(planned)*
- Understand how the pieces fit, and why → Architecture & Overview *(planned)*
- The precise domain language → Glossary / Domain *(planned)*

**Your first step:** clone the repositories, then follow Local Installation to get the API and at least one front-end running against a local database.
