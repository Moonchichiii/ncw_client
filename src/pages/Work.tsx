import { memo, useEffect, useState, useRef } from 'react'
import { ExternalLink, Github, ArrowUpRight } from '@/components/icons/index'
import CloudinaryImg from '@/components/common/CloudinaryImg'

const PROJECTS = [
  {
    id: '01',
    title: 'SANDLÅDAN SYSTEM',
    description: 'A high-performance full-stack application leveraging Server-Side Rendering. Demonstrates modern Python web capabilities with zero client-side hydration overhead.',
    tech: ['FastAPI', 'HTMX', 'Python', 'Jinja2', 'Render'],
    image: 'ncw/ya1d5ehu45r3rdokwm1i',
    status: 'LIVE_SYSTEM', 
    links: {
      demo: 'https://sandladanab.onrender.com/',
      repo: 'https://github.com/Moonchichiii' 
    }
  },
  {
    id: '02',
    title: 'LASERENITY.FR',
    description: 'Commercial platform with a decoupled architecture. Backend containerized (Docker) on Fly.io with Upstash Redis for caching. Frontend delivered via Cloudflare Pages. Media assets optimized and served through Cloudinary.',
    tech: ['Django/Wagtail', 'Fly.io', 'Cloudflare Pages', 'Upstash Redis', 'Cloudinary'],
    image: 'ncw/bkedaqkgjsyw4ldxntp5',
    status: 'COMMERCIAL_DEPLOYMENT',
    links: {
      demo: 'https://laserenity.fr',
      repo: null 
    }
  },
  {
    id: '03',
    title: 'PORTFOLIO SYSTEM V2',
    description: 'The current interface. Designed with a strict industrial aesthetic, utilizing high-contrast typography and strict grid layouts.',
    tech: ['React', 'Tailwind v4', 'Framer Motion'],
    image: 'ncw/portfolio',
    status: 'DEPLOYED',
    links: {
      demo: 'https://nordiccodeworks.com',
      repo: 'https://github.com/Moonchichiii/ncw_client'
    }
  },
  {
    id: '04',
    title: 'BATTLESHIP ENGINE',
    description: 'A logic-heavy implementation of the classic strategy game. Features CPU opponent logic, state management, and drag-and-drop mechanics.',
    tech: ['React', 'Game Logic', 'Jest', 'Tailwind'],
    image: 'ncw/battleship', 
    status: 'PROTOTYPE_ALPHA',
    links: {
      demo: 'https://moonchichiii.github.io/battleship-project3/',
      repo: 'https://github.com/Moonchichiii/battleship-project3'
    }
  }
]

/* --- COMPONENTS --- */

const ProjectCard = memo<{ project: typeof PROJECTS[0]; index: number }>(({ project, index }) => {
  const projectId = `LOG_${(index + 1).toString().padStart(3, '0')}`
  
  return (
    <article className="group flex flex-col h-full bg-bg-sub hover:bg-bg-acc transition-colors duration-300 relative">
      
      {/* 1. IMAGE CONTAINER (The Monitor) */}
      <div className="relative w-full aspect-video border-b border-border-main overflow-hidden bg-bg-acc">
        {/* Overlay Grid Pattern */}
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4=')]" />
        
        <div className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105">
          <CloudinaryImg 
            publicId={project.image}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-bg-main/90 border border-border-main px-2 py-1 font-mono text-[10px] text-text-main uppercase tracking-widest backdrop-blur-sm">
            {project.status}
          </div>
        </div>
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
           <div className="flex items-center gap-3">
             <span className="w-1.5 h-1.5 bg-accent rounded-none" />
             <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
               {projectId}
             </span>
           </div>
        </div>
        
        <h3 className="text-xl font-bold text-text-main mb-4 leading-none tracking-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <p className="text-text-muted text-sm leading-relaxed mb-6 font-medium line-clamp-4">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 bg-bg-main border border-border-dim text-[10px] font-mono text-text-muted uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="pt-6 border-t border-border-dim flex items-center justify-between">
          <div className="flex gap-6">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-bold text-text-main hover:text-accent transition-colors uppercase tracking-widest font-mono"
              >
                LIVE_DEMO <ExternalLink size={12} /> 
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] font-bold text-text-muted hover:text-text-main transition-colors uppercase tracking-widest font-mono"
              >
                SOURCE <Github size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
})

/* FIX: Changed headerRef type to HTMLDivElement for strict compatibility with <div ref={...}> */
const WorkHeader = memo<{ isVisible: boolean; headerRef: React.RefObject<HTMLDivElement | null> }>(
  ({ isVisible, headerRef }) => (
    <div 
      ref={headerRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 border-b border-border-main pb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div>
         <div className="font-mono text-xs text-accent mb-4">/// SECTION_03</div>
         <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-text-strong">
          PROJECT<br/>INDEX
        </h2>
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-xl text-text-muted leading-relaxed max-w-lg font-medium border-l border-border-main pl-6">
          <span className="text-text-main">Deployment Log.</span> A curated index of production-grade systems and experimental interfaces.
        </p>
      </div>
    </div>
  )
)

const useHeaderVisibility = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  /* FIX: Changed useRef type to HTMLDivElement */
  const headerRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) {setIsHeaderVisible(true)} },
      { threshold: 0.1, rootMargin: '50px' }
    )
    if (headerRef.current) {observer.observe(headerRef.current)}
    return () => observer.disconnect()
  }, [])
  return { isHeaderVisible, headerRef }
}

const Work = memo(() => {
  const { isHeaderVisible, headerRef } = useHeaderVisibility()

  return (
    <section id="work" className="py-24 bg-bg-main relative z-10 border-t border-border-main">
      <div className="container mx-auto px-4">
        <WorkHeader isVisible={isHeaderVisible} headerRef={headerRef} />
        
        {/* THE GRID: 1px gap for grid lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-main border border-border-main mb-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-end pt-6 border-t border-border-main">
          <a
            href="https://github.com/Moonchichiii"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-xs text-text-muted hover:text-text-main transition-colors uppercase tracking-widest"
          >
            FULL_REPOSITORY_ACCESS <ArrowUpRight size={16} className="text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
})

ProjectCard.displayName = 'ProjectCard'
WorkHeader.displayName = 'WorkHeader'
Work.displayName = 'Work'

export default Work