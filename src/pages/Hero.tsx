import { memo, useCallback, useState, useEffect } from 'react'
import { ArrowDown, Code2 } from '@/components/icons/index'

const Hero = memo(() => {
  const [isPreloading, setIsPreloading] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const SCROLL_OFFSET = 55

  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true)
      })
    } else {
      const timer = setTimeout(() => setFontsLoaded(true), 100)
      return () => clearTimeout(timer)
    }
  }, [])

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        const elementTop = aboutSection.offsetTop
        const offsetPosition = elementTop + SCROLL_OFFSET
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 300)
    }
  }, [])

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        const elementTop = contactSection.offsetTop
        const offsetPosition = elementTop + SCROLL_OFFSET
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 300)
    }
  }, [])

  const preloadAboutSection = useCallback(() => {
    if (isPreloading) {return}

    setIsPreloading(true)
    import('@/pages/About').then(() => {
      setIsPreloading(false)
    }).catch(() => {
      setIsPreloading(false)
    })
  }, [isPreloading])

  const scrollToNextSection = useCallback(() => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        const elementTop = aboutSection.offsetTop
        const offsetPosition = elementTop + SCROLL_OFFSET
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, 300)
      return
    }

    const heroHeight = window.innerHeight
    const targetPosition = heroHeight + 100

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })

    setTimeout(() => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const elementTop = aboutSection.offsetTop
        const offsetPosition = elementTop + SCROLL_OFFSET
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 500)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        contain: 'layout style paint',
        minHeight: '100dvh'
      }}
    >
      <div className="absolute inset-0 modern-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-interactive-primary/5 via-transparent to-accent-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-interactive-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="block lg:hidden text-center">
            <div
              id="hero-title"
              className={`font-heading font-black tracking-tighter mb-6 transition-opacity duration-300 ${
                fontsLoaded ? 'opacity-100' : 'opacity-90'
              }`}
              style={{
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                contain: 'layout style paint'
              }}
            >
              <span className="block text-7xl sm:text-8xl text-text-primary leading-none">NORDIC</span>
              <span className="block text-7xl sm:text-8xl accent-gradient bg-clip-text text-transparent leading-none">CODE</span>
              <span className="block text-7xl sm:text-8xl text-text-primary leading-none">WORKS</span>
            </div>
            <div 
              className="mb-8"
              style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p className="text-xl sm:text-2xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
                Crafting digital experiences with{' '}
                <span className="text-interactive-primary font-semibold">Nordic precision</span>
              </p>
            </div>
            <div 
              className="flex justify-center mb-8"
              style={{ minHeight: '36px' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Available
              </div>
            </div>
            <div 
              className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 max-w-sm sm:max-w-none mx-auto"
              style={{ minHeight: '48px' }}
            >
              <button
                onClick={scrollToAbout}
                onMouseEnter={preloadAboutSection}
                className="group relative w-full sm:w-auto px-6 py-3 bg-text-primary text-text-inverse rounded-3xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">About Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-interactive-primary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={scrollToContact}
                className="group w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-text-primary text-text-primary rounded-3xl font-semibold text-base transition-all duration-300 hover:bg-text-primary hover:text-text-inverse hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <Code2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                  Start Project
                </span>
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-12 lg:gap-12 lg:items-center">
              <div className="lg:col-span-7">
                <div
                  className={`font-heading font-black tracking-tighter leading-none text-left transition-opacity duration-300 ${
                    fontsLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                  style={{
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    contain: 'layout style paint'
                  }}
                >
                  <span className="block text-7xl xl:text-9xl text-text-primary">NORDIC</span>
                  <span className="block text-7xl xl:text-9xl accent-gradient bg-clip-text text-transparent">CODE</span>
                  <span className="block text-7xl xl:text-9xl text-text-primary">WORKS</span>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
                <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                  <p className="text-xl lg:text-2xl text-text-secondary font-medium leading-relaxed text-left">
                    Crafting digital experiences with{' '}
                    <span className="text-interactive-primary font-semibold">Nordic precision</span>
                  </p>
                </div>
                <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-medium w-fit">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available
                  </div>
                </div>
                <div 
                  className="flex flex-col gap-3 max-w-[280px]"
                  style={{ minHeight: '112px', paddingTop: '8px' }}
                >
                  <button
                    onClick={scrollToAbout}
                    onMouseEnter={preloadAboutSection}
                    className="group relative w-full px-6 py-3 bg-text-primary text-text-inverse rounded-3xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10">About Me</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-interactive-primary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="group w-full px-6 py-3 bg-transparent border-2 border-text-primary text-text-primary rounded-3xl font-semibold text-base transition-all duration-300 hover:bg-text-primary hover:text-text-inverse hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Code2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                      Start Project
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={scrollToNextSection}
          onMouseEnter={preloadAboutSection}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 group flex flex-col items-center gap-2 text-text-tertiary hover:text-interactive-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-interactive-primary rounded-lg p-2"
          aria-label="Scroll to next section"
          type="button"
        >
          <span className="text-sm font-medium">About</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero
