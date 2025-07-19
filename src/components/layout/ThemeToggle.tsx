import { memo, useState, useEffect, useCallback } from 'react'
import { Sun, Moon } from '@/components/icons'

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
        // ignore
      }

      setTimeout(() => setIsTransitioning(false), 150)
    })
  }, [theme, isTransitioning, applyTheme])

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border-primary flex items-center justify-center">
        <div className="w-5 h-5 bg-border-secondary rounded animate-pulse" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`
        group relative w-12 h-12 rounded-2xl
        bg-gradient-to-br from-bg-elevated to-bg-secondary
        border border-border-primary hover:border-interactive-primary/50
        shadow-sm hover:shadow-lg hover:shadow-interactive-primary/10
        flex items-center justify-center
        text-text-secondary hover:text-interactive-primary
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-interactive-primary/50 focus:ring-offset-2
        ${isTransitioning ? 'opacity-75 cursor-not-allowed scale-95' : ''}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      type="button"
      title={`Toggle theme (currently ${theme} mode)`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-interactive-primary/5 to-interactive-hover/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {theme === 'light' ? (
          <Moon 
            size={20} 
            className="transform transition-all duration-300 group-hover:rotate-12" 
            aria-hidden="true" 
          />
        ) : (
          <Sun 
            size={20} 
            className="transform transition-all duration-300 group-hover:rotate-180" 
            aria-hidden="true" 
          />
        )}
      </div>
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-interactive-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

export default ThemeToggle
