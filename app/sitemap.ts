import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/resume", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Only projects with a dedicated case study page are linked from the site.
  const caseStudies = caseStudyProjects.map((p) => ({
    url: `${SITE_URL}/projects/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...caseStudies];
}
