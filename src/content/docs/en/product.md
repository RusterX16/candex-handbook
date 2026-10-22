---
title: "Product"
description: What Candex is as a product — the pitch, who it serves, the feature set by status, and where it's headed.
---

This handbook is the product view: the vision, the audience, the feature set, and the roadmap. For a hands-on tour of what the app does **today**, see [Understanding Candex](/en/getting-started/). Forward-looking items here are tagged by status, so the picture stays honest.

## The pitch

Candex turns a scattered pile of beverage cans into a living, organized collection you carry in your pocket. Discover new drinks, track the cans you own, and see where each one ranks in a world-wide dex shared by every collector.

## Who it's for

- **Collectors** — people who keep and grow a real collection of cans and want it catalogued properly.
- **Casual fans** — drinkers who want to remember what they liked and find more of it.
- **The curious** — anyone who enjoys browsing drinks, brands, and the details behind them.

## Feature set

Status legend: **Live** (shipped) · **In progress** (being built) · **Planned** (on the roadmap) · **Exploring** (product direction, not started).

| Feature | What it does | Status |
|---------|--------------|--------|
| Personal Dex | Unlock drinks and build your own collection | Live |
| Search & discover | Browse the catalogue, open a drink for its details | Live |
| World Dex | A global ranked list, with position history | Live |
| Drink details | Names, brand, flavours, composition and claims per country | Live |
| Themes & language | Light / Dark / System, English and French | Live |
| Security & backup | Firebase sign-in, and a backed-up collection | Live |
| Scan a can | Add a can from a photo via image recognition | In progress |
| Statistics | Collection stats — counts, top brands, habits | Planned |
| Community | Share finds, tips, and events with other collectors | Exploring |

The *Scan a can* flow is partly in place on the API, which already does image and colour analysis; the end-to-end scanning experience is still being built *(to confirm on the app side)*. *Statistics* and *Community* reflect the product vision and are not shipped.

## Roadmap

Near-term items from the product board:

- **Drink editing** — edit an existing drink.
- **Drink deletion** — remove a drink.
- **Cans page** — a dedicated view for a drink's cans.
- **Reordering drinks** — move a drink's position (`dexPosition`).
- **API CI/CD** — finish the delivery pipeline for the API.

## Product principles

- **Solo-built, end to end** — one engineer owns the app, the dashboard, and the API; the handbooks exist so that doesn't become a bottleneck.
- **Bilingual by default** — every screen ships in English and French.
- **Yours, your way** — themes and language are the user's choice, and their collection is backed up so it is never lost.

## Where to go next

- Using the app today → [Understanding Candex](/en/getting-started/)
- How it looks and feels → [UI / UX](/en/ui-ux/)
- How it's built → [Architecture](/en/architecture/)
