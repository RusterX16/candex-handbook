---
title: "Glossary"
description: The domain vocabulary behind Candex — the terms the app, the data model, and the other handbooks all rely on.
---

Candex has its own vocabulary. These are the terms the app, the [Database](/en/database/), and the [Back-end](/en/back-end/) all share, grounded in the data model.

## Collection & progression

**Dex** — a user's **personal collection**: the set of drinks they have unlocked. It is the app's home tab and the heart of the experience.

**Unlock** — the act of adding a drink to one's Dex. A drink can be unlocked only once per user (`UserUnlockedDrink`, keyed on user + drink), and the unlock is timestamped.

**World Dex** — the **global, ranked list** of drinks shared by everyone: each drink holds a numbered position within the world-wide dex. Distinct from a user's personal Dex.

**World Dex history** — the record of how World Dex positions changed over time. A database trigger logs each *departure* (the position a drink left) and an *arrival* row marks when a drink first entered, so a drink's position at any past instant can be reconstructed. See [Database](/en/database/) for the mechanism.

## Catalogue

**Drink** — the central catalogue item: a specific beverage product, with its names, brand and category, flavors, edition flags, lifecycle dates, and the app version it was introduced in. Nutrition and claims are stored separately, per country.

**Can** — a physical can of a drink, described by its format, colour, country, and language. One drink can have several cans.

**Brand** — the beverage brand a drink belongs to (e.g. the maker).

**Series** — a sub-line within a brand — a catalogue sub-family, e.g. Monster's *Ultra* range.

**Category** (*drink category*) — the kind of beverage (the classification a drink falls under).

**Flavor** — a flavour tag attached to a drink; a drink can carry several. Flavours are grouped into flavour categories and have localized names (and optional descriptions) per language.

**Edition** — edition flags on a drink, distinguishing special or limited editions from the standard product.

**Predecessor** — a link from a drink to the one it succeeds, capturing a product's lineage across reformulations or rebrands.

## Localized drink data

Some drink data varies by region, so it is stored per country (and sometimes per language) rather than on the drink itself.

**Localization** — a drink's localized marketing name and optional descriptive text for one country + language combination (`DrinkLocalization`).

**Composition** — a drink's nutritional composition for a given country, with all values expressed **per 100 mL** (`DrinkComposition`).

**Claim** — a dietary or certification claim for a drink in a specific country (`DrinkClaim`), e.g. a dietary or regulatory label.

## Reference data

Shared look-up values referenced across the catalogue:

**Country** · **Language** — the regional dimensions localized data is keyed on.

**Can format** — a standard can size/format.

**Colour** — a colour used to identify a can's design.

**App version** — a released version of the app; catalogue items record the version they were *introduced in*, which also drives the World Dex timeline.

## People

**User** — an account holder. A user owns a Dex (their unlocked drinks) and is authenticated via Firebase — see [Security](/en/security/).

## Where to go next

- How these map to tables → [Database](/en/database/)
- How the layers use them → [Back-end](/en/back-end/)
- What the app does with them → [Understanding Candex](/en/getting-started/)
