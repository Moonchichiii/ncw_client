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
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-interactive-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-secondary">Loading content...</p>
    </div>
  </div>
))

LoadingContent.displayName = 'LoadingContent'

const LegalModal = memo<LegalModalProps>(({ type, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  const config = {
    terms: {
      title: 'Terms of Service',
      icon: AlertCircle,
      description: 'Our terms and conditions'
    },
    privacy: {
      title: 'Privacy Policy', 
      icon: Shield,
      description: 'How we handle your data'
    }
  }

  const { title, icon: Icon, description } = config[type]

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
        const active = document.activeElement as HTMLElement

        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault() 
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Focus close button 
    const timer = setTimeout(() => {
      firstFocusableRef.current?.focus()
    }, 100)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) {return null}

  return (
    <div className="fixed inset-0 z-[300] transition-all duration-300">
      {/* Backdrop  */}
      <button
        className="absolute inset-0 w-full h-full bg-bg-overlay/95 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label={`Close ${title}`}
        type="button"
        tabIndex={-1}
      />
      
      {/* Modal Content */}
      <div 
        className="relative min-h-screen flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={modalRef}
          className="w-full max-w-4xl max-h-[90vh] bg-bg-primary rounded-3xl shadow-2xl border border-border-primary overflow-hidden transform transition-all duration-300 scale-100 relative z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-primary bg-gradient-to-r from-interactive-primary/5 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-interactive-primary to-interactive-hover rounded-2xl flex items-center justify-center">
                <Icon size={24} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 
                  id="modal-title"
                  className="text-2xl font-bold text-text-primary"
                >
                  {title}
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {description}
                </p>
              </div>
            </div>
            
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus"
              aria-label={`Close ${title}`}
              type="button"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <Suspense fallback={<LoadingContent />}>
              {type === 'terms' ? <TermsOfService /> : <PrivacyPolicy />}
            </Suspense>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-border-primary bg-bg-secondary/50">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-interactive-primary hover:bg-interactive-hover text-text-inverse font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

LegalModal.displayName = 'LegalModal'
export default LegalModal