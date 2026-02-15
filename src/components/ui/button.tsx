import { memo, type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "lime" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-[46px] px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  lime: "btn-lime",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

const Button = memo<ButtonProps>(
  ({
    children,
    variant = "lime",
    size = "md",
    isLoading = false,
    fullWidth = false,
    disabled,
    className,
    ...props
  }) => {
    const isDisabled = disabled ?? isLoading;

    return (
      <button
        className={clsx(
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && "w-full",
          isDisabled && "opacity-50 pointer-events-none",
          className,
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;