import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { Cookie, Settings, X, Shield } from 'lucide-react'
import clsx from 'clsx'
import { useCookieConsent, type CookieCategory, type CookiePreferences } from '@/hooks/useCookieConsent'
import CookieCategoryToggle from '@/components/cookies/CookieCategoryToggle'
import { COOKIE_CATEGORIES } from '@/components/cookies/cookieCategories'

const CookieConsent = memo(() => {
  const {
    showBanner,
    showPreferences,
    preferences,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    showPreferencesPanel,
    hideModals,
  } = useCookieConsent()

  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Animate banner entrance
  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [showBanner])

  // Keep local preferences in sync
  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  // ESC to close preferences modal and focus management
  useEffect(() => {
    if (!showPreferences) {return}
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        hideModals()
      }
    }
    
    document.addEventListener('keydown', onKey)
    const timer = setTimeout(() => firstFocusableRef.current?.focus(), 100)
    
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timer)
    }
  }, [showPreferences, hideModals])

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showPreferences ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showPreferences])

  const handleCategoryChange = useCallback((id: CookieCategory, enabled: boolean) => {
    setLocalPreferences(prev => ({ ...prev, [id]: enabled }))
  }, [])

  const handleAcceptSelected = useCallback(() => {
    saveCustomPreferences(localPreferences)
  }, [localPreferences, saveCustomPreferences])

  if (!showBanner && !showPreferences) {return null}

  return (
    <>
      {/* Cookie Banner - Now positioned at top of viewport for immediate visibility */}
      {showBanner && (
        <div
          ref={bannerRef}
          className={clsx(
            'fixed top-20 left-4 right-4 z-[100] max-w-md mx-auto',
            'bg-bg-primary/95 backdrop-blur-lg border border-border-primary',
            'rounded-2xl shadow-2xl',
            'transform transition-all duration-500 ease-out',
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : '-translate-y-4 opacity-0 scale-95'
          )}
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="p-6">
            {/* Header with icon and close button */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-interactive-primary to-interactive-hover rounded-xl flex items-center justify-center">
                  <Cookie size={20} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="cookie-banner-title" className="font-bold text-text-primary text-lg">
                    Cookie Notice
                  </h3>
                  <p className="text-xs text-text-tertiary">
                    Enhanced privacy controls
                  </p>
                </div>
              </div>
              <button
                onClick={hideModals}
                className="w-8 h-8 flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                aria-label="Close cookie notice"
                type="button"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <p id="cookie-banner-description" className="text-sm text-text-secondary leading-relaxed mb-6">
              We use cookies to enhance your browsing experience and analyze site traffic. 
              Choose your preferences or accept all to continue.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-interactive-primary to-interactive-hover hover:from-interactive-hover hover:to-interactive-primary rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  type="button"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary bg-bg-elevated hover:bg-bg-secondary border border-border-primary rounded-xl transition-colors duration-200"
                  type="button"
                >
                  Reject
                </button>
              </div>
              <button
                onClick={showPreferencesPanel}
                className="w-full px-4 py-2.5 text-sm font-medium text-interactive-primary hover:text-interactive-hover bg-interactive-primary/5 hover:bg-interactive-primary/10 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                type="button"
              >
                <Settings size={16} aria-hidden="true" />
                Customize Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal - Enhanced design */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-[200] bg-bg-overlay/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="w-full max-w-4xl bg-bg-primary rounded-3xl shadow-2xl border border-border-primary max-h-[90vh] overflow-hidden"
            >
              {/* Enhanced header */}
              <div className="flex items-center justify-between p-6 border-b border-border-primary bg-gradient-to-r from-interactive-primary/5 to-interactive-hover/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-interactive-primary to-interactive-hover rounded-2xl flex items-center justify-center">
                    <Shield size={24} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="cookie-preferences-title" className="text-2xl font-bold text-text-primary">
                      Privacy Preferences
                    </h2>
                    <p className="text-sm text-text-secondary mt-1">
                      Take control of your data and privacy settings
                    </p>
                  </div>
                </div>
                <button
                  ref={firstFocusableRef}
                  onClick={hideModals}
                  className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-colors duration-200"
                  type="button"
                  aria-label="Close privacy preferences"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Body with enhanced content */}
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                <div className="bg-gradient-to-r from-status-info/10 to-interactive-primary/10 rounded-2xl p-5 border border-status-info/20">
                  <p className="text-text-primary leading-relaxed font-medium">
                    Your privacy matters to us. We're committed to transparency about data collection 
                    and giving you complete control over your experience.
                  </p>
                </div>

                <div className="space-y-4">
                  {COOKIE_CATEGORIES.map(category => (
                    <CookieCategoryToggle
                      key={category.id}
                      category={category}
                      enabled={localPreferences[category.id]}
                      onChange={handleCategoryChange}
                      disabled={category.required}
                    />
                  ))}
                </div>

                {/* Privacy policy link */}
                <div className="mt-6 p-5 bg-bg-secondary rounded-2xl border border-border-primary">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">Learn More:</strong>{' '}
                    Read our{' '}
                    <a
                      href="/privacy-policy"
                      className="text-interactive-primary hover:text-interactive-hover underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{' '}
                    for detailed information about data handling and your rights.
                  </p>
                </div>
              </div>

              {/* Enhanced footer */}
              <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border-primary bg-bg-secondary/50">
                <button
                  onClick={rejectAll}
                  className="flex-1 px-6 py-3 text-sm font-medium text-text-secondary hover:text-text-primary bg-bg-elevated hover:bg-bg-secondary border border-border-primary hover:border-interactive-primary rounded-xl transition-all duration-200"
                  type="button"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-6 py-3 text-sm font-semibold bg-interactive-secondary hover:bg-interactive-primary text-text-primary hover:text-text-inverse rounded-xl transition-all duration-200 border border-border-primary hover:border-interactive-primary"
                  type="button"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 text-sm font-semibold bg-gradient-to-r from-interactive-primary to-interactive-hover hover:from-interactive-hover hover:to-interactive-primary text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  type="button"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})

CookieConsent.displayName = 'CookieConsent'
export default CookieConsent