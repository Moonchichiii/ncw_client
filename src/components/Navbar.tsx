import { memo, useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
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
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
            aria-label="Nordic Code Works - Return to top of page"
            type="button"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center text-text-inverse font-bold text-sm transition-transform duration-300 group-hover:scale-110">
              NCW
            </div>
            <span className="font-heading text-lg tracking-tight">Nordic Code Works</span>
          </button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
              aria-expanded={isMobileMenuOpen ? true : false}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              type="button"
            >
              <span className="text-sm font-bold uppercase tracking-wider">Menu</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 flex items-center justify-center text-text-primary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 rounded-lg"
              aria-expanded={isMobileMenuOpen ? true : false}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-bg-elevated/95 backdrop-blur-xl border-t border-border-primary shadow-lg"
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className="container mx-auto px-6 py-6">
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#work"
                  className="text-text-primary hover:text-interactive-primary hover:bg-bg-secondary focus:text-interactive-primary focus:bg-bg-secondary transition-all duration-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-1 rounded-xl block font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-text-primary hover:text-interactive-primary hover:bg-bg-secondary focus:text-interactive-primary focus:bg-bg-secondary transition-all duration-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-1 rounded-xl block font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-text-primary hover:text-interactive-primary hover:bg-bg-secondary focus:text-interactive-primary focus:bg-bg-secondary transition-all duration-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-1 rounded-xl block font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar