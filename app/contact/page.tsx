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
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Let's Connect</h1>
          <p className="text-xl text-white/70 max-w-md mx-auto">
            Open to opportunities, collaborations, or just chatting about AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SOCIAL LINKS - Now on the LEFT (more prominent) */}
          <Card className="glass p-12 border-white/10">
            <h3 className="text-2xl font-semibold mb-8">Socials</h3>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-16 justify-start text-lg border-white/20 hover:border-cyan-400 hover:text-cyan-400" 
                asChild
              >
                <a href="https://github.com/JakeFurtaw" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-5 w-6 h-6" /> GitHub
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-16 justify-start text-lg border-white/20 hover:border-cyan-400 hover:text-cyan-400" 
                asChild
              >
                <a href="https://linkedin.com/in/jacob-furtaw" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="mr-5 w-6 h-6" /> LinkedIn
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-16 justify-start text-lg border-white/20 hover:border-cyan-400 hover:text-cyan-400" 
                asChild
              >
                <a href="https://x.com/JFurtaw97" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter className="mr-5 w-6 h-6" /> X
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full h-16 justify-start text-lg border-white/20 hover:border-cyan-400 hover:text-cyan-400" 
                asChild
              >
                <a href="https://discord.com/users/jfurtaw" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="mr-5 w-6 h-6" /> Discord
                </a>
              </Button>
            </div>
          </Card>

          {/* EMAIL + LOCATION - Now on the RIGHT */}
          <Card className="glass p-12 border-white/10">
          <h3 className="text-2xl font-semibold mb-8">Contact Me</h3>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Email</p>
                  <a 
                    href="mailto:jfurtaw97@gmail.com" 
                    className="text-2xl hover:text-cyan-400 transition-colors"
                  >
                    jfurtaw97@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Phone</p>
                  <p className="text-2xl">+1 (410) 533-7663</p>
                </div>
              </div>

            <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Location</p>
                  <p className="text-2xl">Baltimore, Maryland, USA</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Availability Card */}
        <Card className="glass p-12 border-white/10 mt-8">
          <div className="flex gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 font-medium text-lg mb-2">Currently Open To</p>
              <p className="text-white/80 leading-relaxed">
                Full-time Machine Learning / Generative AI Engineer roles,<br />
                Interesting collaborations, and conversations
              </p>
            </div>
          </div>
        </Card>

        {/* Final Note */}
        <div className="text-center mt-20 text-white/60">
          <p>I typically respond within 1–2 business days.</p>
        </div>
      </div>
    </div>
  );
}