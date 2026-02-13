import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "SANDLÅDAN SYSTEM",
    description:
      "High-performance SSR application. Demonstrates modern Python web capabilities with zero client-side hydration overhead.",
    tech: ["FastAPI", "HTMX", "Python", "Render"],
    image: "ncw/ya1d5ehu45r3rdokwm1i",
    status: "LIVE_SYSTEM",
    links: {
      demo: "https://sandladanab.se",
      repo: "https://github.com/Moonchichiii",
    },
  },
  {
    id: "02",
    title: "LASERENITY.FR",
    description:
      "Decoupled architecture. Backend containerized on Fly.io with Redis caching. Frontend delivered via Cloudflare Pages.",
    tech: ["Django", "Wagtail", "Fly.io", "Redis"],
    image: "ncw/bkedaqkgjsyw4ldxntp5",
    status: "COMMERCIAL_DEPLOY",
    links: {
      demo: "https://laserenity.fr",
      repo: null,
    },
  },
  {
    id: "03",
    title: "PORTFOLIO SYSTEM V2",
    description:
      "Current interface. Strict industrial aesthetic utilizing high-contrast typography and CSS variables.",
    tech: ["React 19", "Tailwind v4", "Vite"],
    image: "ncw/dducxvk141hq88bfbkds",
    status: "DEPLOYED",
    links: {
      demo: "https://nordiccodeworks.com",
      repo: "https://github.com/Moonchichiii/ncw_client",
    },
  },
  {
    id: "04",
    title: "BATTLESHIP ENGINE",
    description:
      "Logic-heavy implementation of the classic strategy game. Features CPU opponent logic and state management.",
    tech: ["React", "Game Logic", "Jest"],
    image: "ncw/netg1aurff0czrwi4xof",
    status: "PROTOTYPE_ALPHA",
    links: {
      demo: "https://moonchichiii.github.io/battleship-project3/",
      repo: "https://github.com/Moonchichiii/battleship-project3",
    },
  },
];