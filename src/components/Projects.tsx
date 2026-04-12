"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, Maximize2 } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { ImageGallery } from "./ImageGallery";
import { DraggableScroll } from "./DraggableScroll";
import { useTheme } from "@/context/ThemeContext";
import { springConfigs, fadeInUp, noMotion, staggerConfigs } from "@/lib/animations";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<Record<string, number>>({});
  const [mobileActiveProject, setMobileActiveProject] = useState(0);
  const { theme } = useTheme();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  const getImages = (project: Project): string[] => {
    if (!project.images) return [];
    return theme === "dark" ? project.images.dark : project.images.light;
  };

  const getSelectedIndex = (projectTitle: string) => selectedIndices[projectTitle] || 0;

  const setSelectedIndex = (projectTitle: string, index: number) => {
    setSelectedIndices((prev) => ({ ...prev, [projectTitle]: index }));
  };

  const openGallery = (project: Project, index = 0) => {
    setActiveImages(getImages(project));
    setInitialImageIndex(index);
    setGalleryOpen(true);
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-12 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}>
          <motion.div
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Projects</h2>
            <motion.div
              className="w-20 h-1 bg-[var(--accent)] mb-8"
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ ...springConfigs.snappy, delay: 0.2 }}
            />
          </motion.div>

          {/* ===== MOBILE: Project Selector ===== */}
          <div className="sm:hidden">
            {/* Project name pills — scrollable row */}
            <div className="-mx-6 px-6 mb-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {[...featuredProjects, ...otherProjects].map((project, index) => (
                  <button
                    key={project.title}
                    onClick={() => setMobileActiveProject(index)}
                    className={`flex-shrink-0 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      mobileActiveProject === index
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]"
                    }`}
                  >
                    {project.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active project card */}
            <AnimatePresence mode="wait">
              {(() => {
                const allProjects = [...featuredProjects, ...otherProjects];
                const project = allProjects[mobileActiveProject];
                const images = getImages(project);
                return (
                  <motion.div
                    key={project.title}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden"
                  >
                    {/* Image */}
                    {images.length > 0 ? (
                      <button
                        onClick={() => openGallery(project, 0)}
                        className="relative w-full aspect-video"
                        aria-label={`View ${project.title} gallery`}
                      >
                        <img
                          src={images[0]}
                          alt={`${project.title} screenshot`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg">
                          <Maximize2 size={12} />
                        </div>
                        {images.length > 1 && (
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded font-mono">
                            {images.length} images
                          </div>
                        )}
                      </button>
                    ) : (
                      <div className="aspect-[2/1] bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 flex items-center justify-center">
                        <span className="text-[var(--muted)] font-mono text-sm">{project.title}</span>
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-4">
                      {project.featured && (
                        <p className="text-[var(--accent)] font-mono text-xs mb-1">Featured Project</p>
                      )}
                      <h3 className="text-base font-bold mb-2">{project.title}</h3>
                      <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-[var(--background)] rounded text-[var(--muted)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-xs font-medium transition-colors">
                            <ExternalLink size={13} />
                            Live
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] rounded-lg text-xs font-medium transition-colors">
                            <Github size={13} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* ===== DESKTOP: Featured Projects (original layout) ===== */}
          <div className="hidden sm:block space-y-16 mb-16">
            {featuredProjects.map((project, index) => {
              const images = getImages(project);
              return (
                <motion.div
                  key={project.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    ...springConfigs.gentle,
                    delay: prefersReducedMotion ? 0 : index * staggerConfigs.slow,
                  }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={`min-w-0 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    {images.length > 0 ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => openGallery(project, getSelectedIndex(project.title))}
                          className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--border)] group cursor-pointer text-left"
                          aria-label={`View ${project.title} gallery`}
                        >
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={`${theme}-${images[getSelectedIndex(project.title)]}`}
                              src={images[getSelectedIndex(project.title)]}
                              alt={`${project.title} screenshot`}
                              className="w-full h-full object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </AnimatePresence>
                          <div className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-lg flex items-center gap-1.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 size={14} />
                            <span>View</span>
                          </div>
                          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 text-white text-xs rounded font-mono">
                            {getSelectedIndex(project.title) + 1} / {images.length}
                          </div>
                        </button>
                        {images.length > 1 && (
                          <div className="w-full overflow-hidden">
                            <DraggableScroll className="gap-2 pb-2">
                              {images.map((img, imgIndex) => (
                                <button
                                  key={img}
                                  onClick={() => setSelectedIndex(project.title, imgIndex)}
                                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                                    imgIndex === getSelectedIndex(project.title)
                                      ? "border-[var(--accent)] opacity-100"
                                      : "border-[var(--border)] opacity-60 hover:opacity-100"
                                  }`}
                                >
                                  <img
                                    src={img}
                                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                                    className="w-full h-full object-cover pointer-events-none"
                                    draggable={false}
                                  />
                                </button>
                              ))}
                            </DraggableScroll>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-[var(--border)]">
                        <span className="text-[var(--muted)] font-mono text-sm">{project.title}</span>
                      </div>
                    )}
                  </div>

                  <div className={`min-w-0 ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                    <p className="text-[var(--accent)] font-mono text-sm mb-2">Featured Project</p>
                    <h3 className="text-2xl font-bold mb-4 break-words">{project.title}</h3>
                    <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] mb-4 overflow-hidden">
                      <p className="text-[var(--muted)] text-base break-words">
                        {project.longDescription || project.description}
                      </p>
                    </div>
                    <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-mono bg-[var(--background)] rounded text-[var(--muted)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={`flex gap-3 flex-wrap ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-medium transition-colors">
                          <ExternalLink size={16} />
                          View Live
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] rounded-lg text-sm font-medium transition-colors">
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ===== DESKTOP: Other Projects ===== */}
          <div className="hidden sm:block">
            <motion.h3
              className="text-xl font-bold mb-6"
              initial={variants.initial}
              animate={isInView ? variants.animate : {}}
              transition={{ ...springConfigs.gentle, delay: 0.2 }}
            >
              Other Notable Projects
            </motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    ...springConfigs.gentle,
                    delay: prefersReducedMotion ? 0 : 0.3 + index * staggerConfigs.fast,
                  }}
                  whileHover={prefersReducedMotion ? {} : { y: -6 }}
                  className="group p-6 bg-[var(--card)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-[var(--background)] rounded-lg">
                      <svg className="text-[var(--accent)]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">{project.title}</h4>
                  <p className="text-sm text-[var(--muted)] mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs font-mono text-[var(--muted)]">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      {activeImages.length > 0 && (
        <ImageGallery
          images={activeImages}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          initialIndex={initialImageIndex}
        />
      )}
    </section>
  );
}
