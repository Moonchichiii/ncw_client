import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { ExternalLink, Github, Loader2, AlertCircle, Code2 } from '@/components/icons/index'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  fork: boolean
}

const useRepositories = () => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isDeployedLikely = (repo: Repo) => {
    const keywords = ['portfolio', 'site', 'demo', 'project']
    return keywords.some(keyword => repo.name.toLowerCase().includes(keyword))
  }

  const getHomepageURL = useCallback((repo: Repo): string | null => {
    if (repo.homepage) {return repo.homepage}
    if (isDeployedLikely(repo)) {
      return `https://moonchichiii.github.io/${repo.name}/`
    }
    return null
  }, [])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Moonchichiii/repos?per_page=100')
        if (!res.ok) {throw new Error(`Failed to fetch repositories (${res.status})`)}
        const data: Repo[] = await res.json()

        const enhanced = data
          .filter(r => !r.fork && (r.homepage !== null || isDeployedLikely(r)))
          .map(repo => ({
            ...repo,
            homepage: getHomepageURL(repo)
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setRepos(enhanced)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [getHomepageURL])

  return { repos, loading, error }
}

const useHeaderVisibility = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsHeaderVisible(true),
      { threshold: 0.1, rootMargin: '50px' }
    )
    if (headerRef.current) {observer.observe(headerRef.current)}
    return () => observer.disconnect()
  }, [])
  return { isHeaderVisible, headerRef }
}

const ProjectCard = memo<{ repo: Repo; index: number }>(({ repo, index }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTimeout(() => setIsVisible(true), index * 100),
      { threshold: 0.1, rootMargin: '50px' }
    )
    if (cardRef.current) {observer.observe(cardRef.current)}
    return () => observer.disconnect()
  }, [index])
  const displayName = repo.name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  return (
    <article
      ref={cardRef}
      className={`
        project-card-polish relative bg-bg-elevated border border-border-primary rounded-2xl p-6
        transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94)
        hover:border-interactive-primary
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      aria-labelledby={`project-${repo.id}-title`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-interactive-primary/10 to-interactive-hover/10 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-interactive-primary/10 to-interactive-hover/10 rounded-xl flex items-center justify-center border border-border-primary/50">
          <Code2 size={20} className="text-interactive-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 id={`project-${repo.id}-title`} className="text-lg font-semibold text-text-primary mb-2 leading-tight">
            {displayName}
          </h3>
          {repo.description && (
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{repo.description}</p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-polish micro-bounce inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-interactive-primary to-interactive-hover text-text-inverse rounded-xl font-medium hover:shadow-glow transition-all duration-300 focus-ring-enhanced"
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
          className="glass-enhanced micro-bounce inline-flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border-primary text-text-primary rounded-xl font-medium hover:border-interactive-primary hover:text-interactive-primary transition-all duration-300 focus-ring-enhanced"
          aria-label={`View source code of ${displayName} on GitHub (opens in new tab)`}
        >
          <Github size={16} aria-hidden="true" />
          <span>Code</span>
        </a>
      </div>
    </article>
  )
})

const LoadingState = memo(() => (
  <div className="text-center py-12">
    <div className="flex items-center justify-center gap-3 mb-4">
      <Loader2 size={20} className="animate-spin text-interactive-primary" aria-hidden="true" />
      <span className="text-text-secondary">Loading projects...</span>
    </div>
    <p className="text-sm text-text-tertiary">Fetching latest work from GitHub</p>
  </div>
))

const ErrorState = memo<{ error: string }>(({ error }) => (
  <div className="text-center py-12">
    <div className="flex items-center justify-center gap-3 mb-4">
      <AlertCircle size={20} className="text-status-error" aria-hidden="true" />
      <span className="text-text-primary font-medium">Unable to load projects</span>
    </div>
    <p className="text-sm text-text-secondary mb-4">{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="btn-polish micro-bounce inline-flex items-center gap-2 px-4 py-2 glass-enhanced border border-border-primary text-text-primary rounded-xl font-medium hover:border-interactive-primary transition-all duration-300"
    >
      Try Again
    </button>
  </div>
))

const EmptyState = memo(() => (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gradient-to-br from-interactive-primary/10 to-interactive-hover/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border-primary/50">
      <Code2 size={24} className="text-interactive-primary" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold text-text-primary mb-2">New projects coming soon</h3>
    <p className="text-text-secondary">
      Currently working on exciting new applications to showcase here.
    </p>
  </div>
))

const WorkHeader = memo<{ isVisible: boolean; headerRef: React.RefObject<HTMLElement | null> }>(
  ({ isVisible, headerRef }) => (
    <header
      ref={headerRef}
      className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-px bg-gradient-to-r from-interactive-primary to-transparent" />
        <span className="badge-polish badge-info">Portfolio</span>
      </div>
      <h2 id="work-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight tracking-tight">
        Recent <span className="text-gradient-brand">Work</span>
      </h2>
      <div className="max-w-3xl">
        <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed mb-6">
          A collection of web applications I&#39;ve designed and built, showcasing my approach to solving complex problems with clean, scalable code.
        </p>
        <p className="text-lg text-text-tertiary leading-relaxed">
          Each project reflects my passion for creating intuitive user experiences backed by robust, well-tested architecture.
        </p>
      </div>
    </header>
  )
)

const ProjectGrid = memo<{ repos: Repo[] }>(({ repos }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {repos.map((repo, index) => (
      <ProjectCard key={repo.id} repo={repo} index={index} />
    ))}
  </div>
))

const GitHubFooter = memo(() => (
  <div className="text-center mt-12 pt-8 border-t border-border-primary">
    <p className="text-sm text-text-tertiary">
      Explore more projects and contributions on{' '}
      <a
        href="https://github.com/Moonchichiii"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-interactive-primary hover:text-interactive-hover underline transition-colors duration-200"
      >
        my GitHub profile
      </a>
    </p>
  </div>
))

const WorkContent = memo<{ repos: Repo[]; loading: boolean; error: string | null }>(
  ({ repos, loading, error }) => {
    if (loading) {return <LoadingState />}
    if (error) {return <ErrorState error={error} />}
    if (repos.length === 0) {return <EmptyState />}
    return (
      <>
        <ProjectGrid repos={repos} />
        <GitHubFooter />
      </>
    )
  }
)

const Work = memo(() => {
  const { repos, loading, error } = useRepositories()
  const { isHeaderVisible, headerRef } = useHeaderVisibility()
  return (
    <section id="work" className="py-16 lg:py-24 bg-bg-secondary" aria-labelledby="work-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <WorkHeader isVisible={isHeaderVisible} headerRef={headerRef} />
        <div className="min-h-[400px]">
          <WorkContent repos={repos} loading={loading} error={error} />
        </div>
      </div>
    </section>
  )
})

ProjectCard.displayName = 'ProjectCard'
LoadingState.displayName = 'LoadingState'
ErrorState.displayName = 'ErrorState'
EmptyState.displayName = 'EmptyState'
WorkHeader.displayName = 'WorkHeader'
ProjectGrid.displayName = 'ProjectGrid'
GitHubFooter.displayName = 'GitHubFooter'
WorkContent.displayName = 'WorkContent'
Work.displayName = 'Work'
export default Work
