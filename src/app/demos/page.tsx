import type { Metadata } from "next";
import { DemoGallery } from "@/components/DemoGallery";

export const metadata: Metadata = {
  title: "Demos interactivas | APLearning",
  description: "Prueba cursos interactivos y retos gamificados de APLearning: Diversidad y Ojo Experto.",
};

export default function DemosPage() {
  return <DemoGallery />;
}
