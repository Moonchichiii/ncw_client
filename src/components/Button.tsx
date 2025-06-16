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
    primary: 'bg-interactive-primary hover:bg-interactive-hover text-text-inverse shadow-lg hover:shadow-xl focus:ring-border-focus',
    secondary: 'bg-bg-elevated hover:bg-bg-secondary border-2 border-border-primary text-text-primary shadow-lg hover:shadow-xl focus:ring-border-focus',
    outline: 'bg-transparent hover:bg-bg-secondary border-2 border-border-primary text-text-primary shadow-sm hover:shadow-md focus:ring-border-focus',
    ghost: 'bg-transparent hover:bg-bg-secondary text-text-primary hover:text-interactive-primary shadow-none focus:ring-border-focus'
} as const

const SIZE_CLASSES = {
    sm: 'px-6 py-3 text-sm rounded-xl min-w-[140px]',
    md: 'px-8 py-4 text-lg rounded-2xl min-w-[180px]',
    lg: 'px-10 py-5 text-xl rounded-2xl min-w-[220px]'
} as const

const BASE_CLASSES = 'inline-flex items-center justify-center gap-2 font-bold transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'

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
    const combinedClasses = clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className
    )

    const isDisabled = disabled ?? isLoading

    return (
        <button
            className={combinedClasses}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    {leftIcon && <span className="w-5 h-5 flex items-center justify-center">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="w-5 h-5 flex items-center justify-center">{rightIcon}</span>}
                </>
            )}
        </button>
    )
})

Button.displayName = 'Button'

export default Button