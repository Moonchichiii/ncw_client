import type { Project } from "@/types";
import { TAG_CLASS, safePublicId } from "@/components/ui/project-card.constants";
import {
  ProjectNumber,
  StatusBadge,
  MetricPill,
  ProjectLinks,
  MediaPanel,
} from "./project-card.parts";

export function HeroCard({
  project,
  num,
}: {
  project: Project;
  num: string;
}) {
  const mainId = safePublicId(project.image, "");
  const d1 = safePublicId(project.gallery?.[0], project.image);
  const d2 = safePublicId(
    project.gallery?.[1],
    project.gallery?.[0] ?? project.image,
  );
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <div className="p-3 md:p-5">
        <div className="relative aspect-[2.35/1] w-full md:aspect-[2.6/1]">
          <div className="absolute left-4 top-2 z-0 text-[clamp(4.25rem,10vw,8.5rem)] md:left-6 md:top-3">
            <ProjectNumber num={num} />
          </div>

          <div className="absolute inset-0 z-10">
            <MediaPanel
              publicId={mainId}
              alt={`Screenshot of ${project.title}`}
              objectPos="topCenter"
              className="h-full w-full"
              priority
            />
          </div>

          <div className="absolute right-4 top-4 z-20 h-[52%] w-[30%] md:right-6 md:top-6">
            <MediaPanel
              publicId={d1}
              alt={`Detail of ${project.title}`}
              objectPos="bottomRight"
              className="h-full w-full"
            />
          </div>

          <div className="absolute bottom-4 right-4 z-30 h-[30%] w-[20%] md:bottom-6 md:right-6">
            <MediaPanel
              publicId={d2}
              alt={`Detail of ${project.title}`}
              objectPos="center"
              className="h-full w-full"
            />
          </div>

          {project.metric && (
            <div className="absolute bottom-6 left-6 z-30">
              <MetricPill metric={project.metric} />
            </div>
          )}

          <div className="absolute right-3 top-3 z-40 md:right-5 md:top-5">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pb-6 md:flex-row md:items-end md:gap-10 md:px-8 md:pb-8">
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 font-heading text-[clamp(1.25rem,1.1rem+0.8vw,1.85rem)] font-bold leading-tight tracking-[-0.03em] text-content transition-colors duration-200 group-hover:text-lime">
            {project.title}
          </h3>
          <p className="max-w-[60ch] text-[clamp(0.9rem,0.88rem+0.15vw,1rem)] leading-relaxed text-content-muted">
            {project.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-4 md:items-end">
          <div className="flex flex-wrap justify-start gap-1.5 md:justify-end">
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

export function WideCard({
  project,
  num,
}: {
  project: Project;
  num: string;
}) {
  const mainId = safePublicId(project.image, "");
  const d1 = safePublicId(project.gallery?.[0], project.image);
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <div className="p-3 md:p-4 md:pr-0">
        <div className="relative min-h-56 w-full md:min-h-64">
          <div className="absolute left-3 top-2 z-0 text-[clamp(3rem,6vw,5rem)]">
            <ProjectNumber num={num} />
          </div>

          <div className="absolute inset-0 z-10">
            <MediaPanel
              publicId={mainId}
              alt={`Screenshot of ${project.title}`}
              objectPos="topCenter"
              className="h-full w-full"
            />
          </div>

          <div className="absolute bottom-4 right-4 z-20 h-[44%] w-[34%]">
            <MediaPanel
              publicId={d1}
              alt={`Detail of ${project.title}`}
              objectPos="bottomCenter"
              className="h-full w-full"
            />
          </div>

          <div className="absolute right-3 top-3 z-30">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 pb-5 pt-4 md:px-7 md:py-7">
        {project.metric && (
          <div className="mb-3">
            <span className="inline-flex items-center font-mono text-[11px] font-bold uppercase leading-none tracking-[0.04em] text-lime">
              {project.metric}
            </span>
          </div>
        )}

        <h3 className="mb-2.5 font-heading text-[clamp(1.1rem,1rem+0.4vw,1.4rem)] font-bold leading-snug tracking-[-0.02em] text-content transition-colors duration-200 group-hover:text-lime">
          {project.title}
        </h3>

        <p className="mb-5 line-clamp-3 text-[clamp(0.88rem,0.86rem+0.12vw,0.96rem)] leading-relaxed text-content-muted">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className={TAG_CLASS}>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </>
  );
}

export function CompactCard({
  project,
  num,
}: {
  project: Project;
  num: string;
}) {
  const mainId = safePublicId(project.image, "");
  const d1 = safePublicId(project.gallery?.[0], project.image);
  const tags = project.tech.slice(0, 4);

  return (
    <>
      <div className="p-3 pb-0">
        <div className="relative aspect-4/3 w-full">
          <div className="absolute left-3 top-2 z-0 text-[clamp(2.5rem,5vw,4rem)]">
            <ProjectNumber num={num} />
          </div>

          <div className="absolute inset-0 z-10">
            <MediaPanel
              publicId={mainId}
              alt={`Screenshot of ${project.title}`}
              objectPos="topCenter"
              className="h-full w-full"
            />
          </div>

          <div className="absolute bottom-3 right-3 z-20 h-[36%] w-[42%]">
            <MediaPanel
              publicId={d1}
              alt={`Detail of ${project.title}`}
              objectPos="bottomRight"
              className="h-full w-full"
            />
          </div>

          {project.metric && (
            <div className="absolute bottom-3 left-3 z-30">
              <div className="rounded-md border border-white/6 bg-(--bg-elevated)/90 px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <span className="font-mono text-[9px] font-bold uppercase leading-none tracking-[0.04em] text-lime">
                  {project.metric}
                </span>
              </div>
            </div>
          )}

          <div className="absolute right-3 top-3 z-30">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <h3 className="mb-2 font-heading text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] font-bold leading-snug tracking-[-0.02em] text-content transition-colors duration-200 group-hover:text-lime">
          {project.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-[clamp(0.86rem,0.84rem+0.12vw,0.93rem)] leading-relaxed text-content-muted">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className={TAG_CLASS}>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </>
  );
}