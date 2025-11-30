import { memo, useEffect, useState, useCallback } from 'react'
import { X, Settings } from '@/components/icons'
import type { CookieCategory, CookiePreferences } from '@/hooks/useCookieConsent'
import CookieCategoryToggle from '@/components/cookies/CookieCategoryToggle'
import { COOKIE_CATEGORIES } from '@/components/cookies/cookieCategories'

// Properly type the props using the imported CookiePreferences
interface CookieConsentProps {
  showBanner: boolean
  showPreferences: boolean
  preferences: CookiePreferences
  acceptAll: () => void
  rejectAll: () => void
  saveCustomPreferences: (prefs: CookiePreferences) => void
  showPreferencesPanel: () => void
  hideModals: () => void
}

const CookieConsent = memo<CookieConsentProps>((props) => {
  const {
    showBanner,
    showPreferences,
    preferences,
    acceptAll,
    rejectAll,
    saveCustomPreferences,
    showPreferencesPanel,
    hideModals,
  } = props

  const [isVisible, setIsVisible] = useState(false)
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)

  // Sync local state when prop changes
  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  useEffect(() => {
    if (showBanner) {
      setTimeout(() => setIsVisible(true), 500)
    } else {
      setIsVisible(false)
    }
  }, [showBanner])

  const handleCategoryChange = useCallback((id: CookieCategory, enabled: boolean) => {
    setLocalPreferences(prev => ({ 
      ...prev, 
      [id]: enabled 
    }))
  }, [])

  if (!showBanner && !showPreferences) {return null}

  return (
    <>
      {/* INDUSTRIAL BANNER */}
      {showBanner && (
        <div className={`fixed bottom-0 right-0 z-[2000] w-full max-w-md p-4 transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="bg-bg-main border border-border-main shadow-2xl p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest border-b border-accent pb-1">
                SYSTEM_NOTICE // PRIVACY
              </h3>
              <button onClick={hideModals} className="text-text-muted hover:text-text-main">
                <X size={16} />
              </button>
            </div>
            
            <p className="text-sm text-text-main mb-6 leading-relaxed font-medium">
              We utilize local storage tokens to enhance system performance and analyze traffic patterns.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={rejectAll} className="px-4 py-3 bg-bg-sub border border-border-main text-xs font-mono font-bold uppercase tracking-wider hover:bg-bg-acc transition-colors">
                DENY_ALL
              </button>
              <button onClick={acceptAll} className="px-4 py-3 bg-text-main text-bg-main border border-text-main text-xs font-mono font-bold uppercase tracking-wider hover:bg-accent hover:border-accent transition-colors">
                ACCEPT_ALL
              </button>
            </div>
            
            <button onClick={showPreferencesPanel} className="mt-4 w-full text-center text-[10px] font-mono text-text-muted hover:text-text-main uppercase tracking-widest flex items-center justify-center gap-2">
              <Settings size={10} /> CONFIGURE_PARAMETERS
            </button>
          </div>
        </div>
      )}

      {/* INDUSTRIAL PREFERENCES MODAL */}
      {showPreferences && (
        <div className="fixed inset-0 z-[2001] bg-bg-main/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-bg-main border border-border-main shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-border-main flex justify-between items-center bg-bg-sub">
              <h2 className="font-mono text-sm text-text-main uppercase tracking-widest">PRIVACY_CONFIGURATION</h2>
              <button onClick={hideModals} className="hover:text-accent"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
               {COOKIE_CATEGORIES.map(category => (
                 <CookieCategoryToggle
                   key={category.id}
                   category={category}
                   // We need to use "as keyof CookiePreferences" because string indexing on interfaces can be tricky in TS
                   enabled={localPreferences[category.id as keyof CookiePreferences]}
                   onChange={handleCategoryChange}
                   disabled={category.required}
                 />
               ))}
            </div>
            <div className="p-6 border-t border-border-main bg-bg-sub flex justify-end">
              <button onClick={() => saveCustomPreferences(localPreferences)} className="px-8 py-3 bg-text-main text-bg-main font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors">
                SAVE_CONFIG
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
})

CookieConsent.displayName = 'CookieConsent'
export default CookieConsent