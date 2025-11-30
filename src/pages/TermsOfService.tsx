import { memo } from 'react'

const TermsOfService = memo(() => (
  <div className="max-w-3xl mx-auto pb-12">
    <article>
       {/* Header Metadata Block */}
      <div className="border-b border-border-main/50 pb-6 mb-8">
        <h2 className="text-3xl uppercase tracking-tight mb-4">Terms of Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-text-muted">
          <div>
            <span className="text-text-main block mb-1">EFFECTIVE:</span>
            20 July 2025
          </div>
          <div>
            <span className="text-text-main block mb-1">STATUS:</span>
            ACTIVE
          </div>
          <div>
            <span className="text-text-main block mb-1">JURISDICTION:</span>
            SWEDEN (EU)
          </div>
        </div>
      </div>

      <h3>1. Introduction</h3>
      <p>
        These Terms govern your use of Nordic Code Works&apos; website and services. By accessing our website or engaging our services, you agree to these Terms.
      </p>
      
      <h3>2. Service Description</h3>
      <h4>3.1 Scope of Work</h4>
      <ul>
        <li><strong>Frontend:</strong> React, TypeScript, Next.js, responsive design, UI/UX implementation</li>
        <li><strong>Backend:</strong> API integration, cloud deployment, auth systems</li>
        <li><strong>Consulting:</strong> Architecture reviews, stack selection, performance auditing</li>
      </ul>
      <p><strong>Note:</strong> We do not provide on-site work, native mobile app development, or legacy system maintenance unless explicitly agreed.</p>

      <h3>3. Client Obligations</h3>
      <ul>
        <li>Provide timely feedback (within 5 business days)</li>
        <li>Supply necessary credentials, content, and requirements</li>
        <li>Manage own hosting/domain accounts unless contracted otherwise</li>
        <li>Perform User Acceptance Testing (UAT) upon milestone delivery</li>
      </ul>

      <h3>4. Payment Terms</h3>
      <ul>
        <li><strong>Hourly Rate:</strong> €25-35 EUR (Standard)</li>
        <li><strong>Fixed Price:</strong> 50% Upfront / 50% Completion for small projects (&lt;€5k)</li>
        <li><strong>Invoicing:</strong> Net 14 days. Late payments incur 1.5% interest/month.</li>
        <li><strong>VAT:</strong> 25% for Swedish clients; Reverse charge for EU businesses.</li>
      </ul>

      <h3>5. Intellectual Property</h3>
      <p>
        Upon full payment, the Client owns the specific code, content, and deliverables created for the project. Nordic Code Works retains the right to reuse general knowledge, underlying frameworks, and open-source components. We reserve the right to showcase the work in our portfolio unless a valid NDA is in place.
      </p>

      <h3>6. Warranties &amp; Liability</h3>
      <p>
        Services are provided &quot;as is.&quot; We offer a 30-day bug fix warranty for code created by us. We are not liable for third-party service failures, hosting issues, or indirect damages. Liability is capped at the total project value.
      </p>

      <h3>7. Termination</h3>
      <ul>
        <li><strong>Client:</strong> 14 days notice. Must pay for all work completed up to termination.</li>
        <li><strong>Developer:</strong> May terminate for non-payment or unresponsiveness (&gt;30 days).</li>
      </ul>

      <h3>8. Dispute Resolution</h3>
      <p>
        Governed by Swedish Law. Disputes shall be resolved through direct negotiation (30 days) followed by mediation or the courts of Stockholm, Sweden.
      </p>

      <hr className="my-8 border-border-main" />
      
      <p className="font-mono text-xs text-text-muted">
        <strong>Acknowledgment:</strong> By using our services or website, you acknowledge you have read, understood, and agree to these Terms of Service.
      </p>
    </article>
  </div>
))

TermsOfService.displayName = 'TermsOfService'
export default TermsOfService