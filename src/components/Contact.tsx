"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { springConfigs, fadeInUp, noMotion, staggerConfigs } from "@/lib/animations";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section id="contact" className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} className="text-center">
          <motion.p
            className="text-[var(--accent)] font-mono text-sm mb-2"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            What&apos;s Next?
          </motion.p>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : 0.1 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-[var(--muted)] max-w-xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : 0.15 }}
          >
            Whether you need a developer for your next project, IT help for
            your business, or just want to say hi — my inbox is always open.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            <motion.a
              href="mailto:joey@joeyfishertech.com"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-hover)] text-white rounded-xl sm:rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={springConfigs.snappy}
            >
              <Mail size={20} />
              Say Hello
            </motion.a>
            <motion.a
              href="/JoeyFisher_Resume.pdf"
              target="_blank"
              className="px-6 sm:px-8 py-3.5 sm:py-4 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 active:bg-[var(--accent)]/10 rounded-xl sm:rounded-lg font-medium transition-all text-center"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={springConfigs.snappy}
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-8 text-[var(--muted)]"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : 0.25 }}
          >
            {[
              { href: "https://github.com/fisherjoey", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/fisherjoey", icon: Linkedin, label: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 sm:p-0 hover:text-[var(--accent)] active:text-[var(--accent)] transition-colors"
                aria-label={social.label}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                transition={springConfigs.snappy}
              >
                <social.icon size={20} />
                <span className="hidden sm:inline text-sm">{social.label}</span>
              </motion.a>
            ))}
            <div className="flex items-center gap-2 p-2 sm:p-0" aria-label="Location">
              <MapPin size={20} />
              <span className="hidden sm:inline text-sm">Calgary, AB</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-16 sm:mt-24 text-center text-[var(--muted)] text-xs sm:text-sm px-6"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>Built with Next.js & Tailwind CSS</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Joey Fisher</p>
      </motion.div>
    </section>
  );
}
