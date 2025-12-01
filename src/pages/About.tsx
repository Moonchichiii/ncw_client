import { memo, type ReactNode, type ComponentType, type SVGProps } from 'react'
import { Code2, Server, Globe, Download, ArrowRight } from '@/components/icons/index'

// 1. Define the type for your custom icons
type CustomIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

interface SpecCardProps {
  title: string
  children: ReactNode
  className?: string
  icon?: CustomIcon
}

/* INDUSTRIAL CARD COMPONENT */
const SpecCard = ({ title, children, className, icon: Icon }: SpecCardProps) => (
  <div className={`industrial-card p-8 flex flex-col justify-between h-full ${className}`}>
    <div className="flex justify-between items-start mb-6">
      <h3 className="font-mono text-xs text-text-main opacity-60 uppercase tracking-widest border-b border-border-main pb-2 w-full">
        {title}
      </h3>
      {Icon && <div className="ml-4"><Icon size={18} className="text-text-muted" /></div>}
    </div>
    <div>{children}</div>
  </div>
)

const About = memo(() => {
  return (
    <section id="about" className="py-24 bg-bg-main relative z-10 border-t border-border-main">
      <div className="container mx-auto px-4">
        
        {/* 1. SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 border-b border-border-main pb-12">
          <div>
             <div className="font-mono text-xs text-accent mb-4">/// SECTION_02</div>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase text-text-strong">
              System<br/>Overview
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xl text-text-muted leading-relaxed max-w-lg font-medium">
              <span className="text-text-main font-bold">Web development as engineering.</span> I build scalable, type-safe, and high-performance applications designed to endure.
            </p>
          </div>
        </div>

        {/* 2. THE GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border-main border border-border-main">
          
          {/* A. BIO MODULE (Double Width) */}
          <div className="md:col-span-2 industrial-card p-8 bg-bg-sub relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code2 size={120} />
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="mb-8">
                <div className="font-mono text-xs text-text-muted mb-4">OPERATOR_ID: MG-2025</div>
                <h3 className="text-4xl font-bold mb-2 text-text-main">Mats Gustafsson</h3>
                <p className="font-mono text-sm text-accent">FULL_STACK_DEVELOPER</p>
              </div>
              
              <div className="space-y-6">
                <p className="text-text-muted text-lg leading-relaxed max-w-md">
                   Graduate of Code Institute (2024). Focused on removing friction between user intent and system response. Based in Stockholm, accessible globally.
                </p>
                
                <a 
                  href="/CV_EN.pdf"
                  className="inline-flex items-center gap-4 text-text-main font-bold group/link mt-4"
                >
                  <span className="border-b border-text-main pb-1 group-hover/link:text-accent group-hover/link:border-accent transition-colors">
                    DOWNLOAD_RESUME.PDF
                  </span>
                  <Download size={16} className="group-hover/link:text-accent transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* B. TECH STACK (Frontend) */}
          <SpecCard title="FRONTEND_ARCH" icon={Globe} className="bg-bg-main">
             <ul className="space-y-3 mt-2">
               {['React.js', 'TypeScript', 'HTMX', 'Tailwind CSS', 'Framer Motion'].map(item => (
                 <li key={item} className="flex items-center justify-between text-sm font-medium border-b border-border-main py-2 last:border-0 group">
                   <span className="text-text-main">{item}</span>
                   <span className="w-1.5 h-1.5 bg-border-main rounded-none group-hover:bg-accent transition-colors" />
                 </li>
               ))}
             </ul>
          </SpecCard>

          {/* C. TECH STACK (Backend) */}
          <SpecCard title="BACKEND_OPS" icon={Server} className="bg-bg-main">
             <ul className="space-y-3 mt-2">
               {['Python', 'FastAPI', 'Django REST', 'Node.js', 'Docker'].map(item => (
                 <li key={item} className="flex items-center justify-between text-sm font-medium border-b border-border-main py-2 last:border-0 group">
                   <span className="text-text-main">{item}</span>
                   <span className="w-1.5 h-1.5 bg-border-main rounded-none group-hover:bg-accent transition-colors" />
                 </li>
               ))}
             </ul>
          </SpecCard>

          {/* D. METRICS ROW (Span Full Width) */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-px bg-border-main">
             <div className="industrial-card p-6 text-center bg-bg-sub hover:bg-bg-acc transition-colors">
               <div className="text-5xl font-black text-text-main tracking-tighter">100</div>
               <div className="font-mono text-[10px] text-text-main opacity-70 mt-2 uppercase tracking-widest">LIGHTHOUSE_SCORE</div>
             </div>
             
             <div className="industrial-card p-6 text-center bg-bg-sub hover:bg-bg-acc transition-colors">
               <div className="text-5xl font-black text-text-main tracking-tighter">&lt;0.1s</div>
               <div className="font-mono text-[10px] text-text-main opacity-70 mt-2 uppercase tracking-widest">CLS_SHIFT</div>
             </div>
             
             <div className="industrial-card p-6 text-center bg-bg-sub hover:bg-bg-acc transition-colors">
               <div className="text-5xl font-black text-text-main tracking-tighter">A+</div>
               <div className="font-mono text-[10px] text-text-main opacity-70 mt-2 uppercase tracking-widest">ACCESSIBILITY</div>
             </div>
                          
             <div className="industrial-card p-6 text-center !bg-[#0044cc] !border-[#0044cc] text-white flex flex-col items-center justify-center group cursor-default">
               <div className="text-3xl font-black tracking-tight flex items-center gap-2 group-hover:scale-110 transition-transform text-white">
                 OPEN TO WORK <ArrowRight size={24} className="-rotate-45" />
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
export default About