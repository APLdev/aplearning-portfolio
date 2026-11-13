export type MockupVariant = 1 | 2 | 3 | 4;
export type Accent = "indigo" | "emerald" | "amber" | "violet";

export interface ProjectImage {
  src: string;
  w: number;
  h: number;
  /** Animated source (GIF). Skips the image optimizer, which would otherwise
   * strip the animation. */
  animated?: boolean;
}

export interface ProjectMeta {
  slug: string;
  seo: {
    title: string;
    description: string;
  };
  tech: string[];
  accent: Accent;
  mockup: MockupVariant;
  /** Real screenshots for shipped projects. When present, these replace the
   * abstract mockup everywhere (card thumbnail + detail gallery). */
  images?: ProjectImage[];
  /** Optional cropped/borderless variant of images[0] used only for the
   * project card thumbnail (cover). Falls back to images[0] when absent. */
  thumbnail?: string;
  /** Card-only zoom to crop padding embedded in a cover image. */
  thumbnailScale?: number;
  demoUrl?: string;
}

// Translated copy (title, client, description, challenge, solution) lives in
// the dictionaries at src/lib/i18n/dictionaries.ts under `projects.items[slug]`.
export const projectsMeta: ProjectMeta[] = [
  {
    slug: "diversidad-equidad-inclusion",
    seo: {
      title: "Curso interactivo de diversidad, equidad e inclusión",
      description:
        "Explora una demo de curso sobre diversidad, equidad e inclusión, con ilustraciones interactivas y actividades para practicar situaciones cotidianas.",
    },
    tech: ["HTML5", "CSS / JavaScript", "SVG interactivo"],
    accent: "violet",
    mockup: 4,
    thumbnail: "/projects/diversidad-equidad-inclusion/cover.png",
    thumbnailScale: 1.09,
    demoUrl: "/projects/diversidad-equidad-inclusion/demo.html",
    images: [
      { src: "/projects/diversidad-equidad-inclusion/02-igualdad-equidad.gif", w: 960, h: 540, animated: true },
      { src: "/projects/diversidad-equidad-inclusion/01-perspectivas.gif", w: 960, h: 540, animated: true },
      { src: "/projects/diversidad-equidad-inclusion/03-iceberg.gif", w: 960, h: 540, animated: true },
      { src: "/projects/diversidad-equidad-inclusion/04-clasificacion.gif", w: 960, h: 540, animated: true },
    ],
  },
  {
    slug: "seguridad-vial-banrep",
    seo: {
      title: "Curso de seguridad vial para Banrep",
      description:
        "Conoce el programa de seguridad vial que desarrollé para el Banco de la República: cuatro módulos interactivos con casos prácticos y entrega SCORM.",
    },
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
    seo: {
      title: "Curso de compliance para Machu Picchu Foods",
      description:
        "Así convertí políticas y documentos de Machu Picchu Foods en un curso de cumplimiento normativo con casos prácticos, locución y canal de denuncias.",
    },
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
    slug: "efecto-wow-sportline",
    seo: {
      title: "Curso de atención al cliente para Sportline",
      description:
        "Conoce el curso SCORM que desarrollé para Sportline: cinco pasos del modelo Efecto WOW, audios de ejemplo y actividades de atención al cliente en tienda.",
    },
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
    slug: "codigo-etica-mac",
    seo: {
      title: "Curso de ética y conducta para Hospitales MAC",
      description:
        "Así transformé el Código de Ética y Conducta de Hospitales MAC en un curso interactivo con dilemas éticos, actividades y contenido listo para su LMS.",
    },
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
  {
    slug: "videos-onboarding-stl",
    seo: {
      title: "Videos animados de inducción para STL",
      description:
        "Conoce los videos animados de inducción que produje para STL: presentación de la empresa y seguridad en terminal, con ilustración 2D y locución.",
    },
    tech: ["Video animado 2D", "Ilustración vectorial", "Locución profesional"],
    accent: "amber",
    mockup: 2,
    // Static cover so the listing card doesn't pull the animated GIFs.
    thumbnail: "/projects/stl-onboarding/cover-thumb.png",
    images: [
      { src: "/projects/stl-onboarding/01-terminales.gif", w: 800, h: 450, animated: true },
      { src: "/projects/stl-onboarding/02-depot-seguridad.gif", w: 800, h: 450, animated: true },
      { src: "/projects/stl-onboarding/03-beneficios.png", w: 1440, h: 810 },
      { src: "/projects/stl-onboarding/04-depot-equipo.png", w: 1440, h: 810 },
    ],
  },
];

// Refresh optimized images and browser caches after embedding the watermark.
for (const project of projectsMeta) {
  const source = project.thumbnail ?? project.images?.[0]?.src;
  if (source) project.thumbnail = source.slice(0, source.lastIndexOf("/")) + "/thumbnail-clean.png";
  for (const image of project.images ?? []) image.src += "?v=watermark-2";
}

export function getProjectMeta(slug: string): ProjectMeta | undefined {
  return projectsMeta.find((p) => p.slug === slug);
}
