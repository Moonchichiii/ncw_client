import { memo } from "react";
import { ArrowUpRight } from "lucide-react";

const META_ITEMS = [
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Location", value: "Sweden · France" },
  { label: "Focus", value: "Performance · A11y · Security" },
  { label: "Stack", value: "Django · React · TypeScript" },
] as const;

const Hero = memo(() => (
  <section
    id="hero"
    className="relative min-h-svh bg-surface overflow-hidden"
  >
    {/* Subtle background grid */}
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            to right,
            rgba(207, 234, 99, 0.03) 0 1px,
            transparent 1px 72px
          ),
          repeating-linear-gradient(
            to bottom,
            rgba(207, 234, 99, 0.03) 0 1px,
            transparent 1px 72px
          )
        `,
      }}
    />

    {/* Radial glow */}
    <div
      className="absolute top-0 left-0 w-[1000px] h-[600px] pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(207, 234, 99, 0.05), transparent 60%)",
      }}
    />

    <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
      {/* Meta rail */}
      <div className="pt-28 sm:pt-36 pb-6 border-b border-edge-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {META_ITEMS.map((item) => (
            <div key={item.label}>
              <span className="block text-[10px] font-mono font-medium text-content-faint uppercase tracking-[0.1em] mb-1">
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

        {/* Headline */}
        <div className="max-w-[16ch]">
          <h1 className="font-heading font-extrabold tracking-[-0.045em] leading-[0.92] text-[clamp(2.8rem,7.5vw,6rem)] text-content">
            Building fast,
            <br />
            accessible &
            <br />
            <span className="text-lime">beautiful</span> web
            apps.
          </h1>
        </div>

        {/* Identity line */}
        <p className="mt-10 text-lg text-content-secondary max-w-xl leading-relaxed">
          <span className="text-content font-medium">
            Mats Gustafsson
          </span>{" "}
          — Full-Stack Developer crafting high-performance
          applications with precision and lasting quality.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#work" className="btn-lime">
            View projects
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
          <a href="#contact" className="btn-outline">
            Get in touch
          </a>
          <a
            href="/cv-en.pdf"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV ↓
          </a>
        </div>
      </div>
    </div>
  </section>
));

Hero.displayName = "Hero";
export default Hero;