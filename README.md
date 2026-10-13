# Vancouver Vikings — Design 1: Corporate Grid

Team website project (Fall 2026). A fictional cricket franchise, the **Vancouver Vikings**, built twice with the same content and two different designs:

| Branch | Design |
| --- | --- |
| `corporate-grid` | **Design 1** — conventional corporate layout: top nav, hero banner, uniform card grids, tabs and data tables |
| `magazine-spread` | **Design 2** — editorial sports-magazine layout (coming next) |

Stack: React (JavaScript) + Vite + Tailwind CSS v4 + React Router.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Deploy (Vercel)

Import the repo in Vercel, pick the `corporate-grid` branch as the production branch (framework preset: Vite). `vercel.json` already rewrites every route to `index.html` so deep links like `/season/stats` work. For Netlify, `public/_redirects` does the same job.

## Site map (3 levels, 14 pages)

```
Home
├── Auction
├── Gallery
├── Squad ─────────── Current Squad · Previous Squads
├── News ──────────── Teams · Players   (+ article pages)
├── Season Updates ── Standing · Stats · Fixtures
└── Other Teams
```

| Route | Page |
| --- | --- |
| `/` | Home |
| `/auction` | Auction |
| `/gallery` | Gallery |
| `/squad`, `/squad/current`, `/squad/previous` | Squad, Current Squad, Previous Squads |
| `/news`, `/news/teams`, `/news/players`, `/news/:slug` | News, Teams, Players, article |
| `/season`, `/season/standing`, `/season/stats`, `/season/fixtures` | Season Updates, Standing, Stats, Fixtures |
| `/other-teams` | Other Teams |

Season Updates shows Standing, Stats and Fixtures as preview sections; each one expands into its own full page.

## Project structure

```
src/
  data/         all content (players, fixtures, news, auction…) — edit here
  components/   Header, Footer, PageHeader (breadcrumbs), shared UI, tables
  pages/        one file per page; squad/, news/, season/ hold level-3 pages
  index.css     Tailwind import + theme colours
```

## Design approach and UI principles

**Palette:** Canucks-inspired navy `#00205B`, green `#00843D` and white over neutral greys. Colour is used sparingly (nav, footer, accents) so the layout still reads as a generic corporate template — the deliberate contrast with Design 2.

**Information architecture (users, content, context)**
- *Users:* fans checking scores, followers of specific players, and people looking for auction or team news. Each group has a one-click path from the Home page cards or the top nav.
- *Content:* organised by topic into six top-level sections; detail pages sit one level below their parent (Squad → Current Squad).
- *Context:* fans often check fixtures on their phones, so a Fixtures shortcut sits in the header, and every layout collapses to a single column on mobile.

**UI principles applied**
1. **Consistency** — every inner page uses the same title band, breadcrumbs, card style and table style; nav and footer never change.
2. **Visual hierarchy** — size and weight separate page titles, section headings and body text. Key numbers (points, NRR, prices) are larger and navy.
3. **Gestalt proximity and common region** — related information is grouped inside cards. Sub-pages are grouped under tabs.
4. **Recognition over recall** — the persistent nav shows the active section, breadcrumbs show your location, and the footer works as a full sitemap.
5. **Hick's law** — at most seven top-level nav items and six home cards; long lists get filters (role, category, buyer).
6. **Fitts's law** — large card-sized click targets, full-width mobile menu items.
7. **Feedback** — hover and active states on links and tabs, `aria-pressed` filters, visible focus rings, live result counts.
8. **Accessibility** — semantic headings and landmarks, a skip link, table captions, `aria-sort` on sortable columns, and colour contrast that meets WCAG AA.

## Content note

The club, league, rival teams, franchise teams and every statistic are fictional. Player names are real cricketers, used for the course prototype only. Images are placeholders (`Placeholder` in `src/components/ui.jsx`). To use photos, swap them for `<img>` tags pointing to files in `public/images/`.
