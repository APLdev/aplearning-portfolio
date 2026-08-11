"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ICONS = [
  // hard hat — SST y medio ambiente
  <g key="0" {...STROKE}>
    <path d="M3.5 17.5h17" />
    <path d="M6.5 17.5a5.5 5.5 0 0111 0" />
    <path d="M9.6 7.2V4.6a.6.6 0 01.6-.6h3.6a.6.6 0 01.6.6v2.6" />
  </g>,
  // balance scale — compliance
  <g key="1" {...STROKE}>
    <path d="M12 6v14M8.5 20h7M4 8l8-2 8 2" />
    <path d="M4 8l-2 5h4l-2-5zM20 8l-2 5h4l-2-5z" />
  </g>,
  // people — gestión de personas
  <g key="2" {...STROKE}>
    <path d="M9.5 11.2a3.3 3.3 0 100-6.6 3.3 3.3 0 000 6.6z" />
    <path d="M3 20c0-3.5 2.9-5.8 6.5-5.8s6.5 2.3 6.5 5.8" />
    <path d="M17 5.6a3 3 0 010 5.4M18.8 14.6c1.8.7 2.9 2.3 2.9 4.2" />
  </g>,
  // connected community — cultura y diversidad
  <g key="3" {...STROKE}>
    <path d="M12 7.6a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6zM5.6 20.4a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6zM18.4 20.4a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6z" />
    <path d="M10.4 9.2L7.2 14.9M13.6 9.2l3.2 5.7M8.1 18.1h7.8" />
  </g>,
  // padlock — seguridad de la información
  <g key="4" {...STROKE}>
    <path d="M7 10.5V7.8a5 5 0 0110 0v2.7" />
    <path d="M5.5 10.5h13v9.5h-13z" />
    <path d="M12 14.3v2.3" />
  </g>,
  // cloud — cloud y datos
  <g key="5" {...STROKE}>
    <path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" />
  </g>,
  // gear — operaciones
  <g key="6" {...STROKE}>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M18.7 14.6a1.5 1.5 0 00.3 1.7l.1.1a1.8 1.8 0 11-2.6 2.6l-.1-.1a1.5 1.5 0 00-1.7-.3 1.5 1.5 0 00-.9 1.4v.3a1.8 1.8 0 11-3.6 0v-.2a1.5 1.5 0 00-1-1.4 1.5 1.5 0 00-1.7.3l-.1.1a1.8 1.8 0 11-2.6-2.6l.1-.1a1.5 1.5 0 00.3-1.7 1.5 1.5 0 00-1.4-.9h-.3a1.8 1.8 0 110-3.6h.2a1.5 1.5 0 001.4-1 1.5 1.5 0 00-.3-1.7l-.1-.1a1.8 1.8 0 112.6-2.6l.1.1a1.5 1.5 0 001.7.3h.1a1.5 1.5 0 00.9-1.4v-.3a1.8 1.8 0 113.6 0v.2a1.5 1.5 0 00.9 1.4 1.5 1.5 0 001.7-.3l.1-.1a1.8 1.8 0 112.6 2.6l-.1.1a1.5 1.5 0 00-.3 1.7v.1a1.5 1.5 0 001.4.9h.3a1.8 1.8 0 110 3.6h-.2a1.5 1.5 0 00-1.4.9z" />
  </g>,
  // cutlery — inocuidad alimentaria
  <g key="7" {...STROKE}>
    <path d="M3.5 2.5v6a2 2 0 002 2h3.5a2 2 0 002-2v-6" />
    <path d="M7.2 2.5v19" />
    <path d="M20.5 14.5v-12a5 5 0 00-5 5v5a2 2 0 002 2h3zm0 0v7" />
  </g>,
];

type Props = {
  /** "section" for the home page (full-width band); "inline" inside an existing container. */
  variant?: "section" | "inline";
};

export function Expertise({ variant = "section" }: Props) {
  const { t } = useLanguage();

  // On the projects page the H1 sits right above this block, so the full
  // eyebrow + heading would read as a second competing title. Render a
  // compact topic strip instead.
  if (variant === "inline") {
    return (
      <div className="mt-10">
        <p className="text-sm leading-relaxed text-muted">
          {t.expertise.subtitle}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
          {t.expertise.items.map((item, i) => (
            <motion.span
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-2 rounded-2xl border border-border bg-surface/50 px-4 py-2 text-sm font-medium sm:rounded-full"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-accent"
              >
                {ICONS[i]}
              </svg>
              {item.label}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">{t.expertise.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.expertise.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t.expertise.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.expertise.items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="rounded-xl border border-border bg-surface/50 px-5 py-5 transition-colors hover:bg-surface"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  {ICONS[i]}
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold tracking-tight">
                {item.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
