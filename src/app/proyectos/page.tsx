"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useProjects } from "@/lib/data/useProjects";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const projects = useProjects();

  return (
    <div className="container-page py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-accent">{t.projects.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.projects.title}
        </h1>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface/60 p-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-medium">{t.hero.ctaPrimary}?</p>
        <Link
          href="/#contacto"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
        >
          {t.nav.cta}
        </Link>
      </div>
    </div>
  );
}
