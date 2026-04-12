"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Sun, Moon, FileText, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Drawer } from "vaul";
import Image from "next/image";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation click - close drawer and scroll
  const handleNavClick = (href: string) => {
    setIsDrawerOpen(false);
    // Small delay to let drawer close animation start
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo-icon.svg"
              alt="Joey Fisher"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <span className="text-xl font-bold tracking-tight">JF</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <a
              href="/JoeyFisher_Resume.pdf"
              target="_blank"
              className="text-sm px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-lg transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-[var(--muted)] hover:text-[var(--foreground)] active:bg-[var(--card)] rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            </button>

            {/* Vaul Drawer for Mobile */}
            <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <Drawer.Trigger asChild>
                <button
                  className="p-2.5 text-[var(--foreground)] active:bg-[var(--card)] rounded-lg transition-colors"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
              </Drawer.Trigger>

              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 outline-none">
                  <div className="bg-[var(--card)] rounded-t-2xl">
                    {/* Drag handle */}
                    <div className="flex justify-center pt-4 pb-2">
                      <div className="w-12 h-1.5 bg-[var(--border)] rounded-full" />
                    </div>

                    {/* Navigation items */}
                    <nav className="px-6 pb-8">
                      <div className="space-y-1">
                        {navItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleNavClick(item.href)}
                            className="w-full flex items-center gap-3 py-4 text-lg text-[var(--foreground)] hover:text-[var(--accent)] active:bg-[var(--background)] rounded-xl px-4 -mx-4 transition-colors text-left"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>

                      {/* Resume button */}
                      <div className="mt-6 pt-6 border-t border-[var(--border)]">
                        <a
                          href="/JoeyFisher_Resume.pdf"
                          target="_blank"
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-hover)] text-white rounded-xl font-medium transition-colors"
                        >
                          <FileText size={18} />
                          View Resume
                          <ExternalLink size={14} />
                        </a>
                      </div>

                      {/* Safe area padding for devices with home indicator */}
                      <div className="h-safe-area-inset-bottom" />
                    </nav>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
