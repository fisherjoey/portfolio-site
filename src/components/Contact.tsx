"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-[var(--accent)] font-mono text-sm mb-2">
            What&apos;s Next?
          </p>
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto mb-8">
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="mailto:fisherjoey@ymail.com"
              className="px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Mail size={20} />
              Say Hello
            </a>
            <a
              href="/JoeyFisher_Resume.pdf"
              target="_blank"
              className="px-8 py-4 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-lg font-medium transition-colors"
            >
              Download Resume
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-[var(--muted)]">
            <a
              href="https://github.com/fisherjoey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
            >
              <Github size={20} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/fisherjoey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
            >
              <Linkedin size={20} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <span className="hidden sm:inline">Calgary, AB</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center text-[var(--muted)] text-sm">
        <p>
          Built with Next.js & Tailwind CSS
        </p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} Joey Fisher
        </p>
      </div>
    </section>
  );
}
