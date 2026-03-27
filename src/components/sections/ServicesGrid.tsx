/* ================================================================
   ELVATRIXA — SERVICES GRID
   File: src/components/sections/ServicesGrid.tsx

   Pure Server Component — zero event handlers, zero 'use client'.
   All hover effects via Tailwind group-hover classes.
================================================================ */

import Link           from 'next/link'
import ScrollReveal   from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { services }   from '@/data/services'
import type { JSX }   from 'react'


/* ── INLINE SVG ICONS ────────────────────────────────────────── */

const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/>
      <rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
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


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function ServicesGrid() {
  return (
    <section className="section-pad bg-navy">
      <div className="section-container">

        {/* ── Heading ── */}
        <ScrollReveal>
          <SectionHeading
            label="What we build"
            heading="End-to-End Digital Solutions"
            subheading="From concept to scale — we deliver technology that drives measurable business outcomes for clients in the US, UK, and beyond."
            className="mb-14"
          />
        </ScrollReveal>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const IconComponent = ICONS[service.icon]
            const delay = (['', 'reveal-delay-1','reveal-delay-2','reveal-delay-3','reveal-delay-4'] as const)[Math.min((i % 4) + 1, 4)]

            return (
              <ScrollReveal key={service.slug} delay={delay} variant="scale">
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <article
                    className={[
                      /* Base */
                      'relative h-full flex flex-col p-6 rounded-lg overflow-hidden',
                      /* Background & border */
                      'bg-navy-3',
                      'border border-border-subtle border-t-gold-border',
                      /* Hover — pure CSS, no JS needed */
                      'transition-[border-color,transform,box-shadow] duration-normal ease-luxury',
                      'hover:border-gold-border hover:-translate-y-1 hover:shadow-card-hover',
                    ].join(' ')}
                  >

                    {/* ── Icon ── */}
                    <div
                      className={[
                        'flex items-center justify-center w-11 h-11 rounded-md mb-5 shrink-0',
                        'bg-gold-dim border border-gold-border text-gold',
                        'transition-colors duration-normal',
                        'group-hover:bg-gold group-hover:text-navy-0',
                      ].join(' ')}
                    >
                      {IconComponent ? <IconComponent /> : null}
                    </div>

                    {/* ── Title ── */}
                    <h3 className="font-body font-bold text-base text-text-1 mb-1 leading-snug">
                      {service.title}
                    </h3>

                    {/* ── Tagline ── */}
                    <p className="font-mono text-[11px] text-gold tracking-[0.06em] mb-4">
                      {service.tagline}
                    </p>

                    {/* ── Description ── */}
                    <p className="font-body text-sm text-text-3 leading-relaxed mb-5 flex-1">
                      {service.description}
                    </p>

                    {/* ── Tech tags ── */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="badge">{tag}</span>
                      ))}
                    </div>

                    {/* ── Learn more ── */}
                    <div className="flex items-center gap-1.5 mt-auto font-body text-xs font-bold uppercase tracking-wider text-gold group-hover:gap-2.5 transition-all duration-200">
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

        {/* ── Bottom CTA ── */}
        <ScrollReveal className="mt-12 text-center">
          <p className="font-body text-sm text-text-3 mb-4">
            Not sure which service you need?
          </p>
          <Link href="/contact" className="btn-secondary">
            Book a free discovery call
          </Link>
        </ScrollReveal>

      </div>
    </section>
  )
}