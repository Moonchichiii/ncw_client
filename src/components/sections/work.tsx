import { memo } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import CloudinaryImg from "@/components/ui/cloudinary-image";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types";

const ProjectCard = memo<{
  project: Project;
  featured?: boolean;
}>(({ project, featured = false }) => (
  <article
    className={`group overflow-hidden flex flex-col bg-surface-elevated rounded-[var(--radius-lg)] border-transparent border hover:border-lime/15 hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all duration-200 ${
      featured ? "md:col-span-1" : ""
    }`}
  >
    {/* Image */}
    <div className="relative aspect-video w-full overflow-hidden bg-surface-alt">
      <div className="w-full h-full grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]">
        <CloudinaryImg
          publicId={project.image}
          alt={`Screenshot of ${project.title}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Status badge */}
      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center px-2.5 py-1 bg-surface/85 backdrop-blur-sm border border-edge-subtle rounded-md text-[11px] font-mono font-medium text-content-secondary">
          {project.status}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col grow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-[17px] font-heading font-bold text-content tracking-[-0.02em] group-hover:text-lime transition-colors leading-snug">
          {project.title}
        </h3>
      </div>

      <p className="text-sm text-content-secondary leading-relaxed mb-5 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="tag !text-[10px] !text-content-faint !bg-surface-accent !border-transparent"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="mt-auto flex items-center gap-5 pt-5 border-t border-edge-subtle">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-content hover:text-lime transition-colors"
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
            className="flex items-center gap-1.5 text-sm text-content-faint hover:text-content transition-colors"
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
));

ProjectCard.displayName = "ProjectCard";

const Work = memo(() => {
  const featured = PROJECTS.slice(0, 2);
  const rest = PROJECTS.slice(2);

  return (
    <section
      id="work"
      className="py-24 sm:py-32 bg-surface border-t border-edge"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-4">Work</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter leading-[0.95] text-content">
              Recent Works
            </h2>
          </div>
          <p className="text-content-secondary text-sm max-w-sm leading-relaxed">
            A selection of projects focused on performance,
            accessibility, and clean architecture.
          </p>
        </div>

        {/* Featured grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured
            />
          ))}
        </div>

        {/* Rest — 3 columns */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rest.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

Work.displayName = "Work";
export default Work;