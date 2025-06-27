import { memo, useEffect, useState, useRef } from 'react'
import { ExternalLink, Github, Loader2, AlertCircle, Code2 } from 'lucide-react'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  fork: boolean
}

interface ProjectCardProps {
  repo: Repo
  index: number
}

const ProjectCard = memo<ProjectCardProps>(({ repo, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  // Clean up repository name for display
  const displayName = repo.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <article
      ref={cardRef}
      className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-labelledby={`project-${repo.id}-title`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <Code2 size={18} className="text-slate-600 dark:text-slate-400" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            id={`project-${repo.id}-title`}
            className="text-lg font-semibold text-slate-900 dark:text-white mb-2 leading-tight"
          >
            {displayName}
          </h3>
          {repo.description && (
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              {repo.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex gap-3">
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label={`View live demo of ${displayName} (opens in new tab)`}
          >
            <ExternalLink size={16} aria-hidden="true" />
            <span>Live Demo</span>
          </a>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          aria-label={`View source code of ${displayName} on GitHub (opens in new tab)`}
        >
          <Github size={16} aria-hidden="true" />
          <span>Source</span>
        </a>
      </div>
    </article>
  )
})

const LoadingState = memo(() => (
  <div className="text-center py-12">
    <div className="flex items-center justify-center gap-3 mb-4">
      <Loader2 size={20} className="animate-spin text-slate-600 dark:text-slate-400" aria-hidden="true" />
      <span className="text-slate-600 dark:text-slate-400">Loading projects...</span>
    </div>
    <p className="text-sm text-slate-500 dark:text-slate-500">
      Fetching latest projects from GitHub
    </p>
  </div>
))

const ErrorState = memo<{ error: string }>(({ error }) => (
  <div className="text-center py-12">
    <div className="flex items-center justify-center gap-3 mb-4">
      <AlertCircle size={20} className="text-red-500" aria-hidden="true" />
      <span className="text-slate-900 dark:text-white font-medium">Unable to load projects</span>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
      {error}
    </p>
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
    >
      Try Again
    </button>
  </div>
))

const EmptyState = memo(() => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
      <Code2 size={24} className="text-slate-600 dark:text-slate-400" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
      Projects coming soon
    </h3>
    <p className="text-slate-600 dark:text-slate-400">
      Currently working on new projects to showcase here.
    </p>
  </div>
))

const Work = memo(() => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Moonchichiii/repos?per_page=100')
        if (!res.ok) {
          throw new Error(`Failed to fetch repositories (${res.status})`)
        }
        const data: Repo[] = await res.json()
        const deployed = data
          .filter(r => !r.fork && r.homepage)
          .sort((a, b) => a.name.localeCompare(b.name))
        setRepos(deployed)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section
      id="work"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900"
      aria-labelledby="work-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <header 
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-slate-300 dark:bg-slate-600" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          
          <h1 
            id="work-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight"
            style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
          >
            Featured Projects
          </h1>
          
          <div className="max-w-3xl">
            <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              A selection of web applications I&apos;ve built and deployed, showcasing different technologies and approaches.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Each project represents a learning opportunity and demonstrates my commitment to writing clean, maintainable code.
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="min-h-[400px]">
          {loading && <LoadingState />}
          {error && <ErrorState error={error} />}
          {!loading && !error && repos.length === 0 && <EmptyState />}
          {!loading && !error && repos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <ProjectCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        {!loading && !error && repos.length > 0 && (
          <div className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              More projects available on{' '}
              <a 
                href="https://github.com/Moonchichiii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-slate-900 dark:text-white hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        )}

      </div>
    </section>
  )
})

ProjectCard.displayName = 'ProjectCard'
LoadingState.displayName = 'LoadingState'
ErrorState.displayName = 'ErrorState'
EmptyState.displayName = 'EmptyState'
Work.displayName = 'Work'

export default Work