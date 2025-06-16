import { memo, useEffect, useRef, useCallback, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import Button from '@/components/Button'

const Hero = memo(() => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const [animationsComplete, setAnimationsComplete] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    const currentTitleRef = titleRef.current
    const currentSubtitleRef = subtitleRef.current
    const currentButtonsRef = buttonsRef.current

    if (!currentTitleRef || !currentSubtitleRef || !currentButtonsRef) {
      return
    }

    if (reducedMotion) {
      const elements = [currentTitleRef, currentSubtitleRef, currentButtonsRef]
      elements.forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      setAnimationsComplete(true)
      return
    }

    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationsComplete(true)
      })

      gsap.set([currentTitleRef, currentSubtitleRef, currentButtonsRef], {
        opacity: 0,
        y: 60,
        force3D: true
      })

      tl.to(currentTitleRef, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        force3D: true
      })
        .to(currentSubtitleRef, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          force3D: true
        }, '-=0.6')
        .to(currentButtonsRef, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          force3D: true
        }, '-=0.4')
        .call(() => {
          const elements = [currentTitleRef, currentSubtitleRef, currentButtonsRef]
          elements.forEach(el => {
            el.style.willChange = 'auto'
          })
        })

      return () => {
        tl.kill()
      }
    }).catch(() => {
      const elements = [currentTitleRef, currentSubtitleRef, currentButtonsRef]
      elements.forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      setAnimationsComplete(true)
    })
  }, [reducedMotion])

  const announceToScreenReader = useCallback((message: string) => {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message
    document.body.appendChild(liveRegion)
    setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion)
      }
    }, 2000)
  }, [])

  const scrollToWork = useCallback(() => {
    const element = document.getElementById('work')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      const announcement = 'Navigating to work portfolio section'
      announceToScreenReader(announcement)
    }
  }, [announceToScreenReader])

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      const announcement = 'Navigating to contact section'
      announceToScreenReader(announcement)
    }
  }, [announceToScreenReader])

  return (
    <section
      ref={heroRef}
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary transition-colors duration-300"
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
      role="banner"
    >
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none" 
        aria-hidden="true"
        role="presentation"
      >
        <div className="absolute top-1/4 right-1/3 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 bg-gradient-to-r from-accent-500/20 to-brand-500/20 rounded-full blur-3xl animate-float [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h1
            ref={titleRef}
            id="hero-title"
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-4 sm:mb-6 text-text-primary transition-colors duration-300 leading-none"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <span className="block">NORDIC</span>
            <span className="block bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              CODE
            </span>
            <span className="block">WORKS</span>
          </h1>

          <p
            ref={subtitleRef}
            id="hero-description"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-text-secondary leading-relaxed max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 transition-colors duration-300 px-4"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            Digital experiences with{' '}
            <span className="font-bold text-interactive-primary">Nordic precision</span>
          </p>

          <div 
            ref={buttonsRef} 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-md md:max-w-lg mx-auto px-4"
            style={{ opacity: reducedMotion ? 1 : 0 }}
            role="group"
            aria-labelledby="cta-group-label"
          >
            <Button
              onClick={scrollToWork}
              variant="primary"
              size="md"
              aria-describedby="cta-work-desc"
              className="bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 hover:shadow-2xl hover:shadow-brand-500/25 w-full sm:w-auto"
            >
              See Our Work
            </Button>

            <Button
              onClick={scrollToContact}
              variant="secondary"
              size="md"
              aria-describedby="cta-contact-desc"
              className="w-full sm:w-auto"
            >
              Start Project
            </Button>
          </div>

          <span id="cta-group-label" className="sr-only">
            Call to action buttons
          </span>

          <div className="sr-only">
            <span id="cta-work-desc">
              Navigate to our work portfolio section to view our completed projects and case studies
            </span>
            <span id="cta-contact-desc">
              Navigate to contact section to start a new project with Nordic Code Works
            </span>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" 
        aria-hidden="true"
        role="presentation"
      >
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-text-tertiary rounded-full flex justify-center transition-colors duration-300">
          <ArrowDown 
            size={14} 
            className="text-text-tertiary mt-1 sm:mt-2 transition-colors duration-300" 
            aria-hidden="true"
          />
        </div>
      </div>

      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {animationsComplete && !reducedMotion && 'Hero section animation completed'}
      </div>

      <div className="sr-only">
        <p>
          Welcome to Nordic Code Works homepage. This is the hero section featuring our company name and tagline.
          Use the navigation buttons to explore our work portfolio or start a new project.
          The page includes smooth scrolling navigation and respects your motion preferences.
        </p>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
