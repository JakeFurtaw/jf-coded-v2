"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { FaGithub } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { allProjects, type Project } from "@/lib/projects";

const projects = allProjects;

const categories = ["All", "AI/ML", "Web"] as const;
const aiMlSubCategories = ["All", "Agentic", "RAG", "Research", "Multi-Modal"] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "AI/ML" | "Web">("All");
  const [activeSubFilter, setActiveSubFilter] = useState<typeof aiMlSubCategories[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Track recent drag to prevent lightbox from opening after swipe
  const dragJustEndedRef = useRef(false);

  const filteredProjects = projects.filter(p => {
    const categoryMatch = activeFilter === "All" || p.category === activeFilter;
    const subCategoryMatch = activeFilter === "AI/ML" && activeSubFilter !== "All" 
      ? p.subCategory?.includes(activeSubFilter) 
      : true;
    return categoryMatch && subCategoryMatch;
  });

  // Project-to-project navigation inside the modal
  const currentIndexInFiltered = selectedProject 
    ? filteredProjects.findIndex(p => p.id === selectedProject.id) 
    : -1;

  const previousProject = currentIndexInFiltered > 0 ? filteredProjects[currentIndexInFiltered - 1] : null;
  const nextProject = currentIndexInFiltered < filteredProjects.length - 1 ? filteredProjects[currentIndexInFiltered + 1] : null;

  const goToProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    if (activeFilter !== "AI/ML") {
      setActiveSubFilter("All");
    }
  }, [activeFilter]);

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images!.length);
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length);
    }
  };

  // Keyboard navigation for the in-modal gallery
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          setSelectedProject(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isLightboxOpen]);

  useEffect(() => {
  if (selectedProject) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <div className="min-h-screen pb-24 bg-space-bg">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        {/* Header & Filter Buttons - unchanged */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Projects</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A collection of some of my Machine Learning and Web Development projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`px-6 md:px-8 py-2 rounded-full transition-all active:scale-95 touch-manipulation ${
                  activeFilter === category 
                    ? "bg-cyan-400 text-black" 
                    : "border-cyan-400/50 active:border-cyan-400 active:text-cyan-400"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <AnimatePresence>
            {activeFilter === "AI/ML" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {aiMlSubCategories.map((sub) => (
                  <Button
                    key={sub}
                    variant={activeSubFilter === sub ? "default" : "outline"}
                    onClick={() => setActiveSubFilter(sub)}
                    className={`px-4 py-1 rounded-full text-xs transition-all active:scale-95 touch-manipulation ${
                      activeSubFilter === sub 
                        ? "bg-cyan-400 text-black" 
                        : "border-cyan-400/30 active:border-cyan-400 active:text-cyan-400 text-white/60"
                    }`}
                  >
                    {sub}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Grid - unchanged except for image placeholder */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.01,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="group"
              >
              <Card 
                className="glass h-full overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.985] active:border-cyan-400/30 touch-manipulation"
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Image Area - Shows first image or placeholder */}
                <div className="h-48 relative bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center border-b border-white/10 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <Image 
                        src={project.images[0]} 
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={82}
                        priority={index === 0}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Subtle gradient overlay on hover for depth */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  ) : (
                    <div className="text-cyan-400/30 text-6xl transition-transform duration-300 group-hover:scale-110">
                      {project.category === "AI/ML" ? "🤖" : "💻"}
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-3 text-white transition-all duration-200 group-hover:text-cyan-400 group-hover:tracking-[-0.02em]">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-6 line-clamp-3 transition-colors duration-200 group-hover:text-white/80">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge 
                        key={tech} 
                        className="bg-white/10 text-cyan-300 border border-white/10 px-4 py-1 text-sm transition-all duration-200 group-hover:border-cyan-400/30 group-hover:bg-white/15 group-hover:text-cyan-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.github && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-white/20 group-hover:border-white/30 transition-all" 
                        asChild
                      >
                        <a href={project.github} target="_blank" onClick={(e) => e.stopPropagation()}>
                          <FaGithub className="w-4 h-4 mr-2" /> Code
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-cyan-400 text-black transition-all group-hover:bg-cyan-300" 
                        asChild
                      >
                        <a href={project.live} target="_blank" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="w-4 h-4 mr-2" /> Live
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
            
          ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Fullscreen Image Viewer — much lighter and more elegant */}
      {isLightboxOpen && selectedProject && typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white z-20 p-3 rounded-full hover:bg-white/10 transition-all"
            >
              <X size={28} />
            </button>

            <div 
              className="relative w-full max-w-7xl h-[85vh] flex items-center justify-center px-6"
              onClick={e => e.stopPropagation()}
            >
              <motion.div 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(event, info) => {
                  const swipeThreshold = 60;
                  if (info.offset.x < -swipeThreshold) {
                    nextImage();
                  } else if (info.offset.x > swipeThreshold) {
                    prevImage();
                  }
                }}
                whileDrag={{ scale: 0.99 }}
              >
                {selectedProject.images && selectedProject.images[currentImageIndex] && (
                  <div className="relative w-full h-full">
                    <Image 
                      src={selectedProject.images[currentImageIndex]} 
                      alt={selectedProject.title}
                      fill
                      sizes="100vw"
                      quality={90}
                      className="object-contain"
                    />
                  </div>
                )}
              </motion.div>

              {/* Elegant navigation - Mobile friendly */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 active:bg-white/25 backdrop-blur-md p-4 rounded-full text-white transition-all border border-white/10 touch-manipulation"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={26} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 active:bg-white/25 backdrop-blur-md p-4 rounded-full text-white transition-all border border-white/10 touch-manipulation"
                    aria-label="Next image"
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}

              {/* Image counter - better mobile visibility */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs md:text-sm tracking-widest bg-black/60 px-4 py-1.5 rounded-full backdrop-blur border border-white/10">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              )}
            </div>
          </div>
        </AnimatePresence>
      , document.body)}

      {/* Project Detail Modal — rendered in a portal so fixed positioning is relative to the viewport */}
      {typeof window !== "undefined" && createPortal(
      <AnimatePresence>
        {selectedProject && (
          /* Wrapper remains fixed to viewport for perfect centering */
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl my-auto bg-[#111114] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >

              
              {/* Content Container */}
              <div className="p-6 md:p-10 relative bg-[#0f0f12]">
                {/* Close Button - better mobile touch target */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white/50 active:text-white active:bg-white/10 p-3 md:p-2 rounded-full transition-all z-20 touch-manipulation"
                  aria-label="Close project details"
                >
                  <X size={22} />
                </button>

                <div className="flex flex-col gap-10">
                  {/* 1. MODERN IMAGE GALLERY */}
                  <div className="w-full">
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <div className="group relative">
                        <div 
                          className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl cursor-zoom-in active:opacity-95 transition-opacity touch-manipulation"
                          onClick={() => {
                            // Don't open lightbox if the user just finished a swipe
                            if (dragJustEndedRef.current) return;
                            setIsLightboxOpen(true);
                          }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div 
                              key={currentImageIndex}
                              initial={{ opacity: 0.6 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0.6 }}
                              transition={{ duration: 0.25 }}
                              className="relative w-full h-full"
                              drag="x"
                              dragConstraints={{ left: 0, right: 0 }}
                              dragElastic={0.25}
                              onDragStart={() => {
                                dragJustEndedRef.current = true;
                              }}
                              onDragEnd={(event, info) => {
                                const swipeThreshold = 80;
                                if (info.offset.x < -swipeThreshold) {
                                  nextImage();
                                } else if (info.offset.x > swipeThreshold) {
                                  prevImage();
                                }
                                // Reset the flag after a short delay
                                setTimeout(() => {
                                  dragJustEndedRef.current = false;
                                }, 150);
                              }}
                              whileDrag={{ scale: 0.985 }}
                            >
                              {selectedProject.images && selectedProject.images[currentImageIndex] && (
                                <Image 
                                  src={selectedProject.images[currentImageIndex]} 
                                  alt={selectedProject.title}
                                  fill
                                  sizes="(max-width: 768px) 95vw, (max-width: 1280px) 80vw, 1024px"
                                  quality={85}
                                  className="object-contain"
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {/* Expand hint - always visible on mobile, hover on desktop */}
                          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 text-xs tracking-widest flex items-center gap-2 border border-white/10 
                            md:opacity-0 md:group-hover:opacity-100 transition-all active:bg-black/70">
                            <Maximize2 size={14} />
                            <span className="hidden md:inline">VIEW FULL</span>
                            <span className="md:hidden">FULL</span>
                          </div>
                        </div>

                        {/* Gallery Navigation + Thumbnails (Premium touch) */}
                        {selectedProject.images.length > 1 && (
                          <>
                            {/* Dot + Arrow Navigation - Mobile optimized */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex gap-2">
                                {selectedProject.images.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 md:h-1.5 rounded-full transition-all duration-200 touch-manipulation ${
                                      idx === currentImageIndex 
                                        ? 'bg-cyan-400 w-8' 
                                        : 'bg-white/20 active:bg-white/40 w-6 md:w-4'
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  />
                                ))}
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={prevImage}
                                  disabled={currentImageIndex === 0}
                                  className="p-3 md:p-2 rounded-full bg-white/5 active:bg-white/15 text-white/80 disabled:opacity-30 transition-all border border-white/10 touch-manipulation"
                                  aria-label="Previous image"
                                >
                                  <ChevronLeft size={20} />
                                </button>
                                <button
                                  onClick={nextImage}
                                  disabled={currentImageIndex === selectedProject.images.length - 1}
                                  className="p-3 md:p-2 rounded-full bg-white/5 active:bg-white/15 text-white/80 disabled:opacity-30 transition-all border border-white/10 touch-manipulation"
                                  aria-label="Next image"
                                >
                                  <ChevronRight size={20} />
                                </button>
                              </div>
                            </div>

                            {/* Thumbnail Strip - Mobile optimized */}
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20 -mx-1 px-1">
                              {selectedProject.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentImageIndex(idx)}
                                  className={`relative flex-shrink-0 w-20 h-12 md:w-16 md:h-10 rounded-lg overflow-hidden border transition-all touch-manipulation ${
                                    idx === currentImageIndex 
                                      ? 'border-cyan-400 ring-1 ring-cyan-400/30' 
                                      : 'border-white/10 active:border-white/40 opacity-70 active:opacity-100'
                                  }`}
                                  aria-label={`View image ${idx + 1}`}
                                >
                                  <Image 
                                    src={img} 
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 2. REFINED CONTENT LAYOUT */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
                    {/* Main Story */}
                    <div className="lg:col-span-7 xl:col-span-8">
                      <div className="flex items-center gap-3 mb-5">
                        <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-3 py-1 font-medium">
                          {selectedProject.category}
                        </Badge>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8 leading-none">
                        {selectedProject.title}
                      </h2>
                      
                      <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-white/80">
                        <p>{selectedProject.longDescription}</p>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-8">
                      {/* Links */}
                      <div>
                        <div className="text-xs uppercase tracking-[2.5px] text-white/40 mb-3 font-medium">Links</div>
                        <div className="flex flex-col gap-2.5">
                          {selectedProject.github && (
                            <Button 
                              variant="outline" 
                              className="w-full justify-start border-white/15 hover:border-cyan-400/40 h-11 text-sm" 
                              asChild
                            >
                              <a href={selectedProject.github} target="_blank">
                                <FaGithub className="mr-3 h-4 w-4" /> View Source Code
                              </a>
                            </Button>
                          )}
                          {selectedProject.live && (
                            <Button 
                              className="w-full justify-start bg-cyan-400 text-black hover:bg-cyan-300 h-11 text-sm" 
                              asChild
                            >
                              <a href={selectedProject.live} target="_blank">
                                <ExternalLink className="mr-3 h-4 w-4" /> Open Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <div className="text-xs uppercase tracking-[2.5px] text-white/40 mb-3 font-medium">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <Badge 
                              key={tech} 
                              className="px-3 py-1 bg-white/5 border border-white/10 text-cyan-300 hover:bg-white/10 hover:border-cyan-400/30 transition-all text-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Navigation - Mobile optimized */}
                  {(previousProject || nextProject) && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
                      <div className="sm:flex-1">
                        {previousProject && (
                          <button
                            onClick={() => goToProject(previousProject)}
                            className="flex w-full sm:w-auto items-center gap-3 text-sm text-white/70 active:text-white active:bg-white/5 transition-all group rounded-xl p-3 -m-3 sm:p-0 sm:m-0 touch-manipulation"
                          >
                            <div className="p-2 rounded-full bg-white/5 active:bg-white/10 border border-white/10 flex-shrink-0">
                              <ChevronLeft size={16} />
                            </div>
                            <div className="text-left min-w-0">
                              <div className="text-[10px] uppercase tracking-widest text-white/40">Previous</div>
                              <div className="text-white/90 truncate text-sm">{previousProject.title}</div>
                            </div>
                          </button>
                        )}
                      </div>

                      <div className="sm:flex-1 sm:text-right">
                        {nextProject && (
                          <button
                            onClick={() => goToProject(nextProject)}
                            className="flex w-full sm:w-auto sm:justify-end items-center gap-3 text-sm text-white/70 active:text-white active:bg-white/5 transition-all group rounded-xl p-3 -m-3 sm:p-0 sm:m-0 touch-manipulation"
                          >
                            <div className="text-right min-w-0 order-1 sm:order-none">
                              <div className="text-[10px] uppercase tracking-widest text-white/40">Next</div>
                              <div className="text-white/90 truncate text-sm">{nextProject.title}</div>
                            </div>
                            <div className="p-2 rounded-full bg-white/5 active:bg-white/10 border border-white/10 flex-shrink-0 order-2 sm:order-none">
                              <ChevronRight size={16} />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      , document.body)}
    </div>
  );
}