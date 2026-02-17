import type { ReactNode } from "react";
import { Github, ArrowUpRight } from "@/icons/lucide";
import CloudinaryImg from "@/components/ui/cloudinary-image";
import type { Project } from "@/types";

export const TAG_CLASS =
  "inline-flex items-center px-2.5 py-1 font-mono text-[clamp(0.6rem,0.58rem+0.1vw,0.68rem)] font-semibold tracking-[0.04em] uppercase text-accent/80 bg-accent/7 rounded-full";

export const PANEL_CLASS =
  "rounded-2xl overflow-hidden border border-white/6 bg-surface-alt shadow-[0_10px_34px_rgba(0,0,0,0.45)]";

const OBJECT_POS_CLASS: Record<
  "center" | "topCenter" | "bottomRight" | "bottomCenter",
  string
> = {
  center: "object-center",
  topCenter: "object-[center_top]",
  bottomRight: "object-[right_bottom]",
  bottomCenter: "object-[center_bottom]",
};

export function safePublicId(value: unknown, fallback: unknown) {
  const pick = (v: unknown) => (typeof v === "string" && v.trim().length > 0 ? v : "");
  return pick(value) || pick(fallback);
}

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
    <span className="font-heading font-black text-white/5 leading-none select-none pointer-events-none">
      {num}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="ui-label inline-flex items-center px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/8 rounded-full text-[10px]">
      {status}
    </span>
  );
}

export function MetricPill({ metric }: { metric: string }) {
  return (
    <div className="rounded-md border border-white/6 bg-(--bg-elevated)/90 backdrop-blur-xl px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <span className="ui-label text-content-faint text-[9px] block mb-1">
        Metric
      </span>
      <span className="font-mono text-[11px] font-bold tracking-[0.04em] uppercase text-lime leading-none">
        {metric}
      </span>
    </div>
  );
}

