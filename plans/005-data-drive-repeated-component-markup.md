# Plan 005: Data-drive the repeated markup in organizers, navbar socials, and highlighted events

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 12702e8..HEAD -- src/components/home/organizers/organizers.component.ts src/components/layout/navbar/navbar.component.ts src/components/home/highlighted-events/highlighted-events.component.ts src/links.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (recommended after 001 so `npm run check` is available;
  not required — `npm run build` is the fallback gate)
- **Category**: tech-debt
- **Planned at**: commit `12702e8`, 2026-06-15

## Why this matters

Three components render lists of near-identical blocks as copy-pasted HTML:

- `organizers.component.ts` — 4 nearly identical `organizers__profile` blocks
  (~22 lines each), differing only in photo, name, role, and LinkedIn URL.
- `navbar.component.ts` — 4 nearly identical social-link `<a><img></a>` blocks,
  differing only in URL, icon, alt, and image dimensions.
- `highlighted-events.component.ts` — 4 nearly identical event-logo `<a><img></a>`
  blocks, differing only in URL, logo, alt, and dimensions.

Editing these by hand is error-prone: in a recent change, removing one organizer
by hand introduced a malformed closing tag. Converting each to a typed data
array rendered with Angular's `@for` (the same control-flow the project already
uses in `next-events.component.ts`) removes ~100 lines of duplicated markup and
makes adding/removing an item a one-line data edit. The external URLs continue to
come from the centralized `src/links.ts` (the single source of truth), so this
plan changes *how* the markup is produced, not *what* it links to.

## Current state

### Exemplar to follow — `next-events.component.ts`

The repo already uses the target pattern: a typed interface + a class field +
`@for (... ; track ...)`. Match this style (single quotes, 2-space indent,
`readonly` field):

```ts
// src/components/home/next-events/next-events.component.ts (full file)
import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

interface CommunityEvent {
  title: string;
  link: string;
  image: string;
}

@Component({
  selector: 'ng-next-events',
  imports: [UpperCasePipe],
  template: `
    ...
        <div class="next-events__cards">
          @for (event of events(); track event.link) {
            <div class="next-events__card">
              <img width="380" height="380" [alt]="event.title" [src]="event.image" />
              ...
            </div>
          } @empty {
            <p>No hay eventos próximos por el momento. ¡Vuelve pronto!</p>
          }
        </div>
    ...
  `,
})
export class NextEventsComponent {
  readonly events = signal<CommunityEvent[]>([]);
}
```

> Note the distinction: `next-events` uses a `signal` because that list is
> treated as mutable state (events get added/removed over time). The three lists
> in *this* plan are effectively constant reference data, so use a plain
> `readonly` array (no `signal`) — both render identically under `@for`. Do not
> convert them to signals.

### Centralized links — `src/links.ts`

The URLs already live here; the new data arrays reference them (do **not**
re-hardcode the URLs in the components):

```ts
// src/links.ts (excerpt)
export const links = {
  ...
  social: {
    twitter: 'https://twitter.com/angularBolivia/',
    linkedin: 'https://www.linkedin.com/company/angular-bolivia/',
    facebook: 'https://www.facebook.com/angularBolivia/',
    instagram: 'https://www.instagram.com/angularbolivia/',
  },
  team: {
    luisAviles: 'https://www.linkedin.com/in/luixaviles/',
    mauricioArce: 'https://www.linkedin.com/in/combimauri/',
    griseldaGarcia: 'https://www.linkedin.com/in/combigriss/',
    rodrigoTorrico: 'https://www.linkedin.com/in/tokidev/',
  },
  events: {
    ngBolivia2018: 'https://www.youtube.com/watch?v=Q3pp4bm5H3I&list=PLRejFvqDqGo6AMNYSLluAVGbq-CHQ0Lkt',
    ngBolivia2019: 'https://www.youtube.com/watch?v=29w4cAjpMKA&list=PLRejFvqDqGo5moBGpb-A-QtZDjCMFFknf',
    tsday: 'https://www.youtube.com/live/_Gdygm9hBNA?si=LKauDOs0GqD4sKUl',
    ngShe: 'https://ngshe.ng-bolivia.org/',
  },
} as const;
```

### The three files to refactor (current shapes)

