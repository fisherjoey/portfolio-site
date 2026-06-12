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
