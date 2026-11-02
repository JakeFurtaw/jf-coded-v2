"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ProjectTimeline } from "@/components/ui/project-timeline";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDetailModal } from "@/components/projects/project-detail-modal";
import { ProjectFilters, type CategoryFilter, type SubCategoryFilter } from "@/components/projects/project-filters";
import { allProjects, type Project } from "@/lib/projects";

const FLASH_MS = 1600;

export default function ProjectsClient() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [subCategory, setSubCategory] = useState<SubCategoryFilter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Timeline <-> card linking
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [flashId, setFlashId] = useState<number | null>(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    },
    [],
  );

  const filteredProjects = allProjects.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (category === "AI/ML" && subCategory !== "All") return p.subCategory?.includes(subCategory) ?? false;
    return true;
  });
  const filteredIds = filteredProjects.map((p) => p.id);

  // Previous/next within the current filter. A project opened from the timeline that the
  // filter hides has no neighbours here.
  const selectedIndex = selectedProject ? filteredProjects.findIndex((p) => p.id === selectedProject.id) : -1;
  const previousProject = selectedIndex > 0 ? filteredProjects[selectedIndex - 1] : null;
  const nextProject =
    selectedIndex !== -1 && selectedIndex < filteredProjects.length - 1 ? filteredProjects[selectedIndex + 1] : null;

  const changeCategory = (next: CategoryFilter) => {
    setCategory(next);
    if (next !== "AI/ML") setSubCategory("All");
  };

  // Timeline row click: scroll to the card and flash it; open the modal if the filter hides the card.
  const handleTimelineSelect = (project: Project) => {
    const card = document.getElementById(`project-card-${project.id}`);
    if (!card || !filteredIds.includes(project.id)) {
      setSelectedProject(project);
      return;
    }
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlashId(project.id);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlashId(null), FLASH_MS);
  };

  const timelineProps = {
    projects: allProjects,
    highlightedId: hoveredId ?? flashId,
    activeIds: filteredIds,
    onHighlight: setHoveredId,
    onSelect: handleTimelineSelect,
  };

  return (
    <div className="min-h-screen bg-space-bg pb-24">
      <div className="mx-auto flex max-w-[80rem] gap-8 px-6 pt-16 xl:max-w-[96rem]">
        {/* Sticky timeline rail (lg+) */}
        <aside className="relative z-20 hidden w-60 flex-shrink-0 overflow-visible lg:block xl:w-72 2xl:w-80">
          <div className="sticky top-0 flex h-screen items-center overflow-visible">
            <ProjectTimeline
              variant="rail"
              className="glass rounded-2xl border border-white/10 p-3"
              selectedId={selectedProject?.id ?? null}
              {...timelineProps}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-16 text-center">
            <h1 className="mb-4 text-6xl font-bold tracking-tighter">Projects</h1>
            <p className="mx-auto max-w-2xl text-xl text-white/70">A collection of some of my AI and Web Development projects</p>
          </header>

          <ProjectFilters
            category={category}
            subCategory={subCategory}
            onCategoryChange={changeCategory}
            onSubCategoryChange={setSubCategory}
          />

          {/* Collapsible timeline (below lg) */}
          <div className="mx-auto mb-10 max-w-2xl lg:hidden">
            <button
              type="button"
              onClick={() => setIsTimelineOpen((open) => !open)}
              aria-expanded={isTimelineOpen}
              aria-controls="mobile-project-timeline"
              className="glass flex w-full items-center justify-between rounded-2xl border border-white/10 px-5 py-3.5 text-left transition-colors active:border-cyan-400/40 touch-manipulation"
            >
              <span className="font-medium tracking-tight">
                Project timeline
                <span className="ml-2 text-sm text-white/45">{allProjects.length} projects</span>
              </span>
              <ChevronDown
                size={18}
                className={`text-cyan-400 transition-transform duration-200 ${isTimelineOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isTimelineOpen && (
                <motion.div
                  id="mobile-project-timeline"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <ProjectTimeline
                    variant="inline"
                    className="glass mt-3 rounded-2xl border border-white/10 p-3 sm:p-4"
                    {...timelineProps}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priority={index === 0}
                  highlighted={hoveredId === project.id}
                  flashing={flashId === project.id}
                  onOpen={setSelectedProject}
                  onHover={setHoveredId}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        previous={previousProject}
        next={nextProject}
        onNavigate={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
