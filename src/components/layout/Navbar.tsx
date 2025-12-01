import { memo, useState, useEffect, useRef } from 'react'
import { Menu, X } from '@/components/icons'
import ThemeToggle from '@/components/layout/ThemeToggle'
import MenuOverlay from '@/components/layout/MenuOverlay'

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
  }, [isMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-bg-main/95 backdrop-blur-md border-border-main'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO: Uses semantic variables for perfect contrast */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-start focus:outline-none"
              aria-label="Scroll to top"
            >
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 bg-text-main group-hover:bg-accent transition-colors duration-300" />
                <span className="text-xl font-black tracking-tighter leading-none text-text-main group-hover:text-accent transition-colors duration-300">
                  NCW
                </span>
              </div>
              <span className="font-mono text-[9px] text-text-muted tracking-widest pl-7 pt-1 group-hover:text-text-main transition-colors duration-300">
                SYSTEM_V2.5
              </span>
            </button>

            {/* CONTROLS */}
            <div className="flex items-center gap-4 sm:gap-6">
              <ThemeToggle />
              
              <button
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 text-text-main hover:text-accent transition-colors focus:outline-none group"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <span className="font-mono text-[10px] tracking-widest hidden md:block group-hover:text-accent font-bold uppercase">
                  {isMenuOpen ? 'Close' : 'Menu'}
                </span>
                <div className="w-9 h-9 flex items-center justify-center border border-border-main bg-bg-sub group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300">
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  )
})

Navbar.displayName = 'Navbar'
export default Navbar