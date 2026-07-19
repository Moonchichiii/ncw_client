import type { ReactNode } from "react";
import { Github, ArrowUpRight } from "@/icons/lucide";
import CloudinaryImg from "@/components/ui/cloudinary-image";
import type { Project } from "@/types";
import {
  PANEL_CLASS,
  OBJECT_POS_CLASS,
} from "@/components/ui/project-card.constants";

export function CardShell({
  children,
  className = "",
  extraClasses = "",
}: {
  children: ReactNode;
  className?: string;
  extraClasses?: string;
}) {
  return (
    <article
      className={[
        "group relative",
        "rounded-2xl md:rounded-3xl",
        "bg-surface-elevated/60 backdrop-blur-sm",
        "border border-white/4",
        "hover:border-lime/12",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 ease-out",
        extraClasses,
        className,
      ].join(" ")}
    >
      {children}
    </article>
  );
}

export function ProjectNumber({ num }: { num: string }) {
  return (
    <span className="pointer-events-none select-none font-heading font-black leading-none text-white/5">
      {num}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="ui-label inline-flex items-center rounded-full border border-white/8 bg-black/60 px-3 py-1.5 text-[10px] backdrop-blur-md">
      {status}
    </span>
  );
}

export function MetricPill({ metric }: { metric: string }) {
  return (
    <div className="rounded-md border border-white/6 bg-(--bg-elevated)/90 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <span className="ui-label mb-1 block text-[9px] text-content-faint">
        Metric
      </span>
      <span className="font-mono text-[11px] font-bold uppercase leading-none tracking-[0.04em] text-lime">
        {metric}
      </span>
    </div>
  );
}

export function ProjectLinks({
  links,
  title,
}: {
  links: Project["links"];
  title: string;
}) {
  return (
    <div className="flex items-center gap-5">
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live site — ${title}`}
          className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-content transition-colors hover:text-lime"
        >
          Live site
          <ArrowUpRight
            size={13}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px"
            aria-hidden="true"
          />
        </a>
      )}
      {links.repo && (
        <a
          href={links.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source code — ${title}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-content-faint transition-colors hover:text-content-secondary"
        >
          Source
          <Github size={13} strokeWidth={1.6} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function HighlightsList({
  highlights,
  limit,
  className = "",
}: {
  highlights: Project["highlights"];
  limit?: number;
  className?: string;
}) {
  if (!highlights || highlights.length === 0) {
    return null;
  }
  const items = limit ? highlights.slice(0, limit) : highlights;

  return (
    <ul className={["space-y-1.5", className].join(" ")}>
      {items.map((h) => (
        <li
          key={h}
          className="flex gap-2.5 text-[clamp(0.82rem,0.8rem+0.1vw,0.9rem)] leading-relaxed text-content-secondary"
        >
          <span
            className="mt-[0.55em] h-1 w-2.5 shrink-0 rounded-full bg-lime/70"
            aria-hidden="true"
          />
          {h}
        </li>
      ))}
    </ul>
  );
}

export function RoleLine({ project }: { project: Project }) {
  if (!project.role && !project.year) {
    return null;
  }
  return (
    <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-content-faint">
      {[project.role, project.year].filter(Boolean).join(" · ")}
    </p>
  );
}

export function MediaPanel({
  publicId,
  alt,
  objectPos = "topCenter",
  className = "",
  priority = false,
  sizes,
}: {
  publicId: string;
  alt: string;
  objectPos?: keyof typeof OBJECT_POS_CLASS;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!publicId) {
    return (
      <div
        className={[
          PANEL_CLASS,
          "flex items-center justify-center",
          "text-[10px] font-mono uppercase tracking-[0.18em] text-content-faint",
          className,
        ].join(" ")}
      >
        Asset offline
      </div>
    );
  }

  return (
    <div className={[PANEL_CLASS, className].join(" ")}>
      <CloudinaryImg
        publicId={publicId}
        alt={alt}
        sizes={sizes}
        className={[
          "h-full w-full object-cover",
          OBJECT_POS_CLASS[objectPos],
          "grayscale-[0.18] group-hover:grayscale-0",
          "transition-[filter,transform] duration-700 ease-out",
          "group-hover:scale-[1.02]",
        ].join(" ")}
        priority={priority}
      />
    </div>
  );
}