import { memo } from 'react'
import { Github, Dribbble, Linkedin, Twitter } from '@/components/icons'
import clsx from 'clsx'

interface SocialLink {
  id: string
  href: string
  icon: typeof Github
}

const socialLinks: SocialLink[] = [
  { id: 'github', href: 'https://github.com/Moonchichiii', icon: Github },
  { id: 'dribbble', href: 'https://dribbble.com/your-handle', icon: Dribbble },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/mats-gustafsson-a57643103/', icon: Linkedin },
  { id: 'twitter', href: 'https://twitter.com/your-handle', icon: Twitter },
]

interface FooterProps {
  overlay?: boolean
  onOpenPrivacy?: () => void
  onOpenTerms?: () => void
  onCookieSettings?: () => void
}

interface LegalLinksProps {
  overlay: boolean
  onOpenPrivacy?: () => void
  onOpenTerms?: () => void
  onCookieSettings?: () => void
}

const LegalLinks = memo<LegalLinksProps>(({ overlay, onOpenPrivacy, onOpenTerms, onCookieSettings }) => (
  <div className="flex flex-wrap gap-4 text-sm">
    <button
      onClick={onOpenPrivacy}
      className={clsx(
        overlay 
          ? 'text-slate-300 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10 px-2 py-1 rounded' 
          : 'text-text-tertiary hover:text-interactive-primary focus:text-interactive-primary',
        'transition-all cursor-pointer hover:underline focus:underline focus:outline-none'
      )}
      type="button"
    >
      Privacy Policy
    </button>
    <span className={overlay ? 'text-slate-500' : 'text-text-tertiary'}>•</span>
    <button
      onClick={onOpenTerms}
      className={clsx(
        overlay 
          ? 'text-slate-300 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10 px-2 py-1 rounded' 
          : 'text-text-tertiary hover:text-interactive-primary focus:text-interactive-primary',
        'transition-all cursor-pointer hover:underline focus:underline focus:outline-none'
      )}
      type="button"
    >
      Terms of Service
    </button>
    <span className={overlay ? 'text-slate-500' : 'text-text-tertiary'}>•</span>
    <button
      onClick={onCookieSettings}
      className={clsx(
        overlay 
          ? 'text-slate-300 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10 px-2 py-1 rounded' 
          : 'text-text-tertiary hover:text-interactive-primary focus:text-interactive-primary',
        'transition-all cursor-pointer hover:underline focus:underline focus:outline-none'
      )}
      type="button"
    >
      Cookie Settings
    </button>
  </div>
))

LegalLinks.displayName = 'LegalLinks'

const Footer = memo<FooterProps>(({ 
  overlay = false, 
  onOpenPrivacy, 
  onOpenTerms, 
  onCookieSettings 
}) => {
  const base = overlay
    ? 'pt-6 border-t border-white/20 text-white'
    : 'py-8 bg-bg-overlay border-t border-border-primary text-text-secondary'

  return (
    <footer className={clsx(base, overlay ? 'menu-footer' : '', 'transition-colors')}>
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Contact Email */}
          <a
            href="mailto:contact@nordiccodeworks.com"
            className={clsx(
              overlay 
                ? 'text-slate-300 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10 px-2 py-1 rounded' 
                : 'text-text-secondary hover:text-text-primary focus:text-text-primary',
              'transition-all font-medium hover:underline focus:underline focus:outline-none'
            )}
          >
            contact@nordiccodeworks.com
          </a>

          {/* Social Media Links */}
          <ul className="flex gap-4">
            {socialLinks.map(({ id, href, icon: Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    overlay
                      ? 'w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/20 focus:bg-white/30 text-slate-300 hover:text-white focus:text-white hover:scale-105 focus:scale-105'
                      : 'p-2 rounded-lg hover:bg-bg-secondary focus:bg-bg-secondary text-text-secondary hover:text-interactive-primary focus:text-interactive-primary hover:scale-105 focus:scale-105',
                    'transition-all duration-200 focus:outline-none'
                  )}
                  aria-label={`Visit my ${id} (opens in new tab)`}
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links and Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
          {/* Legal Links */}
          <LegalLinks 
            overlay={overlay} 
            onOpenPrivacy={onOpenPrivacy}
            onOpenTerms={onOpenTerms}
            onCookieSettings={onCookieSettings}
          />

          {/* Copyright */}
          <span className={clsx(
            overlay ? 'text-slate-400 text-sm' : 'text-text-tertiary text-sm',
            'flex-shrink-0'
          )}>
            © {new Date().getFullYear()} Nordic Code Works. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
export default Footer