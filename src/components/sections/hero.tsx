import { memo } from "react";
import { ArrowUpRight } from "@/icons/lucide";

const Hero = memo(() => (
  <section
    id="hero"
    className="relative min-h-svh bg-surface overflow-hidden"
  >
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
      {/* Simpler meta — just enough context, not a spec sheet */}
      <div className="pt-28 sm:pt-36 pb-6 border-b border-edge-subtle">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-content-secondary">
          <span>Full-Stack Developer</span>
          <span className="text-edge-subtle">·</span>
          <span>Sweden & France</span>
          <span className="text-edge-subtle">·</span>
          <span>Django · React · TypeScript</span>
        </div>
      </div>

      <div className="pt-16 sm:pt-24 pb-20 sm:pb-32">
        {/* Availability badge */}
        <div className="flex items-center gap-2.5 mb-10">
          <span className="status-dot" />
          <span className="text-xs font-mono font-medium text-accent tracking-wide uppercase">
            Available for work
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 xl:gap-12 items-start">
          {/* LEFT */}
          <div className="xl:col-span-7">
            <h1
              className="font-heading font-extrabold tracking-[-0.045em] leading-[0.98] md:leading-[0.92]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Web systems that
              <br />
              perform — fast,
              <br />
              accessible &amp;{" "}
              <span className="text-lime">built to scale.</span>
            </h1>
          </div>

          {/* RIGHT */}
          <div className="xl:col-span-5 xl:pt-4">
            <p
              className="mt-10 text-content-secondary leading-relaxed max-w-[46ch]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              <span className="text-content font-medium">
                Mats Gustafsson
              </span>{" "}
              — I ship performant, well-architected web products with
              secure delivery pipelines. From first commit to
              production.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
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
        </div>
      </div>
    </div>
  </section>
));

Hero.displayName = "Hero";
export default Hero;
