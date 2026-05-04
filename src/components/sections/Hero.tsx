'use client'

import Link                                   from 'next/link'
import Image                                  from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import AnimatedCounter                        from '@/components/ui/AnimatedCounter'

/* ════════════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════════════ */

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <polygon points="2,1 10,6 2,11" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4l-4 4 4 4" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4l4 4-4 4" />
  </svg>
)

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="#F59E0B">
    <path d="M6 1l1.3 3.9H11L8.2 7l1 3.9L6 8.9 2.8 11 3.8 7 1 4.9h3.7z" />
  </svg>
)

const RocketIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
)

const SeoIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
    <path d="M11 8v6M8 11h6"/>
  </svg>
)

const MobileIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <path d="M12 18h.01"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
  </svg>
)

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10L9 3M9 3H5M9 3v4" />
  </svg>
)

/* ════════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title:    'Modern Hospital',
    category: 'Healthcare Website',
    demo:     'https://modern-hospital-demo-website.vercel.app/',
    image:    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=75',
    accent:   '#3B82F6',
    features: ['24/7 Support', 'Expert Doctors', 'Modern Facilities', 'Emergency Care'],
  },
  {
    title:    'Ethereal Clinic',
    category: 'Clinic Website',
    demo:     'https://ethereal-clinic.vercel.app/',
    image:    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=75',
    accent:   '#8B5CF6',
    features: ['Online Booking', 'Expert Staff', 'Premium Care', 'Insurance'],
  },
  {
    title:    'Dental Clinic',
    category: 'Dental Website',
    demo:     'https://dental-clinic-pi-six.vercel.app/',
    image:    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=75',
    accent:   '#EC4899',
    features: ['Painless Treatment', 'Modern Equipment', 'Kid Friendly', 'Whitening'],
  },
  {
    title:    'Green Solution',
    category: 'Environment Website',
    demo:     'https://greensolution-demo-website.vercel.app/',
    image:    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=75',
    accent:   '#10B981',
    features: ['Eco Certified', 'Green Energy', 'Sustainability', 'Carbon Zero'],
  },
  {
    title:    'AKVY Industries',
    category: 'Manufacturing Website',
    demo:     'https://manufacturing-website-akvy.vercel.app/',
    image:    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=75',
    accent:   '#F59E0B',
    features: ['ISO Certified', 'Precision Parts', 'Global Supply', 'Quality Control'],
  },
]

const FEATURES = [
  { icon: <RocketIcon />, title: 'High Performance', desc: 'Lightning fast websites that rank & convert', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', color: '#A78BFA' },
  { icon: <SeoIcon />,    title: 'SEO Optimized',    desc: 'Built to rank higher & get more traffic',    bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  color: '#60A5FA' },
  { icon: <MobileIcon />, title: 'Mobile First',     desc: 'Perfect experience on every device',         bg: 'rgba(236,72,153,0.12)',  border: 'rgba(236,72,153,0.25)',  color: '#F472B6' },
]

const STAT_COLORS = [
  { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)', color: '#A78BFA' },
  { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  color: '#60A5FA' },
  { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.3)',  color: '#F472B6' },
  { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)',  color: '#34D399' },
]

const STATS_DATA = [
  { value: 50,  suffix: '+',  label: 'Projects Delivered'  },
  { value: 30,  suffix: '+',  label: 'Happy Clients'       },
  { value: 100, suffix: '%',  label: 'Client Satisfaction' },
  { value: 24,  suffix: '/7', label: 'Support Available'   },
]

const STAT_ICONS = [
  <svg key="s1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="s2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  <svg key="s3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  <svg key="s4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
]

const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
]

/* ════════════════════════════════════════════════════════════════
   CAROUSEL  — proper sliding track, no absolute-position chaos
════════════════════════════════════════════════════════════════ */

