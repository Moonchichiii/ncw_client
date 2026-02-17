import { memo } from "react";
import { Download } from "@/icons/lucide";

const OFFERS = [
  {
    num: "01",
    title: "Product Engineering",
    outcome:
      "Your product ships on time with code your next developer can actually read.",
  },
  {
    num: "02",
    title: "Performance",
    outcome:
      "Sub-second loads. Better search rankings. Users that don't bounce.",
  },
  {
    num: "03",
    title: "Accessibility",
    outcome:
      "Everyone can use your product — keyboard, screen reader, any device.",
  },
  {
    num: "04",
    title: "Secure Delivery",
    outcome:
      "Ship any time without crossing your fingers. Automated checks catch what humans miss.",
  },
] as const;

const About = memo(() => (
  <section id="about" className="py-(--space-section) section-light">
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <p className="section-label mb-4">About</p>
          <h2 className="font-heading font-bold tracking-[-0.04em] leading-[0.98] md:leading-[0.95] text-(--text-h2)">
            Building for
            <br />
            the web
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-content-secondary leading-relaxed max-w-[52ch]">
            I help teams ship web products that are fast by default,
            accessible out of the box, and backed by infrastructure
            that doesn&apos;t break at 2&nbsp;AM.
          </p>

          <p className="mt-4 text-content-faint leading-relaxed max-w-[52ch] text-sm">
            Full-stack in Django, React, and TypeScript. Trained at
            Code Institute — sharpened through real-world delivery.
          </p>

          <a
            href="/cv-en.pdf"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-content-faint hover:text-content transition-colors group"
          >
            <Download
              size={14}
              strokeWidth={1.6}
              className="group-hover:text-accent transition-colors"
              aria-hidden="true"
            />
            Résumé (PDF)
          </a>
        </div>
      </div>

      {/* What I deliver */}
      <div>
        <p className="ui-label mb-8">What you get</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFERS.map((offer) => (
            <div
              key={offer.num}
              className="card p-7 group transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[clamp(0.7rem,0.68rem+0.1vw,0.78rem)] font-semibold tracking-[0.08em] text-content-faint">
                  {offer.num}
                </span>
                <span className="text-[clamp(1.1rem,1.05rem+0.3vw,1.3rem)] font-heading font-bold text-content group-hover:text-accent transition-colors leading-snug">
                  {offer.title}
                </span>
              </div>
              <p className="text-sm text-content-secondary leading-relaxed">
                {offer.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

About.displayName = "About";
export default About;