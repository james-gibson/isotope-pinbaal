# isotope-pinbaal

A le.gume seed that poses one question: **a pinball machine is a chain of 42i
isotopes — the chain is the transcript, so where do refusal and precedence
live?**

The site records what is settled (the blockers pinballctl ships, the piece each
repository supplies) and what is not (precedence, epoch-bound actuation, the
proof of absence). It is a documentation site whose content is the argument,
not a description of the argument.

<p align="center">
  <a href="https://github.com/james-gibson/isotope-pinbaal/actions/workflows/deploy.yml"><img src="https://shieldcn.dev/github/ci/james-gibson/isotope-pinbaal.svg?workflow=deploy.yml&branch=main&variant=secondary" alt="deploy" /></a>
  <a href="https://github.com/james-gibson/isotope-pinbaal/blob/main/LICENSE"><img src="https://shieldcn.dev/github/license/james-gibson/isotope-pinbaal.svg?variant=secondary" alt="license" /></a>
</p>

**Live:** https://james-gibson.github.io/isotope-pinbaal/

## What this is

A seed, not a generator. The repository is the template: clone it, read it, keep
the stack, replace the question.

- **Content is navigation.** `src/content/**/*.md` is the only place a page is
  declared; the nav, section indexes, table of contents, previous/next and page
  counts are all derived from it.
- **A guard, not a checklist.** `scripts/verify-publish.mjs` fails the build on
  placeholders, leaked local paths, a mismatched Pages base path, missing SPA
  fallback, or content that never reached the bundle.
- **A live design system.** `/design` renders the components the site ships.
  Motion comes from [fancy-ui](https://fancy-ui.rama.app).
- **An agent entry.** `dist/llms.txt` is generated at build time.

## Sections

| Section | What it holds |
| --- | --- |
| `question` | The central question and its stakes |
| `blockers` | What pinballctl records as missing, verbatim |
| `gates` | What each repository actually supplies, and what it declines |
| `missing` | Precedence, epoch-bound actuation, and the proof of absence |

## Commands

```bash
npm run dev      # vite dev server
npm run build    # tsc, vite build, route shells, llms.txt, publish guard
npm run smoke    # render every route to a string; fail if one throws
npm run guard    # the guard alone, against an existing dist/
```

Node 22+.

## License

AGPL-3.0-only. The source is public; if you run a modified version as a network
service, publish your changes.
