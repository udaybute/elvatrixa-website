/* ================================================================
   ELVATRIXA — SERVICES HUB PAGE
   File: src/app/services/page.tsx

   Pure Server Component — zero event handlers.

   FIX vs original: removed onMouseEnter/onMouseLeave from
   <article> — those are event handlers and crash in Server
   Components. All hover effects now via Tailwind group-hover.
================================================================ */

import type { Metadata }     from 'next'
import Link                  from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { services }          from '@/data/services'
import ScrollReveal          from '@/components/ui/ScrollReveal'
import SectionHeading        from '@/components/ui/SectionHeading'
import type { JSX }          from 'react'

export const metadata: Metadata = buildPageMetadata({
  title:       'Services',
  description:
    'Elvatrixa offers end-to-end digital services — SaaS development, AI automation, ' +
    'e-commerce, data analytics, UI/UX design, digital marketing, and more for US and UK businesses.',
  canonical:   '/services',
  keywords: [
    'SaaS development agency UK',
    'AI automation services',
    'e-commerce development UK',
    'digital services agency',
  ],
})


/* ── INLINE ICON MAP ─────────────────────────────────────────── */

const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l4 4 6-6"/>
  </svg>
)


/* ── PAGE ────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--bg-1)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-0)' }}
      >
        {/* Gold radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.14) 0%, transparent 65%)',
          }}
        />
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.13) 1px, transparent 1px)',
            backgroundSize:  '32px 32px',
          }}
        />

        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="block h-px w-8"
                style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
              />
              <span className="section-label">What we build</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-1">
            <h1
              className="font-display font-bold text-gold-gradient mb-6"
              style={{ fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: '0.95', letterSpacing: '-0.03em' }}
            >
              End-to-End<br />Digital Services
            </h1>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-2">
            <p
              className="font-body leading-relaxed max-w-2xl"
              style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-3)' }}
            >
              From concept to scale — every service Elvatrixa delivers is tied to a
              measurable business outcome. We are an end-to-end partner for US and UK
              businesses that demand results, not activity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon  = ICONS[service.icon]
              const delay = (['', 'reveal-delay-1', 'reveal-delay-2'] as const)[
                Math.min((i % 2) + 1, 2)
              ]

              return (
                <ScrollReveal key={service.slug} delay={delay}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    {/*
                      FIX: removed onMouseEnter/onMouseLeave.
                      Hover effects are now pure Tailwind:
                      - group-hover:-translate-y-1  → card lifts
                      - group-hover:border-t-gold   → top border brightens
                      - group-hover:shadow-card-hover → shadow appears
                      - group-hover:bg-gold / group-hover:text-navy-0 → icon fills
                    */}
                    <article
                      className={[
                        'relative h-full flex flex-col p-8 rounded-xl overflow-hidden',
                        'border border-[var(--border-subtle)] border-t-[3px] border-t-[color:var(--gold-border)]',
                        'transition-[transform,border-color,box-shadow] duration-300 ease-luxury',
                        'group-hover:-translate-y-1',
                        'group-hover:border-t-[color:var(--gold)]',
                        'group-hover:shadow-card-hover',
                      ].join(' ')}
                      style={{ background: 'var(--bg-3)' }}
                    >
                      {/* ── Icon + price row ── */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={[
                            'flex items-center justify-center w-12 h-12 rounded-lg',
                            'transition-all duration-300',
                            'group-hover:bg-gold group-hover:border-gold group-hover:text-navy-0',
                          ].join(' ')}
                          style={{
                            background: 'var(--gold-dim)',
                            border:     '1px solid var(--gold-border)',
                            color:      'var(--gold)',
                          }}
                        >
                          {Icon ? <Icon /> : null}
                        </div>

                        {service.startingFrom && (
                          <span
                            className="font-mono text-[11px] tracking-wider uppercase px-3 py-1.5 rounded"
                            style={{
                              background: 'var(--gold-dim)',
                              border:     '1px solid var(--gold-border)',
                              color:      'var(--gold)',
                            }}
                          >
                            {service.startingFrom}
                          </span>
                        )}
                      </div>

                      {/* ── Title + tagline ── */}
                      <h2
                        className="font-body font-bold text-xl mb-2 leading-snug"
                        style={{ color: 'var(--text-1)' }}
                      >
                        {service.title}
                      </h2>
                      <p
                        className="font-mono text-[11px] tracking-wider uppercase mb-4"
                        style={{ color: 'var(--gold)' }}
                      >
                        {service.tagline}
                      </p>

                      {/* ── Description ── */}
                      <p
                        className="font-body text-sm leading-relaxed mb-6"
                        style={{ color: 'var(--text-3)' }}
                      >
                        {service.description}
                      </p>

                      {/* ── Features ── */}
                      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }}>
                              <CheckIcon />
                            </span>
                            <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* ── Tech tags ── */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.tags.map((t) => (
                          <span key={t} className="badge">{t}</span>
                        ))}
                      </div>

                      {/* ── Divider ── */}
                      <div className="w-full h-px mb-5" style={{ background: 'var(--border-subtle)' }} />

                      {/* ── CTA ── */}
                      <div
                        className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-3"
                        style={{ color: 'var(--gold)' }}
                      >
                        Learn More
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          <ArrowRight />
                        </span>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        className="section-pad-sm"
        style={{
          background: 'var(--bg-2)',
          borderTop:  '1px solid var(--border-subtle)',
        }}
      >
        <div className="section-container text-center">
          <ScrollReveal>
            <p
              className="font-mono text-[11px] tracking-widest uppercase mb-4"
              style={{ color: 'var(--text-4)' }}
            >
              Not sure what you need?
            </p>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-1)' }}
            >
              Let&apos;s Define the Right Approach Together
            </h2>
            <p
              className="font-body text-sm mb-8 max-w-lg mx-auto"
              style={{ color: 'var(--text-3)' }}
            >
              Book a free 30-minute strategy call. We&apos;ll listen to your goals and
              recommend exactly what your project needs — no upselling.
            </p>
            <Link href="/contact" className="btn-primary">
              Book a Free Strategy Call
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}