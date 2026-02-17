import { memo } from "react";
import { ArrowUpRight } from "@/icons/lucide";

const Hero = memo(() => (
  <section
    id="hero"
    className="relative min-h-svh bg-surface overflow-hidden flex items-end"
  >
    <div
      className="absolute top-0 left-0 w-250 h-150 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(207, 234, 99, 0.06), transparent 60%)",
      }}
    />

    <div className="relative z-10 mx-auto w-full max-w-300 px-5 sm:px-8 pb-16 sm:pb-24 pt-32 sm:pt-40">
      <div className="flex items-center gap-2.5 mb-12 sm:mb-16">
        <span className="status-dot" />
        <span className="text-xs font-mono font-medium text-accent tracking-wide uppercase">
          Available for work
        </span>
      </div>

      <h1
        className="font-heading font-extrabold tracking-[-0.045em] leading-[0.92] md:leading-[0.88] max-w-[18ch]"
        style={{ fontSize: "var(--text-h1)" }}
      >
        I build web systems
        <br />
        that don&apos;t compromise
        <span className="text-lime">.</span>
      </h1>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-5">
          <p
            className="text-content-secondary leading-relaxed max-w-[42ch]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            <span className="text-content font-medium">
              Mats Gustafsson
            </span>{" "}
            — full-stack developer shipping performant, accessible
            products from first commit to production. Based in
            Sweden&nbsp;&&nbsp;France.
          </p>
        </div>

        <div className="md:col-span-7 flex flex-wrap items-center gap-4 md:justify-end">
          <a href="#work" className="btn-lime">
            See the work
            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>

          <a href="#contact" className="btn-ghost text-sm">
            Start a project →
          </a>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 border-t border-edge-subtle pt-5">
        <p className="text-xs font-mono text-content-faint tracking-wide">
          Django · React · TypeScript · Accessible · Sub-second loads
        </p>
      </div>
    </div>
  </section>
));

Hero.displayName = "Hero";
export default Hero;