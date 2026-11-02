import type { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Agentic AI, RAG, multimodal, and web projects by Jacob Furtaw: case studies, architecture, and source code.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
