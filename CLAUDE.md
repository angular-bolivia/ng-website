# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing/landing website for **Angular Bolivia** (`ng-bolivia-website`), a developer community. It is a single-page Spanish-language site. Content is largely static and edited by hand — most "features" are content updates (e.g. announcing the next event, swapping an image), not new code.

## Commands

```bash
npm run dev      # Astro dev server (http://localhost:4321)
npm run build    # Production build to ./dist/
npm run preview  # Preview the production build locally
npm run astro check   # Type-check Astro/Angular components
```

There is no test suite, linter, or formatter configured.

## Architecture

This is an **Astro** site that renders **standalone Angular components** via the `@analogjs/astro-angular` integration. Angular is used only as a component/templating layer — there is no router, no `NgModule`, no services, no client-side app bootstrap. Each component is static, self-contained, and ships its data inline.

- **`src/pages/index.astro`** — the only page and the composition root. It imports every stylesheet and every Angular component, then lays them out in order inside `<body>`. To change page structure or add/remove a section, edit this file.
- **`src/components/`** — Angular standalone components, grouped `home/<section>/` and `layout/`. Each is a single `.component.ts` with an **inline `template`** (no separate `.html`). Selectors are prefixed `ng-` (e.g. `ng-next-events`). Components hold their own content inline — e.g. `NextEventsComponent.events` is a `signal` holding the list of upcoming events. UI text is Spanish.
- **`src/styles/`** — global and per-section SCSS, mirroring the component folders (`styles/home/<section>.scss`, `styles/layout/`). **Styles are NOT colocated in components**; they live here and are imported by `index.astro`. When adding a section, add both the component and its stylesheet, then wire both into `index.astro`.
- **`src/components/google-analytics/google-analytics.astro`** — analytics, loaded off the main thread via the `@astrojs/partytown` integration.
- **`public/`** — static assets served from `/` (images under `/img`, fonts under `/font`). Components reference these by absolute path (e.g. `/img/ai-angular-2.webp`).

### Conventions

- Angular components are standalone (the default — don't add `standalone: true`) and must explicitly list `imports` for anything used in the template (e.g. `UpperCasePipe`). There is no shared module to register declarations in.
- TypeScript is strict (`strict`, `strictTemplates`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`). Keep templates strictly typed.
- Angular is v22. Use the modern built-in control flow (`@if` / `@for` / `@empty`), not the legacy `*ngIf` / `*ngFor` structural directives. Hold component state in `signal()`s and read them as `events()` in templates.

## Deployment

Deployed to **Firebase Hosting** (project `ng-bolivia-website`). GitHub Actions auto-deploy:
- Push to `main` → live deploy (`.github/workflows/firebase-hosting-merge.yml`).
- Pull request → preview channel (`.github/workflows/firebase-hosting-pull-request.yml`).

Both run `npm ci && npm run build` and publish `dist/`. The build must pass for deploys to succeed.
