import { memo, type ReactNode } from 'react'
import Navbar from '@/components/Navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout = memo<LayoutProps>(({ children }) => {
  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      {/* Navigation Skip Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-interactive-primary text-text-inverse px-4 py-2 rounded-lg z-[9999] focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <Navbar />
      <main id="main-content" className="pt-16">
        {children}
      </main>
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout