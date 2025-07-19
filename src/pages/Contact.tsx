import React, { memo, useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, MessageCircle, ArrowRight, Clock, MapPin } from '@/components/icons/index'
import ContactForm from '@/components/common/ContactForm'

interface ContactMethodProps {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  href: string
  buttonText: string
  external?: boolean
  primary?: boolean
}

const ContactMethod = memo<ContactMethodProps>(({
  icon: Icon,
  title,
  description,
  href,
  buttonText,
  external = false,
  primary = false
}) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
        primary
          ? 'bg-slate-900 dark:bg-white'
          : 'bg-slate-100 dark:bg-slate-700'
      }`}>
        <Icon
          size={20}
          className={primary ? 'text-white dark:text-slate-900' : 'text-slate-600 dark:text-slate-400'}
          aria-hidden="true"
        />
      </div>
     
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          {description}
        </p>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
            primary
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
          aria-label={external ? `${buttonText} (opens in new tab)` : buttonText}
        >
          <span>{buttonText}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "The best way to reach me for project opportunities, collaboration ideas, or just to say hello.",
      href: "mailto:contact@nordiccodeworks.com",
      buttonText: "Send Email",
      external: false,
      primary: true
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Connect with me professionally to see my career journey, recommendations, and industry insights.",
      href: "https://www.linkedin.com/in/mats-gustafsson-a57643103/",
      buttonText: "Connect",
      external: true,
      primary: false
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Explore my code, discover my projects, and see my contributions to the developer community.",
      href: "https://github.com/Moonchichiii",
      buttonText: "Follow",
      external: true,
      primary: false
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 lg:py-24 bg-white dark:bg-slate-800"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <header className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-px bg-slate-300 dark:bg-slate-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Get In Touch
              </span>
              <div className="w-8 h-px bg-slate-300 dark:bg-slate-600" />
            </div>
           
            <h2
              id="contact-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
            >
              Let&apos;s build something great
            </h2>
           
            <div className="max-w-3xl mx-auto">
              <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                I&apos;m always excited to discuss new opportunities, interesting projects, or potential collaborations.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether you have a specific project in mind, need technical consultation, or just want to connect 
                with a fellow developer, I&apos;d love to hear from you.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => (
              <ContactMethod key={method.title} {...method} />
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="mb-16">
            <ContactForm />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageCircle size={20} className="text-slate-600 dark:text-slate-400" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  What to expect
                </h2>
              </div>
             
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium text-slate-900 dark:text-white mb-1">Quick Response</p>
                    <p className="text-slate-600 dark:text-slate-400">I aim to respond within 24 hours, usually much sooner</p>
                  </div>
                </div>
               
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div className="text-left">
                    <p className="font-medium text-slate-900 dark:text-white mb-1">Location & Availability</p>
                    <p className="text-slate-600 dark:text-slate-400">Based in Sweden, open to remote opportunities worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

ContactMethod.displayName = 'ContactMethod'
Contact.displayName = 'Contact'

export default Contact