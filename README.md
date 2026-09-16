# JobSearch

Aggregator dashboard for selected job/news/deep sources.

## Stack

- Vue 3 + Pinia
- Wikimedia Codex components
- Tailwind CSS

## Features

- Top bar with keyword filtering for sub-cards
- Main area with source cards
- Footer
- Source-specific loader component (`EmploiTerritorialSource`)
- Sub-cards with favorite (star), ID, and share action
- Empty-state message when a source has zero matching sub-cards

## Current source

- Emploi Territorial RSS pages:
  - `https://www.emploi-territorial.fr/rss?search-dept=040&search-fam-metier=A7`
  - `https://www.emploi-territorial.fr/rss?search-dept=064&search-fam-metier=A7`

## Project setup

```sh
npm install
npm run dev
```

## Validate

```sh
npm run test:unit
npm run build
```
