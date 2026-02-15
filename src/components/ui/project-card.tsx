import { memo } from "react";
import { Github, ArrowUpRight } from "lucide-react";
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
        "group overflow-hidden bg-surface-elevated rounded-lg md:rounded-xl",
        "border border-edge-subtle",
        "hover:border-lime/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        "transition-[border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-px",
        "grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[360px_1fr]",
        featured ? "ring-1 ring-lime/10" : "",
        className,
      ].join(" ")}
    >
      {/* Media */}
      <div className="relative aspect-video md:aspect-auto md:h-full border-b md:border-b-0 md:border-r border-edge-subtle">
        <div className="w-full h-full overflow-hidden bg-surface-alt">
          <div className="w-full h-full grayscale-30 group-hover:grayscale-0 transition-[filter,transform] duration-500 motion-safe:group-hover:scale-[1.02]">
            <CloudinaryImg
              publicId={project.image}
              alt={`Screenshot of ${project.title}`}
              className="w-full h-full object-cover"
              priority={featured}
            />
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className="ui-label inline-flex items-center px-2.5 py-1 bg-surface/90 border border-edge-subtle rounded-md tracking-wide">
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col min-h-50">
        <h3 className="text-[18px] md:text-[19px] font-heading font-bold text-content tracking-[-0.02em] group-hover:text-lime transition-colors leading-snug line-clamp-1 mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-content-secondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags — single band */}
        <div className="mb-5 min-h-8">
          <div className="flex flex-wrap gap-2 max-h-8 overflow-hidden">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links pinned to bottom */}
        <div className="mt-auto flex items-center gap-5 pt-5 border-t border-edge-subtle">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-content hover:text-lime transition-colors"
            >
              Live site
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-content-secondary hover:text-content transition-colors"
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