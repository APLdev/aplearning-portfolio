"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LINKEDIN_URL } from "@/lib/data/contact";

export function Footer() {
  const { t } = useLanguage();
  const year = 2026;

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight">{t.nav.brand}</p>
          <p className="mt-1 text-sm text-muted">{t.footer.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">
            {t.nav.home}
          </Link>
          <Link href="/proyectos" className="hover:text-foreground">
            {t.nav.projects}
          </Link>
          <Link href="/#contacto" className="hover:text-foreground">
            {t.nav.contact}
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </nav>
      </div>
      <div className="border-t border-border py-4">
        <p className="container-page text-xs text-muted">
          © {year} {t.nav.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
