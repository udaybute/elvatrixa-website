/* ================================================================
   ELVATRIXA — SERVICES GRID (REDESIGN)
   File: src/components/sections/ServicesGrid.tsx

   Pure Server Component — zero event handlers, zero 'use client'.
   Dark theme matching reference design.
   Mobile-responsive via inline CSS + Tailwind.
================================================================ */

import Image          from 'next/image'
import Link           from 'next/link'
import ScrollReveal   from '@/components/ui/ScrollReveal'
import { services }   from '@/data/services'
import type { JSX }   from 'react'

/* ── Service card images (dark/tech aesthetic) ───────────────── */
const SERVICE_IMAGES: Record<string, string> = {
  Settings2:   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=75',
  Bot:         'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=75',
  ShoppingBag: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=75',
  BarChart3:   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=75',
  Layers:      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=75',
  Megaphone:   'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=75',
  Zap:         'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=75',
  Shield:      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=75',
}

/* ── Per-card accent colours matching the reference ─────────── */
const SERVICE_ACCENTS: Record<string, { color: string; glow: string }> = {
  Settings2:   { color: '#8B5CF6', glow: 'rgba(139,92,246,0.25)' },
  Bot:         { color: '#3B82F6', glow: 'rgba(59,130,246,0.25)'  },
  ShoppingBag: { color: '#F59E0B', glow: 'rgba(245,158,11,0.25)'  },
  BarChart3:   { color: '#10B981', glow: 'rgba(16,185,129,0.25)'  },
  Layers:      { color: '#EC4899', glow: 'rgba(236,72,153,0.25)'  },
  Megaphone:   { color: '#F59E0B', glow: 'rgba(245,158,11,0.25)'  },
  Zap:         { color: '#06B6D4', glow: 'rgba(6,182,212,0.25)'   },
  Shield:      { color: '#10B981', glow: 'rgba(16,185,129,0.25)'  },
}

/* ── Left-panel value propositions ──────────────────────────── */
const VALUE_PROPS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Strategy First Approach',
    desc:  'We start with your goals and build solutions that deliver real impact.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      </svg>
    ),
    title: 'Modern. Scalable. Secure.',
    desc:  'Future-ready technology that grows with your business.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Trusted by Businesses',
    desc:  'Long-term partnerships built on results, transparency, and trust.',
  },
]

/* ── Stats ───────────────────────────────────────────────────── */
const STATS = [
  { value: '50+',  label: 'Projects Delivered',  color: '#8B5CF6',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  { value: '30+',  label: 'Happy Clients',        color: '#3B82F6',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  },
  { value: '100%', label: 'Client Satisfaction',  color: '#EC4899',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  },
  { value: '24/7', label: 'Support Available',    color: '#10B981',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  },
]

/* ── Icons ───────────────────────────────────────────────────── */
const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5h9M8 3.5l3 3-3 3"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
  </svg>
)

/* ════════════════════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════════════════════ */

