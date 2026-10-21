---
title: "API / Contrats"
description: La référence de l'API REST Candex — conventions, enveloppe de réponse, codes de statut, en-têtes, authentification, et les endpoints par ressource.
---

Voici la référence de contrat de `candex-api`. Elle s'appuie sur [Back-end](/fr/back-end/) (comment l'API est construite) et liste les endpoints par ressource. Le **contrat vivant et exhaustif** — schémas requête/réponse, exemples et essai en direct — est **Swagger UI** sur `/swagger-ui.html` ; cette page en est la carte stable.

## Conventions

- **Enveloppe** — chaque réponse est un `Result<T>` : `{ success, data, error }` (voir [Back-end](/fr/back-end/#lenveloppe-de-réponse)).
- **Codes de statut** — issus d'exceptions typées (`404` / `400` / `409` / `422`…) ; voir [Gestion d'erreurs du Back-end](/fr/back-end/#gestion-derreurs).
- **En-têtes** — les réponses de liste portent `X-Total-Count` ; les créations renvoient `201` avec un en-tête `Location`.
- **Authentification** — envoyez un token d'identité Firebase via `Authorization: Bearer <token>`.
- **Accès** — par endpoint, dans les tableaux : `USER_OR_ADMIN` = tout utilisateur authentifié, `ADMIN` = admin seulement, `PUBLIC` = sans auth, **own** = l'utilisateur authentifié n'agit que sur ses propres enregistrements.
- **Chemin de base** — les ressources sont servies sous la base de l'API (par exemple `/api/drinks`).

## Catalogue

### Drinks — `/drinks`

| Méthode | Chemin | Accès | But |
|---------|--------|-------|-----|
| `GET` | `/drinks` | USER_OR_ADMIN | Lister les boissons |
| `GET` | `/drinks/{id}` | USER_OR_ADMIN | Une boisson |
| `POST` | `/drinks` | ADMIN | Créer une boisson |
| `POST` | `/drinks/import` | ADMIN | Import en masse |
| `POST` | `/drinks/import/diff` | ADMIN | Prévisualiser un import face au catalogue actuel |
| `POST` | `/drinks/import/sync` | ADMIN | Appliquer un import |
| `PUT` | `/drinks/{id}/shift` | ADMIN | Déplacer la position World Dex |
| `PUT` | `/drinks/{id}/swap` | ADMIN | Échanger deux positions World Dex |
| `DELETE` | `/drinks/{id}` | ADMIN | Supprimer une boisson |

### Cans — `/cans`

| Méthode | Chemin | Accès |
|---------|--------|-------|
| `GET` | `/cans` · `/cans/{id}` | USER_OR_ADMIN |
| `POST` | `/cans` | ADMIN |
| `DELETE` | `/cans/{id}` | ADMIN |

### Données de référence (lectures)

Les ressources de référence du catalogue exposent des lectures liste et par-id : **Brands** `/brands`, **Flavors** `/flavors` et **Flavor categories** `/flavor-categories`, **Colors** `/colors` (+ `/colors/extract`), **Drink categories** `/drink-categories`, **Can formats** `/can-formats`, et **App versions** `/app-versions` (+ `/app-versions/current`).

## World Dex — `/world-dex`

| Méthode | Chemin | Accès | But |
|---------|--------|-------|-----|
| `GET` | `/world-dex/drinks/{id}/history` | USER_OR_ADMIN | Historique de position d'une boisson |
| `GET` | `/world-dex/drinks/{id}/stats` | USER_OR_ADMIN | Stats Dex d'une boisson |
| `GET` | `/world-dex/snapshot` | USER_OR_ADMIN | Instantané du Dex |
| `GET` | `/world-dex/movers` | USER_OR_ADMIN | Mouvements récents |
| `GET` | `/world-dex/positions/{position}/occupants` | USER_OR_ADMIN | Qui occupe une position |

## Utilisateurs & collection

### Users — `/users`

| Méthode | Chemin | Accès | But |
|---------|--------|-------|-----|
| `GET` | `/users` | ADMIN | Lister les utilisateurs |
| `GET` | `/users/{id}` | own | Un utilisateur |
| `GET` | `/users/firebase/{firebaseUid}` | own | Un utilisateur par UID Firebase |
| `GET` | `/users/{id}/drinks` | own | Les boissons débloquées d'un utilisateur |
| `GET` | `/users/exists` | PUBLIC | Vérifier l'existence |
| `POST` | `/users` | PUBLIC | S'inscrire |
| `PUT` · `PATCH` | `/users/{id}` | own | Mettre à jour un utilisateur |
| `DELETE` | `/users/{id}` | own | Supprimer un utilisateur |

### Unlocked drinks — `/user-unlocked-drinks`

| Méthode | Chemin | Accès | But |
|---------|--------|-------|-----|
| `GET` | `/user-unlocked-drinks/{userId}` | own | Les déblocages d'un utilisateur |
| `POST` | `/user-unlocked-drinks` | own | Débloquer une boisson |
| `DELETE` | `/user-unlocked-drinks/{userId}/{drinkId}` | own | Retirer un déblocage |

## Admin & opérations

- **Console SQL** — `POST /admin/...` (ADMIN) : exécuter une requête en lecture seule via le rôle dédié (voir [Base de données & Modèle](/fr/database/#console-sql-en-lecture-seule)).
- **Reports** — `POST /reports` : générer un rapport.

## Le flux d'import en masse

Importer un lot de boissons est un pipeline en trois étapes, réservé aux admins :

1. `POST /drinks/import` — soumettre le payload.
2. `POST /drinks/import/diff` — prévisualiser les changements face au catalogue actuel.
3. `POST /drinks/import/sync` — les appliquer.

## Où aller ensuite

- Comment l'API est construite → [Back-end](/fr/back-end/)
- Schémas vivants & essai en direct → **Swagger UI** (`/swagger-ui.html`)
