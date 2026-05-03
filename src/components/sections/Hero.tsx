'use client'

import Link                        from 'next/link'
import Image                       from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { stats }                   from '@/data/stats'
import AnimatedCounter             from '@/components/ui/AnimatedCounter'


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
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3,2 11,7 3,12" fill="currentColor" stroke="none" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5l-4 4 4 4" />
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 5l4 4-4 4" />
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="#F59E0B">
    <path d="M6 1l1.3 3.9H11L8.2 7l1 3.9L6 8.9 2.8 11 3.8 7 1 4.9h3.7z" />
  </svg>
)

const RocketIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
)

const SeoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
    <path d="M11 8v6M8 11h6"/>
  </svg>
)

const MobileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <path d="M12 18h.01"/>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10L10 3M10 3H5M10 3v5" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
  </svg>
)


/* ════════════════════════════════════════════════════════════════
   CAROUSEL DATA
════════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title:    'Modern Hospital',
    category: 'Healthcare Website',
    demo:     'https://modern-hospital-demo-website.vercel.app/',
    image:    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    color:    '#3B82F6',
    features: ['24/7 Support', 'Expert Doctors', 'Modern Facilities', 'Emergency Care'],
    tagColor: '#EFF6FF',
    tagText:  '#3B82F6',
  },
  {
    title:    'Ethereal Clinic',
    category: 'Clinic Website',
    demo:     'https://ethereal-clinic.vercel.app/',
    image:    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    color:    '#8B5CF6',
    features: ['Online Booking', 'Expert Staff', 'Premium Care', 'Insurance'],
    tagColor: '#F5F3FF',
    tagText:  '#8B5CF6',
  },
  {
    title:    'Dental Clinic',
    category: 'Dental Website',
    demo:     'https://dental-clinic-pi-six.vercel.app/',
    image:    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80',
    color:    '#EC4899',
    features: ['Painless Treatment', 'Modern Equipment', 'Kid Friendly', 'Whitening'],
    tagColor: '#FDF2F8',
    tagText:  '#EC4899',
  },
  {
    title:    'Green Solution',
    category: 'Environment Website',
    demo:     'https://greensolution-demo-website.vercel.app/',
    image:    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    color:    '#10B981',
    features: ['Eco Certified', 'Green Energy', 'Sustainability', 'Carbon Zero'],
    tagColor: '#ECFDF5',
    tagText:  '#10B981',
  },
  {
    title:    'AKVY Industries',
    category: 'Manufacturing Website',
    demo:     'https://manufacturing-website-akvy.vercel.app/',
    image:    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    color:    '#F59E0B',
    features: ['ISO Certified', 'Precision Parts', 'Global Supply', 'Quality Control'],
    tagColor: '#FFFBEB',
    tagText:  '#D97706',
  },
]

const FEATURES = [
  {
    icon:    <RocketIcon />,
    title:   'High Performance',
    desc:    'Lightning fast websites that rank & convert',
    bg:      'rgba(139,92,246,0.15)',
    border:  'rgba(139,92,246,0.3)',
    color:   '#A78BFA',
  },
  {
    icon:    <SeoIcon />,
    title:   'SEO Optimized',
    desc:    'Built to rank higher & get more traffic',
    bg:      'rgba(59,130,246,0.15)',
    border:  'rgba(59,130,246,0.3)',
    color:   '#60A5FA',
  },
  {
    icon:    <MobileIcon />,
    title:   'Mobile First',
    desc:    'Perfect experience on every device',
    bg:      'rgba(236,72,153,0.15)',
    border:  'rgba(236,72,153,0.3)',
    color:   '#F472B6',
  },
]

const STAT_ICONS = [
  // People icon
  <svg key="s1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  // Smile icon
  <svg key="s2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  // Award icon
  <svg key="s3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  // Clock icon
  <svg key="s4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
]

const STAT_COLORS = [
  { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.3)', color: '#A78BFA' },
  { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  color: '#60A5FA' },
  { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.3)',  color: '#F472B6' },
  { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)',  color: '#34D399' },
]

const STATS_DATA = [
  { value: 50,  suffix: '+', prefix: '',  label: 'Projects Delivered'  },
  { value: 30,  suffix: '+', prefix: '',  label: 'Happy Clients'       },
  { value: 100, suffix: '%', prefix: '',  label: 'Client Satisfaction' },
  { value: 24,  suffix: '/7',prefix: '',  label: 'Support Available'   },
]


/* ════════════════════════════════════════════════════════════════
   PROJECT CARD
════════════════════════════════════════════════════════════════ */

