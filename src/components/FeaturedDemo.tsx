"use client";

import Link from "next/link";
import { DemoCover } from "@/components/DemoCover";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FeaturedDemo() {
  const { lang } = useLanguage();
  const es = lang === "es";
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Link href="/demos/ojo-experto" aria-label={es ? "Iniciar demo de Ojo Experto" : "Start the Ojo Experto demo"} className="overflow-hidden rounded-2xl border border-border shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <DemoCover kind="ojo-experto" />
        </Link>
        <div>
          <p className="text-sm font-medium text-accent">{es ? "Demo destacada · Ojo Experto" : "Featured demo · Ojo Experto"}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{es ? "Prueba lo que podemos crear para tu equipo." : "Try what we can create for your team."}</h2>
          <p className="mt-5 leading-relaxed text-muted">{es ? "Identifica peligros de una oficina con tus propias palabras. Resuelve cuatro consignas y descubre nuevas perspectivas sobre la seguridad en el trabajo." : "Identify office hazards in your own words. Complete four prompts and discover new perspectives on workplace safety."}</p>
          <p className="mt-3 text-sm text-muted">{es ? "Sin registro · Sin reloj por defecto · Demo en español" : "No registration · Untimed by default · Demo in Spanish"}</p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link href="/demos/ojo-experto" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-strong">{es ? "Iniciar demo" : "Start demo"} <span aria-hidden>↗</span></Link>
            <Link href="/demos" className="text-sm font-medium text-accent hover:underline">{es ? "Ver todas las demos →" : "See all demos →"}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
