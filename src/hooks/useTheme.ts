"use client";

import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first, then system preference
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
      root.style.setProperty("--card", "#f5f5f5");
      root.style.setProperty("--card-hover", "#e5e5e5");
      root.style.setProperty("--border", "#e5e5e5");
      root.style.setProperty("--muted", "#525252");
    } else {
      root.style.setProperty("--background", "#0a0a0f");
      root.style.setProperty("--foreground", "#e5e5e5");
      root.style.setProperty("--card", "#111117");
      root.style.setProperty("--card-hover", "#1a1a24");
      root.style.setProperty("--border", "#1f1f2e");
      root.style.setProperty("--muted", "#71717a");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, mounted };
}
