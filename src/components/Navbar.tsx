import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // ACCESSIBILITY: Keyboard navigation for mobile menu
  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen) {return}

      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }

      if (event.key === 'Tab') {
        handleTabKeyPress(event)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // ACCESSIBILITY: Focus first menu item when opened
      setTimeout(() => {
        firstMenuItemRef.current?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  // ACCESSIBILITY: Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) &&
          !menuButtonRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }, [])

  const handleMenuItemClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // ACCESSIBILITY: Announce navigation to screen readers
      const announcement = `Navigating to ${sectionId} section`
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      liveRegion.textContent = announcement
      document.body.appendChild(liveRegion)
      setTimeout(() => document.body.removeChild(liveRegion), 1000)
    }
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      {/* ACCESSIBILITY: Skip link */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-interactive-primary text-text-inverse px-4 py-2 rounded-lg z-[9999] focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
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
        // ACCESSIBILITY: Landmark for screen readers
        aria-describedby="nav-description"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo with enhanced accessibility */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-2 rounded-lg p-2"
              aria-label="Nordic Code Works - Return to top of page"
              type="button"
            >
              <div 
                className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center text-text-inverse font-bold text-sm transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                NCW
              </div>
              <span className="font-heading text-lg tracking-tight">Nordic Code Works</span>
            </button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <button
                ref={menuButtonRef} // Note: This ref might be overwritten by the mobile button if not careful. Consider separate refs if desktop menu behaves differently.
                onClick={toggleMobileMenu}
                className="text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-2 rounded-lg px-3 py-2"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu" // Assuming this controls the same mobile menu
                aria-label="Toggle navigation menu"
                aria-haspopup="true"
                type="button"
              >
                <span className="text-sm font-bold uppercase tracking-wider">Menu</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                ref={menuButtonRef}
                onClick={toggleMobileMenu}
                className="w-12 h-12 flex items-center justify-center text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-haspopup="true"
                type="button"
              >
                {isMobileMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden bg-bg-elevated/98 backdrop-blur-xl border-t border-border-primary shadow-xl"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-6 py-6">
              {/* ACCESSIBILITY: Announce menu state */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Navigation menu opened
              </div>
              
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    ref={firstMenuItemRef}
                    href="#work"
                    onClick={() => handleMenuItemClick('work')}
                    className="text-text-primary hover:text-interactive-primary hover:bg-bg-secondary focus:text-interactive-primary focus:bg-bg-secondary transition-all duration-200 py-4 px-4 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-1 rounded-xl font-medium min-h-[48px] flex items-center"
                    aria-describedby="work-desc"
                  >
                    Work
                  </a>
                  <span id="work-desc" className="sr-only">Navigate to portfolio section</span>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={() => handleMenuItemClick('about')}
                    className="text-text-primary hover:text-interactive-primary hover:bg-bg-secondary focus:text-interactive-primary focus:bg-bg-secondary transition-all duration-200 py-4 px-4 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-1 rounded-xl font-medium min-h-[48px] flex items-center"
                    aria-describedby="about-desc"
                  >
                    About
                  </a>
                  <span id="about-desc" className="sr-only">Navigate to about section</span>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={() => handleMenuItemClick('contact')}
                    className="text-text-primary hover:text-interactive-primary hover:bg-bg-secondary focus:text-interactive-primary focus:bg-bg-secondary transition-all duration-200 py-4 px-4 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-1 rounded-xl font-medium min-h-[48px] flex items-center"
                    aria-describedby="contact-desc"
                  >
                    Contact
                  </a>
                  <span id="contact-desc" className="sr-only">Navigate to contact section</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Hidden description for screen readers */}
        <span id="nav-description" className="sr-only">
          Main navigation with logo, theme toggle, and menu options
        </span>
      </nav>
    </>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar