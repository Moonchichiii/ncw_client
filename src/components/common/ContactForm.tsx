import { memo, useState, useCallback } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle } from '@/components/icons/index'
import Button from '@/components/common/Button'

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
      // Netlify Forms approach
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
          message: 'Thank you! I\'ll get back to you within 24 hours.' 
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (_error) {
      setStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try emailing me directly.' 
      })
    }
  }, [formData])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card-enhanced rounded-lg p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center btn-enhanced-hover">
            <Mail size={20} className="text-white dark:text-slate-900" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Send me a message
          </h3>
        </div>

        {/* Hidden form for Netlify */}
        <form 
          name="contact" 
          data-netlify="true" 
          data-netlify-honeypot="bot-field" 
          hidden
        >
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="subject" />
          <textarea name="message" />
        </form>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-field w-full rounded-lg 
                           bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white
                           enhanced-focus transition-colors duration-200
                           px-3 py-2 lg:px-4 lg:py-3"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-field w-full rounded-lg 
                           bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white
                           enhanced-focus transition-colors duration-200
                           px-3 py-2 lg:px-4 lg:py-3"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="form-field w-full rounded-lg 
                         bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white
                         enhanced-focus transition-colors duration-200
                         px-3 py-2 lg:px-4 lg:py-3"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="form-field w-full rounded-lg 
                         bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white
                         enhanced-focus transition-colors duration-200 resize-vertical
                         px-3 py-2 lg:px-4 lg:py-3"
              placeholder="Tell me about your project, ideas, or just say hello..."
            />
          </div>

          {status.message && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 size={16} aria-hidden="true" />
              ) : (
                <AlertCircle size={16} aria-hidden="true" />
              )}
              <span className="text-sm">{status.message}</span>
            </div>
          )}

          <div className="flex justify-center lg:justify-start">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={status.type === 'submitting'}
              leftIcon={<Send size={16} />}
              disabled={status.type === 'submitting'}
              className="contact-form-button btn-enhanced-hover w-full sm:w-auto sm:min-w-[200px] lg:min-w-[180px]"
            >
              {status.type === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
})

ContactForm.displayName = 'ContactForm'
export default ContactForm