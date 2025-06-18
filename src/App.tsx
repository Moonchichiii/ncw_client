import { memo, Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/layout/Layout'
import Hero from '@/pages/Hero'
import { ErrorFallback } from '@/components/common/ErrorFallback'

const Work = lazy(() => import('@/pages/Work'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

const SectionLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
    <div className="text-center">
      <div className="w-8 h-8 border-3 border-interactive-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-secondary">Loading...</p>
    </div>
  </div>
))

SectionLoader.displayName = 'SectionLoader'

const App = memo(() => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>        
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
      
    </ErrorBoundary>
  )
})

App.displayName = 'App'

export default App
