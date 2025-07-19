import { useState, useEffect, useCallback } from 'react'

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences'

export interface CookiePreferences {
    necessary: boolean
    analytics: boolean
    marketing: boolean
    preferences: boolean
}

export interface CookieConsentState {
    hasConsented: boolean
    preferences: CookiePreferences
    consentDate: string | null
    showBanner: boolean
    showPreferences: boolean
}

const DEFAULT_PREFERENCES: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
}

const STORAGE_KEY = 'ncw-cookie-consent'
const CONSENT_VERSION = '1.0'

export const useCookieConsent = () => {
    const [state, setState] = useState<CookieConsentState>({
        hasConsented: false,
        preferences: DEFAULT_PREFERENCES,
        consentDate: null,
        showBanner: false,
        showPreferences: false,
    })

    useEffect(() => {
        const loadSavedPreferences = () => {
            try {
                const saved = localStorage.getItem(STORAGE_KEY)
                if (saved) {
                    const parsed = JSON.parse(saved)
                    if (parsed.version === CONSENT_VERSION) {
                        setState({
                            hasConsented: true,
                            preferences: { ...DEFAULT_PREFERENCES, ...parsed.preferences },
                            consentDate: parsed.consentDate,
                            showBanner: false,
                            showPreferences: false,
                        })
                        return
                    }
                }
            } catch (_error) {
                // ignore localStorage errors
            }
            setState(prev => ({ ...prev, showBanner: true }))
        }

        const timer = setTimeout(loadSavedPreferences, 100)
        return () => clearTimeout(timer)
    }, [])

    const savePreferences = useCallback((preferences: CookiePreferences) => {
        try {
            const consentData = {
                version: CONSENT_VERSION,
                preferences,
                consentDate: new Date().toISOString(),
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData))
        } catch (_error) {
            // ignore localStorage errors
        }
    }, [])

    const acceptAll = useCallback(() => {
        const allAccepted: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
        }

        setState({
            hasConsented: true,
            preferences: allAccepted,
            consentDate: new Date().toISOString(),
            showBanner: false,
            showPreferences: false,
        })

        savePreferences(allAccepted)
    }, [savePreferences])

    const rejectAll = useCallback(() => {
        const onlyNecessary: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
        }

        setState({
            hasConsented: true,
            preferences: onlyNecessary,
            consentDate: new Date().toISOString(),
            showBanner: false,
            showPreferences: false,
        })

        savePreferences(onlyNecessary)
    }, [savePreferences])

    const saveCustomPreferences = useCallback((preferences: CookiePreferences) => {
        const validPreferences = { ...preferences, necessary: true }

        setState({
            hasConsented: true,
            preferences: validPreferences,
            consentDate: new Date().toISOString(),
            showBanner: false,
            showPreferences: false,
        })

        savePreferences(validPreferences)
    }, [savePreferences])

    const showPreferencesPanel = useCallback(() => {
        setState(prev => ({
            ...prev,
            showPreferences: true,
            showBanner: false,
        }))
    }, [])

    const hideModals = useCallback(() => {
        setState(prev => ({
            ...prev,
            showBanner: false,
            showPreferences: false,
        }))
    }, [])

    const resetConsent = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY)
            setState({
                hasConsented: false,
                preferences: DEFAULT_PREFERENCES,
                consentDate: null,
                showBanner: true,
                showPreferences: false,
            })
        } catch (_error) {
            // ignore localStorage errors
        }
    }, [])

    const isCategoryEnabled = useCallback((category: CookieCategory): boolean => {
        return state.preferences[category]
    }, [state.preferences])

    const getConsentStatus = useCallback(() => ({
        hasConsented: state.hasConsented,
        analytics: state.preferences.analytics,
        marketing: state.preferences.marketing,
        preferences: state.preferences.preferences,
        consentDate: state.consentDate,
    }), [state])

    return {
        ...state,
        acceptAll,
        rejectAll,
        saveCustomPreferences,
        showPreferencesPanel,
        hideModals,
        resetConsent,
        isCategoryEnabled,
        getConsentStatus,
    }
}