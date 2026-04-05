/* ================================================================
   ELVATRIXA — SERVICES GRID
   File: src/components/sections/ServicesGrid.tsx

   Pure Server Component — zero event handlers, zero 'use client'.
   Hover effects: Tailwind group-hover only.

   Images: Unsplash placeholders — swap for branded photography
   before go-live. Update SERVICE_IMAGES map below.
================================================================ */

import Image          from 'next/image'
import Link           from 'next/link'
import ScrollReveal   from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { services }   from '@/data/services'
import type { JSX }   from 'react'


/* ── Placeholder images — replace with final assets ─────────── */
/*
  Keys match the `icon` field in /data/services.ts.
  Swap any URL with your own CDN path or Sanity image reference.
*/
const SERVICE_IMAGES: Record<string, string> = {
  Settings2:
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=75',
  Bot:
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=75',
  ShoppingBag:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=75',
  BarChart3:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75',
  Layers:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=75',
  Megaphone:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75',
  Zap:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=75',
  Shield:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75',
}


/* ── SVG icons ────────────────────────────────────────────────── */

const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/>
      <rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5h9M8 3.5l3 3-3 3"/>
  </svg>
)


/* ── Section ──────────────────────────────────────────────────── */

export default function ServicesGrid() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-page)' }}>
      <div className="section-container">

        {/* Heading */}
        <ScrollReveal>
          <SectionHeading
            label="What we build"
            heading="End-to-End Digital Solutions"
            subheading="From concept to scale — we deliver technology that drives measurable business outcomes for clients in the US, UK, and beyond."
            className="mb-14"
          />
        </ScrollReveal>

        {/* Grid — 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon  = ICONS[service.icon]
            const image = SERVICE_IMAGES[service.icon]
            const delay = (
              ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'] as const
            )[Math.min((i % 4) + 1, 4)]

            return (
              <ScrollReveal key={service.slug} delay={delay} variant="scale">
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <article className="relative h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">

                    {/* ── Image header ─────────────────────────── */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
                      <Image
                        src={image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Bottom gradient — readability for badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                      {/* Starting price — bottom-right of image */}
                      <span
                        className="absolute bottom-3 right-3 font-mono text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1 backdrop-blur-sm"
                        style={{
                          background: 'rgba(6,13,26,0.78)',
                          border:     '1px solid rgba(201,168,76,0.4)',
                          color:      '#C9A84C',
                        }}
                      >
                        {service.startingFrom}
                      </span>

                      {/* Service category — bottom-left of image */}
                      <span
                        className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest uppercase"
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                      >
                        {service.tags[0]}
                      </span>
                    </div>

                    {/* ── Gold slide-in divider on hover ────────── */}
                    <div
                      className="h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{ background: 'var(--gold)' }}
                    />

                    {/* ── Content ───────────────────────────────── */}
                    <div className="flex flex-col flex-1 p-5">

                      {/* Icon + title */}
                      <div className="flex items-start gap-3 mb-3">
                        {/* Icon — fills with gold on hover */}
                        <div className="flex-shrink-0 w-9 h-9 mt-0.5 rounded-lg flex items-center justify-center transition-all duration-300 bg-gold-dim border border-gold-border text-gold group-hover:bg-gold group-hover:text-navy">
                          {Icon && <Icon />}
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="font-body font-bold text-[14.5px] leading-snug"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {service.title}
                          </h3>
                          <p
                            className="font-mono text-[9.5px] tracking-[0.07em] mt-0.5 uppercase"
                            style={{ color: 'var(--gold)' }}
                          >
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Description — clamped to 3 lines */}
                      <p className="font-body text-[13px] leading-relaxed mb-4 flex-1 line-clamp-3" style={{ color: '#6B7280' }}>
                        {service.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="font-mono text-[9.5px] tracking-wide rounded-full px-2.5 py-0.5"
                            style={{
                              background: 'rgba(10,22,40,0.05)',
                              color:      'rgba(10,22,40,0.55)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                        <span
                          className="flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
                          style={{ color: 'var(--gold)' }}
                        >
                          Explore Service
                          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                            <ArrowRight />
                          </span>
                        </span>
                      </div>

                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="mt-14 text-center">
          <p className="font-body text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Not sure which service fits your project?
          </p>
          <Link href="/contact" className="btn-secondary">
            Book a free discovery call
          </Link>
        </ScrollReveal>

      </div>
    </section>
  )
}