- `src/components/home/organizers/organizers.component.ts` — 4
  `organizers__profile` blocks. Per-organizer differences: photo (`/img/luis.webp`,
  `/img/mauri.webp`, `/img/griss.webp`, `/img/rodri.webp`), name (Luis Aviles,
  Mauricio Arce, Griselda García, Rodrigo Torrico), role (Sr. Software Engineer,
  Front-end Developer, Full Stack Developer, Sr. Software Developer), and LinkedIn
  (`links.team.luisAviles` / `.mauricioArce` / `.griseldaGarcia` / `.rodrigoTorrico`).
  Every photo `<img>` is `width="180" height="180"`; every LinkedIn icon is
  `/img/linkedin-logo.svg width="24" height="24" alt="Logo de LinkedIn"`. The
  per-photo `alt` follows the pattern
  `Fotografía de <name>, Lead Organizer de Angular Bolivia`.
- `src/components/layout/navbar/navbar.component.ts` — a static logo link and a
  `main-button` CTA (`href="#next-events"`), then 4 social `<a><img></a>` blocks.
  Per-link differences: url (`links.social.twitter` / `.linkedin` / `.facebook` /
  `.instagram`), icon, alt, and dimensions. **Note Twitter's icon is
  `width="24" height="27"`; the other three are `24×24`** — so width/height must
  be per-item, not hardcoded.
- `src/components/home/highlighted-events/highlighted-events.component.ts` — an
  intro `<p>` then 4 event `<a><img></a>` blocks. Per-event differences: url
  (`links.events.ngBolivia2018` / `.ngBolivia2019` / `.tsday` / `.ngShe`), logo,
  alt, and dimensions (`100×109`, `100×110`, `100×53`, `100×120`) — again
  per-item.

Keep every CSS class name exactly as-is (`organizers__profile`,
`organizers__name`, `navbar__links`, `highlighted-events__logos`, etc.) — the
stylesheets under `src/styles/` select on them and are out of scope.

## Commands you will need

| Purpose | Command          | Expected on success         |
|---------|------------------|-----------------------------|
| Install | `npm install`    | exit 0                      |
| Build   | `npm run build`  | prints `Complete!`, exit 0  |
| Check   | `npm run check`  | exit 0 (only if plan 001 has landed; otherwise skip) |

This repo uses **npm** (`package-lock.json` present). The build statically
renders the Angular components into `dist/index.html`, so the rendered HTML is
the verification surface.

## Scope

**In scope** (the only files you should modify):
- `src/components/home/organizers/organizers.component.ts`
- `src/components/layout/navbar/navbar.component.ts`
- `src/components/home/highlighted-events/highlighted-events.component.ts`

**Out of scope** (do NOT touch):
- `src/links.ts` — the URLs are correct and centralized; reference them, don't
  change them.
- Any stylesheet in `src/styles/` — class names must stay identical so styles
  keep matching.
- `next-events.component.ts` — it is the exemplar, already correct.
- The static parts of the navbar (the logo `<a href="/">` and the `main-button`
  CTA `<a href="#next-events">`) — leave them as plain markup; only the 4
  repeated **social** links become a `@for`.

## Git workflow

- Branch: `advisor/005-data-drive-lists`
- One commit per component is ideal (three small, reviewable commits), or one
  combined commit — match the repo's concise imperative subject style (e.g.
  "Data-drive organizers list with @for").
- Trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Refactor `organizers.component.ts`

Replace the four `organizers__profile` blocks with a single `@for`, and add a
typed `organizers` array. Target file:

