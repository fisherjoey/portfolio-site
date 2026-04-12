"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageGallery({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // Main carousel - disable when zoomed
  const [mainRef, mainApi] = useEmblaCarousel({
    loop: true,
    startIndex: initialIndex,
    watchDrag: !isZoomed,
  });

  // Thumbnail carousel
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // Sync selected index when main carousel scrolls
  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  // Set up scroll sync
  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  // Handle thumbnail click
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  // Navigate functions
  const scrollPrev = useCallback(() => {
    if (isZoomed || !mainApi) return;
    mainApi.scrollPrev();
  }, [mainApi, isZoomed]);

  const scrollNext = useCallback(() => {
    if (isZoomed || !mainApi) return;
    mainApi.scrollNext();
  }, [mainApi, isZoomed]);

  // Reset state when gallery opens
  useEffect(() => {
    if (isOpen && mainApi) {
      mainApi.scrollTo(initialIndex, true); // true = instant (no animation)
      setIsZoomed(false);
      setSelectedIndex(initialIndex);
    }
  }, [isOpen, initialIndex, mainApi]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
          break;
        case "ArrowRight":
          scrollNext();
          break;
        case "ArrowLeft":
          scrollPrev();
          break;
        case " ":
        case "z":
        case "Z":
          e.preventDefault();
          setIsZoomed((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, scrollNext, scrollPrev, isZoomed]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Track loaded images
  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  // Re-enable drag when zoom changes
  useEffect(() => {
    if (mainApi) {
      mainApi.reInit({ watchDrag: !isZoomed });
    }
  }, [isZoomed, mainApi]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-3 sm:p-4 text-white/80">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              className="p-2.5 sm:p-2 hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut size={22} /> : <ZoomIn size={22} />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 sm:p-2 hover:bg-white/10 active:bg-white/20 rounded-lg transition-colors"
              aria-label="Close gallery"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative flex items-center justify-center min-h-0">
          {/* Previous button - hidden on touch devices, shown on hover for desktop */}
          {images.length > 1 && !isZoomed && (
            <button
              onClick={scrollPrev}
              className="hidden md:flex absolute left-4 lg:left-6 z-10 p-3 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Embla main carousel */}
          <div
            ref={mainRef}
            className={`w-full h-full ${
              isZoomed
                ? "overflow-auto cursor-zoom-out"
                : "overflow-hidden cursor-zoom-in"
            }`}
            onClick={(e) => {
              // Only toggle zoom if clicking the container, not dragging
              if (e.target === e.currentTarget || !isZoomed) {
                setIsZoomed((prev) => !prev);
              }
            }}
          >
            <div className={`flex h-full ${isZoomed ? "" : "touch-pan-y"}`}>
              {images.map((src, index) => (
                <div
                  key={src}
                  className={`flex-[0_0_100%] min-w-0 flex items-center justify-center ${
                    isZoomed ? "p-4" : "px-4 sm:px-8"
                  }`}
                >
                  {/* Loading spinner */}
                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={src}
                    alt={`Screenshot ${index + 1}`}
                    className={`object-contain rounded-lg shadow-2xl select-none transition-all duration-300 ${
                      loadedImages.has(index) ? "opacity-100" : "opacity-0"
                    } ${
                      isZoomed
                        ? "max-w-none w-auto max-h-none"
                        : "max-w-[90vw] max-h-[65vh] sm:max-h-[70vh]"
                    }`}
                    style={isZoomed ? { maxWidth: "150vw", maxHeight: "150vh" } : undefined}
                    onLoad={() => handleImageLoad(index)}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          {images.length > 1 && !isZoomed && (
            <button
              onClick={scrollNext}
              className="hidden md:flex absolute right-4 lg:right-6 z-10 p-3 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Thumbnail strip - using Embla */}
        {images.length > 1 && !isZoomed && (
          <div className="p-3 sm:p-4">
            <div ref={thumbRef} className="overflow-hidden">
              <div className="flex gap-2">
                {images.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => onThumbClick(index)}
                    className={`flex-shrink-0 w-16 h-11 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all ${
                      index === selectedIndex
                        ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-black opacity-100"
                        : "opacity-50 hover:opacity-80 active:opacity-90"
                    }`}
                    aria-label={`View image ${index + 1}`}
                    aria-current={index === selectedIndex ? "true" : "false"}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile-friendly hints */}
        <div className="flex justify-center gap-4 sm:gap-6 pb-3 sm:pb-4 text-white/40 text-xs">
          <span className="md:hidden">Swipe to navigate</span>
          <span className="hidden md:inline">← → Navigate</span>
          <span className="hidden md:inline">Space/Z to zoom</span>
          <span>Tap image to zoom</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
