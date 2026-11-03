"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/ui/magnetic-button";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { getFeaturedProjects } from "@/lib/projects";
import { SITE_TAGLINE, SOCIALS } from "@/lib/site";

const socialIconClass =
  "p-3 rounded-full hover:bg-white/5 hover:text-cyan-400 active:bg-white/10 active:scale-95 transition-all touch-manipulation";

/**
 * Homepage credibility strip. Every figure is backed by a source; update them here.
 * - 15K+: SurgePoint / My Campus Hubs assistant (resume, lib/projects.ts)
 * - 460+: Cloak AI test suite (204 Python + ~260 TypeScript tests)
 * - 25+: Chat RAG GitHub stars (26 as of Nov 2026)
 * - 3+ yrs: building with LLMs since Aug 2023
 */
const credibility = [
  { value: "15K+", label: "Students served by a production RAG assistant" },
  { value: "460+", label: "Automated tests on Cloak AI" },
  { value: "25+", label: "GitHub stars on Chat RAG" },
  { value: "3+ yrs", label: "Shipping LLM systems" },
];

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
            🚀 AGENTIC AI ENGINEER
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
          {SITE_TAGLINE}
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4">
          <MagneticButton
            size="lg"
            asChild
            className="group text-lg px-10 py-7 rounded-xl font-medium tracking-tight"
          >
            <Link href="/projects">
              View My Projects
              <ArrowRight className="ml-3 transition-transform group-hover:translate-x-1 group-active:translate-x-2" />
            </Link>
          </MagneticButton>

          <MagneticButton 
            size="lg" 
            variant="outline" 
            className="text-lg px-10 py-7 border-cyan-400/50 hover:bg-white/5 font-medium tracking-tight"
            asChild
          >
            <Link href="/contact">Connect With Me</Link>
          </MagneticButton>
        </div>

        {/* Social links */}
        <div className="flex gap-6 mt-12 md:mt-16 text-cyan-400/60">
          {[SOCIALS.github, SOCIALS.linkedin].map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={socialIconClass}
            >
              <Icon size={26} />
            </a>
          ))}
          <Link href="/contact" aria-label="Contact me" className={socialIconClass}>
            <Mail size={26} />
          </Link>
        </div>

        {/* Credibility strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="glass mt-12 grid w-full max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 md:grid-cols-4"
        >
          {credibility.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse items-center justify-end gap-1 px-4 py-5 text-center md:py-6 ${
                i % 2 === 1 ? "border-l border-white/10" : ""
              } ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""} ${
                i === 2 ? "md:border-l md:border-white/10" : ""
              }`}
            >
              <dt className="text-xs leading-snug text-white/55 md:text-sm">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>
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
            <Link href="/projects">View All Projects →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {getFeaturedProjects().map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}