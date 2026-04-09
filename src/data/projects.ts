import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "LASERENITY.FR",
    description:
      "Commercial Django + Wagtail system. Containerized backend, Redis caching, Fly.io deployment, CDN delivery.",
    tech: ["Django", "Wagtail", "Redis", "Fly.io", "Docker"],
    image: "ncw/ekgayxzyp5sifqlw8r9u",
    metric: "98 Lighthouse",
    status: "COMMERCIAL_DEPLOY",
    links: {
      demo: "https://laserenity.fr",
      repo: null,
    },
  },
    {
    id: "02",
    title: "SANDLÅDAN SYSTEM",
    description:
      "High-performance SSR platform built with FastAPI + HTMX. Zero hydration overhead, optimized TTFB, production deployment.",
    tech: ["FastAPI", "HTMX", "Python 3.12", "Docker", "Render"],
    image: "ncw/ya1d5ehu45r3rdokwm1i",
    metric: "TTFB <200ms",
    status: "LIVE_SYSTEM",
    links: {
      demo: "https://sandladanab.se",
      repo: null,
    },
  },
  {
    id: "03",
    title: "COMMERCE SKELETON ENGINE",
    description:
      "Django + Wagtail + HTMX architecture scaffold. Built-in marketing modules, sales flows, flash-sale logic, CMS-driven landing pages, and admin automation.",
    tech: ["Django", "Wagtail", "HTMX", "PostgreSQL", "Docker"],
    image: "projects/commerce-skeleton",
    metric: "Zero-downtime deploys",
    status: "SYSTEM_ARCHITECTURE",
    links: {
      demo: null,
      repo: null,
    },
  }, 
];