import type { ReactNode } from 'react'

type ButtonVariant = 'accent' | 'outline' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  ariaLabel?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  accent:
    'bg-[var(--color-brand-accent)] text-white border border-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] hover:border-[var(--color-brand-accent-hover)]',
  outline:
    'border border-[var(--surface-border-strong)] text-[var(--text-primary)] hover:border-[var(--color-brand-accent)] hover:text-[var(--color-brand-accent)]',
  ghost:
    'text-[var(--text-secondary)] hover:text-[var(--color-brand-accent)]',
}

const baseStyles =
  'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer rounded-[var(--radius-button)]'

export default function Button({
  children,
  variant = 'accent',
  href,
  external,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={styles}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={styles} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
