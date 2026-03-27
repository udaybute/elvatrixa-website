/* ================================================================
   ELVATRIXA — PRIVACY POLICY PAGE
   File: src/app/(marketing)/privacy/page.tsx
================================================================ */

import type { Metadata } from 'next'
import Link              from 'next/link'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title:       'Privacy Policy',
  description: 'How Elvatrixa collects, uses, and protects your personal data. Full GDPR and UK GDPR compliance.',
  canonical:   '/privacy',
  noIndex:     false,
})

const LAST_UPDATED = '1 January 2025'

const sections = [
  {
    id:    'who-we-are',
    title: '1. Who We Are',
    body: [
      'Elvatrixa ("we", "us", "our") is a digital innovation studio registered in the United Kingdom. Our registered address and data controller details are available on request at hello@elvatrixa.com.',
      'This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website (elvatrixa.com) or engage with our services. Please read this policy carefully.',
    ],
  },
  {
    id:    'data-we-collect',
    title: '2. Data We Collect',
    body: [
      'We collect the following categories of personal data:',
      '**Contact enquiry data** — name, business email address, company name, country, phone number, and project details submitted via our contact form.',
      '**Usage data** — IP address, browser type, device type, pages visited, time on site, and referral source — collected automatically via analytics tools.',
      '**Communications data** — the content of emails and messages you send us.',
      'We do not collect sensitive personal data (e.g. health, financial account numbers, or biometric data).',
    ],
  },
  {
    id:    'how-we-use',
    title: '3. How We Use Your Data',
    body: [
      'We use your personal data to:',
      '• Respond to your enquiries and deliver the services you have requested',
      '• Send you our fixed-price proposal and project documentation',
      '• Improve our website and understand how visitors use it',
      '• Comply with legal obligations',
      '• Protect against fraud and abuse',
      'We will never sell your personal data to third parties.',
    ],
  },
  {
    id:    'legal-basis',
    title: '4. Legal Basis for Processing',
    body: [
      'Under UK GDPR and EU GDPR, we process your data on the following legal bases:',
      '**Contractual necessity** — processing required to enter into or perform a contract with you.',
      '**Legitimate interests** — analysing site usage and improving our services, where your rights and interests do not override ours.',
      '**Consent** — where you have explicitly opted in, e.g. by ticking the GDPR consent checkbox on our contact form.',
      '**Legal obligation** — where we are required to process data to comply with applicable law.',
    ],
  },
  {
    id:    'data-sharing',
    title: '5. Data Sharing',
    body: [
      'We share your data only with:',
      '**Resend** (resend.com) — our transactional email provider, used to deliver your contact form confirmation and our project proposals. Resend is SOC 2 Type II certified.',
      '**Vercel** — our hosting provider. Traffic data passes through Vercel\'s edge network. Vercel is GDPR compliant.',
      '**Google Analytics** — we use GA4 for anonymised website analytics. IP addresses are anonymised before processing.',
      'All third-party processors are bound by data processing agreements and are not permitted to use your data for their own purposes.',
    ],
  },
  {
    id:    'data-retention',
    title: '6. Data Retention',
    body: [
      'We retain contact enquiry data for up to 3 years from the date of submission, or for the duration of a client relationship, whichever is longer.',
      'Analytics data is retained for 14 months within Google Analytics.',
      'You may request deletion of your data at any time (see Your Rights below).',
    ],
  },
  {
    id:    'your-rights',
    title: '7. Your Rights',
    body: [
      'Under UK GDPR and EU GDPR, you have the right to:',
      '• **Access** the personal data we hold about you',
      '• **Rectify** inaccurate data',
      '• **Erase** your data ("right to be forgotten")',
      '• **Restrict** how we process your data',
      '• **Data portability** — receive your data in a structured, machine-readable format',
      '• **Object** to processing based on legitimate interests',
      '• **Withdraw consent** at any time where processing is consent-based',
      'To exercise any of these rights, email us at hello@elvatrixa.com. We will respond within 30 days.',
    ],
  },
  {
    id:    'cookies',
    title: '8. Cookies',
    body: [
      'We use cookies and similar tracking technologies on our website. For full details of the cookies we use and how to manage them, see our Cookie Policy.',
    ],
  },
  {
    id:    'security',
    title: '9. Security',
    body: [
      'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data in transit.',
      'No internet transmission is completely secure. If you have reason to believe your interaction with us is no longer secure, please notify us immediately at hello@elvatrixa.com.',
    ],
  },
  {
    id:    'changes',
    title: '10. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    id:    'contact',
    title: '11. Contact & Complaints',
    body: [
      'For any privacy-related questions or to exercise your rights, contact us at: hello@elvatrixa.com',
      'If you are unhappy with how we have handled your data and are based in the UK, you have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk. EU residents may contact their local supervisory authority.',
    ],
  },
]

export default function PrivacyPage() {
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
            Privacy Policy
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
                            .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-2)">$1</strong>')
                            .replace(/^(•\s)/, '<span style="color:var(--gold)">•</span> '),
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
                <Link href="/terms" className="font-body text-xs transition-colors duration-150 text-text-4 hover:text-gold">
                  Terms of Service
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
