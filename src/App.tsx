import { memo, Suspense, lazy, startTransition } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/layout/Layout'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/pages/Hero'
import LegalModal from '@/components/modals/LegalModal'
import { ErrorFallback } from '@/components/common/ErrorFallback'
import { useLegalModals } from '@/hooks/useLegalModals'
import { useCookieConsent } from '@/hooks/useCookieConsent'

const Work = lazy(() =>
  import('@/pages/Work').then(module => ({ default: module.default }))
)
const About = lazy(() =>
  import('@/pages/About').then(module => ({ default: module.default }))
)
const Contact = lazy(() =>
  import('@/pages/Contact').then(module => ({ default: module.default }))
)

const SectionLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
    <div className="text-center">
      <div
        className="w-8 h-8 border-3 border-interactive-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
        role="status"
        aria-label="Loading content"
      />
      <p className="text-text-secondary">Loading...</p>
    </div>
  </div>
))

SectionLoader.displayName = 'SectionLoader'

const preloadComponent = (componentImport: () => Promise<unknown>): Promise<unknown> => {
  return componentImport()
}

// Preload legal documents when user hovers over footer
const preloadLegalDocs = (): void => {
  startTransition(() => {
    preloadComponent(() => import('@/pages/TermsOfService'))
    preloadComponent(() => import('@/pages/PrivacyPolicy'))
  })
}

const App = memo(() => {
  const { 
    openTerms, 
    openPrivacy, 
    closeModal,
    isTermsOpen,
    isPrivacyOpen 
  } = useLegalModals()

  // Add cookie consent integration
  const { showPreferencesPanel } = useCookieConsent()

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      startTransition(() => {
        preloadComponent(() => import('@/pages/Work'))
        preloadComponent(() => import('@/pages/About'))
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
        onCookieSettings={showPreferencesPanel}
      >
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Work />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </Layout>

      {/* Legal Modals */}
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
    </ErrorBoundary>
  )
})

App.displayName = 'App'
export default App