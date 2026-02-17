import { memo, useState, useCallback } from "react";
import { Plus, X } from "@/icons/lucide";

const FAQ_ITEMS = [
  {
    q: "What do you need from me to start?",
    a: "A clear goal, existing links/assets (if any), and one point of contact for feedback. I'll help shape scope into an actionable plan.",
  },
  {
    q: "How do pricing and milestones work?",
    a: "Either fixed-scope milestones or hourly for open-ended work. I propose milestones upfront so you always know what's next and what it costs.",
  },
  {
    q: "Can you improve an existing site instead of rebuilding?",
    a: "Yes. I can audit performance, accessibility, and code quality—then refactor or rebuild only the parts that create friction.",
  },
  {
    q: "How do you measure performance and accessibility?",
    a: "I use Lighthouse/Core Web Vitals targets, real device checks, keyboard navigation, and screen reader testing. The goal is measurable improvements, not guesses.",
  },
  {
    q: "What happens after launch?",
    a: "You get a clean handover, documentation, and optional support. I can also monitor performance and fix issues quickly after release.",
  },
  {
    q: "Do you work with startups, agencies, or in-house teams?",
    a: "All of the above. I can ship solo, collaborate with teams, or plug into an existing workflow and repo without slowing things down.",
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
      <span className="font-medium text-content group-hover:text-accent transition-colors pr-4 text-[clamp(0.98rem,0.95rem+0.2vw,1.06rem)] leading-snug">
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