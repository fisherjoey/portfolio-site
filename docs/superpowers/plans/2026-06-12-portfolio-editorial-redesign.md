# Portfolio Editorial Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the single-page portfolio into a light, modern-serif editorial identity, add two public projects, feature a drawn portrait in the hero, and surface the SyncedTech brand.

**Architecture:** The component structure and single-page composition stay. The look flips through a rewritten design-token + font layer in `src/index.css` and `index.html`, then per-component restyles. Two components get structural edits (Hero → two-column with portrait; ProjectGrid card → editorial). Data gains two projects and a second-repo link field.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind 4 (`@tailwindcss/vite`), lucide-react. Fonts via Google Fonts `<link>` (matches existing pattern). No test runner — verification is `tsc` + `vite build` + `eslint` + visual review.

**Spec:** `docs/superpowers/specs/2026-06-12-portfolio-editorial-redesign-design.md`

## Verification convention (used by every task)

Because there is no unit-test harness, each task's "tests" are:

- **Typecheck/build:** `npm run build` (runs `tsc -b && vite build`) — must exit 0.
- **Lint:** `npm run lint` — must exit 0 (no new errors).
- **Visual:** `npm run dev` (Vite, default port) and view the affected section; or capture a screenshot with the `webapp-testing` skill (headless Playwright) when reviewing from a phone. Confirm the described result.

Run all three before each commit. "Expected: PASS" below means build + lint exit 0 and the visual matches.

## Target design tokens (reference — used across tasks)

Light editorial palette (warm paper / ink / deep-blue accent):

| Token | Value | Notes |
|---|---|---|
| `--color-brand-black` (canvas) | `#FAF8F4` | warm paper background |
| `--surface-primary` | `#FAF8F4` | |
| `--surface-raised` | `#FFFFFF` | cards |
| `--surface-overlay` | `#F1EDE6` | tag/pill background |
| `--surface-feature` | `#F4F0E8` | feature panel |
| `--color-brand-white` (ink) | `#1A1A1A` | primary text |
| `--text-primary` | `#1A1A1A` | ~15:1 on paper |
| `--text-secondary` | `#4A4A50` | ~8:1 |
| `--text-muted` | `#6B6B73` | ~4.7:1 (AA small) |
| `--text-faint` | `#6B6B73` | decorative meta only |
| `--surface-border` | `rgba(26,26,26,0.10)` | hairlines |
| `--surface-border-strong` | `rgba(26,26,26,0.18)` | |
| `--color-brand-accent` | `#1D3A5F` | deep ink-blue |
| `--color-brand-accent-hover` | `#294F7E` | |
| `--accent-secondary` | `#A08758` | ochre, sparing |
| `--text-on-accent` | `#FFFFFF` | |
| `--font-heading` | `'Fraunces', serif` | display serif |
| `--font-body` | `'Inter', sans-serif` | |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` | eyebrows/tags/numerals |

---

## File structure

| File | Responsibility | Change |
|---|---|---|
| `index.html` | font links, meta, theme-color, color-scheme | Modify |
| `src/index.css` | design tokens, base styles, `.label` | Modify (token + font rewrite) |
| `src/components/ui/Button.tsx` | button variants | Modify (light variants) |
| `src/components/ui/SectionHeading.tsx` | section heading | Modify (serif/mono) |
| `src/components/layout/Header.tsx` | top nav | Modify (light + SyncedTech) |
| `src/components/sections/Hero.tsx` | hero | Modify (two-col + portrait) |
| `src/components/ui/Portrait.tsx` | portrait w/ graceful fallback | **Create** |
| `src/components/sections/ProjectGrid.tsx` | project cards | Modify (editorial card + index numerals) |
| `src/components/ui/ProjectLightbox.tsx` | gallery modal | Modify (light + secondary repo link) |
| `src/components/sections/Experience.tsx` | experience | Modify (hairline timeline, light) |
| `src/components/sections/ServicesCTA.tsx` | services CTA | Modify (light) |
| `src/components/sections/AboutContact.tsx` | about + contact | Modify (light) |
| `src/components/layout/Footer.tsx` | footer | Modify (light + SyncedTech) |
| `src/data/projects.ts` | project data + types | Modify (add `githubSecondary`, 2 projects) |
| `public/projects/tt-save-editor/` | screenshots | **Create** |
| `public/projects/react-annotator/` | screenshots (best effort) | Populate |
| `public/portrait.png` | drawn portrait (lands later; 0 bytes now) | external |

---

## Task 1: Fonts + document head

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Swap font links, meta theme to light**

Replace the `<head>` font link + the two color meta tags. New `index.html` head block:

```html
    <meta name="theme-color" content="#FAF8F4" />
    <meta name="color-scheme" content="light" />

    <title>Joey Fisher, Software Developer</title>
    <meta name="description" content="Portfolio of Joey Fisher. Full-stack developer in Calgary. Sports scheduling, small-business sites, personal apps." />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
