"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Download, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
  const experiences = [
    {
      title: "GenAI Engineer",
      company: "Stealth AI Startup",
      location: "Baltimore, MD",
      period: "Jan 2026 – Present",
      description: "Building advanced generative AI solutions and intelligent systems.",
      technologies: ["Python", "LLMs", "Generative AI"],
    },
    {
      title: "Co-Founder & Machine Learning Engineer",
      company: "SurgePoint Software LLC",
      location: "Towson, MD",
      period: "Aug 2023 – Jan 2025",
      description: "Co-founded SurgePoint and led the development of an AI-powered student information assistant using Llama 3.1 and Mistral models. Built a custom RAG pipeline and curated a 13M-line dataset from 200M+ raw web-scraped data and documents. Implemented advanced prompt engineering to serve accurate information to over 15,000 students. Won $1,000 in the Towson StartUp Cohort.",
      technologies: ["Python", "RAG", "Llama 3.1", "Mistral", "Prompt Engineering", "LLMs", "Data Engineering"],
    },
    {
      title: "Advanced Repair Agent",
      company: "Geek Squad / Best Buy",
      location: "Towson & Owings Mills, MD",
      period: "Mar 2022 – Apr 2026",
      description: "Provided advanced technical support and repairs for computers, laptops, smartphones, and other consumer electronics. Specialized in complex diagnostics, data recovery, malware removal, and OS troubleshooting across Windows and macOS platforms. Handled escalated repairs with a focus on first-time fix rates and excellent customer service. Consistently the top preforming ARA in the micromarket averging 1.2+ tags per hour and 150%+ utilization.",
      technologies: ["Hardware Repair", "Software Troubleshooting", "Data Recovery", "Malware Removal", "Windows", "macOS", "Technical Diagnostics"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Towson University",
      location: "Towson, MD",
      period: "Jan 2022 – Dec 2023",
      details: "Software Engineering Track | Relevant coursework: Artificial Intelligence, Data Structures & Algorithms, Software Engineering, Database Management, Object-Oriented Design, Web Programming, Linear Algebra, Statistics",
    },
    {
      degree: "Associate of Arts in Computer Science",
      school: "Howard Community College",
      location: "Columbia, MD",
      period: "Aug 2019 – Dec 2021",
      details: "Relevant coursework: Computer Science I & II (C++), Discrete Mathematics, Intro to Python, Calculus I & II",
    },
  ];

const skills = [
  "Python",
  "JavaScript",
  "SQL",
  "C++",
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "Llama-Index",
  "Transformers",
  "Diffusers",
  "Gradio",
  "Ollama",
  "vLLM",
  "Llama.cpp",
  "Prompt Engineering",
  "Retrieval-Augmented Generation (RAG)",
  "Agentic AI",
  "Multi-Agent Systems",
  "Agent Tool/Skill Development & Use",
  "Model Training & Optimization",
  "Computer Vision",
  "Data Mining/Web Scraping",
  "Data Engineering",
  "Vector Databases",
  "Docker",
  "Git",
  "Hardware & Software Troubleshooting",
  "Jupyter Notebooks",
];

  return (
    <div className="min-h-screen pb-24 bg-space-bg">
      <div className="max-w-4xl mx-auto px-6 pt-12 md:pt-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-6xl font-bold tracking-tighter mb-3">Virtual Resume</h1>
          <p className="text-lg md:text-xl text-white/70">Jacob Furtaw — Machine Learning Engineer</p>
          
          <Button asChild size="lg" className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black font-medium tracking-tight active:scale-[0.985] touch-manipulation group">
          <a href="/Jacob_Furtaw_Resume.pdf" download="Jacob_Furtaw_Resume.pdf" className="flex items-center gap-2">
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
                key={index}
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
                        className="bg-white/5 text-cyan-300 border border-white/10 transition-all duration-200 group-hover:border-cyan-400/40 group-hover:bg-white/10 group-hover:text-cyan-200 active:scale-95 touch-manipulation text-sm px-3 py-1"
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
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.015, 0.4) }}
                >
                  <Badge 
                    className="px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm bg-white/5 text-cyan-300 border border-white/10 transition-all duration-200 hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-200 active:scale-95 touch-manipulation"
                  >
                    {skill}
                  </Badge>
                </motion.div>
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
                key={index}
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