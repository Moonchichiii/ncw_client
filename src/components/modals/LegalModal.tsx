import { memo, useEffect, useRef, Suspense, lazy } from 'react'
import { X } from '@/components/icons'
import { createPortal } from 'react-dom'

const TermsOfService = lazy(() => 
    import('@/pages/TermsOfService').then(module => ({ default: module.default }))
)

const PrivacyPolicy = lazy(() => 
    import('@/pages/PrivacyPolicy').then(module => ({ default: module.default }))
)

interface LegalModalProps {
    type: 'terms' | 'privacy'
    isOpen: boolean
    onClose: () => void
}

const ModalLoader = memo(() => (
    <div className="flex items-center justify-center py-12">
        <div className="text-center">
            <div 
                className="w-8 h-8 border-3 border-interactive-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
                role="status"
                aria-label="Loading document"
            />
            <p className="text-text-secondary">Loading document...</p>
        </div>
    </div>
))

ModalLoader.displayName = 'ModalLoader'

const LegalModal = memo<LegalModalProps>(({ type, isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousFocusRef = useRef<Element | null>(null)

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden'
            
            // Focus the modal after it's rendered
            const timer = setTimeout(() => {
                modalRef.current?.focus()
            }, 100)
            
            return () => {
                clearTimeout(timer)
                document.body.style.overflow = ''
                // Restore focus to the element that opened the modal
                if (previousFocusRef.current && 'focus' in previousFocusRef.current) {
                    (previousFocusRef.current as HTMLElement).focus()
                }
            }
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) {return}

            if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
                return
            }

            // Trap focus within modal
            if (event.key === 'Tab' && modalRef.current) {
                const focusable = modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
                
                if (!focusable.length) {return}

                const first = focusable[0]
                const last = focusable[focusable.length - 1]

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) {return null}

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const content = (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="button"
            tabIndex={0}
            aria-label="Close modal"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClose()
                }
            }}
        >
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
                    <h1
                        id="modal-title"
                        className="mx-auto text-xl font-semibold text-gray-900 dark:text-white text-center"
                    >
                        {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                    </h1>
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-lg
                                             flex items-center justify-center transition-colors
                                             hover:bg-gray-100 dark:hover:bg-slate-700
                                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                    <Suspense fallback={<ModalLoader />}>
                        {type === 'terms' ? <TermsOfService /> : <PrivacyPolicy />}
                    </Suspense>
                </div>
            </div>
        </div>
    )

    return createPortal(content, document.body)
})

LegalModal.displayName = 'LegalModal'
export default LegalModal