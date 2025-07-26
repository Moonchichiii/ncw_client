import { memo, type ReactNode, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    fullWidth?: boolean
    rounded?: boolean
}

const VARIANT_CLASSES = {
  primary: `
    btn-polish micro-bounce hover-glow
    bg-gradient-to-r from-interactive-primary to-interactive-hover
    hover:from-interactive-hover hover:to-interactive-primary
    text-text-inverse font-semibold
    border border-interactive-primary/20 hover:border-interactive-primary/40
    shadow-lg hover:shadow-xl hover:shadow-interactive-primary/30
    backdrop-filter backdrop-blur-md
    transform hover:scale-[1.02] active:scale-[0.98]
  `,
  secondary: `
    glass-enhanced micro-bounce hover-glow
    bg-bg-elevated/95 hover:bg-bg-elevated
    text-text-primary hover:text-interactive-primary font-medium
    border border-border-primary hover:border-interactive-primary
    shadow-md hover:shadow-lg hover:shadow-interactive-primary/10
    backdrop-filter backdrop-blur-md
    transform hover:scale-[1.02] active:scale-[0.98]
  `,
  outline: `
    micro-bounce
    bg-transparent hover:bg-interactive-primary/10
    text-text-primary hover:text-interactive-primary font-medium
    border-2 border-border-primary hover:border-interactive-primary
    hover:shadow-md hover:shadow-interactive-primary/10
    backdrop-filter hover:backdrop-blur-sm
    transform hover:scale-[1.02] active:scale-[0.98]
  `,
  ghost: `
    micro-bounce
    bg-transparent hover:glass-enhanced
    text-text-secondary hover:text-interactive-primary font-medium
    border border-transparent hover:border-interactive-primary/30
    hover:shadow-sm hover:backdrop-blur-sm
    transform hover:scale-[1.02] active:scale-[0.98]
  `,
  danger: `
    btn-polish micro-bounce hover-glow
    bg-gradient-to-r from-status-error to-red-600
    hover:from-red-600 hover:to-red-700
    text-text-inverse font-semibold
    border border-red-500/20 hover:border-red-500/40
    shadow-lg hover:shadow-xl hover:shadow-red-500/30
    backdrop-filter backdrop-blur-md
    transform hover:scale-[1.02] active:scale-[0.98]
  `,
  success: `
    btn-polish micro-bounce hover-glow
    bg-gradient-to-r from-status-success to-green-600
    hover:from-green-600 hover:to-green-700
    text-text-inverse font-semibold
    border border-green-500/20 hover:border-green-500/40
    shadow-lg hover:shadow-xl hover:shadow-green-500/30
    backdrop-filter backdrop-blur-md
    transform hover:scale-[1.02] active:scale-[0.98]
  `
} as const

const SIZE_CLASSES = {
    xs: `
      px-3 py-1.5 text-xs font-medium rounded-lg min-h-[28px]
      md:px-2.5 md:py-1 md:text-xs md:min-h-[26px]
      lg:px-2 lg:py-0.5 lg:text-xs lg:min-h-[24px]
    `,
    sm: `
      px-4 py-2 text-sm font-medium rounded-xl min-h-[36px]
      md:px-3.5 md:py-1.5 md:text-sm md:min-h-[32px]
      lg:px-3 lg:py-1 lg:text-sm lg:min-h-[30px]
    `,
    md: `
      px-6 py-3 text-base font-medium rounded-xl min-h-[44px]
      md:px-5 md:py-2.5 md:text-base md:min-h-[40px]
      lg:px-4 lg:py-2 lg:text-sm lg:min-h-[36px]
    `,
    lg: `
      px-8 py-4 text-lg font-semibold rounded-2xl min-h-[52px]
      md:px-6 md:py-3 md:text-base md:min-h-[44px]
      lg:px-5 lg:py-2.5 lg:text-sm lg:min-h-[38px]
      xl:px-4 xl:py-2 xl:text-sm xl:min-h-[36px]
    `,
    xl: `
      px-10 py-5 text-xl font-semibold rounded-2xl min-h-[60px]
      md:px-8 md:py-4 md:text-lg md:min-h-[52px]
      lg:px-6 lg:py-3 lg:text-base lg:min-h-[44px]
      xl:px-5 xl:py-2.5 xl:text-base xl:min-h-[40px]
    `
} as const

