"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageGallery({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  // Drag/swipe handling for main image
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Drag-to-scroll for thumbnails
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Reset index when gallery opens with new initialIndex
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  const goNext = useCallback(() => {
    if (isZoomed) return;
    setDirection(1);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isZoomed]);

  const goPrev = useCallback(() => {
    if (isZoomed) return;
    setDirection(-1);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, isZoomed]);

  // Image drag/swipe handlers (mouse + touch)
  const handleDragStart = (clientX: number) => {
    if (isZoomed) return;
    setIsDraggingImage(true);
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingImage || isZoomed) return;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDraggingImage) return;
    setIsDraggingImage(false);

    const threshold = 80;
    if (dragOffset < -threshold) {
      goNext();
    } else if (dragOffset > threshold) {
      goPrev();
    }
    setDragOffset(0);
  };

  // Mouse events
  const handleImageMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleImageMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleImageMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleImageTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleImageTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleImageTouchEnd = () => {
    handleDragEnd();
  };

  // Thumbnail drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!thumbnailsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - thumbnailsRef.current.offsetLeft);
    setScrollLeft(thumbnailsRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !thumbnailsRef.current) return;
    e.preventDefault();
    const x = e.pageX - thumbnailsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    thumbnailsRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " " || e.key === "z") {
        e.preventDefault();
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goNext, goPrev, isZoomed]);

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

  if (!isOpen) return null;

  const slideVariants = {
    enter: {
      y: -30,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 30,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
        onClick={() => !isZoomed && onClose()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 text-white/80">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed((prev) => !prev);
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title={isZoomed ? "Zoom out (Z)" : "Zoom in (Z)"}
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div
          className="flex-1 relative flex items-center justify-center overflow-hidden"
        >
          {/* Previous button */}
          {images.length > 1 && !isZoomed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 md:left-6 z-10 p-3 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full transition-all"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image container */}
          <div
            className={`relative select-none ${
              isZoomed ? 'cursor-zoom-out overflow-auto' : isDraggingImage ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={!isZoomed ? handleImageMouseDown : undefined}
            onMouseMove={!isZoomed ? handleImageMouseMove : undefined}
            onMouseUp={handleImageMouseUp}
            onMouseLeave={handleImageMouseUp}
            onTouchStart={!isZoomed ? handleImageTouchStart : undefined}
            onTouchMove={!isZoomed ? handleImageTouchMove : undefined}
            onTouchEnd={handleImageTouchEnd}
            onClick={(e) => {
              e.stopPropagation();
              // Only zoom if not dragging
              if (!isDraggingImage && Math.abs(dragOffset) < 5) {
                setIsZoomed((prev) => !prev);
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative"
                style={{
                  transform: isDraggingImage ? `translateX(${dragOffset}px)` : undefined,
                  transition: isDraggingImage ? 'none' : 'transform 0.3s ease-out',
                }}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={images[currentIndex]}
                  alt={`Screenshot ${currentIndex + 1}`}
                  className={`rounded-lg shadow-2xl ${
                    isZoomed
                      ? 'max-w-none w-auto h-auto'
                      : 'max-w-[90vw] max-h-[70vh] object-contain'
                  } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setIsLoading(false)}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          {images.length > 1 && !isZoomed && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 md:right-6 z-10 p-3 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-full transition-all"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && !isZoomed && (
          <div className="p-4">
            <div
              ref={thumbnailsRef}
              className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => e.stopPropagation()}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((img, index) => (
                <button
                  key={img}
                  onClick={(e) => {
                    if (isDragging) return;
                    e.stopPropagation();
                    setDirection(index > currentIndex ? 1 : -1);
                    setIsLoading(true);
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all select-none ${
                    index === currentIndex
                      ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-black opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hints */}
        <div className="flex justify-center gap-6 pb-4 text-white/40 text-xs">
          <span>Drag to navigate</span>
          <span className="hidden md:inline">Z Zoom</span>
          <span>Tap outside to close</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
