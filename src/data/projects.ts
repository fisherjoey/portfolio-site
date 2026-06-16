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
}

export const projects: Project[] = [
  // ─────────── Production ───────────
  {
    title: 'SyncedSport',
    category: 'production',
    description:
      "League-management platform for sports officiating associations. Custom matching algorithm with an LLM fallback for the edge cases, plus a chatbot that lets coordinators query their data in plain English. Currently in pilot with one live league.",
    longDescription:
      "Sports leagues spend hours every week mapping referees to games. Who's available, who's qualified for the level, who's already booked, who lives close enough. SyncedSport does it in seconds with a custom matching algorithm I designed. An LLM step takes over for the messy edge cases the algorithm can't resolve cleanly. There's also a data chatbot so coordinators can ask plain-English questions of their league data and get a report back instead of building a query. Sole developer end-to-end: schema, REST API, React UI, CI, and deploy. Currently in pilot with one live league.",
    tech: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'AI/LLM'],
    live: 'https://syncedsport.com',
    images: {
      dark: [
        '/projects/sportsmanager/01-home-dark.png',
        '/projects/sportsmanager/02-features-dark.png',
        '/projects/sportsmanager/03-scheduling-dark.png',
        '/projects/sportsmanager/04-assignors-dark.png',
        '/projects/sportsmanager/05-officials-dark.png',
        '/projects/sportsmanager/06-pricing-dark.png',
        '/projects/sportsmanager/07-analytics-dark.png',
      ],
    },
    featured: true,
  },
  {
    title: 'CBOA Member Portal',
    category: 'production',
    description:
      "Live member portal for the Calgary Basketball Officials Association. 200+ active users. Custom CMS, real auth, internal email through Microsoft Graph.",
    longDescription:
      "Public-facing static site backed by a custom database-driven CMS I built from scratch. Real auth, an internal email tool piped through Microsoft Graph, and 200+ active members hitting it without a production incident I've had to firefight.",
    tech: ['TypeScript', 'React', 'Supabase', 'Netlify', 'MS Graph API'],
    live: 'https://cboa.ca',
    images: {
      dark: [
        '/projects/cboa/01-home-dark.png',
        '/projects/cboa/02-dashboard-dark.png',
        '/projects/cboa/03-calendar-dark.png',
        '/projects/cboa/04-resources-dark.png',
        '/projects/cboa/06-news-dark.png',
      ],
    },
    featured: true,
  },
  {
    title: 'OK Tint',
    category: 'production',
    description:
      "Marketing site for an automotive window-tinting business. React + Vite, Sanity CMS, MapLibre for the showroom map.",
    longDescription:
      "Production marketing site for OK Tinting, sitting on top of SyncedBase (the template repo I built so I could ship sites like this in days). Sanity drives the nav, services, pricing, and portfolio. The showroom locator runs on MapLibre. Page routing is dynamic, so the client can spin up new service pages from the CMS without a redeploy.",
    tech: ['React', 'Vite', 'Sanity CMS', 'MapLibre', 'TypeScript'],
    live: 'https://okotokstinting.com',
    images: {
      dark: ['/projects/oktint/01-home.png'],
    },
    featured: true,
  },
  {
    title: 'Small-Business Analytics Dashboard',
    category: 'production',
    description:
      "Internal analytics dashboard for a small-business client. Google Analytics, Supabase, and Claude API in one place, so the operators don't have to log into three apps to know how the week went.",
    longDescription:
      "Next.js analytics dashboard built for a client. Pulls traffic from Google Analytics, leads and bookings from Supabase, and runs the lot through Claude once a week for a plain-English summary. Exists because non-technical operators shouldn't have to spelunk GA reports to know whether the month was good.",
    tech: ['Next.js', 'Supabase', 'Google Analytics', 'Claude API', 'TypeScript'],
    images: {
      light: ['/projects/analytics/cover.svg'],
    },
    demo: true,
    featured: false,
  },

  // ─────────── Professional / Client work ───────────
  {
    title: 'Enterprise Monitoring Platform',
    category: 'professional',
    description:
      "A custom monitoring platform I architected at a previous full-time role. Prometheus and Grafana sit underneath as the data layer; most of the work was the webapp on top.",
    longDescription:
      "Architected during a previous full-time role. Prometheus and Grafana handle the data layer — metrics collection and visualization. The work I'm proud of is the custom webapp built on top: multi-tenant dashboards so each customer organization gets their own view, alert routing wired into on-call rotations so issues page the right engineer instead of everyone, role-based access control, and incident history. Custom Node-based exporters fill in the gaps the standard ones missed (SSL expiry, internal service health, stack-specific metrics). Rolled out to 10+ customer organizations and caught outages they would've otherwise discovered the hard way.",
    tech: ['Node.js', 'Prometheus', 'Grafana', 'Multi-tenant', 'Docker'],
    images: {
      dark: ['/projects/monitoring/stack.svg'],
    },
    imageMode: 'contain',
    featured: false,
  },
  {
    title: 'Quest Canada Analytics',
    category: 'professional',
    description:
      "Gap-analysis platform built for a real client. I was the only developer on a five-person team. The other four were business students.",
    longDescription:
      "Built for CPSC 405, U of C's applied client course. Five-person team: four business students and me, the developer. The deliverable was a working web app: React on the frontend, Node and Postgres on the backend, Apache Superset embedded for the dashboards. Milestones, project tracking, charts.",
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Apache Superset'],
    github: 'https://github.com/fisherjoey/Quest-Canada-Analytics',
    images: {
      dark: [
        '/projects/quest-canada/01-landing-dark.png',
        '/projects/quest-canada/02-dashboards-dark.png',
        '/projects/quest-canada/03-milestones-dark.png',
        '/projects/quest-canada/04-project-dark.png',
      ],
    },
    featured: true,
  },
  {
    title: 'SyncedBase',
    category: 'professional',
    description:
      "Template repo for small-business sites. Spin up a new client site in days instead of weeks.",
    longDescription:
      "I got tired of starting client sites from scratch every time, so I built one base I could fork. React + Vite + Sanity. The interesting parts are the theme system (around 15 palettes and 6 themes that change the visual feel completely) and a section library: hero, pricing, testimonials, portfolio gallery, contact, the usual stuff. Plus content packs for the verticals I work in. OK Tint runs on it.",
    tech: ['React', 'Vite', 'Sanity CMS', 'Tailwind 4', 'TypeScript'],
    images: {
      dark: ['/projects/syncedbase/process.svg'],
    },
    imageMode: 'contain',
    featured: false,
  },

  // ─────────── Personal apps ───────────
  {
    title: 'ChordApp',
    category: 'personal',
    description:
      "Chord library app for musicians. Imports chord sheets from anywhere on the web, plus the on-stage stuff: transpose, auto-scroll, setlists.",
    longDescription:
      "I built ChordApp because Ultimate Guitar's UX wears me out. Search any song and it pulls chord sheets and lyrics from a handful of sources. You get the on-stage features I wanted: transpose, capo, auto-scroll, metronome, setlists, PDF export. The interesting work is under the hood: a scraper that copes with whatever page layout each site decides to use that week, plus fuzzy matching so you don't end up with five copies of the same song.",
    tech: ['TypeScript', 'React', 'Web Scraping', 'Supabase', 'REST APIs'],
    live: 'https://chords.joeyfishertech.com',
    images: {
      dark: [
        '/projects/chordapp/01-home-dark.png',
        '/projects/chordapp/02-search-dark.png',
        '/projects/chordapp/03-viewer-dark.png',
        '/projects/chordapp/04-setlist-dark.png',
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
      "Same app, on a phone. Shares the Supabase backend with the web version so the library stays in sync. Built for using on stage: bigger text, hands-free auto-scroll, setlists cached offline because venue WiFi is a coin flip.",
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    images: {
      light: ['/projects/chordapp-mobile/cover.svg'],
    },
    demo: true,
    featured: false,
  },
  {
    title: 'SyncedTech Portal',
    category: 'personal',
    description:
      "CRM, timesheets, and invoicing for my consultancy. Automates the path from logging hours to collecting payment.",
    longDescription:
      "The internal portal I run SyncedTech on. Tracks clients and projects (CRM), captures hours against them (timesheets), and turns those hours into invoices and payment reminders without me re-keying data between three different apps. Closing the loop from work-done to money-in is the part worth automating.",
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    images: {
      light: ['/projects/syncedtech-portal/cover.svg'],
    },
    demo: true,
    featured: false,
  },
  {
    title: 'F1 Fantasy Edge',
    category: 'personal',
    description:
      "Python research bot and optimizer for F1 fantasy. Scrapes Reddit and YouTube for what people are saying, pulls race data for what happened, then tries to find good team picks under the budget cap.",
    longDescription:
      "Half research bot, half optimizer. The research half scrapes Reddit threads, pulls YouTube transcripts, and grabs race-data feeds. Basically: ingest whatever the F1 community is saying heading into a given Grand Prix, plus the actual stats. The optimizer half models the official Fantasy scoring system and walks the space of legal team configurations under the budget cap, weighted by what the research half surfaced. It exists mostly because constraint optimization is fun when the stakes are this silly.",
    tech: ['Python', 'Web Scraping', 'NLP', 'Optimization', 'Data Analysis'],
    images: {
      dark: ['/projects/f1/logo.svg'],
    },
    imageMode: 'contain',
    featured: false,
  },
  {
    title: 'StremiJoe',
    category: 'personal',
    description:
      "React Native mobile app built on Stremio's architecture, with offline downloads added so I can pull content onto my phone before going somewhere without WiFi.",
    longDescription:
      "Mirrors Stremio's plugin-and-source architecture, but as a React Native mobile app instead of a desktop client. Same model: pluggable content sources feeding a unified library and a single playback layer. The reason this exists separate from Stremio is offline downloads. I can stash episodes on my phone before a flight and watch them on the plane. Runs on Expo, expo-router for navigation, native media playback under the hood.",
    tech: ['React Native', 'Expo', 'TypeScript', 'expo-router', 'Media Playback'],
    images: {
      light: ['/projects/stremijoe/cover.svg'],
    },
    demo: true,
    featured: false,
  },
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
    images: {
      light: ['/projects/react-annotator/cover.svg'],
    },
    demo: true,
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
    images: {
      dark: ['/projects/tt-save-editor/01-home.png'],
    },
    featured: false,
  },
]

export const projectsByCategory = (category: ProjectCategory): Project[] =>
  projects.filter((p) => p.category === category)
