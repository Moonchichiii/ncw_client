import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {return true;}
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function registerGSAP(): void {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
