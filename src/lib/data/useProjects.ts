"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { projectsMeta, type ProjectMeta } from "@/lib/data/projects";

export interface Project extends ProjectMeta {
  title: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  tags: readonly string[];
}

export function useProjects(): Project[] {
  const { t } = useLanguage();

  return projectsMeta.map((meta) => {
    const copy = t.projects.items[meta.slug as keyof typeof t.projects.items];
    return { ...meta, ...copy };
  });
}

export function useProject(slug: string): Project | undefined {
  return useProjects().find((p) => p.slug === slug);
}
