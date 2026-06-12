import { useState } from 'react'

interface PortraitProps {
  src?: string
  alt?: string
  className?: string
}

export default function Portrait({
  src = '/portrait.webp',
  alt = 'Drawn portrait of Joey Fisher',
  className = '',
}: PortraitProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--surface-border-strong)] bg-[var(--surface-feature)] ${className}`}
    >
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-7xl font-medium text-[var(--color-brand-accent)]/45 select-none">
            JF
          </span>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(29,58,95,0.06),transparent_60%)]" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  )
}
