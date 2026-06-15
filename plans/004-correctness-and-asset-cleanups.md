# Plan 004: Correctness & asset cleanups (charset, CSS unit, unused font, favicon type)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 12702e8..HEAD -- src/pages/index.astro src/styles/global.scss`
> If either in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (but see the note under "Relationship to plan 002")
- **Category**: bug
- **Planned at**: commit `12702e8`, 2026-06-15

## Why this matters

Four small, independent defects, each cheap to fix and each with a real (if
minor) cost:

1. **Duplicate `<meta charset="utf-8" />`** — the tag appears twice; redundant
   markup, and a linter/validator will flag it.
2. **Invalid CSS unit `min-height: 100vdh`** — `vdh` is not a real unit, so the
   browser **drops the declaration** and `body` gets no min-height at all. The
   intent was almost certainly `100dvh` (dynamic viewport height) or `100vh`.
3. **Unused Roboto web font import** — `global.scss` `@import`s Google Fonts
   Roboto, but no rule uses `Roboto` anywhere (the body font is `Inter`; the only
   custom face used is `ClashGrotesk`). This is a render-blocking network request
   for a font that never paints.
4. **Wrong favicon MIME type** — the `<link rel="icon">` declares
   `type="image/svg+xml"`, but `public/favicon.ico` is a real Windows `.ico`
   file. The declared type contradicts the bytes.

None is urgent alone; together they are a clean, low-risk polish pass.

## Relationship to plan 002

Plan 002 ("Fix Open Graph / social meta") also edits `src/pages/index.astro`,
but a **different region** (the `og:*` tags on lines 36–42). This plan only
touches lines 25–26 (duplicate charset) and line 43 (favicon). They do not
overlap, so order does not matter — but if you are applying both in one branch,
apply them as separate commits so each stays reviewable. If 002 has already
landed, the line numbers below may have shifted; rely on the **text** of the
excerpts, not the absolute line numbers.

## Current state

- `src/pages/index.astro` — `<head>`:

  ```astro
  <!-- src/pages/index.astro:24-43 -->
    <head>
      <meta charset="utf-8" />
      <meta charset="utf-8" />          <!-- duplicate: remove one -->
      <title>Angular Bolivia</title>
      <base href="/" />
      ...
      <link rel="icon" type="image/svg+xml" href="/favicon.ico?v=2.0.0" />
    </head>
  ```

- `src/styles/global.scss` — top of file and the `body` rule:

  ```scss
  /* src/styles/global.scss:1-2 */
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');  /* Roboto unused */

  /* src/styles/global.scss:23-26 */
  body {
    margin: 0;
    min-height: 100vdh;   /* invalid unit — declaration dropped */
  }
  ```

- Confirmation that Roboto is unused: the only `font-family` declarations in the
  codebase reference `ClashGrotesk` (`global.scss:6`, `banner.scss:23`) and the
  `Inter, Avenir, ...` stack (`global.scss:14`). No rule names `Roboto`.
- Confirmation of favicon type: `public/favicon.ico` is an actual ICO
  (MS Windows icon resource), not an SVG.

## Commands you will need

| Purpose | Command          | Expected on success         |
|---------|------------------|-----------------------------|
| Install | `npm install`    | exit 0                      |
| Build   | `npm run build`  | prints `Complete!`, exit 0  |

This repo uses **npm** (`package-lock.json` present).

## Scope

**In scope** (the only files you should modify):
- `src/pages/index.astro` — remove the duplicate charset line; fix the favicon
  `type`.
- `src/styles/global.scss` — remove the Roboto `@import`; fix the `min-height`
  unit.

**Out of scope** (do NOT touch):
- The `og:*` meta tags (`index.astro:36-42`) — owned by plan 002.
- Any other stylesheet under `src/styles/`.
- The font files in `public/font/` and the `ClashGrotesk` `@font-face` block —
  ClashGrotesk is used (in `banner.scss`); leave it.
- The Inter `@import` on line 1 — Inter **is** the body font; keep it.
- The favicon file itself — only its declared `type` is wrong; do not replace
  the asset.

