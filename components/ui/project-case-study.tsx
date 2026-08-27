"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  X,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

const storyBlocks: Array<{
  key: "role" | "context" | "challenges" | "approach" | "learnings" | "impact";
  label: string;
}> = [
  { key: "role", label: "My Role" },
  { key: "context", label: "Context & Problem" },
  { key: "challenges", label: "Challenges" },
  { key: "approach", label: "Approach & Decisions" },
  { key: "learnings", label: "Key Learnings" },
  { key: "impact", label: "Impact & Results" },
];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white whitespace-nowrap">
        {children}
      </h2>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const images = project.images ?? [];
  const hasMultiple = images.length > 1;
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = useCallback(() => {
    if (hasMultiple) setImageIndex((i) => (i + 1) % images.length);
  }, [hasMultiple, images.length]);

  const prevImage = useCallback(() => {
    if (hasMultiple) setImageIndex((i) => (i - 1 + images.length) % images.length);
  }, [hasMultiple, images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, nextImage, prevImage]);

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-space-bg">
      <div className="mx-auto max-w-5xl px-6 pt-10 md:pt-16 pb-28">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>All Projects</span>
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-3 py-1 text-sm">
              {project.category}
            </Badge>
            {project.subCategory?.map((s) => (
              <Badge key={s} className="bg-white/5 text-white/60 border-white/10 px-3 py-1 text-sm">
                {s}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none mb-6">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="text-sm text-white/40 tracking-wide">
              {project.dateInfo && (
                <span>
                  {project.dateInfo.label} {project.dateInfo.value}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Button variant="outline" className="border-white/20 hover:border-cyan-400/50" asChild>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <FaGithub className="w-4 h-4 mr-2" /> Source Code
                  </a>
                </Button>
              )}
              {project.live && (
                <Button className="bg-cyan-400 text-black hover:bg-cyan-300" asChild>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.header>

        {/* Hero image */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mt-12"
          >
            <div
              className="group relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl cursor-zoom-in active:opacity-95"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={images[0].src}
                alt={images[0].caption ?? project.title}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm text-white/90 max-w-[75%] line-clamp-2">
                  {images[0].caption}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
                  <Maximize2 size={12} /> Expand
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Overview */}
        <section className="mt-16">
          <SectionHeading>Overview</SectionHeading>
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/75 max-w-3xl">
            {project.longDescription
              .split(/\n{2,}/)
              .map((s) => s.trim())
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        </section>

        {/* The Build */}
        {project.story && (
          <section className="mt-16">
            <SectionHeading>The Build</SectionHeading>
            <div className="space-y-10">
              {storyBlocks.map(({ key, label }) => {
                const value = project.story?.[key];
                if (!value) return null;
                return (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-6">
                    <h3 className="md:col-span-4 text-sm font-semibold text-white/40 uppercase tracking-[1.5px] pt-1">
                      {label}
                    </h3>
                    <p className="md:col-span-8 text-base md:text-lg leading-relaxed text-white/75">
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Capabilities — agent tools + bundled skills */}
        {(project.tools?.length || project.skills?.length) && (
          <section className="mt-16">
            <SectionHeading>Capabilities</SectionHeading>
            <p className="text-base md:text-lg leading-relaxed text-white/55 max-w-3xl mb-10">
              The full set of tools the agent can call, and the bundled skill playbooks it loads on demand.
            </p>

            {project.tools && project.tools.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-lg font-semibold text-white whitespace-nowrap">Agent Tools</h3>
                  <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-2.5 py-0.5 text-xs">
                    {project.tools.length}
                  </Badge>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.tools.map((t) => (
                    <div key={t.name} className="glass rounded-xl p-4 transition-colors hover:border-cyan-400/40">
                      <code className="block text-sm font-semibold text-cyan-300 font-mono mb-1.5">{t.name}</code>
                      <p className="text-sm text-white/75 leading-snug">{t.usedFor}</p>
                      {t.notes && <p className="text-xs text-white/40 leading-snug mt-1.5">{t.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.skills && project.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-lg font-semibold text-white whitespace-nowrap">Bundled Skills</h3>
                  <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-2.5 py-0.5 text-xs">
                    {project.skills.length}
                  </Badge>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.skills.map((s) => (
                    <div key={s.name} className="glass rounded-xl p-4 transition-colors hover:border-cyan-400/40">
                      <code className="block text-sm font-semibold text-cyan-300 font-mono mb-1.5">{s.name}</code>
                      <p className="text-sm text-white/75 leading-snug mb-2">{s.usedFor}</p>
                      {s.workflow && (
                        <p className="text-xs text-white/40 leading-relaxed font-mono">{s.workflow}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
        {/* More screenshots */}
        {images.length > 1 && (
          <section className="mt-16">
            <SectionHeading>Screenshots</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.slice(1).map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i + 1)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 active:opacity-95"
                >
                  <Image
                    src={img.src}
                    alt={img.caption ?? `Screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-3 left-4 right-4 text-left text-sm text-white/85 line-clamp-2">
                    {img.caption}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Technologies */}
        <section className="mt-16">
          <SectionHeading>Technologies</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge
                key={t}
                className="px-3 py-1.5 bg-white/5 border border-white/10 text-cyan-300 text-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all"
              >
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/50 text-base md:text-lg">
            Want to talk about building something like this?
          </p>
          <Button asChild className="bg-cyan-400 text-black hover:bg-cyan-300">
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen &&
        images.length > 0 &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-2xl"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute inset-0 p-3 md:p-8 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={images[imageIndex].src}
                      alt={images[imageIndex].caption ?? project.title}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {hasMultiple && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 active:bg-white/25 backdrop-blur p-3 md:p-4 rounded-full border border-white/10 text-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 active:bg-white/25 backdrop-blur p-3 md:p-4 rounded-full border border-white/10 text-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="absolute right-4 top-4 h-11 w-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono tracking-[2px]">
                {imageIndex + 1} / {images.length}
              </div>
            </div>

            {images[imageIndex]?.caption && (
              <div
                className="border-t border-white/10 px-6 md:px-10 py-5"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-base md:text-lg text-white/90 text-center leading-snug">
                  {images[imageIndex].caption}
                </p>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