```

(Keep `charset`, `viewport`, `<body>` as-is.)

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: PASS (exit 0).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "redesign: load editorial fonts (Fraunces/Inter/JetBrains Mono), light theme meta"
```

---

## Task 2: Design tokens → light editorial

**Files:**
- Modify: `src/index.css`

This is the keystone change — flips the global look. Replace the **`:root`** block, the **`@theme`** block, and the **`.surface-dark`** + **`.label`** rules with the versions below. Leave animations, `.skip-to-content`, `.sr-only`, reduced-motion, and the `@layer base` element rules intact **except** update `--heading-tracking` usage (already token-driven) — no base-layer edits needed beyond what's shown.

- [ ] **Step 1: Replace the `:root` block**

Replace the entire existing `:root { … }` block with:

```css
:root {
  /* Typography Scale */
  --heading-h1: clamp(2.5rem, 6vw, 5rem);
  --heading-h2: clamp(1.875rem, 3.2vw, 2.5rem);
  --heading-h3: clamp(1.125rem, 2vw, 1.375rem);
  --text-body: 1rem;
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;
  --text-xxs: 0.6875rem;

  /* Spacing Scale */
  --section-py-sm: 3rem;
  --section-py-md: 4rem;
  --section-py-lg: 6rem;

  /* Card Padding */
  --card-p-sm: 1rem;
  --card-p-md: 1.5rem;
  --card-p-lg: 2rem;

  /* Animation Durations */
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;

  /* Accent Bar */
  --accent-bar-w: 4rem;
  --accent-bar-h: 2px;

  /* Content Max Widths */
  --content-narrow: 48rem;
  --content-standard: 56rem;
  --content-wide: 64rem;

  /* Shape — editorial: small radii */
  --radius-card: 4px;
  --radius-button: 3px;
  --radius-input: 3px;

  /* Text Transform */
  --heading-transform: none;
  --heading-tracking: -0.005em;
  --button-transform: none;
  --button-tracking: 0.01em;
  --label-transform: uppercase;
  --label-tracking: 0.14em;

  /* Borders */
  --button-border-width: 1px;
  --card-border-width: 1px;

  /* Shadows — flat editorial */
  --shadow-card: none;
  --shadow-card-hover: 0 1px 2px rgba(26, 26, 26, 0.06), 0 8px 24px rgba(26, 26, 26, 0.06);
  --shadow-float: 0 8px 30px rgba(26, 26, 26, 0.10);

  /* Glow (unused in light, kept for safety) */
  --glow-color: rgba(29, 58, 95, 0.06);
  --glow-color-strong: rgba(29, 58, 95, 0.12);

  /* ─── Light editorial palette: warm paper + deep ink-blue accent ─── */
  --color-brand-black: #FAF8F4;
  --color-brand-white: #1A1A1A;
  --color-brand-accent: #1D3A5F;
  --color-brand-accent-hover: #294F7E;
  --color-brand-gray-dark: #FFFFFF;
  --color-brand-gray-medium: #F1EDE6;
  --color-brand-gray-light: #1A1A1A;
  --color-brand-overlay: #FAF8F4;

  /* Semantic text */
  --text-primary: #1A1A1A;
  --text-secondary: #4A4A50;
  --text-muted: #6B6B73;
  --text-faint: #6B6B73;
  --text-disabled: #9A9AA2;
  --text-on-accent: #FFFFFF;

  /* Semantic surfaces */
  --surface-primary: #FAF8F4;
  --surface-raised: #FFFFFF;
  --surface-overlay: #F1EDE6;
  --surface-border: rgba(26, 26, 26, 0.10);
  --surface-border-strong: rgba(26, 26, 26, 0.18);

  /* Secondary accents (restrained) */
  --accent-secondary: #A08758;
  --accent-tertiary: #6B7585;
  --surface-feature: #F4F0E8;
  --surface-feature-text: #1A1A1A;
}
```

