import type { Metadata } from "next";
import { DemoGallery } from "@/components/DemoGallery";

export const metadata: Metadata = {
  title: "Demos interactivas | APLearning",
  description: "Prueba cursos interactivos, retos gamificados y simuladores de APLearning: Ruta segura, Diversidad y Ojo Experto.",
};

export default function DemosPage() {
  return <DemoGallery />;
}
