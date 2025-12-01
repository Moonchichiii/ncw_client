import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Github, ArrowRight } from '@/components/icons/index'
import CloudinaryImg from '@/components/common/CloudinaryImg'

const PROJECTS = [
  {
    id: '01',
    title: 'SANDLÅDAN SYSTEM',
    description: 'High-performance SSR application. Demonstrates modern Python web capabilities with zero client-side hydration overhead.',
    tech: ['FastAPI', 'HTMX', 'Python', 'Render'],
    image: 'ncw/ya1d5ehu45r3rdokwm1i',
    status: 'LIVE_SYSTEM', 
    links: { demo: 'https://sandladanab.onrender.com/', repo: 'https://github.com/Moonchichiii' }
  },
  {
    id: '02',
    title: 'LASERENITY.FR',
    description: 'Decoupled architecture. Backend containerized on Fly.io with Redis caching. Frontend delivered via Cloudflare Pages.',
    tech: ['Django', 'Wagtail', 'Fly.io', 'Redis'],
    image: 'ncw/bkedaqkgjsyw4ldxntp5',
    status: 'COMMERCIAL_DEPLOY',
    links: { demo: 'https://laserenity.fr', repo: null }
  },
  {
    id: '03',
    title: 'PORTFOLIO SYSTEM V2',
    description: 'Current interface. Strict industrial aesthetic utilizing high-contrast typography and CSS variables.',
    tech: ['React 19', 'Tailwind v4', 'Vite'],
    image: 'ncw/portfolio',
    status: 'DEPLOYED',
    links: { demo: 'https://nordiccodeworks.com', repo: 'https://github.com/Moonchichiii/ncw_client' }
  },
  {
    id: '04',
    title: 'BATTLESHIP ENGINE',
    description: 'Logic-heavy implementation of the classic strategy game. Features CPU opponent logic and state management.',
    tech: ['React', 'Game Logic', 'Jest'],
    image: 'ncw/battleship', 
    status: 'PROTOTYPE_ALPHA',
    links: { demo: 'https://moonchichiii.github.io/battleship-project3/', repo: 'https://github.com/Moonchichiii/battleship-project3' }
  }
]

