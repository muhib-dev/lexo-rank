# LexoRank Demo App

This project is a small React + Vite application that demonstrates why LexoRank-style string ranking scales better than numeric ranking for drag-and-drop lists.

The app shows two list implementations side by side:

- **Numeric ranking** (`1, 2, 3...`) where reordering can cause cascading updates.
- **LexoRank ranking** (`"G", "N", "a"...`) where each move can be handled with a single rank update.

## What the app includes

- Interactive drag-and-drop demo for both ranking strategies
- Database write log view to compare update cost per reorder
- Explanation tab with examples of cascading vs midpoint ranking
- Code tab with sample logic (`lexMid`, reorder flow, schema, rebalancing)
- Clean Tailwind CSS based UI

## Tech stack

- React
- Vite
- Tailwind CSS
- ESLint

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Why this project exists

When using integer ranks, repeated insertions between nearby values eventually run out of gap and force bulk re-numbering. LexoRank avoids this by generating a sortable string between two neighboring ranks, reducing reorder writes and making list ordering more scalable for large datasets.
