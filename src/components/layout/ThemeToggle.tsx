import { memo, useState, useEffect, useCallback } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const applyTheme = useCallback((newTheme: Theme, withTransition = true) => {
    const root = document.documentElement

    if (withTransition) {
      root.style.setProperty('--theme-transition-duration', '0.15s')
    } else {
      root.style.setProperty('--theme-transition-duration', '0s')
    }

    if (newTheme === 'dark') {
      if (!root.classList.contains('dark')) {
        root.classList.add('dark')
      }
    } else {
      if (root.classList.contains('dark')) {
        root.classList.remove('dark')
      }
    }

    if (withTransition) {
      setTimeout(() => {
        root.style.removeProperty('--theme-transition-duration')
      }, 150)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const initialTheme = savedTheme ?? systemTheme

      setTheme(initialTheme)
      applyTheme(initialTheme, false)
      setMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [applyTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        applyTheme(newTheme, false)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [applyTheme])

  const toggleTheme = useCallback(() => {
    if (isTransitioning) {return}

    setIsTransitioning(true)
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'

    const scheduleUpdate = (callback: () => void) => {
      setTimeout(callback, 0)
    }

    scheduleUpdate(() => {
      setTheme(newTheme)
      applyTheme(newTheme, true)

      try {
        localStorage.setItem('theme', newTheme)
      } catch (_e) {
        // Silent fail - theme will still work, just won't persist
      }

      setTimeout(() => setIsTransitioning(false), 150)
    })
  }, [theme, isTransitioning, applyTheme])

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
      disabled={isTransitioning}
      className={`w-10 h-10 rounded-lg bg-interactive-secondary border border-border-primary flex items-center justify-center text-text-primary hover:text-interactive-primary hover:border-interactive-primary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 ${
        isTransitioning ? 'opacity-75 cursor-not-allowed' : 'transition-colors duration-150'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      type="button"
      title={`Toggle theme (currently ${theme} mode)`}
      style={{
        willChange: isTransitioning ? 'background-color, border-color, color' : 'auto'
      }}
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
