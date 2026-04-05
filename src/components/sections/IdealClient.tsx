/* ================================================================
   ELVATRIXA — WHO WE WORK WITH (IDEAL CLIENT)
   File: src/components/sections/IdealClient.tsx

   Server Component — no 'use client'.
   Layout: Left statement + Right numbered criteria list.
   Light section (#F8F9FC) for contrast after dark FeaturedWork.
   All hover effects via Tailwind group-hover — no JS.
================================================================ */

import Link         from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'


/* ── Icons ──────────────────────────────────────────────────── */

const CheckCircle = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8.5" cy="8.5" r="7.5" />
    <path d="M5.5 8.5l2.25 2.25L11.5 6" />
  </svg>
)

const XMark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
)


/* ── Data ────────────────────────────────────────────────────── */

const CRITERIA = [
  {
    num:    '01',
    title:  'You have a real project budget',
    detail: 'Our engagements start at £8,000. You are investing in performance and outcomes — not looking for the lowest quote.',
  },
  {
    num:    '02',
    title:  'SaaS, e-commerce, or a digital product',
    detail: 'We specialise in web applications, Shopify stores, AI automation, and data platforms. Not print, not offline.',
  },
  {
    num:    '03',
    title:  '10–200 employees — US or UK based',
    detail: 'Growth-stage companies with commercial momentum and a clear direction. Bootstrapped or venture-funded.',
  },
  {
    num:    '04',
    title:  'The founder or operator is involved',
    detail: 'We do our best work when the person with context is in the room — not filtered through layers of management.',
  },
  {
    num:    '05',
    title:  'You want outcomes, not just deliverables',
    detail: 'We measure success by revenue lifted, conversion rates improved, or hours reclaimed — not pages shipped.',
  },
]

const NOT_A_FIT = [
  'Still deciding what you want to build',
  'Optimising purely on price, not ROI',
  'Expecting open-ended scope after sign-off',
]


/* ── Section ─────────────────────────────────────────────────── */

export default function IdealClient() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: '#F8F9FC' }}
    >
      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)',
          backgroundSize:  '36px 36px',
        }}
      />

      <div className="section-container relative z-10">

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Statement ──────────────────────────────── */}
          <ScrollReveal>
            <div>

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="h-px w-8 flex-shrink-0"
                  style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--gold)' }}
                >
                  Who We Work With
                </span>
              </div>

              {/* H2 */}
              <h2
                className="font-display font-bold mb-6"
                style={{
                  fontSize:      'clamp(32px, 3.5vw, 50px)',
                  color:         'var(--text-primary)',
                  lineHeight:    1.05,
                  letterSpacing: '-0.03em',
                }}
              >
                Built for<br />
                Ambitious<br />
                <span className="text-gold-gradient">Founders &amp; Operators</span>
              </h2>

              {/* Body */}
              <p
                className="font-body text-[15px] leading-relaxed mb-7"
                style={{ color: 'var(--text-secondary)' }}
              >
                We are not a generalist agency. We work exclusively with SaaS startups
                and growth-stage companies that are serious about digital performance —
                and we are selective because that is what produces great work.
              </p>

              {/* Honest callout */}
              <div
                className="rounded-xl p-5 mb-8"
                style={{
                  background: 'rgba(201,168,76,0.06)',
                  border:     '1px solid rgba(201,168,76,0.20)',
                }}
              >
                <p className="font-body text-[13.5px] leading-relaxed" style={{ color: '#374151' }}>
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    Not every project is right for us
                  </span>{' '}
                  — and we will tell you honestly if yours is not, and point you toward
                  someone better suited.
                </p>
              </div>

              {/* CTA */}
              <Link href="/contact" className="btn-primary">
                Book a 15-Min Discovery Call
              </Link>

              {/* Social proof note */}
              <p
                className="mt-4 font-mono text-[9.5px] tracking-[0.1em] uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                Free · No obligation · Response within 24 hours
              </p>

            </div>
          </ScrollReveal>


          {/* ── RIGHT: Numbered criteria ──────────────────────── */}
          <div className="flex flex-col gap-3">
            {CRITERIA.map((item, i) => (
              <ScrollReveal
                key={item.num}
                delay={`reveal-delay-${Math.min(i + 1, 5)}` as `reveal-delay-${number}`}
                variant="scale"
              >
                <div
                  className="group relative flex gap-5 p-6 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: '#FFFFFF',
                    border:     '1px solid #E5E7EB',
                  }}
                >
                  {/* Gold left accent bar — slides in on hover */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"
                    style={{ background: 'var(--gold)' }}
                  />

                  {/* Number badge */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono text-[11px] font-bold tracking-wider"
                    style={{
                      background: 'rgba(201,168,76,0.09)',
                      border:     '1px solid rgba(201,168,76,0.22)',
                      color:      '#C9A84C',
                    }}
                  >
                    {item.num}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span style={{ color: '#1DB8A0' }}>
                        <CheckCircle />
                      </span>
                      <h3
                        className="font-body font-bold text-[15px] leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className="font-body text-[13px] leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>


        {/* ── "Not a fit" strip ────────────────────────────────── */}
        <ScrollReveal className="mt-14">
          <div
            className="rounded-xl p-6 lg:p-8"
            style={{
              background: '#FFFFFF',
              border:     '1px solid #E5E7EB',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">

              {/* Label */}
              <div className="flex-shrink-0">
                <p
                  className="font-mono text-[9.5px] tracking-[0.15em] uppercase mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Probably not a fit
                </p>
                <p
                  className="font-display font-bold"
                  style={{
                    fontSize:      '20px',
                    color:         'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight:    1.2,
                  }}
                >
                  This isn&rsquo;t right for us if&hellip;
                </p>
              </div>

              {/* Vertical divider */}
              <div
                className="hidden lg:block self-stretch w-px flex-shrink-0"
                style={{ background: '#E5E7EB' }}
                aria-hidden="true"
              />

              {/* Items */}
              <div className="flex flex-col sm:flex-row gap-5 flex-1">
                {NOT_A_FIT.map(text => (
                  <div key={text} className="flex items-start gap-3 flex-1">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: 'rgba(156,163,175,0.12)',
                        border:     '1px solid rgba(156,163,175,0.25)',
                        color:      '#9CA3AF',
                      }}
                    >
                      <XMark />
                    </span>
                    <p
                      className="font-body text-[13.5px] leading-snug"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