const ROUNDED_CLASSES = {
    xs: 'rounded-full',
    sm: 'rounded-full', 
    md: 'rounded-full',
    lg: 'rounded-full',
    xl: 'rounded-full'
} as const

const BASE_CLASSES = `
  inline-flex items-center justify-center gap-2
  transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
  focus:outline-none focus-ring-enhanced
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
  disabled:hover:shadow-none disabled:hover:scale-100
  relative overflow-hidden
  select-none user-select-none
  font-feature-settings 'cv02', 'cv03', 'cv04', 'cv11'
  will-change-auto
`

const LoadingContent = memo<{ size: ButtonSize }>(({ size }) => {
  const spinnerSize = {
    xs: 'w-3 h-3 md:w-2.5 md:h-2.5 lg:w-2 lg:h-2',
    sm: 'w-4 h-4 md:w-3.5 md:h-3.5 lg:w-3 lg:h-3', 
    md: 'w-4 h-4 lg:w-3.5 lg:h-3.5',
    lg: 'w-5 h-5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5',
    xl: 'w-6 h-6 md:w-5 md:h-5 lg:w-4 lg:h-4'
  }[size]

  return (
    <>
      <div className={`${spinnerSize} border-2 border-current border-t-transparent rounded-full animate-spin`} />
      <span>Loading...</span>
    </>
  )
})

LoadingContent.displayName = 'LoadingContent'

const IconWrapper = memo<{ children: ReactNode; size: ButtonSize }>(({ children, size }) => {
  const iconSize = {
    xs: 'w-3 h-3 md:w-2.5 md:h-2.5 lg:w-2 lg:h-2',
    sm: 'w-4 h-4 md:w-3.5 md:h-3.5 lg:w-3 lg:h-3',
    md: 'w-5 h-5 lg:w-4 lg:h-4', 
    lg: 'w-6 h-6 md:w-5 md:h-5 lg:w-4 lg:h-4',
    xl: 'w-7 h-7 md:w-6 md:h-6 lg:w-5 lg:h-5'
  }[size]

  return (
    <span className={`${iconSize} flex items-center justify-center flex-shrink-0`}>
      {children}
    </span>
  )
})

IconWrapper.displayName = 'IconWrapper'

const ButtonContent = memo<{
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children: ReactNode
    size: ButtonSize
}>(({ leftIcon, rightIcon, children, size }) => (
    <>
        {leftIcon && <IconWrapper size={size}>{leftIcon}</IconWrapper>}
        <span className="truncate">{children}</span>
        {rightIcon && <IconWrapper size={size}>{rightIcon}</IconWrapper>}
    </>
))

ButtonContent.displayName = 'ButtonContent'

const ShimmerEffect = memo<{ variant: ButtonVariant }>(({ variant }) => {
  if (!['primary', 'danger', 'success'].includes(variant)) {return null}
  
  return (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
  )
})

ShimmerEffect.displayName = 'ShimmerEffect'

interface ButtonClassOptions {
    variant: ButtonVariant
    size: ButtonSize
    fullWidth: boolean
    rounded: boolean
    isDisabled: boolean
    className?: string
}

const buildButtonClasses = ({ 
  variant, 
  size, 
  fullWidth, 
  rounded, 
  isDisabled, 
  className 
}: ButtonClassOptions): string => {
    return clsx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        rounded ? ROUNDED_CLASSES[size] : SIZE_CLASSES[size],
        fullWidth && 'w-full',
        isDisabled && 'pointer-events-none',
        'group', 
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
    rounded = false,
    disabled,
    className,
    ...props
}) => {
    const isDisabled = disabled ?? isLoading
    const buttonClasses = buildButtonClasses({
        variant,
        size,
        fullWidth,
        rounded,
        isDisabled,
        className
    })

    return (
        <button
            className={buttonClasses}
            disabled={isDisabled}
            {...props}
        >
            <ShimmerEffect variant={variant} />
            <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                {isLoading ? (
                    <LoadingContent size={size} />
                ) : (
                    <ButtonContent 
                      leftIcon={leftIcon} 
                      rightIcon={rightIcon} 
                      size={size}
                    >
                        {children}
                    </ButtonContent>
                )}
            </span>
            <span className="absolute inset-0 rounded-inherit border-2 border-transparent group-focus-visible:border-interactive-primary/50 transition-colors duration-200" />
        </button>
    )
})

Button.displayName = 'Button'

export default Button