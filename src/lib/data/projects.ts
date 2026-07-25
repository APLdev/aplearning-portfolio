export type MockupVariant = 1 | 2 | 3 | 4;
export type Accent = "indigo" | "emerald" | "amber" | "violet";

export interface ProjectImage {
  src: string;
  w: number;
  h: number;
}

export interface ProjectMeta {
  slug: string;
  tech: string[];
  accent: Accent;
  mockup: MockupVariant;
  /** Real screenshots for shipped projects. When present, these replace the
   * abstract mockup everywhere (card thumbnail + detail gallery). */
  images?: ProjectImage[];
}

// Translated copy (title, client, description, challenge, solution) lives in
// the dictionaries at src/lib/i18n/dictionaries.ts under `projects.items[slug]`.
export const projectsMeta: ProjectMeta[] = [
  {
    slug: "onboarding-comercial",
    tech: ["Storyline 360", "SCORM 2004", "Figma"],
    accent: "indigo",
    mockup: 1,
  },
  {
    slug: "seguridad-vial-banrep",
    tech: ["HTML5 interactivo", "SCORM", "CSS/JS a medida"],
    accent: "emerald",
    mockup: 2,
    images: [
      { src: "/projects/banrep-seguridad-vial/m1-cover.png", w: 1440, h: 810 },
      { src: "/projects/banrep-seguridad-vial/m1-carrusel.png", w: 1440, h: 810 },
      { src: "/projects/banrep-seguridad-vial/m2-simulador.png", w: 1440, h: 810 },
      { src: "/projects/banrep-seguridad-vial/m3-simulador.png", w: 1440, h: 810 },
    ],
  },
  {
    slug: "cumplimiento-normativo-mpf",
    tech: ["HTML5 interactivo", "Locución embebida", "JavaScript a medida"],
    accent: "amber",
    mockup: 3,
    images: [
      { src: "/projects/mpf-cumplimiento-normativo/00-cover.png", w: 1440, h: 810 },
      { src: "/projects/mpf-cumplimiento-normativo/03-que-es-compliance.png", w: 1440, h: 810 },
      { src: "/projects/mpf-cumplimiento-normativo/08-sanciones.png", w: 1440, h: 810 },
      { src: "/projects/mpf-cumplimiento-normativo/19-canal-denuncias.png", w: 1440, h: 810 },
    ],
  },
  {
    slug: "induccion-corporativa",
    tech: ["Storyline 360", "SCORM 2004", "After Effects"],
    accent: "violet",
    mockup: 4,
  },
];

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return projectsMeta.find((p) => p.slug === slug);
}
