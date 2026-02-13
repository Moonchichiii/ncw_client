import { memo, useState, useCallback } from "react";
import { Plus, X } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What's your typical project timeline?",
    a: "Most projects take 2–6 weeks depending on scope. I deliver in iterations so you see progress early and often.",
  },
  {
    q: "What stack do you use?",
    a: "Django/DRF or FastAPI on the backend, React with TypeScript on the frontend. Docker, CI/CD, and cloud deployment included.",
  },
  {
    q: "Can you work with existing codebases?",
    a: "Absolutely. I regularly audit, refactor, and extend existing applications. Clean integration is part of the process.",
  },
  {
    q: "How do you handle accessibility and performance?",
    a: "Both are built in from day one — not bolted on at the end. I test with Lighthouse, axe, and screen readers throughout development.",
  },
  {
    q: "Do you work with startups or established teams?",
    a: "Both. I've worked with solo founders building MVPs and with established teams extending production systems.",
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
      className="w-full flex items-center justify-between py-6 text-left group hover:bg-surface-accent/20 -mx-3 px-3 rounded-sm transition-colors"
      aria-expanded={isOpen}
    >
      <span className="text-[15px] font-medium text-content group-hover:text-lime transition-colors pr-4">
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
        isOpen ? "max-h-40 pb-6" : "max-h-0"
      }`}
    >
      <p className="text-sm text-content-secondary leading-relaxed max-w-2xl px-3 -mx-3">
        {a}
      </p>
    </div>
  </div>
));

FaqItem.displayName = "FaqItem";

const Faq = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    null,
  );

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-surface-alt border-t border-edge"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <p className="section-label mb-4">FAQ</p>
            <h2 className="text-4xl font-heading font-bold tracking-tighter leading-[0.95] text-content">
              Common
              <br />
              questions
            </h2>
          </div>

          {/* Right */}
          <div className="lg:col-span-8 border-t border-edge">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
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