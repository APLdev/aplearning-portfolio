import type { Metadata } from "next";
import { DemoGallery } from "@/components/DemoGallery";

export const metadata: Metadata = {
  title: "Demos de cursos interactivos y simuladores",
  description:
    "Prueba mis demos de capacitación para empresas: un simulador de conducción, un curso de diversidad e inclusión y un reto gamificado de seguridad laboral.",
};

export default function DemosPage() {
  return <DemoGallery />;
}
