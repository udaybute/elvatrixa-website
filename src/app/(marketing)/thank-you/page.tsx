/* ================================================================
   ELVATRIXA — THANK YOU PAGE
   File: src/app/(marketing)/thank-you/page.tsx

   Shown after successful form submission.
   Reads ?ref= query param to display the reference number.
   GA4 conversion event fires on mount via inline script.
================================================================ */

import type { Metadata }  from 'next'
import Link               from 'next/link'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title:    'Thank You — Brief Received',
  description: 'Your project brief has been received. Elvatrixa will respond within 4 business hours.',
  canonical: '/thank-you',
  noIndex:   true, /* Exclude from search index — conversion page only */
})

/* ── ICONS ───────────────────────────────────────────────────── */

const CheckCircle = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="32" cy="32" r="30" style={{ stroke: 'var(--gold)', opacity: 0.2 }} />
    <circle cx="32" cy="32" r="24" style={{ stroke: 'var(--gold)', opacity: 0.5 }} />
    <path d="M20 32l9 9 15-18" style={{ stroke: 'var(--gold)' }} strokeWidth="2.5" />
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* ── PAGE ────────────────────────────────────────────────────── */

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  /*
    Note: In Next.js 15, searchParams is a Promise.
    The ref is read server-side and passed to the page.
    We use a Suspense boundary approach via async params.
  */

  return (
    <>
      {/* GA4 conversion event — fires on page load */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && typeof gtag === 'function') {
              gtag('event', 'conversion', {
                event_category: 'Lead',
                event_label:    'Contact Form Submission',
                value:          1,
              });
              gtag('event', 'generate_lead', {
                currency: 'USD',
              });
            }
          `,
        }}
      />

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{ background: 'var(--bg-0)' }}
      >
        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.10) 0%, transparent 65%)',
          }}
        />

        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.20) 1px, transparent 1px)',
            backgroundSize:  '24px 24px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

          {/* Animated check icon */}
          <div className="mb-8 animate-fade-in">
            <CheckCircle />
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold mb-4 animate-fade-up"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.0', letterSpacing: '-0.025em', color: 'var(--text-1)' }}
          >
            Brief received. <br />
            <span className="text-gold-gradient">We&apos;re on it.</span>
          </h1>

          {/* Subtext */}
          <p
            className="font-body leading-relaxed mb-6 animate-fade-up delay-75"
            style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--text-3)' }}
          >
            Uday will review your project brief and reply with initial
            thoughts within <strong style={{ color: 'var(--text-2)' }}>4 business hours</strong>.
            You have also been sent a confirmation email.
          </p>

          {/* Reference number box */}
          <ThankYouRef searchParams={searchParams} />

          {/* What happens next */}
          <div
            className="w-full rounded-xl p-6 mb-8 text-left animate-fade-up delay-225"
            style={{ background: 'var(--bg-3)', border: '1px solid var(--border-subtle)' }}
          >
            <p className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--text-4)' }}>
              What happens next
            </p>
            <div className="flex flex-col gap-4">
              {[
                { step: '01', title: 'Personal review',  body: 'Uday reviews your brief and prepares a tailored response — no templates.' },
                { step: '02', title: 'Written proposal', body: 'A detailed fixed-price proposal lands in your inbox within 48 hours.' },
                { step: '03', title: 'Discovery call',   body: 'We jump on a 30-minute call to align on scope, timeline, and any questions.' },
              ].map(item => (
                <div key={item.step} className="flex items-start gap-3">
                  <span
                    className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full font-mono text-xs font-bold mt-0.5"
                    style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', color: 'var(--gold)' }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p className="font-body font-bold text-sm mb-0.5" style={{ color: 'var(--text-1)' }}>{item.title}</p>
                    <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent? WhatsApp CTA */}
          <div
            className="w-full rounded-xl p-5 mb-8 flex items-center justify-between gap-4 animate-fade-up delay-300"
            style={{ background: 'rgba(29,184,160,0.06)', border: '1px solid rgba(29,184,160,0.20)' }}
          >
            <div>
              <p className="font-body font-bold text-sm mb-0.5" style={{ color: 'var(--teal-light)' }}>Need a faster reply?</p>
              <p className="font-body text-xs" style={{ color: 'var(--text-3)' }}>WhatsApp us directly for an immediate response.</p>
            </div>
            <a
              href="https://wa.me/918668296156?text=Hi%20Uday%2C%20I%20just%20submitted%20a%20brief%20and%20wanted%20to%20follow%20up."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 font-body text-sm font-bold px-4 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(29,184,160,0.12)',
                border:     '1px solid rgba(29,184,160,0.30)',
                color:      'var(--teal-light)',
              }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-375">
            <Link href="/" className="flex items-center gap-1.5 font-body text-sm transition-colors duration-150 hover:text-gold" style={{ color: 'var(--text-3)' }}>
              ← Back to homepage
            </Link>
            <span style={{ color: 'var(--border-subtle)' }}>|</span>
            <Link href="/work" className="flex items-center gap-1.5 font-body text-sm transition-colors duration-150 hover:text-gold" style={{ color: 'var(--text-3)' }}>
              View our work <ArrowRight />
            </Link>
            <span style={{ color: 'var(--border-subtle)' }}>|</span>
            <Link href="/blog" className="flex items-center gap-1.5 font-body text-sm transition-colors duration-150 hover:text-gold" style={{ color: 'var(--text-3)' }}>
              Read the blog <ArrowRight />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

/* ── ASYNC REF COMPONENT ─────────────────────────────────────── */
/*
  Reads the ?ref= query param asynchronously (Next.js 15 pattern).
  Shows a reference number card if ref is present.
*/

async function ThankYouRef({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams

  if (!ref) return null

  return (
    <div
      className="w-full rounded-lg p-4 mb-6 animate-fade-up delay-150"
      style={{
        background: 'var(--gold-dim)',
        border:     '1px solid var(--gold-border)',
      }}
    >
      <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--text-4)' }}>
        Your reference number
      </p>
      <p className="font-mono text-lg font-bold tracking-widest" style={{ color: 'var(--gold)' }}>
        {ref}
      </p>
      <p className="font-body text-xs mt-1" style={{ color: 'var(--text-4)' }}>
        Quote this in any correspondence with us.
      </p>
    </div>
  )
}