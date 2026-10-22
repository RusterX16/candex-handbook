---
title: "Produit"
description: Ce qu'est Candex en tant que produit — le pitch, son public, l'ensemble des fonctionnalités par statut, et sa direction.
---

Ce handbook est la vue produit : la vision, le public, l'ensemble des fonctionnalités et la roadmap. Pour un tour concret de ce que fait l'app **aujourd'hui**, voir [Comprendre Candex](/fr/getting-started/). Les éléments prospectifs sont tagués par statut, pour que le tableau reste honnête.

## Le pitch

Candex transforme un tas éparpillé de canettes en une collection vivante et organisée qu'on garde dans sa poche. Découvre de nouvelles boissons, suis les canettes que tu possèdes, et vois où chacune se classe dans un dex mondial partagé par tous les collectionneurs.

## À qui ça s'adresse

- **Les collectionneurs** — ceux qui gardent et font grandir une vraie collection de canettes et veulent la cataloguer correctement.
- **Les amateurs occasionnels** — ceux qui veulent se souvenir de ce qu'ils ont aimé et en trouver plus.
- **Les curieux** — tous ceux qui aiment parcourir boissons, marques et les détails derrière.

## Ensemble des fonctionnalités

Légende des statuts : **Livré** (en prod) · **En cours** (en construction) · **Prévu** (sur la roadmap) · **Exploratoire** (direction produit, pas commencé).

| Fonctionnalité | Ce qu'elle fait | Statut |
|----------------|-----------------|--------|
| Dex personnel | Débloquer des boissons et bâtir sa collection | Livré |
| Recherche & découverte | Parcourir le catalogue, ouvrir une boisson pour ses détails | Livré |
| World Dex | Une liste classée globale, avec historique de position | Livré |
| Détails d'une boisson | Noms, marque, saveurs, composition et claims par pays | Livré |
| Thèmes & langue | Light / Dark / System, anglais et français | Livré |
| Sécurité & backup | Connexion Firebase, et une collection sauvegardée | Livré |
| Scanner une canette | Ajouter une canette depuis une photo par reconnaissance d'image | En cours |
| Statistiques | Stats de collection — comptes, top marques, habitudes | Prévu |
| Communauté | Partager trouvailles, astuces et événements entre collectionneurs | Exploratoire |

Le flux *Scanner une canette* est en partie en place côté API, qui fait déjà de l'analyse d'image et de couleur ; l'expérience de scan de bout en bout est encore en construction *(à confirmer côté app)*. *Statistiques* et *Communauté* reflètent la vision produit et ne sont pas livrées.

## Roadmap

Éléments à court terme du board produit :

- **Édition de boisson** — éditer une boisson existante.
- **Suppression de boisson** — retirer une boisson.
- **Page canettes** — une vue dédiée aux canettes d'une boisson.
- **Déplacement de boissons** — déplacer la position d'une boisson (`dexPosition`).
- **CI/CD API** — finaliser le pipeline de livraison de l'API.

## Principes produit

- **Solo, de bout en bout** — un seul ingénieur possède l'app, le dashboard et l'API ; les handbooks existent pour que ça ne devienne pas un goulot d'étranglement.
- **Bilingue par défaut** — chaque écran est livré en anglais et en français.
- **À toi, à ta façon** — thèmes et langue sont au choix de l'utilisateur, et sa collection est sauvegardée pour ne jamais être perdue.

## Pour aller plus loin

- Utiliser l'app aujourd'hui → [Comprendre Candex](/fr/getting-started/)
- Son apparence et son ressenti → [UI / UX](/fr/ui-ux/)
- Comment c'est construit → [Architecture](/fr/architecture/)
