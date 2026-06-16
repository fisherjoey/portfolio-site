import Container from '../ui/Container'
import Button from '../ui/Button'
import { ArrowUpRight } from 'lucide-react'

const services = [
  'Custom web apps',
  'Internal tools',
  'Ongoing maintenance',
  'Site fixes & migrations',
  'IT & cloud consulting',
]

export default function ServicesCTA() {
  return (
    <section id="services" className="py-16 md:py-20 scroll-mt-20">
      <Container>
        <div className="relative overflow-hidden rounded-lg border border-[var(--surface-border)] bg-[var(--surface-feature)] p-8 md:p-12">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_20%,rgba(29,58,95,0.06),transparent_55%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-end">
            <div>
              <p className="label text-[var(--color-brand-accent)] mb-3">IT Services</p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--text-primary)] max-w-2xl">
                Looking for IT or dev services? I run SyncedTech.
              </h2>
              <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                I take on consulting, custom builds, and ongoing maintenance work through
                SyncedTech. If you're sizing up a project, head over and get in touch.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {services.map((s) => (
                  <li
                    key={s}
                    className="px-3 py-1.5 text-xs font-mono rounded-full border border-[var(--surface-border-strong)] bg-[var(--surface-raised)] text-[var(--text-secondary)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pb-1">
              <Button href="https://syncedtech.ca" external variant="accent">
                Visit SyncedTech
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
