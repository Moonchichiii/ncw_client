import { memo, useState, useEffect, useCallback } from 'react'
import { Sun, Moon } from '@/components/icons'

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme ?? systemTheme
    
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }, [theme])

  if (!mounted) {return <div className="w-9 h-9 border border-border-main bg-bg-sub" />}

  return (
    <button
      onClick={toggleTheme}
      className="group flex items-center gap-3 focus:outline-none"
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="font-mono text-[10px] text-text-muted tracking-widest hidden md:block group-hover:text-text-main transition-colors">
        {theme === 'dark' ? 'DARK_MODE' : 'LIGHT_MODE'}
      </span>
      {/* Increased size  */}
      <div className="w-9 h-9 flex items-center justify-center border border-border-main bg-bg-sub text-text-main group-hover:bg-text-main group-hover:text-bg-main group-hover:border-text-main transition-all duration-300">
        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
      </div>
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'
export default ThemeToggle