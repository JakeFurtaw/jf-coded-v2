"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin} from 'react-icons/fa';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle Nebula Background */}
      <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(157,78,221,0.12)_0%,transparent_50%),radial-gradient(at_70%_60%,rgba(0,245,255,0.12)_0%,transparent_50%)]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">
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
          Crafting intelligent AI systems that push the boundaries of what&apos;s possible — 
          where AI meets the cosmos.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="group bg-cyan-400 hover:bg-cyan-300 text-black text-lg px-10 py-7 rounded-xl">
            Explore My Work
            <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-10 py-7 border-cyan-400/50 hover:bg-white/5"
            asChild
          >
            <a href="/projects">View Projects</a>
          </Button>
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cyan-400/50 text-sm tracking-widest flex flex-col items-center"
      >
        SCROLL TO EXPLORE
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent mt-3" />
      </motion.div>
    </div>
  );
}