import { memo } from "react";
import { Github, ArrowUpRight } from "@/icons/lucide";
import CloudinaryImg from "@/components/ui/cloudinary-image";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

const ProjectCard = memo<ProjectCardProps>(
  ({ project, featured = false, className = "" }) => (
    <article
      className={[
        "group overflow-hidden rounded-2xl md:rounded-3xl",
        "bg-surface-elevated/60 backdrop-blur-sm",
        "border border-white/4",
        "hover:border-lime/12",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5",
        "grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[380px_1fr]",
        featured
          ? "shadow-[0_0_0_1px_rgba(207,234,99,0.06),0_8px_32px_rgba(0,0,0,0.2)]"
          : "shadow-[0_2px_12px_rgba(0,0,0,0.12)]",
        className,
      ].join(" ")}
    >
      {/* Media */}
      <div className="relative md:h-full">
        <div className="p-3 pb-0 md:p-3 md:pb-3 md:pr-0 h-full">
          <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl bg-surface-alt aspect-video md:aspect-auto min-h-48">
            <div className="w-full h-full grayscale-[0.25] group-hover:grayscale-0 transition-[filter,transform] duration-500 ease-out motion-safe:group-hover:scale-[1.03]">
              <CloudinaryImg
                publicId={project.image}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover"
                priority={featured}
              />
            </div>

            {/* Status badge — floating pill */}
            <div className="absolute top-3 left-3">
              <span className="ui-label inline-flex items-center px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/8 rounded-full text-[10px]">
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-5 md:py-7 md:px-8 flex flex-col">
        <h3 className="text-lg md:text-xl font-heading font-bold text-content tracking-[-0.02em] group-hover:text-lime transition-colors duration-200 leading-snug line-clamp-1 mb-2.5">
          {project.title}
        </h3>

        <p className="text-[13.5px] text-content-muted leading-relaxed mb-5 line-clamp-2 md:line-clamp-3">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] uppercase text-accent/80 bg-accent/[0.07] rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links — clean bottom row */}
        <div className="mt-auto flex items-center gap-5">
          {project.links.demo && (
            <a
              href={project.links.demo}
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
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-content-faint hover:text-content-secondary transition-colors"
            >
              Source
              <Github
                size={13}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  ),
);

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;