import { memo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import Button from '@/components/Button'

const Hero = memo(() => {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current || !buttonsRef.current) {
      return
    }

    const tl = gsap.timeline()

    gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
      opacity: 0,
      y: 60,
    })

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [])

  const scrollToWork = () => {
    const element = document.getElementById('work')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary transition-colors duration-300"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-brand-500/20 to-accent-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-accent-500/20 to-brand-500/20 rounded-full blur-3xl animate-float [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          <h1
            ref={titleRef}
            id="hero-title"
            className="font-heading text-hero font-black tracking-tighter mb-6 text-text-primary transition-colors duration-300"
          >
            <span className="block">NORDIC</span>
            <span className="block bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              CODE
            </span>
            <span className="block">WORKS</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-fluid-xl font-medium text-text-secondary leading-relaxed max-w-3xl mx-auto mb-12 transition-colors duration-300"
          >
            Digital experiences with{' '}
            <span className="font-bold text-interactive-primary">Nordic precision</span>
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button
              onClick={scrollToWork}
              variant="primary"
              size="md"
              aria-describedby="cta-work-desc"
              className="bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 hover:shadow-2xl hover:shadow-brand-500/25"
            >
              See Our Work
            </Button>

            <Button
              onClick={scrollToContact}
              variant="secondary"
              size="md"
              aria-describedby="cta-contact-desc"
            >
              Start Project
            </Button>
          </div>

          <span id="cta-work-desc" className="sr-only">
            Navigate to our work portfolio section
          </span>
          <span id="cta-contact-desc" className="sr-only">
            Navigate to contact section to start a new project
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-text-tertiary rounded-full flex justify-center transition-colors duration-300">
          <ArrowDown size={16} className="text-text-tertiary mt-2 transition-colors duration-300" />
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero