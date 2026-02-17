import { memo } from "react";
import clsx from "clsx";

interface PaperBreakProps {
  className?: string;
  variant?: "line" | "glow" | "space" | "stats";
  flip?: boolean;
}

const STATS = [
  { value: "<1s", label: "Target load time" },
  { value: "AA+", label: "Accessibility standard" },
  { value: "0", label: "Deployment anxiety" },
] as const;

const PaperBreak = memo<PaperBreakProps>(
  ({ className, variant = "line", flip = false }) => {
    const base = "w-full overflow-hidden";

    if (variant === "stats") {
      return (
        <div
          className={clsx(
            base,
            "section-light border-y border-edge",
            className,
          )}
        >
          <div className="mx-auto max-w-300">
            <div className="stat-strip">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-strip-item">
                  <div className="stat-strip-value">
                    {stat.value}
                  </div>
                  <div className="stat-strip-label">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
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
          className={clsx(
            base,
            "bg-surface h-16 md:h-24",
            className,
          )}
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        className={clsx(base, "bg-surface", className)}
        aria-hidden="true"
      >
        <div className="mx-auto max-w-(--max-width) px-6">
          <div className="h-px bg-edge-subtle" />
        </div>
      </div>
    );
  },
);

PaperBreak.displayName = "PaperBreak";
export default PaperBreak;