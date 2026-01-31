"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C/C++", "SQL", "PowerShell"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", ".NET", "RESTful APIs", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Azure", "Microsoft 365", "Prometheus", "Grafana", "CI/CD", "Git"],
  },
  {
    title: "Infrastructure",
    skills: ["Linux", "Windows Server", "VMware", "Active Directory", "pfSense", "Cisco"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mb-8" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="p-6 bg-[var(--card)] rounded-xl border border-[var(--border)]"
              >
                <h3 className="text-lg font-semibold mb-4 text-[var(--accent)]">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-[var(--background)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
