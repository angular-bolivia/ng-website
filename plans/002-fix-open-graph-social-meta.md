# Plan 002: Fix Open Graph / social-sharing metadata

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 12702e8..HEAD -- src/pages/index.astro`
> If `src/pages/index.astro` changed since this plan was written, compare the
> "Current state" excerpt against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `12702e8`, 2026-06-15

## Why this matters

This is a community site whose core activity is sharing event and page links on
social platforms (the navbar and several components link out to Twitter/X,
LinkedIn, Facebook, Instagram). But the page's Open Graph tags are broken in two
ways that stop link previews from rendering:

1. The `og:image` value is a **relative** path (`img/meta-icon.png`, no leading
   slash, no domain). Social scrapers (Facebook, LinkedIn, WhatsApp, X) require
   an **absolute** URL and will show no preview image otherwise.
2. Every `og:*` tag uses `name="og:..."`, but the Open Graph protocol requires
   `property="og:..."`. Many scrapers ignore `name="og:*"` entirely.

The result: when someone shares `https://ng.com.bo`, the preview card is
blank/degraded. Fixing the attribute and making the image
URL absolute restores the card, and adding `og:url`, `og:type`, and Twitter Card
tags makes it render consistently across platforms.

## Current state

- `src/pages/index.astro` — the only page and the place all `<head>` metadata
  lives. The relevant block today:

  ```astro
  <!-- src/pages/index.astro:23-44 -->
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta charset="utf-8" />
      <title>Angular Bolivia</title>
      <base href="/" />
      <meta name="generator" content={Astro.generator} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Comunidad de desarrolladores Angular en Bolivia."
      />
      <meta name="keywords" content="angular, bolivia, angular bolivia" />
      <meta name="og:title" content="Angular Bolivia" />
      <meta name="og:image" content="img/meta-icon.png" />
      <meta name="og:site_name" content="Angular Bolivia" />
      <meta
        name="og:description"
        content="Comunidad de desarrolladores Angular en Bolivia."
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico?v=2.0.0" />
    </head>
  ```

- The `<base href="/" />` tag is present, but base only affects in-page relative
  URLs, not what off-site scrapers fetch — `og:image` still needs an absolute
  URL.
- The OG image asset exists at `public/img/meta-icon.png` (served at
  `/img/meta-icon.png`).
- **Production domain**: the canonical public origin is **`https://ng.com.bo`**
  (confirmed by the maintainer). Use exactly this — no trailing slash on the
  origin constant. (For reference, the Firebase project is `ng-bolivia-website`
  per `.firebaserc`, and the speaker CFS link in `src/links.ts` is already on a
  subdomain of this apex, `cfs.ng.com.bo`.)

> Note: the duplicate `<meta charset="utf-8" />` on lines 25–26 is a separate
> issue handled by **plan 004**. Leave both lines alone in this plan to avoid a
> merge conflict with that plan; 004 will remove the duplicate.

## Commands you will need

| Purpose | Command          | Expected on success                |
|---------|------------------|------------------------------------|
| Install | `npm install`    | exit 0                             |
| Build   | `npm run build`  | prints `Complete!`, exit 0         |

This repo uses **npm** (`package-lock.json` present).

## Scope

**In scope** (the only file you should modify):
- `src/pages/index.astro` — the `<head>` metadata only.

**Out of scope** (do NOT touch):
- Lines 25–26 (the duplicate `<meta charset>`) — owned by plan 004.
- Line 43 (the favicon `<link>` with the wrong `type`) — owned by plan 004.
- Any component file or stylesheet.
- The `public/img/meta-icon.png` asset itself — it is fine; only how it is
  referenced changes.

## Git workflow

- Branch: `advisor/002-og-meta`
- Short imperative commit subject matching repo style (e.g.
  "Fix Open Graph meta tags for social sharing").
- Trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Define the canonical site URL

At the top of `src/pages/index.astro`, inside the frontmatter fence (between the
`---` lines, after the existing imports on lines 1–20), add a constant for the
absolute site origin. Use the confirmed production domain (see "Current state"
and STOP conditions):

```astro
const siteUrl = 'https://ng.com.bo';
const ogImage = `${siteUrl}/img/meta-icon.png`;
```

**Verify**: `npm run build` → exit 0, `Complete!` (frontmatter still compiles).

### Step 2: Convert the OG tags to `property=` and absolute URLs, and add the missing ones

Replace the four `og:*` lines (currently `index.astro:36-42`) with the block
below. Change `name` → `property`, point `og:image` at the absolute `ogImage`,
and add `og:url` and `og:type`:

```astro
<meta property="og:title" content="Angular Bolivia" />
<meta property="og:description" content="Comunidad de desarrolladores Angular en Bolivia." />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={siteUrl} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Angular Bolivia" />
```

**Verify**: `npm run build` → exit 0; then
`grep -c 'name="og:' dist/index.html` → `0` (no `name="og:*"` remain) and
`grep -c 'property="og:' dist/index.html` → `6`.

### Step 3: Add Twitter Card tags

Immediately after the OG block, add Twitter Card tags so X renders a large image
card (these reuse the same absolute URLs):

```astro
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Angular Bolivia" />
<meta name="twitter:description" content="Comunidad de desarrolladores Angular en Bolivia." />
<meta name="twitter:image" content={ogImage} />
```

**Verify**: `npm run build` → exit 0; then
`grep -o 'https://ng.com.bo/img/meta-icon.png' dist/index.html | sort -u`
→ prints the absolute image URL (proves the interpolation resolved, not a literal
`${ogImage}`).

## Test plan

No automated test framework exists in this repo, so verification is via the
built output in `dist/index.html`:

- `grep -c 'property="og:' dist/index.html` → `6`
- `grep -c 'name="og:' dist/index.html` → `0`
- `grep -c 'twitter:card' dist/index.html` → `1`
- `grep -o 'https://ng.com.bo/img/meta-icon.png' dist/index.html` →
  appears (absolute, in both `og:image` and `twitter:image`)
- No literal `${` appears in the generated `<head>`:
  `grep -c '\${' dist/index.html` → `0`

Optional manual check (not required to mark done): after deploy, run the page
through a link-preview debugger (e.g. the platform's official URL inspector) and
confirm the image renders.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run build` exits 0 and prints `Complete!`.
- [ ] `grep -c 'property="og:' dist/index.html` returns `6`.
- [ ] `grep -c 'name="og:' dist/index.html` returns `0`.
- [ ] `dist/index.html` contains the absolute `og:image`/`twitter:image` URL.
- [ ] Only `src/pages/index.astro` is modified (`git status`); lines 25–26 and
      43 are unchanged.
- [ ] `plans/README.md` status row for plan 002 updated.

## STOP conditions

Stop and report back (do not improvise) if:

- The `<head>` block does not match the "Current state" excerpt (drift).
- The build fails after editing frontmatter and the error is not an obvious
  typo you can fix in one attempt.

## Maintenance notes

- If the site later moves to multiple pages, this metadata should move into a
  shared Astro layout component and accept per-page `title`/`description`/`image`
  props rather than being hardcoded in `index.astro`.
- The `siteUrl` constant is the single source of truth for the absolute origin;
  if the domain changes, update it in one place.
- A reviewer should confirm the chosen domain matches the live deployment and
  that `meta-icon.png` is a sensible share image (≥1200×630 recommended for
  `summary_large_image`).