function ProjectCard({
  project,
  position,
}: {
  project: (typeof PROJECTS)[number]
  position: 'center' | 'left' | 'right'
}) {
  const isCenter = position === 'center'

  const cardStyle: React.CSSProperties = {
    position:  'absolute',
    top:       '50%',
    left:      '50%',
    width:     isCenter ? '340px' : '270px',
    background: '#FFFFFF',
    borderRadius: '16px',
    overflow:  'hidden',
    boxShadow: isCenter
      ? '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)'
      : '0 12px 40px rgba(0,0,0,0.3)',
    transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
    zIndex:    isCenter ? 20 : 10,
    transform: isCenter
      ? 'translate(-50%, -50%) scale(1)'
      : position === 'left'
        ? 'translate(calc(-50% - 220px), -50%) scale(0.82)'
        : 'translate(calc(-50% + 220px), -50%) scale(0.82)',
    opacity:   isCenter ? 1 : 0.65,
    pointerEvents: isCenter ? 'auto' : 'none',
  }

  return (
    <div style={cardStyle}>
      {/* Image */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#F1F5F9' }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="340px"
          priority={isCenter}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)`,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Category tag */}
        <span style={{
          display:     'inline-block',
          fontSize:    '10px',
          fontFamily:  'monospace',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight:  700,
          padding:     '3px 10px',
          borderRadius: '999px',
          marginBottom: '8px',
          background:  project.tagColor,
          color:       project.tagText,
        }}>
          {project.category}
        </span>

        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '12px', lineHeight: 1.2 }}>
          {project.title}
        </h3>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {project.features.slice(0, 4).map(f => (
            <span key={f} style={{
              fontSize:   '9.5px',
              fontFamily: 'monospace',
              letterSpacing: '0.06em',
              padding:    '3px 8px',
              borderRadius: '6px',
              background: '#F8FAFC',
              border:     '1px solid #E2E8F0',
              color:      '#64748B',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '8px 12px',
            borderRadius:   '8px',
            background:     `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
            border:         `1px solid ${project.color}30`,
            textDecoration: 'none',
            transition:     'all 0.2s',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: project.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            View Live Demo
          </span>
          <span style={{ color: project.color }}><ExternalLinkIcon /></span>
        </a>
      </div>
    </div>
  )
}


/* ════════════════════════════════════════════════════════════════
   CAROUSEL
════════════════════════════════════════════════════════════════ */

