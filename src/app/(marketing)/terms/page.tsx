/* ================================================================
   ELVATRIXA — TERMS OF SERVICE PAGE
   File: src/app/(marketing)/terms/page.tsx
================================================================ */

import type { Metadata } from 'next'
import Link              from 'next/link'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title:       'Terms of Service',
  description: 'Elvatrixa Terms of Service — governing all digital services engagements for US and UK clients.',
  canonical:   '/terms',
  noIndex:     false,
})

const LAST_UPDATED = '1 January 2025'

const sections = [
  {
    id:    'agreement',
    title: '1. Agreement to Terms',
    body: [
      'These Terms of Service ("Terms") govern your use of the Elvatrixa website (elvatrixa.com) and any professional services provided by Elvatrixa ("we", "us", "our") to you ("Client").',
      'By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.',
    ],
  },
  {
    id:    'services',
    title: '2. Our Services',
    body: [
      'Elvatrixa provides digital professional services including but not limited to: SaaS product development, AI and automation systems, e-commerce development, data analytics, UI/UX design, digital marketing, website performance optimisation, and maintenance retainer plans.',
      'The specific scope, deliverables, timeline, and pricing for each engagement are defined in a written Statement of Work ("SOW") or project proposal agreed upon by both parties before work commences.',
    ],
  },
  {
    id:    'proposals',
    title: '3. Proposals & Fixed-Price Agreements',
    body: [
      'Elvatrixa provides fixed-price project proposals. Once a proposal is accepted in writing (including by email), it constitutes a binding agreement between Elvatrixa and the Client.',
      'Fixed-price proposals cover the work explicitly described in the SOW. Requests for work outside the agreed scope constitute a "change request" and may incur additional charges, which will be agreed in writing before additional work begins.',
      'Proposals are valid for 30 days from the date of issue unless otherwise stated.',
    ],
  },
  {
    id:    'payment',
    title: '4. Payment Terms',
    body: [
      'Unless otherwise specified in a proposal, payment terms are: 50% upfront before work commences, and 50% upon project completion prior to final delivery.',
      'For ongoing retainer services, payment is due monthly in advance.',
      'Invoices are payable within 14 days of issue. Late payments accrue interest at 8% per annum above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.',
      'All prices are exclusive of VAT where applicable.',
    ],
  },
  {
    id:    'ip',
    title: '5. Intellectual Property',
    body: [
      'Upon receipt of full payment for a project, Elvatrixa assigns to the Client full ownership of all custom code, designs, and deliverables created specifically for that project.',
      'Elvatrixa retains ownership of all pre-existing intellectual property, frameworks, libraries, and tools used in the delivery of services ("Background IP"). A perpetual, non-exclusive licence to use Background IP as embedded in the deliverables is granted to the Client.',
      'Elvatrixa reserves the right to include completed work in its portfolio unless the Client requests confidentiality in writing.',
    ],
  },
  {
    id:    'confidentiality',
    title: '6. Confidentiality',
    body: [
      'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of an engagement. This obligation does not apply to information that is publicly available, already known to the receiving party, or required to be disclosed by law.',
      'Elvatrixa will not share your business data or project details with third parties without your consent, except as required to deliver the agreed services (e.g. sub-contractors under equivalent confidentiality obligations).',
    ],
  },
  {
    id:    'warranties',
    title: '7. Warranties & Liability',
    body: [
      'Elvatrixa warrants that services will be performed with reasonable skill and care, and that deliverables will materially conform to the agreed SOW.',
      'Elvatrixa\'s total liability in connection with any engagement shall not exceed the total fees paid by the Client for that engagement in the 12 months preceding the claim.',
      'We are not liable for indirect, consequential, or incidental losses, including lost profits or data loss, except where such loss is caused by our gross negligence or wilful misconduct.',
      'Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, or for fraud or fraudulent misrepresentation.',
    ],
  },
  {
    id:    'termination',
    title: '8. Termination',
    body: [
      'Either party may terminate a project engagement with 14 days written notice. In the event of termination, the Client is liable for payment for all work completed up to the date of termination, calculated on a pro-rata basis.',
      'Elvatrixa may terminate an engagement immediately if the Client materially breaches these Terms and fails to remedy the breach within 7 days of written notice.',
    ],
  },
  {
    id:    'governing-law',
    title: '9. Governing Law',
    body: [
      'These Terms are governed by the laws of England and Wales. Both parties agree to submit to the exclusive jurisdiction of the courts of England and Wales for the resolution of any disputes.',
    ],
  },
  {
    id:    'changes',
    title: '10. Changes to These Terms',
    body: [
      'We may update these Terms from time to time. Material changes will be communicated by updating the "Last Updated" date on this page. Continued use of our services after changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id:    'contact',
    title: '11. Contact',
    body: [
      'For any questions about these Terms, please contact us at: hello@elvatrixa.com',
    ],
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg-1)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden section-pad-sm"
        style={{ background: 'var(--bg-0)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(201,168,76,0.08) 0%, transparent 65%)',
          }}
        />
        <div className="section-container relative z-10 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase mb-8 transition-colors duration-150 text-text-4 hover:text-gold"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M5 3L2 6l3 3"/>
            </svg>
            Back to Home
          </Link>
          <h1
            className="font-display font-bold mb-4"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: 'var(--text-1)',
              lineHeight: '1',
              letterSpacing: '-0.03em',
            }}
          >
            Terms of Service
          </h1>
          <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--text-4)' }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>


      {/* ── CONTENT ── */}
      <section className="section-pad">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">

            {/* Sidebar TOC */}
            <nav
              className="hidden lg:block sticky top-24"
              aria-label="Page sections"
            >
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-4)' }}
              >
                Contents
              </p>
              <ul className="flex flex-col gap-1">
                {sections.map(s => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="font-body text-xs leading-relaxed transition-colors duration-150 hover:text-gold block py-1"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Body */}
            <div className="max-w-2xl flex flex-col gap-10">
              {sections.map(s => (
                <div key={s.id} id={s.id}>
                  <h2
                    className="font-display font-bold mb-4"
                    style={{
                      fontSize: 'clamp(18px, 2.5vw, 24px)',
                      color: 'var(--text-1)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.title}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {s.body.map((para, i) => (
                      <p
                        key={i}
                        className="font-body text-sm leading-[1.9]"
                        style={{ color: 'var(--text-3)' }}
                        dangerouslySetInnerHTML={{
                          __html: para
                            .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-2)">$1</strong>'),
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Footer links */}
              <div
                className="flex flex-wrap gap-4 pt-8"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                <Link href="/privacy" className="font-body text-xs transition-colors duration-150 text-text-4 hover:text-gold">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="font-body text-xs transition-colors duration-150 text-text-4 hover:text-gold">
                  Cookie Policy
                </Link>
                <Link href="/contact" className="font-body text-xs transition-colors duration-150 text-text-4 hover:text-gold">
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
