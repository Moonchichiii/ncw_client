import { memo } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    duration: "1–2 days",
    desc: "Clarify scope, success criteria, and constraints — so nothing gets built on assumptions.",
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
    desc: "Accessibility audit, performance pass, and UI refinement. This is what clients actually see.",
  },
  {
    num: "04",
    title: "Deploy",
    duration: "1–2 days",
    desc: "CI/CD pipelines, security scanning, monitoring setup. Ship with confidence, not crossed fingers.",
  },
] as const;

const Process = memo(() => (
  <section
    id="process"
    className="py-(--space-section) bg-surface border-t border-edge"
  >
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="section-label mb-4">Process</p>
          <h2 className="font-heading font-bold tracking-[-0.035em] leading-[1.02] text-(--text-h2)">
            How I Work
          </h2>
        </div>
        <p className="text-[clamp(0.95rem,0.9rem+0.2vw,1.05rem)] text-content-secondary leading-relaxed max-w-[50ch]">
          A clear, repeatable process that keeps projects on track and
          outcomes predictable.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        {STEPS.map((step, i) => (
          <div key={step.num} className="relative group">
            {i < STEPS.length - 1 && (
              <div
                className="hidden md:block absolute top-5 left-[calc(50%+1.25rem)] right-0 h-px bg-edge-subtle z-0"
                aria-hidden="true"
              />
            )}

            <div className="relative z-10 p-5 md:p-6 md:pt-0">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full border border-edge bg-surface flex items-center justify-center group-hover:border-lime/40 group-hover:bg-lime/5 transition-colors">
                  <span className="font-mono text-xs font-bold tracking-[0.08em] text-content-faint group-hover:text-lime transition-colors">
                    {step.num}
                  </span>
                </div>
                <span className="font-mono text-[11px] tracking-[0.08em] text-content-faint uppercase">
                  {step.duration}
                </span>
              </div>

              <h3 className="text-[clamp(1.15rem,1.08rem+0.3vw,1.35rem)] font-heading font-bold tracking-[-0.02em] text-content mb-3 group-hover:text-lime transition-colors">
                {step.title}
              </h3>

              <p className="text-[clamp(0.88rem,0.86rem+0.1vw,0.95rem)] text-content-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

Process.displayName = "Process";
export default Process;