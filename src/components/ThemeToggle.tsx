import { memo, useState, useEffect, useCallback } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  // ACCESSIBILITY: Announce theme changes to screen readers
  const announceThemeChange = useCallback((newTheme: Theme) => {
    const announcement = `Theme changed to ${newTheme} mode`
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = announcement
    document.body.appendChild(liveRegion)
    setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion)
      }
    }, 2000)
  }, [])

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
        announceThemeChange(newTheme)
      }
    }
   
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [applyTheme, announceThemeChange])

  const toggleTheme = useCallback(() => {
    if (isTransitioning) {return}
    
    setIsTransitioning(true)
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
   
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    announceThemeChange(newTheme)
    
    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }, [theme, isTransitioning, applyTheme, announceThemeChange])

  // ACCESSIBILITY: Handle keyboard interactions
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleTheme()
    }
  }, [toggleTheme])

  if (!mounted) {
    return (
      <div 
        className="w-12 h-12 rounded-lg bg-interactive-secondary border-2 border-border-primary flex items-center justify-center"
        aria-label="Loading theme toggle"
        role="status"
        aria-describedby="theme-loading-desc"
      >
        <div className="w-4 h-4 bg-border-secondary rounded animate-pulse" />
        <span id="theme-loading-desc" className="sr-only">Theme toggle is loading</span>
      </div>
    )
  }

  const currentIcon = theme === 'light' ? Moon : Sun
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const IconComponent = currentIcon

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      disabled={isTransitioning}
      className="w-12 h-12 rounded-lg bg-interactive-secondary border-2 border-border-primary hover:border-interactive-primary hover:bg-bg-tertiary focus:border-interactive-primary focus:bg-bg-tertiary flex items-center justify-center text-text-primary hover:text-interactive-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
      aria-label={`Switch to ${nextTheme} mode. Current theme: ${theme} mode`}
      aria-describedby="theme-toggle-desc"
      type="button"
      title={`Toggle theme (currently ${theme} mode). Click to switch to ${nextTheme} mode.`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      {/* ACCESSIBILITY: Enhanced icon with transition */}
      <div 
        className={`transition-all duration-300 ${isTransitioning ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}
        aria-hidden="true"
      >
        <IconComponent 
          size={20} 
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* ACCESSIBILITY: Visual feedback for state */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-brand-500/20 to-accent-500/20 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
        aria-hidden="true"
      />
      
      {/* ACCESSIBILITY: Loading indicator */}
      {isTransitioning && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
        </div>
      )}
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

export default ThemeToggle

/* ACCESSIBILITY: Hidden description component */
export const ThemeToggleDescription = memo(() => (
  <span id="theme-toggle-desc" className="sr-only">
    Theme toggle button. Switches between light and dark mode for better visibility and user preference. 
    Current setting is automatically saved and will be remembered on future visits.
  </span>
))
