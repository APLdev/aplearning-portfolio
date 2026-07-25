import type { Accent, MockupVariant } from "@/lib/data/projects";

const ACCENT_STYLES: Record<Accent, { from: string; to: string; soft: string; text: string }> = {
  indigo: { from: "#4338ee", to: "#7c74ff", soft: "#eeedff", text: "#332ac4" },
  emerald: { from: "#0f9f6e", to: "#34d399", soft: "#e6faf1", text: "#0b7a54" },
  amber: { from: "#d97706", to: "#fbbf24", soft: "#fef3c7", text: "#92400e" },
  violet: { from: "#7c3aed", to: "#c084fc", soft: "#f3e8ff", text: "#6b21a8" },
};

function VariantContent({ variant, colors }: { variant: MockupVariant; colors: typeof ACCENT_STYLES.indigo }) {
  if (variant === 1) {
    // Dialogue / simulation
    return (
      <div className="space-y-2">
        <div className="max-w-[70%] rounded-lg rounded-bl-sm bg-surface-strong px-3 py-2 text-[11px] text-foreground/70">
          ¿Cómo responderías a esta objeción?
        </div>
        <div
          className="ml-auto max-w-[65%] rounded-lg rounded-br-sm px-3 py-2 text-[11px] text-white"
          style={{ backgroundColor: colors.from }}
        >
          Entiendo tu preocupación, déjame explicarte...
        </div>
      </div>
    );
  }
  if (variant === 2) {
    // Decision scenario
    return (
      <div className="grid grid-cols-2 gap-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-lg border px-3 py-3 text-center text-[11px] font-medium"
            style={{ borderColor: colors.soft, color: colors.text, backgroundColor: colors.soft }}
          >
            Opción {i + 1}
          </div>
        ))}
      </div>
    );
  }
  if (variant === 3) {
    // Certification / reading
    return (
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.soft, color: colors.text }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 15l-5 4 1.5-6L4 8.5l6-.5L12 2l2 6 6 .5-4.5 4.5L17 19z" fill="currentColor" />
          </svg>
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2 w-4/5 rounded-full bg-surface-strong" />
          <div className="h-2 w-2/5 rounded-full bg-surface-strong" />
        </div>
      </div>
    );
  }
  // variant 4: narration / video
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: colors.from }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="flex flex-1 items-end gap-0.5">
        {[6, 10, 14, 8, 16, 10, 6, 12].map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-full"
            style={{ height: h, backgroundColor: colors.to }}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectMockup({
  accent,
  variant,
  className = "",
}: {
  accent: Accent;
  variant: MockupVariant;
  className?: string;
}) {
  const colors = ACCENT_STYLES[accent];

  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-background ${className}`}
    >
      <div
        className="h-24 w-full sm:h-32"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
      />
      <div className="space-y-3 p-4">
        <VariantContent variant={variant} colors={colors} />
      </div>
    </div>
  );
}
