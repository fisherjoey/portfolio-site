export interface ProjectImages {
  light: string[];
  dark: string[];
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github?: string;
  live?: string;
  images?: ProjectImages;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "SyncedSport",
    description:
      "AI-powered sports scheduling platform that automates referee assignments for leagues and associations.",
    longDescription:
      "SyncedSport is an AI-powered scheduling platform built for sports leagues and officiating associations. It automates referee assignments using intelligent matching, handles availability management, and streamlines communication between assignors and officials. Currently in active development with launch planned for Q2 2025.",
    tech: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "AI/LLM"],
    live: "https://syncedsport.com",
    images: {
      dark: [
        "/projects/sportsmanager/01-home-dark.png",
        "/projects/sportsmanager/02-features-dark.png",
        "/projects/sportsmanager/03-scheduling-dark.png",
        "/projects/sportsmanager/04-assignors-dark.png",
        "/projects/sportsmanager/05-officials-dark.png",
        "/projects/sportsmanager/06-pricing-dark.png",
        "/projects/sportsmanager/07-analytics-dark.png",
      ],
      light: [
        "/projects/sportsmanager/01-home-light.png",
        "/projects/sportsmanager/02-features-light.png",
        "/projects/sportsmanager/03-scheduling-light.png",
        "/projects/sportsmanager/04-assignors-light.png",
        "/projects/sportsmanager/05-officials-light.png",
        "/projects/sportsmanager/06-pricing-light.png",
        "/projects/sportsmanager/07-analytics-light.png",
      ],
    },
    featured: true,
  },
  {
    title: "CBOA Member Portal",
    description:
      "Production web application serving 200+ members of the Calgary Basketball Officials Association with custom CMS, authentication, and internal communications.",
    longDescription:
      "Built a public-facing static website with a custom database-driven CMS. Features user authentication, internal email sender using MS Graph API, and serves 200+ members actively without issues.",
    tech: ["TypeScript", "React", "Supabase", "Netlify", "MS Graph API"],
    github: "https://github.com/fisherjoey/cboa-site",
    live: "https://cboa.ca",
    images: {
      dark: [
        "/projects/cboa/01-home-dark.png",
        "/projects/cboa/02-dashboard-dark.png",
        "/projects/cboa/03-calendar-dark.png",
        "/projects/cboa/04-resources-dark.png",
        "/projects/cboa/06-news-dark.png",
      ],
      light: [
        "/projects/cboa/01-home-light.png",
        "/projects/cboa/02-dashboard-light.png",
        "/projects/cboa/03-calendar-light.png",
        "/projects/cboa/04-resources-light.png",
        "/projects/cboa/06-news-light.png",
      ],
    },
    featured: true,
  },
  {
    title: "Quest Canada Analytics",
    description:
      "Gap analysis system built for a client project. Sole developer in a team of business students, handling full-stack development.",
    longDescription:
      "Developed for CPSC 405 as the only developer in a group of 5 business students. Built a complete web application using React, Node.js, PostgreSQL, and Apache Superset for data visualization.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Apache Superset"],
    github: "https://github.com/fisherjoey/Quest-Canada-Analytics",
    live: "https://cpsc405.joeyfishertech.com",
    images: {
      dark: [
        "/projects/quest-canada/01-landing-dark.png",
        "/projects/quest-canada/02-dashboards-dark.png",
        "/projects/quest-canada/03-milestones-dark.png",
        "/projects/quest-canada/04-project-dark.png",
      ],
      light: [
        "/projects/quest-canada/01-landing-light.png",
        "/projects/quest-canada/04-dashboards-light.png",
        "/projects/quest-canada/05-analytics-light.png",
        "/projects/quest-canada/03-project-light.png",
      ],
    },
    featured: true,
  },
  {
    title: "ChordApp",
    description:
      "Personal chord library with web scraping, multi-source API integration, and performance tools like transpose, auto-scroll, and setlists.",
    longDescription:
      "A chord library app for musicians that rivals Ultimate Guitar's feature set. Search for any song and automatically import chord sheets and lyrics from multiple sources. Includes transpose, capo support, auto-scroll, metronome, setlist management, and PDF export. Under the hood, I built a custom web scraper that extracts data from different page formats, integrates multiple music APIs, and uses fuzzy matching to deduplicate results.",
    tech: ["TypeScript", "React", "Web Scraping", "Supabase", "REST APIs"],
    live: "https://chords.joeyfishertech.com",
    images: {
      dark: [
        "/projects/chordapp/01-home-dark.png",
        "/projects/chordapp/02-search-dark.png",
        "/projects/chordapp/03-viewer-dark.png",
        "/projects/chordapp/04-setlist-dark.png",
      ],
      light: [
        "/projects/chordapp/01-home-light.png",
        "/projects/chordapp/02-search-light.png",
        "/projects/chordapp/03-viewer-light.png",
        "/projects/chordapp/04-setlist-light.png",
      ],
    },
    featured: true,
  },
  {
    title: "React Annotator",
    description:
      "Browser extensions (Chrome & Firefox) for annotating React components on webpages, designed for use with Claude Code.",
    tech: ["JavaScript", "Chrome Extension", "Firefox Extension", "React"],
    github: "https://github.com/fisherjoey/react-annotator-chrome",
    featured: false,
  },
  {
    title: "CANsense Monitoring",
    description:
      "Enterprise monitoring solution using Prometheus and Grafana with custom exporters for SSL certificates, system metrics, and automated alerting.",
    tech: ["Prometheus", "Grafana", "Python", "Docker"],
    featured: false,
  },
];
