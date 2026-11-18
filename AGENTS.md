# Agent hints

## This repository

`isotope-pinbaal` is a le.gume seed: React 19 + Vite + Tailwind v4, Markdown
content, derived navigation, a publish guard, GitHub Pages on push. It poses one
question — a pinball machine as a chain of 42i isotopes, and where refusal and
precedence live — and records what is settled and what is not.

Live: https://james-gibson.github.io/isotope-pinbaal/ · Repo: `james-gibson/isotope-pinbaal`

## Commands

```bash
npm run dev      # vite
npm run build    # tsc, vite, prerender, postbuild, guard   <- what CI runs
npm run smoke    # render every route (and the 404) to a string
npm run guard    # guard alone, against an existing dist/
```

`npm run build` is the gate. The guard fails on placeholders, leaked absolute
paths or credentials, a base path that disagrees with `package.json.homepage`, a
missing `404.html`/`.nojekyll`, source maps, or content that never reached the
bundle. Do not weaken a check to make a build pass; fix the output.

## Content

- One page = one file: `src/content/<section>/<slug>.md`, frontmatter `title` +
  `description` (plus optional `order`, `updated`, `tags`).
- The nav, section indexes, footer columns, TOC and counts are derived from the
  file tree. There is no nav array.
- Sections are `question`, `blockers`, `gates`, `missing` (`SECTIONS` in
  `src/lib/content.ts`).
- Markdown only. A live widget is a route under `src/pages/`, like `/design`.
- Router links are basename-relative; raw `href` strings need
  `import.meta.env.BASE_URL`.
- Voice: dry, technical, specific. Record what is not known as prominently as
  what is — the open questions are the point, not an embarrassment.

## What was inherited and dropped

This is a child seed of le.gume. The stack is kept; the product machinery is
not. Dropped, with the guard rules that enforced them: the seed ladder, isotope
compounds, the examples kit, the offline deck, the no-script/no-stylesheet
satire, and the agent handoff. The guard's header records the override.

## Design

Motion and components come from `fancy-ui-react`. Read the component's page
before using a prop; `className` exists only where that table lists it. Overlay
effects need a `relative overflow-hidden` parent with a size. `/design` is the
live catalogue — keep it in step with what the site actually uses.
