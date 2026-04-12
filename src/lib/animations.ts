// Shared animation configurations for consistent, high-quality transitions

// Spring configs for different use cases
export const springConfigs = {
  // Snappy, responsive feel for UI elements
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },
  // Smooth, gentle for content reveals
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
  },
  // Bouncy, playful for emphasis
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
  },
  // Very smooth for large movements
  smooth: {
    type: "spring" as const,
    stiffness: 50,
    damping: 20,
  },
};

// Scroll-linked spring config (for useSpring with scroll progress)
export const scrollSpringConfig = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};

// Stagger configurations
export const staggerConfigs = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

// Empty variants for reduced motion
export const noMotion = {
  initial: {},
  animate: {},
};

// Helper to get motion-safe variants
export function getMotionVariants(
  variants: { initial: object; animate: object },
  prefersReducedMotion: boolean | null
) {
  return prefersReducedMotion ? noMotion : variants;
}