```ts
import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

interface Organizer {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
}

@Component({
  selector: 'ng-organizers',
  imports: [UpperCasePipe],
  template: `
    <div class="organizers">
      <div class="container">
        <div class="organizers__content">
          <h2>{{ 'Lead organizers' | uppercase }}</h2>
          <div class="organizers__profiles">
            @for (organizer of organizers; track organizer.linkedin) {
              <div class="organizers__profile">
                <img
                  [src]="organizer.photo"
                  width="180"
                  height="180"
                  [alt]="
                    'Fotografía de ' +
                    organizer.name +
                    ', Lead Organizer de Angular Bolivia'
                  "
                />
                <p class="organizers__name">{{ organizer.name }}</p>
                <p>{{ organizer.role }}</p>
                <a
                  [href]="organizer.linkedin"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src="/img/linkedin-logo.svg"
                    width="24"
                    height="24"
                    alt="Logo de LinkedIn"
                  />
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrganizersComponent {
  readonly organizers: Organizer[] = [
    {
      name: 'Luis Aviles',
      role: 'Sr. Software Engineer',
      photo: '/img/luis.webp',
      linkedin: links.team.luisAviles,
    },
    {
      name: 'Mauricio Arce',
      role: 'Front-end Developer',
      photo: '/img/mauri.webp',
      linkedin: links.team.mauricioArce,
    },
    {
      name: 'Griselda García',
      role: 'Full Stack Developer',
      photo: '/img/griss.webp',
      linkedin: links.team.griseldaGarcia,
    },
    {
      name: 'Rodrigo Torrico',
      role: 'Sr. Software Developer',
      photo: '/img/rodri.webp',
      linkedin: links.team.rodrigoTorrico,
    },
  ];
}
```

**Verify**: `npm run build` → exit 0; then
`grep -c 'organizers__profile' src/components/home/organizers/organizers.component.ts`
→ `1` (the single templated block, not four).

### Step 2: Refactor `navbar.component.ts`

Keep the logo link and the `main-button` CTA exactly as they are. Replace only
the four social `<a><img></a>` blocks with a `@for` and add a typed
`socialLinks` array. Target file:

```ts
import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'ng-navbar',
  imports: [UpperCasePipe],
  template: `
    <div class="navbar">
      <div class="container">
        <div class="navbar__content">
          <a href="/">
            <img
              src="/img/ng-logo.svg"
              width="34"
              height="36"
              alt="Logo principal de Angular Bolivia"
            />
          </a>
          <div class="navbar__links">
            <a class="main-button" href="#next-events">
              <span class="navbar__mobile-text">
                {{ 'Inscríbete' | uppercase }}
              </span>
              <span class="navbar__desktop-text">
                {{ 'Inscríbete al próximo evento' | uppercase }}
              </span>
            </a>
            @for (social of socialLinks; track social.url) {
              <a [href]="social.url" rel="noopener noreferrer" target="_blank">
                <img
                  [src]="social.icon"
                  [width]="social.width"
                  [height]="social.height"
                  [alt]="social.alt"
                />
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavbarComponent {
  readonly socialLinks: SocialLink[] = [
    {
      url: links.social.twitter,
      icon: '/img/twitter-logo.svg',
      alt: 'Logo de Twitter',
      width: 24,
      height: 27,
    },
    {
      url: links.social.linkedin,
      icon: '/img/linkedin-logo.svg',
      alt: 'Logo de LinkedIn',
      width: 24,
      height: 24,
    },
    {
      url: links.social.facebook,
      icon: '/img/facebook-logo.svg',
      alt: 'Logo de Facebook',
      width: 24,
      height: 24,
    },
    {
      url: links.social.instagram,
      icon: '/img/instagram-logo.svg',
      alt: 'Logo de Instagram',
      width: 24,
      height: 24,
    },
  ];
}
```

**Verify**: `npm run build` → exit 0; then
`grep -c 'rel="noopener noreferrer"' src/components/layout/navbar/navbar.component.ts`
→ `1` (one templated link, not four).

### Step 3: Refactor `highlighted-events.component.ts`

Replace the four event `<a><img></a>` blocks with a `@for` and add a typed
`events` array. Keep the intro `<p>`. Target file:

```ts
import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

interface HighlightedEvent {
  url: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'ng-highlighted-events',
  imports: [UpperCasePipe],
  template: `
    <div class="highlighted-events">
      <div class="container">
        <div class="highlighted-events__content">
          <p>
            {{ 'Algunos de nuestros eventos organizados:' | uppercase }}
          </p>
          <div class="highlighted-events__logos">
            @for (event of events; track event.url) {
              <a [href]="event.url" rel="noopener noreferrer" target="_blank">
                <img
                  [src]="event.logo"
                  [width]="event.width"
                  [height]="event.height"
                  [alt]="event.alt"
                />
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HighlightedEventsComponent {
  readonly events: HighlightedEvent[] = [
    {
      url: links.events.ngBolivia2018,
      logo: '/img/ng-bolivia-2018-logo.png',
      width: 100,
      height: 109,
      alt: 'Logo de NG-Bolivia 2018 de la comunidad Angular Bolivia',
    },
    {
      url: links.events.ngBolivia2019,
      logo: '/img/ng-bolivia-2019-logo.png',
      width: 100,
      height: 110,
      alt: 'Logo de NG-Bolivia 2019 de la comunidad Angular Bolivia',
    },
    {
      url: links.events.tsday,
      logo: '/img/tsday-logo.png',
      width: 100,
      height: 53,
      alt: 'Logo de TSDay de la comunidad Angular Bolivia',
    },
    {
      url: links.events.ngShe,
      logo: '/img/ng-she-logo.png',
      width: 100,
      height: 120,
      alt: 'Logo de NG-She de la comunidad Angular Bolivia',
    },
  ];
}
```

**Verify**: `npm run build` → exit 0; then
`grep -c 'highlighted-events__logos' src/components/home/highlighted-events/highlighted-events.component.ts`
→ `1`.

### Step 4: Verify the rendered output is unchanged

The whole point: the generated HTML should be equivalent to before. Build, then
confirm every URL, image, and the organizer names still render:

**Verify** — all of these grep `dist/index.html` after `npm run build`:

- `grep -o 'Luis Aviles\|Mauricio Arce\|Griselda García\|Rodrigo Torrico' dist/index.html | sort -u`
  → all four names present.
- `grep -c '/img/luis.webp' dist/index.html` and the same for `mauri`, `griss`,
  `rodri` → each `1`.
- `grep -c 'twitter.com/angularBolivia' dist/index.html` → `1`; same for the
  linkedin company, facebook, instagram URLs.
- `grep -c 'ngshe.ng-bolivia.org' dist/index.html` → `1`; and the two youtube
  list URLs and the tsday live URL each appear once.
- `grep -c 'width="24" height="27"' dist/index.html` → `1` (Twitter's distinct
  dimensions survived — proves per-item width/height binding works).

## Test plan

No automated test framework exists in this repo; the build's static HTML output
is the regression surface. The Step 4 greps constitute the regression check:
they assert that every name, image, URL, and the one distinct dimension pair
that existed before still appears in `dist/index.html` after the refactor.

If plan 001 has landed, also run `npm run check` → exit 0 (catches any template
type error, e.g. a typo'd `links.team.*` key).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run build` exits 0 and prints `Complete!`.
- [ ] Each refactored component source contains exactly **one** templated block
      (greps in Steps 1–3 each return `1`).
- [ ] All four organizer names and photos render in `dist/index.html`.
- [ ] All social, team, and event URLs from `src/links.ts` still appear in
      `dist/index.html` (Step 4 greps).
- [ ] `grep -c 'width="24" height="27"' dist/index.html` → `1` (per-item
      dimensions preserved).
- [ ] Only the three in-scope component files are modified (`git status`);
      `src/links.ts` and all stylesheets are unchanged.
- [ ] If plan 001 landed: `npm run check` exits 0.
- [ ] `plans/README.md` status row for plan 005 updated.

## STOP conditions

Stop and report back (do not improvise) if:

- Any in-scope file does not match the "Current state" description (drift) —
  e.g. an organizer was added/removed since this plan was written. Re-derive the
  data array from the live markup if it's an obvious 1:1 mapping; if anything is
  ambiguous, stop.
- The build or `npm run check` reports a template error you cannot resolve in one
  attempt (common cause: a mistyped `links.*` key — the keys are exactly those in
  the `src/links.ts` excerpt above).
- A Step 4 grep shows a URL/name/image that existed before is now **missing** —
  that means the data array dropped or altered an item; do not "fix" by editing
  `dist/`; fix the source array or stop.
- The refactor appears to require touching a stylesheet (it should not — class
  names are unchanged).

## Maintenance notes

- Adding or removing an organizer / social link / past event is now a one-line
  edit to the relevant `readonly` array — no markup surgery. New external URLs
  should still be added to `src/links.ts` first, then referenced from the array.
- A reviewer should diff the rendered `dist/index.html` before vs. after (or
  rely on the Step 4 greps) to confirm the output is byte-equivalent except for
  Angular's `@for` marker comments.
- These lists were intentionally left as plain `readonly` arrays (not signals)
  because they are constant. If a future feature needs to mutate one at runtime
  (e.g. fetch organizers from a CMS), convert that one to a `signal`, matching
  `next-events.component.ts`.
- This plan composes with the "centralize content" direction: organizers and
  past-events data could later move into `src/links.ts`-style content modules or
  Astro content collections; this refactor is the prerequisite step (markup is
  now driven by data, so relocating the data is mechanical).
