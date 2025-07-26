import React, { memo, useEffect, useRef, useState } from 'react'
import { Code2, Database, Server, Globe, ExternalLink, Download } from '@/components/icons/index'

interface SkillCategoryProps {
  title: string
  skills: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const SkillCategory = memo<SkillCategoryProps>(({ title, skills, icon: Icon }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 w-8 h-8 bg-interactive-primary/10 rounded-lg flex items-center justify-center mt-0.5">
      <Icon size={16} className="text-interactive-primary" aria-hidden="true" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed">{skills}</p>
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
      className="text-lg font-semibold text-text-primary mb-4 border-b border-border-primary pb-2"
    >
      {title}
    </h3>
    {children}
  </div>
))

const QuickFactItem = memo<{
  label: string
  children: React.ReactNode
}>(({ label, children }) => (
  <div className="space-y-1">
    <dt className="font-semibold text-text-primary text-sm">
      {label}
    </dt>
    <dd className="text-text-secondary text-sm leading-relaxed">
      {children}
    </dd>
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
      className="py-16 lg:py-24 bg-bg-secondary"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
         
          <header className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-interactive-primary/30" />
              <span className="text-sm font-medium text-text-tertiary uppercase tracking-wider">
                About Me
              </span>
            </div>
           
            <h2
              id="about-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight tracking-tight font-heading"
            >
              Mats Gustafsson
            </h2>
           
            <div className="max-w-3xl">
              <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed mb-6">
                Full-Stack Developer passionate about building scalable web applications that make a difference.
              </p>
              <p className="text-lg text-text-tertiary leading-relaxed">
                I combine technical expertise with creative problem-solving to deliver solutions that are both powerful and user-friendly.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Quick Facts - Improved Structure */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="card-nordic p-6 lg:p-8 sticky top-8">
                <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-interactive-primary rounded-full" />
                  Quick Facts
                </h3>
                
                <dl className="space-y-4">
                  <QuickFactItem label="Location">
                    <div className="flex items-center gap-2">
                      <span>🇸🇪</span>
                      <span>Sweden</span>
                
                    </div>
                  </QuickFactItem>

                  <QuickFactItem label="Languages">
                    <div className="space-y-1">
                      <div>Swedish (Native)</div>
                      <div>English (Fluent)</div>
                    </div>
                  </QuickFactItem>

                  <QuickFactItem label="Education">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-text-primary">Full Stack Web Developer</div>
                        <div className="text-xs text-text-tertiary">Code Institute • 2024</div>
                      </div>
                      
                      <a 
                        href="https://www.credential.net/4df81dea-06b8-4048-a1a0-f4eb1a00a415#acc.xWtM1N8a"
                        className="inline-flex items-center gap-2 text-interactive-primary hover:text-interactive-hover text-sm font-medium transition-colors duration-200 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        View Certificate
                      </a>
                    </div>
                  </QuickFactItem>

                  <QuickFactItem label="Resume">
                   <a 
  href="/CV_EN.pdf"
  className="btn-nordic-primary btn-enhanced-hover inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full"
  download="Mats_Gustafsson_CV.pdf"
>
  <Download size={16} aria-hidden="true" />
  Download CV
</a>

                  </QuickFactItem>

                  <QuickFactItem label="Status">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
                      <span className="text-status-success font-medium">Open to opportunities</span>
                    </div>
                  </QuickFactItem>
                </dl>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <Section title="My Story" id="profile-section">
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    I&apos;m a passionate full-stack developer who discovered my love for coding through the challenge of creating 
                    something meaningful from nothing but an idea and a blank screen. What started as curiosity about how 
                    websites work has evolved into a career dedicated to crafting digital experiences that matter.
                  </p>
                  <p>
                    I thrive on solving complex problems and take pride in writing clean, maintainable code that stands the test of time. 
                    My approach combines technical rigor with creative thinking to deliver solutions that exceed expectations.
                  </p>
                </div>
              </Section>

              <Section title="Technical Skills" id="skills-section">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skillCategories.map((category) => (
                    <SkillCategory key={category.title} {...category} />
                  ))}
                </div>
              </Section>

              <Section title="What I'm Working On" id="projects-section">
                <div className="space-y-4">
                  <p className="text-text-secondary leading-relaxed">
                    Currently focused on building full-stack applications that showcase modern web development practices. 
                    I&apos;m particularly excited about:
                  </p>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-interactive-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Building performant React applications with TypeScript</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-interactive-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Creating robust Django REST APIs with authentication</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-interactive-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Implementing modern DevOps practices with Docker and CI/CD</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-interactive-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Exploring cutting-edge web technologies and frameworks</span>
                    </li>
                  </ul>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

SkillCategory.displayName = 'SkillCategory'
Section.displayName = 'Section'
QuickFactItem.displayName = 'QuickFactItem'
About.displayName = 'About'

export default About