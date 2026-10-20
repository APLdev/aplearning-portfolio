"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { CoursePreview } from "@/components/CoursePreview";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border">
      <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-accent"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[2.75rem] lg:leading-[1.08]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/#contacto"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="/proyectos"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CoursePreview />
        </div>
      </div>
    </section>
  );
}
