"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paragraphs } from "@/components/ui/paragraphs";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectStory } from "@/components/projects/project-story";
import type { Project } from "@/lib/projects";
import { useReturnFocus } from "@/lib/use-return-focus";

/**
 * Project details in a Radix Dialog (focus trap/restore, Escape, scroll lock, ARIA).
 * `previous` / `next` navigate within the current filter.
 */
export function ProjectDetailModal({
  project,
  previous,
  next,
  onNavigate,
  onClose,
}: {
  project: Project | null;
  previous: Project | null;
  next: Project | null;
  onNavigate: (project: Project) => void;
  onClose: () => void;
}) {
  // Keep showing the last project while the dialog animates closed.
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);
  const returnFocus = useReturnFocus();

  return (
    <Dialog.Root open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          {...returnFocus}
          // The content layer fills the viewport so the close button can sit in the corner;
          // clicks on its empty area (outside the panel) close the dialog.
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.97] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.97] md:p-8"
        >
          {shown && (
            <div className="relative flex max-h-[min(90dvh,92vh)] w-full max-w-[min(90vw,1400px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-space-card shadow-2xl">
              {/* Keyed so switching projects starts at the top */}
              <div key={shown.id} className="flex-1 overflow-y-auto overscroll-contain pt-8 md:pt-10">
                <div className="flex flex-col gap-10 p-6 md:p-10">
                  {shown.images && shown.images.length > 0 && (
                    <ProjectGallery key={shown.id} images={shown.images} title={shown.title} />
                  )}

                  <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
                    <div className="lg:col-span-7 xl:col-span-8">
                      <div className="mb-5 flex items-center gap-3">
                        <Badge variant="category">{shown.category}</Badge>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      <Dialog.Title asChild>
                        <h2 className="mb-2 text-3xl font-bold leading-none tracking-tighter text-white sm:text-4xl md:text-5xl">
                          {shown.title}
                        </h2>
                      </Dialog.Title>

                      {shown.dateInfo && (
                        <p className="mb-6 text-sm tracking-wide text-white/50">
                          {shown.dateInfo.label} {shown.dateInfo.value}
                        </p>
                      )}

                      <Paragraphs text={shown.longDescription} className="text-[15px] leading-relaxed text-white/80 md:text-base" />

                      {shown.story && (
                        <ProjectStory
                          story={shown.story}
                          variant="compact"
                          className="mt-8 border-t border-white/10 pt-6 md:mt-10 md:pt-8"
                        />
                      )}
                    </div>

                    <aside className="space-y-8 lg:col-span-5 xl:col-span-4">
                      <div>
                        <SidebarLabel>Links</SidebarLabel>
                        <div className="flex flex-col gap-2.5">
                          {shown.caseStudy && (
                            <Button className="h-11 w-full justify-start text-sm" asChild>
                              <Link href={`/projects/${shown.id}`}>Read Full Case Study →</Link>
                            </Button>
                          )}
                          {shown.github && (
                            <Button variant="outline" className="h-11 w-full justify-start border-white/15 text-sm hover:border-cyan-400/40" asChild>
                              <a href={shown.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub className="mr-3 h-4 w-4" /> View Source Code
                              </a>
                            </Button>
                          )}
                          {shown.live && (
                            <Button className="h-11 w-full justify-start text-sm" asChild>
                              <a href={shown.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-3 h-4 w-4" /> Open Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <SidebarLabel>Technologies</SidebarLabel>
                        <div className="flex flex-wrap gap-2">
                          {shown.technologies.map((tech) => (
                            <Badge key={tech} variant="tech">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </aside>
                  </div>

                  {(previous || next) && (
                    <nav
                      aria-label="Other projects"
                      className="flex flex-col items-stretch justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center"
                    >
                      <div className="sm:flex-1">
                        {previous && <ProjectNavButton project={previous} direction="previous" onClick={onNavigate} />}
                      </div>
                      <div className="sm:flex-1 sm:text-right">
                        {next && <ProjectNavButton project={next} direction="next" onClick={onNavigate} />}
                      </div>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          )}

          <Dialog.Close
            aria-label="Close project details"
            className="group absolute right-6 top-[calc(1.5rem+env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 touch-manipulation"
          >
            <X className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 text-xs font-medium uppercase tracking-[2.5px] text-white/40">{children}</div>;
}

function ProjectNavButton({
  project,
  direction,
  onClick,
}: {
  project: Project;
  direction: "previous" | "next";
  onClick: (project: Project) => void;
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      onClick={() => onClick(project)}
      className={`-m-3 flex w-full items-center gap-3 rounded-xl p-3 text-sm text-white/70 transition-all hover:text-white active:bg-white/5 touch-manipulation sm:m-0 sm:w-auto sm:p-0 ${
        isNext ? "sm:ml-auto sm:justify-end" : ""
      }`}
    >
      <span className={`flex-shrink-0 rounded-full border border-white/10 bg-white/5 p-2 ${isNext ? "order-2" : ""}`}>
        <Icon size={16} />
      </span>
      <span className={`min-w-0 ${isNext ? "text-right" : "text-left"}`}>
        <span className="block text-[10px] uppercase tracking-widest text-white/40">{isNext ? "Next" : "Previous"}</span>
        <span className="block truncate text-sm text-white/90">{project.title}</span>
      </span>
    </button>
  );
}
