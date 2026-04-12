"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import {
  Network,
  Server,
  Monitor,
  Shield,
  HardDrive,
  Clock,
  Mail,
  Wrench,
} from "lucide-react";
import { springConfigs, fadeInUp, noMotion, staggerConfigs } from "@/lib/animations";

const services = [
  {
    icon: Network,
    title: "Networking",
    description:
      "Router and switch configuration, Wi-Fi setup, VLANs, firewall rules, and troubleshooting connectivity issues for homes and small businesses.",
  },
  {
    icon: Server,
    title: "Server Setup",
    description:
      "Windows Server and Linux deployment, Active Directory, DNS, DHCP, file shares, and group policy configuration.",
  },
  {
    icon: HardDrive,
    title: "Virtualization",
    description:
      "Proxmox, VMware, and Hyper-V environments — spin up VMs, manage storage, and consolidate workloads on existing hardware.",
  },
  {
    icon: Monitor,
    title: "Workstation Setup",
    description:
      "New PC builds and deployments, OS imaging, driver configuration, domain joins, and software provisioning for teams or individuals.",
  },
  {
    icon: Shield,
    title: "Domain Management",
    description:
      "DNS records, domain transfers, email routing (MX, SPF, DKIM), SSL certificates, and keeping your online presence running smoothly.",
  },
  {
    icon: Wrench,
    title: "General IT Support",
    description:
      "Troubleshooting, data migration, backup solutions, software installation, and whatever else needs fixing — no job too small.",
  },
];

function MobileCarousel({ isInView }: { isInView: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // If scrolled near the end, snap to last index
    if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 20) {
      setActiveIndex(services.length - 1);
      return;
    }
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.82 + 12; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, services.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.82 + 12;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : 0.15 }}
    >
      {/* Scrollable card strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 pb-4"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="flex-shrink-0 snap-start"
            style={{ width: "82%" }}
          >
            <div className="p-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 flex items-center justify-center bg-[var(--accent)]/10 rounded-xl flex-shrink-0">
                  <service.icon size={18} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-base font-semibold">{service.title}</h3>
              </div>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to service ${index + 1}`}
            className="p-1"
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 h-1.5 bg-[var(--accent)]"
                  : "w-1.5 h-1.5 bg-[var(--border)]"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function DesktopGrid({ isInView }: { isInView: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={
            prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }
          }
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            ...springConfigs.gentle,
            delay: prefersReducedMotion
              ? 0
              : 0.15 + index * staggerConfigs.fast,
          }}
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          className="group"
        >
          <div className="p-5 sm:p-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 h-full">
            <motion.div
              className="w-10 h-10 flex items-center justify-center bg-[var(--accent)]/10 rounded-xl mb-4"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              transition={springConfigs.snappy}
            >
              <service.icon size={20} className="text-[var(--accent)]" />
            </motion.div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const itSkills = [
  { category: "Operating Systems", items: ["Windows Server", "Linux (Ubuntu, Debian)", "Windows 10/11"] },
  { category: "Virtualization", items: ["Proxmox", "VMware ESXi", "Hyper-V"] },
  { category: "Networking", items: ["VLANs", "Firewalls", "DNS/DHCP", "Wi-Fi", "TCP/IP"] },
  { category: "Directory & Identity", items: ["Active Directory", "Group Policy", "Azure AD"] },
  { category: "Tools & Platforms", items: ["Docker", "Azure", "IIS", "Grafana", "Prometheus"] },
];

export function ITSkills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section className="py-12 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}>
          <motion.div
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Infrastructure Skills
            </h2>
            <motion.div
              className="w-20 h-1 bg-[var(--accent)] mb-6 sm:mb-8"
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ ...springConfigs.snappy, delay: 0.2 }}
            />
          </motion.div>

          {/* Mobile: horizontal scroll */}
          <div className="sm:hidden -mx-6 px-6">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ scrollPaddingLeft: "24px" }}>
              {itSkills.map((group, index) => (
                <motion.div
                  key={group.category}
                  className="flex-shrink-0 snap-start"
                  style={{ width: "70%" }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : index * staggerConfigs.fast }}
                >
                  <div className="p-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] h-full">
                    <h3 className="text-sm font-semibold mb-3">{group.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className="px-2.5 py-1 text-xs bg-[var(--background)] rounded-lg text-[var(--muted)]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {itSkills.map((group, index) => (
              <motion.div
                key={group.category}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ ...springConfigs.gentle, delay: prefersReducedMotion ? 0 : index * staggerConfigs.fast }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
              >
                <div className="p-5 bg-[var(--card)] rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 h-full">
                  <h3 className="text-sm font-semibold mb-3">{group.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 text-xs bg-[var(--background)] rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section id="services" className="py-12 sm:py-20 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref}>
          <motion.div
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={springConfigs.gentle}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              IT Services
            </h2>
            <motion.div
              className="w-20 h-1 bg-[var(--accent)] mb-4 sm:mb-6"
              initial={prefersReducedMotion ? {} : { scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ ...springConfigs.snappy, delay: 0.2 }}
            />
          </motion.div>

          <motion.p
            className="text-[var(--muted)] max-w-2xl mb-6 sm:mb-12 text-sm sm:text-base leading-relaxed"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={{
              ...springConfigs.gentle,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            Available evenings and weekends for contract IT work in Calgary and
            surrounding area. From network troubleshooting to full server
            deployments — I bring hands-on experience and a developer&apos;s
            problem-solving mindset.
          </motion.p>

          {/* Mobile: swipeable carousel */}
          <div className="sm:hidden">
            <MobileCarousel isInView={isInView} />
          </div>

          {/* Desktop: grid */}
          <div className="hidden sm:block">
            <DesktopGrid isInView={isInView} />
          </div>

          {/* CTA */}
          <motion.div
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            initial={variants.initial}
            animate={isInView ? variants.animate : {}}
            transition={{
              ...springConfigs.gentle,
              delay: prefersReducedMotion ? 0 : 0.4,
            }}
          >
            <motion.a
              href="mailto:joey@joeyfishertech.com?subject=IT Services Inquiry"
              className="px-6 py-3.5 sm:py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-hover)] text-white rounded-xl sm:rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-center"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={springConfigs.snappy}
            >
              <Mail size={18} />
              Get a Quote
            </motion.a>
            <motion.div
              className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--muted)]"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 0.5,
              }}
            >
              <Clock size={16} />
              <span>Evenings &amp; Weekends · Calgary, AB</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
