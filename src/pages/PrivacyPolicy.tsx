import { memo } from 'react'

const PrivacyPolicy = memo(() => (
  <div className="max-w-3xl mx-auto pb-12">
    <article>
      {/* Header Metadata Block */}
      <div className="border-b border-border-main/50 pb-6 mb-8">
        <h2 className="text-3xl uppercase tracking-tight mb-4">Privacy Policy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-text-muted">
          <div>
            <span className="text-text-main block mb-1">EFFECTIVE:</span>
            20 July 2025
          </div>
          <div>
            <span className="text-text-main block mb-1">UPDATED:</span>
            20 July 2025
          </div>
          <div>
            <span className="text-text-main block mb-1">VERSION:</span>
            1.0 (STABLE)
          </div>
        </div>
      </div>

      <h3>1. Introduction</h3>
      <p>
        Nordic Code Works (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at nordiccodeworks.com (the &quot;Website&quot;) or engage our development services.
      </p>
      
      <div className="bg-bg-sub/50 border border-border-main p-4 my-6 font-mono text-xs not-prose">
        <strong className="block text-text-main mb-2">DATA CONTROLLER</strong>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-text-muted">
          <p>Mats Gustafsson (Nordic Code Works)</p>
          <p>Reg: SE123456789001</p>
          <p>VAT: SE123456789001</p>
          <p>Stockholm, Sweden (EU)</p>
        </div>
      </div>

      <h3>2. Definitions</h3>
      <ul>
        <li><strong>&quot;Personal Data&quot;:</strong> Info relating to an identified or identifiable person</li>
        <li><strong>&quot;Processing&quot;:</strong> Any operation on personal data (collection, storage, use)</li>
        <li><strong>&quot;Data Subject&quot;:</strong> The individual whose data we process</li>
        <li><strong>&quot;Services&quot;:</strong> Our full-stack development services</li>
      </ul>

      <h3>3. Information We Collect</h3>
      <h4>3.1 Information You Provide</h4>
      <ul>
        <li><strong>Contact Form Data:</strong> Name, email, subject, message</li>
        <li><strong>Project Inquiries:</strong> Technical/business info you share</li>
        <li><strong>Communication Records:</strong> Email/project communications</li>
        <li><strong>Client Account Info:</strong> Business details, preferences, project history</li>
      </ul>
      <h4>3.2 Automatically Collected</h4>
      <ul>
        <li><strong>Website Analytics:</strong> Page views, duration, referrals (Google Analytics, IP-anonymized, 14 months retention)</li>
        <li><strong>Technical Data:</strong> Anonymized IP, browser, device, OS</li>
        <li><strong>Performance Data:</strong> Load times, anonymized interactions</li>
      </ul>

      <h3>4. Legal Basis for Processing (GDPR Art. 6)</h3>
      <p>We process data under the following legal frameworks:</p>
      <ul>
        <li><strong>Consent (6(1)(a)):</strong> Newsletter subscriptions, non-essential cookies.</li>
        <li><strong>Contract (6(1)(b)):</strong> Service delivery, payments, project management.</li>
        <li><strong>Legitimate Interest (6(1)(f)):</strong> Security, fraud prevention, service improvement.</li>
        <li><strong>Legal Obligation (6(1)(c)):</strong> Tax records, anti-money laundering, breach notifications.</li>
      </ul>

      <h3>5. Data Sharing &amp; Third-Party Services</h3>
      <p>We strictly utilize trusted providers for service execution:</p>
      <ul>
        <li><strong>Hosting:</strong> Netlify/Vercel (EU/US with adequacy)</li>
        <li><strong>Analytics:</strong> Google Analytics (Anonymized)</li>
        <li><strong>Payments:</strong> Stripe, PayPal (GDPR-compliant)</li>
      </ul>
      <p>We never sell, rent, or trade your personal info to third parties for marketing.</p>

      <h3>6. Data Storage &amp; Security</h3>
      <ul>
        <li><strong>Encryption:</strong> Data in transit (TLS 1.3) and at rest (AES-256)</li>
        <li><strong>Access Control:</strong> MFA, least privilege principles</li>
        <li><strong>Retention:</strong> Project data kept for duration + 7 years; Analytics max 14 months.</li>
      </ul>

      <h3>7. Your Rights Under GDPR</h3>
      <ul>
        <li><strong>Access (Art. 15):</strong> Request copies of your data</li>
        <li><strong>Rectification (Art. 16):</strong> Correct inaccurate data</li>
        <li><strong>Erasure (Art. 17):</strong> Request deletion (&quot;right to be forgotten&quot;)</li>
        <li><strong>Portability (Art. 20):</strong> Receive data in portable format</li>
      </ul>

      <h3>8. Contact Information</h3>
      <p>
        For data protection inquiries or to exercise your rights:
      </p>
      <div className="bg-bg-sub/50 border-l-2 border-accent p-4 font-mono text-sm not-prose">
        <p className="text-text-main">contact@nordiccodeworks.com</p>
        <p className="text-text-muted mt-1">Subject: &quot;GDPR Rights Request&quot;</p>
      </div>
    </article>
  </div>
))

PrivacyPolicy.displayName = 'PrivacyPolicy'
export default PrivacyPolicy