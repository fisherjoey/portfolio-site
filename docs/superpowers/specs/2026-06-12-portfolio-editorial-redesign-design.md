# Portfolio — Editorial Redesign & Project Additions

**Date:** 2026-06-12
**Status:** Approved (pending spec review)
**Owner:** Joey Fisher

## Goal

Redesign the single-page portfolio with a **fresh visual identity** in a **light, modern-serif editorial** direction, add the remaining public GitHub projects, feature a drawn portrait in the hero, and surface the SyncedTech consultancy brand.

This is a re-skin, not a re-architecture: the existing component structure, single-page layout, and three project tiers (Production / Professional / Personal) are kept. The work is a new design system applied through tokens plus targeted component edits.

## Decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Redesign scope | Fresh visual identity (new look, same bones/content) |
| Aesthetic | Refined minimal / editorial |
| Tone | Light |
| Identity system | Modern serif editorial |
| Portrait placement | Hero, alongside intro |
| Projects to add | `tt-save-editor`, `react-annotator` (Chrome + Firefox combined). Forks (`stokowski`, `symphony`) and profile/config repos excluded. |
| SyncedTech | Add `SyncedTech ↗` link → https://syncedtech.ca (header + footer; referenced in About/Services copy) |

## Visual identity

### Typography
- **Display / headings:** Fraunces (variable serif). Used for hero headline, section headings, project titles.
- **Body:** Inter. Paragraphs, descriptions, nav.
- **Mono:** JetBrains Mono (or Geist Mono). Eyebrows/labels, tech tags, index numerals (`01`, `02`…), meta.
- Fonts loaded via `@fontsource` packages (self-hosted, no external request) or Google Fonts `<link>` — implementation detail decided in plan. Prefer `@fontsource` for privacy/perf.

### Color — light editorial palette
Replaces the current dark charcoal/indigo tokens in `src/index.css`. Target values (tunable during build):
- **Background (paper):** warm off-white, ~`#FAF8F4`
- **Raised surface:** ~`#FFFFFF` / very light warm grey for cards
- **Ink (primary text):** near-black, ~`#1A1A1A`
- **Secondary text:** ~`#55555A`
- **Muted/meta:** ~`#8A8A90`
- **Hairline borders:** ~`rgba(0,0,0,0.10)`
- **Primary accent:** deep ink-blue, ~`#1D3A5F` (links, eyebrows, active states)
- **Secondary accent (sparing):** warm ochre carried from current brand, ~`#A08758`

Contrast must meet WCAG AA for text on paper. Re-check every text/background pair when values finalize.

### Motion & shape
- Restrained: soft fade/translate reveals only; honor `prefers-reduced-motion` (already wired).
- Hairline rules over heavy borders; generous whitespace; minimal/no shadows (light, flat, editorial). Small radii.

## Layout (section by section)

All sections live in the existing single-page `App.tsx` composition. Each existing component is restyled; a few get structural edits noted below.

1. **Header** (`components/layout/Header.tsx`)
   - Light, minimal. Name wordmark left; small mono nav right; **`SyncedTech ↗`** link added to nav + GitHub/email icons.
   - Transparent at top; hairline bottom border + paper background on scroll (keep existing scroll logic).

2. **Hero** (`components/sections/Hero.tsx`) — **structural change: two-column**
   - Left: mono eyebrow (`Software developer · Calgary, AB`), large Fraunces headline, short Inter intro, CTA buttons (See the work / GitHub / Email).
   - Right: **drawn portrait** in a clean framed treatment (hairline frame or subtle offset; no heavy shadow).
   - Portrait sourced from `/portrait.png` (or `/projects/…`); **graceful fallback** rendered when the file is missing/empty (the real file is currently 0 bytes). Fallback = a tasteful placeholder block, never a broken image.
   - Single-column stack on mobile (portrait above or below intro — decided in plan).

