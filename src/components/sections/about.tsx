import { memo } from "react";
import { Code2, Server, Globe, Download } from "@/icons/lucide";
import { FRONTEND_SKILLS, BACKEND_SKILLS } from "@/data/skills";

const OFFERS = [
  {
    num: "01",
    title: "Product Engineering",
    desc: "Full-stack builds with Django, React, and TypeScript — designed for scale and maintainability.",
  },
  {
    num: "02",
    title: "Performance & CWV",
    desc: "Sub-second loads, optimized bundles, and measurable Core Web Vitals improvements.",
  },
  {
    num: "03",
    title: "Accessibility (WCAG AA)",
    desc: "Inclusive interfaces tested with keyboard navigation and screen readers.",
  },
  {
    num: "04",
    title: "Secure CI/CD",
    desc: "Hardened delivery pipelines with automated checks, scanning, and safe deploys.",
  },
] as const;

const About = memo(() => (
  <section
    id="about"
    className="py-[var(--space-section)] bg-surface-alt border-t border-edge"
  >
    <div className="mx-auto max-w-300 px-5 sm:px-8">
      {/* Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <p className="section-label mb-4">About</p>
          <h2 className="font-heading font-bold tracking-[-0.04em] leading-[0.98] md:leading-[0.95] text-content text-[clamp(2rem,1.4rem+2.2vw,3.2rem)]">
            Building for
            <br />
            the web
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-content-secondary leading-relaxed max-w-[52ch] text-[clamp(1rem,0.95rem+0.35vw,1.125rem)]">
            <span className="text-content font-medium">
              Mats Gustafsson
            </span>{" "}
            — Full-stack developer (Code Institute, 2024). I build
            fast, accessible products with clean architecture and
            secure delivery pipelines.
          </p>

          <a
            href="/cv-en.pdf"
            className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-content hover:text-lime transition-colors group"
          >
            <Download
              size={14}
              strokeWidth={1.6}
              className="group-hover:text-lime transition-colors"
              aria-hidden="true"
            />
            Download résumé (PDF)
          </a>
        </div>
      </div>

      {/* What I Offer */}
      <div className="mb-20">
        <h3 className="text-xs font-mono font-medium text-content-faint uppercase tracking-widest mb-3">
          What I Offer
        </h3>

        <p className="font-heading font-semibold text-content mb-8 max-w-[60ch] text-[clamp(1.05rem,1rem+0.35vw,1.25rem)] leading-snug">
          Practical engineering that improves speed, usability, and
          reliability — without overcomplicating the stack.
        </p>

        <div className="border-t border-edge">
          {OFFERS.map((offer) => (
            <div
              key={offer.num}
              className="group -mx-2 rounded-md px-2 py-6 border-b border-edge transition-colors hover:bg-surface-accent/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
                <span className="text-[var(--text-label)] font-mono text-content-faint w-10 shrink-0">
                  {offer.num}
                </span>

                <span className="text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] font-heading font-semibold text-content flex-1 group-hover:text-lime transition-colors leading-snug">
                  {offer.title}
                </span>

                <span className="text-sm text-content-secondary max-w-[48ch] leading-relaxed">
                  {offer.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Frontend */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Globe
              size={16}
              strokeWidth={1.6}
              className="text-content-faint"
              aria-hidden="true"
            />
            <h3 className="text-xs font-mono font-medium text-content-faint uppercase tracking-widest">
              Frontend
            </h3>
          </div>
          <ul className="space-y-3">
            {FRONTEND_SKILLS.map((skill) => (
              <li
                key={skill}
                className="flex items-center justify-between group/item text-[clamp(0.875rem,0.86rem+0.1vw,1rem)]"
              >
                <span className="text-content font-medium">
                  {skill}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-edge-subtle group-hover/item:bg-lime transition-colors"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Backend */}
        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <Server
              size={16}
              strokeWidth={1.6}
              className="text-content-faint"
              aria-hidden="true"
            />
            <h3 className="text-xs font-mono font-medium text-content-faint uppercase tracking-widest">
              Backend
            </h3>
          </div>
          <ul className="space-y-3">
            {BACKEND_SKILLS.map((skill) => (
              <li
                key={skill}
                className="flex items-center justify-between group/item text-[clamp(0.875rem,0.86rem+0.1vw,1rem)]"
              >
                <span className="text-content font-medium">
                  {skill}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-edge-subtle group-hover/item:bg-lime transition-colors"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Dev approach */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Code2
                size={16}
                strokeWidth={1.6}
                className="text-content-faint"
                aria-hidden="true"
              />
              <h3 className="text-xs font-mono font-medium text-content-faint uppercase tracking-widest">
                Approach
              </h3>
            </div>
            <ul className="space-y-3 text-content-secondary leading-relaxed text-[clamp(0.875rem,0.86rem+0.1vw,1rem)]">
              <li>Type-safe from API to UI</li>
              <li>Performance budgets on every build</li>
              <li>Accessibility tested, not assumed</li>
              <li>CI/CD with security scanning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
));

About.displayName = "About";
export default About;