- [ ] **Step 2: Replace the `@theme` block**

Replace the entire existing `@theme { … }` block with:

```css
@theme {
  --color-brand-black: #FAF8F4;
  --color-brand-white: #1A1A1A;
  --color-brand-accent: #1D3A5F;
  --color-brand-accent-hover: #294F7E;
  --color-brand-gray-dark: #FFFFFF;
  --color-brand-gray-medium: #F1EDE6;
  --color-brand-gray-light: #1A1A1A;

  --font-heading: 'Fraunces', ui-serif, Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);
  --color-text-faint: var(--text-faint);
  --color-surface-primary: var(--surface-primary);
  --color-surface-raised: var(--surface-raised);
  --color-surface-overlay: var(--surface-overlay);
  --color-accent-secondary: var(--accent-secondary);
  --color-accent-tertiary: var(--accent-tertiary);
  --color-surface-feature: var(--surface-feature);
}
```

- [ ] **Step 3: Update `.surface-dark` and `.label`**

Replace the `.surface-dark { … }` rule with a light-context equivalent (the class name stays so existing usages don't break):

```css
/* ─── Surface Contexts ─── */
.surface-dark {
  --text-primary: #1A1A1A;
  --text-secondary: #4A4A50;
  --text-muted: #6B6B73;
  --text-faint: #6B6B73;
  --surface-border: rgba(26, 26, 26, 0.10);
  --surface-border-strong: rgba(26, 26, 26, 0.18);
  color: #1A1A1A;
}
```

Replace the `.label { … }` rule with a mono editorial eyebrow:

```css
.label {
  font-family: var(--font-mono);
  text-transform: var(--label-transform);
  letter-spacing: var(--label-tracking);
  font-size: var(--text-xs);
  color: var(--text-muted);
}
```

Also update the focus outline color in `@layer base` (`:focus-visible`) from the indigo to the new accent:

```css
  :focus-visible {
    outline: 2px solid rgba(29, 58, 95, 0.6);
    outline-offset: 3px;
    border-radius: 2px;
  }
```

- [ ] **Step 4: Verify**

Run: `npm run build && npm run dev` then load `/`.
Expected: PASS. Page renders on warm paper with dark text; headings are serif; nothing is white-on-white or unreadable. Some component-level dark classes (e.g. `bg-[var(--color-brand-black)]` in Header) now resolve to paper — expected, fixed in later tasks.

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "redesign: light editorial design tokens + serif/mono fonts"
```

---

## Task 3: Button + SectionHeading for light editorial

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/SectionHeading.tsx`

- [ ] **Step 1: Update Button outline/ghost contrast**

The `accent` variant already uses tokens (now deep-blue) and is fine. Update `variantStyles` so `outline`/`ghost` read on a light surface — replace the `variantStyles` constant with:

```tsx
const variantStyles: Record<ButtonVariant, string> = {
  accent:
    'bg-[var(--color-brand-accent)] text-[var(--text-on-accent)] border border-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] hover:border-[var(--color-brand-accent-hover)]',
  outline:
    'border border-[var(--surface-border-strong)] text-[var(--text-primary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)]',
  ghost:
    'text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)]',
}
```

(This is unchanged logic but confirms `text-on-accent` token usage; if already identical, no-op and skip the commit for this file.)

- [ ] **Step 2: SectionHeading — serif heading already token-driven**

`SectionHeading` uses `font-heading` (now Fraunces) and `--text-*` tokens — it inherits the new look automatically. Adjust heading weight/size for serif display by replacing the `<h2>` line:

```tsx
      <h2 className="font-heading text-3xl md:text-5xl font-medium text-[var(--text-primary)] max-w-3xl leading-[1.08]">
        {children}
      </h2>
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/SectionHeading.tsx
git commit -m "redesign: light button variants + serif section headings"
```

---

## Task 4: Header — light + SyncedTech link

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Add SyncedTech to nav constants and lighten the bar**

Add a SyncedTech URL constant after `EMAIL`:

```tsx
const SYNCEDTECH_URL = 'https://syncedtech.ca'
```

Replace the scrolled-state `<header>` className expression so the scrolled background is paper, not near-black:

```tsx
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--surface-primary)]/90 backdrop-blur-md border-b border-[var(--surface-border)]'
          : 'bg-transparent'
      }`}
    >
