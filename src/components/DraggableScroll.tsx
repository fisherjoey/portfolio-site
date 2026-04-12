"use client";

import { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface DraggableScrollProps {
  children: ReactNode;
  className?: string;
}

/**
 * A horizontal scrollable container with native touch support.
 * Uses Embla Carousel under the hood for smooth drag physics on all devices.
 */
export function DraggableScroll({ children, className = "" }: DraggableScrollProps) {
  const [emblaRef] = useEmblaCarousel({
    containScroll: "trimSnaps",
    dragFree: true,
    align: "start",
  });

  return (
    <div
      className="relative w-full"
      style={{
        overflow: "hidden",
        // Force the container to respect parent width
        maxWidth: "100%",
      }}
      ref={emblaRef}
    >
      <div
        className={`flex cursor-grab active:cursor-grabbing ${className}`}
        style={{
          // Prevent flex container from shrinking
          minWidth: "min-content",
        }}
      >
        {children}
      </div>
    </div>
  );
}