export default function ServicesGrid() {
  return (
    <>
      {/* Responsive styles */}
      <style>{`
        .sg-section   { background: #0B0F1A; }
        .sg-wrap      { max-width: 1280px; margin: 0 auto; padding: 72px 24px; }

        /* ── Top panel: left copy + right grid ── */
        .sg-top       { display: grid; grid-template-columns: 320px 1fr; gap: 48px; align-items: start; margin-bottom: 0; }
        @media (max-width: 1024px) { .sg-top { grid-template-columns: 1fr; gap: 40px; } }

        /* ── Service cards grid ── */
        .sg-grid      { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 1100px) { .sg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .sg-grid { grid-template-columns: 1fr; } }

        /* ── Stats strip ── */
        .sg-stats     { display: grid; grid-template-columns: repeat(4, 1fr) auto; margin-top: 48px; border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); }
        @media (max-width: 900px)  { .sg-stats { grid-template-columns: repeat(2, 1fr); } .sg-stats-cta { grid-column: 1 / -1; border-left: none !important; border-top: 1px solid rgba(255,255,255,0.07) !important; } }
        @media (max-width: 480px)  { .sg-stats { grid-template-columns: repeat(2, 1fr); } }

        /* ── Card hover ── */
        .sg-card      { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .sg-card:hover { transform: translateY(-4px); }

        /* ── Left panel ── */
        .sg-left-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 48px; }
        @media (max-width: 1024px) { .sg-left-grid { display: none; } }

        /* ── CTA row ── */
        .sg-cta-row    { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

        /* ── Grid header (right column top) ── */
        .sg-grid-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }

        /* ── Value prop list ── */
        .sg-vp-list    { display: flex; flex-direction: column; gap: 16px; margin-top: 28px; }
        @media (max-width: 1024px) { .sg-vp-list { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; } }
        @media (max-width: 640px)  { .sg-vp-list { grid-template-columns: 1fr; } }
      `}</style>

      <section className="sg-section">
        <div className="sg-wrap">

          {/* ════════════════════════════════════════
              TOP: LEFT COPY  +  RIGHT SERVICE GRID
          ════════════════════════════════════════ */}
          <div className="sg-top">

            {/* ── LEFT PANEL ── */}
            <div>
              <ScrollReveal>
                {/* Label */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px',
                  padding: '5px 14px', borderRadius: '999px',
                  border: '1px solid rgba(201,168,76,0.35)', background: 'rgba(201,168,76,0.07)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#C9A84C' }}>
                    What We Build
                  </span>
                </div>

                {/* Headline */}
                <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, lineHeight: 1.1,
                  letterSpacing: '-0.025em', color: '#F8FAFC', margin: '0 0 16px' }}>
                  Digital Solutions<br />That Drive Real<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #C9A84C 0%, #F0D98A 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>Business Growth</span>
                </h2>

                {/* Sub */}
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(248,250,252,0.48)', margin: '0 0 0' }}>
                  From concept to scale — we deliver technology that drives measurable business outcomes for clients in the US, UK, and beyond.
                </p>
              </ScrollReveal>

              {/* Value props */}
              <ScrollReveal delay="reveal-delay-1">
                <div className="sg-vp-list">
                  {VALUE_PROPS.map(vp => (
                    <div key={vp.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.22)',
                        color: '#C9A84C',
                      }}>
                        {vp.icon}
                      </div>
                      <div>
                        <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>{vp.title}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'rgba(248,250,252,0.42)', lineHeight: 1.5 }}>{vp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTA buttons */}
              <ScrollReveal delay="reveal-delay-2">
                <div className="sg-cta-row">
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 22px', borderRadius: '10px', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)',
                    color: '#0B0F1A', fontWeight: 700, fontSize: '13px',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    boxShadow: '0 6px 24px rgba(201,168,76,0.35)', transition: 'all 0.25s',
                  }}>
                    Book a Free Discovery Call
                    <PhoneIcon />
                  </Link>
                  <Link href="/work" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 20px', borderRadius: '10px', textDecoration: 'none',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)',
                    color: '#F8FAFC', fontWeight: 700, fontSize: '13px',
                    letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'all 0.25s',
                  }}>
                    View Our Work
                    <ArrowRight />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* ── RIGHT PANEL: grid header + service cards ── */}
            <div>
              {/* Grid header */}
              <ScrollReveal>
                <div className="sg-grid-header">
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>
                      Our Core Services
                    </p>
                    <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', borderRadius: '2px' }} />
                  </div>
                  <Link href="/services" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '12px', fontWeight: 700, color: '#C9A84C',
                    textDecoration: 'none', letterSpacing: '0.04em',
                    fontFamily: 'monospace', textTransform: 'uppercase',
                  }}>
                    Explore All Services <ArrowRight />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Service cards 4-col grid */}
              <div className="sg-grid">
                {services.map((service, i) => {
                  const Icon   = ICONS[service.icon]
                  const image  = SERVICE_IMAGES[service.icon]
                  const accent = SERVICE_ACCENTS[service.icon] ?? { color: '#8B5CF6', glow: 'rgba(139,92,246,0.25)' }
                  const delay  = (['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'] as const)[Math.min((i % 4) + 1, 4)]

                  return (
                    <ScrollReveal key={service.slug} delay={delay} variant="scale">
                      <Link
                        href={`/services/${service.slug}`}
                        style={{ display: 'block', height: '100%', textDecoration: 'none' }}
                        className="group"
                        aria-label={`Explore ${service.title}`}
                      >
                        <article
                          className="sg-card"
                          style={{ '--accent': accent.color, '--glow': accent.glow } as React.CSSProperties}
                        >
                          {/* Image */}
                          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#0F172A' }}>
                            <Image
                              src={image}
                              alt={service.title}
                              fill
                              sizes="(max-width:560px) 100vw, (max-width:1100px) 50vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Dark overlay with accent tint */}
                            <div style={{
                              position: 'absolute', inset: 0,
                              background: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(11,15,26,0.85) 100%)`,
                            }} />
                            {/* Glow on hover via border bottom */}
                            <div
                              className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                              style={{ background: `linear-gradient(90deg, ${accent.color}, transparent)` }}
                            />
                          </div>

                          {/* Body */}
                          <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {/* Icon */}
                            <div style={{
                              width: '32px', height: '32px', borderRadius: '8px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              marginBottom: '10px', flexShrink: 0,
                              background: `${accent.color}18`,
                              border: `1px solid ${accent.color}35`,
                              color: accent.color,
                            }}>
                              {Icon && <Icon />}
                            </div>

                            {/* Title */}
                            <h3 style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 700, color: '#F0F4FF', lineHeight: 1.3 }}>
                              {service.title}
                            </h3>

                            {/* Description */}
                            <p style={{ margin: '0 0 14px', fontSize: '12px', color: 'rgba(248,250,252,0.42)', lineHeight: 1.55, flex: 1,
                              display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {service.description}
                            </p>

                            {/* CTA */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '10px',
                              borderTop: `1px solid rgba(255,255,255,0.06)` }}>
                              <span style={{
                                fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em',
                                textTransform: 'uppercase', color: accent.color,
                                display: 'flex', alignItems: 'center', gap: '5px',
                              }}>
                                Explore Service <ArrowRight />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </div>


          {/* ════════════════════════════════════════
              STATS STRIP + CTA BOX
          ════════════════════════════════════════ */}
          
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          PORTFOLIO — Real Projects. Real Results.
      ════════════════════════════════════════════════════════ */}
      <style>{`
        .pf-section  { background: #060D1A; border-top: 1px solid rgba(255,255,255,0.05); }
        .pf-wrap     { max-width: 1280px; margin: 0 auto; padding: 72px 24px; }
        .pf-hero-card { position: relative; overflow: hidden; border-radius: 20px;
          border: 1px solid rgba(201,168,76,0.18); min-height: 340px;
          display: flex; align-items: flex-end;
          transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .pf-hero-card:hover { transform: translateY(-4px); box-shadow: 0 24px 64px rgba(0,0,0,0.5); }
        .pf-mini-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-top: 14px; }
        @media (max-width: 1024px) { .pf-mini-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px)  { .pf-mini-grid { grid-template-columns: 1fr; } }
        .pf-mini-card { position: relative; overflow: hidden; border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.025);
          display: flex; flex-direction: column;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease; }
        .pf-mini-card:hover { transform: translateY(-4px); border-color: rgba(201,168,76,0.3);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
        .pf-cta-block { margin-top: 56px; border-radius: 20px; overflow: hidden; position: relative;
          padding: 56px 48px; text-align: center;
          background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(6,13,26,0.98) 65%);
          border: 1px solid rgba(201,168,76,0.2); }
        .pf-cta-btns { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px; }
        @media (max-width: 600px) { .pf-cta-block { padding: 40px 24px; } }
      `}</style>

      <section className="pf-section">
        <div className="pf-wrap">

          {/* Section header */}
          <ScrollReveal>
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', borderRadius: '2px' }} />
                <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(201,168,76,0.75)' }}>
                  Portfolio
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800,
                    lineHeight: 1.05, letterSpacing: '-0.025em', color: '#F8FAFC' }}>
                    Real Projects.{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #C9A84C 0%, #F0D98A 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Real Results.</span>
                  </h2>
                  <p style={{ margin: 0, fontSize: '15px', color: 'rgba(248,250,252,0.45)', lineHeight: 1.65, maxWidth: '560px' }}>
                    We design high-converting websites that help businesses attract customers and grow faster.
                    Every project below is live, proven, and built to generate leads.
                  </p>
                </div>
                <Link href="/work" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px', flexShrink: 0,
                  fontSize: '12px', fontWeight: 700, color: '#C9A84C', textDecoration: 'none',
                  fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '9px 18px', borderRadius: '8px',
                  border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.06)',
                  transition: 'all 0.2s',
                }}>
                  View All Projects
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6.5h9M8 3.5l3 3-3 3"/>
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero card — first project */}
          <ScrollReveal>
            <a
              href="https://modern-hospital-demo-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="pf-hero-card"
              aria-label="View Modern Hospital live demo"
              style={{ display: 'flex' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80"
                alt="Modern Hospital Website"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(105deg, rgba(6,13,26,0.94) 38%, rgba(6,13,26,0.45) 100%)',
              }} />
              {/* Gold bottom border reveal */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, #C9A84C, #F0D98A 50%, transparent)',
              }} />
              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
                  <div style={{ maxWidth: '520px' }}>
                    <span style={{
                      display: 'inline-block', marginBottom: '12px',
                      fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.14em',
                      textTransform: 'uppercase', fontWeight: 700,
                      padding: '4px 12px', borderRadius: '999px',
                      background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C',
                    }}>
                      ✦ Lead Generating Website
                    </span>
                    <p style={{ margin: '0 0 4px', fontSize: '10.5px', fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>
                      Healthcare
                    </p>
                    <h3 style={{ margin: '0 0 10px', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                      Modern Hospital Website
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, maxWidth: '420px' }}>
                      A high-converting hospital website designed to drive patient appointments and build institutional trust — fast, accessible, and SEO-optimised.
                    </p>
                  </div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', flexShrink: 0,
                    padding: '13px 24px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)',
                    color: '#060D1A', fontWeight: 700, fontSize: '13px',
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    boxShadow: '0 6px 24px rgba(201,168,76,0.4)',
                  }}>
                    View Live Demo
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 11L11 2M11 2H6M11 2v5"/>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </ScrollReveal>

          {/* Mini cards — remaining 4 projects */}
          <div className="pf-mini-grid">
            {[
              {
                title: 'Ethereal Wellness Clinic', tag: 'Clinic', highlight: 'Premium Modern UI',
                image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=75',
                demo: 'https://ethereal-clinic.vercel.app/',
                desc: 'Luxury clinic experience that turns browsers into booked consultations.',
                accent: '#8B5CF6',
              },
              {
                title: 'Dental Clinic Pro', tag: 'Dental', highlight: 'Conversion Optimised',
                image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=700&q=75',
                demo: 'https://dental-clinic-pi-six.vercel.app/',
                desc: 'Clean dental practice website engineered to increase new patient enquiries.',
                accent: '#EC4899',
              },
              {
                title: 'Green Solution', tag: 'Sustainability', highlight: 'Brand-Forward Design',
                image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=75',
                demo: 'https://greensolution-demo-website.vercel.app/',
                desc: 'Bold eco brand presence that communicates environmental credibility at a glance.',
                accent: '#10B981',
              },
              {
                title: 'Manufacturing Website', tag: 'Manufacturing', highlight: 'B2B Lead Engine',
                image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=700&q=75',
                demo: 'https://manufacturing-website-akvy.vercel.app/',
                desc: 'Industrial web presence built to attract B2B clients with credibility signals.',
                accent: '#F59E0B',
              },
            ].map((p, i) => (
              <ScrollReveal
                key={p.demo}
                delay={(['reveal-delay-1','reveal-delay-2','reveal-delay-3','reveal-delay-4'] as const)[i]}
                variant="scale"
              >
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-mini-card group"
                  aria-label={`View live demo of ${p.title}`}
                  style={{ display: 'flex', textDecoration: 'none', height: '100%' }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:560px) 100vw, (max-width:1024px) 50vw, 25vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      className="group-hover:scale-105"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(6,13,26,0.75) 100%)' }} />
                    {/* Tag */}
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.1em',
                      textTransform: 'uppercase', fontWeight: 700,
                      padding: '3px 9px', borderRadius: '999px',
                      background: 'rgba(6,13,26,0.75)', border: `1px solid ${p.accent}45`, color: p.accent,
                    }}>
                      {p.tag}
                    </span>
                  </div>
                  {/* Bottom border slide */}
                  <div style={{
                    height: '2px', background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                    transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 0.4s ease',
                  }}
                    className="group-hover:scale-x-100"
                  />
                  {/* Body */}
                  <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{
                      alignSelf: 'flex-start', fontSize: '8.5px', fontFamily: 'monospace',
                      letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
                      padding: '3px 8px', borderRadius: '999px',
                      background: `${p.accent}12`, border: `1px solid ${p.accent}28`, color: p.accent,
                    }}>
                      ✦ {p.highlight}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#F0F4FF', lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ margin: '0 0 auto', fontSize: '12px', color: 'rgba(248,250,252,0.42)', lineHeight: 1.55,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {p.desc}
                    </p>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '5px', paddingTop: '10px', marginTop: '6px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '11px', fontWeight: 700, color: p.accent,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      View Live Demo
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 11L11 2M11 2H6M11 2v5"/>
                      </svg>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>


          {/* ── Conversion CTA block ── */}
          <ScrollReveal>
            <div className="pf-cta-block">
              {/* Glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 65% 55% at 50% 115%, rgba(201,168,76,0.16) 0%, transparent 65%)',
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15,
                backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <p style={{ margin: '0 0 12px', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>
                  👉 Ready to grow your business?
                </p>
                <h3 style={{ margin: '0 0 12px', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 800,
                  color: '#F8FAFC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                  Want a Website Like This?
                </h3>
                <p style={{ margin: '0 0 32px', fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Let&apos;s build a high-converting website for your business — designed to attract customers and generate leads from day one.
                </p>
                <div className="pf-cta-btns">
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 28px', borderRadius: '10px', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)',
                    color: '#060D1A', fontWeight: 700, fontSize: '13px',
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    boxShadow: '0 8px 28px rgba(201,168,76,0.38)', transition: 'all 0.25s',
                  }}>
                    Get Free Demo
                  </Link>
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 24px', borderRadius: '10px', textDecoration: 'none',
                    background: 'transparent', border: '1px solid rgba(201,168,76,0.35)',
                    color: '#C9A84C', fontWeight: 700, fontSize: '13px',
                    letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.25s',
                  }}>
                    Contact Us
                  </Link>
                  <a
                    href="https://wa.me/919000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '13px 24px', borderRadius: '10px', textDecoration: 'none',
                      background: 'rgba(37,211,102,0.09)', border: '1px solid rgba(37,211,102,0.28)',
                      color: '#25D366', fontWeight: 700, fontSize: '13px',
                      letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.25s',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.526 5.526 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.847L.057 23.487a.75.75 0 0 0 .921.921l5.64-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.965-1.358l-.356-.21-3.694.968.984-3.594-.231-.371A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  )
}