export const demos = [
  {
    slug: "ruta-segura",
    title: { es: "Ruta segura", en: "Ruta segura · Safe driving" },
    type: { es: "Simulador de conducción", en: "Driving simulator" },
    description: {
      es: "Recorre las calles de Lima, sigue el GPS y practica una conducción segura respetando señales, peatones y límites de velocidad.",
      en: "Drive through Lima, follow the GPS and practise safe driving while respecting traffic signs, pedestrians and speed limits.",
    },
    scope: { es: "Ruta interactiva · Controles de manejo · En español", en: "Interactive route · Driving controls · Spanish only" },
    src: { es: "/projects/ruta-segura/demo.html", en: "/projects/ruta-segura/demo.html" },
  },
  {
    slug: "diversidad",
    title: { es: "Diversidad, equidad e inclusión", en: "Diversity, equity and inclusion" },
    type: { es: "Curso interactivo", en: "Interactive course" },
    description: {
      es: "Cambia de perspectiva, explora la diversidad invisible y practica con situaciones cotidianas.",
      en: "Shift perspectives, explore invisible diversity and practise with everyday situations.",
    },
    scope: { es: "Selección de actividades · Español e inglés", en: "Selected activities · Spanish and English" },
    src: { es: "/projects/diversidad-equidad-inclusion/demo.html", en: "/projects/diversidad-equidad-inclusion/demo-en.html" },
  },
  {
    slug: "ojo-experto",
    title: { es: "Ojo Experto · Oficina segura", en: "Ojo Experto · Office safety" },
    type: { es: "Reto gamificado", en: "Game-based challenge" },
    description: {
      es: "Responde con tus palabras y amplía tu mirada sobre la seguridad en el trabajo. Cada hallazgo te lleva más profundo.",
      en: "Answer in your own words and broaden your view of workplace safety. Each finding takes you deeper.",
    },
    scope: { es: "4 consignas · Sin reloj por defecto · En español", en: "4 prompts · Untimed by default · Spanish only" },
    src: { es: "/demo-assets/ojo-experto.html", en: "/demo-assets/ojo-experto.html" },
  },
];

export function getDemo(slug: string) {
  return demos.find(demo => demo.slug === slug);
}
