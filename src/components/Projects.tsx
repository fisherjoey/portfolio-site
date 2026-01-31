"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink, Maximize2 } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { ImageGallery } from "./ImageGallery";
import { DraggableScroll } from "./DraggableScroll";
import { useTheme } from "@/context/ThemeContext";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<Record<string, number>>({});
  const { theme } = useTheme();

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
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
          <div className="w-20 h-1 bg-[var(--accent)] mb-8" />

          {/* Featured Projects */}
          <div className="space-y-16 mb-16">
            {featuredProjects.map((project, index) => {
              const images = getImages(project);
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:direction-rtl" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    {images.length > 0 ? (
                      <div className="space-y-3">
                        {/* Main image */}
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--border)] group">
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
                          {/* Fullscreen button */}
                          <button
                            onClick={() => openGallery(project, getSelectedIndex(project.title))}
                            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            title="View fullscreen"
                          >
                            <Maximize2 size={18} />
                          </button>
                          {/* Image counter */}
                          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded font-mono">
                            {getSelectedIndex(project.title) + 1} / {images.length}
                          </div>
                        </div>
                        {/* Thumbnail strip */}
                        {images.length > 1 && (
                          <DraggableScroll className="flex gap-2 pb-2">
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
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-[var(--border)]">
                        <span className="text-[var(--muted)] font-mono text-sm">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={`${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                    <p className="text-[var(--accent)] font-mono text-sm mb-2">
                      Featured Project
                    </p>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] mb-4">
                      <p className="text-[var(--muted)]">
                        {project.longDescription || project.description}
                      </p>
                    </div>
                    <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-[var(--background)] rounded text-[var(--muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={`flex gap-3 flex-wrap ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <ExternalLink size={16} />
                          View Live
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] rounded-lg text-sm font-medium transition-colors"
                        >
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

          {/* Other Projects */}
          <h3 className="text-xl font-bold mb-6">Other Notable Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group p-6 bg-[var(--card)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[var(--background)] rounded-lg">
                    <svg
                      className="text-[var(--accent)]"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-[var(--muted)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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
