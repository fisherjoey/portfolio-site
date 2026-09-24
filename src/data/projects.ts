export type ProjectCategory = 'production' | 'professional' | 'personal'

export interface ProjectImages {
  light?: string[]
  dark?: string[]
}

export interface Project {
  title: string
  category: ProjectCategory
  description: string
  longDescription?: string
  tech: string[]
  github?: string
  /** Optional second repo link (e.g. a Firefox build alongside a Chrome one). */
  githubSecondary?: string
  /** Label for the secondary repo link. Defaults to "Repo 2". */
  githubSecondaryLabel?: string
  live?: string
  images?: ProjectImages
  featured: boolean
  /**
   * Optional status badge — overrides default presentation.
   * e.g. "Personal use only" for projects not pitched as commercial.
   */
  status?: string
  /**
   * How the cover image fits the card. 'cover' (default) crops to fill;
   * 'contain' letterboxes — for logos / non-screenshot artwork.
   */
  imageMode?: 'cover' | 'contain'
  /**
   * True when the cover art is a recreated/illustrative mockup rather than a
   * real screenshot — used to surface an "Illustrative" badge and a privacy
   * note (e.g. for apps holding client data that can't be shown).
   */
  demo?: boolean
  /**
   * Where the project uses AI / an LLM, in a few words (e.g. "Claude API writes the
   * weekly summary"). Shown as a highlighted line on the card and in the lightbox.
   */
  ai?: string
}