3. **Project grids** (`components/sections/ProjectGrid.tsx`, `ProjectGrid` card)
   - Keep three tiers + section eyebrow/heading/lede pattern (`SectionHeading`).
   - Editorial card restyle: light surface, hairline border, **mono index numeral**, Fraunces title, Inter description, mono tech tags. Dark screenshots framed against the light page (rounded corners, hairline frame) so they read as intentional, not clashing.
   - Featured projects may render larger than non-featured (existing `featured` flag) — exact emphasis decided in plan.
   - Lightbox/gallery behavior preserved (`ProjectLightbox`).

4. **Services CTA** (`components/sections/ServicesCTA.tsx`) — restyle light/editorial; reference SyncedTech.

5. **Experience** (`components/sections/Experience.tsx`) — restyle as a hairline timeline; light tokens.

6. **About + Contact** (`components/sections/AboutContact.tsx`) — restyle light; may reuse/echo the portrait; SyncedTech mention.

7. **Footer** (`components/layout/Footer.tsx`) — minimal, light; `SyncedTech ↗`, GitHub, email.

## New projects (data + assets)

Add to `src/data/projects.ts`, category `personal`:

### tt-save-editor
- **Title:** TT Save Editor (or "LEGO Batman Save Editor")
- **Description (short):** Browser save editor for *LEGO Batman: Legacy of the Dark Knight*. Fixes the "created on an updated version" error and lets you unlock collectibles, characters, and missions — 100% client-side, nothing uploaded.
- **Tech:** TypeScript, React, Client-side / WASM-or-binary parsing (confirm stack during build)
- **Links:** live `https://tt-save-editor.vercel.app`, github `https://github.com/fisherjoey/tt-save-editor`
- **Images:** capture 1–2 screenshots from the live site during implementation → `public/projects/tt-save-editor/`
- **featured:** false (range/fun piece)

### react-annotator (combined Chrome + Firefox)
- **Title:** React Annotator
- **Description (short):** Browser extensions (Chrome + Firefox) for annotating React components on any page and exporting the selection for Claude Code.
- **Tech:** JavaScript, Browser Extensions (MV3), React internals
- **Links:** github (Chrome) `https://github.com/fisherjoey/react-annotator-chrome`, plus Firefox `https://github.com/fisherjoey/react-annotator-firefox`. Data model currently supports a single `github` URL — extend to allow a second repo link, or link Chrome as primary and mention Firefox in copy (decided in plan).
- **Images:** `public/projects/react-annotator/` exists but is empty. Capture extension UI if feasible; otherwise use the editorial no-image card treatment (existing `PlaceholderArt`, restyled for light).
- **featured:** false

## Data model changes

`src/data/projects.ts` may need a small extension for React Annotator's second repo link (e.g. optional `githubSecondary?: string` or a `links?: {label,url}[]`). Keep it minimal and backward-compatible. Decided in plan.

## Technical approach

1. **Tokens first:** rewrite the `:root` and `@theme` token blocks in `src/index.css` to the light editorial palette + new font variables. This flips the global look in one place.
2. **Fonts:** add Fraunces / Inter / JetBrains Mono.
3. **Component edits:** Header (light + SyncedTech), Hero (two-col + portrait + fallback), card restyle, Experience timeline, Services/About/Footer restyle.
4. **Data:** add the two projects; create/populate asset folders; capture screenshots.
5. **Verify:** contrast pass (AA), keyboard focus states, reduced-motion, responsive (mobile/desktop), build (`tsc -b && vite build`), lint.

## Out of scope / deferred (non-blocking)

- **Real portrait file** — currently 0 bytes. Build the slot with a fallback; drop the real image in when it lands.
- **New-project screenshots** — captured during build where feasible; React Annotator may ship image-less initially.
- **Final accent color** — defaults above; tunable in a quick visual pass (ideally when Joey is at a desk, since he's reviewing from a phone now).
- **Dark mode** — not in scope (chose light only).

## Success criteria

- Site reads as a cohesive light, modern-serif editorial design — clearly a fresh identity, not the old dark theme.
- All three tiers render; `tt-save-editor` and `react-annotator` appear under Personal with correct links.
- Drawn portrait shows in the hero (or a clean fallback until the file lands).
- `SyncedTech ↗` links to https://syncedtech.ca from header and footer.
- Passes build, lint, AA contrast, keyboard nav, and reduced-motion; responsive on mobile + desktop.
