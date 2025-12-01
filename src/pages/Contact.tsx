import { memo, useState, useRef } from 'react'
import { Linkedin, Github, Mail, ArrowUpRight, Copy } from '@/components/icons/index'
import ContactForm from '@/components/common/ContactForm'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocialRow = ({ icon: Icon, title, href, label }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-4 bg-bg-sub border-b border-border-main hover:bg-bg-acc transition-colors duration-200 last:border-b-0"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 bg-bg-main border border-border-sub group-hover:bg-text-main group-hover:text-bg-main transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{label}</div>
        <div className="font-bold text-text-main">{title}</div>
      </div>
    </div>
    <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent transition-colors" />
  </a>
)

const Contact = memo(() => {
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@nordiccodeworks.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-bg-main relative z-10 border-t border-border-main"
      aria-label="Contact Terminal"
    >
      <div className="container mx-auto px-4">
        
        {/* 1. SECTION INTRO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 border-b border-border-main pb-12">
          <div className="lg:col-span-8">
            <div className="font-mono text-xs text-accent mb-4">/// SECTION_04</div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-6">
              Initialize<br />Comms.
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
             <p className="text-text-muted font-mono text-sm leading-relaxed mb-6">
               <span className="text-accent">&gt;</span> STATUS: READY FOR INTAKE<br/>
               <span className="text-accent">&gt;</span> QUEUE: OPEN<br/>
               <span className="text-accent">&gt;</span> REGION: EU_NORTH
             </p>
             <p className="text-lg text-text-main font-medium">
               Ready to discuss architecture? Let&apos;s build something robust.
             </p>
          </div>
        </div>

        {/* 2. MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border-main border border-border-main">
          
          {/* LEFT: FORM TERMINAL */}
          <div className="lg:col-span-8 bg-bg-main p-8 md:p-12 relative overflow-hidden">
             <div className="relative z-10">
               {/* 
                  NOTE: The previous duplicate header "MESSAGE_INPUT / AWAITING_DATA" 
                  was removed from here because it is now inside <ContactForm /> 
                  to ensure single source of truth and perfect accessibility.
               */}
               <ContactForm />
             </div>
          </div>

          {/* RIGHT: INFO SIDEBAR */}
          <div className="lg:col-span-4 flex flex-col h-full bg-bg-sub">
            
            {/* A. DIRECT UPLINK (Socials) */}
            <div className="border-b border-border-main p-8">
              <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">DIRECT_UPLINK</h3>
              <div className="flex flex-col border border-border-main bg-bg-main">
                <SocialRow 
                  icon={Linkedin} 
                  title="LinkedIn" 
                  label="PROFESSIONAL" 
                  href="https://www.linkedin.com/in/mats-gustafsson-a57643103/" 
                />
                <SocialRow 
                  icon={Github} 
                  title="GitHub" 
                  label="REPOSITORY" 
                  href="https://github.com/Moonchichiii" 
                />
                
                {/* Email Copy Block */}
                <button
                  onClick={copyEmail}
                  className="group flex items-center justify-between p-4 bg-bg-sub hover:bg-bg-acc transition-all duration-200 text-left w-full border-t border-border-main"
                  aria-label="Copy email address"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-bg-main border border-border-sub group-hover:bg-text-main group-hover:text-bg-main transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                        {copied ? 'COPIED_TO_CLIPBOARD' : 'EMAIL_PROTOCOL'}
                      </div>
                      <div className="font-bold text-text-main text-sm truncate max-w-[150px]">
                        contact@nordiccodeworks.com
                      </div>
                    </div>
                  </div>
                  <Copy size={18} className="text-text-muted group-hover:text-accent transition-colors" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'
export default Contact