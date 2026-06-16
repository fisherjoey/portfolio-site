import { useState } from 'react'
import { ExternalLink, Info } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import type { Project } from '../../data/projects'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ProjectLightbox from '../ui/ProjectLightbox'

interface ProjectGridProps {
  id: string
  eyebrow: string
  heading: string
  description?: string
  projects: Project[]
}

export default function ProjectGrid({
  id,
  eyebrow,
  heading,
  description,
  projects,
}: ProjectGridProps) {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  if (projects.length === 0) return null

  return (
    <section id={id} className="py-16 md:py-24 scroll-mt-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} description={description}>
          {heading}
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>
      </Container>

      {openProject && (
        <ProjectLightbox project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  )
}

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
        {project.demo ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--surface-raised)]/90 text-[var(--text-secondary)] text-xs font-mono border border-[var(--surface-border-strong)] backdrop-blur-sm">
            <Info className="w-3 h-3" />
            Illustrative
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
            aria-label={hasImages ? `View gallery for ${project.title}` : `Details for ${project.title}`}
            className="ml-auto text-xs font-mono text-[var(--color-brand-accent)] hover:underline"
          >
            {hasImages ? 'View gallery' : 'Details'} →
          </button>
        </div>
      </div>
    </article>
  )
}

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
