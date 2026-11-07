"use client";

import Link from "next/link";
import { getDemo } from "@/lib/data/demos";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function DemoPlayer({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const demo = getDemo(slug);
  if (!demo) return null;
  const es = lang === "es";
  return (
    <div className="container-page py-10 sm:py-14">
      <Link href="/demos" className="text-sm font-medium text-accent hover:underline">{es ? "← Todas las demos" : "← All demos"}</Link>
      <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-xs font-medium uppercase tracking-widest text-accent">{demo.type[lang]}</p><h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{demo.title[lang]}</h1><p className="mt-3 text-sm text-muted">{demo.scope[lang]}</p></div>
        <a href={demo.src[lang]} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-medium text-accent hover:underline">{es ? "Abrir en ventana completa ↗" : "Open in a full window ↗"}</a>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-[#101723]">
        <iframe key={`${slug}-${lang}`} src={demo.src[lang]} title={demo.title[lang]} className="block h-[78svh] min-h-[600px] w-full border-0" allowFullScreen />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <p className="max-w-xl text-sm leading-relaxed text-muted">{demo.description[lang]}</p>
        <Link href={`/?demo=${demo.slug}#contacto`} className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-strong">{es ? "Quiero algo así para mi equipo" : "I'd like this for my team"}</Link>
      </div>
    </div>
  );
}
