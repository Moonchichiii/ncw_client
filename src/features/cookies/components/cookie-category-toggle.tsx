import { memo, useCallback } from "react";
import type { CookieCategoryConfig } from "@/features/cookies/constants/cookie-categories";
import type { CookieCategory } from "@/features/cookies/hooks/use-cookie-consent";
import clsx from "clsx";

interface CookieCategoryToggleProps {
  category: CookieCategoryConfig;
  enabled: boolean;
  onChange: (id: CookieCategory, enabled: boolean) => void;
  disabled?: boolean;
}

const ToggleButton = ({
  enabled,
  disabled,
  required,
  onClick,
  label,
}: {
  enabled: boolean;
  disabled: boolean;
  required: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled || required}
    className={clsx(
      "relative w-12 h-6 rounded-full transition-colors duration-200",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
      enabled ? "bg-accent" : "bg-edge",
      (disabled || required) && "opacity-50 cursor-not-allowed",
    )}
    aria-label={label}
    aria-pressed={enabled}
    type="button"
    tabIndex={required ? -1 : 0}
  >
    <div
      className={clsx(
        "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
        enabled ? "translate-x-6" : "translate-x-0.5",
      )}
    />
  </button>
);

const CookieCategoryToggle = memo<CookieCategoryToggleProps>(
  ({ category, enabled, onChange, disabled = false }) => {
    const handleToggle = useCallback(() => {
      if (!disabled) {
        onChange(category.id, !enabled);
      }
    }, [category.id, enabled, onChange, disabled]);

    const Icon = category.icon;

    return (
      <div className="p-5 bg-surface-alt border border-edge rounded-xl hover:border-lime/30 transition-colors duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={clsx(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                category.required
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-surface-accent text-content-faint",
              )}
            >
              <Icon
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>
            <h3 className="text-sm font-heading font-semibold text-content">
              {category.name}
              {category.required && (
                <span className="ml-2 text-[10px] font-mono font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  Required
                </span>
              )}
            </h3>
          </div>

          <ToggleButton
            enabled={enabled}
            disabled={disabled}
            required={category.required}
            onClick={handleToggle}
            label={`${enabled ? "Disable" : "Enable"} ${category.name} cookies`}
          />
        </div>

        <p className="text-xs text-content-secondary leading-relaxed mb-2">
          {category.description}
        </p>
        <div className="text-[11px] text-content-faint">
          <span className="font-medium">Examples:</span>{" "}
          {category.examples.join(", ")}
        </div>
      </div>
    );
  },
);

CookieCategoryToggle.displayName = "CookieCategoryToggle";
export default CookieCategoryToggle;