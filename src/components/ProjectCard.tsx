"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ProjectMockup } from "@/components/ProjectMockup";
import type { Project } from "@/lib/data/useProjects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      {project.images?.length ? (
        <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface">
          <Image
            src={project.thumbnail ?? project.images[0].src}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <ProjectMockup accent={project.accent} variant={project.mockup} className="rounded-none border-0 border-b" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {project.client}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <Link
          href={`/proyectos/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-strong"
        >
          {t.projects.viewProject}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
