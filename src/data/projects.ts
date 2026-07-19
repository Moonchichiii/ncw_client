import type { Project } from "@/types";

/*
 * Featured order is deliberate: own production SaaS first, client work after.
 * RULE: every line here must be true of the shipped product. No invented
 * metrics, no aspirational features. If it isn't live, it isn't listed.
 *
 * TODO(mats): upload real product screenshots to Cloudinary for ServiceBok
 * and SkogsKvitto, then paste the public IDs into `image` / `gallery` below.
 * Until then the cards render the neutral "Asset offline" panel — do NOT
 * substitute fake or AI-generated screenshots.
 */

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "VALUNDS SERVICEBOK",
    description:
      "Digital vehicle service book for private owners and business fleets. Django SaaS with AI-assisted receipt OCR, Stripe subscriptions, verifiable PDF certificates, and a companion Expo mobile app — in production on Fly.io.",
    role: "Founder · Product engineer",
    year: "2026",
    highlights: [
      "Receipt OCR via GPT-4o-mini vision, straight into structured service history",
      "Värdebevis PDF certificates: SHA-256 hash, QR code, public verification endpoint",
      "Plan-gated Stripe billing with webhook-driven fulfillment",
      "GDPR account-deletion chain verified in production; encrypted nightly off-site backups (Backblaze B2)",
      "Fleet management with org-level plans, quick-add flows, and 30-day deletion cancel window",
    ],
    tech: ["Django", "PostgreSQL", "Stripe", "Expo", "Fly.io", "Cloudinary"],
    image: "",
    status: "PRODUCTION_SAAS",
    links: {
      demo: "https://valunds.se",
      repo: null,
    },
  },
  {
    id: "02",
    title: "SKOGSKVITTO",
    description:
      "Receipt, income, and mileage management with bookkeeping preparation for Swedish forest and agricultural property owners. Locked income years with immutable records and two-region production redundancy.",
    role: "Founder · Product engineer",
    year: "2026",
    highlights: [
      "Year-lock system: global lock ordering across every write path, immutable historical records",
      "Seven-year evidence archive with checksummed Backblaze B2 copies",
      "Two-region deployment: Stockholm primary, Amsterdam failover",
      "CodeQL-driven security hardening: SSRF, log-injection, and trace-exposure fixes",
    ],
    tech: ["Django", "PostgreSQL", "Stripe", "Fly.io", "Backblaze B2"],
    image: "",
    metric: "818 tests green",
    status: "PRODUCTION_SAAS",
    links: {
      demo: "https://skogskvitto.se",
      repo: null,
    },
  },
  {
    id: "03",
    title: "LASERENITY.FR",
    description:
      "Commercial wellness site for a Marseille client. Django + Wagtail CMS with a React 19 + TypeScript front end, Stripe-backed gift purchase flow, Redis caching, containerized deployment on Fly.io, CDN delivery.",
    role: "Contract · Full delivery",
    year: "2025–2026",
    highlights: [
      "Stripe checkout with webhook fulfillment for gift bookings",
      "Wagtail-managed content with a typed React storefront",
      "Redis caching and CDN-fronted media via Cloudinary",
    ],
    tech: ["Django", "Wagtail", "React", "Redis", "Fly.io"],
    image: "ncw/ekgayxzyp5sifqlw8r9u",
    metric: "98 Lighthouse",
    status: "COMMERCIAL_DEPLOY",
    links: {
      demo: "https://laserenity.fr",
      repo: null,
    },
  },
  {
    id: "04",
    title: "SANDLÅDAN SYSTEM",
    description:
      "High-performance SSR platform built with FastAPI + HTMX. Zero hydration overhead, optimized TTFB, production deployment.",
    role: "Contract · Full delivery",
    tech: ["FastAPI", "HTMX", "Python 3.12", "Docker", "Render"],
    image: "ncw/ya1d5ehu45r3rdokwm1i",
    metric: "TTFB <200ms",
    status: "LIVE_SYSTEM",
    links: {
      demo: "https://sandladanab.se",
      repo: null,
    },
  },
];
