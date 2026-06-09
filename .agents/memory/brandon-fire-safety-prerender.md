---
name: Brandon Fire & Safety prerendering / SEO
description: Durable invariants for the Brandon Fire & Safety SPA's build-time prerendering so it stays crawlable for Google/Bing.
---

# Brandon Fire & Safety — SEO prerendering invariants

The site is a React + Vite SPA on Netlify. Every route is prerendered to static HTML
at build time so non-JS crawlers (esp. Bingbot) can read all pages. A post-`vite build`
script renders each route via SSR and injects per-route head/body into an `index.html`
template that has `<!--app-head-->` / `<!--app-html-->` placeholders. Per-route SEO has
one source of truth (a `seoByPath` map) consumed by BOTH the runtime `useSEO` hook and
the prerender script — keep them sourced from there so meta never drifts.

## Invariants (do not break)
- **Client uses `createRoot().render()`, NOT `hydrateRoot`.** Server markup is discarded
  and re-rendered on mount, so SSR/client mismatches are not hydration errors. This is
  why the server entry can skip the animation wrapper and why opacity-stripping is safe.
- **Framer Motion serializes `initial` (opacity:0 + translate) into inline styles during
  SSR.** The prerender neutralizes them (opacity:0→1, translate→none) so prerendered text
  is genuinely visible, not present-but-hidden. Defense in depth: keep above-the-fold H1s
  out of opacity-0 wrappers.
- **Exactly one `<h1>` and one `<title>` per page.** Never add a static `<title>` to the
  index.html template (it duplicates the injected one). A build guard fails the build on
  ≠1 h1/title or an unreplaced placeholder.
- **No SPA catch-all rewrite anywhere.** There must be NO `/* -> /index.html 200` rule in
  EITHER `netlify.toml` OR `public/_redirects`. **Why:** that rule causes soft-404s
  (unknown URLs return homepage with HTTP 200). With prerender, Netlify serves each route
  file directly and a prerendered `404.html` (noindex) with a real 404 for unmatched paths.
  A soft-404 fix is incomplete if either file still has the catch-all — check both.
- **When adding a page, add it to the SEO map / prerender route list**, or direct URL
  access (and its crawlable HTML) regresses.

## Other notes
- Pages intentionally: Home, About, Services, Reviews, Contact (+ 404). "Pay My Bill" was
  deliberately removed — do not re-add.