## Git workflow

- Branch: `advisor/004-cleanups`
- One short imperative commit (e.g. "Fix duplicate charset, invalid vh unit,
  unused font, favicon type"), or one commit per fix — match the repo's concise
  style either way.
- Trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Remove the duplicate charset tag

In `src/pages/index.astro`, delete **one** of the two identical
`<meta charset="utf-8" />` lines so exactly one remains as the first child of
`<head>`.

**Verify**: `grep -c '<meta charset="utf-8" />' src/pages/index.astro` → `1`.

### Step 2: Fix the favicon MIME type

The asset is an `.ico`. Change the `<link rel="icon">` `type` to match. Replace:

```astro
<link rel="icon" type="image/svg+xml" href="/favicon.ico?v=2.0.0" />
```

with:

```astro
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=2.0.0" />
```

(Keep the `?v=2.0.0` cache-busting query.)

**Verify**: `grep -c 'type="image/svg+xml"' src/pages/index.astro` → `0`.

### Step 3: Remove the unused Roboto font import

In `src/styles/global.scss`, delete the line:

```scss
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
```

Leave the Inter `@import` (line 1) intact.

**Verify**: `grep -ci 'roboto' src/styles/global.scss` → `0`; and
`grep -c "family=Inter" src/styles/global.scss` → `1` (Inter still imported).

### Step 4: Fix the invalid `min-height` unit

In the `body` rule of `src/styles/global.scss`, change `100vdh` to `100dvh`
(dynamic viewport height — the modern, mobile-correct intent):

```scss
body {
  margin: 0;
  min-height: 100dvh;
}
```

**Verify**: `grep -c '100vdh' src/styles/global.scss` → `0`; and
`grep -c '100dvh' src/styles/global.scss` → `1`.

### Step 5: Build

**Verify**: `npm run build` → exit 0, prints `Complete!`. Then confirm the unused
font no longer ships: `grep -c 'family=Roboto' dist/index.html` → `0`.

## Test plan

No automated test framework exists. Verification is the per-step greps above
plus the final build:

- `grep -c '<meta charset' src/pages/index.astro` → `1`
- `grep -c 'type="image/svg+xml"' src/pages/index.astro` → `0`
- `grep -ci 'roboto' src/styles/global.scss` → `0`
- `grep -c '100vdh' src/styles/global.scss` → `0`
- `npm run build` → `Complete!`, and `grep -c 'family=Roboto' dist/index.html` → `0`

## Done criteria

Machine-checkable. ALL must hold:

- [ ] Exactly one `<meta charset>` tag in `src/pages/index.astro`.
- [ ] No `type="image/svg+xml"` remains on the favicon link.
- [ ] No `roboto` reference in `src/styles/global.scss`; Inter import intact.
- [ ] `min-height` uses `100dvh`, not `100vdh`.
- [ ] `npm run build` exits 0; `dist/index.html` no longer references
      `family=Roboto`.
- [ ] Only `src/pages/index.astro` and `src/styles/global.scss` are modified
      (`git status`); the `og:*` lines are untouched.
- [ ] `plans/README.md` status row for plan 004 updated.

## STOP conditions

Stop and report back (do not improvise) if:

- Either file does not match the "Current state" excerpts (drift) — in
  particular, if plan 002 has reflowed the `<head>`, re-locate the duplicate
  charset and favicon lines by text and proceed only if they clearly match;
  otherwise stop.
- A `grep` for `Roboto` finds an actual `font-family: Roboto` usage somewhere
  (it should not). If Roboto turns out to be used, do NOT remove its import —
  report the usage location instead.
- The build fails after the edits with an error you cannot fix in one obvious
  attempt.

## Maintenance notes

- `100dvh` is well-supported in current browsers; if the project must support
  very old browsers, a `min-height: 100vh;` fallback line before the `100dvh`
  line is the conventional approach. Not added here to keep the change minimal.
- A reviewer should sanity-check that removing the Roboto import causes no visual
  change (expected: none, since nothing referenced it).
