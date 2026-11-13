import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Proyectos de e-learning y capacitación corporativa",
    template: "%s | APLearning",
  },
  description:
    "Explora mis proyectos de cursos interactivos, paquetes SCORM y videos de inducción para empresas: seguridad vial, compliance, ética y atención al cliente.",
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
