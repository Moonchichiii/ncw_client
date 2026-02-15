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
    className="py-[var(--space-section)] bg-surface border-t border-edge"
  >
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="section-label mb-4">Process</p>
          <h2 className="font-heading font-bold tracking-[-0.035em] leading-[1.02] text-content">
            How I Work
          </h2>
        </div>
        <p className="text-[clamp(0.95rem,0.9rem+0.2vw,1.05rem)] text-content-secondary leading-relaxed max-w-[50ch]">
          A clear, repeatable process that keeps projects on track and
          outcomes predictable.
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
              <span className="font-mono text-[var(--text-label)] text-lime tracking-[0.08em]">
                {step.num}
              </span>
              <span className="font-mono text-[var(--text-label)] text-content-faint tracking-[0.08em]">
                {step.duration}
              </span>
            </div>
            <h3 className="text-[clamp(1.25rem,1.15rem+0.4vw,1.5rem)] font-heading font-bold tracking-[-0.02em] text-content mb-3 group-hover:text-lime transition-colors">
              {step.title}
            </h3>
            <p className="text-[0.95rem] text-content-secondary leading-relaxed max-w-[55ch] line-clamp-2">
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