"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog } from "radix-ui";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReturnFocus } from "@/lib/use-return-focus";

export interface LightboxImage {
  src: string;
  caption?: string;
}

const SWIPE_X = 60;
const SWIPE_DOWN_TO_CLOSE = 140;

/**
 * Fullscreen image viewer. Radix Dialog provides focus trap/restore, Escape, scroll lock,
 * and ARIA; this adds arrow keys, swipe (left/right to navigate, down to close), and captions.
 */
export function ImageLightbox({
  images,
  index,
  open,
  onOpenChange,
  onNext,
  onPrev,
  title,
}: {
  images: LightboxImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  /** Used for the dialog's accessible name and as fallback alt text. */
  title: string;
}) {
  const image = images[index];
  const multiple = images.length > 1;
  const returnFocus = useReturnFocus();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          {...returnFocus}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              onNext();
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              onPrev();
            }
          }}
          className="fixed inset-0 z-[70] flex flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        >
          <Dialog.Title className="sr-only">
            {title}: image {index + 1} of {images.length}
          </Dialog.Title>

          <div className="relative min-h-0 flex-1">
            {image && (
              <motion.div
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute inset-0 px-3 py-16 md:px-24 md:py-12"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                style={{ touchAction: "pan-y pinch-zoom" }}
                onDragEnd={(_, info) => {
                  const { x, y } = info.offset;
                  if (y > SWIPE_DOWN_TO_CLOSE && Math.abs(y) > Math.abs(x)) onOpenChange(false);
                  else if (x < -SWIPE_X) onNext();
                  else if (x > SWIPE_X) onPrev();
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.caption ?? title}
                    fill
                    sizes="100vw"
                    quality={82}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            )}

            {multiple && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:bg-white/25 touch-manipulation md:left-6 md:p-4"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 active:bg-white/25 touch-manipulation md:right-6 md:p-4"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <Dialog.Close
              aria-label="Close image viewer"
              className="group absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 touch-manipulation md:right-6 md:top-6"
            >
              <X className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
            </Dialog.Close>

            {multiple && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[2px] text-white/60">
                {index + 1} / {images.length}
              </div>
            )}
          </div>

          {image?.caption && (
            <p className="border-t border-white/10 px-6 py-5 text-center text-base font-medium leading-snug text-white/90 md:px-10 md:text-lg">
              {image.caption}
            </p>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
