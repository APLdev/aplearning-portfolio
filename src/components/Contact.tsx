"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { CONTACT_EMAIL, LINKEDIN_URL, LINKEDIN_DISPLAY, WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/data/contact";

export function Contact() {
  const { t, lang } = useLanguage();

  return (
    <section id="contacto-directo" className="contact-finish border-t border-border py-14 sm:py-16">
      <div className="container-page">
        <div>
          <p className="text-sm font-medium text-accent">{t.contact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {lang === "es" ? "¿Prefieres hablar directamente?" : "Prefer to get in touch directly?"}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {lang === "es" ? "Escríbeme por el canal que te resulte más cómodo y conversemos sobre tu próximo curso." : "Choose the channel that works best for you and let’s discuss your next course."}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5h18v14H3V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-xs text-muted">{t.contact.emailLabel}</span>
                {CONTACT_EMAIL}
              </span>
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6.5 9v10M6.5 5.5v.01M11 19V9M11 13c0-2.2 1.8-4 4-4s3.5 1.8 3.5 4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-xs text-muted">{t.contact.linkedinLabel}</span>
                {LINKEDIN_DISPLAY}
              </span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3a9 9 0 0 0-7.65 13.72L3 21l4.4-1.32A9 9 0 1 0 12 3z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 8.8c.15-.6.75-1 1.35-1h.5c.3 0 .55.2.6.5l.4 1.8c.05.2 0 .45-.15.6l-.6.6c.35.9 1.2 1.75 2.1 2.1l.6-.6c.15-.15.4-.2.6-.15l1.8.4c.3.05.5.3.5.6v.5c0 .6-.4 1.2-1 1.35-2.6.6-6.1-2.9-6.7-5.5-.1-.4-.1-.8 0-1.2z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-xs text-muted">{t.contact.whatsappLabel}</span>
                {WHATSAPP_DISPLAY}
              </span>
            </a>
          </div>
        </div>


      </div>
    </section>
  );
}
