import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // Updated to match the new Industrial index.css variables
        bg: {
          main: 'var(--color-bg-main)',
          sub: 'var(--color-bg-sub)',
          acc: 'var(--color-bg-acc)', // Used for hover states on cards
        },
        text: {
          main: 'var(--color-text-main)',
          strong: 'var(--color-text-strong)', // Pure Black/White for headings
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-text-accent)',
        },
        // Semantic colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-text-accent)', // Mapping generic accent to text-accent for consistency
        
        // Industrial borders
        border: {
          main: 'var(--color-border-main)', // Strong structural borders
          sub: 'var(--color-border-sub)',   // Subtle grid lines
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        'aurora': 'aurora 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
}

export default config