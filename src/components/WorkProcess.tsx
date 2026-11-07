"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const steps = {
  es: [
    { title: "Revisamos tu material", text: "Partimos de tu contenido, lo completamos o lo desarrollamos junto con los especialistas de tu empresa.", outcome: "Acordamos los objetivos, el público y la información que debemos completar." },
    { title: "Apruebas el temario", text: "Organizo la estructura del curso y propongo, a grandes rasgos, el formato de cada pantalla: contenido, actividades e interacciones.", outcome: "Primera aprobación: validas la estructura antes del desarrollo." },
    { title: "Pruebas el curso y das feedback", text: "Recibes una versión 100 % funcional. Antes de enviártela, realizo un control de calidad (QA) interno de navegación, interacciones, textos y locuciones. Después, la revisas y compartes tu feedback.", outcome: "Segunda aprobación: incorporamos tu feedback y cerramos los cambios de contenido y estructura." },
    { title: "Entrega y apoyo en tu LMS", text: "Recibes el curso en un archivo ZIP SCORM. Te acompaño en la carga y validamos su funcionamiento en la plataforma LMS de tu empresa.", outcome: "Cuentas con respaldo posterior para los ajustes de calidad de la versión aprobada." },
  ],
  en: [
    { title: "We review your materials", text: "We use your existing content, complete it or develop it with your internal specialists.", outcome: "We agree on objectives, audience and the information we need to complete." },
    { title: "You approve the outline", text: "I organise the course structure and propose the general format for each screen, including content, activities and interactions.", outcome: "First approval: you validate the structure before development." },
    { title: "You test the course and share feedback", text: "You receive a fully functional course. Before sharing it, I run internal quality assurance on navigation, interactions, text and voiceovers. You then review it and share feedback.", outcome: "Second approval: we incorporate your feedback and close content and structural changes." },
    { title: "Delivery and LMS support", text: "You receive the course as a SCORM ZIP file. I help with uploading it and we validate how it works on your company’s LMS.", outcome: "You have post-delivery support for quality adjustments to the approved version." },
  ],
};

export function WorkProcess() {
  const { lang } = useLanguage();
  const es = lang === "es";
  return (
    <section className="border-b border-border bg-surface/60 py-16 sm:py-20">
      <div className="container-page">
        <p className="text-sm font-medium text-accent">{es ? "Cómo trabajamos" : "How we work"}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{es ? "De tu contenido al curso final, con dos etapas de aprobación." : "From your content to a finished course, with two approval stages."}</h2>
        <ol className="relative mt-12 grid gap-8 before:absolute before:bottom-8 before:left-5 before:top-5 before:w-px before:bg-border lg:grid-cols-4 lg:gap-6 lg:before:bottom-auto lg:before:right-5 lg:before:h-px lg:before:w-auto">
          {steps[lang].map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] items-start gap-4 lg:block">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background font-mono text-sm font-semibold text-accent">0{i + 1}</span>
              <div className="surface-card h-full rounded-2xl border border-border p-5 transition-colors hover:border-accent/50 lg:mt-5 lg:h-auto">
              <p className="text-xs font-medium uppercase tracking-wider text-accent">{(es ? ["Punto de partida", "Aprobación 1", "QA + aprobación 2", "Publicación"] : ["Starting point", "Approval 1", "QA + approval 2", "Launch"])[i]}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              <p className="mt-5 border-t border-border pt-4 text-sm font-medium leading-relaxed">{step.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{es ? "Las modificaciones mayores se resuelven durante la revisión del curso funcional. Los nuevos contenidos o cambios de alcance posteriores se revisan por separado." : "Major changes are resolved during the functional course review. New content or later scope changes are discussed separately."}</p>
      </div>
    </section>
  );
}