function ProjectCarousel() {
  const [active, setActive]     = useState(0)
  const [paused, setPaused]     = useState(false)
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null)
  const total                   = PROJECTS.length

  const go = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total)
  }, [total])

  const prev = () => go(active - 1)
  const next = () => go(active + 1)

  // Auto-advance every 4.5 s, pause on hover
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => go(active + 1), 4500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [active, paused, go])

  const p = PROJECTS[active]

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0', height: '100%' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Quote strip ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '18px' }}>
        <span style={{
          fontSize: '32px', lineHeight: '0.8', marginTop: '2px',
          background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontFamily: 'Georgia, serif',
        }}>"</span>
        <div>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.35 }}>
            Modern Design. Smart Strategy.
          </p>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, lineHeight: 1.35,
            background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Real Results.
          </p>
        </div>
      </div>

      {/* ── Card — fixed height, no overflow issues ── */}
      <div style={{
        flex: 1,
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#FFFFFF',
        boxShadow: '0 24px 72px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.4s ease',
        minHeight: 0,
      }}>
        {/* Image section */}
        <div style={{ position: 'relative', height: '200px', flexShrink: 0, overflow: 'hidden', background: '#0F172A' }}>
          <Image
            key={p.image}          // force re-mount on slide change for instant swap
            src={p.image}
            alt={p.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 480px"
            style={{ objectFit: 'cover', transition: 'opacity 0.5s ease' }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)',
          }} />
          {/* Category badge */}
          <span style={{
            position: 'absolute', top: '14px', left: '14px',
            fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.08em',
            textTransform: 'uppercase', fontWeight: 700,
            padding: '4px 10px', borderRadius: '999px',
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            border: `1px solid ${p.accent}50`, color: '#FFFFFF',
          }}>
            {p.category}
          </span>
          {/* Title over image bottom */}
          <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {p.title}
            </h3>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF' }}>
          {/* Feature tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {p.features.map(f => (
              <span key={f} style={{
                fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.05em',
                padding: '4px 10px', borderRadius: '6px',
                background: `${p.accent}12`, border: `1px solid ${p.accent}25`,
                color: p.accent, fontWeight: 600,
              }}>
                {f}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: '10px', textDecoration: 'none',
              background: `linear-gradient(135deg, ${p.accent}18, ${p.accent}08)`,
              border: `1px solid ${p.accent}35`,
              transition: 'all 0.2s',
              marginTop: 'auto',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 700, color: p.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              View Live Demo
            </span>
            <span style={{ color: p.accent, display: 'flex' }}><ExternalIcon /></span>
          </a>
        </div>
      </div>

      {/* ── Controls: prev · dots · next ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '16px' }}>
        <button
          onClick={prev}
          aria-label="Previous project"
          style={{
            width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.07)', color: '#F8FAFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)', padding: 0, flexShrink: 0,
          }}
        >
          <ChevronLeftIcon />
        </button>

        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Project ${i + 1}`}
            style={{
              height: '8px',
              width: i === active ? '24px' : '8px',
              borderRadius: '999px', border: 'none', padding: 0, cursor: 'pointer',
              background: i === active
                ? 'linear-gradient(90deg, #8B5CF6, #3B82F6)'
                : 'rgba(255,255,255,0.2)',
              transition: 'all 0.35s ease', flexShrink: 0,
            }}
          />
        ))}

        <button
          onClick={next}
          aria-label="Next project"
          style={{
            width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.07)', color: '#F8FAFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)', padding: 0, flexShrink: 0,
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <>
      {/* Inline critical styles — animations + responsive fixes */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .hero-fade { opacity: 0; animation: heroFadeUp 0.65s ease forwards; }
        .hero-d0  { animation-delay: 0ms;   }
        .hero-d1  { animation-delay: 80ms;  }
        .hero-d2  { animation-delay: 160ms; }
        .hero-d3  { animation-delay: 240ms; }
        .hero-d4  { animation-delay: 320ms; }
        .hero-d5  { animation-delay: 420ms; }

        .hero-btn-primary:hover  { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 12px 36px rgba(139,92,246,0.5) !important; }
        .hero-btn-secondary:hover { background: rgba(255,255,255,0.1) !important; transform: translateY(-1px); }
        .hero-avatar-group { display: flex; }

        /* Stats strip — responsive */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr) auto;
        }
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-cta-box {
            grid-column: 1 / -1;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Feature cards — responsive wrap */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 520px) {
          .feature-grid { grid-template-columns: 1fr; }
        }

        /* Main hero grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-carousel-col { display: none; }
          .hero-carousel-mobile { display: block !important; }
        }
        .hero-carousel-mobile { display: none; }

        /* Vertical divider */
        .hero-divider {
          position: absolute;
          top: 0; bottom: 0;
          left: 52%;
          width: 2px;
          background: linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.55) 30%, rgba(59,130,246,0.55) 70%, transparent 100%);
          filter: blur(1px);
        }
        @media (max-width: 1024px) { .hero-divider { display: none; } }

        @keyframes floatY {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(-5px); }
        }
        .float-anim { animation: floatY 2.4s ease-in-out infinite; }
      `}</style>

      <section
        style={{ background: '#0B0F1A', overflow: 'hidden', position: 'relative' }}
        aria-label="Elvatrixa hero"
      >
        {/* ── Background atmosphere ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 75% 55% at 25% -5%, rgba(139,92,246,0.18) 0%, transparent 62%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 90% 40%, rgba(59,130,246,0.10) 0%, transparent 65%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.14,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)',
          backgroundSize: '26px 26px' }} />
        {/* Gold top hairline */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8) 50%, transparent)' }} />
        {/* Vertical divider desktop */}
        <div aria-hidden="true" className="hero-divider" style={{ zIndex: 2 }} />

        {/* ── Main container ── */}
        <div className="section-container" style={{ position: 'relative', zIndex: 5, paddingTop: '110px', paddingBottom: '48px' }}>

          <div className="hero-grid">

            {/* ════════════════════════
                LEFT COLUMN
            ════════════════════════ */}
            <div>

              {/* Badge */}
              <div className="hero-fade hero-d0" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '5px 14px 5px 9px', borderRadius: '999px', marginBottom: '24px',
                background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.28)',
              }}>
                <span style={{
                  width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                    <path d="M5 0.5l1.1 3.4H9.5L6.7 5.8l1 3.3L5 7.4 2.3 9.1l1-3.3L0.5 3.9H3.9z"/>
                  </svg>
                </span>
                <span style={{ fontSize: '10.5px', fontFamily: 'monospace', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#A78BFA' }}>
                  We Build High-Converting Websites
                </span>
              </div>

              {/* Headline */}
              <h1 className="hero-fade hero-d1" style={{
                fontSize: 'clamp(36px, 5.2vw, 64px)',
                fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.025em',
                color: '#F8FAFC', margin: '0 0 18px',
              }}>
                Websites That<br />
                <span style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 55%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Generate Leads
                </span><br />
                &amp; Grow Your Business
              </h1>

              {/* Subheading */}
              <p className="hero-fade hero-d2" style={{
                fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7,
                color: 'rgba(248,250,252,0.52)', margin: '0 0 28px', maxWidth: '460px',
              }}>
                We design modern, fast, and conversion-focused websites that help businesses
                attract more customers &amp; increase revenue.
              </p>

              {/* Feature cards */}
              <div className="hero-fade hero-d2 feature-grid" style={{ marginBottom: '32px' }}>
                {FEATURES.map(f => (
                  <div key={f.title} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '12px', borderRadius: '12px',
                    background: f.bg, border: `1px solid ${f.border}`,
                  }}>
                    <span style={{ color: f.color, flexShrink: 0, marginTop: '1px' }}>{f.icon}</span>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: 700, color: '#F8FAFC' }}>{f.title}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'rgba(248,250,252,0.42)', lineHeight: 1.4 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="hero-fade hero-d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                <Link href="/contact"
                  className="hero-btn-primary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 26px', borderRadius: '10px', textDecoration: 'none',
                    background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                    color: '#FFFFFF', fontWeight: 700, fontSize: '14px',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    boxShadow: '0 6px 28px rgba(139,92,246,0.38)',
                    transition: 'all 0.25s ease',
                  }}>
                  Get Free Demo
                  <ArrowRight />
                </Link>
                <Link href="/work"
                  className="hero-btn-secondary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '13px 22px', borderRadius: '10px', textDecoration: 'none',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                    color: '#F8FAFC', fontWeight: 700, fontSize: '14px',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    backdropFilter: 'blur(8px)', transition: 'all 0.25s ease',
                  }}>
                  View Our Work
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                  }}>
                    <PlayIcon />
                  </span>
                </Link>
              </div>

              {/* Trust row — avatars + rating */}
              <div className="hero-fade hero-d4" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Overlapping avatars */}
                <div className="hero-avatar-group">
                  {AVATAR_URLS.map((src, i) => (
                    <div key={i} style={{
                      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                      border: '2px solid #0B0F1A', overflow: 'hidden', background: '#1E2535',
                      marginLeft: i === 0 ? 0 : '-8px', position: 'relative', zIndex: 5 - i,
                    }}>
                      <Image src={src} alt="" fill className="object-cover" sizes="32px" />
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 700, color: '#F8FAFC' }}>
                    50+ Businesses Trust Us
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginLeft: '5px' }}>
                      4.9 (Client Reviews)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ════════════════════════
                RIGHT COLUMN — desktop
            ════════════════════════ */}
            <div className="hero-carousel-col hero-fade hero-d5" style={{ paddingTop: '8px' }}>
              <ProjectCarousel />
            </div>

          </div>

          {/* Mobile carousel — shown only below 1024px */}
          <div className="hero-carousel-mobile hero-fade hero-d5" style={{ marginTop: '40px' }}>
            <div style={{ maxWidth: '420px', margin: '0 auto' }}>
              <ProjectCarousel />
            </div>
          </div>

          {/* ════════════════════════
              STATS STRIP
          ════════════════════════ */}
          <div
            className="stats-grid hero-fade hero-d5"
            style={{
              marginTop: '48px', borderRadius: '16px', overflow: 'hidden',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {STATS_DATA.map((s, i) => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '20px 22px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '11px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: STAT_COLORS[i].bg, border: `1px solid ${STAT_COLORS[i].border}`,
                  color: STAT_COLORS[i].color,
                }}>
                  {STAT_ICONS[i]}
                </div>
                <div>
                  <p style={{
                    margin: '0 0 2px', fontWeight: 800, lineHeight: 1, color: '#F8FAFC',
                    fontSize: 'clamp(20px, 2.2vw, 28px)', letterSpacing: '-0.02em',
                  }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} prefix="" duration={2000} />
                  </p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'rgba(248,250,252,0.38)', letterSpacing: '0.03em' }}>
                    {s.label}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA cell */}
            <div
              className="stats-cta-box"
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px',
                padding: '20px 24px',
                background: 'rgba(139,92,246,0.06)',
                borderLeft: '1px solid rgba(139,92,246,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))',
                  border: '1px solid rgba(139,92,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA',
                }}>
                  <MobileIcon />
                </div>
                <div>
                  <p style={{ margin: '0 0 1px', fontSize: '12px', fontWeight: 700, color: '#F8FAFC' }}>
                    Have a project in mind?
                  </p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'rgba(248,250,252,0.38)' }}>
                    Let's build something amazing.
                  </p>
                </div>
              </div>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                padding: '9px 16px', borderRadius: '8px', textDecoration: 'none',
                background: '#F8FAFC', color: '#0B0F1A',
                fontWeight: 700, fontSize: '11.5px', letterSpacing: '0.05em', textTransform: 'uppercase',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
                Schedule a Free Call
                <PhoneIcon />
              </Link>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          className="float-anim"
          style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 10,
          }}
        >
          <span style={{ fontSize: '8.5px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            Scroll
          </span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
            stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>

      </section>
    </>
  )
}