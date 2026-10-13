# VIKINGS — Design 2: Magazine Spread

Team website project (Fall 2026). A fictional cricket franchise, the **Vancouver Vikings**, built twice with the same content and two different designs:

| Branch | Design | Deploys as |
| --- | --- | --- |
| `main` | **Design 2** — editorial sports-magazine layout | Vercel production URL |
| `corporate-grid` | **Design 1** — conventional corporate grid layout | Vercel branch preview URL |

Stack: React (JavaScript) + Vite + Tailwind CSS v4 + React Router.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Deploy (Vercel)

Import the repo in Vercel with the Vite preset. `main` becomes the production site. Every push to `corporate-grid` gets its own preview URL (`<project>-git-corporate-grid-<user>.vercel.app`). `vercel.json` rewrites all routes to `index.html` so deep links like `/season/stats` work.

## Site map — same hierarchy as Design 1, with page numbers

```
1   Cover (Home)
2   Auction
3   Gallery
4   Squad ─────────── 4.1 Current Squad · 4.2 Previous Squads
5   News ──────────── 5.1 Teams · 5.2 Players   (+ article pages)
6   Season Updates ── 6.1 Standing · 6.2 Stats · 6.3 Fixtures
7   Other Teams
```

Page numbers and kickers live in `src/data/issue.js`. The Contents overlay, the cover lines, the folio lines and the previous/next page controls all read from that file.

## How the magazine metaphor maps to navigation

| Magazine element | Website role |
| --- | --- |
| Cover lines down the right edge | Primary navigation from the home page |
| **Contents** page (button on every page) | Full sitemap, showing the hierarchy and page numbers |
| Running head (`Cover / Squad / Current Squad`) | Breadcrumbs |
| Folio line (`ROSTER — SQUAD · PAGE 4`) | Current location and section |
| "Turn to p.6.1 →" cross-references | Links from a section to its sub-pages |
| Previous / next page strip | Sequential "page-flipping" through the issue |

## Design approach and UI principles

**Look:** cream "paper" (`#f6f2e9`), near-black ink, and the Canucks navy `#00205B` and green `#00843D` as spot colours. Type is Playfair Display for headlines, Source Serif 4 for body text and Archivo for labels and folios.

**Information architecture (users, content, context)**
- *Users:* fans who want to browse and read, not only look things up. The magazine format rewards exploration.
- *Content:* the same content as Design 1, presented editorially. Facts become features (auction coverage reads as a story, stats become pull-numbers and leaderboards).
- *Context:* reading happens on phones as often as on desktops. Cover lines become a stacked "Inside this issue" list, multi-column text collapses to one column, and tables scroll horizontally.

**UI principles applied**
1. **Mental models and metaphor** — people already know how a magazine works (cover lines, contents, page numbers), so navigation needs no learning.
2. **Visual hierarchy** — oversized serif headlines, drop caps, pull quotes and giant stat numbers create clear entry points on every page.
3. **Consistency** — every inner page shares the same running head, folio line, rule weights, type scale and page-turn footer.
4. **Recognition over recall** — the Contents overlay, breadcrumbs and page numbers always show where you are and what else exists.
5. **Gestalt (proximity, common region, continuity)** — rules, columns and boxed sidebars group related content. The previous/next strip creates a continuous reading path.
6. **Hick's law** — the cover offers six choices; level-3 pages are reached through their parent's "turn to" links rather than a crowded menu.
7. **Readability** — body text is set at a comfortable measure in a text serif, with two-column layouts only at desktop widths.
8. **Accessibility** — semantic landmarks and headings, a skip link, a keyboard-closable Contents dialog, captions on tables, `aria-sort` on sortable columns, and WCAG AA contrast (the darker green `#00692f` is used for green text on cream).

## Content note

The club, league, rival teams, franchise teams and every statistic are fictional. Player names are real cricketers, used for the course prototype only. Photographs are placeholders (`Photo` in `src/components/print.jsx`). Replace them with `<img>` tags pointing to files in `public/images/`.
