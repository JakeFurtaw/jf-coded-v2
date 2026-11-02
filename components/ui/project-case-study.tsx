"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Maximize2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";
import { Paragraphs } from "@/components/ui/paragraphs";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { ProjectStory } from "@/components/projects/project-story";
import { useImageCarousel } from "@/lib/use-image-carousel";
import { architectures } from "@/lib/architectures";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";
import { DossierReplay } from "@/components/ui/dossier-replay";

const DOSSIER_ID = 12;

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white whitespace-nowrap">
        {children}
      </h2>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const images = project.images ?? [];
  const { index: imageIndex, setIndex: setImageIndex, next: nextImage, prev: prevImage } = useImageCarousel(images.length);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-space-bg">
      <div className="mx-auto max-w-5xl px-6 pt-10 md:pt-16 pb-28">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>All Projects</span>
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-3 py-1 text-sm">
              {project.category}
            </Badge>
            {project.subCategory?.map((s) => (
              <Badge key={s} className="bg-white/5 text-white/60 border-white/10 px-3 py-1 text-sm">
                {s}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-none mb-6">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="text-sm text-white/40 tracking-wide">
              {project.dateInfo && (
                <span>
                  {project.dateInfo.label} {project.dateInfo.value}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Button variant="outline" className="border-white/20 hover:border-cyan-400/50" asChild>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <FaGithub className="w-4 h-4 mr-2" /> Source Code
                  </a>
                </Button>
              )}
              {project.live && (
                <Button className="bg-cyan-400 text-black hover:bg-cyan-300" asChild>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.header>

        {/* Hero image */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mt-12"
          >
            <button
              type="button"
              aria-label={`View ${images[0].caption ?? project.title} fullscreen`}
              className="group relative block w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl cursor-zoom-in active:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={images[0].src}
                alt={images[0].caption ?? project.title}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                <span className="text-sm text-white/90 max-w-[75%] line-clamp-2 text-left">
                  {images[0].caption}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
                  <Maximize2 size={12} /> Expand
                </span>
              </div>
            </button>
          </motion.div>
        )}

        {/* Overview */}
        <section className="mt-16">
          <SectionHeading>Overview</SectionHeading>
          <Paragraphs
            text={project.longDescription}
            className="text-base md:text-lg leading-relaxed text-white/75 max-w-3xl"
          />
        </section>

        {/* Architecture */}
        {architectures[project.id] && (
          <section className="mt-16">
            <SectionHeading>Architecture</SectionHeading>
            <ArchitectureDiagram spec={architectures[project.id]} />
          </section>
        )}

        {/* Live replay of a recorded run (Dossier) */}
        {project.id === DOSSIER_ID && (
          <section className="mt-16">
            <SectionHeading>Watch It Run</SectionHeading>
            <p className="text-base md:text-lg leading-relaxed text-white/55 max-w-3xl mb-8">
              A replay of a real local run, rebuilt from its saved trace: the planner fans out three researchers, an
              evaluator fails one and it is retried, a follow-up researcher closes the gap, and the citation audit
              checks every source in the final answer.
            </p>
            <DossierReplay />
          </section>
        )}

        {/* The Build */}
        {project.story && (
          <section className="mt-16">
            <SectionHeading>The Build</SectionHeading>
            <ProjectStory story={project.story} />
          </section>
        )}

        {/* Capabilities — agent tools + bundled skills */}
        {(project.tools?.length || project.skills?.length) && (
          <section className="mt-16">
            <SectionHeading>Capabilities</SectionHeading>
            <p className="text-base md:text-lg leading-relaxed text-white/55 max-w-3xl mb-10">
              The full set of tools the agent can call, and the bundled skill playbooks it loads on demand.
            </p>

            {project.tools && project.tools.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-lg font-semibold text-white whitespace-nowrap">Agent Tools</h3>
                  <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-2.5 py-0.5 text-xs">
                    {project.tools.length}
                  </Badge>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.tools.map((t) => (
                    <div key={t.name} className="glass rounded-xl p-4 transition-colors hover:border-cyan-400/40">
                      <code className="block text-sm font-semibold text-cyan-300 font-mono mb-1.5">{t.name}</code>
                      <p className="text-sm text-white/75 leading-snug">{t.usedFor}</p>
                      {t.notes && <p className="text-xs text-white/40 leading-snug mt-1.5">{t.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.skills && project.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-lg font-semibold text-white whitespace-nowrap">Bundled Skills</h3>
                  <Badge className="bg-cyan-400/10 text-cyan-400 border-cyan-400/30 px-2.5 py-0.5 text-xs">
                    {project.skills.length}
                  </Badge>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.skills.map((s) => (
                    <div key={s.name} className="glass rounded-xl p-4 transition-colors hover:border-cyan-400/40">
                      <code className="block text-sm font-semibold text-cyan-300 font-mono mb-1.5">{s.name}</code>
                      <p className="text-sm text-white/75 leading-snug mb-2">{s.usedFor}</p>
                      {s.workflow && (
                        <p className="text-xs text-white/40 leading-relaxed font-mono">{s.workflow}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
        {/* More screenshots */}
        {images.length > 1 && (
          <section className="mt-16">
            <SectionHeading>Screenshots</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.slice(1).map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i + 1)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 active:opacity-95"
                >
                  <Image
                    src={img.src}
                    alt={img.caption ?? `Screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute bottom-3 left-4 right-4 text-left text-sm text-white/85 line-clamp-2">
                    {img.caption}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Technologies */}
        <section className="mt-16">
          <SectionHeading>Technologies</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge
                key={t}
                className="px-3 py-1.5 bg-white/5 border border-white/10 text-cyan-300 text-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all"
              >
                {t}
              </Badge>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/50 text-base md:text-lg">
            Want to talk about building something like this?
          </p>
          <Button asChild className="bg-cyan-400 text-black hover:bg-cyan-300">
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </div>

      <ImageLightbox
        images={images}
        index={imageIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onNext={nextImage}
        onPrev={prevImage}
        title={project.title}
      />
    </div>
  );
}
