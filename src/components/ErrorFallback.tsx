import { memo } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

export const ErrorFallback = memo<FallbackProps>(({ error, resetErrorBoundary }) => {
  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div
      className="min-h-screen bg-bg-primary flex items-center justify-center px-6 transition-colors duration-300"
      role="alert"
      aria-labelledby="error-title"
    >
      <div className="max-w-lg mx-auto text-center">
        <div className="w-24 h-24 bg-status-error/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle
            className="text-status-error"
            size={48}
            aria-hidden="true"
          />
        </div>
        
        <h1
          id="error-title"
          className="text-4xl font-bold text-status-error mb-4 transition-colors duration-300"
        >
          Something Went Wrong
        </h1>
        
        <p className="text-xl text-text-secondary mb-8 leading-relaxed transition-colors duration-300">
          We apologize for the inconvenience. The application encountered an unexpected error.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-text-tertiary mb-2 hover:text-text-secondary transition-colors duration-200">
              Error Details (Development)
            </summary>
            <pre className="bg-bg-secondary border border-border-primary p-4 rounded-lg text-sm overflow-auto text-text-primary">
              {error.message}
            </pre>
          </details>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-status-error hover:bg-red-700 text-text-inverse font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-2"
            type="button"
            aria-label="Try to reload the application"
          >
            <RefreshCw size={20} aria-hidden="true" />
            Try Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-interactive-secondary hover:bg-bg-tertiary border border-border-primary hover:border-interactive-primary text-text-primary font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-border-focus focus:ring-offset-2"
            type="button"
            aria-label="Navigate to home page"
          >
            <Home size={20} aria-hidden="true" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
})

ErrorFallback.displayName = 'ErrorFallback'