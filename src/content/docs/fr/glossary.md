---
title: "Glossaire"
description: Le vocabulaire métier de Candex — les termes partagés par l'app, le modèle de données et les autres handbooks.
---

Candex a son propre vocabulaire. Voici les termes partagés par l'app, la [Base de données](/fr/database/) et le [Back-end](/fr/back-end/), ancrés dans le modèle de données.

## Collection & progression

**Dex** — la **collection personnelle** d'un utilisateur : l'ensemble des boissons qu'il a débloquées. C'est le tab d'accueil de l'app et le cœur de l'expérience.

**Unlock (débloquer)** — l'action d'ajouter une boisson à son Dex. Une boisson ne peut être débloquée qu'une fois par utilisateur (`UserUnlockedDrink`, clé utilisateur + boisson), et le déblocage est horodaté.

**World Dex** — la **liste globale et classée** des boissons, partagée par tout le monde : chaque boisson occupe une position numérotée dans le dex mondial. À distinguer du Dex personnel d'un utilisateur.

**Historique du World Dex** — l'enregistrement de l'évolution des positions du World Dex. Un trigger de base de données journalise chaque *départ* (la position qu'une boisson a quittée) et une ligne d'*arrivée* marque sa première entrée, de sorte que la position d'une boisson à n'importe quel instant passé peut être reconstruite. Voir [Base de données](/fr/database/) pour le mécanisme.

## Catalogue

**Drink (boisson)** — l'élément central du catalogue : un produit de boisson précis, avec ses noms, sa marque et sa catégorie, ses saveurs, ses flags d'édition, ses dates de cycle de vie, et la version de l'app où il a été introduit. La nutrition et les claims sont stockés à part, par pays.

**Can (canette)** — une canette physique d'une boisson, décrite par son format, sa couleur, son pays et sa langue. Une boisson peut avoir plusieurs canettes.

**Brand (marque)** — la marque de boisson à laquelle appartient une boisson (le fabricant).

**Series (série)** — une sous-ligne au sein d'une marque — une sous-famille de catalogue, p. ex. la gamme *Ultra* de Monster.

**Category (catégorie de boisson)** — le type de boisson (la classification sous laquelle tombe une boisson).

**Flavor (saveur)** — un tag de saveur attaché à une boisson ; une boisson peut en porter plusieurs. Les saveurs sont regroupées en catégories de saveurs et ont des noms localisés (et des descriptions optionnelles) par langue.

**Edition (édition)** — des flags d'édition sur une boisson, distinguant les éditions spéciales ou limitées du produit standard.

**Predecessor (prédécesseur)** — un lien d'une boisson vers celle qu'elle remplace, capturant la lignée d'un produit à travers reformulations ou rebrands.

## Données localisées

Certaines données d'une boisson varient selon la région, donc elles sont stockées par pays (et parfois par langue) plutôt que sur la boisson elle-même.

**Localization (localisation)** — le nom marketing localisé d'une boisson et un texte descriptif optionnel pour une combinaison pays + langue (`DrinkLocalization`).

**Composition** — la composition nutritionnelle d'une boisson pour un pays donné, toutes les valeurs exprimées **pour 100 mL** (`DrinkComposition`).

**Claim** — une allégation diététique ou de certification d'une boisson dans un pays précis (`DrinkClaim`), p. ex. un label diététique ou réglementaire.

## Données de référence

Valeurs de référence partagées, utilisées dans tout le catalogue :

**Country (pays)** · **Language (langue)** — les dimensions régionales sur lesquelles sont clés les données localisées.

**Can format (format de canette)** — une taille/un format de canette standard.

**Color (couleur)** — une couleur servant à identifier le design d'une canette.

**App version (version de l'app)** — une version publiée de l'app ; les éléments du catalogue enregistrent la version où ils ont été *introduits*, ce qui pilote aussi la timeline du World Dex.

## Personnes

**User (utilisateur)** — un titulaire de compte. Un utilisateur possède un Dex (ses boissons débloquées) et est authentifié via Firebase — voir [Sécurité](/fr/security/).

## Pour aller plus loin

- Comment tout cela se traduit en tables → [Base de données](/fr/database/)
- Comment les couches les utilisent → [Back-end](/fr/back-end/)
- Ce que l'app en fait → [Comprendre Candex](/fr/getting-started/)
