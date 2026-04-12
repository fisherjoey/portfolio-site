"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  // Scroll-linked animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smooth spring physics for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms - background moves slower than scroll for depth
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Spring animation config for initial animations
  const springConfig = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
  };

  // Animation variants that respect reduced motion preference
  const fadeInUp = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      };

  const fadeIn = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

  return (
    <section ref={ref} className="min-h-[100svh] flex flex-col justify-center relative overflow-hidden">
      {/* Gradient background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-purple-500/5"
        style={prefersReducedMotion ? {} : { y: backgroundY, scale: backgroundScale }}
      />
      <motion.div
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[var(--accent)]/5 rounded-full blur-3xl"
        style={prefersReducedMotion ? {} : { y: backgroundY }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl"
        style={prefersReducedMotion ? {} : { y: backgroundY }}
      />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 relative z-10">
        <motion.div
          {...fadeInUp}
          transition={springConfig}
        >
          <p className="text-[var(--accent)] font-mono text-sm sm:text-base mb-3 sm:mb-4">
            Hi, my name is
          </p>
        </motion.div>

        {/* Responsive heading with clamp() for smooth scaling */}
        <motion.h1
          {...fadeInUp}
          transition={{ ...springConfig, delay: prefersReducedMotion ? 0 : 0.1 }}
          className="font-bold mb-3 sm:mb-4 text-fluid-hero"
        >
          Joey Fisher
        </motion.h1>

        <motion.h2
          {...fadeInUp}
          transition={{ ...springConfig, delay: prefersReducedMotion ? 0 : 0.15 }}
          className="font-bold text-[var(--muted)] mb-4 sm:mb-6 text-fluid-subtitle"
        >
          Full Stack Developer &amp; IT Contractor
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ ...springConfig, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="text-base sm:text-lg text-[var(--muted)] max-w-xl mb-6 sm:mb-8"
        >
          I build production-ready web applications and provide hands-on IT
          services for businesses in Calgary — evenings and weekends.
        </motion.p>

        {/* CTA Buttons - stack on very small screens */}
        <motion.div
          {...fadeInUp}
          transition={{ ...springConfig, delay: prefersReducedMotion ? 0 : 0.25 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12"
        >
          <a
            href="#portfolio"
            className="px-6 py-3.5 sm:py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-hover)] text-white rounded-xl sm:rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 sm:py-3 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 active:bg-[var(--accent)]/10 rounded-xl sm:rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social links - larger tap targets on mobile */}
        <motion.div
          {...fadeIn}
          transition={{ ...springConfig, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="flex items-center gap-2 sm:gap-6"
        >
          <a
            href="https://github.com/fisherjoey"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-0 text-[var(--muted)] hover:text-[var(--accent)] active:text-[var(--accent)] transition-all duration-200 hover:scale-110 rounded-lg"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/fisherjoey"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-0 text-[var(--muted)] hover:text-[var(--accent)] active:text-[var(--accent)] transition-all duration-200 hover:scale-110 rounded-lg"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:joey@joeyfishertech.com"
            className="p-3 sm:p-0 text-[var(--muted)] hover:text-[var(--accent)] active:text-[var(--accent)] transition-all duration-200 hover:scale-110 rounded-lg"
            aria-label="Send Email"
          >
            <Mail size={24} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on short viewports, respects reduced motion */}
      <motion.div
        {...fadeIn}
        transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 min-h-[600px]:block"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[var(--muted)]" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
