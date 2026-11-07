"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function CoursePreview() {
  const { lang } = useLanguage();
  const es = lang === "es";

  return (
    <div className="w-full min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-medium">
        <span className="flex items-center gap-2 text-muted">
          <span aria-hidden className="h-2 w-2 rounded-full bg-copper" />
          {es ? "Explora distintas formas de aprender" : "Explore different ways to learn"}
        </span>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">
          {es ? "Cursos y juegos" : "Courses and games"}
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/5">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-xs">
          <span className="font-semibold">{es ? "Diversidad, equidad e inclusión" : "Diversity, equity and inclusion"}</span>
          <span className="shrink-0 text-muted">Carrefour</span>
        </div>
        <div className="relative aspect-video overflow-hidden">
            <Link
              href="/demos"
              className="group absolute inset-0 w-full focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-copper"
              aria-label={es ? "Probar demos" : "Try demos"}
            >
              <Image
                src="/projects/diversidad-equidad-inclusion/thumbnail-clean.png"
                alt={es ? "Portada del curso: celebramos nuestra diversidad" : "Course cover: celebrating our diversity"}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="scale-[1.09] object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-5 flex justify-center">
                <span className="flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform group-hover:scale-105 motion-reduce:transition-none">
                  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-accent"><path d="M5 2v12l9-6z" /></svg>
                  {es ? "Probar demos" : "Try demos"}
                </span>
              </span>
            </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-muted">
          <span>{es ? "Cursos interactivos y retos gamificados" : "Interactive courses and game-based challenges"}</span>
          <Link href="/demos" className="font-medium text-accent underline-offset-4 hover:underline">
            {es ? "Explorar ↗" : "Explore ↗"}
          </Link>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {es ? "Una muestra de cómo transformamos contenido en experiencias interactivas." : "A sample of how we turn content into interactive experiences."}{" "}
        <Link href="/proyectos/diversidad-equidad-inclusion" className="font-medium text-accent underline-offset-4 hover:underline">
          {es ? "Ver el proyecto →" : "View the project →"}
        </Link>
      </p>
    </div>
  );
}
