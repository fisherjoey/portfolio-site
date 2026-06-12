import { useState, useEffect } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'

const NAV_LINKS = [
  { label: 'Production', href: '#production' },
  { label: 'Professional', href: '#professional' },
  { label: 'Personal', href: '#personal' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
]

const GITHUB_URL = 'https://github.com/fisherjoey'
const EMAIL = 'joey.fisherucalgary@gmail.com'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-brand-black)]/95 backdrop-blur-md border-b border-[var(--surface-border)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-14' : 'h-20'
        }`}
      >
        <a href="#top" className="font-heading text-base font-semibold tracking-tight text-[var(--text-primary)]">
          Joey Fisher
          <span className="text-[var(--color-brand-accent)]">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Send email"
              className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-12 h-12 flex items-center justify-center text-[var(--text-primary)]"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--surface-border)] bg-[var(--color-brand-black)]">
          <nav className="flex flex-col py-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-6 py-3 border-t border-[var(--surface-border)]">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
