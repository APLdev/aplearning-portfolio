"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { demos } from "@/lib/data/demos";
import { DemoCover } from "@/components/DemoCover";

export function DemoGallery() {
  const { lang } = useLanguage();
  const es = lang === "es";
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-accent">{es ? "Demos interactivas" : "Interactive demos"}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{es ? "El aprendizaje se entiende mejor cuando lo pruebas." : "Learning makes more sense when you try it."}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{es ? "Explora, toma decisiones y juega. Estas muestras te permiten conocer distintos formatos que podemos adaptar a tu contenido y a tu empresa." : "Explore, make decisions and play. Try different learning formats that we can adapt to your content and your organisation."}</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {demos.map(demo => (
          <Link key={demo.slug} href={`/demos/${demo.slug}`} className="surface-card group flex flex-col overflow-hidden rounded-2xl border border-border transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <DemoCover kind={demo.slug} />
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">{demo.type[lang]}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{demo.title[lang]}</h2>
              <p className="mt-3 leading-relaxed text-muted">{demo.description[lang]}</p>
              <p className="mt-5 text-xs text-muted">{demo.scope[lang]}</p>
              <div className="mt-auto pt-7"><span className="inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">{es ? "Probar demo" : "Try demo"}<span aria-hidden>↗</span></span></div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border p-8 sm:flex-row sm:items-center">
        <div><h2 className="text-lg font-semibold">{es ? "¿Cómo se vería con tu contenido?" : "What could this look like with your content?"}</h2><p className="mt-2 text-sm text-muted">{es ? "Cuéntame qué necesitas enseñar y a quién." : "Tell me what you need to teach, and who it is for."}</p></div>
        <Link href="/#contacto" className="shrink-0 rounded-full border border-accent px-6 py-3 text-sm font-medium text-accent hover:bg-accent-soft">{es ? "Cuéntame tu proyecto" : "Tell me about your project"}</Link>
      </div>
    </div>
  );
}
