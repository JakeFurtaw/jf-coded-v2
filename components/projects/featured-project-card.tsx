"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Homepage featured card. The first ("large") card spans two columns and two rows on md+. */
export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const large = index === 0;
  const cover = project.images?.[0];
  const href = project.caseStudy ? `/projects/${project.id}` : "/projects";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={cn("group", large ? "md:col-span-2 md:row-span-2" : "md:col-span-1")}
    >
      <Card className="glass flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 touch-manipulation group-hover:border-cyan-400/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] active:scale-[0.985] active:border-cyan-400/30">
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-900/50 to-purple-900/40",
            large ? "h-64 md:h-auto md:min-h-[400px] md:flex-1" : "h-52",
          )}
        >
          {cover ? (
            <>
              <Image
                src={cover.src}
                alt=""
                fill
                sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                preload={index === 0}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </>
          ) : (
            <span aria-hidden className="text-6xl opacity-40 transition-transform duration-300 group-hover:scale-110">
              🧠
            </span>
          )}
        </div>

        <div className={cn("flex flex-col p-6", !large && "flex-grow")}>
          <h3
            className={cn(
              "mb-3 font-semibold text-white transition-all duration-200 group-hover:tracking-[-0.02em] group-hover:text-cyan-400",
              large ? "text-3xl" : "text-2xl",
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "mb-6 leading-relaxed text-white/70 transition-colors duration-200 group-hover:text-white/80",
              large ? "text-lg md:text-xl lg:text-[21px]" : "text-base md:text-lg",
            )}
          >
            {project.description}
          </p>
          <div className="mt-auto">
            <div className="mb-8 flex flex-wrap gap-2">
              {project.technologies.slice(0, large ? 8 : 6).map((tech) => (
                <Badge
                  key={tech}
                  variant="tech"
                  className={cn(
                    "bg-white/10 transition-all duration-200 group-hover:border-cyan-400/40 group-hover:text-cyan-200",
                    large ? "px-3.5" : "text-xs",
                  )}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size={large ? "lg" : "sm"}
              className={cn(
                "w-full border-white/20 transition-all group-hover:border-cyan-400 group-hover:text-cyan-400",
                large && "text-base font-semibold",
              )}
              asChild
            >
              <Link href={href}>{project.caseStudy ? "Read Case Study" : "View Project"}</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