export const projects: Project[] = [
  // ─────────── Production ───────────
  {
    title: 'CBOA Member Portal',
    category: 'production',
    description:
      "Live member portal for the Calgary Basketball Officials Association. 200+ active users. Custom CMS, real auth, and email through Microsoft Graph.",
    longDescription:
      "A static Next.js site on Netlify, backed by a database-driven CMS I built from scratch on Supabase. Members sign in with Supabase Auth, and about 40 Netlify functions handle everything that needs a server, with role checks and rate limiting. Microsoft Graph sends the association's email (announcements, password resets, welcome emails, contact-form mail) and syncs form submissions into an Excel workbook the board already uses. 200+ active members use it without a production incident I've had to firefight.",
    tech: ['TypeScript', 'Next.js', 'Supabase', 'Netlify Functions', 'MS Graph API'],
    live: 'https://cboa.ca',
    images: {
      dark: [
        '/projects/cboa/01-home-dark.webp',
        '/projects/cboa/architecture.svg',
        '/projects/cboa/02-dashboard-dark.webp',
        '/projects/cboa/03-calendar-dark.webp',
        '/projects/cboa/04-resources-dark.webp',
        '/projects/cboa/06-news-dark.webp',
      ],
    },
    featured: true,
  },
  {
    title: 'CMBA Referee Clinic',
    category: 'production',
    description:
      "Online training course for the Calgary Minor Basketball Association's referee program: three clinics, 34 narrated modules, quizzes that unlock the next module, a final exam, and a coordinator dashboard. 217 referees enrolled so far.",
    longDescription:
      "CMBA needed to train a couple hundred new and returning referees without teaching every lesson in a gym, so I built the whole program. There are three clinics (U11 rookie, 2nd year, 3rd and 4th year) with 34 modules of narrated slides. Each module ends in a quiz you have to pass before the next one opens, and the course finishes with a timed final exam drawn from a verified question bank. Inside the lessons, court diagrams animate who covers what, \"you make the call\" questions stop the narration until you commit to an answer, and FIBA training clips sit next to the rule they illustrate. There's also a working score-clock simulator for learning the table console. The rule lookup searches the FIBA rulebook, FIBA's interpretations and CMBA's own modifications, and cites every passage it returns. It's built so Claude Haiku can turn only those cited passages into a short answer, and it shows the passages themselves when the model is off. Access codes enrol each referee in the right clinic, and edge middleware keeps every page, audio file and answer key behind a valid code. Coordinators get a dashboard with per-module progress, quiz answers, reminder emails and CSV export. Every rule in the course traces back to a source document, and anything the sources didn't cover was flagged for a human instead of guessed. I kept it small on purpose: static reveal.js pages, two Python functions and a thin Supabase layer for progress and grading, hosted on Vercel. The screenshots come from a demo account, and learner names in the dashboard are placeholders.",
    tech: ['JavaScript', 'reveal.js', 'Supabase', 'Python', 'Vercel Edge Middleware'],
    ai: 'Rule lookup where Claude Haiku answers only from the passages search found, with citations',
    images: {
      dark: [
        '/projects/cmba-clinic/01-deck-title.webp',
        '/projects/cmba-clinic/architecture.svg',
        '/projects/cmba-clinic/02-hub.webp',
        '/projects/cmba-clinic/03-deck-areas.webp',
        '/projects/cmba-clinic/04-deck-switch.webp',
        '/projects/cmba-clinic/05-deck-reveal.webp',
        '/projects/cmba-clinic/06-deck-check.webp',
        '/projects/cmba-clinic/07-quiz.webp',
        '/projects/cmba-clinic/08-deck-video.webp',
        '/projects/cmba-clinic/09-simulator.webp',
        '/projects/cmba-clinic/10-rules.webp',
        '/projects/cmba-clinic/11-admin-detail.webp',
      ],
    },
    featured: true,
  },
  {
    title: 'Okotoks Tinting Marketing Site',
    category: 'production',
    description:
      "Marketing and quote site for an automotive window-tinting shop in Okotoks. Sanity CMS runs the content, and quote requests go straight into the shop's CRM.",
    longDescription:
      "Production site for Okotoks Tinting. Sanity drives the nav, services, pricing, portfolio and reviews, and pages are routed from the CMS at runtime, so the shop can add a service page without a redeploy. Vercel functions handle the quote form: each request becomes a customer and a job in the shop's Urable CRM, with an email alert through Resend and a conversion event sent to Meta. Google reviews refresh daily, and a MapLibre map shows the showroom. The reusable parts of this build later became SyncedBase, the template I start client sites from.",
    tech: ['React', 'Vite', 'Sanity CMS', 'Vercel Functions', 'TypeScript'],
    live: 'https://okotokstinting.com',
    images: {
      dark: ['/projects/oktint/01-home.webp', '/projects/oktint/architecture.svg'],
    },
    featured: true,
  },
  {
    title: 'Small-Business Analytics Dashboard',
    category: 'production',
    description:
      "Dashboard for a small-business client: CRM revenue, ads, web traffic and social in one login, plus an AI analyst that answers questions from the shop's own numbers.",
    longDescription:
      "Built so non-technical operators don't have to open six apps to know how the month went. It pulls customers and revenue from the Urable CRM (cached in Supabase), traffic and conversions from GA4, and data from Google Ads, Search Console, Instagram, Facebook, TikTok and YouTube. Staff can also draft and publish social posts from it. The AI analyst is a chat: you ask a question in plain English, the app works out which numbers it needs, loads only those, and a language model answers from that data alone. It uses DeepSeek by default and falls back to Claude. API keys entered in settings are stored encrypted.",
    tech: ['Next.js', 'Supabase', 'Claude API', 'DeepSeek', 'TypeScript'],
    ai: "Chat analyst that answers from the shop's own data (DeepSeek, with Claude as the fallback)",
    images: {
      light: ['/projects/analytics/cover.svg', '/projects/analytics/architecture.svg'],
    },
    demo: true,
    featured: false,
  },

  // ─────────── Professional / Client work ───────────
  {
    title: 'Arsenic Drug-Target Finder',
    category: 'professional',
    description:
      "Computational-chemistry tool that scans 3-D protein structures to shortlist cancer proteins an arsenic-based drug could latch onto. Built to support a friend's chemistry master's thesis.",
    longDescription:
      "Arsenic trioxide is already an approved cancer drug. It works by binding a cluster of three sulfur \"anchor points\" on one specific protein. The open question for new therapies is which other cancer proteins share that same three-anchor geometry, and there's no database of it. So this tool computes it directly: it reads 3-D protein structures (from AlphaFold and the Protein Data Bank), measures the distances between candidate sulfur atoms, and ranks the proteins whose geometry looks most \"arsenic-ready.\" It filters out false positives (anchors already locked into other bonds), flags promising metal-binding sites in experimental structures, and writes ready-to-open 3-D viewer scripts so the chemist can check each hit by eye. An optional step sends mutated protein sequences to Meta's ESMFold model to predict their new shape. It runs locally as a Python command-line tool. I built the computational and engineering side; the chemistry direction came from my friend's master's research, and my chemistry minor was just enough to meet them in the middle. The repo stays private while the research is ongoing.",
    tech: ['Python', 'Computational Chemistry', 'AlphaFold / PDB', 'ESMFold', 'ChimeraX'],
    ai: "ESMFold (Meta's protein-folding model) predicts the shape of mutated proteins",
    images: {
      light: ['/projects/arsenic-cys-finder/trithiolate.webp', '/projects/arsenic-cys-finder/architecture.svg'],
    },
    imageMode: 'contain',
    status: 'Research project',
    featured: false,
  },
  {
    title: 'Enterprise Monitoring Platform',
    category: 'professional',
    description:
      "A custom monitoring platform I architected at a previous full-time role. Prometheus and Grafana sit underneath as the data layer; most of the work was the webapp on top.",
    longDescription:
      "Architected during a previous full-time role. Prometheus and Grafana handle the data layer: metrics collection and visualization. The work I'm proud of is the custom webapp built on top: multi-tenant dashboards so each customer organization gets their own view, alert routing wired into on-call rotations so issues page the right engineer instead of everyone, role-based access control, and incident history. Custom Node-based exporters fill in the gaps the standard ones missed (SSL expiry, internal service health, stack-specific metrics). Rolled out to 10+ customer organizations and caught outages they would've otherwise discovered the hard way.",
    tech: ['Node.js', 'Prometheus', 'Grafana', 'Multi-tenant', 'Docker'],
    images: {
      dark: ['/projects/monitoring/stack.svg', '/projects/monitoring/architecture.svg'],
    },
    featured: false,
  },
  {
    title: 'SyncedBase',
    category: 'professional',
    description:
      "Template repo for small-business sites, pulled out of the Okotoks Tinting build. A new client site starts with themes, sections and a CMS already done.",
    longDescription:
      "After building the Okotoks Tinting site I pulled the reusable parts into one base I fork for each client. React + Vite + Sanity. It has 6 themes and 20 colour palettes, 40+ section blocks (hero, pricing, testimonials, gallery, contact and the rest), an automotive content pack, and Vercel functions for the quote form and Google reviews. Client sites pull template updates with a git merge instead of copy-paste.",
    tech: ['React', 'Vite', 'Sanity CMS', 'Tailwind 4', 'TypeScript'],
    images: {
      dark: ['/projects/syncedbase/process.svg', '/projects/syncedbase/architecture.svg'],
    },
    featured: false,
  },

  // ─────────── Personal / side projects ───────────
  {
    title: 'SyncedSport',
    category: 'personal',
    description:
      "Side project: a league-management platform for sports officiating. An optimization solver assigns referees to games, and scheduling, payouts and analytics live in one app.",
    longDescription:
      "Sports leagues spend hours every week mapping referees to games: who's available, who's qualified for the level, who's already booked, who lives close enough. SyncedSport does it in seconds. The matching engine models the week as a min-cost-flow graph and hands the hard cases to a MILP solver (HiGHS) running in a worker thread. Around it sits the rest of the job: game scheduling with CSV import, an assignment center, referee availability and declines, payouts through Stripe Connect, referee earnings, and season analytics. It's a Next.js front end on an Express API, with Cerbos deciding who can see and change what, Postgres and a Redis job queue underneath, and Docker Compose on DigitalOcean. I'm the only developer: schema, API, UI, CI and deploy. I kept AI out of the matching on purpose. The AI piece in progress is a read-only MCP connector, so an assistant like Claude can look up games, referees and coverage without being able to change anything. Screenshots are the product previews from the public site.",
    tech: ['TypeScript', 'Next.js', 'Express', 'PostgreSQL', 'HiGHS (MILP)'],
    ai: 'Read-only MCP connector so Claude can query league data (in testing)',
    live: 'https://syncedsport.com',
    images: {
      dark: [
        '/projects/syncedsport/01-games.webp',
        '/projects/syncedsport/architecture.svg',
        '/projects/syncedsport/02-assignment-center.webp',
        '/projects/syncedsport/03-analytics.webp',
        '/projects/syncedsport/04-payouts.webp',
        '/projects/syncedsport/05-referee-earnings.webp',
      ],
    },
    featured: true,
  },
  {
    title: 'ChordApp',
    category: 'personal',
    description:
      "Chord library app for musicians. Imports chord sheets from Ultimate Guitar and other chord sites, plus the on-stage stuff: transpose, auto-scroll, setlists.",
    longDescription:
      "I built ChordApp because Ultimate Guitar's UX wears me out. Search any song and it pulls chord sheets and lyrics from a handful of sources. You get the on-stage features I wanted: transpose, capo, auto-scroll, metronome, setlists, PDF export. The interesting work is under the hood: a scraper proxy on my home server that fetches the pages, a parser for Ultimate Guitar's layout plus a best-effort one for everything else, and fuzzy matching that merges duplicate search results.",
    tech: ['TypeScript', 'React', 'Web Scraping', 'Supabase', 'PWA'],
    live: 'https://chords.joeyfishertech.com',
    images: {
      dark: [
        '/projects/chordapp/01-home-dark.webp',
        '/projects/chordapp/architecture.svg',
        '/projects/chordapp/02-search-dark.webp',
        '/projects/chordapp/03-viewer-dark.webp',
        '/projects/chordapp/04-setlist-dark.webp',
      ],
    },
    featured: true,
  },
  {
    title: 'ChordApp Mobile',
    category: 'personal',
    description:
      "Expo / React Native version of ChordApp. Same Supabase backend, so what you save on web shows up on your phone.",
    longDescription:
      "The same library on a phone. It shares the Supabase backend with the web version, so everything stays in sync. Built for the stage: bigger text, hands-free auto-scroll, a metronome, and songs cached offline because venue WiFi is a coin flip. It runs through Expo; there's no store build yet, and transpose and the chord editor haven't been ported.",
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    images: {
      light: ['/projects/chordapp-mobile/cover.svg', '/projects/chordapp-mobile/architecture.svg'],
    },
    demo: true,
    featured: false,
  },
  {
    title: 'SyncedTech Portal',
    category: 'personal',
    description:
      "CRM, timesheets and invoicing for my consultancy. A daily job drafts each client's invoice on their billing day and emails it.",
    longDescription:
      "The system I run SyncedTech on. It tracks prospects, clients and projects, captures hours and expenses, handles retainers with prorated billing, and generates proposal and invoice PDFs. A Vercel cron drafts invoices on each client's billing day and sends them automatically for clients set to auto-send. Clients get a read-only portal for their invoices, and an office server reports into an IT monitoring view. Next.js and Supabase, with email over SMTP.",
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Vercel Cron', 'React PDF'],
    images: {
      light: ['/projects/syncedtech-portal/cover.svg', '/projects/syncedtech-portal/architecture.svg'],
    },
    demo: true,
    featured: false,
  },
  {
    title: 'F1 Fantasy Edge',
    category: 'personal',
    description:
      "Agent-run F1 Fantasy manager. Claude Code agents keep prices and results current, read what Reddit, YouTube and betting markets expect, and run a solver to pick the best team under the budget cap.",
    longDescription:
      "F1 Fantasy gives you a fixed budget, a price on every driver and team, and a scoring system with a lot of small rules. This project runs my team for the 2026 season as an agent loop. Two Claude Code cloud routines run on a schedule: one snapshots every price daily, the other books each race's official results on Monday and commits them to the repo. My LifeOS bot reads the race calendar and reminds me before each team lock. On race weekends I run Claude Code skills after practice, qualifying and the race. The agent pulls practice times and results from the F1 data APIs (FastF1, Jolpica, OpenF1) into DuckDB, reads Reddit threads, YouTube transcripts and Polymarket odds, runs the Python models (qualifying pace, race form, pit stops, places gained, Driver of the Day) and a copy of the official scoring, then uses a PuLP solver to propose the best lineup, transfers and chip timing. I approve the moves. I tested the scoring against 2025 results before trusting any of it. It exists mostly because constraint optimization is fun when the stakes are this silly.",
    tech: ['Python', 'Claude Code', 'DuckDB', 'PuLP', 'FastF1 / OpenF1'],
    ai: 'Claude Code agents run the data loop on a schedule and plan each race weekend',
    images: {
      light: ['/projects/f1/how-it-works.svg', '/projects/f1/architecture.svg'],
    },
    featured: false,
  },
  {
    title: 'StremiJoe',
    category: 'personal',
    description:
      "React Native app plus a small self-hosted server for watching my shows, with offline downloads for when there's no WiFi.",
    longDescription:
      "A mobile app for my own shows, built so I can stash episodes on my phone before a flight. The app talks to one server I host (Node, Express and SQLite on my home server), which finds sources through Stremio's Torrentio and Cinemeta addons and resolves them to direct links on Real-Debrid. The phone then downloads straight from Real-Debrid and plays the file with expo-av. Subtitles come from the OpenSubtitles addon.",
    tech: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'SQLite'],
    images: {
      light: ['/projects/stremijoe/cover.svg', '/projects/stremijoe/architecture.svg'],
    },
    demo: true,
    featured: false,
  },
  {
    title: 'React Annotator',
    category: 'personal',
    description:
      'Browser extensions (Chrome + Firefox) for pointing at any React component on a page, annotating it, and handing the exact context to Claude Code.',
    longDescription:
      "Two browser extensions that let me point at a React component on a live page, annotate it, and give Claude Code the exact selection instead of describing it in prose. A page script walks the React fiber tree to find the component under the cursor and its source file. The extension records the component name, file, classes, HTML and a cropped screenshot, keeps notes in local storage, and exports them as Markdown to paste into Claude Code. It makes no network calls. Chrome and Firefox builds.",
    tech: ['JavaScript', 'Browser Extension', 'React Internals', 'Claude Code'],
    ai: 'Packages UI context as Markdown for Claude Code',
    github: 'https://github.com/fisherjoey/react-annotator-chrome',
    githubSecondary: 'https://github.com/fisherjoey/react-annotator-firefox',
    githubSecondaryLabel: 'Firefox',
    images: {
      light: ['/projects/react-annotator/cover.svg', '/projects/react-annotator/architecture.svg'],
    },
    demo: true,
    featured: false,
  },
  {
    title: 'TT Save Editor',
    category: 'personal',
    description:
      "Browser save editor for LEGO Batman: Legacy of the Dark Knight. Fixes the \"created on an updated version\" error and edits progress and unlocks. It runs entirely in the browser, so nothing gets uploaded.",
    longDescription:
      "A fully client-side save editor for LEGO Batman: Legacy of the Dark Knight. Saves are RC4-encrypted (the key was found by @RealDarkCraft), so the editor decrypts the file, parses the Unreal save format, and edits it in the browser without anything leaving your machine. It fixes the common \"created on an updated version\" load error and lets you edit progress and unlocks directly. Every loaded save gets a byte-exact round-trip check, and export is refused if it fails. There's also a single-file offline build.",
    tech: ['TypeScript', 'React', 'Vite', 'Client-side', 'Binary parsing'],
    github: 'https://github.com/fisherjoey/tt-save-editor',
    live: 'https://tt-save-editor.vercel.app',
    images: {
      dark: ['/projects/tt-save-editor/01-home.webp', '/projects/tt-save-editor/architecture.svg'],
    },
    featured: false,
  },
]

export const projectsByCategory = (category: ProjectCategory): Project[] =>
  projects.filter((p) => p.category === category)
