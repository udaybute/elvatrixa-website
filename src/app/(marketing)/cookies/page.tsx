/* ================================================================
   ELVATRIXA — COOKIE POLICY PAGE
   File: src/app/(marketing)/cookies/page.tsx
================================================================ */

import type { Metadata } from 'next'
import Link              from 'next/link'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title:       'Cookie Policy',
  description: 'How Elvatrixa uses cookies and similar technologies on its website. Manage your preferences.',
  canonical:   '/cookies',
  noIndex:     false,
})

const LAST_UPDATED = '1 January 2025'

const cookieTable = [
  {
    name:     '_ga',
    provider: 'Google Analytics',
    purpose:  'Distinguishes unique users by assigning a randomly generated number as a client identifier.',
    expiry:   '2 years',
    type:     'Analytics',
  },
  {
    name:     '_ga_*',
    provider: 'Google Analytics (GA4)',
    purpose:  'Persists session state for Google Analytics 4.',
    expiry:   '2 years',
    type:     'Analytics',
  },
  {
    name:     '__vercel_live_token',
    provider: 'Vercel',
    purpose:  'Used by Vercel for preview deployment access control. Not set in production.',
    expiry:   'Session',
    type:     'Technical',
  },
]

const sections = [
  {
    id:    'what-are-cookies',
    title: '1. What Are Cookies?',
    body: [
      'Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites work, improve user experience, and provide information to the website\'s owners.',
      'Similar technologies such as local storage and session storage may also be used for equivalent purposes.',
    ],
  },
  {
    id:    'cookies-we-use',
    title: '2. Cookies We Use',
    body: [
      'We use only essential and analytics cookies on elvatrixa.com. We do not use advertising, retargeting, or social media tracking cookies.',
    ],
  },
  {
    id:    'cookie-categories',
    title: '3. Cookie Categories',
    body: [
      '**Strictly Necessary** — These cookies are required for the website to function correctly. They cannot be disabled without affecting site functionality. No consent is required for these cookies.',
      '**Analytics** — These cookies help us understand how visitors interact with our website — which pages are popular, how long visitors stay, and where they come from. This data is aggregated and anonymised. We use Google Analytics 4 with IP anonymisation enabled.',
      'We do not currently use functional, preference, marketing, or third-party social media cookies.',
    ],
  },
  {
    id:    'managing-cookies',
    title: '4. Managing Your Cookie Preferences',
    body: [
      'You can control and delete cookies at any time through your browser settings. Here is how to manage cookies in popular browsers:',
      '• **Google Chrome** — Settings → Privacy and security → Cookies and other site data',
      '• **Safari** — Preferences → Privacy → Manage Website Data',
      '• **Firefox** — Settings → Privacy & Security → Cookies and Site Data',
      '• **Microsoft Edge** — Settings → Cookies and site permissions → Cookies and site data',
      'Please note that disabling analytics cookies will not affect your ability to use the website, but it will prevent us from improving it based on usage data.',
      'To opt out of Google Analytics across all websites, you can install the Google Analytics Opt-out Browser Add-on at tools.google.com/dlpage/gaoptout.',
    ],
  },
  {
    id:    'third-party',
    title: '5. Third-Party Services',
    body: [
      'Some features of our website use third-party services that may set their own cookies. We only use third-party services that are necessary for site functionality or analytics. These are listed in the cookie table above.',
      'Elvatrixa has no control over third-party cookies. Please review the privacy policies of these third-party services for more information.',
    ],
  },
  {
    id:    'changes',
    title: '6. Changes to This Policy',
    body: [
      'We may update this Cookie Policy from time to time. Changes will be reflected by updating the "Last Updated" date above. We recommend checking this page periodically.',
    ],
  },
  {
    id:    'contact',
    title: '7. Contact',
    body: [
      'If you have questions about our use of cookies, please contact us at: hello@elvatrixa.com',
    ],
  },
]

export default function CookiesPage() {
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
            Cookie Policy
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
              {sections.map((s, si) => (
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

                  {/* Cookie table after section 2 */}
                  {si === 1 && (
                    <div className="mt-6 overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-subtle)' }}>
                      <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: 'var(--bg-3)', borderBottom: '1px solid var(--border-subtle)' }}>
                            {['Name', 'Provider', 'Purpose', 'Expiry', 'Type'].map(h => (
                              <th
                                key={h}
                                className="font-mono text-[10px] tracking-wider uppercase px-4 py-3"
                                style={{ color: 'var(--text-4)' }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cookieTable.map((row, ri) => (
                            <tr
                              key={row.name}
                              style={{
                                background: ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg-3)',
                                borderBottom: ri < cookieTable.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                              }}
                            >
                              <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--gold)', whiteSpace: 'nowrap' }}>{row.name}</td>
                              <td className="px-4 py-3 font-body text-xs" style={{ color: 'var(--text-2)' }}>{row.provider}</td>
                              <td className="px-4 py-3 font-body text-xs" style={{ color: 'var(--text-3)', minWidth: '200px' }}>{row.purpose}</td>
                              <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{row.expiry}</td>
                              <td className="px-4 py-3">
                                <span className="badge">{row.type}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                <Link href="/terms" className="font-body text-xs transition-colors duration-150 text-text-4 hover:text-gold">
                  Terms of Service
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
