import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', 
  theme: {
    extend: {
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