```

- [ ] **Step 2: Add the SyncedTech link to desktop nav**

In the desktop `<nav>`, immediately before the `<div className="ml-2 flex items-center gap-1">` icon group, insert:

```tsx
          <a
            href={SYNCEDTECH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-mono text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-hover)] transition-colors inline-flex items-center gap-1"
          >
            SyncedTech
            <span aria-hidden="true">↗</span>
          </a>
```

- [ ] **Step 3: Lighten the mobile menu panel + add SyncedTech**

Replace the mobile dropdown container `bg-[var(--color-brand-black)]` (now paper, fine) — confirm it reads `bg-[var(--surface-primary)]`:

```tsx
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--surface-primary)]">
```

In the mobile `<nav>`, after the `NAV_LINKS.map(...)` block and before the icon `<div>`, insert:

```tsx
            <a
              href={SYNCEDTECH_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 text-sm font-mono text-[var(--color-brand-accent)] inline-flex items-center gap-1"
            >
              SyncedTech <span aria-hidden="true">↗</span>
            </a>
```

- [ ] **Step 4: Verify**

Run: `npm run build && npm run lint`, then `npm run dev` and check the header at top and after scrolling, plus the mobile menu (narrow the viewport).
Expected: PASS. Header is transparent over paper at top; gains a paper blur + hairline on scroll. "SyncedTech ↗" appears in nav (mono, accent) and links to syncedtech.ca.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "redesign: light header + SyncedTech nav link"
```

---

## Task 5: Portrait component (graceful fallback)

**Files:**
- Create: `src/components/ui/Portrait.tsx`

The real `public/portrait.png` is currently 0 bytes / may be absent. The component must never show a broken image — on load error it renders an editorial placeholder (serif "JF" monogram on a warm panel with a hairline frame).

- [ ] **Step 1: Create the component**

```tsx
import { useState } from 'react'

interface PortraitProps {
  src?: string
  alt?: string
  className?: string
}

export default function Portrait({
  src = '/portrait.png',
  alt = 'Drawn portrait of Joey Fisher',
  className = '',
}: PortraitProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--surface-border-strong)] bg-[var(--surface-feature)] ${className}`}
    >
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-7xl font-medium text-[var(--color-brand-accent)]/45 select-none">
            JF
          </span>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(29,58,95,0.06),transparent_60%)]" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: PASS. (Visual verified in Task 6 once mounted in Hero. With no portrait file, the "JF" monogram shows.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Portrait.tsx
