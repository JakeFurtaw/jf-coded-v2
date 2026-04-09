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
  category: "AI/ML" | "Web";
  technologies: string[];
}

const projects: Project[] = [
    {
    id: 1,
    title: "Cloak AI",
    description: "Advanced tool using AI agent built with Nemotron Nano 3 and Ollama.",
    longDescription: "A sophisticated AI agent featuring real-time streaming responses, markdown formatted responses, code syntax highlighting and language identification, and a responsive dark theme user interface. The agent leverages Nemotron Nano 3 for advanced language processing and includes powerful tool integration for web search, weather forecasting with animated video embeds, stock market data from Yahoo Finance, currency exchange rates, and date/time information. Built with React, TypeScript, Tailwind CSS,and has a FastAPI backend. The app has persistent user specific chat history, chat management features, and a modern UI with animated elements. The system also supports document parsing using Nemotron Parse, speech-to-text transcription with Whisper, and satellite image segmentation with SAM3.",
    category: "AI/ML",
    technologies: ["Python", "Nemotron Nano 3", "Ollama", "React", "TypeScript", "FastAPI", "Tailwind CSS", "Earth 2 Studio", "GFS Weather Data", "Yahoo Finance API", "Whisper", "Nemotron Parse", "SAM3", "Tool Use", "Web Scraping", "Geocoding", "Satellite Imagery"],
    github: "https://github.com/JakeFurtaw",
  },
  {
    id: 2,
    title: "Agent Qwen",
    description: "Multi-modal AI agent designed to emulate a Geek Squad technician, capable of understanding text, images, audio, and video.",
    longDescription: "A powerful multi-modal AI agent built with Qwen 2.5-Omni that emulates a Geek Squad technician. The agent can process and respond to text, images, audio, and video inputs, making it highly effective for customer support, device troubleshooting, and interactive assistance. It features automatic speech recognition via Whisper, audio response generation with speaker selection, and a custom system prompt designed to deliver clear, professional troubleshooting reports.",
    category: "AI/ML",
    technologies: ["Python", "Qwen 2.5 Omni", "Gradio", "Multi-Modal", "Whisper", "FastRTC", "PyTorch", "Transformers"],
    github: "https://github.com/JakeFurtaw/Agent-Qwen",
  },
  {
    id: 3,
    title: "Chat RAG",
    description: "Advanced Retrieval-Augmented Generation (RAG) coding assistant with support for multiple LLMs, documents, and GitHub repositories.",
    longDescription: "Full-featured RAG pipeline built with Llama-Index and LangChain that supports chatting with documents (PDF, DOCX, etc.), GitHub repositories, and multiple vector stores (ChromaDB, Milvus, Neo4j). Features dynamic model selection across Ollama, OpenAI, Anthropic, NVIDIA NIM, and quantized Hugging Face models. Includes streaming responses, advanced memory management, custom system prompts, and GPU-aware model handling.",
    category: "AI/ML",
    technologies: ["Python", "RAG", "Llama-Index", "LangChain", "Gradio", "ChromaDB", "Milvus", "Neo4j", "Ollama", "Transformers"],
    github: "https://github.com/JakeFurtaw/Chat-RAG",
  },
  {
  id: 4,
  title: "ASTNN Mutant Classifier",
  description: "Abstract Syntax Tree Neural Network for detecting equivalent mutants in Java and C++ code.",
  longDescription: "Built and trained an Abstract Syntax Tree Neural Network (ASTNN) to identify equivalent vs. non-equivalent mutants in Java and C++ source code. The model sorts a of unlabeled dataset of equivalent and non-equivalent mutants into a labeled dataset automatically. This work aims to significantly reduce the manual effort required in mutation testing by automating equivalence detection.",
  category: "AI/ML",
  technologies: ["Python", "PyTorch", "Neural Networks", "Java", "C++", "Over/Undersampling", "Model Training & Optimization"],
  github: "https://gitlab.com/JakeFurtaw/ASTNN-COSC490",
  },
  {
    id: 5,
    title: "Image Alter",
    description: "AI-powered image generation and editing tool that lets users create and modify images using natural language prompts.",
    longDescription: "A Gradio web application for AI image generation and editing powered by Stable Diffusion. Supports text-to-image generation and image-to-image transformation using Flux models (FLUX.1-schnell and fine-tuned variants). Features customizable generation parameters, interactive image gallery, and responsive UI. Built with the Diffusers library and PyTorch for GPU-accelerated inference.",
    category: "AI/ML",
    technologies: ["Python", "Stable Diffusion", "Gradio", "Diffusers", "PyTorch", "Transformers"],
    github: "https://github.com/JakeFurtaw/ImageAlter",
  },
  {
    id: 6,
    title: "Health Bot",
    description: "Personalized AI health assistant that provides context-aware advice on fitness, nutrition, mental health, and general well-being.",
    longDescription: "An AI health assistant with user authentication and persistent per-user chat history. Built using Llama-Index for the retrieval-augmented chat engine, Hugging Face embeddings (stella_en_400M_v5), and Ollama (Mistral-Nemo) as the backend LLM. Features context-aware conversations, memory buffering, and a clean Gradio web interface for interactive health-related guidance on fitness, nutrition, mental health, and wellness.",
    category: "AI/ML",
    technologies: ["Python", "Llama-Index", "Gradio", "Ollama", "Transformers", "PyTorch"],
    github: "https://github.com/JakeFurtaw/HealthReelDemo",
  },
  {
    id: 7,
    title: "Repo Ripper",
    description: "Command-line tool that lets you chat with any GitHub repository using local Ollama LLMs.",
    longDescription: "A privacy-focused command-line tool that allows users to interact with entire GitHub repositories using local Ollama LLMs. Repo Ripper uses Llama-Index to index codebases and enables natural language queries about structure, dependencies, and functionality. Supports file filtering, conversation memory, and works entirely offline after initial setup.",
    category: "AI/ML",
    technologies: ["Python", "Llama-Index", "Ollama", "Hugging Face Embeddings", "GitHub API"],
    github: "https://github.com/JakeFurtaw/RepoRipper",
  },
  {
    id: 8,
    title: "JFCoded Portfolio Website",
    description: "This very website — a modern space-themed developer portfolio.",
    longDescription: "Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui. Features dark space theme, smooth animations, and responsive design.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/JakeFurtaw/jf-coded-v2",
    live: "https://www.jfcoded.com",
  },
  {
    id: 9,
    title: "Frontier Signal Partners Website",
    description: "Modern single page website for Frontier Signal Partners.",
    longDescription: "Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/JakeFurtaw",
    live: "https://www.fspx.ai",
  },
    // Add more projects from your old site here
];

const categories = ["All", "AI/ML", "Web"] as const;

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "AI/ML" | "Web">("All");
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
            A collection of some of my Machine Learning and Web Development projects
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