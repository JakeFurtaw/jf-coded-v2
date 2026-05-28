"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Calendar, PhoneCall } from "lucide-react";
import { FaGithub, FaLinkedin, FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen pb-24 bg-space-bg">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-6xl font-bold tracking-tighter mb-3">Let's Connect</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-[460px] mx-auto">
            Open to opportunities, collaborations, or just chatting about AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass p-10 md:p-12 border border-white/10 transition-all hover:border-white/20 group">
            <h3 className="text-xl font-semibold tracking-tight mb-6">Socials</h3>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-14 justify-start text-base border-white/15 hover:border-cyan-400/40 hover:text-cyan-400 active:scale-[0.985] transition-all touch-manipulation group" 
                asChild
              >
                <a href="https://github.com/JakeFurtaw" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-5 w-6 h-6 transition-transform group-hover:-translate-y-px group-hover:scale-110" /> GitHub
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-14 justify-start text-base border-white/15 hover:border-cyan-400/40 hover:text-cyan-400 active:scale-[0.985] transition-all touch-manipulation group" 
                asChild
              >
                <a href="https://linkedin.com/in/jacob-furtaw" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="mr-5 w-6 h-6 transition-transform group-hover:-translate-y-px group-hover:scale-110" /> LinkedIn
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-14 justify-start text-base border-white/15 hover:border-cyan-400/40 hover:text-cyan-400 active:scale-[0.985] transition-all touch-manipulation group" 
                asChild
              >
                <a href="https://x.com/JFurtaw97" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="mr-5 w-6 h-6 transition-transform group-hover:-translate-y-px group-hover:scale-110" /> X
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-14 justify-start text-base border-white/15 hover:border-cyan-400/40 hover:text-cyan-400 active:scale-[0.985] transition-all touch-manipulation group" 
                asChild
              >
                <a href="https://discord.com/users/jfurtaw" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="mr-5 w-6 h-6 transition-transform group-hover:-translate-y-px group-hover:scale-110" /> Discord
                </a>
              </Button>
            </div>
          </Card>

          {/* CONTACT INFO - Right side */}
          <Card className="glass p-10 md:p-12 border border-white/10 transition-all hover:border-white/20 group">
            <h3 className="text-xl font-semibold tracking-tight mb-6">Contact Me</h3>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex gap-5 group/item">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest uppercase mb-0.5">Email</p>
                  <a 
                    href="mailto:jfurtaw97@gmail.com" 
                    className="text-xl font-medium hover:text-cyan-400 active:text-cyan-300 transition-colors active:scale-[0.985] inline-block touch-manipulation"
                  >
                    jfurtaw97@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5 group/item">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105">
                  <PhoneCall className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest uppercase mb-0.5">Phone</p>
                  <p className="text-xl font-medium select-all">+1 (410) 533-7663</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-5 group/item">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest uppercase mb-0.5">Location</p>
                  <p className="text-xl font-medium">Baltimore, Maryland, USA</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Availability Card */}
        <Card className="glass p-10 md:p-12 border border-white/10 mt-8 transition-all hover:border-emerald-400/30 group">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 font-semibold tracking-tight text-lg mb-2">Currently Open To</p>
              <p className="text-white/80 text-[15px] leading-relaxed">
                Full-time Machine Learning / Generative AI Engineer roles,<br />
                Interesting collaborations, and conversations
              </p>
            </div>
          </div>
        </Card>

        {/* Final Note */}
        <div className="text-center mt-12 text-white/50 text-sm tracking-wide">
          <p>I typically respond within 1–2 business days.</p>
        </div>
      </div>
    </div>
  );
}