git commit -m "redesign: Portrait component with graceful fallback monogram"
```

---

## Task 6: Hero — two-column with portrait

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Replace Hero with a two-column editorial layout**

Replace the entire file with:

```tsx
import Container from '../ui/Container'
import Button from '../ui/Button'
import Portrait from '../ui/Portrait'
import { Mail, ArrowDown } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <p className="label text-[var(--color-brand-accent)] mb-5">
              Software developer · Calgary, AB
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[var(--text-primary)] max-w-3xl leading-[1.04]">
              I keep building the features{' '}
              <span className="text-[var(--color-brand-accent)] italic">other apps leave out</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Full-stack TypeScript and React. Heads-down on SyncedSport right now (AI scheduling
              for sports officials), with a few client sites running on the side and a folder of
              personal apps that keeps growing.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#production" variant="accent">
                See the work
                <ArrowDown className="w-4 h-4" />
              </Button>
              <Button href="https://github.com/fisherjoey" external variant="outline">
                <GithubIcon className="w-4 h-4" />
                GitHub
              </Button>
              <Button href="mailto:joey.fisherucalgary@gmail.com" variant="ghost">
                <Mail className="w-4 h-4" />
                Get in touch
              </Button>
            </div>
          </div>

          <div className="order-first lg:order-last max-w-xs mx-auto lg:max-w-none w-full">
            <Portrait />
          </div>
        </div>
      </Container>
    </section>
  )
}
```

(The decorative dark radial-gradient `<div>` is removed — it was a dark-theme glow. Editorial hero is clean paper.)

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`, then `npm run dev` and view `/`. On desktop: text left, portrait right. On mobile (narrow viewport): portrait above the intro (`order-first`). Portrait shows the "JF" monogram until the real file lands.
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "redesign: two-column editorial hero with portrait"
```

---

## Task 7: Project data — add `githubSecondary` + two projects

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Add `githubSecondary` to the `Project` interface**

In the `Project` interface, after the `github?: string` line, add:

```tsx
  /** Optional second repo link (e.g. a Firefox build alongside a Chrome one). */
  githubSecondary?: string
  /** Label for the secondary repo link. Defaults to "Repo 2". */
  githubSecondaryLabel?: string
```

- [ ] **Step 2: Add the two new projects to the `personal` group**

In the `projects` array, inside the `// ─────────── Personal apps ───────────` section, append these two objects after the existing `StremiJoe` entry (before the closing `]`):

```tsx
  {
    title: 'React Annotator',
    category: 'personal',
    description:
      'Browser extensions (Chrome + Firefox) for annotating React components on any page and exporting the selection straight to Claude Code.',
    longDescription:
      "Two browser extensions that let me point at any React component on a live page, annotate it, and hand the exact selection to Claude Code instead of describing it in prose. Walks the React fiber tree to resolve the component under the cursor, captures props/source location, and serializes a payload Claude can act on. Ships for both Chrome and Firefox.",
    tech: ['JavaScript', 'Browser Extension (MV3)', 'React Internals', 'Claude Code'],
    github: 'https://github.com/fisherjoey/react-annotator-chrome',
    githubSecondary: 'https://github.com/fisherjoey/react-annotator-firefox',
    githubSecondaryLabel: 'Firefox',
    featured: false,
  },
  {
    title: 'TT Save Editor',
    category: 'personal',
    description:
      "Browser save editor for LEGO Batman: Legacy of the Dark Knight. Fixes the \"created on an updated version\" error and unlocks collectibles, characters, and missions — 100% client-side, nothing uploaded.",
    longDescription:
      "A fully client-side save editor for LEGO Batman: Legacy of the Dark Knight. Parses the binary save format in the browser so nothing ever leaves your machine, fixes the common \"created on an updated version\" load error, and lets you unlock collectibles and characters or edit progress directly. The interesting part is reverse-engineering the save layout and doing the byte-level edits safely in TypeScript.",
    tech: ['TypeScript', 'React', 'Vite', 'Client-side', 'Binary parsing'],
    github: 'https://github.com/fisherjoey/tt-save-editor',
    live: 'https://tt-save-editor.vercel.app',
    featured: false,
  },
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: PASS (types compile; `githubSecondary` is recognized). `npm run dev` → both new cards appear in the Personal section (TT Save Editor shows a placeholder cover for now; React Annotator shows the placeholder monogram).

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add React Annotator + TT Save Editor; support secondary repo link"
```

---

## Task 8: ProjectGrid card — editorial restyle + index numerals

**Files:**
- Modify: `src/components/sections/ProjectGrid.tsx`

- [ ] **Step 1: Pass the card index into `ProjectCard`**

In the `.map` inside the grid, change the callback to include the index and pass it:

```tsx
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpen={() => setOpenProject(project)}
            />
          ))}
```

- [ ] **Step 2: Update the `ProjectCard` signature + editorial styling**

Replace the `ProjectCard` function (from `function ProjectCard(...)` down to its closing `}` before `PlaceholderArt`) with:

