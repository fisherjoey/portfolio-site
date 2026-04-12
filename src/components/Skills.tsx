"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { springConfigs, fadeInUp, noMotion, staggerConfigs } from "@/lib/animations";

// Skill data with icon URLs (using devicon CDN)
const allSkills = [
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invert: true },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
];

const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C/C++", "SQL"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS"],
    gradient: "from-purple-500 to-pink-400",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", ".NET", "REST APIs", "PostgreSQL", "MongoDB"],
    gradient: "from-green-500 to-emerald-400",
  },
  {
    title: "DevOps & Cloud",
    skills: ["Vercel", "Supabase", "Docker", "Azure", "CI/CD", "Git"],
    gradient: "from-orange-500 to-amber-400",
  },
  {
    title: "Infrastructure",
    skills: ["Linux", "Proxmox", "Windows Server", "Active Directory", "VMware", "Networking"],
    gradient: "from-red-500 to-rose-400",
  },
];

function LogoMarquee({ direction = "left", speed = 30 }: { direction?: "left" | "right"; speed?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const items = [...allSkills, ...allSkills];

  return (
    <div className="relative overflow-hidden py-3">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 sm:gap-6 items-center"
        animate={prefersReducedMotion ? {} : {
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {items.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--card)] rounded-full border border-[var(--border)] flex-shrink-0"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            transition={springConfigs.snappy}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${skill.invert ? "dark:invert" : ""}`}
              loading="lazy"
            />
            <span className="text-xs sm:text-sm text-[var(--foreground)] whitespace-nowrap">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function CategoryCard({
  category,
  index,
  isInView,
}: {
  category: (typeof skillCategories)[0];
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        ...springConfigs.gentle,
        delay: prefersReducedMotion ? 0 : index * staggerConfigs.fast,
      }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="group relative"
    >
      <div className="p-4 sm:p-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 h-full">
        <motion.div
          className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${category.gradient} rounded-full`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={springConfigs.snappy}
        />

        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.5 }}
            transition={springConfigs.bouncy}
          />
          <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)]">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                ...springConfigs.bouncy,
                delay: prefersReducedMotion ? 0 : index * staggerConfigs.fast + skillIndex * 0.02,
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-[var(--background)] rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section id="skills" className="py-12 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}>
          <motion.div
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Skills & Technologies</h2>
            <motion.div
              className="w-20 h-1 bg-[var(--accent)] mb-6 sm:mb-8"
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ ...springConfigs.snappy, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-6 sm:mb-10 -mx-6 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LogoMarquee direction="left" speed={80} />
          <LogoMarquee direction="right" speed={70} />
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="sm:hidden -mx-6 px-6">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollPaddingLeft: "24px" }}>
            {skillCategories.map((category, index) => (
              <div key={category.title} className="flex-shrink-0 snap-start" style={{ width: "75%" }}>
                <CategoryCard category={category} index={index} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
