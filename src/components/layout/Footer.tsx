import { memo } from 'react'
import { Github, Dribbble, Linkedin, Twitter } from 'lucide-react'
import clsx from 'clsx'

const socialLinks = [
  { id: 'github', href: 'https://github.com/your-handle', icon: Github },
  { id: 'dribbble', href: 'https://dribbble.com/your-handle', icon: Dribbble },
  { id: 'linkedin', href: 'https://linkedin.com/in/your-handle', icon: Linkedin },
  { id: 'twitter', href: 'https://twitter.com/your-handle', icon: Twitter },
]

interface FooterProps {
  /** when true, uses the dark/overlay style (for MenuOverlay) */
  overlay?: boolean
}

const Footer = memo<FooterProps>(({ overlay = false }) => {
  const base = overlay
    ? 'pt-6 border-t border-white/20 text-white'
    : 'py-8 bg-bg-overlay border-t border-border-primary text-text-secondary'

  return (
    <footer className={clsx(base, overlay ? 'menu-footer' : '', 'transition-colors')}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <a
          href="mailto:contact@nordiccodeworks.com"
          className={clsx(
            overlay ? 'text-slate-300 hover:text-white' : 'hover:text-text-primary',
            'transition-colors'
          )}
        >
          contact@nordiccodeworks.com
        </a>

        <ul className="flex gap-4">
          {socialLinks.map(({ id, href, icon: Icon }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  overlay
                    ? 'w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/20'
                    : 'p-2 rounded-lg hover:bg-bg-secondary',
                  'transition-colors'
                )}
                aria-label={`Visit my ${id} (opens in new tab)`}
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex gap-6 text-sm">
          <li>
            <a
              href="#privacy"
              className={clsx(
                overlay ? 'text-slate-400 hover:text-white' : 'hover:text-text-primary',
                'transition-colors'
              )}
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#terms"
              className={clsx(
                overlay ? 'text-slate-400 hover:text-white' : 'hover:text-text-primary',
                'transition-colors'
              )}
            >
              Terms of Service
            </a>
          </li>
        </ul>

        <span className={overlay ? 'text-slate-400 text-sm' : 'text-text-tertiary text-sm'}>
          © {new Date().getFullYear()} Nordic Code Works
        </span>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
export default Footer
