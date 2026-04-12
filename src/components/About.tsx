"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { springConfigs, fadeInUp, noMotion, staggerConfigs } from "@/lib/animations";

const infoCards = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["Calgary, Alberta"],
  },
  {
    icon: Briefcase,
    title: "Current Role",
    lines: ["Full-Stack Developer", "Stream Data Systems"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    lines: ["BSc Computer Science", "University of Calgary, 2025"],
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section id="about" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}>
          {/* Section header */}
          <motion.div
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">About Me</h2>
            <motion.div
              className="w-20 h-1 bg-[var(--accent)] mb-6 sm:mb-8"
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ ...springConfigs.snappy, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Main content - staggered paragraphs */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {[
                "I'm a Full-Stack Developer at Stream Data Systems, where I build production web applications using React, TypeScript, .NET/C#, and SQL Server. I own projects end-to-end—from database design to deployment—and manage infrastructure for 30+ clients across manufacturing, retail, and government.",
                "My path to software wasn't linear. I started in Chemistry at the University of Calgary, did a year of environmental data analysis at Suncor, and discovered I was more excited about the Python scripts than the lab work. I switched to Computer Science in 2023 and haven't looked back.",
                "Outside of my day job, I take on IT contract work evenings and weekends—networking, server setup, virtualization, and general infrastructure for small businesses in the Calgary area.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className="text-[var(--muted)] leading-relaxed text-sm sm:text-base"
                  initial={variants.initial}
                  animate={isInView ? variants.animate : {}}
                  transition={{
                    ...springConfigs.gentle,
                    delay: prefersReducedMotion ? 0 : 0.1 + index * staggerConfigs.normal,
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Info cards - staggered */}
            <div className="space-y-4 sm:space-y-5">
              {infoCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  className="flex items-start gap-3 sm:gap-4"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    ...springConfigs.gentle,
                    delay: prefersReducedMotion ? 0 : 0.3 + index * staggerConfigs.normal,
                  }}
                >
                  <motion.div
                    className="p-2.5 sm:p-3 bg-[var(--card)] rounded-lg flex-shrink-0"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    transition={springConfigs.snappy}
                  >
                    <card.icon className="text-[var(--accent)]" size={18} />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm sm:text-base">{card.title}</h3>
                    {card.lines.map((line, i) => (
                      <p key={i} className="text-[var(--muted)] text-xs sm:text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
