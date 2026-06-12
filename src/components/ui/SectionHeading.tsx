import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  children: ReactNode
  description?: ReactNode
  className?: string
}

export default function SectionHeading({
  eyebrow,
  children,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      {eyebrow && (
        <p className="label mb-3 text-[var(--color-brand-accent)]">{eyebrow}</p>
      )}
      <h2 className="font-heading text-3xl md:text-5xl font-medium text-[var(--text-primary)] max-w-3xl leading-[1.08]">
        {children}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
