# Angular Bolivia — Website

The official marketing site for **[Angular Bolivia](https://ng.com.bo)**, a
community of software developers based in Cochabamba, Bolivia, focused on Angular
and modern web development. It is a single, static, Spanish-language landing page
that introduces the community, its organizers, past events, and the next upcoming
event.

🌐 **Live site: [ng.com.bo](https://ng.com.bo)**

## Tech stack

- **[Astro](https://astro.build)** — static site framework and build pipeline.
- **[Angular](https://angular.dev)** (standalone components) — the UI/templating
  layer, rendered to static HTML at build time via
  **[`@analogjs/astro-angular`](https://analogjs.org)**.
- **SCSS** — styling.
- **[Partytown](https://partytown.builder.io)** — runs Google Analytics off the
  main thread.
- **Firebase Hosting** — deployment target.

Angular is used purely as a component/templating layer — there is no router, no
`NgModule`, no services, and no client-side app bootstrap. Each section is a
self-contained standalone component.

## Getting started

Requires **Node.js ≥ 22.12** and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:4321
```

## Scripts

| Command           | Action                                              |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the local dev server at `localhost:4321`      |
| `npm run build`   | Build the production site to `./dist/`              |
| `npm run preview` | Preview the production build locally                |
| `npm run check`   | Type-check Astro and Angular components (no emit)   |

There is no automated test suite; `npm run check` and `npm run build` are the
verification gates.

## Project structure

```
src/
├── pages/index.astro      # the only page — composition root; imports every
│                          # stylesheet and component and lays out the sections
├── components/            # standalone Angular components, grouped by area
│   ├── home/<section>/    # one component per page section
│   └── layout/navbar/
├── styles/                # global + per-section SCSS (imported by index.astro)
└── links.ts               # single source of truth for all external URLs
public/                    # static assets served from / (images, fonts, favicon)
```

Section content lives inline in each component (e.g. the upcoming event in
`next-events.component.ts`, organizers in `organizers.component.ts`). The most
common change is a **content update** — swapping the next event, editing an
organizer, or updating a link in `src/links.ts`.

Contributors and AI agents: see [`CLAUDE.md`](./CLAUDE.md) for architecture
details and conventions.

## Deployment

Deployed to Firebase Hosting (project `ng-bolivia-website`) via GitHub Actions:

- Push to `main` → deploys to the **live** channel.
- Pull request → deploys to a **preview** channel.

Both run `npm ci && npm run build` and publish `dist/`.

## Contributing

Issues and pull requests are welcome. Match the existing conventions documented
in [`CLAUDE.md`](./CLAUDE.md) (Angular standalone components, `@if`/`@for`
control flow, centralized links). Open a PR against `main`; CI will build a
preview deploy automatically.

## License

[MIT](./LICENSE) © Angular Bolivia
