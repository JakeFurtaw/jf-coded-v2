"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/ui/magnetic-button";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-space-bg">

      {/* Subtle Nebula Background */}
      <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(157,78,221,0.12)_0%,transparent_50%),radial-gradient(at_70%_60%,rgba(0,245,255,0.12)_0%,transparent_50%)]" />

      {/* HERO SECTION */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm tracking-widest">
            🚀 MACHINE LEARNING ENGINEER
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-7xl md:text-8xl font-bold tracking-tighter mb-6"
        >
          Jacob Furtaw
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="max-w-2xl text-2xl md:text-3xl text-white/80 mb-12"
        >
          Crafting intelligent AI systems that push the boundaries of what&apos;s possible.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4">
          <MagneticButton size="lg" className="group bg-cyan-400 hover:bg-cyan-300 text-black text-lg px-10 py-7 rounded-xl">
            <a href="/projects">View My Projects</a>
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton 
            size="lg" 
            variant="outline" 
            className="text-lg px-10 py-7 border-cyan-400/50 hover:bg-white/5"
            asChild
          >
            <a href="/contact">Connect With Me</a>
          </MagneticButton>
        </div>

        {/* Social Links */}
        <div className="flex gap-8 mt-20 text-cyan-400/70">
          <a href="https://github.com/JakeFurtaw" target="_blank" className="hover:text-cyan-400 transition-colors">
            <FaGithub size={28} />
          </a>
          <a href="https://linkedin.com/in/jacob-furtaw" target="_blank" className="hover:text-cyan-400 transition-colors">
            <FaLinkedin size={28} />
          </a>
          <a href="/contact" className="hover:text-cyan-400 transition-colors">
            <Mail size={28} />
          </a>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-28 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-bold tracking-tighter mb-3">Featured Projects</h2>
          </div>
          <Button 
            asChild 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black whitespace-nowrap"
          >
            <a href="/projects">View All Projects →</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Cloak AI",
              desc: "A privacy-first, locally-hosted AI powerhouse designed for secure, sophisticated task automation. Cloak AI leverages Nemotron Nano 3 via Ollama to provide advanced language processing without data ever leaving the local environment. Built with a FastAPI backend and React frontend, it features real-time response streaming, persistent local history, and an expansive toolset—ranging from Yahoo Finance and GFS weather data to high-end multimodal capabilities like Whisper transcription and SAM3 satellite image segmentation. Experience the power of a modern AI agent with the security of a closed-loop system.",
              tech: ["Python", "Nemotron Nano 3", "Ollama", "React", "TypeScript", "FastAPI", "Tailwind CSS", "Earth 2 Studio", "GFS Weather Data", "Yahoo Finance API", "Whisper", "Nemotron Parse", "SAM3", "Tool Use", "Web Scraping", "Geocoding", "Satellite Imagery"],
              image: "/projectImages/Cloak/ChatPage.png",
              link: "/projects",
              size: "large"
            },
            {
              title: "Agent Qwen",
              desc: "Multi-modal AI agent designed to emulate a Geek Squad Consultation Agent.",
              tech: ["Python", "Qwen 2.5 Omni", "Gradio", "Multi-Modal", "Whisper", "FastRTC", "PyTorch", "Transformers"],
              image: "/projectImages/AgentQwen/StartScreen.png",
              link: "/projects",
              size: "small"
            },
            {
              title: "Chat RAG",
              desc: "RAG powered coding AI assistant with support for multiple LLMs from multiple providers. Supports local and API inference.",
              tech: ["Python", "RAG", "Llama-Index", "LangChain", "Gradio", "ChromaDB", "Milvus", "Neo4j", "Ollama", "Transformers"],
              image: "/projectImages/Chat-RAG/start_state.png",
              link: "/projects",
              size: "small"
            }
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}`}
            >
              <Card className="glass h-full overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all rounded-3xl flex flex-col">
                <div className={`relative ${project.size === 'large' ? 'h-80 md:h-[400px]' : 'h-52'} bg-gradient-to-br from-cyan-900/50 to-purple-900/40 flex items-center justify-center border-b border-white/10 overflow-hidden`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">🧠</span>
                  )}
                </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`font-semibold mb-3 group-hover:text-cyan-400 transition-colors ${project.size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                      {project.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6 text-xl leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Pushes content to the bottom */}
                    <div className="mt-auto"> 
                      <div className={`flex flex-wrap mb-8 ${project.size === 'large' ? 'gap-4' : 'gap-2'}`}>
                        {project.tech.slice(0, project.size === 'large' ? 15 : 6).map((t) => (
                          <Badge 
                            key={t} 
                            className={`bg-white/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 transition-all duration-300
                              ${project.size === 'large' 
                                ? 'text-base px-6 py-2.5 font-bold tracking-wider shadow-lg shadow-cyan-500/10 hover:scale-105' 
                                : 'text-xs px-3 py-1 font-medium'
                              }`}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size={project.size === 'large' ? "lg" : "sm"} 
                        className={`w-full border-white/20 hover:border-cyan-400 hover:text-cyan-400 
                          ${project.size === 'large' ? 'py-7 text-xl font-bold' : ''}`} 
                        asChild
                      >
                        <a href={project.link}>View Project</a>
                      </Button>
                    </div>
                  </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}