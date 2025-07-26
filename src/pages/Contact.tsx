import React, { memo, useEffect, useRef, useState } from 'react'
import { Linkedin, Github, MessageCircle, Clock, MapPin } from '@/components/icons/index'
import ContactForm from '@/components/common/ContactForm'

interface SocialLinkProps {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  href: string
  description: string
}

const SocialLink = memo<SocialLinkProps>(({ icon: Icon, title, href, description }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center text-center p-6 hover:bg-bg-elevated rounded-2xl transition-all duration-300 hover:scale-105"
    aria-label={`${title} (opens in new tab)`}
  >
    <div className="w-16 h-16 bg-gradient-to-br from-interactive-primary/10 to-accent-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:from-interactive-primary group-hover:to-accent-primary group-hover:scale-110 transition-all duration-300">
      <Icon 
        size={32} 
        className="text-interactive-primary group-hover:text-text-inverse transition-colors duration-300" 
        aria-hidden="true" 
      />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-interactive-primary transition-colors duration-300">
      {title}
    </h3>
    <p className="text-text-secondary text-sm group-hover:text-text-primary transition-colors duration-300">
      {description}
    </p>
  </a>
))

const Contact = memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/mats-gustafsson-a57643103/",
      description: "Let's connect professionally"
    },
    {
      icon: Github,
      title: "GitHub",
      href: "https://github.com/Moonchichiii",
      description: "Explore my open source work"
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 lg:py-24 bg-bg-secondary"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header */}
          <header className="text-center mb-16">
            <h2
              id="contact-title"
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-text-primary mb-8 tracking-tight"
            >
              Let&#39;s build something{' '}              
            </h2>
           
            <div className="max-w-3xl mx-auto">
              <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed mb-6">
                Ready to discuss your next project or explore new opportunities?
              </p>
            </div>
          </header>

          {/* Contact Form */}
          <div className="mb-16">
            <ContactForm />
          </div>

          {/* Social Links */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Or connect with me on
              </h3>
              <p className="text-text-secondary">
                Follow my journey and see what I&#39;m working on
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
              {socialLinks.map((link) => (
                <SocialLink key={link.title} {...link} />
              ))}
            </div>
          </div>

          {/* What to Expect */}
          <div className=" rounded-3xl p-8 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-interactive-primary/5 via-transparent to-accent-primary/5" />
            
            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-interactive-primary/10 to-accent-primary/10 rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} className="text-interactive-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  What to expect
                </h3>
              </div>
             
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-status-success/10 to-status-success/20 rounded-xl flex items-center justify-center mb-3">
                    <Clock size={20} className="text-status-success" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Quick Response</h4>
                  <p className="text-text-secondary text-sm">Usually within 24 hours, often much sooner</p>
                </div>
               
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-status-info/10 to-status-info/20 rounded-xl flex items-center justify-center mb-3">
                    <MapPin size={20} className="text-status-info" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2">Global Availability</h4>
                  <p className="text-text-secondary text-sm">Based in Sweden, open to remote work worldwide</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

SocialLink.displayName = 'SocialLink'
Contact.displayName = 'Contact'

export default Contact