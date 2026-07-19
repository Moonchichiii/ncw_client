import type { LucideIcon } from "@/icons/lucide";

/* ── Icons ─────────────────────────────────────────────── */
export type IconComponent = LucideIcon;

/* ── Projects ──────────────────────────────────────────── */
export interface Project {
  id: string;
  title: string;
  description: string;
  /** Role & ownership, e.g. "Founder · Solo engineer" */
  role?: string;
  /** Ship year or range, e.g. "2026" */
  year?: string;
  /** 3–5 concrete engineering facts. No marketing language. */
  highlights?: string[];
  tech: string[];
  image: string;
  gallery?: string[];
  status: string;
  metric?: string;
  links: {
    demo?: string | null;
    repo?: string | null;
  };
}

/* ── Shared UI ─────────────────────────────────────────── */
export interface WithClassName {
  className?: string;
}
