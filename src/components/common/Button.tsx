import { memo, type ReactNode, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    fullWidth?: boolean
}

const VARIANT_CLASSES = {
    primary: 'bg-interactive-primary hover:bg-interactive-hover text-text-inverse focus:ring-border-focus',
    secondary: 'bg-bg-elevated hover:bg-bg-secondary border border-border-primary text-text-primary focus:ring-border-focus',
    outline: 'bg-transparent hover:bg-bg-secondary border border-border-primary text-text-primary focus:ring-border-focus',
    ghost: 'bg-transparent hover:bg-bg-secondary text-text-primary hover:text-interactive-primary focus:ring-border-focus'
} as const

const SIZE_CLASSES = {
    sm: 'px-3 py-2 text-sm rounded-2xl sm:px-4 sm:py-2.5',
    md: 'px-4 py-2.5 text-base rounded-2xl sm:px-6 sm:py-3 sm:text-lg',
    lg: 'px-5 py-3 text-lg rounded-3xl sm:px-8 sm:py-4 sm:text-xl'
} as const

const BASE_CLASSES = 'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'

const HOVER_EFFECTS = 'hover:shadow-md hover:shadow-interactive-primary/20 active:scale-[0.98] transition-all duration-150'

// Helper component for loading state
const LoadingContent = memo(() => (
    <>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span>Loading...</span>
    </>
))

LoadingContent.displayName = 'LoadingContent'

// Helper component for icon wrapper
const IconWrapper = memo<{ children: ReactNode }>(({ children }) => (
    <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
        {children}
    </span>
))

IconWrapper.displayName = 'IconWrapper'

// Helper component for button content
const ButtonContent = memo<{
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children: ReactNode
}>(({ leftIcon, rightIcon, children }) => (
    <>
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        <span>{children}</span>
        {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </>
))

ButtonContent.displayName = 'ButtonContent'

// Helper function to determine if hover effects should be applied
const shouldApplyHoverEffects = (variant: ButtonVariant, isDisabled: boolean): boolean => {
    return (variant === 'primary' || variant === 'secondary') && !isDisabled
}

// Helper function to build CSS classes
interface ButtonClassOptions {
    variant: ButtonVariant
    size: ButtonSize
    fullWidth: boolean
    isDisabled: boolean
    className?: string
}

const buildButtonClasses = ({ variant, size, fullWidth, isDisabled, className }: ButtonClassOptions): string => {
    const hasHoverEffects = shouldApplyHoverEffects(variant, isDisabled)
   
    return clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        hasHoverEffects && HOVER_EFFECTS,
        fullWidth && 'w-full',
        className
    )
}

const Button = memo<ButtonProps>(({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    className,
    ...props
}) => {
    const isDisabled = disabled ?? isLoading
    const buttonClasses = buildButtonClasses({
        variant,
        size,
        fullWidth,
        isDisabled,
        className
    })

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <LoadingContent />
            ) : (
                <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
                    {children}
                </ButtonContent>
            )}
        </button>
    )
})

Button.displayName = 'Button'

export default Button