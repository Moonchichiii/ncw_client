import { memo, useState, useCallback } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle } from '@/components/icons/index'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

const ContactForm = memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
 
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'submitting' })

    try {
      // Netlify form submission
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      })

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! I&apos;ll get back to you within 24 hours.'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (_error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try emailing me directly at contact@nordiccodeworks.com'
      })
    }
  }, [formData])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Hidden form for Netlify detection */}
      <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message" />
      </form>

      <div className="p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-interactive-primary/5 via-transparent to-accent-primary/5 rounded-3xl" />
       
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-interactive-primary to-accent-primary rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Mail size={24} className="text-text-inverse" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              Send me a message
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              I&apos;ll respond within 24 hours
            </p>
          </div>
        </div>

        <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="relative space-y-6">
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-3 transition-colors duration-200">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 bg-bg-secondary/50 border border-border-primary rounded-2xl
                             text-text-primary placeholder-text-tertiary
                             focus:bg-bg-primary focus:border-interactive-primary focus:ring-4 focus:ring-interactive-primary/10
                             transition-all duration-300 ease-out
                             hover:border-interactive-primary/50
                             text-sm sm:text-base font-medium"
                  placeholder="Your full name"
                />
              </div>
            </div>
           
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-3 transition-colors duration-200">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 bg-bg-secondary/50 border border-border-primary rounded-2xl
                             text-text-primary placeholder-text-tertiary
                             focus:bg-bg-primary focus:border-interactive-primary focus:ring-4 focus:ring-interactive-primary/10
                             transition-all duration-300 ease-out
                             hover:border-interactive-primary/50
                             text-sm sm:text-base font-medium"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="subject" className="block text-sm font-semibold text-text-primary mb-3 transition-colors duration-200">
              Subject *
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 bg-bg-secondary/50 border border-border-primary rounded-2xl
                           text-text-primary placeholder-text-tertiary
                           focus:bg-bg-primary focus:border-interactive-primary focus:ring-4 focus:ring-interactive-primary/10
                           transition-all duration-300 ease-out
                           hover:border-interactive-primary/50
                           text-sm sm:text-base font-medium"
                placeholder="What would you like to discuss?"
              />
            </div>
          </div>

          <div className="group">
            <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-3 transition-colors duration-200">
              Message *
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 bg-bg-secondary/50 border border-border-primary rounded-2xl
                           text-text-primary placeholder-text-tertiary
                           focus:bg-bg-primary focus:border-interactive-primary focus:ring-4 focus:ring-interactive-primary/10
                           transition-all duration-300 ease-out
                           hover:border-interactive-primary/50
                           text-sm sm:text-base font-medium resize-none min-h-[120px] sm:min-h-[140px]"
                placeholder="Tell me about your project, ideas, or just say hello..."
              />
            </div>
          </div>

          {status.message && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl backdrop-blur-sm ${
              status.type === 'success'
                ? 'bg-status-success/10 border border-status-success/20 text-status-success'
                : 'bg-status-error/10 border border-status-error/20 text-status-error'
            }`}>
              <div className="flex-shrink-0 mt-0.5">
                {status.type === 'success' ? (
                  <CheckCircle2 size={18} aria-hidden="true" />
                ) : (
                  <AlertCircle size={18} aria-hidden="true" />
                )}
              </div>
              <span className="text-sm font-medium leading-relaxed">{status.message}</span>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={status.type === 'submitting'}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-interactive-primary to-accent-primary
                         text-text-inverse font-semibold rounded-2xl text-base sm:text-lg
                         hover:from-interactive-hover hover:to-accent-primary hover:scale-105
                         active:scale-95 disabled:opacity-50 disabled:hover:scale-100
                         transition-all duration-300 ease-out
                         shadow-lg hover:shadow-xl hover:shadow-interactive-primary/25
                         sm:min-w-[200px] overflow-hidden"
            >
              <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                {status.type === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-1 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Send Message</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

ContactForm.displayName = 'ContactForm'
export default ContactForm