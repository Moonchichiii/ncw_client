import { memo, useEffect, useRef, lazy, Suspense } from 'react'
import { X, AlertCircle, Shield } from '@/components/icons'

const TermsOfService = lazy(() => import('@/pages/TermsOfService'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))

interface LegalModalProps {
  type: 'terms' | 'privacy'
  isOpen: boolean
  onClose: () => void
}

const LoadingContent = memo(() => (
  <div className="flex flex-col items-center justify-center py-24 font-mono text-xs">
    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-text-muted animate-pulse uppercase tracking-widest">RETRIEVING_LEGAL_DATA...</p>
  </div>
))

LoadingContent.displayName = 'LoadingContent'

const LegalModal = memo<LegalModalProps>(({ type, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  const config = {
    terms: {
      title: 'TERMS_OF_SERVICE',
      subtitle: 'LEGAL_AGREEMENT',
      icon: AlertCircle
    },
    privacy: {
      title: 'PRIVACY_PROTOCOL', 
      subtitle: 'DATA_HANDLING',
      icon: Shield
    }
  }

  const { title, subtitle, icon: Icon } = config[type]

  useEffect(() => {
    if (!isOpen) {return}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) {return}
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault() 
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    setTimeout(() => firstFocusableRef.current?.focus(), 100)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) {return null}

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop with Industrial Blur */}
      <div 
        className="absolute inset-0 bg-bg-main/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-bg-main border border-border-main shadow-2xl flex flex-col animate-reveal"
      >
        {/* INDUSTRIAL HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-border-main bg-bg-sub">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-border-main bg-bg-main flex items-center justify-center text-text-main">
              <Icon size={18} />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-text-main leading-none tracking-tight">
                {title}
              </h2>
              <div className="font-mono text-[10px] text-text-muted mt-1 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-none" />
                {subtitle}
              </div>
            </div>
          </div>
          
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-transparent hover:border-border-main hover:bg-bg-main text-text-muted hover:text-text-main transition-all duration-200"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENT SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <Suspense fallback={<LoadingContent />}>
            <div className="prose prose-sm md:prose-base max-w-none text-text-muted font-body prose-headings:font-heading prose-headings:text-text-main prose-strong:text-text-main prose-a:text-accent prose-code:font-mono prose-code:text-accent">
              {type === 'terms' ? <TermsOfService /> : <PrivacyPolicy />}
            </div>
          </Suspense>
        </div>

        {/* INDUSTRIAL FOOTER */}
        <div className="p-4 border-t border-border-main bg-bg-sub flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-text-main text-bg-main text-xs font-mono font-bold uppercase tracking-widest hover:bg-accent transition-colors"
          >
            ACKNOWLEDGE & CLOSE
          </button>
        </div>
      </div>
    </div>
  )
})

LegalModal.displayName = 'LegalModal'
export default LegalModal