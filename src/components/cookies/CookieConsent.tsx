import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { Cookie, Settings, X } from 'lucide-react'
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
  const bannerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // keep local in sync
  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  // ESC to close preferences modal
  useEffect(() => {
    if (!showPreferences) {return}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        hideModals()
      }
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstFocusableRef.current?.focus(), 100)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [showPreferences, hideModals])

  // prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showPreferences ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showPreferences])

  const handleCategoryChange = useCallback((id: CookieCategory, enabled: boolean) => {
    setLocalPreferences(ps => ({ ...ps, [id]: enabled }))
  }, [])

  const handleAcceptSelected = useCallback(() => {
    saveCustomPreferences(localPreferences)
  }, [localPreferences, saveCustomPreferences])

  if (!showBanner && !showPreferences) {return null}

  return (
    <>
      {showBanner && (
        <div
          ref={bannerRef}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-bg-overlay/95 backdrop-blur-xl border-t border-border-primary shadow-lg cookie-banner"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="container mx-auto px-4 py-6 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-8 h-8 bg-interactive-primary/10 rounded-lg flex items-center justify-center mt-1">
                  <Cookie size={18} className="text-interactive-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 id="cookie-banner-title" className="font-semibold text-text-primary mb-1">
                    We use cookies
                  </h3>
                  <p id="cookie-banner-description" className="text-sm text-text-secondary leading-relaxed">
                    We use cookies to enhance your experience, analyze site usage, and assist in marketing.
                    You can customize your preferences or accept all cookies.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                <button
                  onClick={showPreferencesPanel}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-text-primary bg-bg-elevated hover:bg-bg-secondary border border-border-primary hover:border-interactive-primary rounded-lg transition-colors duration-200"
                  type="button"
                >
                  <Settings size={16} aria-hidden="true" /> Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary bg-transparent hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                  type="button"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2.5 text-sm font-medium text-text-inverse bg-interactive-primary hover:bg-interactive-hover rounded-lg transition-colors duration-200"
                  type="button"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div
          className="fixed inset-0 z-[200] bg-bg-overlay/80 backdrop-blur-sm cookie-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
        >
          <div className="min-h-screen flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="w-full max-w-4xl bg-bg-primary rounded-2xl shadow-2xl border border-border-primary max-h-[90vh] overflow-hidden"
              style={{ contain: 'layout style paint' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-interactive-primary/10 rounded-lg flex items-center justify-center">
                    <Cookie size={20} className="text-interactive-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="cookie-preferences-title" className="text-xl font-bold text-text-primary">
                      Cookie Preferences
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Manage your cookie settings and privacy preferences
                    </p>
                  </div>
                </div>
                <button
                  ref={firstFocusableRef}
                  onClick={hideModals}
                  className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg"
                  type="button"
                  aria-label="Close cookie preferences"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                <p className="text-text-secondary leading-relaxed">
                  We respect your privacy and are committed to transparency about the data we collect.
                  Choose which types of cookies you&apos;re comfortable with. You can change these settings at any time.
                </p>

                {COOKIE_CATEGORIES.map(cat => (
                  <CookieCategoryToggle
                    key={cat.id}
                    category={cat}
                    enabled={localPreferences[cat.id]}
                    onChange={handleCategoryChange}
                    disabled={cat.required}
                  />
                ))}

                <div className="mt-6 p-4 bg-bg-secondary rounded-xl border border-border-primary">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-text-primary">Your Privacy Matters:</strong>{' '}
                    We use cookies only to improve your experience.
                    Read our{' '}
                    <a
                      href="/privacy-policy"
                      className="text-interactive-primary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{' '}
                    for complete details.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border-primary bg-bg-secondary">
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-3 text-sm font-medium border border-border-primary rounded-lg"
                  type="button"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-4 py-3 text-sm font-medium bg-interactive-primary rounded-lg text-text-inverse"
                  type="button"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-3 text-sm font-medium bg-gradient-to-r from-interactive-primary to-interactive-hover rounded-lg text-text-inverse"
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
