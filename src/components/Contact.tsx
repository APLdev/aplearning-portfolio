"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { CONTACT_EMAIL, LINKEDIN_URL, LINKEDIN_DISPLAY } from "@/lib/data/contact";

export function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  // Placeholder handler: no data is sent anywhere yet.
  // Wire this to Formspree, Web3Forms, or your own API route before launch.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contacto" className="py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-medium text-accent">{t.contact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t.contact.subtitle}
          </p>

          <div className="mt-8 space-y-3">
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
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-surface/50 p-7 sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-start gap-3 py-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">{t.contact.formSuccessTitle}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {t.contact.formSuccessBody}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    {t.contact.formName}
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    {t.contact.formCompany}
                  </span>
                  <input
                    name="company"
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">
                  {t.contact.formEmail}
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">
                  {t.contact.formMessage}
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
              >
                {t.contact.formSubmit}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