function ProjectCarousel() {
  const [active, setActive] = useState(0)
  const total = PROJECTS.length

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setActive(i => (i + 1) % total), [total])

  // Auto-advance every 4.5s
  useEffect(() => {
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [next])

  const leftIdx   = (active - 1 + total) % total
  const rightIdx  = (active + 1) % total

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Quote strip top */}
      <div style={{
        position:   'absolute',
        top:        0,
        right:      0,
        left:       '48px',
        display:    'flex',
        alignItems: 'flex-start',
        gap:        '8px',
        padding:    '0 0 20px 0',
        zIndex:     30,
      }}>
        <span style={{ fontSize: '28px', lineHeight: 1, color: 'rgba(139,92,246,0.5)', fontFamily: 'serif', marginTop: '-4px' }}>"</span>
        <div>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', lineHeight: 1.3, margin: 0 }}>
            Modern Design. Smart Strategy.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#818CF8', margin: '2px 0 0' }}>
            Real Results.
          </p>
        </div>
      </div>

      {/* Cards stage */}
      <div style={{
        position: 'relative',
        width:    '100%',
        height:   '420px',
        marginTop: '60px',
        overflow: 'hidden',
      }}>
        <ProjectCard project={PROJECTS[leftIdx]}  position="left"   />
        <ProjectCard project={PROJECTS[rightIdx]} position="right"  />
        <ProjectCard project={PROJECTS[active]}   position="center" />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '20px', zIndex: 30, position: 'relative' }}>
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous project"
          style={{
            width:        '36px',
            height:       '36px',
            borderRadius: '50%',
            border:       '1px solid rgba(255,255,255,0.12)',
            background:   'rgba(255,255,255,0.07)',
            color:        '#F8FAFC',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            cursor:       'pointer',
            backdropFilter: 'blur(8px)',
            transition:   'all 0.2s',
          }}
        >
          <ChevronLeft />
        </button>

        {/* Dots */}
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width:        i === active ? '24px' : '8px',
              height:       '8px',
              borderRadius: '999px',
              border:       'none',
              background:   i === active
                ? `linear-gradient(90deg, #8B5CF6, #3B82F6)`
                : 'rgba(255,255,255,0.2)',
              cursor:       'pointer',
              padding:      0,
              transition:   'all 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next project"
          style={{
            width:        '36px',
            height:       '36px',
            borderRadius: '50%',
            border:       '1px solid rgba(255,255,255,0.12)',
            background:   'rgba(255,255,255,0.07)',
            color:        '#F8FAFC',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            cursor:       'pointer',
            backdropFilter: 'blur(8px)',
            transition:   'all 0.2s',
          }}
        >
          <ChevronRight />
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
    <section
      className="relative overflow-hidden"
      style={{ background: '#0B0F1A', minHeight: '100svh' }}
      aria-label="Elvatrixa hero"
    >

      {/* ── Background layers ── */}

      {/* Top gradient burst */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 55% at 30% -5%, rgba(139,92,246,0.18) 0%, transparent 60%)',
      }} />
      {/* Right teal glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 55% at 95% 35%, rgba(59,130,246,0.10) 0%, transparent 65%)',
      }} />
      {/* Bottom gold hint */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 30% at 50% 105%, rgba(201,168,76,0.07) 0%, transparent 65%)',
      }} />
      {/* Dot grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Curved divider between left & right */}
      <div aria-hidden="true" className="hidden lg:block" style={{
        position:   'absolute',
        top:        0,
        bottom:     0,
        left:       '52%',
        width:      '2px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.6) 30%, rgba(59,130,246,0.6) 70%, transparent 100%)',
        filter:     'blur(1px)',
        zIndex:     5,
      }} />


      {/* ── Main content grid ── */}
      <div className="section-container relative z-10" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 xl:gap-12 items-start">

          {/* ══════════════════════════
              LEFT COLUMN
          ══════════════════════════ */}
          <div style={{ paddingTop: '20px' }}>

            {/* Badge */}
            <div className="animate-fade-up" style={{
              display:     'inline-flex',
              alignItems:  'center',
              gap:         '8px',
              padding:     '6px 14px 6px 10px',
              borderRadius: '999px',
              background:  'rgba(139,92,246,0.12)',
              border:      '1px solid rgba(139,92,246,0.3)',
              marginBottom: '28px',
            }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: '4px',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                  <path d="M5 1l1 3h3L7 6l1 3L5 7 2 9l1-3L1 4h3z"/>
                </svg>
              </span>
              <span style={{
                fontSize: '11px', fontFamily: 'monospace',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                fontWeight: 700, color: '#A78BFA',
              }}>
                We Build High-Converting Websites
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up"
              style={{
                fontSize:      'clamp(38px, 5.5vw, 68px)',
                lineHeight:    '1.05',
                letterSpacing: '-0.025em',
                fontWeight:    800,
                color:         '#F8FAFC',
                marginBottom:  '20px',
              }}
            >
              Websites That{' '}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Generate Leads
              </span>
              <br />
              &amp; Grow Your Business
            </h1>

            {/* Sub-headline */}
            <p
              className="animate-fade-up"
              style={{
                fontSize:     'clamp(14px, 1.6vw, 16px)',
                lineHeight:   1.7,
                color:        'rgba(248,250,252,0.55)',
                marginBottom: '32px',
                maxWidth:     '480px',
              }}
            >
              We design modern, fast, and conversion-focused websites
              that help businesses attract more customers &amp; increase revenue.
            </p>

            {/* Feature pills row */}
            <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{
                  display:     'flex',
                  alignItems:  'flex-start',
                  gap:         '10px',
                  padding:     '12px 14px',
                  borderRadius: '12px',
                  background:  f.bg,
                  border:      `1px solid ${f.border}`,
                  flex:        '1 1 140px',
                  minWidth:    '130px',
                }}>
                  <span style={{ color: f.color, flexShrink: 0, marginTop: '1px' }}>{f.icon}</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC', margin: '0 0 2px', letterSpacing: '-0.01em' }}>
                      {f.title}
                    </p>
                    <p style={{ fontSize: '11px', color: 'rgba(248,250,252,0.45)', margin: 0, lineHeight: 1.4 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
              {/* Primary */}
              <Link href="/contact" style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '14px 28px',
                borderRadius:   '10px',
                background:     'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                color:          '#FFFFFF',
                fontWeight:     700,
                fontSize:       '14px',
                letterSpacing:  '0.04em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                boxShadow:      '0 8px 32px rgba(139,92,246,0.4)',
                transition:     'all 0.3s',
              }}>
                Get Free Demo
                <ArrowRight />
              </Link>
              {/* Secondary */}
              <Link href="/work" style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '13px 24px',
                borderRadius:   '10px',
                background:     'rgba(255,255,255,0.05)',
                border:         '1px solid rgba(255,255,255,0.14)',
                color:          '#F8FAFC',
                fontWeight:     700,
                fontSize:       '14px',
                letterSpacing:  '0.04em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition:     'all 0.3s',
              }}>
                View Our Work
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
                  <PlayIcon />
                </span>
              </Link>
            </div>

            {/* Trust — avatars + rating */}
            <div className="animate-fade-up" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Overlapping avatars */}
              <div style={{ display: 'flex' }}>
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
                ].map((src, i) => (
                  <div key={i} style={{
                    width: '34px', height: '34px',
                    borderRadius: '50%',
                    border: '2px solid #0B0F1A',
                    overflow: 'hidden',
                    marginLeft: i === 0 ? 0 : '-8px',
                    position: 'relative',
                    zIndex: 5 - i,
                    background: '#1E2535',
                    flexShrink: 0,
                  }}>
                    <Image src={src} alt="" fill className="object-cover" sizes="34px" />
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', margin: '0 0 2px' }}>
                  50+ Businesses Trust Us
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginLeft: '4px' }}>
                    4.9 (Client Reviews)
                  </span>
                </div>
              </div>
            </div>

          </div>


          {/* ══════════════════════════
              RIGHT COLUMN — CAROUSEL
          ══════════════════════════ */}
          <div className="hidden lg:block" style={{ position: 'relative', height: '560px' }}>
            <ProjectCarousel />
          </div>

        </div>


        {/* ══════════════════════════
            STATS STRIP
        ══════════════════════════ */}
        <div
          className="animate-fade-up"
          style={{
            marginTop:    '56px',
            borderRadius: '18px',
            overflow:     'hidden',
            background:   'rgba(255,255,255,0.03)',
            border:       '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            display:      'grid',
            gridTemplateColumns: 'repeat(4, 1fr) auto',
          }}
        >
          {/* 4 stats */}
          {STATS_DATA.map((s, i) => (
            <div key={s.label} style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '14px',
              padding:       '22px 24px',
              borderRight:   '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width:        '44px',
                height:       '44px',
                borderRadius: '12px',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                flexShrink:   0,
                background:   STAT_COLORS[i].bg,
                border:       `1px solid ${STAT_COLORS[i].border}`,
                color:        STAT_COLORS[i].color,
              }}>
                {STAT_ICONS[i]}
              </div>
              <div>
                <p style={{
                  fontSize:      'clamp(22px, 2.5vw, 30px)',
                  fontWeight:    800,
                  color:         '#F8FAFC',
                  lineHeight:    1,
                  margin:        '0 0 3px',
                  letterSpacing: '-0.02em',
                }}>
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    prefix={s.prefix}
                    duration={2000}
                  />
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(248,250,252,0.4)', margin: 0, letterSpacing: '0.04em' }}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}

          {/* Right CTA box */}
          <div style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'flex-start',
            justifyContent: 'center',
            gap:            '12px',
            padding:        '22px 28px',
            background:     'rgba(139,92,246,0.06)',
            borderLeft:     '1px solid rgba(139,92,246,0.15)',
            minWidth:       '220px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))',
                border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA',
              }}>
                <MobileIcon />
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#F8FAFC', margin: '0 0 1px' }}>
                  Have a project in mind?
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(248,250,252,0.4)', margin: 0 }}>
                  Let's build something amazing.
                </p>
              </div>
            </div>
            <Link href="/contact" style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '10px 18px',
              borderRadius:   '8px',
              background:     '#F8FAFC',
              color:          '#0B0F1A',
              fontWeight:     700,
              fontSize:       '12px',
              letterSpacing:  '0.04em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              width:          '100%',
              justifyContent: 'center',
              transition:     'all 0.2s',
            }}>
              Schedule a Free Call
              <PhoneIcon />
            </Link>
          </div>
        </div>

      </div>


      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
        style={{ zIndex: 10 }}
      >
        <span style={{ fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          Scroll
        </span>
        <div className="animate-float">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </div>

    </section>
  )
}
