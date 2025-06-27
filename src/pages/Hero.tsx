import { memo, useEffect, useRef, useCallback, useState } from 'react'
import { ArrowDown } from 'lucide-react'

import heroDesktopImage from '/src/assets/images/hero-bg-desktop.jpg'
import heroMobileImage from '/src/assets/images/hero-bg-mobile.jpg'

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
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(motionQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)
    return () => motionQuery.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      await preloadImages()
      setImagesLoaded(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToWork = useCallback(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      role="banner"
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
      className="relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary min-h-screen"
    >
      {/* Fixed background image - more visible in light mode */}
      {imagesLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('${heroDesktopImage}')`,
            mixBlendMode: 'multiply',
            filter: 'brightness(1.1) contrast(1.1) saturate(0.9)'
          }}
          aria-hidden="true"
        />
      )}

      {/* Full screen content  */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between max-w-6xl mx-auto">
          {/* Logo Text */}
          <h1
            ref={titleRef}
            id="hero-title"
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6rem] font-black tracking-tight text-text-primary leading-none"
            style={{ opacity: reducedMotion ? 1 : 1 }}
          >
            <span className="block">NORDIC</span>
            <span className="block bg-gradient-to-r from-interactive-primary via-interactive-hover to-interactive-primary bg-clip-text text-transparent">
              CODE
            </span>
            <span className="block">WORKS</span>
          </h1>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="mt-6 lg:mt-0 flex gap-4"
            style={{ opacity: reducedMotion ? 1 : 1 }}
          >
            <button
              onClick={scrollToWork}
              className="px-8 py-4 text-lg font-semibold rounded-3xl bg-gradient-to-r from-interactive-primary to-interactive-hover text-text-inverse shadow-lg hover:shadow-xl hover:shadow-interactive-primary/25 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
            >
              See Our Work
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 text-lg font-semibold rounded-3xl bg-bg-overlay/80 hover:bg-bg-elevated backdrop-blur-sm border border-border-primary text-text-primary shadow hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
            >
              Start Project
            </button>
          </div>
        </div>

        {/* Subtitle under full width */}
        <p
          ref={subtitleRef}
          id="hero-description"
          className="mt-8 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-text-secondary max-w-3xl mx-auto leading-relaxed"
          style={{ opacity: reducedMotion ? 1 : 1 }}
        >
          Digital experiences with <span className="font-bold text-interactive-primary">Nordic precision</span><br />
          Crafting tomorrow's web, today
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 flex justify-center bottom-20 md:bottom-16 lg:bottom-12" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-text-tertiary rounded-full flex justify-center">
          <ArrowDown size={16} className="text-text-tertiary mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero