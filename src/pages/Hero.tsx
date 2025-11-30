import { memo, useCallback, useState, useEffect } from 'react'
import { ArrowDown, Globe } from '@/components/icons/index'

const Hero = memo(() => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-SE', { 
        timeZone: 'Europe/Stockholm', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToAbout = useCallback(() => {
    const el = document.getElementById('about')
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col pt-32 pb-12 overflow-hidden bg-bg-main"
    >
      {/* HERO CONTENT */}
      <div className="relative z-10 container mx-auto px-4 flex-grow flex flex-col justify-center">
        
        {/* TOP TAGS */}
        <div className="flex justify-between items-end mb-12 border-b border-border-main pb-4">
          <div className="font-mono text-xs text-text-muted uppercase tracking-widest">
            folio_v2.5 // 2025
          </div>
          <div className="font-mono text-xs text-text-main flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            AVAILABLE FOR WORK
          </div>
        </div>

        {/* MASSIVE HEADLINE - CLEANER & SHARPER */}
        <h1 className="flex flex-col font-heading font-bold tracking-tighter leading-[0.8] select-none uppercase">
          {/* NORDIC (Left) */}
          <span className="text-[15vw] lg:text-[13rem] text-text-strong block">
            NORDIC
          </span>
          
          {/* CODE (Indented) */}
          <span className="text-[15vw] lg:text-[13rem] text-text-muted block ml-[12vw] hover:text-text-strong transition-colors duration-500">
            CODE
          </span>
          
          {/* WORKS (Right) */}
          <span className="text-[15vw] lg:text-[13rem] text-text-strong block text-right">
            WORKS
          </span>
        </h1>

        {/* SUB TEXT & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20 pt-8 border-t border-border-main">
          <div className="md:col-span-5">
            <p className="text-xl md:text-2xl text-text-muted font-body font-normal leading-tight text-balance">
              Mats Gustafsson. Full-Stack Developer creating high-performance digital systems with industrial precision.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col md:flex-row items-start md:items-center justify-end gap-6">
            <button
              onClick={scrollToAbout}
              className="group relative overflow-hidden bg-text-strong text-bg-main px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors duration-300 w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center gap-3">
                EXPLORE INDEX <ArrowDown size={16} />
              </span>
            </button>
            <div className="font-mono text-[10px] text-text-muted hidden md:block tracking-widest uppercase">
              Scroll to initialize
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER HUD */}
      <div className="absolute bottom-0 left-0 w-full border-t border-border-main bg-bg-main">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center font-mono text-[10px] text-text-muted tracking-widest uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Globe size={12} /> STOCKHOLM, SE
            </span>
            <span>{time} CET</span>
          </div>
          <div className="flex gap-6">
             <span>LAT: 59.3293° N</span>
             <span className="hidden sm:block">LNG: 18.0686° E</span>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero