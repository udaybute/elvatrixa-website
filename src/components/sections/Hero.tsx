'use client'

import Link            from 'next/link'
import { stats }       from '@/data/stats'
import AnimatedCounter from '@/components/ui/AnimatedCounter'


/* ── Inline icons ──────────────────────────────────────────── */

const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7.5h9M9 4l3 3.5L9 11" />
  </svg>
)

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10L10 3M10 3H5M10 3v5" />
  </svg>
)

const ShieldCheck = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 1L2 2.5v3c0 2.2 1.5 3.5 3.5 4.5 2-.9 3.5-2.3 3.5-4.5v-3L5.5 1z"/>
    <path d="M3.5 5.5l1.5 1.5 2.5-2.5"/>
  </svg>
)

const TagIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1h4l4.5 4.5a1 1 0 0 1 0 1.4L7 9.5a1 1 0 0 1-1.4 0L1 5V1z"/>
    <circle cx="3" cy="3" r="0.7" fill="currentColor" stroke="none"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="5.5" r="4.5"/>
    <path d="M5.5 3v2.5l1.5 1"/>
  </svg>
)


/* ── Results card — social proof above the fold ────────────── */
/*
  Shows the e-commerce case study result prominently.
  Gives visitors immediate proof of ROI before they scroll.
*/

