import Image from "next/image";

export function DemoCover({ kind }: { kind: string }) {
  if (kind === "ruta-segura") {
    return (
      <div className="relative aspect-video overflow-hidden bg-[#11151b]">
        <Image src="/projects/ruta-segura/cover.png" alt="Vista del simulador Ruta segura desde la cabina, con el tablero y el GPS" fill sizes="(min-width: 768px) 550px, 100vw" className="object-cover" />
      </div>
    );
  }
  if (kind === "diversidad") {
    return (
      <div className="relative aspect-video overflow-hidden bg-surface">
        <Image src="/projects/diversidad-equidad-inclusion/thumbnail-clean.png" alt="" fill sizes="(min-width: 768px) 550px, 100vw" className="scale-[1.09] object-cover" />
      </div>
    );
  }
  return (
    <div className="relative aspect-video overflow-hidden bg-[#101723]">
      <Image src="/demo-assets/ojo-experto-cover.svg" alt="Personaje de Ojo Experto con casco y linterna, descendiendo por el pozo de inspección del juego" fill sizes="(min-width: 768px) 550px, 100vw" className="object-cover" />
    </div>
  );
}
