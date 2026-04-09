export const TAG_CLASS =
  "inline-flex items-center px-2.5 py-1 font-mono text-[clamp(0.6rem,0.58rem+0.1vw,0.68rem)] font-semibold tracking-[0.04em] uppercase text-accent/80 bg-accent/7 rounded-full";

export const PANEL_CLASS =
  "rounded-2xl overflow-hidden border border-white/6 bg-surface-alt shadow-[0_10px_34px_rgba(0,0,0,0.45)]";

export const OBJECT_POS_CLASS: Record<
  "center" | "topCenter" | "bottomRight" | "bottomCenter",
  string
> = {
  center: "object-center",
  topCenter: "object-[center_top]",
  bottomRight: "object-[right_bottom]",
  bottomCenter: "object-[center_bottom]",
};

export function safePublicId(value: unknown, fallback: unknown) {
  const pick = (v: unknown) =>
    typeof v === "string" && v.trim().length > 0 ? v : "";
  return pick(value) || pick(fallback);
}