import React, { memo, useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, Code2, Database, Server, Globe } from '@/components/icons/index'

interface ContactLinkProps {
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  text: string
  external?: boolean
}

const ContactLink = memo<ContactLinkProps>(({ href, icon: Icon, label, text, external = false }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
    aria-label={external ? `${label} (opens in new tab)` : label}
  >
    <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
      <Icon size={16} className="text-slate-600 dark:text-slate-400" aria-hidden="true" />
    </div>
    <span className="text-slate-700 dark:text-slate-300 font-medium">{text}</span>
  </a>
))

interface SkillCategoryProps {
  title: string
  skills: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const SkillCategory = memo<SkillCategoryProps>(({ title, skills, icon: Icon }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mt-0.5">
      <Icon size={16} className="text-slate-600 dark:text-slate-400" aria-hidden="true" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{skills}</p>
    </div>
  </div>
))

interface SectionProps {
  title: string
  children: React.ReactNode
  id?: string
}

const Section = memo<SectionProps>(({ title, children, id }) => (
  <div className="mb-8">
    <h3
      id={id}
      className="text-lg font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2"
    >
      {title}
    </h3>
    {children}
  </div>
))

const About = memo(() => {
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

  const contactLinks = [
    {
      href: "mailto:contact@nordiccodeworks.com",
      icon: Mail,
      label: "Email Mats",
      text: "contact@nordiccodeworks.com",
      external: false
    },
    {
      href: "https://linkedin.com/in/mats-gustafsson",
      icon: Linkedin,
      label: "LinkedIn profile",
      text: "linkedin.com/in/mats-gustafsson",
      external: true
    },
    {
      href: "https://github.com/Moonchichiii",
      icon: Github,
      label: "GitHub profile",
      text: "github.com/Moonchichiii",
      external: true
    }
  ]

  const skillCategories = [
    {
      title: "Frontend",
      skills: "React, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS",
      icon: Code2
    },
    {
      title: "Backend",
      skills: "Python, Django, REST APIs, Node.js",
      icon: Server
    },
    {
      title: "Databases",
      skills: "PostgreSQL, Redis, MongoDB",
      icon: Database
    },
    {
      title: "DevOps & Tools",
      skills: "Docker, Git/GitHub, CI/CD, AWS, Vercel",
      icon: Globe
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
         
          <header className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-slate-300 dark:bg-slate-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                About Me
              </span>
            </div>
           
            <h2
              id="about-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
            >
              Mats Gustafsson
            </h2>
           
            <div className="max-w-3xl">
              <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Full-Stack Developer passionate about building scalable web applications that make a difference.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I combine technical expertise with creative problem-solving to deliver solutions that are both powerful and user-friendly.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 mb-8">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Let&#39;s connect
                </h2>
                <div className="space-y-2">
                  {contactLinks.map((link) => (
                    <ContactLink key={link.href} {...link} />
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Quick Facts
                </h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">Location:</span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">Sweden (Remote Ready)</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">Languages:</span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">Swedish (Native), English (Fluent)</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">Education:</span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">Full Stack Web Developer, Code Institute (2024)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <Section title="My Story" id="profile-section">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  I&#39;m a passionate full-stack developer who discovered my love for coding through the challenge of creating 
                  something meaningful from nothing but an idea and a blank screen. What started as curiosity about how 
                  websites work has evolved into a career dedicated to crafting digital experiences that matter.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  I thrive on solving complex problems and take pride in writing clean, maintainable code that stands the test of time. 
                  My approach combines technical rigor with creative thinking to deliver solutions that exceed expectations.
                </p>
              </Section>

              <Section title="Technical Skills" id="skills-section">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skillCategories.map((category) => (
                    <SkillCategory key={category.title} {...category} />
                  ))}
                </div>
              </Section>

              <Section title="What I'm Working On" id="projects-section">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Currently focused on building full-stack applications that showcase modern web development practices. 
                  I&#39;m particularly excited about:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                  <li>Building performant React applications with TypeScript</li>
                  <li>Creating robust Django REST APIs with authentication</li>
                  <li>Implementing modern DevOps practices with Docker and CI/CD</li>
                  <li>Exploring cutting-edge web technologies and frameworks</li>
                </ul>
              </Section>

              <Section title="Beyond Code" id="experience-section">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    When I&#39;m not coding, you&#39;ll find me exploring Sweden&#39;s beautiful nature, staying up-to-date with 
                    the latest tech trends, or contributing to open source projects. I believe the best developers 
                    are lifelong learners, and I&#39;m always eager to tackle new challenges and grow my expertise.
                  </p>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

ContactLink.displayName = 'ContactLink'
SkillCategory.displayName = 'SkillCategory'
Section.displayName = 'Section'
About.displayName = 'About'

export default About