export function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <div className="flex items-center gap-5">
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-content group/link hover:text-lime transition-colors"
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
          className="inline-flex items-center gap-1.5 text-sm font-medium text-content-faint hover:text-content-secondary transition-colors"
        >
          Source
          <Github size={13} strokeWidth={1.6} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function MediaPanel({
  publicId,
  alt,
  objectPos = "topCenter",
  className = "",
  priority = false,
}: {
  publicId: string;
  alt: string;
  objectPos?: keyof typeof OBJECT_POS_CLASS;
  className?: string;
  priority?: boolean;
}) {
  if (!publicId) {
    return (
      <div
        className={[
          PANEL_CLASS,
          "flex items-center justify-center",
          "text-content-faint font-mono text-[10px] tracking-[0.18em] uppercase",
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
        className={[
          "w-full h-full object-cover",
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

export function HeroCard({ project, num }: { project: Project; num: string }) {
  const mainId = safePublicId(project.image, "");
  const d1 = safePublicId(project.gallery?.[0], project.image);
  const d2 = safePublicId(project.gallery?.[1], project.gallery?.[0] ?? project.image);
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <div className="p-3 md:p-5">
        <div className="relative w-full aspect-[2.35/1] md:aspect-[2.6/1]">
          <div className="absolute top-2 left-4 md:top-3 md:left-6 text-[clamp(4.25rem,10vw,8.5rem)] z-0">
            <ProjectNumber num={num} />
          </div>

          <div className="absolute inset-0 z-10">
            <MediaPanel
              publicId={mainId}
              alt={`Screenshot of ${project.title}`}
              objectPos="topCenter"
              className="w-full h-full"
              priority
            />
          </div>

          <div className="absolute right-4 top-4 md:right-6 md:top-6 w-[30%] h-[52%] z-20">
            <MediaPanel
              publicId={d1}
              alt={`Detail of ${project.title}`}
              objectPos="bottomRight"
              className="w-full h-full"
            />
          </div>

          <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 w-[20%] h-[30%] z-30">
            <MediaPanel
              publicId={d2}
              alt={`Detail of ${project.title}`}
              objectPos="center"
              className="w-full h-full"
            />
          </div>

          {project.metric && (
            <div className="absolute left-6 bottom-6 z-30">
              <MetricPill metric={project.metric} />
            </div>
          )}

          <div className="absolute top-3 right-3 md:top-5 md:right-5 z-40">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 md:px-8 md:pb-8 flex flex-col md:flex-row md:items-end gap-5 md:gap-10">
        <div className="flex-1 min-w-0">
          <h3 className="text-[clamp(1.25rem,1.1rem+0.8vw,1.85rem)] font-heading font-bold text-content tracking-[-0.03em] group-hover:text-lime transition-colors duration-200 leading-tight mb-2">
            {project.title}
          </h3>
          <p className="text-content-muted leading-relaxed max-w-[60ch] text-[clamp(0.9rem,0.88rem+0.15vw,1rem)]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end shrink-0">
          <div className="flex flex-wrap gap-1.5 justify-start md:justify-end">
            {tags.map((t) => (
              <span key={t} className={TAG_CLASS}>
                {t}
              </span>
            ))}
          </div>
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </>
  );
}

export function WideCard({ project, num }: { project: Project; num: string }) {
  const mainId = safePublicId(project.image, "");
  const d1 = safePublicId(project.gallery?.[0], project.image);
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <div className="p-3 md:p-4 md:pr-0">
        <div className="relative w-full h-full min-h-56 md:min-h-64">
          <div className="absolute top-2 left-3 text-[clamp(3rem,6vw,5rem)] z-0">
            <ProjectNumber num={num} />
          </div>

          <div className="absolute inset-0 z-10">
            <MediaPanel
              publicId={mainId}
              alt={`Screenshot of ${project.title}`}
              objectPos="topCenter"
              className="w-full h-full"
            />
          </div>

          <div className="absolute right-4 bottom-4 w-[34%] h-[44%] z-20">
            <MediaPanel
              publicId={d1}
              alt={`Detail of ${project.title}`}
              objectPos="bottomCenter"
              className="w-full h-full"
            />
          </div>

          <div className="absolute top-3 right-3 z-30">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4 md:py-7 md:px-7 flex flex-col justify-center">
        {project.metric && (
          <div className="mb-3">
            <span className="inline-flex items-center font-mono text-[11px] font-bold tracking-[0.04em] uppercase text-lime leading-none">
              {project.metric}
            </span>
          </div>
        )}

        <h3 className="text-[clamp(1.1rem,1rem+0.4vw,1.4rem)] font-heading font-bold text-content tracking-[-0.02em] group-hover:text-lime transition-colors duration-200 leading-snug mb-2.5">
          {project.title}
        </h3>

        <p className="text-content-muted leading-relaxed mb-5 line-clamp-3 text-[clamp(0.88rem,0.86rem+0.12vw,0.96rem)]">
          {project.description}
        </p>

        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className={TAG_CLASS}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </>
  );
}

export function CompactCard({ project, num }: { project: Project; num: string }) {
  const mainId = safePublicId(project.image, "");
  const d1 = safePublicId(project.gallery?.[0], project.image);
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <div className="p-3 pb-0">
        <div className="relative w-full aspect-4/3">
          <div className="absolute top-2 left-3 text-[clamp(2.5rem,5vw,4rem)] z-0">
            <ProjectNumber num={num} />
          </div>

          <div className="absolute inset-0 z-10">
            <MediaPanel
              publicId={mainId}
              alt={`Screenshot of ${project.title}`}
              objectPos="topCenter"
              className="w-full h-full"
            />
          </div>

          <div className="absolute right-3 bottom-3 w-[42%] h-[36%] z-20">
            <MediaPanel
              publicId={d1}
              alt={`Detail of ${project.title}`}
              objectPos="bottomRight"
              className="w-full h-full"
            />
          </div>

          {project.metric && (
            <div className="absolute left-3 bottom-3 z-30">
              <div className="rounded-md border border-white/6 bg-(--bg-elevated)/90 backdrop-blur-xl px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <span className="font-mono text-[9px] font-bold tracking-[0.04em] uppercase text-lime leading-none">
                  {project.metric}
                </span>
              </div>
            </div>
          )}

          <div className="absolute top-3 right-3 z-30">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6 flex flex-col">
        <h3 className="text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] font-heading font-bold text-content tracking-[-0.02em] group-hover:text-lime transition-colors duration-200 leading-snug mb-2">
          {project.title}
        </h3>

        <p className="text-content-muted leading-relaxed mb-4 line-clamp-2 text-[clamp(0.86rem,0.84rem+0.12vw,0.93rem)]">
          {project.description}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className={TAG_CLASS}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </>
  );
}
