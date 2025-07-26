import { memo, useEffect, useRef, useCallback, useState } from 'react'
import { Github,Linkedin, X } from '@/components/icons'
import Footer from '@/components/layout/Footer'
import LegalModal from '@/components/modals/LegalModal'
import { useLegalModals } from '@/hooks/useLegalModals'
import { useCookieConsent } from '@/hooks/useCookieConsent'

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
  { id: 'about-link', title: 'About', href: '#about', description: 'Our story' },
  { id: 'work-link', title: 'Work', href: '#work', description: 'View our portfolio' },
  { id: 'contact-link', title: 'Contact', href: '#contact', description: 'Get in touch' },
]

const socialLinks: SocialLink[] = [
  { id: 'github-link', title: 'Github', href: 'https://github.com/Moonchichiii', icon: Github },
  { id: 'linkedin-link', title: 'LinkedIn', href: 'https://www.linkedin.com/in/mats-gustafsson-a57643103/', icon: Linkedin },
  
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const MenuOverlay = memo<MenuOverlayProps>(({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  
  const { 
    activeModal, 
    openTerms, 
    openPrivacy, 
    closeModal,
    isTermsOpen,
    isPrivacyOpen 
  } = useLegalModals()

  const { showPreferencesPanel } = useCookieConsent()

  const setupOptimizedAnimations = useCallback((isOpen: boolean, overlayRef: HTMLDivElement): void => {
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
  }, [])

  const createOptimizedKeyboardHandler = useCallback((
    isOpen: boolean,
    onClose: () => void,
    overlayRef: HTMLDivElement | null
  ) => {
    return (event: KeyboardEvent): void => {
      if (!isOpen || !overlayRef) {return}

      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusable = overlayRef.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (!focusable.length) {return}

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
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
  }, [])

  const scheduleTask = useCallback((cb: () => void, priority: 'urgent' | 'normal' = 'normal'): void => {
    const delay = priority === 'urgent' ? 0 : 250
    setTimeout(cb, delay)
  }, [])

  useEffect(() => {
    if (!overlayRef.current) {return}

    setIsAnimating(true)
    scheduleTask(() => {
      if (overlayRef.current) {
        setupOptimizedAnimations(isOpen, overlayRef.current)
        setIsAnimating(false)
      }
    }, 'urgent')
  }, [isOpen, setupOptimizedAnimations, scheduleTask])

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
  }, [isOpen, onClose, createOptimizedKeyboardHandler])

  useEffect(() => {
    if (!isOpen && activeModal) {
      closeModal()
    }
  }, [isOpen, activeModal, closeModal])

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
    [isAnimating, onClose, scheduleTask]
  )

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1000] backdrop-blur-lg bg-bg-overlay menu-overlay"
        id="main-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ opacity: 0, visibility: 'hidden', contain: 'layout style paint' }}
      >
        <div className="min-h-screen flex flex-col justify-between p-6 pt-24 md:p-12 md:pt-32">
          <button
            onClick={onClose}
            disabled={isAnimating}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-[1020] w-12 h-12 
                       bg-bg-elevated/90 backdrop-blur-lg border border-border-primary 
                       rounded-xl flex items-center justify-center 
                       transition-all duration-200 shadow-lg 
                       hover:bg-bg-secondary hover:border-border-secondary hover:scale-105 
                       text-text-primary hover:text-interactive-primary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={2} className="drop-shadow-sm" />
          </button>

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
                      className="block font-heading text-5xl md:text-7xl lg:text-8xl font-black 
                                 uppercase tracking-tighter leading-none 
                                 transition-all duration-300 ease-out 
                                 text-text-primary hover:text-interactive-primary hover:translate-x-2 
                                 focus-visible:outline-none focus-visible:text-interactive-primary
                                 focus-visible:ring-2 focus-visible:ring-border-focus rounded-lg"
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
                      className="w-12 h-12 rounded-xl flex items-center justify-center 
                                 transition-all duration-200 hover:scale-110 
                                 bg-bg-elevated/80 border border-border-primary 
                                 text-text-primary hover:bg-interactive-primary hover:border-interactive-primary
                                 hover:-translate-y-1 hover:text-text-inverse 
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Footer 
            overlay 
            onOpenPrivacy={openPrivacy}
            onOpenTerms={openTerms}
            onCookieSettings={showPreferencesPanel}
          />
        </div>
      </div>

      <LegalModal 
        type="terms"
        isOpen={isTermsOpen}
        onClose={closeModal}
      />
      <LegalModal 
        type="privacy"
        isOpen={isPrivacyOpen}
        onClose={closeModal}
      />
    </>
  )
})

MenuOverlay.displayName = 'MenuOverlay'
export default MenuOverlay
