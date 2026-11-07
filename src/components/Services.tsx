"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [
  // Document -> course
  (
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2h8l5 5v15H6V2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Experience / flow
  (
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="19" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 7.5L11 16M17 7.5L13 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  // Package / SCORM
  (
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M4 7.2L12 11l8-3.8M12 11v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
];

export function Services() {
  const { t, lang } = useLanguage();
  const es = lang === "es";

  return (
    <section className="border-b border-border bg-surface/60 py-20 sm:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">{t.services.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.services.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="surface-card rounded-2xl border border-border p-7 transition-colors hover:border-accent/35"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                {ICONS[i]}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <dl className="mt-5 space-y-4 border-t border-border pt-5 text-sm leading-relaxed">
                <div><dt className="font-medium">{es ? "Qué aportas" : "What you provide"}</dt><dd className="mt-1 text-muted">{item.material}</dd></div>
                <div><dt className="font-medium">{es ? "Qué recibes" : "What you receive"}</dt><dd className="mt-1 text-muted">{item.delivery}</dd></div>
              </dl>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-accent/20 bg-accent-soft">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-accent/15 p-6 sm:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">{es ? "Tu entrega final" : "Your final delivery"}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{es ? "Un curso terminado, con todo esto incluido." : "A finished course, with all of this included."}</h3>
            </div>
            <span className="rounded-xl border border-accent/25 bg-background px-4 py-3 font-mono text-sm font-semibold text-accent">.ZIP / SCORM</span>
          </div>
          <ul className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
            {(es ? [
              { title: "Curso interactivo", text: "Tu contenido y tu marca en una experiencia funcional, empaquetada en ZIP SCORM.", icon: "M6 3h8l4 4v14H6V3zm8 0v5h4M9 13h6M9 17h4" },
              { title: "Locuciones de voz con IA", text: "Narración integrada al recorrido y revisada antes de compartir el curso contigo.", icon: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" },
              { title: "Calidad revisada", text: "Control interno de navegación, interacciones, textos y locuciones, seguido de tu revisión.", icon: "m8 12 3 3 5-6M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" },
              { title: "Acompañamiento en tu LMS", text: "Te apoyo con la carga y validamos el funcionamiento en la plataforma de tu empresa.", icon: "M3 4h18v13H3V4ZM8 21h8M12 17v4m-4-11 3 3 5-5" },
            ] : [
              { title: "Interactive course", text: "Your content and brand in a functional experience, packaged as a SCORM ZIP.", icon: "M6 3h8l4 4v14H6V3zm8 0v5h4M9 13h6M9 17h4" },
              { title: "AI voiceovers", text: "Narration integrated into the experience and reviewed before you receive the course.", icon: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" },
              { title: "Quality reviewed", text: "Internal checks on navigation, interactions, text and voiceovers, followed by your review.", icon: "m8 12 3 3 5-6M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" },
              { title: "Support on your LMS", text: "I help with uploading and we validate how the course works on your company's platform.", icon: "M3 4h18v13H3V4ZM8 21h8M12 17v4m-4-11 3 3 5-5" },
            ]).map(item => (
              <li key={item.title} className="surface-card flex gap-4 rounded-xl border border-border p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"><svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg></span>
                <div><h4 className="font-semibold">{item.title}</h4><p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
