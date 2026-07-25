"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function DocChip({
  label,
  color,
  rotate,
  delay,
}: {
  label: string;
  color: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 shadow-sm"
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
        style={{ backgroundColor: color }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 2h9l5 5v15H6V2z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M15 2v5h5" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-xs font-medium text-foreground/80">{label}</span>
    </motion.div>
  );
}

export function TransformMockup() {
  const { t } = useLanguage();
  const m = t.hero.mockup;

  return (
    <div className="relative w-full max-w-md">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
        {/* Input: raw documents */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {m.inputLabel}
          </p>
          <div className="flex flex-col gap-2.5">
            <DocChip label={m.inputDoc1} color="#2b579a" rotate={-2} delay={0.05} />
            <DocChip label={m.inputDoc2} color="#d24726" rotate={1.5} delay={0.15} />
            <DocChip label={m.inputDoc3} color="#8a1f11" rotate={-1} delay={0.25} />
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-1 text-accent"
          aria-hidden
        >
          <motion.svg
            width="28"
            height="16"
            viewBox="0 0 28 16"
            fill="none"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M1 8H26M26 8L20 2M26 8L20 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        {/* Output: course player mockup */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {m.outputLabel}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="overflow-hidden rounded-xl border border-border bg-background shadow-sm"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </div>
            <div className="space-y-2 p-3">
              <div className="h-14 w-full rounded-lg bg-gradient-to-br from-accent to-accent-strong" />
              <div className="h-2 w-3/4 rounded-full bg-surface-strong" />
              <div className="h-2 w-1/2 rounded-full bg-surface-strong" />
              <div className="flex items-center justify-between pt-1">
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
                  {m.outputStatus}
                </span>
                <span className="text-[10px] text-muted">{m.outputCourse}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
