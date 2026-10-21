---
title: "Prise en main — Développeurs"
description: Prendre ses repères dans le code de Candex — le système, les dépôts, la stack, et la première étape.
---

Cette page vous oriente si vous allez travailler sur Candex. Pour le produit lui-même — ce que c'est et l'expérience — commencez par [Prise en main — Produit](/fr/getting-started/).

## Le système en un coup d'œil

Candex n'est pas une seule application mais plusieurs pièces qui fonctionnent ensemble. Les utilisateurs utilisent l'**application mobile**. Un **tableau de bord d'administration** garde le catalogue à jour. Les deux dialoguent avec une seule **API REST**, qui détient le domaine et stocke tout dans **PostgreSQL**. L'authentification est gérée par **Firebase**.

```mermaid
flowchart LR
  app["Application mobile<br/>(candex-app)"]
  dash["Tableau de bord admin<br/>(candex-dashboard)"]
  api["API REST<br/>(candex-api)"]
  pg[("PostgreSQL")]
  fb["Firebase Auth"]

  app -->|REST| api
  dash -->|REST| api
  app -->|connexion| fb
  api -->|vérif. du token| fb
  api -->|JPA + Flyway| pg
```

## Dépôts

L'espace de travail contient six dépôts. Trois forment le système vivant ci-dessus ; les autres sont soit remplacés, soit à un stade précoce.

| Dépôt | Rôle | Statut |
|-------|------|--------|
| `candex-app` | Client mobile (Angular + Ionic + Capacitor) | Actif |
| `candex-dashboard` | Tableau de bord d'administration du catalogue | Actif |
| `candex-api` | API REST et modèle de domaine, adossée à PostgreSQL | Actif |
| `candex-backups` | Outils de sauvegarde Firestore | Déprécié — antérieur au passage à PostgreSQL |
| `candex-api-legacy` | Ancienne API (Node.js / Express) | Déprécié |
| `candex-ai` | Module IA (Python) | Précoce / ébauche |

## Stack technique

**Front-end** — l'application mobile et le tableau de bord

<div class="tech-grid">
  <a class="tech-card" href="https://angular.dev" target="_blank" rel="noopener"><img src="/logos/angular.svg" alt="Angular" /><span class="tc-name">Angular<span class="tc-note">v20</span></span></a>
  <a class="tech-card" href="https://ionicframework.com" target="_blank" rel="noopener"><img src="/logos/ionic.svg" alt="Ionic" /><span class="tc-name">Ionic<span class="tc-note">v8</span></span></a>
  <a class="tech-card" href="https://capacitorjs.com" target="_blank" rel="noopener"><img src="/logos/capacitor.svg" alt="Capacitor" /><span class="tc-name">Capacitor<span class="tc-note">v7</span></span></a>
  <a class="tech-card" href="https://www.typescriptlang.org" target="_blank" rel="noopener"><img src="/logos/typescript.svg" alt="TypeScript" /><span class="tc-name">TypeScript</span></a>
  <a class="tech-card" href="https://ngrx.io" target="_blank" rel="noopener"><span class="tc-mono">Ng</span><span class="tc-name">NgRx<span class="tc-note">Store · Effects · Entity</span></span></a>
  <a class="tech-card" href="https://rxjs.dev" target="_blank" rel="noopener"><img src="/logos/rxjs.svg" alt="RxJS" /><span class="tc-name">RxJS</span></a>
  <a class="tech-card" href="https://material.angular.io" target="_blank" rel="noopener"><span class="tc-mono">Mat</span><span class="tc-name">Angular Material<span class="tc-note">tableau de bord</span></span></a>
  <a class="tech-card" href="https://firebase.google.com/products/auth" target="_blank" rel="noopener"><img src="/logos/firebase.svg" alt="Firebase" /><span class="tc-name">Firebase<span class="tc-note">Auth</span></span></a>
</div>

**Back-end** — l'API REST

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

**Qualité & livraison**

<div class="tech-grid">
  <a class="tech-card" href="https://www.docker.com" target="_blank" rel="noopener"><img src="/logos/docker.svg" alt="Docker" /><span class="tc-name">Docker<span class="tc-note">Compose</span></span></a>
  <a class="tech-card" href="https://junit.org" target="_blank" rel="noopener"><span class="tc-mono">JU</span><span class="tc-name">JUnit<span class="tc-note">+ Mockito</span></span></a>
  <a class="tech-card" href="https://testcontainers.com" target="_blank" rel="noopener"><span class="tc-mono">Tc</span><span class="tc-name">Testcontainers</span></a>
  <a class="tech-card" href="https://www.jacoco.org/jacoco/" target="_blank" rel="noopener"><span class="tc-mono">Jc</span><span class="tc-name">JaCoCo<span class="tc-note">couverture</span></span></a>
  <a class="tech-card" href="https://eslint.org" target="_blank" rel="noopener"><img src="/logos/eslint.svg" alt="ESLint" /><span class="tc-name">ESLint</span></a>
  <a class="tech-card" href="https://www.cypress.io" target="_blank" rel="noopener"><img src="/logos/cypress.svg" alt="Cypress" /><span class="tc-name">Cypress<span class="tc-note">e2e</span></span></a>
</div>

## Où vivent les choses

- **Domaine & API** — `candex-api`. Entités et règles métier dans `src/main/java` ; schéma dans PostgreSQL, qui évolue via les migrations Flyway sous `src/main/resources/db/migration`.
- **UI mobile** — `candex-app` (Angular + Ionic, NgRx pour l'état).
- **UI admin** — `candex-dashboard` (Angular + Ionic + Angular Material).

Le code est la source de vérité : quand la documentation et le code divergent, le code fait foi et la doc est corrigée.

## L'installer en local

Candex tourne sous forme de trois applications — l'application mobile et le tableau de bord (Ionic/Angular, lancés avec npm) et l'API (Maven + Spring Boot, avec PostgreSQL), chacune dans trois environnements (local, dev, prod). L'installation complète — prérequis, clonage, fichiers d'environnement, base de données, et les commandes par application — vit dans le handbook **Local Installation** (à venir).

## Où aller ensuite

- Configurer votre machine → Local Installation *(à venir)*
- Comprendre l'assemblage et le pourquoi → Architecture & Vue d'ensemble *(à venir)*
- Le langage précis du domaine → Glossaire / Domaine *(à venir)*

**Votre première étape :** clonez les dépôts, puis suivez Local Installation pour lancer l'API et au moins un front contre une base locale.
