import { memo, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, ArrowRight } from '@/components/icons/index'

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
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join("&");
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'submitting' })

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setStatus({ type: 'success', message: 'TRANSMISSION_RECEIVED. STANDBY.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      
    } catch {
      setStatus({ type: 'error', message: 'TRANSMISSION_ERROR. RETRY CONNECTION.' })
    }
  }, [formData])

  const inputClasses = `
    w-full bg-transparent border-b border-border-main py-3 
    text-text-main placeholder-text-muted font-mono text-sm
    focus:border-accent focus:outline-none transition-colors
    rounded-none appearance-none
  `
  
  const labelClasses = "block text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1"

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* HIDDEN FORM FOR NETLIFY DETECTION */}
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

      {/* ACTUAL INTERACTIVE FORM */}
      <form 
        name="contact" 
        method="POST" 
        onSubmit={handleSubmit} 
        className="space-y-10"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>

        {/* Header with status indicator - Fixed contrast and accessibility */}
        <div className="flex items-center justify-between mb-12">
          <h3 className="font-mono text-sm text-text-main uppercase tracking-widest border-b border-accent pb-1 inline-block">
            MESSAGE_INPUT
          </h3>
          <span className="font-mono text-[10px] text-accent font-bold" aria-hidden="true">
            AWAITING_DATA...
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className={labelClasses}>ID / Name *</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="ENTER_FULL_NAME" />
          </div>
          <div>
            <label htmlFor="email" className={labelClasses}>Return Address *</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="EMAIL@PROTOCOL.COM" />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>Subject Line *</label>
          <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} className={inputClasses} placeholder="PROJECT_TYPE // INQUIRY" />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>Data Packet *</label>
          <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="INPUT_MESSAGE_DATA..." />
        </div>

        {status.message && (
          <div className={`flex items-center gap-3 p-4 border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-red-500/10 border-red-500/20 text-red-600'}`}>
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span className="font-mono text-xs font-bold">{status.message}</span>
          </div>
        )}

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={status.type === 'submitting'} 
            aria-label="Send Message"
            className="group w-full md:w-auto px-10 py-4 bg-text-main text-bg-main font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 text-xs cursor-pointer"
          >
            {status.type === 'submitting' ? 'TRANSMITTING...' : <>INITIATE_SEND <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></>}
          </button>
        </div>
      </form>
    </div>
  )
})

ContactForm.displayName = 'ContactForm'
export default ContactForm