```tsx
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const cover = project.images?.dark?.[0] ?? project.images?.light?.[0]
  const hasImages = (project.images?.dark?.length ?? project.images?.light?.length ?? 0) > 0
  const isContain = project.imageMode === 'contain'

  return (
    <article className="group relative flex flex-col bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 hover:border-[var(--surface-border-strong)] hover:shadow-[var(--shadow-card-hover)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        className="relative aspect-[16/10] block w-full overflow-hidden bg-[var(--surface-overlay)] cursor-pointer text-left border-b border-[var(--surface-border)]"
      >
        {cover ? (
          <img
            src={cover}
            alt={`${project.title} preview`}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${
              isContain ? 'object-contain p-10 sm:p-12' : 'object-cover'
            }`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <PlaceholderArt title={project.title} />
        )}
        {project.status ? (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[var(--surface-raised)]/90 text-[var(--text-secondary)] text-xs font-mono border border-[var(--surface-border-strong)] backdrop-blur-sm">
            {project.status}
          </span>
        ) : project.featured ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-brand-accent)] text-[var(--text-on-accent)] text-xs font-mono shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Featured
          </span>
        ) : null}
      </button>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums pt-1">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-heading text-xl font-medium text-[var(--text-primary)] leading-snug">
            {project.title}
          </h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-mono rounded-full bg-[var(--surface-overlay)] text-[var(--text-muted)] border border-[var(--surface-border)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--surface-border)]">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} on GitHub (opens in new tab)`}
              className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${project.title} live site (opens in new tab)`}
              className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
          <button
            type="button"
            onClick={onOpen}
            className="ml-auto text-xs font-mono text-[var(--color-brand-accent)] hover:underline"
          >
            {hasImages ? 'View gallery' : 'Details'} →
          </button>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Lighten `PlaceholderArt`**

Replace the `PlaceholderArt` function body's wrapper classes (the gradient was dark-tuned) with:

```tsx
function PlaceholderArt({ title }: { title: string }) {
  const initial = title.charAt(0).toUpperCase()
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--surface-feature)] relative">
      <span className="font-heading text-7xl font-medium text-[var(--color-brand-accent)]/30">
        {initial}
      </span>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(29,58,95,0.06),transparent_55%)]" />
    </div>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npm run build && npm run lint`, then `npm run dev`. Cards are white on paper with hairline borders, mono index numerals (`01`, `02`…), serif titles, mono tags. Dark screenshots sit framed against the light card with a hairline divider. Hover lifts with a soft shadow.
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProjectGrid.tsx
git commit -m "redesign: editorial project cards with index numerals"
```

---

## Task 9: ProjectLightbox — light + secondary repo link

**Files:**
- Modify: `src/components/ui/ProjectLightbox.tsx`

- [ ] **Step 1: Lighten the gallery image backdrop**

The modal scrim (`bg-black/90`) stays — a dark scrim is correct even on a light site, and the dark screenshots read well on it. Change the image stage background from pure black to keep screenshots framed; replace the image-stage wrapper:

```tsx
        {images.length > 0 && (
          <div className="relative bg-[var(--surface-overlay)] aspect-video">
```

- [ ] **Step 2: Render the secondary repo link**

In the links `<div className="flex items-center gap-2">` block, immediately after the `{project.github && ( … )}` anchor, insert a secondary-repo anchor:

