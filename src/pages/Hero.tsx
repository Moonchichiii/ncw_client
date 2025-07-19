import { memo, useCallback, useState } from 'react'
import { ArrowDown } from '@/components/icons/index'
import Button from '@/components/common/Button'

const Hero = memo(() => {
  const [isPreloading, setIsPreloading] = useState(false)
  const SCROLL_OFFSET = 55

  const scrollToWork = useCallback(() => {
    const workSection = document.getElementById('work')
    if (workSection) {
      const elementTop = workSection.offsetTop
      const offsetPosition = elementTop + SCROLL_OFFSET

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const elementTop = contactSection.offsetTop
      const offsetPosition = elementTop + SCROLL_OFFSET

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  // Preload Work section on hover
  const preloadWorkSection = useCallback(() => {
    if (isPreloading) {return}

    setIsPreloading(true)
    import('@/pages/Work').then(() => {
      setIsPreloading(false)
    }).catch(() => {
      setIsPreloading(false)
    })
  }, [isPreloading])

  const scrollToNextSection = useCallback(() => {
    const workSection = document.getElementById('work')
    if (workSection) {
      const elementTop = workSection.offsetTop
      const offsetPosition = elementTop + SCROLL_OFFSET

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      return
    }

    // Fallback: force scroll to trigger lazy loading
    const heroHeight = window.innerHeight
    const targetPosition = heroHeight + 100

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })

    setTimeout(() => {
      const workSection = document.getElementById('work')
      if (workSection) {
        const elementTop = workSection.offsetTop
        const offsetPosition = elementTop + SCROLL_OFFSET

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          const elementTop = aboutSection.offsetTop
          const offsetPosition = elementTop + SCROLL_OFFSET

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }, 500)
  }, [])

  return (
    <section
      id="hero"
      className="hero-background relative min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile */}
          <div className="block lg:hidden text-center">
            <h1
              id="hero-title"
              className="font-heading font-black text-6xl sm:text-7xl md:text-8xl text-text-primary leading-tight mb-8"
            >
              <span className="block">NORDIC</span>
              <span className="block text-gradient-brand">CODE</span>
              <span className="block">WORKS</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
              Digital experiences with <span className="font-bold text-interactive-primary">Nordic precision</span><br />
              Crafting tomorrow&#39;s web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToWork}
                onMouseEnter={preloadWorkSection}
                variant="primary"
                size="lg"
                fullWidth
                className="sm:w-auto"
              >
                See My Work
              </Button>
              <Button onClick={scrollToContact} variant="secondary" size="lg" fullWidth className="sm:w-auto">
                Start Project
              </Button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1
                id="hero-title"
                className="font-heading font-black text-text-primary leading-none text-left text-7xl xl:text-8xl 2xl:text-9xl"
              >
                <span className="block">NORDIC</span>
                <span className="block text-gradient-brand">CODE</span>
                <span className="block">WORKS</span>
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
              <p className="text-xl lg:text-2xl xl:text-3xl font-medium text-text-secondary leading-relaxed text-left">
                Digital experiences with <span className="font-bold text-interactive-primary">Nordic precision</span><br />
                Crafting tomorrow&#39;s web.
              </p>

              <div className="flex flex-col gap-4">
                <Button
                  onClick={scrollToWork}
                  onMouseEnter={preloadWorkSection}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  See My Work
                </Button>
                <Button onClick={scrollToContact} variant="secondary" size="lg" fullWidth>
                  Start Project
                </Button>
              </div>

              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Available for Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNextSection}
        onMouseEnter={preloadWorkSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-tertiary hover:text-interactive-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-interactive-primary rounded-lg p-2"
        aria-label="Scroll to next section"
        type="button"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </button>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero
