import { memo, type ReactNode } from 'react'
import Footer from '@/components/layout/Footer'

interface LayoutProps {
  children: ReactNode
  onOpenPrivacy?: () => void
  onOpenTerms?: () => void
  onPreloadLegal?: () => void
  onCookieSettings?: () => void
}

const Layout = memo<LayoutProps>(({ 
  children, 
  onOpenPrivacy, 
  onOpenTerms, 
  onPreloadLegal,
  onCookieSettings
}) => {
  return (
    <div className="min-h-screen bg-bg-main transition-colors duration-300 selection:bg-accent selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999]
                   bg-accent text-white px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest"
      >
        Skip to content
      </a>    
      
      <main id="main-content" className="flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <div onMouseEnter={onPreloadLegal}>
        <Footer 
          onOpenPrivacy={onOpenPrivacy}
          onOpenTerms={onOpenTerms}
          onCookieSettings={onCookieSettings}
        />
      </div>
    </div>
  )
})

Layout.displayName = 'Layout'
export default Layout