function ResultsCard() {
  const metrics = [
    { value: '+89%',  label: 'Revenue uplift'  },
    { value: '+41%',  label: 'Mobile checkout' },
    { value: '9 wks', label: 'Brief to launch' },
  ]

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:  'var(--bg-3)',
        border:      '1px solid var(--border-subtle)',
        boxShadow:   '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.05)',
      }}
    >
      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold-border) 20%, var(--gold) 50%, var(--gold-border) 80%, transparent 100%)',
        }}
      />

      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--teal)' }}
          />
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: 'var(--text-4)' }}
          >
            Recent Result
          </span>
        </div>
        <span className="badge badge-teal">E-Commerce</span>
      </div>

      {/* Main metric */}
      <div className="px-5 pt-5 pb-4">
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--text-4)' }}
        >
          Conversion Rate
        </p>
        <div className="flex items-end gap-3 mb-1">
          <span
            className="font-display font-bold leading-none"
            style={{ fontSize: 'clamp(38px, 5vw, 52px)', color: 'var(--gold)' }}
          >
            3.4%
          </span>
          <div className="mb-1.5">
            <span
              className="font-mono text-[10px] tracking-wider uppercase block"
              style={{ color: 'var(--text-4)' }}
            >
              from 1.8%
            </span>
            <span
              className="font-display font-bold text-lg"
              style={{ color: 'var(--teal)' }}
            >
              ↑ 89%
            </span>
          </div>
        </div>
        <p
          className="font-body text-xs"
          style={{ color: 'var(--text-4)' }}
        >
          Alden &amp; Roe · UK Fashion Brand
        </p>
      </div>

      {/* Supporting metrics */}
      <div
        className="grid grid-cols-3"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="flex flex-col items-center justify-center py-4 px-2 text-center"
            style={{
              borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            <span
              className="font-display font-bold leading-none mb-1"
              style={{ fontSize: '20px', color: 'var(--text-1)' }}
            >
              {m.value}
            </span>
            <span
              className="font-mono text-[9px] tracking-wider uppercase leading-tight"
              style={{ color: 'var(--text-4)' }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        className="px-5 py-4"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <Link
          href="/work/ecommerce-conversion-rebuild"
          className="flex items-center justify-between w-full group"
        >
          <span
            className="font-body text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--text-3)' }}
          >
            Alden &amp; Roe Case Study
          </span>
          <span
            className="flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2"
            style={{ color: 'var(--gold)' }}
          >
            Read <ArrowUpRight />
          </span>
        </Link>
      </div>

      {/* Decorative glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}


/* ── Hero ──────────────────────────────────────────────────── */
/*
  Premium 2-column hero:
  - Left  (55%): headline + sub-headline + CTAs + trust signals
  - Right (45%): ResultsCard — immediate proof of ROI above the fold

  Design decisions:
  - bg-0 (darkest) for maximum depth — content sections use bg-1+
  - Three layered background elements: main radial glow, secondary
    offset glow, dot grid texture
  - Full-width thin gold top-line to frame the section
  - Cormorant Garamond display at clamp(52→108px) — editorial luxury
  - Trust signals use icon + text rather than plain emoji
  - Stats strip uses vertical dividers and tabular numbers
*/
export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--bg-0)' }}
      aria-label="Elvatrixa hero"
    >

      {/* ── Top border accent line ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold-border) 25%, var(--gold) 50%, var(--gold-border) 75%, transparent 100%)',
        }}
      />

      {/* ── Background: main radial glow (top-center) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(201,168,76,0.16) 0%, transparent 65%)',
        }}
      />

      {/* ── Background: secondary glow (bottom-right, offset) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 85% 95%, rgba(29,184,160,0.04) 0%, transparent 60%)',
        }}
      />

      {/* ── Background: dot grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid-bg"
        style={{ opacity: 0.30 }}
      />

      {/* ── Background: bottom fade ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            'linear-gradient(to top, var(--bg-0) 0%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="section-container relative z-10 pt-32 pb-20">

        {/* Two-column grid — stacked on mobile, side-by-side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Eyebrow row */}
            <div className="animate-fade-up delay-0 flex flex-wrap items-center gap-3 mb-8">
              <span
                className="block h-px w-8"
                style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                aria-hidden="true"
              />
              <span className="section-label">Digital Innovation Studio</span>

              {/* Availability indicator */}
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(29,184,160,0.08)',
                  border: '1px solid rgba(29,184,160,0.20)',
                }}
              >
                <span
                  className="block w-1.5 h-1.5 rounded-full animate-pulse-gold"
                  style={{ background: 'var(--teal)' }}
                />
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: 'var(--teal)' }}
                >
                  Taking projects
                </span>
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="animate-fade-up delay-75 font-display font-bold mb-8"
              style={{
                fontSize:      'clamp(52px, 8vw, 104px)',
                lineHeight:    '0.93',
                letterSpacing: '-0.03em',
              }}
            >
              <span
                className="block"
                style={{ color: 'var(--text-1)' }}
              >
                We Engineer
              </span>
              <span className="block text-gold-gradient">
                Digital
              </span>
              <span className="block text-gold-gradient">
                Excellence.
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="animate-fade-up delay-150 font-body leading-relaxed mb-10 max-w-xl"
              style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-3)' }}
            >
              World-class SaaS platforms, AI automation, and high-converting
              digital products — built for ambitious businesses in the{' '}
              <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>US, UK,</span>
              {' '}and beyond. Every project is fixed-price and outcome-driven.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-225 flex flex-wrap items-center gap-3 mb-10">
              <Link href="/contact" className="btn-primary group">
                Book a Free Strategy Call
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </Link>
              <Link href="/work" className="btn-secondary">
                View Our Work
              </Link>
            </div>

            {/* Trust signals */}
            <div className="animate-fade-up delay-300 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {[
                { icon: <ShieldCheck />, label: 'GDPR Compliant' },
                { icon: <TagIcon />,    label: 'Fixed-Price Projects' },
                { icon: <ClockIcon />,  label: 'Reply Within 4 Hours' },
              ].map(item => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <span style={{ color: 'var(--text-4)' }}>{item.icon}</span>
                  <span
                    className="font-mono text-[10px] tracking-wider uppercase"
                    style={{ color: 'var(--text-4)' }}
                  >
                    {item.label}
                  </span>
                </span>
              ))}

              <span
                className="hidden md:block w-px h-3.5"
                style={{ background: 'var(--border-subtle)' }}
                aria-hidden="true"
              />

              {/* Geo badges */}
              {[
                { flag: '🇺🇸', label: 'US Clients' },
                { flag: '🇬🇧', label: 'UK Clients' },
              ].map(item => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <span className="text-sm leading-none" aria-hidden="true">{item.flag}</span>
                  <span
                    className="font-mono text-[10px] tracking-wider uppercase"
                    style={{ color: 'var(--text-4)' }}
                  >
                    {item.label}
                  </span>
                </span>
              ))}
            </div>

          </div>


          {/* ── RIGHT COLUMN — Results card ── */}
          <div className="hidden lg:block animate-fade-up delay-300">
            <ResultsCard />
          </div>

        </div>


        {/* ── Stats strip ── */}
        <div
          className="animate-fade-up delay-450 mt-20 pt-8 grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative flex flex-col gap-1.5 px-6 first:pl-0">
              {/* Vertical divider — between items on md+ */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px"
                  style={{ background: 'var(--border-subtle)' }}
                />
              )}
              <div
                className="font-display font-bold leading-none tabular-nums"
                style={{ fontSize: 'clamp(30px, 4vw, 46px)', color: 'var(--gold)' }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix ?? ''}
                  duration={2000}
                />
              </div>
              <span
                className="font-body text-xs tracking-wide"
                style={{ color: 'var(--text-4)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>


      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[9px] tracking-widest uppercase"
          style={{ color: 'var(--text-4)' }}
        >
          Scroll
        </span>
        <div className="animate-float">
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            style={{ color: 'var(--text-4)' }}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </div>

    </section>
  )
}
