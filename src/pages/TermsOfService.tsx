import { memo } from 'react'

const TermsOfService = memo(() => (
  <div className="section-spacing bg-white dark:bg-slate-800">
    <div className="section-container max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <article>
          <h2>Terms of Service</h2>
          <p>
            <strong>Effective Date:</strong> 20 July 2025<br />
            <strong>Last Updated:</strong> 20 July 2025<br />
            <strong>Version:</strong> 1.0
          </p>
          <h3>1. Definitions</h3>
          <ul>
            <li><strong>&quot;Client&quot;</strong>: individual or entity contracting for Services</li>
            <li><strong>&quot;Services&quot;</strong>: our full-stack web development services</li>
            <li><strong>&quot;Deliverables&quot;</strong>: all work products, code, documentation, and outputs</li>
            <li><strong>&quot;Project Agreement&quot;</strong>: written scope, timeline, and pricing signed by both parties</li>
            <li><strong>&quot;Website&quot;</strong>: nordiccodeworks.com and subdomains</li>
            <li><strong>&quot;Terms&quot;</strong>: these Terms of Service</li>
            <li><strong>&quot;We,&quot; &quot;Us,&quot; &quot;Our&quot;</strong>: Nordic Code Works (Mats Gustafsson)</li>
          </ul>
          <h3>2. Introduction</h3>
          <p>
            These Terms govern your use of Nordic Code Works&apos; website and services. By accessing our website or engaging our services, you agree to these Terms.
          </p>
          <p>
            <strong>Service Provider:</strong> Mats Gustafsson (Nordic Code Works)<br />
            <strong>Business Registration:</strong> SE123456789001<br />
            <strong>VAT Number:</strong> SE123456789001<br />
            <strong>Location:</strong> Sweden, EU<br />
            <strong>Contact:</strong> contact@nordiccodeworks.com
          </p>
          <h3>3. Service Description</h3>
          <h4>3.1 Development Services</h4>
          <ul>
            <li><strong>Frontend:</strong> React, TypeScript, Next.js, responsive design, PWA, UI/UX implementation</li>
            <li><strong>Backend:</strong> REST/GraphQL APIs, PostgreSQL/MongoDB, auth systems, cloud deployment</li>
            <li><strong>Full-Stack:</strong> Complete web apps, e-commerce, dashboards, integrations</li>
            <li><strong>Consulting:</strong> Architecture, code reviews, stack selection, performance/security</li>
          </ul>
          <h4>3.2 Service Delivery Model</h4>
          <ul>
            <li><strong>Remote Only</strong> (from Sweden)</li>
            <li><strong>Project-Based</strong> with defined deliverables</li>
            <li><strong>EU Focus</strong></li>
            <li><strong>Direct Communication</strong></li>
            <li><strong>Agile Methodology</strong></li>
          </ul>
          <h4>3.3 Service Limitations</h4>
          <ul>
            <li>No on-site work</li>
            <li>No ongoing maintenance (unless separately agreed)</li>
            <li>No native mobile app development</li>
            <li>No legacy tech (&gt;5 years old)</li>
            <li>No specialized compliance (medical, financial, legal)</li>
            <li>No graphic design/branding or content creation</li>
          </ul>
          <h4>3.4 Subcontracting</h4>
          <ul>
            <li>Specialized design (with approval)</li>
            <li>Translation services</li>
            <li>Vendor-specific integrations</li>
          </ul>
          <p>All subcontractors are bound by confidentiality and quality standards.</p>
          <h3>4. Geographic Scope and Client Eligibility</h3>
          <ul>
            <li>EU individuals, businesses, organizations</li>
            <li>International businesses with EU operations (case-by-case)</li>
          </ul>
          <ul>
            <li>Swedish/EU law compliance, GDPR, remote work standards</li>
          </ul>
          <h3>5. Client Obligations</h3>
          <ul>
            <li>Timely feedback (within 5 business days)</li>
            <li>Provide credentials, content, requirements</li>
            <li>Manage hosting, domains, licenses, accounts</li>
            <li>Participate in updates, approve milestones, designate technical contact</li>
            <li>User acceptance testing, bug reporting, final approval, go-live support</li>
          </ul>
          <h3>6. Project Engagement Process</h3>
          <ul>
            <li>Discovery call, technical assessment, timeline estimation, proposal</li>
            <li>Written scope, timeline, budget, communication protocol, change management</li>
            <li>Agile sprints, QA, Git workflow, documentation, staging deployment</li>
          </ul>
          <h3>7. Payment Terms</h3>
          <h4>7.1 Pricing Structure</h4>
          <ul>
            <li><strong>Fixed Price:</strong> Agreed upfront</li>
            <li><strong>Time-Based:</strong> Hourly rate (€25-35) with estimates</li>
            <li><strong>Milestone-Based:</strong> Payments per deliverable</li>
            <li><strong>Retainer:</strong> Monthly (if agreed separately)</li>
          </ul>
          <h4>7.2 Payment Schedule</h4>
          <ul>
            <li><strong>Small (&lt; €5,000):</strong> 50% upfront, 50% on completion</li>
            <li><strong>Medium (€5,000-15,000):</strong> 30% upfront, 40% mid, 30% final</li>
            <li><strong>Large (&gt; €15,000):</strong> Custom schedule, max 40% per payment, min 20% final</li>
          </ul>
          <h4>7.3 Invoice & Payment Terms</h4>
          <ul>
            <li>Invoices include business/client details, VAT, description, totals, due date</li>
            <li><strong>Currency:</strong> EUR (EU), SEK (Sweden)</li>
            <li><strong>Methods:</strong> Bank transfer, PayPal, Stripe</li>
            <li><strong>Due:</strong> 14 days</li>
            <li><strong>Late Interest:</strong> 1.5%/month (per Swedish law)</li>
            <li>Client pays collection costs</li>
          </ul>
          <h4>7.4 VAT Handling</h4>
          <ul>
            <li>Swedish clients: 25% VAT</li>
            <li>EU business: reverse charge</li>
            <li>EU consumers: VAT collected</li>
            <li>Non-EU: no VAT</li>
          </ul>
          <h4>7.5 Expenses</h4>
          <ul>
            <li>Client pays for hosting, domains, APIs, assets, travel (if any), rush charges (50% for &lt;2 weeks)</li>
          </ul>
          <h3>8. Intellectual Property</h3>
          <ul>
            <li>Client owns custom code, content, docs after full payment</li>
            <li>We retain general know-how, reusable components, portfolio rights (with approval)</li>
            <li>Client gets perpetual license for reusable components</li>
            <li>Open source/commercial components per their licenses</li>
            <li>Portfolio/case study use only with client consent</li>
          </ul>
          <h3>9. Warranties & Disclaimers</h3>
          <ul>
            <li>Professional quality, spec compliance, industry standards, original work</li>
            <li>30-day bug fix warranty (excludes client/third-party/hosting issues)</li>
            <li>Consumers: 6 months statutory warranty, 14-day withdrawal, legal remedies</li>
            <li>Services &quot;as is&quot;: no guarantee of uptime, future compatibility, or commercial results</li>
          </ul>
          <h3>10. Limitation of Liability</h3>
          <ul>
            <li>Business: liability capped at project total, max €50,000/12 months, no indirect damages</li>
            <li>Consumers: subject to mandatory law, proportionality, fairness</li>
            <li>No liability for force majeure (disasters, legal, infrastructure, third-party, health, etc.)</li>
            <li>Client responsible for backups, testing, security, third-party risks</li>
          </ul>
          <h3>11. Termination</h3>
          <ul>
            <li>Client: 14 days notice, pay for completed/in-progress work, no refund for completed milestones</li>
            <li>Developer: may terminate for non-payment (30 days), breach, impossible performance, unresponsiveness (&gt;30 days)</li>
            <li>Refunds: none for completed work, pro-rata for incomplete, upfront refundable for unperformed work, consumer rights apply</li>
            <li>Upon termination: all payments due, deliverables transferred, confidentiality continues, data handled securely</li>
          </ul>
          <h3>12. Confidentiality & Data Protection</h3>
          <ul>
            <li>Strict confidentiality on business, technical, customer, and project info</li>
            <li>GDPR, Swedish Data Protection Act, Privacy Policy, DPAs as needed</li>
            <li>Data security: encryption, access control, timely updates, incident response</li>
          </ul>
          <h3>13. Dispute Resolution</h3>
          <ul>
            <li>Governing law: Sweden, EU regs apply, consumer protection laws override if required</li>
            <li>Process: direct negotiation (30 days), mediation, arbitration (business), court (Sweden or consumer&apos;s country)</li>
            <li>Consumers: retain all EU/Swedish consumer rights</li>
          </ul>
          <h3>14. Website Terms & Acceptable Use</h3>
          <ul>
            <li>Website for info, portfolio, contact, resources</li>
            <li>No illegal, spam, security breaches, interference, or IP violations</li>
            <li>Our content protected; user submissions licensed to us; third-party content attributed</li>
            <li>Accessibility: EU directive, EN 301 549, WCAG 2.1 AA</li>
          </ul>
          <h3>15. Changes to Terms</h3>
          <ul>
            <li>We may update Terms for legal, service, or feedback reasons</li>
            <li>Minor: website notice, version/date update</li>
            <li>Material: email to clients (30 days), prominent notice (60 days), major version update</li>
            <li>Ongoing projects: notified directly, option to continue under old Terms</li>
            <li>Continued use = acceptance</li>
          </ul>
          <h3>16. Contact & Legal Notices</h3>
          <ul>
            <li>Email: contact@nordiccodeworks.com</li>
            <li>Website: nordiccodeworks.com</li>
            <li>Response: within 2 business days, Mon-Fri 9:00-17:00 CET</li>
            <li>Legal notices: subject &quot;Legal Notice - Terms of Service&quot;, include full name/company/nature</li>
            <li>Address: Mats Gustafsson (Nordic Code Works), Storgatan 123, 11122 Stockholm, Sweden, EU</li>
          </ul>
          <h3>17. Miscellaneous</h3>
          <ul>
            <li>Entire agreement: these Terms + Privacy Policy + Project Agreements</li>
            <li>Severability: unenforceable parts modified/minimized, rest remain</li>
            <li>English version prevails</li>
            <li>Assignment: client needs consent, we may assign with 30 days notice</li>
            <li>Independent contractor: no partnership/employment/agency</li>
            <li>Survival: payment, IP, confidentiality, liability, dispute terms survive termination</li>
          </ul>
          <hr />
          <p>
            <strong>Acknowledgment:</strong> By using our services or website, you acknowledge you have read, understood, and agree to these Terms of Service.
          </p>
          <p>
            <strong>Related Documents:</strong> These Terms should be read with our Privacy Policy and any Project Agreements.
          </p>
        </article>
      </div>
    </div>
  </div>
))

TermsOfService.displayName = 'TermsOfService'
export default TermsOfService
