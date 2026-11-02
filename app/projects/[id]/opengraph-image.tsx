import { ImageResponse } from "next/og";
import { getCaseStudyProject } from "@/lib/projects";
import { OgCard, OG_SIZE } from "@/lib/og-card";

export const alt = "Project by Jacob Furtaw";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getCaseStudyProject(id);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={project ? `${project.category} Project` : "Project"}
        title={project?.title ?? "Jacob Furtaw"}
        subtitle={project?.description ?? "Agentic AI Engineer"}
        tags={project?.technologies}
      />
    ),
    size,
  );
}
