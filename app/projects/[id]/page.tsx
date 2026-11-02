import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudyProjects, getCaseStudyProject } from "@/lib/projects";
import { AUTHOR, SITE_NAME, X_HANDLE } from "@/lib/site";
import ProjectCaseStudy from "@/components/ui/project-case-study";

interface Props {
  params: Promise<{ id: string }>;
}

/** Only projects with a case study get a page; every other id is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getCaseStudyProject((await params).id);
  if (!project) return { title: "Project Not Found" };

  // Social cards don't use the title template, so they get the full title.
  const socialTitle = `${project.title} | ${AUTHOR}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      url: `/projects/${project.id}`,
      title: socialTitle,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      creator: X_HANDLE,
      title: socialTitle,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const project = getCaseStudyProject((await params).id);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
