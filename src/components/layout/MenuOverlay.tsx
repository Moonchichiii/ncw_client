import { memo, useEffect, useState } from 'react'
import { Github, Linkedin, ArrowUpRight } from '@/components/icons'
import Footer from '@/components/layout/Footer'
import LegalModal from '@/components/modals/LegalModal'
import { useLegalModals } from '@/hooks/useLegalModals'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const menuLinks = [
  { id: '01', title: 'Index', href: '#hero', desc: 'START' },
  { id: '02', title: 'About', href: '#about', desc: 'SYSTEM' },
  { id: '03', title: 'Work', href: '#work', desc: 'LOGS' },
  { id: '04', title: 'Contact', href: '#contact', desc: 'COMMS' },
]

const MenuOverlay = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { openTerms, openPrivacy, closeModal, isTermsOpen, isPrivacyOpen } = useLegalModals()
  const { showPreferencesPanel } = useCookieConsent()
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {setShouldRender(true)}
    const timer = setTimeout(() => { if (!isOpen) {setShouldRender(false)} }, 500)
    return () => clearTimeout(timer)
  }, [isOpen])

  if (!shouldRender) {return null}

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-bg-main transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        role="dialog"
      >
        {/* Removed Noise Overlay for cleaner flat look */}
        
        <div className="h-full flex flex-col pt-24 pb-8 container mx-auto px-4 relative z-10">
          {/* NAVIGATION LINKS */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-6">
              {menuLinks.map((link) => (
                <li key={link.id} className="group">
                  <a 
                    href={link.href} 
                    onClick={onClose}
                    className="flex items-baseline gap-6 hover:translate-x-4 transition-transform duration-300"
                  >
                    <span className="font-mono text-sm text-accent opacity-50 group-hover:opacity-100">
                      /{link.id}
                    </span>
                    {/* FIXED HOVER: Changed to text-accent (Blue) instead of transparent */}
                    <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text-main group-hover:text-accent transition-colors duration-300">
                      {link.title}
                    </span>
                    <span className="font-mono text-xs text-text-muted self-center border border-border-main px-2 py-1 hidden sm:inline-block">
                      {link.desc}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIALS & FOOTER */}
          <div className="border-t border-border-main pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <a href="https://github.com/Moonchichiii" target="_blank" rel="noopener" className="flex items-center gap-2 text-text-muted hover:text-text-main font-mono text-sm group">
                <Github size={16} /> GITHUB <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="flex items-center gap-2 text-text-muted hover:text-text-main font-mono text-sm group">
                <Linkedin size={16} /> LINKEDIN <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            
            <Footer 
              overlay 
              onOpenPrivacy={openPrivacy} 
              onOpenTerms={openTerms} 
              onCookieSettings={showPreferencesPanel} 
            />
          </div>
        </div>
      </div>

      <LegalModal type="terms" isOpen={isTermsOpen} onClose={closeModal} />
      <LegalModal type="privacy" isOpen={isPrivacyOpen} onClose={closeModal} />
    </>
  )
})

MenuOverlay.displayName = 'MenuOverlay'
export default MenuOverlay