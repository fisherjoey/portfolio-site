import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const GITHUB_URL = 'https://github.com/fisherjoey'
const EMAIL = 'joey.fisherucalgary@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/fisherjoey/'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--surface-border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
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
        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
