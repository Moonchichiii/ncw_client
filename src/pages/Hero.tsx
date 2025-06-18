import { memo, useEffect, useRef, useCallback, useState } from 'react'
import { ArrowDown } from 'lucide-react'

import heroDesktopImage from '/src/assets/images/hero-bg-desktop.jpg'
import heroMobileImage from '/src/assets/images/hero-bg-mobile.jpg'

const setupAnimations = async (
  titleEl: HTMLHeadingElement | null,
  subtitleEl: HTMLParagraphElement | null,
  buttonsEl: HTMLDivElement | null,
  onComplete: () => void
) => {
  if (!titleEl || !subtitleEl || !buttonsEl) {return}

  try {
    const { gsap } = await import('gsap')
    const tl = gsap.timeline({ onComplete })
    const elements = [titleEl, subtitleEl, buttonsEl]

    gsap.set(elements, { opacity: 0, y: 30, force3D: true })

    tl.to(titleEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', force3D: true })
      .to(subtitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', force3D: true }, '-=0.5')
      .to(buttonsEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', force3D: true }, '-=0.3')
      .call(() => elements.forEach(el => el.style.willChange = 'auto'))

    return () => tl.kill()
  } catch {
    [titleEl, subtitleEl, buttonsEl].forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    onComplete()
  }
}

const preloadImages = async (): Promise<void> => {
  const promises = [
    new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = heroDesktopImage
    }),
    new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = heroMobileImage
    })
  ]
  
  await Promise.allSettled(promises)
}

const Hero = memo(() => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const [animationsComplete, setAnimationsComplete] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await preloadImages()
      } finally {
        setImagesLoaded(true)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      [titleRef.current, subtitleRef.current, buttonsRef.current].forEach(el => {
        if (el) {
          el.style.opacity = '1'
          el.style.transform = 'none'
        }
      })
      setAnimationsComplete(true)
      return
    }

    setupAnimations(titleRef.current, subtitleRef.current, buttonsRef.current, () => setAnimationsComplete(true))
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
      announceToScreenReader('Navigating to work portfolio section')
    }
  }, [announceToScreenReader])

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      announceToScreenReader('Navigating to contact section')
    }
  }, [announceToScreenReader])

  return (
    <section
      ref={heroRef}
      className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary"
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
      role="banner"
    >
      {imagesLoaded && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ containIntrinsicSize: '100vw 100vh' }}>
          <div className="hidden lg:block dark:hidden absolute inset-0 bg-center bg-cover bg-no-repeat mix-blend-multiply transition-opacity duration-700 ease-out"
            style={{ backgroundImage: `url('${heroDesktopImage}')`, filter: 'brightness(0.6) contrast(1.4) saturate(0.8)', opacity: 0.4, contentVisibility: 'auto' }} />
          <div className="hidden dark:lg:block absolute inset-0 bg-center bg-cover bg-no-repeat mix-blend-soft-light transition-opacity duration-700 ease-out"
            style={{ backgroundImage: `url('${heroDesktopImage}')`, filter: 'brightness(0.8) contrast(1.1)', opacity: 0.2, contentVisibility: 'auto' }} />
          <div className="lg:hidden dark:hidden absolute inset-0 bg-center bg-cover bg-no-repeat mix-blend-multiply transition-opacity duration-700 ease-out"
            style={{ backgroundImage: `url('${heroMobileImage}')`, filter: 'brightness(0.7) contrast(1.3) saturate(0.8)', opacity: 0.35, contentVisibility: 'auto' }} />
          <div className="dark:block lg:dark:hidden absolute inset-0 bg-center bg-cover bg-no-repeat mix-blend-soft-light transition-opacity duration-700 ease-out"
            style={{ backgroundImage: `url('${heroMobileImage}')`, filter: 'brightness(0.9) contrast(1.05)', opacity: 0.25, contentVisibility: 'auto' }} />
          <div className="dark:hidden absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/20 to-bg-primary/70" />
          <div className="dark:hidden absolute inset-0 bg-gradient-to-r from-bg-primary/40 via-transparent to-bg-secondary/30" />
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary/60" />
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-bg-primary/30 via-transparent to-bg-secondary/20" />
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-interactive-primary/10 to-interactive-hover/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-interactive-hover/10 to-interactive-primary/10 rounded-full blur-3xl animate-float [animation-delay:2s]" />
      </div>

      <div className="relative z-20 min-h-[100dvh] grid grid-rows-[1fr_auto] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="text-center max-w-5xl">
            <h1 
              ref={titleRef} 
              id="hero-title"
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-6 lg:mb-8 text-text-primary leading-none"
              style={{ opacity: reducedMotion ? 1 : 0, containIntrinsicSize: 'auto 200px', contentVisibility: 'auto' }}
            >
              <span className="block">NORDIC</span>
              <span className="block bg-gradient-to-r from-interactive-primary via-interactive-hover to-interactive-primary bg-clip-text text-transparent">CODE</span>
              <span className="block">WORKS</span>
            </h1>

            <p 
              ref={subtitleRef} 
              id="hero-description"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-text-secondary leading-relaxed mb-10 lg:mb-12 max-w-4xl mx-auto"
              style={{ opacity: reducedMotion ? 1 : 0, containIntrinsicSize: 'auto 100px', contentVisibility: 'auto' }}
            >
              Digital experiences with <span className="font-bold text-interactive-primary">Nordic precision</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0 text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-text-tertiary">
                Crafting tomorrow&apos;s web, today
              </span>
            </p>

            <div 
              ref={buttonsRef} 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto"
              style={{ opacity: reducedMotion ? 1 : 0, containIntrinsicSize: 'auto 60px', contentVisibility: 'auto' }}
            >
              <button
                onClick={scrollToWork}
                className="px-5 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-semibold rounded-xl bg-gradient-to-r from-interactive-primary to-interactive-hover hover:from-interactive-hover hover:to-interactive-primary text-text-inverse shadow-lg hover:shadow-xl hover:shadow-interactive-primary/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
                type="button"
                aria-label="View our portfolio of work"
              >
                See Our Work
              </button>
              
              <button
                onClick={scrollToContact}
                className="px-5 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-semibold rounded-xl bg-bg-overlay/80 hover:bg-bg-elevated backdrop-blur-sm border border-border-primary hover:border-border-secondary text-text-primary shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
                type="button"
                aria-label="Start a new project with us"
              >
                Start Project
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end pb-8 lg:pb-12">
          <div className="hidden md:flex gap-8 lg:gap-12">
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-interactive-primary mb-1">50+</div>
              <div className="text-sm text-text-secondary">Projects</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-interactive-hover mb-1">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-interactive-primary mb-1">24/7</div>
              <div className="text-sm text-text-secondary">Support</div>
            </div>
          </div>
          <div className="mx-auto md:mx-0 animate-bounce" aria-hidden="true">
            <div className="w-6 h-10 border-2 border-text-tertiary rounded-full flex justify-center">
              <ArrowDown size={16} className="text-text-tertiary mt-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <div aria-live="polite" aria-atomic="true">{animationsComplete && !reducedMotion && 'Hero section animation completed'}</div>
        <p>Welcome to Nordic Code Works homepage. This is the hero section featuring our company name and tagline. We specialize in creating digital experiences with Nordic precision. Use the navigation buttons to explore our work portfolio or start a new project.</p>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
