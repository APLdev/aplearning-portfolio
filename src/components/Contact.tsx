"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { CONTACT_EMAIL, LINKEDIN_URL, LINKEDIN_DISPLAY, WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/data/contact";

type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function SubmitButton({ label, pendingLabel, pending }: { label: string; pendingLabel: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function Contact() {
  const { t } = useLanguage();
  const [state, setState] = useState<ContactFormState>({ status: "idle" });
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setState({
        status: "error",
        message: "La configuración de envío no está disponible. Intenta nuevamente en unos minutos.",
      });
      return;
    }

    setPending(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          access_key: accessKey,
          subject: "Nueva solicitud desde APLearning",
          from_name: payload.name,
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string; body?: { message?: string } };

      if (response.ok && result.success) {
        form.reset();
        setState({ status: "success" });
        return;
      }

      setState({
        status: "error",
        message: result.message ?? result.body?.message ?? "El servicio de envío rechazó la solicitud. Intenta nuevamente.",
      });
    } catch {
      setState({
        status: "error",
        message: "No se pudo conectar con el servicio de envío. Intenta nuevamente.",
      });
    } finally {
      setPending(false);
    }
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-surface/50 p-7 sm:p-8"
        >
          {state.status === "success" ? (
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
              {state.status === "error" && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <p className="text-sm font-medium text-red-500">{t.contact.formErrorTitle}</p>
                  <p className="mt-1 text-sm text-muted">
                    {state.message ?? t.contact.formErrorBody}
                  </p>
                </div>
              )}
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
              <SubmitButton label={t.contact.formSubmit} pendingLabel={t.contact.formSubmitting} pending={pending} />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
