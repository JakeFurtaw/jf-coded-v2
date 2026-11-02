import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";

const SITE_URL = "https://www.jfcoded.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/resume", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Only projects with a dedicated case study page are linked from the site.
  const caseStudies = allProjects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...pages, ...caseStudies];
}
