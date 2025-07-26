import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Archivo Black', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      
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
      
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'bg-overlay': 'var(--color-bg-overlay)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverse': 'var(--color-text-inverse)',
        'interactive-primary': 'var(--color-interactive-primary)',
        'interactive-secondary': 'var(--color-interactive-secondary)',
        'interactive-hover': 'var(--color-interactive-hover)',
        'border-primary': 'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)',
        'border-focus': 'var(--color-border-focus)',
        'status-success': 'var(--color-success)',
        'status-warning': 'var(--color-warning)',
        'status-error': 'var(--color-error)',
        'status-info': 'var(--color-info)',
        
        'accent-primary': 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'accent-tertiary': 'var(--color-accent-tertiary)',
        
        brand: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b8dfff',
          300: '#78c7ff',
          400: '#2d5f87',
          500: '#2d5f87',
          600: '#1e4159',
          700: '#1a3550',
          800: '#1c2b42',
          900: '#1d2938',
          950: '#131a25',
        },
        
        accent: {
          50: '#f0f9f4',
          100: '#dcf4e4',
          200: '#bbe6cc',
          300: '#86d0a4',
          400: '#4a7c59',
          500: '#4a7c59',
          600: '#3d6b4a',
          700: '#32563d',
          800: '#2a4633',
          900: '#223b2c',
          950: '#0f1f16',
        },
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'nordic-glow': 'nordicGlow 4s ease-in-out infinite',
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
        nordicGlow: {
          '0%, 100%': { 
            'box-shadow': '0 0 20px rgba(45, 95, 135, 0.1)',
          },
          '50%': { 
            'box-shadow': '0 0 30px rgba(74, 124, 89, 0.2)',
          },
        },
      },
      
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'premium': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      
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
      
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      backgroundImage: {
        'nordic-gradient-primary': 'linear-gradient(135deg, var(--color-interactive-primary) 0%, var(--color-accent-primary) 100%)',
        'nordic-gradient-secondary': 'linear-gradient(135deg, var(--color-accent-secondary) 0%, var(--color-accent-tertiary) 100%)',
        'nordic-gradient-aurora': 'linear-gradient(135deg, var(--color-interactive-primary) 0%, var(--color-accent-primary) 50%, var(--color-accent-secondary) 100%)',
      },
    },
  },
  
  plugins: [],
}

export default config
