# Plan 001: Add an `astro check` verification baseline script

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 12702e8..HEAD -- package.json tsconfig.json tsconfig.app.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `12702e8`, 2026-06-15

## Why this matters

The project has no fast way to catch broken Angular templates or TypeScript
errors before deploying — the only command that validates anything is
`astro build`, which is slower and conflates "did it compile" with "did it
produce output". The TypeScript config already enables strict template checking
(`strictTemplates: true`), but nothing runs it on demand. Adding an
`astro check` script gives every future change (and the other plans in this
folder) a single, quick verification gate, and makes it possible to add a
type-check step to CI later.

## Current state

- `package.json` — defines the npm scripts. There is no `check` script today:

  ```json
  // package.json:5-11
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  ```

- `tsconfig.json` extends Astro's strict base; `tsconfig.app.json` sets
  `angularCompilerOptions.strictTemplates: true`. So template type errors are
  detectable — they just aren't being surfaced by a script.
- This is an Astro 6 project (`astro@^6.4.7` in `package.json` dependencies).
  Astro's checker is provided by the separate `@astrojs/check` package plus
  `typescript`; `astro check` will prompt to install them if missing. The
  executor must add them explicitly rather than rely on an interactive prompt.

## Commands you will need

| Purpose        | Command                          | Expected on success            |
|----------------|----------------------------------|--------------------------------|
| Install        | `npm install`                    | exit 0                         |
| Build          | `npm run build`                  | "Complete!" printed, exit 0    |
| New check      | `npm run check`                  | exit 0 after the script exists |

This repo uses **npm** (there is a `package-lock.json`). Do not use pnpm or yarn.

## Scope

**In scope** (the only files you should modify):
- `package.json` — add the `check` script and the two devDependencies.
- `package-lock.json` — will update automatically when you run `npm install`.

**Out of scope** (do NOT touch):
- `tsconfig.json`, `tsconfig.app.json` — the existing strict settings are
  correct; do not loosen them to make the check pass. If the check surfaces real
  type errors, that is a STOP condition (see below), not a license to edit
  tsconfig.
- Any `.astro` or `.component.ts` source file — this plan only adds tooling.
- The GitHub Actions workflows under `.github/workflows/` — wiring `check`
  into CI is deferred (see Maintenance notes).

## Git workflow

- Branch: `advisor/001-astro-check`
- This repo's history uses short imperative commit subjects (e.g.
  "Update next event image", "Centralize external links in src/links.ts").
  Match that style.
- Append this trailer to the commit message (matches repo convention):
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the checker dev dependencies

Install the Astro checker and TypeScript as devDependencies:

```
npm install --save-dev @astrojs/check typescript
```

This adds both to a `devDependencies` block in `package.json` and updates
`package-lock.json`.

**Verify**: `node -e "const p=require('./package.json'); console.log(p.devDependencies['@astrojs/check'] && p.devDependencies['typescript'] ? 'OK' : 'MISSING')"` → prints `OK`

### Step 2: Add the `check` script

Edit `package.json` so the `scripts` block includes a `check` entry that runs
the Astro checker. Final `scripts` block:

```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check",
  "astro": "astro"
}
```

**Verify**: `npm run check` → exits 0. The output ends with a result line
reporting `0 errors` (it may also print warnings, e.g. the cosmetic
`"Component" is imported … but never used` notice from the Analog plugin —
warnings are acceptable; **errors are not**).

### Step 3: Confirm the build still works

**Verify**: `npm run build` → prints `[build] Complete!` and exits 0.

## Test plan

This project has no test suite, and this plan adds none (it is tooling only).
Verification is the two commands above:

- `npm run check` → exit 0, `0 errors`.
- `npm run build` → exit 0, `Complete!`.

If `npm run check` reports **errors** (not warnings) in existing source, that
means the new gate has surfaced a pre-existing type/template bug. Do not fix it
in this plan — record it and STOP (see STOP conditions).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run check` exits 0 with `0 errors`.
- [ ] `npm run build` exits 0 and prints `Complete!`.
- [ ] `package.json` contains a `check` script and `@astrojs/check` +
      `typescript` under `devDependencies`.
- [ ] No files outside the in-scope list are modified (`git status` shows only
      `package.json` and `package-lock.json`).
- [ ] `plans/README.md` status row for plan 001 updated.

## STOP conditions

Stop and report back (do not improvise) if:

- The `scripts` block in `package.json` does not match the "Current state"
  excerpt (the file has drifted since this plan was written).
- `npm run check` reports one or more **errors** in existing source. Capture the
  full error output in your report. Fixing pre-existing type errors is out of
  scope for a tooling plan and may need its own plan.
- `astro check` cannot run even after installing `@astrojs/check` and
  `typescript` (e.g. it demands a newer/older TypeScript). Report the exact
  version conflict.

## Maintenance notes

- Follow-up deferred on purpose: add `npm run check` as a step in
  `.github/workflows/firebase-hosting-merge.yml` and
  `.github/workflows/firebase-hosting-pull-request.yml` (both currently run only
  `npm ci && npm run build`). Doing so makes type/template errors block
  deploys. Left out here to keep this change low-risk and reviewable; open a
  separate change for CI wiring.
- A reviewer should confirm `check` runs in a clean clone (`npm ci` then
  `npm run check`) so the devDependencies are actually captured in the lockfile.
