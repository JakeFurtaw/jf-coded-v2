"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Download, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, experiences, skills } from "@/lib/resume";
import { AUTHOR, RESUME_FILENAME, RESUME_PATH, ROLE } from "@/lib/site";

export default function ResumeClient() {
  return (
    <div className="min-h-screen pb-24 bg-space-bg">
      <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-6xl font-bold tracking-tighter mb-3">Virtual Resume</h1>
          <p className="text-lg md:text-xl text-white/70">{AUTHOR} — {ROLE}</p>
          
          <Button asChild size="lg" className="mt-6 font-medium tracking-tight touch-manipulation group">
            <a href={RESUME_PATH} download={RESUME_FILENAME} className="flex items-center gap-2">
              <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              Download Full CV (PDF)
            </a>
          </Button>
        </div>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 flex items-center gap-3">
            <Calendar className="text-cyan-400" /> Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="glass p-6 md:p-8 border border-white/10 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.985] active:border-cyan-400/30 touch-manipulation">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-5">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight">{exp.title}</h3>
                      <p className="text-cyan-400 text-lg mt-0.5 tracking-tight">{exp.company}</p>
                    </div>
                    <div className="text-right text-xs md:text-sm text-white/60 flex-shrink-0">
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin size={16} className="md:size-[18px]" /> {exp.location}
                      </div>
                      <div className="mt-0.5">{exp.period}</div>
                    </div>
                  </div>

                  <p className="text-base md:text-lg text-white/80 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="tech"
                        className="transition-all duration-200 group-hover:border-cyan-400/40 group-hover:bg-white/10 group-hover:text-cyan-200 active:scale-95 touch-manipulation"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills & Technologies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 flex items-center gap-3">
            <Cpu className="text-cyan-400" /> Skills & Technologies
          </h2>
          <div className="glass p-6 md:p-8 rounded-2xl border border-white/10">
            <div className="space-y-8">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <h3 className="text-lg font-medium text-cyan-400 mb-4">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.015, 0.4) }}
                      >
                        <Badge
                          variant="tech"
                          className="text-xs md:px-4 md:py-1.5 md:text-sm transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-200 active:scale-95 touch-manipulation"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-3xl font-bold tracking-tighter mb-8 flex items-center gap-3">
            <Award className="text-cyan-400" /> Education
          </h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <Card className="glass p-6 md:p-8 border border-white/10 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.985] active:border-cyan-400/30 touch-manipulation">
                  <h3 className="text-2xl font-semibold tracking-tight">{edu.degree}</h3>
                  <p className="text-cyan-400 text-lg mt-0.5 tracking-tight">{edu.school}</p>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-white/60 mt-2.5">
                    <MapPin size={16} className="md:size-[18px]" /> {edu.location} • {edu.period}
                  </div>
                  {edu.details && (
                    <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}