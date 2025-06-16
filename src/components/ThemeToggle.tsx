import { memo, useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    

    const savedTheme = localStorage.getItem('theme') as Theme | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme ?? systemTheme
    
    setTheme(initialTheme)
    applyTheme(initialTheme)
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        applyTheme(newTheme)
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    

    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }


  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-interactive-secondary border border-border-primary flex items-center justify-center">
        <div className="w-4 h-4 bg-border-secondary rounded animate-pulse" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg bg-interactive-secondary border border-border-primary flex items-center justify-center text-text-primary hover:text-interactive-primary hover:border-interactive-primary hover:bg-bg-tertiary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      type="button"
      title={`Toggle theme (currently ${theme} mode)`}
    >
      {theme === 'light' ? (
        <Moon size={18} aria-hidden="true" />
      ) : (
        <Sun size={18} aria-hidden="true" />
      )}
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

export default ThemeToggle