"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { FaGithub} from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image?: string; // We'll add real images later
  github?: string;
  live?: string;
  category: "AI/ML" | "Web" | "Full Stack";
  technologies: string[];
}

const projects: Project[] = [
    {
    id: 1,
    title: "Cloak AI",
    description: "Advanced AI agent built with Qwen models and custom tools.",
    longDescription: "A powerful autonomous agent capable of complex reasoning and tool usage. Features multi-step planning and integration with external APIs.",
    category: "AI/ML",
    technologies: ["Python", "Nemotron", "FastAPI", "Tool Use"],
    github: "https://github.com/JakeFurtaw", // update if needed
  },
    {
    id: 2,
    title: "Agent Qwen",
    description: "A powerful Multi-Modal AI agent designed to emulate a Geek Squad Agent.",
    longDescription: "A powerful Multi-Modal AI agent designed to emulate a Geek Squad Agent.",
    category: "AI/ML",
    technologies: ["Python", "Qwen 2.5 Omni", "Gradio", "Multi-Modal"],
    github: "https://github.com/JakeFurtaw/Agent-Qwen", // update if needed
  },
  {
    id: 3,
    title: "Chat RAG",
    description: "Retrieval-Augmented Generation chat system with custom knowledge base.",
    longDescription: "Full-featured RAG pipeline that allows users to chat with their own documents. Includes document upload, vector embeddings, and real-time retrieval.",
    category: "AI/ML",
    technologies: ["Python", "RAG", "LangChain", "Pinecone"],
    github: "https://github.com/JakeFurtaw/Chat-RAG", // replace with real link
  },
  {
    id: 4,
    title: "Image Alter",
    description: "AI-powered image editing and generation tool.",
    longDescription: "Web application that lets users modify images using natural language instructions powered by state-of-the-art vision-language models.",
    category: "AI/ML",
    technologies: ["Python", "Stable Diffusion", "React", "FastAPI"],
    github: "https://github.com/JakeFurtaw/ImageAlter",
  },
  // Add more projects from your old site here
  {
    id: 5,
    title: "JFCoded: My Developer Portfolio",
    description: "This very website — a modern space-themed developer portfolio.",
    longDescription: "Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui. Features dark space theme, smooth animations, and responsive design.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/JakeFurtaw/JFCoded",
    live: "https://www.jfcoded.com",
  },
    {
    id: 6,
    title: "Frontier Signal Partners Website",
    description: "Modern single page website for Frontier Signal Partners.",
    longDescription: "Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/JakeFurtaw",
    live: "https://www.fspx.ai",
  },
];

const categories = ["All", "AI/ML", "Web", "Full Stack"] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "AI/ML" | "Web" | "Full Stack">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pb-24 bg-space-bg">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Projects</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A collection of some of the Machine Learning and Web Development projects I&apos;ve built
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card 
                className="glass h-full overflow-hidden border-white/10 cursor-pointer group hover:border-cyan-400/30 transition-all"
                onClick={() => setSelectedProject(project)}
                >
                {/* Placeholder Image Area */}
                <div className="h-48 bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center border-b border-white/10">
                  <div className="text-cyan-400/30 text-6xl group-hover:scale-110 transition-transform">
                    {project.category === "AI/ML" ? "🤖" : "💻"}
                  </div>
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
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass max-w-3xl w-full max-h-[90vh] overflow-auto rounded-3xl border border-white/10"
            >
              <div className="p-10 relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 text-white/60 hover:text-white"
                >
                  <X size={28} />
                </button>

                <h2 className="text-4xl font-bold mb-6">{selectedProject.title}</h2>
                <p className="text-xl text-white/80 leading-relaxed mb-10">
                  {selectedProject.longDescription}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    {selectedProject.technologies.map((tech) => (
                        <Badge 
                        key={tech} 
                        className="px-6 py-2.5 text-base bg-white/10 border border-cyan-400/40 text-cyan-300"
                        >
                        {tech}
                        </Badge>
                    ))}
                    </div>

                <div className="flex gap-4">
                  {selectedProject.github && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={selectedProject.github} target="_blank">
                        <FaGithub className="mr-2" /> View Source Code
                      </a>
                    </Button>
                  )}
                  {selectedProject.live && (
                    <Button size="lg" className="bg-cyan-400 text-black" asChild>
                      <a href={selectedProject.live} target="_blank">
                        <ExternalLink className="mr-2" /> Visit Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}