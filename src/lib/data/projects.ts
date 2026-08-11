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
  /** Optional cropped/borderless variant of images[0] used only for the
   * project card thumbnail (cover). Falls back to images[0] when absent. */
  thumbnail?: string;
}

// Translated copy (title, client, description, challenge, solution) lives in
// the dictionaries at src/lib/i18n/dictionaries.ts under `projects.items[slug]`.
export const projectsMeta: ProjectMeta[] = [
  {
    slug: "efecto-wow-sportline",
    tech: ["Storyline 360", "SCORM", "Locución embebida"],
    accent: "indigo",
    mockup: 1,
    images: [
      { src: "/projects/sportline-efecto-wow/01-cover.png", w: 1315, h: 738 },
      { src: "/projects/sportline-efecto-wow/02-modelo-servicio.png", w: 1315, h: 739 },
      { src: "/projects/sportline-efecto-wow/03-conexion-audios.png", w: 1313, h: 740 },
      { src: "/projects/sportline-efecto-wow/04-emocion-drag-drop.png", w: 1471, h: 825 },
    ],
  },
  {
    slug: "seguridad-vial-banrep",
    tech: ["HTML5 interactivo", "SCORM", "CSS/JS a medida"],
    accent: "emerald",
    mockup: 2,
    thumbnail: "/projects/banrep-seguridad-vial/m1-cover-thumb.png",
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
    slug: "codigo-etica-mac",
    tech: ["Storyline 360", "SCORM", "Interacciones a medida"],
    accent: "violet",
    mockup: 4,
    images: [
      { src: "/projects/mac-codigo-etica/01-fundamentos.png", w: 1316, h: 737 },
      { src: "/projects/mac-codigo-etica/02-sanciones-exclusiones.png", w: 1313, h: 738 },
      { src: "/projects/mac-codigo-etica/03-filosofia-drag-drop.png", w: 1315, h: 735 },
      { src: "/projects/mac-codigo-etica/04-cumplimiento-legal.png", w: 1317, h: 739 },
    ],
  },
];

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return projectsMeta.find((p) => p.slug === slug);
}
