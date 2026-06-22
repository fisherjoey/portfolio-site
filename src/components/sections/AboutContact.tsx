import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { Mail, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export default function AboutContact() {
  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-20 border-t border-[var(--surface-border)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="About">
              Full-stack engineer. I like shipping.
            </SectionHeading>
            <div className="space-y-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              <p>
                Most of what I build lives where a database meets an API meets an interface
                someone has to use. I lean toward projects where the technical problem is
                interesting and the human problem is concrete. Sports scheduling. Small businesses
                that need software they can afford. Niche tools my friends and I keep wishing
                existed.
              </p>
              <p>
                TypeScript, React, Next.js, Node, Postgres, Supabase day-to-day. Enough Python
                and Rust to be dangerous. I like clean data models and code that doesn't
                apologize for being plain.
              </p>
              <p>
                Working on something interesting? Hiring, contracting, or want to chat? Send me an
                email.
              </p>
            </div>

            <div id="contact" className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="mailto:joey@joeyfishertech.com" variant="accent">
                <Mail className="w-4 h-4" />
                Email me
              </Button>
              <Button href="/Joey_Fisher_Resume.pdf" external variant="outline">
                <FileText className="w-4 h-4" />
                Résumé
              </Button>
              <Button href="https://github.com/fisherjoey" external variant="outline">
                <GithubIcon className="w-4 h-4" />
                GitHub
              </Button>
              <Button href="https://www.linkedin.com/in/fisherjoey/" external variant="ghost">
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          <aside className="lg:pl-8 lg:border-l lg:border-[var(--surface-border)]">
            <p className="label mb-3 text-[var(--color-brand-accent)]">Stack</p>
            <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
              <li>TypeScript · React · Next.js</li>
              <li>Node.js · Express · Supabase</li>
              <li>PostgreSQL · Sanity CMS</li>
              <li>React Native · Expo</li>
              <li>Python · Rust · Docker</li>
              <li>Tailwind · Vite · Vercel</li>
            </ul>

            <p className="label mt-8 mb-3 text-[var(--color-brand-accent)]">Currently</p>
            <ul className="space-y-1.5 text-sm text-[var(--text-secondary)]">
              <li>Jr. Software Developer @ PBS Systems</li>
              <li>SyncedSport in pilot with one live league</li>
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
              <li>Talking to interesting people</li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  )
}
