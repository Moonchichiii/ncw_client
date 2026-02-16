import { memo } from "react";
import clsx from "clsx";

interface PaperBreakProps {
  className?: string;
  variant?: "wave" | "glow" | "paper";
  flip?: boolean;
}

const PaperBreak = memo<PaperBreakProps>(
  ({ className, variant = "wave", flip = false }) => {
    const base = "w-full overflow-hidden border-t border-edge";

    if (variant === "glow") {
      return (
        <div
          className={clsx(base, "bg-surface relative", className)}
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

    if (variant === "paper") {
      return (
        <div
          className={clsx(base, "section-paper relative", className)}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className={clsx("block w-full h-10", flip ? "scale-y-[-1]" : "")}
          >
            <path
              d="M0,10 C120,30 240,0 360,18 C480,36 600,6 720,22 C840,38 960,8 1080,20 C1140,26 1170,30 1200,24 L1200,60 L0,60 Z"
              fill="currentColor"
              opacity="0.08"
            />
            <path
              d="M0,22 C140,48 260,8 390,26 C520,44 640,12 770,28 C900,44 1020,14 1140,26 C1175,30 1190,32 1200,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.18"
            />
          </svg>
        </div>
      );
    }

    // wave (default)
    return (
      <div className={clsx(base, "bg-surface relative", className)} aria-hidden="true">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className={clsx("block w-full h-10", flip ? "scale-y-[-1]" : "")}
        >
          <path
            d="M0,22 C140,48 260,8 390,26 C520,44 640,12 770,28 C900,44 1020,14 1140,26 C1175,30 1190,32 1200,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.18"
          />
        </svg>
      </div>
    );
  },
);

PaperBreak.displayName = "PaperBreak";
export default PaperBreak;
