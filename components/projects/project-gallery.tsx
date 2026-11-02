"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ImageLightbox, type LightboxImage } from "@/components/ui/image-lightbox";
import { useImageCarousel } from "@/lib/use-image-carousel";
import { cn } from "@/lib/utils";

const SWIPE_X = 80;

/** In-modal gallery: swipeable viewer, dots, arrows, thumbnails, and a fullscreen lightbox. */
export function ProjectGallery({ images, title }: { images: LightboxImage[]; title: string }) {
  const { index, setIndex, next, prev } = useImageCarousel(images.length);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // A swipe ends with a click; this stops that click from opening the lightbox.
  const swipedRef = useRef(false);
  const multiple = images.length > 1;
  const image = images[index];

  if (!image) return null;

  return (
    <div className="group relative">
      <div
        className="relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl transition-opacity active:opacity-95 touch-manipulation"
        onClick={() => {
          if (!swipedRef.current) setLightboxOpen(true);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full"
            drag={multiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            style={{ touchAction: "pan-y pinch-zoom" }}
            onDragStart={() => {
              swipedRef.current = true;
            }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_X) next();
              else if (info.offset.x > SWIPE_X) prev();
              setTimeout(() => {
                swipedRef.current = false;
              }, 150);
            }}
            whileDrag={{ scale: 0.985 }}
          >
            <Image
              src={image.src}
              alt={image.caption ?? title}
              fill
              sizes="(max-width: 768px) 95vw, (max-width: 1280px) 80vw, 1024px"
              quality={82}
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Keyboard-reachable way into the lightbox; always visible on touch, on hover/focus on desktop */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs tracking-widest text-white/90 backdrop-blur-md transition-all hover:bg-black/70 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
        >
          <Maximize2 size={14} aria-hidden />
          <span className="hidden md:inline">VIEW FULL</span>
          <span className="md:hidden">FULL</span>
        </button>
      </div>

      {multiple && (
        <>
          <div className="mt-4 flex items-center justify-between gap-4">
            {/* Dots duplicate the thumbnails, so they're dropped on narrow screens where they can overflow */}
            <div className="hidden min-w-0 flex-wrap gap-2 sm:flex">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200 touch-manipulation md:h-1.5",
                    i === index ? "w-8 bg-cyan-400" : "w-6 bg-white/20 active:bg-white/40 md:w-4",
                  )}
                />
              ))}
            </div>
            <div className="ml-auto flex shrink-0 gap-2">
              <GalleryArrow direction="prev" onClick={prev} />
              <GalleryArrow direction="next" onClick={next} />
            </div>
          </div>

          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-lg border transition-all touch-manipulation md:h-10 md:w-16",
                  i === index
                    ? "border-cyan-400 ring-1 ring-cyan-400/30"
                    : "border-white/10 opacity-70 hover:opacity-100 active:border-white/40",
                )}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </>
      )}

      <ImageLightbox
        images={images}
        index={index}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onNext={next}
        onPrev={prev}
        title={title}
      />
    </div>
  );
}

function GalleryArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className="rounded-full border border-white/10 bg-white/5 p-3 text-white/80 transition-all hover:bg-white/10 active:bg-white/15 touch-manipulation md:p-2"
    >
      <Icon size={20} />
    </button>
  );
}
