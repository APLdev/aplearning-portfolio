"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useProject } from "@/lib/data/useProjects";
import { ProjectMockup } from "@/components/ProjectMockup";
import type { MockupVariant } from "@/lib/data/projects";

function VideoPlaceholder({ label, from, to }: { label: string; from: string; to: string }) {
  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-accent shadow-md backdrop-blur">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <span className="absolute bottom-3 right-3 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white">
        {label}
      </span>
    </div>
  );
}

const ACCENT_HEX: Record<string, { from: string; to: string }> = {
  indigo: { from: "#4338ee", to: "#7c74ff" },
  emerald: { from: "#0f9f6e", to: "#34d399" },
  amber: { from: "#d97706", to: "#fbbf24" },
  violet: { from: "#7c3aed", to: "#c084fc" },
};

export function ProjectDetail({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const project = useProject(slug);

  if (!project) return null;

  const galleryVariants: MockupVariant[] = [1, 2, 3, 4];
  const hex = ACCENT_HEX[project.accent];

  return (
    <article className="py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.projects.backToProjects}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {t.projects.client}: {project.client}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {project.images?.length ? (
          <>
            <section className="mt-12 overflow-hidden rounded-xl border border-border bg-surface">
              <Image
                src={project.images[0].src}
                alt={project.title}
                width={project.images[0].w}
                height={project.images[0].h}
                className="w-full object-contain"
              />
            </section>

            {project.images.length > 1 && (
              <section className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  {t.projects.galleryTitle}
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {project.images.slice(1).map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-xl border border-border bg-surface"
                    >
                      <Image
                        src={image.src}
                        alt={project.title}
                        width={image.w}
                        height={image.h}
                        className="w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <section className="mt-12">
              <VideoPlaceholder label={t.projects.videoPlaceholder} from={hex.from} to={hex.to} />
            </section>

            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {t.projects.galleryTitle}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {galleryVariants.map((variant) => (
                  <ProjectMockup key={variant} accent={project.accent} variant={variant} />
                ))}
              </div>
            </section>
          </>
        )}

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t.projects.challengeTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/85">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t.projects.solutionTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/85">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {t.projects.techTitle}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
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
    </article>
  );
}
