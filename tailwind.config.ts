import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      // Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Archivo Black', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      
      // Fluid typography (rem-based)
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 1.25vw + 0.25rem, 1rem)',
        'fluid-base': 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 2vw + 0.5rem, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 3vw + 0.25rem, 2rem)',
        'fluid-2xl': 'clamp(1.875rem, 5vw + 0.5rem, 3.5rem)',
        'fluid-3xl': 'clamp(2.5rem, 8vw + 1rem, 6rem)',
        'hero': 'clamp(2.5rem, 8vw + 1rem, 6rem)',
        'title': 'clamp(1.875rem, 5vw + 0.5rem, 3.5rem)',
      },
      
      // Rem-based spacing
      spacing: {
        '18': '4.5rem',   // 72px
        '72': '18rem',    // 288px
        '84': '21rem',    // 336px
        '96': '24rem',    // 384px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
      },
      
      // Perfect Contrast Color System
      colors: {
        // Semantic Background Colors
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'bg-overlay': 'var(--color-bg-overlay)',
        
        // Semantic Text Colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverse': 'var(--color-text-inverse)',
        
        // Interactive Colors
        'interactive-primary': 'var(--color-interactive-primary)',
        'interactive-secondary': 'var(--color-interactive-secondary)',
        'interactive-hover': 'var(--color-interactive-hover)',
        
        // Border Colors
        'border-primary': 'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)',
        'border-focus': 'var(--color-border-focus)',
        
        // Status Colors
        'status-success': 'var(--color-success)',
        'status-warning': 'var(--color-warning)',
        'status-error': 'var(--color-error)',
        'status-info': 'var(--color-info)',
        
        // Brand colors (preserved for gradients and special cases)
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // Accent colors (preserved for gradients and special cases)
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
      },
      
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-2rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0rem)' },
          '50%': { transform: 'translateY(-0.625rem)' },
        },
      },
      
      // Transitions
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'premium': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      
      // Layout (rem-based)
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '3rem',
        },
        screens: {
          sm: '40rem',
          md: '48rem',
          lg: '64rem',
          xl: '80rem',
          '2xl': '87.5rem',
        },
      },
      
      // Border radius (rem-based)
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  
  plugins: [],
}

export default config