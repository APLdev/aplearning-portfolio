"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Real client logos — served from official sources (Wikimedia Commons / brand sites).
// See project chat history for provenance of each file if it ever needs re-sourcing.
const LOGOS = [
  { name: "Toyota", src: "/logos/toyota.svg", w: 251, h: 162 },
  { name: "Western Union", src: "/logos/western-union.svg", w: 644, h: 143 },
  { name: "Cementos Pacasmayo", src: "/logos/pacasmayo.png", w: 311, h: 65 },
  { name: "Machu Picchu Foods", src: "/logos/machu-picchu-foods.svg", w: 300, h: 170 },
  { name: "Banco Supervielle", src: "/logos/banco-supervielle.svg", w: 500, h: 250 },
  { name: "Banco de la República", src: "/logos/banco-de-la-republica.svg", w: 203, h: 200 },
  { name: "Hospitales MAC", src: "/logos/hospitales-mac.png", w: 166, h: 141 },
  { name: "Ultramar", src: "/logos/ultramar.png", w: 350, h: 63 },
];

export function LogosBand() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border bg-surface/60">
      <div className="container-page py-10 sm:py-12">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted">
          {t.logos.title}
        </p>
        <div className="marquee-track relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-6 sm:gap-8">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white/95 px-4 py-2.5 ring-1 ring-black/5 transition-shadow hover:shadow-md dark:bg-zinc-100/90 dark:ring-white/5"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  loading="eager"
                  className="h-6 w-auto object-contain sm:h-7"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
