#!/usr/bin/env node
/**
 * The publish guard.
 *
 * A public documentation site is a small, permanent promise. This file is the
 * only thing standing between a careless build and that promise, so every check
 * below names the failure it prevents and fails with a message a human can act
 * on.
 *
 * This child seed keeps the safety checks — base path, shells, leaks, links,
 * the machine entry, the feed, the size budget — and drops the checks that
 * enforced le.gume's product machinery (the seed ladder, isotope compounds, the
 * examples kit, the offline deck, the no-script/no-stylesheet satire, the agent
 * handoff). RULES-08 sanctions a local override: the override is recorded in
 * this file, and the reason is the same as every other deletion here — the
 * feature was not inherited.
 */

import { access, readFile, readdir, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DIST = 'dist'
const failures = []
const notes = []

function fail(check, detail) {
  failures.push({ check, detail })
}

async function readText(path) {
  return readFile(path, 'utf8')
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

// --- 1. the output exists and is the shape Pages expects -------------------
let files
try {
  files = await walk(DIST)
} catch {
  console.error('guard: dist/ is missing — run `npm run build` first')
  process.exit(1)
}

const rel = files.map((f) => relative(DIST, f))
for (const required of ['index.html', '404.html', '.nojekyll', 'favicon.svg', 'robots.txt', 'llms.txt']) {
  if (!rel.includes(required)) {
    fail('required-file', `${required} is missing from dist/ (see scripts/postbuild.mjs)`)
  }
}

const indexHtml = await readText(join(DIST, 'index.html')).catch(() => '')
const notFoundHtml = await readText(join(DIST, '404.html')).catch(() => '')

const appScript = /<script[^>]+src="[^"]*assets\/index-[^"]+\.js"/.exec(indexHtml)?.[0]
if (!appScript) {
  fail('spa-fallback', 'dist/index.html does not load the application bundle')
} else if (notFoundHtml && !notFoundHtml.includes(appScript)) {
  fail('spa-fallback', 'dist/404.html does not load the application bundle')
}

// --- 2. the base path agrees with the deployed location -------------------
const pkg = JSON.parse(await readText('package.json'))
const origin = pkg.homepage ? pkg.homepage.replace(/\/$/, '') : ''
const expectedBase = pkg.homepage ? new URL(pkg.homepage).pathname : '/'
if (!indexHtml.includes(`${expectedBase}assets/`)) {
  fail(
    'base-path',
    `index.html does not load assets from ${expectedBase}assets/ — check vite.config.ts base ` +
      `against package.json homepage`,
  )
}

const mount = expectedBase.replace(/\/$/, '')
const rootRefs = [...indexHtml.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((m) => m[1])
for (const ref of rootRefs) {
  if (ref !== mount && !ref.startsWith(expectedBase)) {
    fail('base-path', `index.html references ${ref}, which escapes the mount ${expectedBase}`)
  }
}

// --- 3. nothing shipped points back at source or at a map -----------------
for (const file of rel) {
  if (file.endsWith('.map')) fail('sourcemap', `${file} is a source map; set sourcemap: false`)
}
const scripts = files.filter((f) => f.endsWith('.js'))
const jsText = (await Promise.all(scripts.map((f) => readText(f)))).join('\n')

if (/\/src\/[A-Za-z0-9_-]+\.(?:tsx?|css)/.test(indexHtml) || /from\s*"\/src\//.test(jsText)) {
  fail('dev-paths', 'output refers to /src/ — a dev server URL leaked into the bundle')
}

// --- 4. placeholders in shipped markup ------------------------------------
const placeholder = /\b(?:TODO|FIXME|lorem ipsum)\b|example\.com/i
for (const [name, html] of [
  ['index.html', indexHtml],
  ['404.html', notFoundHtml],
]) {
  if (placeholder.test(html)) fail('placeholder', `${name} still contains a placeholder`)
}

// --- 5. nothing private or secret-looking anywhere ------------------------
const leakPatterns = [
  [/\/Users\/[A-Za-z0-9._-]+/, 'an absolute macOS home path'],
  [/\/home\/[A-Za-z0-9._-]+/, 'an absolute Linux home path'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'a private key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'an AWS access key id'],
  [/\bsk-(?:live|proj|ant)-[A-Za-z0-9_-]{16,}/, 'an API secret'],
  [/\b(?:password|passwd|secret|token)\s*[:=]\s*["'][^"']{8,}["']/i, 'a hardcoded credential'],
  [/127\.0\.0\.1:\d+/, 'a loopback URL'],
  [/localhost:\d+/, 'a localhost URL'],
]
for (const [pattern, what] of leakPatterns) {
  const hit = jsText.match(pattern) ?? indexHtml.match(pattern)
  if (hit) fail('leak', `output contains ${what}: ${hit[0].slice(0, 60)}`)
}

// --- 6. every real route has its own shell, and the content is in the bundle -
const contentFiles = (await walk('src/content')).filter((f) => f.endsWith('.md'))
if (contentFiles.length === 0) fail('content', 'src/content/**/*.md matched nothing')

const sections = [...new Set(contentFiles.map((f) => relative('src/content', f).split('/')[0]))]
const routes = [...sections, ...contentFiles.map((f) => relative('src/content', f).replace(/\.md$/, ''))]

for (const route of routes) {
  try {
    await access(join(DIST, route, 'index.html'))
  } catch (error) {
    if (!error || error.code !== 'ENOENT') throw error
    fail(
      'route-shell',
      `dist/${route}/index.html is missing — GitHub Pages would answer 404 for /${route}`,
    )
  }
}

for (const file of contentFiles) {
  const source = await readText(file)
  const title = /^title:\s*(.+)$/m.exec(source)?.[1]?.trim().replace(/^["']|["']$/g, '')
  if (!title) {
    fail('content', `${file} has no title: in frontmatter`)
    continue
  }
  if (!jsText.includes(title)) {
    fail('content', `${file} ("${title}") is not present in the built bundle`)
  }
}

// --- 7. internal links point at routes that exist -------------------------
const knownRoutes = new Set([
  '/',
  '/design',
  '/palette',
  ...sections.map((s) => `/${s}`),
  ...contentFiles.map((f) => `/${relative('src/content', f).replace(/\.md$/, '')}`),
])
const knownFiles = new Set(['/llms.txt', '/robots.txt', '/feed.xml', '/rules.md', '/favicon.svg'])
for (const file of contentFiles) {
  const source = await readText(file)
  for (const match of source.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const target = match[1].replace(/#.*$/, '').replace(/\/$/, '') || '/'
    if (knownRoutes.has(target) || knownFiles.has(target)) continue
    fail('link', `${file} links to ${match[1]}, which is not a route on this site`)
  }
}

// --- 8. the machine entry lists every page -------------------------------
const llms = rel.includes('llms.txt') ? await readText(join(DIST, 'llms.txt')) : ''
if (!llms) {
  fail('llms', 'dist/llms.txt is empty or missing (see scripts/postbuild.mjs)')
} else {
  for (const file of contentFiles) {
    const route = relative('src/content', file).replace(/\.md$/, '')
    if (!llms.includes(`/${route}/)`)) {
      fail('llms', `dist/llms.txt does not list /${route}`)
    }
  }
  for (const anchor of ['## Build and verify', '## Invariants']) {
    if (!llms.includes(anchor)) fail('llms', `dist/llms.txt is missing the "${anchor}" section`)
  }
}

// --- 9. agent-ready: find and read ----------------------------------------
const robots = await readText('dist/robots.txt').catch(() => '')
if (!/^User-agent: \*/m.test(robots)) {
  fail('agent-ready', 'dist/robots.txt has no wildcard rule — one policy for all agents')
}
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
  fail('agent-ready', 'dist/robots.txt does not point at the sitemap')
}

const sitemap = await readText('dist/sitemap.xml').catch(() => '')
for (const route of ['', ...routes.map((r) => `${r}/`)]) {
  const loc = route ? `${origin}/${route}` : `${origin}/`
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    fail('agent-ready', `dist/sitemap.xml is missing ${loc}`)
  }
}

const catalogSource = await readText('dist/.well-known/ai-catalog.json').catch(() => '')
if (!catalogSource) {
  fail('agent-ready', 'dist/.well-known/ai-catalog.json is missing')
} else {
  try {
    const catalog = JSON.parse(catalogSource)
    if (!JSON.stringify(catalog).includes('/llms.txt')) {
      fail('agent-ready', 'the AI catalog does not list llms.txt')
    }
  } catch {
    fail('agent-ready', 'dist/.well-known/ai-catalog.json is not JSON')
  }
}

const shells = (await walk(DIST)).filter((f) => f.endsWith('index.html') || f.endsWith('404.html'))
if (shells.length < routes.length) {
  fail('agent-ready', `found ${shells.length} HTML shells for ${routes.length} routes`)
}
for (const shell of shells) {
  const html = await readText(shell)
  if (!/<h1[\s>]/.test(html)) {
    fail('agent-ready', `${shell} has no <h1> in the initial HTML — the answer is JavaScript-only`)
  }
}

// --- 10. the feed is generated and complete ------------------------------
const feed = await readText('dist/feed.xml').catch(() => '')
if (!feed) {
  fail('feed', 'dist/feed.xml is missing')
} else {
  for (const route of routes) {
    if (!feed.includes(`${origin}/${route}/`)) fail('feed', `dist/feed.xml is missing ${route}`)
  }
}

// --- 11. rules.md ---------------------------------------------------------
const rulesFile = await readText('dist/rules.md').catch(() => '')
if (!rulesFile) {
  fail('rules', 'dist/rules.md is missing')
} else {
  for (let i = 1; i <= 8; i += 1) {
    const id = `RULES-${String(i).padStart(2, '0')}`
    if (!rulesFile.includes(`${id}:`)) fail('rules', `dist/rules.md does not define ${id}`)
  }
  if (!/^version: \S+/m.test(rulesFile)) fail('rules', 'dist/rules.md has no version line')
}

// --- 12. size sanity ------------------------------------------------------
const total = (await Promise.all(files.map(async (f) => (await stat(f)).size))).reduce(
  (a, b) => a + b,
  0,
)
const budgetMb = 8
if (total > budgetMb * 1024 * 1024) {
  fail('size', `dist/ is ${(total / 1024 / 1024).toFixed(1)}MB, over the ${budgetMb}MB budget`)
}
notes.push(`${rel.length} files, ${(total / 1024).toFixed(0)}KB total`)

// --- report ---------------------------------------------------------------
if (failures.length) {
  console.error('guard: refused to publish\n')
  for (const { check, detail } of failures) console.error(`  [${check}] ${detail}`)
  console.error('\nNothing was published. Fix the checks above and rebuild.')
  process.exit(1)
}

console.log(`guard: clean — ${notes.join(', ')}`)
