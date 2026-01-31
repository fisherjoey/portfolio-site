"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
    title: "IT Infrastructure Specialist (Internship)",
    company: "Stream Data Systems",
    location: "Calgary, AB",
    period: "May 2024 - Sep 2024",
    description: [
      "Managed IT infrastructure for 10+ client organizations, resolving 838 technical cases with 99.5% uptime",
      "Led critical network outage recovery affecting 50+ users, minimizing downtime through rapid diagnosis",
      "Designed and deployed enterprise monitoring solution using Prometheus/Grafana stack",
      "Executed 5 cloud migrations to Microsoft 365/Azure AD with zero data loss",
      "Created React-based UI component libraries for internal applications",
    ],
    type: "work",
  },
  {
    title: "Field Maintenance Coordinator",
    company: "Calgary Sport and Social Club",
    location: "Calgary, AB",
    period: "Apr 2023 - Aug 2023",
    description: [
      "Maintained over 200 sports fields across Calgary",
      "Developed Python automation script for daily route optimization, saving 20 minutes daily",
      "Planned and documented field maintenance for 45 facilities",
    ],
    type: "work",
  },
  {
    title: "Environmental Monitor (Co-op)",
    company: "Suncor Energy",
    location: "Fort Hills, AB",
    period: "Jan 2022 - Dec 2022",
    description: [
      "Analyzed laboratory data for ground and surface water samples",
      "Utilized SQL databases for environmental reporting and compliance",
      "Automated internal data analysis using Python, saving 30 minutes daily",
    ],
    type: "work",
  },
  {
    title: "BSc Computer Science",
    company: "University of Calgary",
    location: "Calgary, AB",
    period: "Jan 2023 - Dec 2025",
    description: [
      "Graduated December 2025",
      "Accelerated program completion, finishing second-year classes by April 2024",
      "Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Networks",
    ],
    type: "education",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Experience</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mb-8" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--border)]" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? "" : "md:direction-rtl"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--accent)] rounded-full border-4 border-[var(--background)]" />

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:col-start-2"
                    }`}
                  >
                    <div
                      className={`inline-block px-3 py-1 text-xs font-mono rounded mb-2 ${
                        exp.type === "education"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-[var(--accent)]/20 text-[var(--accent)]"
                      }`}
                    >
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-[var(--accent)] mb-2">
                      {exp.company} &bull; {exp.location}
                    </p>
                    <ul
                      className={`text-[var(--muted)] space-y-2 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Empty space for alternating layout */}
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
