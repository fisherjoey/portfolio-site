"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { springConfigs, fadeInUp, noMotion, staggerConfigs } from "@/lib/animations";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: "work" | "education";
}

const experiences: ExperienceItem[] = [
  {
    title: "Full-Stack Developer",
    company: "Stream Data Systems",
    location: "Calgary, AB",
    period: "Apr 2025 - Present",
    description: [
      "Build full-stack applications with React/TypeScript frontends, .NET/C# backends, and SQL Server databases deployed across dev, test, and production",
      "Own server infrastructure, Azure cloud, and DevOps for 30+ clients across manufacturing, retail, and government sectors",
      "Built CANblog full-stack application end-to-end with complete ownership from database design to IIS deployment",
      "Developed React component library with Storybook, standardizing UI patterns across enterprise applications",
      "Configure CI/CD pipelines and implement Selenium/Playwright end-to-end testing for automated QA",
    ],
    type: "work",
  },
  {
    title: "Environmental Advisor (Co-op)",
    company: "Suncor Energy",
    location: "Fort Hills, AB",
    period: "Jan 2022 - Dec 2022",
    description: [
      "Analyzed environmental laboratory data using SQL databases with zero regulatory non-compliance",
      "Automated data analysis workflows with Python scripting, reducing daily manual processing time by 30 minutes",
      "Trained and onboarded new team members on lab processes, data management systems, and compliance procedures",
    ],
    type: "work",
  },
  {
    title: "BSc Computer Science",
    company: "University of Calgary",
    location: "Calgary, AB",
    period: "2019 - 2025",
    description: [
      "Transferred from Chemistry to Computer Science in January 2023",
      "Chemistry Minor, GPA: 3.75",
      "Coursework: Software Engineering, Database Systems, Algorithms, Networks, HCI",
    ],
    type: "education",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section id="experience" className="py-12 sm:py-20 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}>
          <motion.div
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Experience</h2>
            <motion.div
              className="w-20 h-1 bg-[var(--accent)] mb-8 sm:mb-12"
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ ...springConfigs.snappy, delay: 0.2 }}
            />
          </motion.div>

          {/* Mobile: horizontal scroll cards */}
          <div className="sm:hidden -mx-6 px-6">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollPaddingLeft: "24px" }}>
              {experiences.map((exp) => (
                <div key={`${exp.company}-${exp.period}`} className="flex-shrink-0 snap-start" style={{ width: "85%" }}>
                  <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)] h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-[var(--accent)] flex-shrink-0 ${
                        exp.type === "education" ? "bg-purple-500/10" : "bg-[var(--accent)]/10"
                      }`}>
                        {exp.type === "education" ? (
                          <GraduationCap size={14} className="text-[var(--accent)]" />
                        ) : (
                          <Briefcase size={12} className="text-[var(--accent)]" />
                        )}
                      </div>
                      <div className={`inline-block px-2.5 py-0.5 text-xs font-mono rounded-full ${
                        exp.type === "education"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-[var(--accent)]/20 text-[var(--accent)]"
                      }`}>
                        {exp.period}
                      </div>
                    </div>
                    <h3 className="text-base font-bold mb-1">{exp.title}</h3>
                    <p className="text-[var(--accent)] text-sm mb-3">
                      {exp.company}
                      <span className="text-[var(--muted)]"> · {exp.location}</span>
                    </p>
                    <ul className="text-[var(--muted)] space-y-1.5">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: timeline */}
          <div className="hidden sm:block relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--border)]"
              initial={prefersReducedMotion ? {} : { scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ ...springConfigs.smooth, delay: 0.3 }}
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={prefersReducedMotion ? {} : {
                    opacity: 0,
                    x: index % 2 === 0 ? -30 : 30,
                    y: 20
                  }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    ...springConfigs.gentle,
                    delay: prefersReducedMotion ? 0 : 0.4 + index * staggerConfigs.slow,
                  }}
                  className="relative grid md:grid-cols-2 gap-4 md:gap-8"
                >
                  {/* Timeline dot with icon */}
                  <motion.div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center bg-[var(--background)] border-2 border-[var(--accent)] rounded-full z-10"
                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      ...springConfigs.bouncy,
                      delay: prefersReducedMotion ? 0 : 0.5 + index * staggerConfigs.slow,
                    }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.15 }}
                  >
                    {exp.type === "education" ? (
                      <GraduationCap size={16} className="text-[var(--accent)] w-5 h-5" />
                    ) : (
                      <Briefcase size={14} className="text-[var(--accent)] w-4 h-4" />
                    )}
                  </motion.div>

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:col-start-2"
                    }`}
                  >
                    <motion.div
                      className="p-6 bg-[var(--card)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300"
                      whileHover={prefersReducedMotion ? {} : { y: -4 }}
                      transition={springConfigs.snappy}
                    >
                      {/* Period badge */}
                      <motion.div
                        className={`inline-block px-3 py-1 text-xs font-mono rounded-full mb-3 ${
                          exp.type === "education"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-[var(--accent)]/20 text-[var(--accent)]"
                        }`}
                        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          ...springConfigs.bouncy,
                          delay: prefersReducedMotion ? 0 : 0.6 + index * staggerConfigs.slow,
                        }}
                      >
                        {exp.period}
                      </motion.div>

                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-[var(--accent)] text-base mb-3">
                        {exp.company}
                        <span className="text-[var(--muted)]"> · {exp.location}</span>
                      </p>

                      <ul
                        className={`text-[var(--muted)] space-y-2 ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}
                      >
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-sm leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
