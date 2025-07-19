import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X } from '@/components/icons'
import ThemeToggle from '@/components/layout/ThemeToggle'
import MenuOverlay from '@/components/layout/MenuOverlay'

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  // Announce menu state for screen readers
  const announceToScreenReader = useCallback((message: string) => {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message
    document.body.appendChild(liveRegion)
    setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion)
      }
    }, 1000)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      announceToScreenReader('Navigation menu opened')
    } else {
      announceToScreenReader('Navigation menu closed')
    }
  }, [isMenuOpen, announceToScreenReader])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-interactive-primary text-text-inverse px-4 py-2 rounded-lg z-[9999] focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-overlay backdrop-blur-xl border-b border-border-primary'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
              aria-label="NCW - Return to top of page"
              type="button"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black dark:text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M6 4L10 28M10 4L16 28M16 4L22 28M22 4L26 28"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="4"
                    y="4"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    rx="3"
                  />
                </svg>
              </div>
              <span className="font-black text-lg tracking-tight">NCW</span>
            </button>

            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
                aria-expanded={isMenuOpen}
                aria-controls="main-menu"
                aria-label="Toggle navigation menu"
                type="button"
              >
                <span className="text-sm font-bold uppercase tracking-wider">Menu</span>
              </button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="w-10 h-10 flex items-center justify-center text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
                aria-expanded={isMenuOpen}
                aria-controls="main-menu"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                type="button"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={closeMenu}
      />
    </>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
