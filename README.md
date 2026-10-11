# MVA Cruise Deals

A Next.js (App Router) marketing site for **MVA Cruise Deals**, an independent travel
agency specializing in **Margaritaville at Sea** cruise deals and group rates. Visitors
browse sailings, learn about group booking, and request a free quote.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18
- Plain CSS (no build-time CSS framework required)

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server             |
| `npm run build` | Create an optimized production build     |
| `npm run start` | Run the production build                 |
| `npm run lint`  | Run Next.js linting                      |

## Project structure

```
app/
  layout.js          Root layout, shared nav + footer
  page.js            Home page
  globals.css        Global styles
  deals/page.js      Cruise deals listing
  about/page.js      About the agency
  contact/page.js    Contact + inquiry info
  components/        Reusable UI (Navbar, Footer, DealCard)
  data/deals.js      Static deal data
public/              Static assets (logo, favicon)
```

## Deployment (Cloudflare Workers)

This project is configured as a **static export** (`next.config.mjs` → `output: "export"`)
served by a Cloudflare Workers static-assets deployment (`wrangler.jsonc`).

- **Build command:** `npm run build` (emits the static site into `./out`)
- **Deploy command:** `npx wrangler deploy` (serves `./out` via `wrangler.jsonc`)

### Continuous deployment from GitHub

In the Cloudflare dashboard: **Workers &amp; Pages → Create → Workers → Connect to Git**,
authorize the repo, then set:

| Setting        | Value           |
| -------------- | --------------- |
| Build command  | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Every push to `main` then builds and deploys automatically.

### Manual deploy from your machine

```bash
npm install
npm run deploy
```


## Price trends page (/trends/)

The daily fare page is built from files in `data/raw/` by `scripts/build-trends.py`,
which writes `data/trends.json` (the only thing the page reads).

Daily routine:

1. Download the day's `MVAS Price Snapshot YYYY-MM-DD.json` from the Cruise Reports
   folder in Google Drive into `data/raw/`. A rerun saved with a suffix such as
   `(midday)` replaces the plain file for that date. Drive deletes old snapshots, so
   `data/raw/` is the permanent archive.
2. Export the "MVAS Price Change Log" sheet as CSV into `data/raw/`, replacing the old
   export (the newest export contains every older row). The build stops if the log has
   under 1,000 rows, which is what a truncated read looks like.
3. Run `python3 scripts/build-trends.py` (standard library only).
4. Commit `data/raw/` and `data/trends.json` to `main`. Cloudflare deploys it.

The script strips the internal `note` and `run` fields from archived snapshots. Do not
commit unstripped copies: this repository is public.
