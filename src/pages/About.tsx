import { memo } from 'react'

const About = memo(() => {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-bg-primary relative overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="about-title"
            className="text-4xl lg:text-6xl font-heading font-black text-text-primary mb-8"
          >
            About Me
          </h2>
          <p className="text-lg lg:text-xl text-text-secondary leading-relaxed mb-6">
            I’m a Fullstack Developer specializing in building scalable web applications
            with React, TypeScript, and Django. I focus on clean code, intuitive UX,
            and efficient solutions.
          </p>

          <div className="space-y-4 text-left mx-auto max-w-xl">
            {/* Contact */}
            <div>
              <p className="font-medium">
                📧 Email: <a href="mailto:mats.gustafsson83@gmail.com" className="text-interactive-primary underline">mats.gustafsson83@gmail.com</a>
              </p>
              <p className="font-medium">
                🔗 LinkedIn: <a href="https://linkedin.com/in/mats-gustafsson" target="_blank" rel="noopener noreferrer" className="text-interactive-primary underline">linkedin.com/in/mats-gustafsson</a>
              </p>
              <p className="font-medium">
                🐙 GitHub: <a href="https://github.com/Moonchichiii" target="_blank" rel="noopener noreferrer" className="text-interactive-primary underline">github.com/Moonchichiii</a>
              </p>
            </div>

            {/* Profile */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Profile</h3>
              <p className="text-text-secondary leading-relaxed">
                Seasoned developer with hands‑on experience in React, TypeScript, and
                Django. I thrive on solving complex problems and continuously adopt
                new technologies to deliver high‑quality applications.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Technical Skills</h3>
              <ul className="list-disc list-inside text-text-secondary">
                <li><strong>Front-End:</strong> React, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</li>
                <li><strong>Back-End:</strong> Python, Django, REST APIs</li>
                <li><strong>Databases:</strong> PostgreSQL, Redis</li>
                <li><strong>DevOps/Tools:</strong> Docker, Git/GitHub, CI/CD (GitHub Actions)</li>
              </ul>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Experience</h3>
              <p className="text-text-secondary leading-relaxed" />
            </div>

            {/* Personal Projects & Learning */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Personal Projects & Learning</h3>
              <p className="text-text-secondary leading-relaxed">
                Building full‑stack projects with Django back‑end and React/TypeScript front‑end.
                Exploring JWT auth, RESTful APIs, PostgreSQL, and containerization with Docker.
              </p>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Education</h3>
              <p className="text-text-secondary leading-relaxed">
                Full Stack Web Developer Diploma, Code Institute (June2024) – Verified Certificate
              </p>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Languages</h3>
              <p className="text-text-secondary leading-relaxed">Swedish (Native), English (Fluent)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
export default About
