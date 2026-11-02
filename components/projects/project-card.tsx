"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Grid card. The title is a real <button> stretched over the whole card (::after), so the card is
 * clickable and keyboard-focusable; the links sit above it (relative z-10) and stay independent.
 */
export function ProjectCard({
  ref,
  project,
  priority = false,
  highlighted = false,
  flashing = false,
  onOpen,
  onHover,
}: {
  /** Forwarded to the root so AnimatePresence's popLayout can measure the card. */
  ref?: React.Ref<HTMLDivElement>;
  project: Project;
  priority?: boolean;
  /** Linked to a hovered timeline row. */
  highlighted?: boolean;
  /** Briefly emphasized after a timeline jump. */
  flashing?: boolean;
  onOpen: (project: Project) => void;
  onHover: (id: number | null) => void;
}) {
  const cover = project.images?.[0];

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
      id={`project-card-${project.id}`}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className="group scroll-mt-24"
    >
      <Card
        className={cn(
          "glass relative h-full overflow-hidden border transition-all duration-300 touch-manipulation group-hover:border-cyan-400/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.985] has-[[data-card-trigger]:focus-visible]:ring-2 has-[[data-card-trigger]:focus-visible]:ring-cyan-400/60",
          flashing ? "border-cyan-400/70 ring-2 ring-cyan-400/40" : highlighted ? "border-cyan-400/40" : "border-white/10",
        )}
      >
        <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-900/50 to-purple-900/50">
          {cover ? (
            <>
              <Image
                src={cover.src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                quality={82}
                preload={priority}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </>
          ) : (
            <span aria-hidden className="text-6xl text-cyan-400/30 transition-transform duration-300 group-hover:scale-110">
              {project.category === "AI/ML" ? "🤖" : "💻"}
            </span>
          )}
        </div>

        <div className="p-8">
          <h3 className="mb-3 text-2xl font-semibold text-white transition-all duration-200 group-hover:tracking-[-0.02em] group-hover:text-cyan-400">
            <button
              type="button"
              data-card-trigger
              onClick={() => onOpen(project)}
              className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
              <span className="sr-only">: view details</span>
            </button>
          </h3>
          <p className="mb-6 line-clamp-3 text-white/70 transition-colors duration-200 group-hover:text-white/80">
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge
                key={tech}
                variant="tech"
                className="bg-white/10 transition-all duration-200 group-hover:border-cyan-400/30 group-hover:bg-white/15 group-hover:text-cyan-200"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Links sit above the stretched card trigger */}
          <div className="relative z-10">
            {project.caseStudy && (
              <Button size="sm" className="mb-2.5 w-full" asChild>
                <Link href={`/projects/${project.id}`}>Read Full Case Study →</Link>
              </Button>
            )}
            <div className="flex gap-3">
              {project.github && (
                <Button size="sm" variant="outline" className="flex-1 border-white/20 transition-all group-hover:border-white/30" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
              )}
              {project.live && (
                <Button size="sm" className="flex-1" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
