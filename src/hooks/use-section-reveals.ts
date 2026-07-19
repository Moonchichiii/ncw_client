import { useLayoutEffect } from "react";
import {
  gsap,
  ScrollTrigger,
  registerGSAP,
  prefersReducedMotion,
} from "@/lib/motion/gsap";

/**
 * Reveals every [data-reveal] element the first time it enters the
 * viewport: a short rise + fade, batched so siblings stagger together.
 *
 * Rules (deliberate):
 * - once-only triggers — nothing re-animates or runs during scroll;
 * - transform + opacity only — compositor-friendly, no layout work;
 * - reduced motion → hook is a no-op and content is simply visible;
 * - initial hidden state is set from JS, so no-JS visitors and crawlers
 *   always see the full page.
 */
export function useSectionReveals(): void {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }
    registerGSAP();

    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (targets.length === 0) {
      return;
    }

    gsap.set(targets, { autoAlpha: 0, y: 24 });

    ScrollTrigger.batch(targets, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: true,
        }),
    });

    return () => {
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill();
      }
      gsap.set(targets, { clearProps: "all" });
    };
  }, []);
}
