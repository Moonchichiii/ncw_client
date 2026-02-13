import { memo } from "react";
import { ArrowUpRight } from "lucide-react";

const META_ITEMS = [
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Location", value: "Sweden · France" },
  { label: "Focus", value: "Performance · A11y · Security" },
  { label: "Stack", value: "Django · React · TypeScript" },
] as const;

const Hero = memo(() => (
  <section id="hero" className="relative min-h-svh bg-surface overflow-hidden">
    {/* Radial glow (keep) */}
    <div
      className="absolute top-0 left-0 w-250 h-150 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(207, 234, 99, 0.05), transparent 60%)",
      }}
    />

    <div className="relative z-10 mx-auto w-full max-w-300 xl:max-w-360 2xl:max-w-400 px-5 sm:px-8 2xl:px-12">
      {/* Meta rail */}
      <div className="pt-28 sm:pt-36 pb-6 border-b border-edge-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {META_ITEMS.map((item) => (
            <div key={item.label}>
              <span className="block text-[10px] font-mono font-medium text-content-faint uppercase tracking-widest mb-1">
                {item.label}
              </span>
              <span className="block text-sm text-content-secondary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="pt-16 sm:pt-24 pb-20 sm:pb-32">
        {/* Availability badge */}
        <div className="flex items-center gap-2.5 mb-10">
          <span className="status-dot" />
          <span className="text-xs font-mono font-medium text-accent tracking-wide uppercase">
            Available for work
          </span>
        </div>

        {/* Wide layout: left headline, right copy+CTAs */}
        <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-12 items-start">
          {/* LEFT */}
          <div className="xl:col-span-7">
            <h1 className="font-heading font-extrabold tracking-[-0.045em] leading-[0.92] text-[clamp(2.6rem,5vw,5.2rem)] text-content">
  Engineering fast,
  <br />
  accessible &
  <br />
  <span className="text-lime">scalable</span> web systems.
</h1>

          </div>

          {/* RIGHT */}
          <div className="xl:col-span-5 xl:pt-4">
            <p className="text-lg text-content-secondary leading-relaxed max-w-md">
              <span className="text-content font-medium">Mats Gustafsson</span> — Full-stack developer
              building modern products with clean architecture, strong UX, and performance-first delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#work" className="btn-lime">
                See recent work
                <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>

              <a href="#contact" className="btn-ghost text-sm">
                Get in touch →
              </a>

              <a
                href="/cv-en.pdf"
                className="btn-ghost text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download résumé (PDF)
              </a>
            </div>

            {/* Optional micro-proof line */}
            <p className="mt-6 text-[12px] text-content-faint">
              Performance budgets. WCAG AA. Secure CI/CD. Clean handover.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
));

Hero.displayName = "Hero";
export default Hero;
