import { memo, Suspense, lazy, startTransition } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/layout/Layout'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/pages/Hero'
import LegalModal from '@/components/modals/LegalModal'
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

const preloadNextSections = (): void => {
  startTransition(() => {
    preloadComponent(() => import('@/pages/About'))
    preloadComponent(() => import('@/pages/Work'))
  })
}

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

  const { showPreferencesPanel } = useCookieConsent()

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
        onCookieSettings={showPreferencesPanel}
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
