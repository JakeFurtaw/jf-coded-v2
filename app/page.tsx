"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/ui/magnetic-button";
import { getFeaturedProjects } from "@/lib/projects";

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm tracking-[2px]">
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
          <MagneticButton 
            size="lg" 
            className="group bg-cyan-400 hover:bg-cyan-300 text-black text-lg px-10 py-7 rounded-xl font-medium tracking-tight"
          >
            <a href="/projects">View My Projects</a>
            <ArrowRight className="ml-3 transition-transform group-hover:translate-x-1 group-active:translate-x-2" />
          </MagneticButton>

          <MagneticButton 
            size="lg" 
            variant="outline" 
            className="text-lg px-10 py-7 border-cyan-400/50 hover:bg-white/5 font-medium tracking-tight"
            asChild
          >
            <a href="/contact">Connect With Me</a>
          </MagneticButton>
        </div>

        {/* Social Links - Refined */}
        <div className="flex gap-6 mt-12 md:mt-16 text-cyan-400/60">
          <a 
            href="https://github.com/JakeFurtaw" 
            target="_blank" 
            className="p-3 rounded-full hover:bg-white/5 hover:text-cyan-400 active:bg-white/10 active:scale-95 transition-all touch-manipulation"
          >
            <FaGithub size={26} />
          </a>
          <a 
            href="https://linkedin.com/in/jacob-furtaw" 
            target="_blank" 
            className="p-3 rounded-full hover:bg-white/5 hover:text-cyan-400 active:bg-white/10 active:scale-95 transition-all touch-manipulation"
          >
            <FaLinkedin size={26} />
          </a>
          <a 
            href="/contact" 
            className="p-3 rounded-full hover:bg-white/5 hover:text-cyan-400 active:bg-white/10 active:scale-95 transition-all touch-manipulation"
          >
            <Mail size={26} />
          </a>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-28 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-bold tracking-tighter mb-2">Featured Projects</h2>
            <p className="text-white/50 text-lg">Selected work from the last few years</p>
          </div>
          <Button 
            asChild 
            variant="outline" 
            className="border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black whitespace-nowrap font-medium tracking-tight active:scale-[0.985] transition-all"
          >
            <a href="/projects">View All Projects →</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {getFeaturedProjects().map((p, index) => {
            const isLarge = index === 0;
            const project = {
              title: p.title,
              desc: isLarge ? p.longDescription : p.description,
              tech: p.technologies,
              image: p.images?.[0]?.src ?? null,
              link: "/projects",
              size: isLarge ? "large" : "small",
            } as const;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                className={`group ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}`}
              >
                <Card className="glass h-full overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.985] active:border-cyan-400/30 rounded-3xl flex flex-col touch-manipulation">
                  <div className={`relative ${project.size === 'large' ? 'h-64 md:h-80 lg:h-[400px]' : 'h-52'} bg-gradient-to-br from-cyan-900/50 to-purple-900/40 flex items-center justify-center border-b border-white/10 overflow-hidden`}>
                    {project.image ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <span className="text-6xl opacity-40 transition-transform duration-300 group-hover:scale-110">🧠</span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className={`font-semibold mb-3 text-white transition-all duration-200 group-hover:text-cyan-400 group-hover:tracking-[-0.02em] ${project.size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-white/70 mb-6 leading-relaxed transition-colors duration-200 group-hover:text-white/80 ${
                      project.size === 'large' ? 'text-lg md:text-xl lg:text-[21px]' : 'text-base md:text-lg'
                    }`}>
                      {project.desc}
                    </p>
                    <div className="mt-auto">
                      <div className={`flex flex-wrap mb-8 ${project.size === 'large' ? 'gap-4' : 'gap-2'}`}>
                        {project.tech.slice(0, project.size === 'large' ? 15 : 6).map((t) => (
                          <Badge
                            key={t}
                            className={`bg-white/10 text-cyan-300 border border-white/10 transition-all duration-200 group-hover:border-cyan-400/40 group-hover:bg-white/10 group-hover:text-cyan-200
                              ${project.size === 'large'
                                ? 'text-sm md:text-base px-4 md:px-6 py-1.5 md:py-2.5 font-bold tracking-wider shadow-lg shadow-cyan-500/10'
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
                        className={`w-full border-white/20 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all 
                          ${project.size === 'large' ? 'py-5 md:py-7 text-lg md:text-xl font-bold' : ''}`}
                        asChild
                      >
                        <a href={project.link}>View Project</a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}