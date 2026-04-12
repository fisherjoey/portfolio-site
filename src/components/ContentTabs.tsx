"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Code2, Wrench } from "lucide-react";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Services, ITSkills } from "./Services";
import { Experience } from "./Experience";

const tabs = [
  { id: "dev", label: "Developer", icon: Code2 },
  { id: "it", label: "IT Services", icon: Wrench },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContentTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("dev");
  const prefersReducedMotion = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);

  const switchTab = (id: TabId) => {
    if (id === activeTab) return;
    setActiveTab(id);
  };

  // Scroll tab bar into view when switching on mobile
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < 0 || rect.top > window.innerHeight * 0.3) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeTab]);

  return (
    <div id="portfolio">
      {/* Sticky tab bar */}
      <div
        ref={tabsRef}
        className="sticky top-[64px] z-30 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)] scroll-mt-[64px]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 py-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-lg -z-10"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 30 }
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "dev" ? (
          <motion.div
            key="dev"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Skills />
            <Projects />
            <Experience />
          </motion.div>
        ) : (
          <motion.div
            key="it"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Services />
            <ITSkills />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
