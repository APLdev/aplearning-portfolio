import type { MetadataRoute } from "next";
import { projectsMeta } from "@/lib/data/projects";

const siteUrl = "https://adrianpalomino.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/proyectos",
    "/demos",
    ...projectsMeta.map((project) => `/proyectos/${project.slug}`),
  ];

  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
