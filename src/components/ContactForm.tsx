"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { getDemo } from "@/lib/data/demos";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { WHATSAPP_URL } from "@/lib/data/contact";

function DemoReference() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const demo = getDemo(searchParams.get("demo") ?? "");
  if (!demo) return null;
  return (
    <div className="rounded-xl bg-accent-soft p-3 text-sm text-accent">
      {lang === "es" ? "Te interesa: " : "You're interested in: "}{demo.title[lang]}
      <input type="hidden" name="demo" value={demo.title.es} />
    </div>
  );
}

export function ContactForm() {
  const { lang, t } = useLanguage();
  const es = lang === "es";
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      return;
    }
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus("pending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          access_key: accessKey,
          subject: "Nueva solicitud desde APLearning",
          from_name: "APLearning · Consulta de proyecto",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div id="contacto" className="surface-card w-full scroll-mt-24 rounded-3xl border border-accent/15 p-6 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">{es ? "Hablemos de tu proyecto" : "Let's talk about your project"}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{es ? "¿Qué necesitas convertir en un curso?" : "What would you like to turn into a course?"}</h2>
      <p id="contact-response" className="mt-3 text-sm leading-relaxed text-muted">{es ? "Te responderé en menos de 24 horas hábiles." : "I'll get back to you within 24 business hours."}</p>
      {status === "success" ? (
        <div role="status" className="mt-6 rounded-xl border border-accent/25 bg-accent-soft p-5">
          <h3 className="font-semibold text-accent">{t.contact.formSuccessTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed">{t.contact.formSuccessBody}</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-accent underline underline-offset-4">{es ? "Enviar otra consulta" : "Send another enquiry"}</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-describedby="contact-response" aria-busy={status === "pending"} className="mt-6 space-y-5">
          {status === "error" && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-relaxed">{t.contact.formErrorBody}</p>}
          <Suspense fallback={null}><DemoReference /></Suspense>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">{es ? "Correo de trabajo" : "Work email"}</span>
            <input required name="email" type="email" autoComplete="email" placeholder={es ? "tu@empresa.com" : "you@company.com"} className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">{es ? "Cuéntame sobre tu proyecto" : "Tell me about your project"}</span>
            <textarea required name="message" rows={4} placeholder={es ? "¿Qué materiales tienes y para quién es el curso?" : "What materials do you have, and who is the course for?"} className={`${inputClass} resize-y`} />
          </label>
          <button type="submit" disabled={status === "pending"} className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-60">{status === "pending" ? t.contact.formSubmitting : es ? "Cuéntame tu proyecto" : "Tell me about your project"}</button>
        </form>
      )}
      <p className="mt-5 text-center text-sm text-muted">{es ? "¿Prefieres WhatsApp?" : "Prefer WhatsApp?"}{" "}<a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline underline-offset-4">{es ? "Escríbeme directamente ↗" : "Message me directly ↗"}</a></p>
    </div>
  );
}