```tsx
              {project.githubSecondary && (
                <a
                  href={project.githubSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--surface-border-strong)] text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  {project.githubSecondaryLabel ?? 'Repo 2'}
                </a>
              )}
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`, then `npm run dev`. Open the React Annotator card → lightbox shows both a "GitHub" pill (Chrome) and a "Firefox" pill. Open a project with a gallery (e.g. CBOA) → arrows/counter work, images sit on the light overlay stage.
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProjectLightbox.tsx
git commit -m "redesign: light lightbox stage + secondary repo link"
```

---

## Task 10: Experience — hairline timeline (light)

**Files:**
- Modify: `src/components/sections/Experience.tsx`

The component is already token-driven and inherits the light look. Apply two editorial touches.

- [ ] **Step 1: Add a left hairline rail to the experience list**

Replace the `<ol className="space-y-8 max-w-3xl">` opening tag with a ruled rail, and update each `<li>` to sit off the rail. Replace the `<ol>…</ol>` block with:

```tsx
        <ol className="space-y-10 max-w-3xl border-l border-[var(--surface-border)] pl-6 md:pl-8">
          {experience.map((e) => (
            <li
              key={e.role + e.company}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6"
            >
              <span className="absolute -left-[1.65rem] md:-left-[2.15rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-brand-accent)] ring-4 ring-[var(--surface-primary)]" />
              <div>
                <h3 className="font-heading text-xl font-medium text-[var(--text-primary)]">
                  {e.role}
                </h3>
                <p className="text-sm font-mono text-[var(--text-muted)] mt-0.5">
                  {e.company} · {e.location}
                </p>
                <p className="text-sm md:text-base text-[var(--text-secondary)] mt-3 leading-relaxed">
                  {e.summary}
                </p>
              </div>
              <p className="text-sm font-mono text-[var(--text-faint)] md:text-right md:whitespace-nowrap md:pt-1">
                {e.dates}
              </p>
            </li>
          ))}
        </ol>
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`, then `npm run dev`. Experience entries hang off a hairline rail with accent dots; company/dates are mono.
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "redesign: experience as a light hairline timeline"
```

---

## Task 11: ServicesCTA — light feature panel

**Files:**
- Modify: `src/components/sections/ServicesCTA.tsx`

- [ ] **Step 1: Replace the dark radial glow with a clean light panel**

Replace the decorative gradient `<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(...)]" />` with a subtler light accent:

```tsx
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_20%,rgba(29,58,95,0.06),transparent_55%)]" />
```

- [ ] **Step 2: Tidy the service pills for light**

Replace the service `<li>` className with a cleaner light pill:

```tsx
                  <li
                    key={s}
                    className="px-3 py-1.5 text-xs font-mono rounded-full border border-[var(--surface-border-strong)] bg-[var(--surface-raised)] text-[var(--text-secondary)]"
                  >
                    {s}
                  </li>
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`, then `npm run dev`. The Services panel is a light feature card on paper with a faint accent wash; the "Visit SyncedTech" button is deep-blue. Copy still references SyncedTech.
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ServicesCTA.tsx
git commit -m "redesign: light services feature panel"
```

---

## Task 12: AboutContact — light restyle

**Files:**
- Modify: `src/components/sections/AboutContact.tsx`

The component is token-driven and mostly inherits the look. One structural touch: add a small SyncedTech line to the "Currently" aside (spec asks About to reference SyncedTech).

- [ ] **Step 1: Reference SyncedTech in the aside**

In the "Currently" `<ul>`, replace the `<li>Maintaining SyncedBase + client sites</li>` line with two lines:

```tsx
              <li>Maintaining SyncedBase + client sites</li>
              <li>
                Consulting through{' '}
                <a
                  href="https://syncedtech.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-brand-accent)] hover:underline"
                >
                  SyncedTech ↗
                </a>
              </li>
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`, then `npm run dev`. About section reads cleanly on paper; the Stack/Currently aside has a hairline left border; a SyncedTech ↗ link appears under Currently.
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AboutContact.tsx
git commit -m "redesign: about/contact light polish + SyncedTech link"
```

---

## Task 13: Footer — light + SyncedTech

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add a SyncedTech text link to the footer left side**

Replace the left `<p>` copyright block with a copyright line plus a SyncedTech link:

```tsx
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {year} Joey Fisher. Built with React + Vite.
          </p>
          <a
            href="https://syncedtech.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent-hover)] inline-flex items-center gap-1"
          >
            SyncedTech <span aria-hidden="true">↗</span>
          </a>
        </div>
```

(The icon-button group on the right stays; its tokens now resolve to light. No other change.)

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`, then `npm run dev`. Footer is light with a hairline top border; "SyncedTech ↗" link sits beside the copyright; GitHub/LinkedIn/email icon buttons read on paper.
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "redesign: light footer + SyncedTech link"
```

---

## Task 14: Capture screenshots for new projects

**Files:**
- Create: `public/projects/tt-save-editor/01-home.png`
- Populate: `public/projects/react-annotator/` (best effort)

