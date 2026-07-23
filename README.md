# MVA Cruise Deals

A Next.js (App Router) marketing site for **MVA Cruise Deals** — browse featured cruise
offers, learn about the agency, and get in touch to book.

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

## Deployment

The site can be deployed to any Node host or to [Vercel](https://vercel.com/) with zero
configuration.
