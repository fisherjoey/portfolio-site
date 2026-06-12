import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
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
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
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

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cover = project.images?.dark?.[0] ?? project.images?.light?.[0]
  const hasImages = (project.images?.dark?.length ?? project.images?.light?.length ?? 0) > 0
  const isContain = project.imageMode === 'contain'

  return (
    <article className="group relative flex flex-col bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-lg overflow-hidden hover:border-[var(--color-brand-accent)]/50 transition-colors">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        className="relative aspect-[16/10] block w-full overflow-hidden bg-[var(--surface-overlay)] cursor-pointer text-left"
      >
        {cover ? (
          <img
            src={cover}
            alt={`${project.title} preview`}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              isContain ? 'object-contain p-10 sm:p-12' : 'object-cover'
            }`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <PlaceholderArt title={project.title} />
        )}
        {!isContain && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
        )}
        {project.status ? (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs font-medium border border-white/15 backdrop-blur-sm">
            {project.status}
          </span>
        ) : project.featured ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-brand-accent)] text-white text-xs font-medium shadow-md shadow-black/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Featured
          </span>
        ) : null}
      </button>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded-full bg-[var(--surface-overlay)] text-[var(--text-muted)] border border-[var(--surface-border)]"
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
            className="ml-auto text-xs text-[var(--color-brand-accent)] hover:underline"
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
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--surface-overlay)] via-[var(--surface-feature)] to-[var(--surface-raised)] relative">
      <span className="font-heading text-7xl font-bold text-[var(--color-brand-accent)]/40">
        {initial}
      </span>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(90,107,154,0.15),transparent_50%)]" />
    </div>
  )
}
