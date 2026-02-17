import { memo } from "react";
import clsx from "clsx";

interface PaperBreakProps {
  className?: string;
  variant?: "line" | "glow" | "space" | "marquee";
  flip?: boolean;
}

const MARQUEE_ITEMS = [
  { id: "crafting", text: "Crafting", style: "filled" },
  { id: "experiences", text: "Experiences", style: "outline" },
  { id: "engineering", text: "Engineering", style: "filled" },
  { id: "performance", text: "Performance", style: "outline" },
  { id: "building", text: "Building", style: "filled" },
  { id: "quality", text: "Quality", style: "outline" },
] as const;

const MARQUEE_TRACKS = ["track-a", "track-b"] as const;

const PaperBreak = memo<PaperBreakProps>(
  ({ className, variant = "line", flip = false }) => {
    const base = "w-full overflow-hidden";

    if (variant === "marquee") {
      return (
        <div
          className={clsx(base, "bg-surface py-16 md:py-24", className)}
          aria-hidden="true"
        >
          <div className="flex items-center gap-[clamp(2.5rem,6vw,5rem)] whitespace-nowrap select-none">
            {MARQUEE_TRACKS.map((track) => (
              <div
                key={track}
                className="flex items-center gap-[clamp(2.5rem,6vw,5rem)] shrink-0 animate-[scroll_18s_linear_infinite]"
              >
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={item.id}
                    className={clsx(
                      "text-[clamp(4rem,10vw,9rem)] font-heading font-[900] tracking-[-0.05em] leading-none uppercase",
                      item.style === "filled"
                        ? "text-white"
                        : "text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.12)]",
                    )}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (variant === "glow") {
      return (
        <div
          className={clsx(
            base,
            "bg-surface relative",
            className,
          )}
          aria-hidden="true"
        >
          <div
            className={clsx(
              "pointer-events-none absolute inset-0",
              flip ? "scale-y-[-1]" : "",
            )}
            style={{
              background:
                "radial-gradient(ellipse at 20% 0%, rgba(207, 234, 99, 0.06), transparent 60%)",
            }}
          />
          <div className="h-8" />
        </div>
      );
    }

    if (variant === "space") {
      return (
        <div
          className={clsx(base, "bg-surface h-16 md:h-24", className)}
          aria-hidden="true"
        />
      );
    }
    
    return (
      <div
        className={clsx(
          base,
          "bg-surface",
          className,
        )}
        aria-hidden="true"
      >
        <div className="mx-auto max-w-[var(--max-width)] px-6">
          <div className="h-px bg-edge-subtle" />
        </div>
      </div>
    );
  },
);

PaperBreak.displayName = "PaperBreak";
export default PaperBreak;