import { memo } from 'react'

const Contact = memo(() => {
  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-bg-secondary relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="contact-title"
            className="text-4xl lg:text-6xl font-heading font-black text-text-primary mb-8"
          >
            Get In Touch
          </h2>
          <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed mb-8">
            Ready to start your next project? Let&apos;s build something amazing together.
          </p>
          <a
            href="mailto:contact@nordiccodeworks.com"
            className="inline-block px-8 py-4 bg-interactive-primary hover:bg-interactive-hover text-text-inverse font-semibold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2"
          >
            contact@nordiccodeworks.com
          </a>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'
export default Contact
