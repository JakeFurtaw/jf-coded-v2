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
      <div className="max-w-4xl mx-auto px-6 pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">Virtual Resume</h1>
          <p className="text-xl text-white/70">Jacob Furtaw — Machine Learning Engineer</p>
          
          <Button asChild size="lg" className="mt-8 bg-cyan-400 hover:bg-cyan-300 text-black">
          <a href="/Jacob_Furtaw_Resume.pdf" download="Jacob_Furtaw_Resume.pdf" className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Full CV (PDF)
          </a>
        </Button>
        </div>

        {/* Experience */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 flex items-center gap-3">
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
              >
                <Card className="glass p-8 border-white/10 hover:border-cyan-400/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold">{exp.title}</h3>
                      <p className="text-cyan-400 text-xl mt-1">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-white/60 flex-shrink-0">
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin size={18} /> {exp.location}
                      </div>
                      <div className="mt-1">{exp.period}</div>
                    </div>
                  </div>

                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-white/5 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 transition-colors"
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
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 flex items-center gap-3">
            <Cpu className="text-cyan-400" /> Skills & Technologies
          </h2>
          <div className="glass p-8 rounded-2xl border border-white/10">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  className="px-5 py-2.5 text-base bg-space-card hover:bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 transition-all hover:scale-105 whitespace-normal break-words max-w-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-3xl font-semibold mb-10 flex items-center gap-3">
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
              >
                <Card className="glass p-8 border-white/10">
                  <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                  <p className="text-cyan-400 text-xl mt-1">{edu.school}</p>
                  <div className="flex items-center gap-2 text-white/60 mt-3">
                    <MapPin size={18} /> {edu.location} • {edu.period}
                  </div>
                  {edu.details && (
                    <p className="mt-6 text-white/80 leading-relaxed">
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