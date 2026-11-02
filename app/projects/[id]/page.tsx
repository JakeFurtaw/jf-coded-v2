import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProjects } from "@/lib/projects";
import ProjectCaseStudy from "@/components/ui/project-case-study";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === Number(id));

  if (!project) {
    return { title: "Project Not Found | Jacob Furtaw" };
  }

  const title = `${project.title} | Jacob Furtaw`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      siteName: "JFCoded",
      url: `/projects/${project.id}`,
      title,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@JFurtaw97",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === Number(id));

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
