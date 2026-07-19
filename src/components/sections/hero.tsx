import { memo, useRef, useLayoutEffect } from "react";
import { ArrowUpRight } from "@/icons/lucide";
import { gsap, prefersReducedMotion } from "@/lib/motion/gsap";

const HERO_IMAGE_ID = "ncw/ihpfsxqnhbbbqu6jnnvk";

const Hero = memo(() => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const rootRef = useRef<HTMLElement>(null);

  const heroSrc = cloudName
    ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_640/${HERO_IMAGE_ID}`
    : null;

  const heroSrcSet = cloudName
    ? [
        `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_320/${HERO_IMAGE_ID} 320w`,
        `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_480/${HERO_IMAGE_ID} 480w`,
        `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_640/${HERO_IMAGE_ID} 640w`,
      ].join(", ")
    : undefined;

  /*
   * Entrance sequence. One orchestrated moment, ~0.8s total, ease-out only.
   * The portrait animates scale (not opacity) so the mobile LCP element is
   * painted immediately; text uses fast fades so the headline is readable
   * well under half a second in.
   */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      tl.from("[data-hero='badge']", {
        y: 14,
        autoAlpha: 0,
        duration: 0.4,
      })
        .from(
          "[data-hero='title']",
          { y: 26, autoAlpha: 0, duration: 0.55 },
          "-=0.22",
        )
        .from(
          "[data-hero='intro']",
          { y: 18, autoAlpha: 0, duration: 0.45 },
          "-=0.32",
        )
        .from(
          "[data-hero='ctas']",
          { y: 14, autoAlpha: 0, duration: 0.4 },
          "-=0.28",
        )
        .from(
          "[data-hero='strip']",
          { autoAlpha: 0, duration: 0.5 },
          "-=0.2",
        )
        .from(
          "[data-hero='portrait']",
          {
            scale: 1.035,
            duration: 1.1,
            ease: "power2.out",
            transformOrigin: "center bottom",
          },
          0,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative min-h-[92svh] bg-surface overflow-hidden flex items-end"
    >
      {/* Ambient glow — top-left */}
      <div
        className="absolute top-0 left-0 w-250 h-150 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(207, 234, 99, 0.06), transparent 60%)",
        }}
      />

      {/* Hero portrait — centered on mobile, right-anchored on desktop */}
      {heroSrc && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
         <img
            src={heroSrc}
            srcSet={heroSrcSet}
            sizes="(min-width: 1024px) 30vw, 70vw"
            alt=""
            width="640"
            height="960"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            data-hero="portrait"
            className="absolute left-1/2 top-[9svh] h-[30svh] w-auto -translate-x-1/2 object-contain object-bottom opacity-90 lg:left-auto lg:top-auto lg:right-[27%] lg:bottom-[30%] lg:h-[55vh] lg:max-w-125 lg:translate-x-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              maskComposite: "intersect",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-300 px-5 sm:px-8 pb-16 sm:pb-24 pt-[44svh] lg:pt-40">
        <div
          className="flex items-center gap-2.5 mb-12 sm:mb-16"
          data-hero="badge"
        >
          <span className="status-dot" />
          <span className="text-xs font-mono font-medium text-accent tracking-wide uppercase">
            Available for work
          </span>
        </div>

        <h1
          className="font-heading font-extrabold tracking-[-0.045em] leading-[0.92] md:leading-[0.88] max-w-[20ch]"
          style={{ fontSize: "var(--text-h1)" }}
          data-hero="title"
        >
          I build fast, resilient
          <br />
          web systems
          <span className="text-lime">.</span>
        </h1>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5" data-hero="intro">
            <p
              className="text-content-secondary leading-relaxed max-w-[42ch]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              <span className="text-content font-medium">Mats Gustafsson</span>{" "}
              — full-stack developer shipping performant, accessible products
              from first commit to production. Based in Sweden&nbsp;&&nbsp;France.
            </p>
          </div>

          <div
            className="md:col-span-7 flex flex-wrap items-center gap-4 md:justify-end"
            data-hero="ctas"
          >
            <a href="#work" className="btn-lime">
              See the work
              <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <a href="#contact" className="btn-ghost text-sm">
              Start a project →
            </a>
          </div>
        </div>

        <div
          className="mt-16 sm:mt-20 border-t border-edge-subtle pt-5"
          data-hero="strip"
        >
            <p className="text-xs font-mono text-content-faint tracking-wide">
            Django · Wagtail · FastAPI · PostgreSQL · Rust · DuckDB · React · Next.js · TypeScript · HTMX · Tailwind CSS
            </p>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