/* --- CARD COMPONENT --- */
const ProjectCard = memo<{ project: typeof PROJECTS[0]; index: number }>(({ project, index }) => {
  const projectId = `LOG_${(index + 1).toString().padStart(3, '0')}`
  
  return (
    <article className="group relative flex-none w-[85vw] md:w-[600px] h-full bg-bg-sub border-r border-border-main last:border-r-0 flex flex-col snap-start select-none">
      <div className="relative aspect-video w-full border-b border-border-main bg-bg-acc overflow-hidden">
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4=')]" />
        
        <div className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105 pointer-events-none">
          <CloudinaryImg 
            publicId={project.image}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <div className="bg-bg-main/90 border border-border-main px-2 py-1 font-mono text-[10px] text-text-main uppercase tracking-widest backdrop-blur-sm">
            {project.status}
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
             <span className="w-1.5 h-1.5 bg-accent rounded-none" />
             <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
               {projectId}
             </span>
          </div>
          
          <h3 className="text-3xl font-bold text-text-main mb-4 leading-none tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          
          <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span key={t} className="px-2 py-1 bg-bg-main border border-border-main text-[10px] font-mono text-text-muted uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-6 pt-6 border-t border-border-main">
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-bold text-text-main hover:text-accent transition-colors uppercase tracking-widest font-mono pointer-events-auto">
              LIVE_DEMO <ArrowRight size={12} className="-rotate-45" /> 
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-bold text-text-muted hover:text-text-main transition-colors uppercase tracking-widest font-mono pointer-events-auto">
              SOURCE_CODE <Github size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
})

const WorkHeader = memo<{ isVisible: boolean; headerRef: React.RefObject<HTMLDivElement | null> }>(
  ({ isVisible, headerRef }) => (
    <div 
      ref={headerRef}
      className={`container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div>
         <div className="font-mono text-xs text-accent mb-4">/// SECTION_03</div>
         <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-text-strong">
          Project<br/>Index
        </h2>
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-xl text-text-muted leading-relaxed max-w-lg font-medium border-l border-border-main pl-6">
          <span className="text-text-main">Deployment Log.</span> Horizontal scrolling interface. 
          <span className="hidden lg:inline"> Scroll down to navigate.</span>
          <span className="lg:hidden"> Drag to navigate.</span>
        </p>
      </div>
    </div>
  )
)

const Work = memo(() => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement | null>(null)
  
  // LOGIC FOR DESKTOP PINNED SCROLL
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackHeight, setTrackHeight] = useState(0)

  // LOGIC FOR MOBILE DRAG SCROLL
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // 1. INTERSECTION OBSERVER FOR HEADER
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) {setIsHeaderVisible(true)} },
      { threshold: 0.1 }
    )
    if (headerRef.current) {observer.observe(headerRef.current)}
    return () => observer.disconnect()
  }, [])

  // 2. DESKTOP SCROLL CALCULATION
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !trackRef.current || window.innerWidth < 1024) {return}

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = rect.top
    // Only animate if the section is currently passing through the viewport logic
    // We transform based on how far down we've scrolled into the container
    const offset = Math.max(0, -sectionTop)
    const trackWidth = trackRef.current.scrollWidth
    const viewportWidth = window.innerWidth
    const maxScroll = trackWidth - viewportWidth

    // Clamp the translation
    const x = Math.min(offset, maxScroll)
    trackRef.current.style.transform = `translateX(-${x}px)`
  }, [])

  // 3. INIT DESKTOP HEIGHT & LISTENERS
  useEffect(() => {
    const initTrack = () => {
      if (!trackRef.current) {return}
      
      if (window.innerWidth >= 1024) {
        // Desktop: Calculate how tall the section needs to be to fit the horizontal scroll
        const trackWidth = trackRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        // Height = horizontal scroll distance + viewport buffer
        setTrackHeight(trackWidth - viewportWidth + window.innerHeight)
      } else {
        // Mobile: Reset to auto
        setTrackHeight(0)
        trackRef.current.style.transform = 'translateX(0px)'
      }
    }

    initTrack()
    window.addEventListener('resize', initTrack)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', initTrack)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  /* --- MOBILE DRAG HANDLERS --- */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) {return}
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }, [])

  const handleMouseLeave = useCallback(() => {setIsDragging(false)}, [])
  const handleMouseUp = useCallback(() => {setIsDragging(false)}, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) {return}
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft])

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="bg-bg-main relative z-10 border-t border-border-main"
      style={{ height: trackHeight > 0 ? `${trackHeight}px` : 'auto' }} // Dynamic height for desktop
    >
      {/* 
        CONTAINER WRAPPER
        Desktop: 'sticky top-0' pins it while we scroll the parent height
        Mobile: normal static flow
      */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden py-24 flex flex-col justify-center">
        
        <WorkHeader isVisible={isHeaderVisible} headerRef={headerRef} />

        {/* 
           TRACK WRAPPER
           Desktop: Uses 'ref={trackRef}' and translateX via JS
           Mobile: Uses 'ref={scrollContainerRef}' and overflow-x-auto
        */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div 
          ref={window.innerWidth >= 1024 ? null : scrollContainerRef} // Ref swap based on logic handled via CSS/JS separation mostly
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`
            w-full hide-scrollbar
            /* Desktop Styles */
            lg:overflow-visible
            /* Mobile Styles */
            overflow-x-auto pb-8 cursor-grab active:cursor-grabbing snap-x snap-mandatory focus:outline-none
          `}
          role="region" 
          aria-label="Project Gallery Horizontal Scroll"
          /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
          tabIndex={0}
        >
          <div 
            ref={trackRef} // Used for calculation on desktop
            className="flex w-max border-y border-border-main transition-transform duration-75 ease-linear will-change-transform"
          >
            <div className="w-4 md:w-[max(1rem,calc((100vw-1280px)/2))]" /> 
            
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}

            <div className="w-4 md:w-[max(1rem,calc((100vw-1280px)/2))]" />
          </div>
        </div>
      </div>
    </section>
  )
})

ProjectCard.displayName = 'ProjectCard'
WorkHeader.displayName = 'WorkHeader'
Work.displayName = 'Work'

export default Work