import { memo, useState, useCallback } from "react";
import { Plus, X } from "@/icons/lucide";

const FAQ_ITEMS = [
  {
    q: "What do you need from me to get started?",
    a: "A clear problem statement, access to your existing repo or assets, and a single decision-maker. I handle the architecture and execution; I just need to understand your business constraints.",
  },
  {
    q: "How do pricing and milestones work?",
    a: "I map out the technical architecture and deliverables upfront. For most projects, we agree on fixed-cost milestones based on shipped features, not estimated hours. No surprise billing.",
  },
  {
    q: "Can you rescue or refactor an existing codebase?",
    a: "Yes. I routinely untangle legacy Django or React applications. I'll audit the codebase, establish CI/CD, add test coverage, and incrementally refactor bottlenecks without breaking production.",
  },
  {
    q: "How do you measure performance and accessibility?",
    a: "Automated tooling. Lighthouse CI for Core Web Vitals, aXe-core for WCAG AA compliance, backed by manual screen reader testing. If it fails the pipeline, it doesn't ship.",
  },
  {
    q: "What happens after deployment?",
    a: "You own 100% of the code and infrastructure. I provide clean documentation, containerized environments, and automated pipelines so your team can take over immediately.",
  },
  {
    q: "How do you integrate with in-house engineering teams?",
    a: "Seamlessly. I follow standard Git flows, write clean PRs that pass your internal reviews, and adapt to your sprint cadence without needing hand-holding.",
  },
] as const;

const FaqItem = memo<{
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}>(({ q, a, isOpen, onToggle }) => (
  <div className="border-b border-edge">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-7 text-left group hover:bg-surface-accent/20 -mx-3 px-3 rounded-sm transition-colors"
      aria-expanded={isOpen}
    >
      <span className="font-bold text-content group-hover:text-accent transition-colors pr-4 text-[clamp(1.05rem,1rem+0.2vw,1.15rem)] leading-snug">
        {q}
      </span>
      <span className="shrink-0 text-content-faint">
        {isOpen ? (
          <X
            size={16}
            strokeWidth={1.6}
            className="transition-transform duration-200"
            aria-hidden="true"
          />
        ) : (
          <Plus
            size={16}
            strokeWidth={1.6}
            className="transition-transform duration-200"
            aria-hidden="true"
          />
        )}
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-44 pb-7" : "max-h-0"
      }`}
    >
      <p className="text-content-secondary leading-relaxed max-w-[65ch] px-3 -mx-3 text-[clamp(0.95rem,0.92rem+0.2vw,1.03rem)]">
        {a}
      </p>
    </div>
  </div>
));

FaqItem.displayName = "FaqItem";

const Faq = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="faq"
      className="py-(--space-section) section-light border-t border-edge"
    >
      <div className="mx-auto max-w-300 px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="font-heading font-bold tracking-[-0.04em] leading-[0.98] md:leading-[0.95] text-(--text-h2)">
              Things clients
              <br />
              usually ask
            </h2>
          </div>

          {/* Right */}
          <div className="lg:col-span-8 border-t border-edge">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Faq.displayName = "Faq";
export default Faq;