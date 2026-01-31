"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mb-8" />

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-4">
              <p className="text-[var(--muted)] leading-relaxed">
                I&apos;m a Computer Science graduate from the University of Calgary with a passion
                for building software that solves real problems. My journey into tech started
                with a background in Chemistry, where I developed strong analytical skills
                before transitioning to pursue my true passion in software development.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                During my IT Infrastructure internship at Stream Data Systems, I managed
                infrastructure for 10+ client organizations and resolved over 800 technical
                cases. This experience taught me the importance of building reliable,
                scalable systems and gave me hands-on experience with cloud technologies,
                DevOps practices, and full-stack development.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                Today, I focus on building production-ready web applications using modern
                technologies like React, TypeScript, and Node.js. I&apos;m particularly interested
                in creating tools that help organizations operate more efficiently.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--card)] rounded-lg">
                  <MapPin className="text-[var(--accent)]" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-[var(--muted)] text-sm">Calgary, Alberta</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--card)] rounded-lg">
                  <GraduationCap className="text-[var(--accent)]" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Education</h3>
                  <p className="text-[var(--muted)] text-sm">BSc Computer Science</p>
                  <p className="text-[var(--muted)] text-sm">University of Calgary, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--card)] rounded-lg">
                  <Briefcase className="text-[var(--accent)]" size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Focus</h3>
                  <p className="text-[var(--muted)] text-sm">Full Stack Development</p>
                  <p className="text-[var(--muted)] text-sm">Cloud Infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
