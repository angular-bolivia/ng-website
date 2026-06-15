# Plan 003: Make Google Analytics work under Partytown (forward `dataLayer.push`)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 12702e8..HEAD -- astro.config.mjs src/components/google-analytics/google-analytics.astro`
> If either in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `12702e8`, 2026-06-15

## Why this matters

The site loads Google Analytics through Partytown, which runs third-party
scripts in a **web worker** instead of the main thread. Google's gtag snippet
works by calling `dataLayer.push(...)` (via the `gtag()` function). When gtag
runs inside the Partytown worker, those `push` calls stay in the worker unless
Partytown is explicitly told to **forward** them back to the main thread, where
the real `dataLayer` and network sends live.

Right now `partytown()` is configured with no options, so `dataLayer.push` is
not forwarded. The practical effect: the analytics integration is present in the
code but is very likely **recording nothing** — page views and events never make
it out. This is the well-documented Astro + Partytown + Google Analytics setup
requirement. The fix is a one-line config addition.

## Current state

- `astro.config.mjs` — registers the Partytown integration with **no config**:

  ```js
  // astro.config.mjs (full file)
  import { defineConfig } from 'astro/config';
  import analogjsangular from "@analogjs/astro-angular";
  import partytown from "@astrojs/partytown";

  // https://astro.build/config
  export default defineConfig({
    integrations: [analogjsangular(), partytown()]
  });
  ```

- `src/components/google-analytics/google-analytics.astro` — the gtag snippet,
  loaded via Partytown (`type="text/partytown"`). It calls `gtag()`, which
  pushes onto `dataLayer`:

  ```astro
  <!-- src/components/google-analytics/google-analytics.astro (full file) -->
  <script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-7K9VWR2PGF"></script>
  <script type="text/partytown">
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7K9VWR2PGF');
  </script>
  ```

- The component is included once, at the end of `<body>` in
  `src/pages/index.astro` (`<GoogleAnalytics />`).
- The GA measurement ID `G-7K9VWR2PGF` is a **public client-side identifier**,
  not a secret — it is intentionally visible in shipped HTML. Do not treat it as
  a credential and do not move it in this plan.

## Commands you will need

| Purpose | Command          | Expected on success         |
|---------|------------------|-----------------------------|
| Install | `npm install`    | exit 0                      |
| Build   | `npm run build`  | prints `Complete!`, exit 0  |

This repo uses **npm** (`package-lock.json` present).

## Scope

**In scope** (the only file you should modify):
- `astro.config.mjs` — add the Partytown `config.forward` option.

**Out of scope** (do NOT touch):
- `src/components/google-analytics/google-analytics.astro` — the snippet is
  correct; it only needs Partytown to forward `dataLayer.push`. Do not rewrite
  it, do not remove `type="text/partytown"` (that would defeat the point of
  Partytown), and do not move the GA ID.
- The `analogjsangular()` integration entry — leave it exactly as is.

## Git workflow

- Branch: `advisor/003-partytown-ga`
- Short imperative commit subject (e.g.
  "Forward dataLayer.push so GA works under Partytown").
- Trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Pass `forward: ["dataLayer.push"]` to the Partytown integration

Edit `astro.config.mjs` so the `partytown()` call receives a config object that
forwards `dataLayer.push`:

```js
export default defineConfig({
  integrations: [
    analogjsangular(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});
```

**Verify**: `npm run build` → exit 0, `Complete!`.

### Step 2: Confirm Partytown emits its config with the forward entry

After the build, Partytown writes its library and a config to `dist/~partytown/`,
and the page includes an inline Partytown config snippet that lists the forwarded
properties.

**Verify**: `grep -rl 'dataLayer.push' dist | grep -v '~partytown/lib'`
→ matches at least `dist/index.html` (the forwarded property name appears in the
emitted Partytown config, not only inside the GA snippet). If the only match is
the GA snippet text, the forward did not take effect — see STOP conditions.

## Test plan

No automated test framework exists in this repo. Verification is the build plus
the grep above, and a manual runtime confirmation that does not block "done":

- Build succeeds and `dataLayer.push` appears in the emitted Partytown config in
  `dist/index.html`.
- **Manual (recommended, not required to mark done)**: deploy or
  `npm run preview`, open the site, and in Google Analytics' Realtime view (or
  the browser Network tab, filtering for `google-analytics.com/g/collect` or
  `region1.google-analytics.com`) confirm a `collect` request fires on page
  load. Before this fix, no such request fires.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run build` exits 0 and prints `Complete!`.
- [ ] `astro.config.mjs` passes `config.forward: ['dataLayer.push']` to
      `partytown(...)`.
- [ ] `dataLayer.push` appears in `dist/index.html` as part of the emitted
      Partytown config (grep in Step 2 passes).
- [ ] Only `astro.config.mjs` is modified (`git status`).
- [ ] `plans/README.md` status row for plan 003 updated.

## STOP conditions

Stop and report back (do not improvise) if:

- `astro.config.mjs` does not match the "Current state" excerpt (drift).
- After Step 1, the build fails with a Partytown/config error (report the exact
  message — the option shape may differ in the installed `@astrojs/partytown`
  version; do not start rewriting the GA component to work around it).
- After a successful build, `dataLayer.push` does **not** appear in the emitted
  Partytown config in `dist/index.html` (only inside the GA snippet). That means
  the forward isn't being applied; report it rather than guessing at alternate
  config.

## Maintenance notes

- If more Google tags are added later (e.g. Google Ads, GTM container,
  conversion linker), they may push onto other globals; each global method that
  must reach the main thread needs its own entry in the `forward` array.
- A reviewer should ideally confirm Realtime analytics actually register a hit
  post-deploy — the build-time grep proves the config is wired, but only a live
  request proves end-to-end delivery.
- Deferred: if the team later wants analytics to load without a worker (simpler,
  at a small main-thread cost), the alternative is dropping
  `type="text/partytown"` and removing Partytown — out of scope here.