Use the `webapp-testing` skill (headless Playwright) — works from a phone since capture runs server-side.

- [ ] **Step 1: Capture TT Save Editor from the live site**

Drive headless Chromium to `https://tt-save-editor.vercel.app`, set viewport `1440x900`, wait for load, screenshot to `public/projects/tt-save-editor/01-home.png`. If the landing UI has a distinct editor view, capture a second as `02-editor.png`.

- [ ] **Step 2: Wire the screenshot into the data**

In `src/data/projects.ts`, add an `images` block to the TT Save Editor object (mirror the existing pattern; include only files that exist):

```tsx
    live: 'https://tt-save-editor.vercel.app',
    images: {
      light: ['/projects/tt-save-editor/01-home.png'],
    },
    featured: false,
```

(If a second shot was captured, add `'/projects/tt-save-editor/02-editor.png'` to the array. Note: this is a light-themed app, so use the `light` key.)

- [ ] **Step 3: React Annotator screenshots (best effort)**

The extensions have no hosted page. Check both repos' READMEs for embedded demo images; if a usable image exists in-repo, save it to `public/projects/react-annotator/01-demo.png` and add an `images` block. Otherwise, leave the card image-less — it renders the editorial `PlaceholderArt` monogram, which is acceptable. **Do not fabricate a screenshot.** Log which path was taken.

- [ ] **Step 4: Verify**

Run: `npm run build`, then `npm run dev`. TT Save Editor card shows its real screenshot and the gallery opens it. React Annotator shows either a real demo image or the clean monogram placeholder.
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public/projects/tt-save-editor public/projects/react-annotator src/data/projects.ts
git commit -m "feat: screenshots for TT Save Editor (+ React Annotator if available)"
```

---

## Task 15: Final verification pass

**Files:** none (review only); fix-ups committed if needed.

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: both exit 0.

- [ ] **Step 2: Contrast audit (WCAG AA)**

With `npm run dev` open, spot-check these pairs against AA (4.5:1 normal text, 3:1 large): `--text-primary`, `--text-secondary`, `--text-muted` on `--surface-primary` and on `--surface-raised`; accent text `#1D3A5F` on paper; white-on-accent buttons. If any small-text pair fails, darken the offending token in `src/index.css` (e.g. nudge `--text-muted` toward `#5F5F67`) and re-check.

- [ ] **Step 2b: Capture review screenshots for Joey (on phone)**

Use `webapp-testing` to screenshot the full page at mobile (`390x844`) and desktop (`1440x900`) widths, plus the hero and one project section. Send them so Joey can review the new look from his phone.

- [ ] **Step 3: Keyboard + reduced-motion**

Tab through header → hero CTAs → project cards → lightbox open/close (Esc) → footer. Confirm visible focus rings (accent outline). Toggle OS reduced-motion (or emulate) and confirm reveals/transitions are suppressed.

- [ ] **Step 4: Responsive check**

At `390px`: hero stacks (portrait first), nav collapses to the mobile menu, cards are single-column, no horizontal scroll. At `1440px`: hero is two-column, cards are 3-up.

- [ ] **Step 5: Commit any fix-ups**

```bash
git add -A
git commit -m "redesign: final contrast/responsive/a11y fix-ups"
```

---

## Self-review notes (author)

- **Spec coverage:** identity/type/palette (Tasks 1–2), hero portrait + fallback (Tasks 5–6), three tiers restyled (Task 8), two new projects incl. combined react-annotator (Tasks 7, 9, 14), SyncedTech in header/footer/about/services (Tasks 4, 11, 12, 13), experience timeline (Task 10), lightbox preserved (Task 9), contrast/a11y/responsive (Task 15). All spec sections map to a task.
- **Deferred items honored:** portrait file empty → fallback (Task 5); react-annotator may ship image-less (Task 14); accent tunable (Task 15). All non-blocking.
- **Type consistency:** `githubSecondary` / `githubSecondaryLabel` defined in Task 7, consumed in Task 9. `Portrait` defined Task 5, consumed Task 6. `index` prop added to `ProjectCard` in Task 8 (both call site and signature updated together).
