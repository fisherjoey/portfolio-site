import Container from '../ui/Container'
import Button from '../ui/Button'
import { Mail, ArrowDown } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(90,107,154,0.12),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(160,135,88,0.06),transparent_45%)]" />
      <Container className="relative">
        <p className="label text-[var(--color-brand-accent)] mb-5">
          Software developer · Calgary, AB
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--text-primary)] max-w-4xl leading-[1.05]">
          I keep building the features{' '}
          <span className="text-[var(--color-brand-accent)]">other apps leave out</span>.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Full-stack TypeScript and React. Heads-down on SyncedSport right now (AI scheduling for
          sports officials), with a few client sites running on the side and a folder of personal
          apps that keeps growing.
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
      </Container>
    </section>
  )
}
