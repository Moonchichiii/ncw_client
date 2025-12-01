import { memo } from 'react'
import { ArrowUpRight } from '@/components/icons'

interface FooterProps {
  overlay?: boolean
  onOpenPrivacy?: () => void
  onOpenTerms?: () => void
  onCookieSettings?: () => void
}

const Footer = memo<FooterProps>(({ onOpenPrivacy, onOpenTerms, onCookieSettings }) => {
  return (
    <footer className="w-full bg-bg-main border-t border-border-main relative z-10">
      <div className="container mx-auto px-4">
        <div className="py-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-text-main" />
              <span className="text-xl font-black tracking-tighter leading-none">NCW_Nordic code works</span>
            </div>
            <div className="font-mono text-xs text-text-muted uppercase tracking-widest flex flex-col sm:flex-row gap-2 sm:gap-4 font-bold">
              <span>© {new Date().getFullYear()} NORDIC CODE WORKS</span>
              <span className="hidden sm:inline text-border-main">|</span>
              <span>STOCKHOLM, SE</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest font-bold">
            <button 
              onClick={onOpenPrivacy} 
              aria-label="Open Privacy Policy"
              className="text-text-muted hover:text-text-main transition-colors flex items-center gap-1 group"
            >
              PRIVACY
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </button>
            <button 
              onClick={onOpenTerms} 
              aria-label="Open Terms of Service"
              className="text-text-muted hover:text-text-main transition-colors flex items-center gap-1 group"
            >
              TERMS
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </button>
            <button 
              onClick={onCookieSettings} 
              aria-label="Open Cookie Settings"
              className="text-text-muted hover:text-text-main transition-colors flex items-center gap-1 group"
            >
              COOKIES
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'
export default Footer