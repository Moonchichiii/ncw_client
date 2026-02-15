import { memo } from "react";
import ProjectCard from "@/components/ui/project-card";
import { PROJECTS } from "@/data/projects";

const Work = memo(() => (
  <section id="work" className="py-[var(--space-section)] bg-surface">
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-[var(--space-block)]">
        <div>
          <p className="section-label mb-4">Work</p>
          <h2 className="font-heading font-bold tracking-[-0.04em] leading-[0.98] md:leading-[0.95] text-content text-[clamp(2rem,1.4rem+2.2vw,3.2rem)]">
            Recent Works
          </h2>
        </div>

        <p className="text-content-secondary leading-relaxed max-w-[44ch] text-[clamp(0.95rem,0.92rem+0.2vw,1.05rem)]">
          A selection of projects focused on performance, accessibility, and clean architecture.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} featured={index < 2} />
        ))}
      </div>
    </div>
  </section>
));

Work.displayName = "Work";
export default Work;
