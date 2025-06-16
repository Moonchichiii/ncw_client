import { memo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/components/Layout'
import Hero from '@/pages/Hero'
import { ErrorFallback } from '@/components/ErrorFallback'

const App = memo(() => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        <Hero />
      </Layout>
    </ErrorBoundary>
  )
})

App.displayName = 'App'

export default App