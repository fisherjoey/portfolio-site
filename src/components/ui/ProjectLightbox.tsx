import { useEffect, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink, Info, Sparkles } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import type { Project } from '../../data/projects'

interface ProjectLightboxProps {
  project: Project
  onClose: () => void
}

export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const images = project.images?.dark ?? project.images?.light ?? []
  const [index, setIndex] = useState(0)

  const next = useCallback(() => {
    if (images.length === 0) return
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    if (images.length === 0) return
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [next, prev, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        className="relative w-full max-w-5xl max-h-full flex flex-col bg-[var(--surface-raised)] border border-[var(--surface-border)] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 0 && (
          <div className="relative bg-[var(--surface-overlay)] aspect-video">
            <img
              src={images[index]}
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full h-full object-contain"
              loading="eager"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs">
                  {index + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-6 md:p-8 overflow-y-auto">
          {project.demo && (
            <div className="flex items-start gap-2 mb-5 px-3 py-2.5 rounded-md bg-[var(--surface-overlay)] border border-[var(--surface-border)]">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-brand-accent)]" />
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Recreated UI: an illustrative mockup of the interface, not a
                screenshot of live data.
              </p>
            </div>
          )}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <p className="label mb-2 text-[var(--color-brand-accent)]">{project.category}</p>
              <h3 id="lightbox-title" className="font-heading text-2xl md:text-3xl font-semibold text-[var(--text-primary)]">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--surface-border-strong)] text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
              {project.githubSecondary && (
                <a
                  href={project.githubSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-[var(--surface-border-strong)] text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)] hover:border-[var(--color-brand-accent)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  {project.githubSecondaryLabel ?? 'Repo 2'}
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-[var(--color-brand-accent)] text-white hover:bg-[var(--color-brand-accent-hover)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live
                </a>
              )}
            </div>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
            {project.longDescription ?? project.description}
          </p>

          {project.ai && (
            <p className="flex items-start gap-2 text-sm font-mono text-[var(--color-brand-accent)] leading-relaxed mb-4">
              <Sparkles className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span><span className="font-semibold">AI:</span> {project.ai}</span>
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full bg-[var(--surface-overlay)] text-[var(--text-secondary)] border border-[var(--surface-border)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
