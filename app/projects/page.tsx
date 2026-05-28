"use client";

import { useEffect, useState } from "react";
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

  const filteredProjects = projects.filter(p => {
    const categoryMatch = activeFilter === "All" || p.category === activeFilter;
    const subCategoryMatch = activeFilter === "AI/ML" && activeSubFilter !== "All" 
      ? p.subCategory?.includes(activeSubFilter) 
      : true;
    return categoryMatch && subCategoryMatch;
  });

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
                className={`px-8 py-2 rounded-full transition-all ${
                  activeFilter === category 
                    ? "bg-cyan-400 text-black" 
                    : "border-cyan-400/50 hover:border-cyan-400 hover:text-cyan-400"
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
                    className={`px-4 py-1 rounded-full text-xs transition-all ${
                      activeSubFilter === sub 
                        ? "bg-cyan-400 text-black" 
                        : "border-cyan-400/30 hover:border-cyan-400 hover:text-cyan-400 text-white/60"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
              >
              <Card 
                className="glass h-full overflow-hidden border-white/10 cursor-pointer group hover:border-cyan-400/30 transition-all"
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Image Area - Shows first image or placeholder */}
                <div className="h-48 relative bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center border-b border-white/10 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                  <Image 
                    src={project.images[0]} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  ) : (
                    <div className="text-cyan-400/30 text-6xl group-hover:scale-110 transition-transform">
                      {project.category === "AI/ML" ? "🤖" : "💻"}
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge 
                        key={tech} 
                        className="bg-white/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 px-4 py-1 text-sm transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.github && (
                      <Button size="sm" variant="outline" className="flex-1 border-white/20" asChild>
                        <a href={project.github} target="_blank" onClick={(e) => e.stopPropagation()}>
                          <FaGithub className="w-4 h-4 mr-2" /> Code
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button size="sm" className="flex-1 bg-cyan-400 text-black" asChild>
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

      {/* Fullscreen Lightbox Overlay — rendered in a portal so fixed positioning is relative to the viewport */}
      {typeof window !== "undefined" && createPortal(
      <AnimatePresence>
        {isLightboxOpen && selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4">
            {/* 1. Main Container */}
            <div className="relative w-[85%] h-[80%] flex items-center justify-center">
              
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute -top-12 -right-4 text-white/60 hover:text-white transition-colors z-20 p-2"
              >
                <X size={32} />
              </button>

              <motion.div 
                key={currentImageIndex} 
                className="relative w-full h-full flex items-center justify-center glass rounded-3xl border border-cyan-400/20 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] p-4 md:p-8"
              >
                {selectedProject.images && selectedProject.images[currentImageIndex] && (
                  <div className="relative w-full h-full">
                    <Image 
                      src={selectedProject.images[currentImageIndex]} 
                      alt={selectedProject.title}
                      fill
                      sizes="85vw"
                      priority
                      className="object-contain shadow-2xl rounded-lg"
                    />
                  </div>
                )}
              </motion.div>
              
              {/* Navigation buttons */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
      , document.body)}

      {/* Project Detail Modal — rendered in a portal so fixed positioning is relative to the viewport */}
      {typeof window !== "undefined" && createPortal(
      <AnimatePresence>
        {selectedProject && (
          /* Wrapper remains fixed to viewport for perfect centering */
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-3 sm:p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative glass max-w-5xl w-full my-auto max-h-[92vh] overflow-y-auto rounded-3xl border border-cyan-400/20 shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >

              
              {/* SINGLE Padding Container */}
              <div className="p-6 md:p-10 relative">
                {/* Close Button - positioned absolutely within the padded container */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-20"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col gap-10">
                  {/* 1. TOP-DOWN HERO LAYOUT */}
                  <div className="w-full">
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full h-full cursor-zoom-in"
                            onClick={() => setIsLightboxOpen(true)}
                          >
                            {selectedProject.images && selectedProject.images[currentImageIndex] && (
                              <Image 
                                src={selectedProject.images[currentImageIndex]} 
                                alt={selectedProject.title}
                                fill
                                sizes="(max-width: 768px) 95vw, (max-width: 1280px) 80vw, 1024px"
                                priority
                                className="object-contain"
                              />
                            )}
                          </motion.div>
                        </AnimatePresence>
                        
                        <button 
                          onClick={() => setIsLightboxOpen(true)}
                          className="absolute top-4 left-4 bg-black/60 backdrop-blur-md p-2 rounded-full text-white/70 opacity-0 group-hover:opacity-100 transition-all border border-white/10"
                        >
                          <Maximize2 size={20} />
                        </button>

                        {selectedProject.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); prevImage(); }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); nextImage(); }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <ChevronRight size={24} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 2. NARRATIVE CONTENT SECTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-3 py-1">
                          {selectedProject.category}
                        </Badge>
                        <span className="text-white/30 text-sm">•</span>
                        <span className="text-white/50 text-sm font-medium uppercase tracking-wider">Case Study</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white break-words">
                        {selectedProject.title}
                      </h2>
                      
                      <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div className="flex flex-col gap-8">
                      <div>
                        <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Links</h4>
                        <div className="flex flex-col gap-3">
                          {selectedProject.github && (
                            <Button variant="outline" className="w-full border-white/10 hover:border-cyan-400/50" asChild>
                              <a href={selectedProject.github} target="_blank"><FaGithub className="mr-2" /> Source Code</a>
                            </Button>
                          )}
                          {selectedProject.live && (
                            <Button className="w-full bg-cyan-400 text-black hover:bg-cyan-300" asChild>
                              <a href={selectedProject.live} target="_blank"><ExternalLink className="mr-2" /> Live Demo</a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <Badge key={tech} className="px-3 py-1 bg-white/5 border border-white/10 text-cyan-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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