import type { LucideIcon } from "lucide-react";

/* ── Icons ─────────────────────────────────────────────── */
export type IconComponent = LucideIcon;

/* ── Legal ─────────────────────────────────────────────── */
export type LegalType = "terms" | "privacy";

/* ── Contact ───────────────────────────────────────────── */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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

/* ── Social ────────────────────────────────────────────── */
export interface SocialLink {
  icon: IconComponent;
  title: string;
  label: string;
  href: string;
}

/* ── Cookies ───────────────────────────────────────────── */
export interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

export type CookiePreferences = Record<string, boolean>;

/* ── Shared UI ─────────────────────────────────────────── */
export interface WithClassName {
  className?: string;
}