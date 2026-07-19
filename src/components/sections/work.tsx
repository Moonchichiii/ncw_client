import { memo } from "react";
import ProjectCard from "@/components/ui/project-card";
import { PROJECTS } from "@/data/projects";

const Work = memo(() => {
  // Deliberate hierarchy: own SaaS products dominant, client work paired below.
  const [hero, flagship, ...rest] = PROJECTS;
  const paired = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <section id="work" className="py-(--space-section) bg-surface">
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-(--space-block)">
          <div data-reveal>
            <p className="section-label mb-4">Work</p>
            <h2 className="font-heading font-bold tracking-[-0.04em] leading-[0.98] md:leading-[0.95] text-content text-[clamp(2rem,1.4rem+2.2vw,3.2rem)]">
              Selected Projects
            </h2>
          </div>
          <p
            className="text-content-secondary leading-relaxed max-w-[44ch] text-[clamp(0.95rem,0.92rem+0.2vw,1.05rem)]"
            data-reveal
          >
            Real builds — measured by load times, accessibility
            scores, and clean handover.
          </p>
        </div>

        {/* Featured hero */}
        {hero && (
          <div data-reveal>
            <ProjectCard project={hero} variant="hero" index={0} />
          </div>
        )}

        {/* Flagship wide card */}
        {flagship && (
          <div className="mt-4 md:mt-5" data-reveal>
            <ProjectCard project={flagship} variant="wide" index={1} />
          </div>
        )}

        {/* Paired grid */}
        {paired.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
            {paired.map((p, i) => (
              <div key={p.id} data-reveal>
                <ProjectCard project={p} variant="compact" index={i + 2} />
              </div>
            ))}
          </div>
        )}

        {/* Remaining wide cards */}
        {remaining.map((p, i) => (
          <div key={p.id} className="mt-4 md:mt-5" data-reveal>
            <ProjectCard
              project={p}
              variant="wide"
              index={i + 2 + paired.length}
            />
          </div>
        ))}
      </div>
    </section>
  );
});

Work.displayName = "Work";
export default Work;