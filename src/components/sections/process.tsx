import { memo } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    duration: "1–2 days",
    desc: "Clarify scope, outcomes, and constraints. Define what success looks like before writing code.",
  },
  {
    num: "02",
    title: "Build",
    duration: "1–4 weeks",
    desc: "Clean architecture, type-safe code, and test coverage. Iterative delivery with clear checkpoints.",
  },
  {
    num: "03",
    title: "Polish",
    duration: "3–5 days",
    desc: "Performance tuning, accessibility audit, and UX refinement. Every detail matters.",
  },
  {
    num: "04",
    title: "Deploy",
    duration: "1–2 days",
    desc: "CI/CD pipelines, security scanning, monitoring setup. Ship with confidence.",
  },
] as const;

const Process = memo(() => (
  <section
    id="process"
    className="py-24 sm:py-32 bg-surface border-t border-edge"
  >
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="section-label mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter leading-[0.95] text-content">
            How I Work
          </h2>
        </div>
        <p className="text-content-secondary text-sm max-w-sm leading-relaxed">
          A clear, repeatable process that keeps projects on
          track and outcomes predictable.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="card p-8 group hover:border-lime/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono font-medium text-lime">
                {step.num}
              </span>
              <span className="text-[11px] font-mono text-content-faint">
                {step.duration}
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-content mb-3 tracking-tight group-hover:text-lime transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-content-secondary leading-relaxed line-clamp-2">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
));

Process.displayName = "Process";
export default Process;