import { memo } from "react";
import ProjectCard from "@/components/ui/project-card";
import { PROJECTS } from "@/data/projects";

const Work = memo(() => (
  <section id="work" className="py-28 sm:py-36 bg-surface">
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <p className="section-label mb-4">Work</p>
          <h2 className="font-heading font-bold tracking-tighter leading-[1.05] text-content">
            Recent Works
          </h2>
        </div>
        <p className="text-content-secondary text-sm max-w-xs leading-relaxed">
          A selection of projects focused on performance,
          accessibility, and clean architecture.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index < 2}
          />
        ))}
      </div>
    </div>
  </section>
));

Work.displayName = "Work";
export default Work;