import { memo, useEffect, useRef, useCallback, useState } from 'react'
import { Github, Dribbble, Linkedin, Twitter, X } from 'lucide-react'
import Footer from '@/components/layout/Footer'

interface MenuLink {
  id: string
  title: string
  href: string
  description: string
}

interface SocialLink {
  id: string
  title: string
  href: string
  icon: typeof Github
}

const menuLinks: MenuLink[] = [
  { id: 'work-link', title: 'Work', href: '#work', description: 'View our portfolio' },
  { id: 'about-link', title: 'About', href: '#about', description: 'Our story' },
  { id: 'contact-link', title: 'Contact', href: '#contact', description: 'Get in touch' },
]

const socialLinks: SocialLink[] = [
  { id: 'github-link', title: 'Github', href: '#', icon: Github },
  { id: 'dribbble-link', title: 'Dribbble', href: '#', icon: Dribbble },
  { id: 'linkedin-link', title: 'LinkedIn', href: '#', icon: Linkedin },
  { id: 'twitter-link', title: 'Twitter', href: '#', icon: Twitter },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const setupOptimizedAnimations = (isOpen: boolean, overlayRef: HTMLDivElement) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    overlayRef.style.opacity = isOpen ? '1' : '0'
    overlayRef.style.visibility = isOpen ? 'visible' : 'hidden'
    return
  }

  const animationClass = isOpen ? 'menu-opening' : 'menu-closing'
  overlayRef.classList.remove('menu-opening', 'menu-closing')

  if (isOpen) {
    overlayRef.style.visibility = 'visible'
    requestAnimationFrame(() => overlayRef.classList.add(animationClass))
  } else {
    overlayRef.classList.add(animationClass)
    setTimeout(() => {
      if (!overlayRef.classList.contains('menu-opening')) {
        overlayRef.style.visibility = 'hidden'
      }
    }, 300)
  }
}

const createOptimizedKeyboardHandler = (
  isOpen: boolean,
  onClose: () => void,
  overlayRef: HTMLDivElement | null
) => {
  return (event: KeyboardEvent) => {
    if (!isOpen || !overlayRef) {return}

    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'Tab') {
      const focusable = overlayRef.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable.length) {return}

      const first = focusable[0] as HTMLElement
      const last = focusable[focusable.length - 1] as HTMLElement
      const active = document.activeElement as HTMLElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

const scheduleTask = (cb: () => void, priority: 'urgent' | 'normal' = 'normal') => {
  const delay = priority === 'urgent' ? 0 : 250
  setTimeout(cb, delay)
}

const MenuOverlay = memo<MenuOverlayProps>(({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!overlayRef.current) {return}

    setIsAnimating(true)
    scheduleTask(() => {
      if (overlayRef.current) {
        setupOptimizedAnimations(isOpen, overlayRef.current)
        setIsAnimating(false)
      }
    }, 'urgent')
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !isAnimating) {
      const timer = setTimeout(() => firstMenuItemRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isAnimating])

  useEffect(() => {
    const handler = createOptimizedKeyboardHandler(isOpen, onClose, overlayRef.current)
    if (isOpen) {document.addEventListener('keydown', handler, { passive: false })}
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleLinkClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault()
      if (isAnimating) {return}
      onClose()
      scheduleTask(() => {
        const el = document.querySelector(href)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [isAnimating, onClose]
  )

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] backdrop-blur-lg bg-slate-900/95 dark:bg-slate-900/95 menu-overlay"
      id="main-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      style={{ opacity: 0, visibility: 'hidden', contain: 'layout style paint' }}
    >
      <div className="min-h-screen flex flex-col justify-between p-6 pt-24 md:p-12 md:pt-32">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isAnimating}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-[1020] w-12 h-12 backdrop-blur-lg border rounded-xl flex items-center justify-center transition-colors duration-200 shadow-lg bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close menu"
        >
          <X size={24} strokeWidth={2} className="drop-shadow-sm" />
        </button>

        {/* Links */}
        <div className="flex-grow flex items-center">
          <div className="w-full max-w-7xl mx-auto">
            <ul className="space-y-6 md:space-y-8 mb-16 list-none">
              {menuLinks.map((link, i) => (
                <li
                  key={link.id}
                  className="menu-item overflow-hidden"
                  style={{ opacity: 0, transform: 'translateX(-30px)' }}
                >
                  <a
                    ref={i === 0 ? firstMenuItemRef : undefined}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-label={link.description}
                    className="block font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none transition-all duration-300 ease-out text-white hover:text-blue-400 hover:translate-x-2 focus-visible:outline-none focus-visible:text-blue-400"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex gap-4 list-none menu-footer" style={{ opacity: 0, transform: 'translateY(20px)' }}>
              {socialLinks.map(({ id, icon: Icon, href, title }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${title} page (opens in new tab)`}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/10 text-white hover:bg-blue-600 hover:-translate-y-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shared Footer */}
        <Footer variant="overlay" />
      </div>
    </div>
  )
})

MenuOverlay.displayName = 'MenuOverlay'
export default MenuOverlay
