import { memo, useEffect, useState } from 'react'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
}

const Work = memo(() => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Moonchichiii/repos?per_page=100')
        if (!res.ok) {throw new Error(`GitHub API error: ${res.status}`)}
        const data: Repo[] = await res.json()
        const deployed = data
          .filter(r => !r.fork && r.homepage)
          .sort((a, b) => a.name.localeCompare(b.name))
        setRepos(deployed)
      } catch (e: any) {
        setError(e.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section
      id="work"
      className="py-20 lg:py-32 bg-bg-secondary relative overflow-hidden"
      aria-labelledby="work-title"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 lg:mb-24">
          <h2
            id="work-title"
            className="text-4xl lg:text-6xl font-heading font-black text-text-primary mb-6"
          >
            Deployed Projects
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto">
            Live applications I've built and deployed
          </p>
        </div>

        {loading && <p className="text-center text-text-secondary">Loading...</p>}
        {error && <p className="text-center text-status-error">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map(repo => (
              <div
                key={repo.id}
                className="bg-bg-elevated rounded-2xl p-6 border border-border-primary hover:border-interactive-primary transition-colors duration-300"
              >
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {repo.name}
                </h3>
                {repo.description && (
                  <p className="text-text-secondary mb-4">
                    {repo.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={repo.homepage!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-interactive-primary hover:bg-interactive-hover text-text-inverse rounded-lg transition-colors duration-200"
                  >
                    View Live
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-border-primary hover:border-interactive-primary text-text-primary rounded-lg transition-colors duration-200"
                  >
                    Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

Work.displayName = 'Work'
export default Work
