import { memo, Suspense, lazy, startTransition } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/layout/Layout'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/pages/Hero'
import LegalModal from '@/components/modals/LegalModal'
import CookieConsent from '@/components/cookies/CookieConsent' // Added Import
import { ErrorFallback } from '@/components/common/ErrorFallback'
import { useLegalModals } from '@/hooks/useLegalModals'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const About = lazy(() =>
  import('@/pages/About').then(module => ({ default: module.default }))
)
const Work = lazy(() =>
  import('@/pages/Work').then(module => ({ default: module.default }))
)
const Contact = lazy(() =>
  import('@/pages/Contact').then(module => ({ default: module.default }))
)

const SectionLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-interactive-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-secondary font-mono text-xs uppercase tracking-widest">Loading_Modules...</p>
    </div>
  </div>
))

SectionLoader.displayName = 'SectionLoader'

const preloadComponent = (componentImport: () => Promise<unknown>) => componentImport()

const App = memo(() => {
  // Legal Modals Hook
  const {
    openTerms,
    openPrivacy,
    closeModal,
    isTermsOpen,
    isPrivacyOpen
  } = useLegalModals()

  // Cookie Consent Hook (State Lifted Up)
  const cookieState = useCookieConsent()

  // Preloading Logic
  const preloadNextSections = () => {
    startTransition(() => {
      preloadComponent(() => import('@/pages/About'))
      preloadComponent(() => import('@/pages/Work'))
    })
  }

  const preloadLegalDocs = () => {
    startTransition(() => {
      preloadComponent(() => import('@/pages/TermsOfService'))
      preloadComponent(() => import('@/pages/PrivacyPolicy'))
    })
  }

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      startTransition(() => {
        preloadComponent(() => import('@/pages/About'))
        preloadComponent(() => import('@/pages/Work'))
        preloadComponent(() => import('@/pages/Contact'))
      })
    })
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar />
      
      <Layout
        onOpenPrivacy={openPrivacy}
        onOpenTerms={openTerms}
        onPreloadLegal={preloadLegalDocs}
        onCookieSettings={cookieState.showPreferencesPanel} // Connects Footer Button
      >
        <div onMouseEnter={preloadNextSections}>
          <Hero />
        </div>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Work />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </Layout>

      {/* Global Modals */}
      <LegalModal
        type="terms"
        isOpen={isTermsOpen}
        onClose={closeModal}
      />
      <LegalModal
        type="privacy"
        isOpen={isPrivacyOpen}
        onClose={closeModal}
      />
      
      {/* Cookie Consent UI (Controlled by App State) */}
      <CookieConsent {...cookieState} />
      
    </ErrorBoundary>
  )
})

App.displayName = 'App'
export default App