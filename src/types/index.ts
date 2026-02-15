import type { LucideIcon } from "lucide-react";

/* ── Icons ─────────────────────────────────────────────── */
export type IconComponent = LucideIcon;

/* ── Projects ──────────────────────────────────────────── */
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  status: string;
  links: {
    demo: string | null;
    repo: string | null;
  };
}

/* ── Shared UI ─────────────────────────────────────────── */
export interface WithClassName {
  className?: string;
}
