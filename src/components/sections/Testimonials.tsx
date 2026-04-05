'use client'
/* ================================================================
   ELVATRIXA — TESTIMONIALS
   File: src/components/sections/Testimonials.tsx

   Client Component — required for pause-on-hover state and
   framer-motion card hover effects.

   Architecture:
   ┌──────────────────────────────────────────────────────────────┐
   │  3-column VERTICAL marquee — adapted from 21st.dev           │
   │  Testimonial-v2 pattern                                       │
   │                                                              │
   │  Each column contains its items duplicated (×2) so the       │
   │  scroll loop is seamless — when column reaches -50%          │
   │  translateY it snaps back to 0, invisible to the user.       │
   │                                                              │
   │  Animation engine: CSS @keyframes (injected via style tag)   │
   │  + animationPlayState toggled via React state.               │
   │                                                              │
   │  Why CSS over framer-motion for the scroll?                  │
   │  - CSS animation-play-state pauses at exact current position │
   │  - framer-motion stop/resume restarts duration calculation   │
   │  - transform: translateY is GPU composited — 60fps always    │
   │                                                              │
   │  framer-motion IS used for:                                   │
   │  - Per-card whileHover scale + shadow lift                   │
   │                                                              │
   │  Column speeds (prime numbers to desync visually):          │
   │  Col 1: 18s · Col 2: 24s · Col 3: 21s                       │
   │                                                              │
   │  Mask gradient: top/bottom fade so cards appear/disappear    │
   │  naturally without a hard clip edge.                         │
   │                                                              │
   │  Accessibility:                                              │
   │  - Pause on hover + keyboard-accessible pause button        │
   │  - Duplicate cards are aria-hidden                          │
   │  - blockquote + cite for semantic quote markup              │
   │  - prefers-reduced-motion: animation disabled               │
================================================================ */

import React, { useState }  from 'react'
import { motion }            from 'framer-motion'
import Image                 from 'next/image'
import ScrollReveal          from '@/components/ui/ScrollReveal'
import { testimonials }      from '@/data/testimonials'
import type { Testimonial }  from '@/types'


/* ── CSS keyframes injected as a style tag ──────────────────── */
/*
  Defined here (not in globals.css @theme block) to guarantee the
  @keyframes rule is emitted as global CSS — the Tailwind v4 @theme
  inline block swallows keyframes without emitting them.
*/
const STYLES = `
@keyframes ev-scroll-up {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .ev-marquee-col { animation: none !important; }
}
`


/* ── Star rating ────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13"
          fill={i < rating ? '#C9A84C' : 'none'}
          stroke={i < rating ? '#C9A84C' : '#D1D5DB'}
          strokeWidth="1.1"
          aria-hidden="true"
        >
          <path d="M6.5 1l1.4 2.84L11 4.37l-2.25 2.19.53 3.1L6.5 8.2 4.22 9.66l.53-3.1L2.5 4.37l3.1-.53L6.5 1z"/>
        </svg>
      ))}
    </div>
  )
}


/* ── Individual testimonial card ────────────────────────────── */
/*
  Uses framer-motion whileHover for the scale + shadow lift.
  blockquote + footer + cite = proper semantic quote structure.
*/
function TestimonialCard({
  t,
  ariaHidden = false,
}: {
  t: Testimonial
  ariaHidden?: boolean
}) {
  return (
    <motion.article
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : 0}
      whileHover={{
        y:         -6,
        scale:     1.015,
        boxShadow: '0 20px 60px rgba(10,22,40,0.10), 0 0 0 1.5px rgba(201,168,76,0.25)',
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      className="relative flex flex-col p-6 rounded-xl overflow-hidden cursor-default select-none"
      style={{
        background: '#FFFFFF',
        border:     '1px solid #E5E7EB',
        borderTop:  '2.5px solid #C9A84C',
        boxShadow:  '0 2px 10px rgba(10,22,40,0.05)',
      }}
    >
      {/* Decorative large quote mark — bottom-right watermark */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-4 font-display font-bold leading-none pointer-events-none select-none"
        style={{
          fontSize:   '96px',
          color:      '#C9A84C',
          opacity:    0.055,
          lineHeight: 1,
        }}
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div className="mb-4">
        <Stars rating={t.rating} />
      </div>

      {/* Quote */}
      <blockquote className="relative z-10 flex-1 mb-5">
        <p
          className="font-body text-[13.5px] leading-relaxed"
          style={{ color: '#374151' }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
      </blockquote>

      {/* Divider */}
      <div className="w-full h-px mb-4" style={{ background: '#F3F4F6' }} />

      {/* Client info */}
      <footer className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden"
          style={{ border: '1.5px solid rgba(201,168,76,0.30)' }}
        >
          {t.imageUrl ? (
            <Image
              src={t.imageUrl}
              alt={t.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Fallback initials avatar */
            <div
              className="w-full h-full flex items-center justify-center font-mono text-[11px] font-bold"
              style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}
            >
              {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>

        <div>
          <cite
            className="not-italic font-body font-bold text-[13px] leading-tight block"
            style={{ color: '#0A1628' }}
          >
            {t.name}
          </cite>
          <p
            className="font-mono text-[9.5px] tracking-[0.08em] mt-0.5"
            style={{ color: '#9CA3AF' }}
          >
            {t.role} · {t.company}
          </p>
          {/* Country flag-text */}
          <p
            className="font-mono text-[9px] tracking-[0.06em]"
            style={{ color: '#C9A84C', opacity: 0.8 }}
          >
            {t.country}
          </p>
        </div>
      </footer>
    </motion.article>
  )
}


/* ── Single scrolling column ────────────────────────────────── */
/*
  Items are doubled inside so the scroll loop is seamless:
  [item1, item2, item1(dup), item2(dup)]
  When translateY reaches -50%, CSS animation loops back to 0.
  The dup items are aria-hidden so screen readers skip them.
*/
function MarqueeColumn({
  items,
  duration,
  isPaused,
  className = '',
}: {
  items: Testimonial[]
  duration: number
  isPaused: boolean
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="ev-marquee-col flex flex-col gap-4"
        style={{
          animation:           `ev-scroll-up ${duration}s linear infinite`,
          animationPlayState:  isPaused ? 'paused' : 'running',
        }}
      >
        {/* First set — visible to screen readers */}
        {items.map(t => (
          <TestimonialCard key={t.id} t={t} />
        ))}
        {/* Duplicate set — decorative only (aria-hidden) */}
        {items.map(t => (
          <TestimonialCard key={`dup-${t.id}`} t={t} ariaHidden />
        ))}
      </div>
    </div>
  )
}


/* ── Pause icon ─────────────────────────────────────────────── */
const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <rect x="2" y="2" width="3" height="8" rx="1"/>
    <rect x="7" y="2" width="3" height="8" rx="1"/>
  </svg>
)

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
    <path d="M3 2l7 4-7 4V2z"/>
  </svg>
)


/* ── Section ─────────────────────────────────────────────────── */

export default function Testimonials() {
  /*
    Pause state — shared across all 3 columns.
    Toggled by: hover on the marquee region OR the accessibility button.
  */
  const [isPaused, setIsPaused] = useState(false)

  /*
    Split 6 testimonials across 3 columns.
    Using indices 0,1 / 2,3 / 4,5 keeps strong testimonials distributed.
  */
  const col1 = testimonials.slice(0, 2)
  const col2 = testimonials.slice(2, 4)
  const col3 = testimonials.slice(4, 6)

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: '#F8F9FC' }}
      aria-labelledby="testimonials-heading"
    >
      {/* Inject CSS animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.065) 1px, transparent 1px)',
          backgroundSize:  '38px 38px',
        }}
      />

      {/* Ambient glow — top centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">

        {/* ── Section header ────────────────────────────────── */}
        <ScrollReveal className="text-center mb-12">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--gold)' }}
            >
              Client Voices
            </span>
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }}
              aria-hidden="true"
            />
          </div>

          {/* H2 */}
          <h2
            id="testimonials-heading"
            className="font-display font-bold mb-4"
            style={{
              fontSize:      'clamp(32px, 4vw, 52px)',
              color:         'var(--text-primary)',
              lineHeight:    1.05,
              letterSpacing: '-0.03em',
            }}
          >
            What Our{' '}
            <span className="text-gold-gradient">Clients Say</span>
          </h2>

          <p
            className="font-body text-[15px] leading-relaxed max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            We measure success by the outcomes our clients achieve —
            not by the hours we bill.
          </p>

          {/* Pause / Play accessibility button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background:   'rgba(201,168,76,0.08)',
                border:       '1px solid rgba(201,168,76,0.22)',
                color:        '#C9A84C',
                fontSize:     '9px',
                fontFamily:   'var(--font-mono)',
                letterSpacing:'0.12em',
                textTransform:'uppercase',
              }}
              aria-label={isPaused ? 'Resume testimonial scroll' : 'Pause testimonial scroll'}
              aria-pressed={isPaused}
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </ScrollReveal>


        {/* ── Marquee region ────────────────────────────────── */}
        {/*
          Pause on hover: onMouseEnter/Leave on the whole region.
          mask-image fades top/bottom 80px so cards appear/disappear
          smoothly rather than being clipped hard.
          max-h constrains the visible window; overflow-hidden
          prevents columns from spilling outside.
        */}
        <div
          role="region"
          aria-label="Scrolling client testimonials — hover to pause"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
          style={{
            maxHeight:   '700px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {/* Column 1 — always visible — slowest (18s) */}
            <MarqueeColumn
              items={col1}
              duration={18}
              isPaused={isPaused}
            />

            {/* Column 2 — md+ — fastest (24s) */}
            <MarqueeColumn
              items={col2}
              duration={24}
              isPaused={isPaused}
              className="hidden md:block"
            />

            {/* Column 3 — lg+ — medium (21s) */}
            <MarqueeColumn
              items={col3}
              duration={21}
              isPaused={isPaused}
              className="hidden lg:block"
            />
          </div>
        </div>


        {/* ── Trust strip ───────────────────────────────────── */}
        {/*
          Static proof points below the marquee.
          On mobile this is the primary social proof element since
          only 1 column is visible.
        */}
        <ScrollReveal className="mt-12">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
            style={{ borderTop: '1px solid #E5E7EB' }}
          >
            {/* Rating summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars average">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 13 13"
                    fill="#C9A84C" stroke="none" aria-hidden="true">
                    <path d="M6.5 1l1.4 2.84L11 4.37l-2.25 2.19.53 3.1L6.5 8.2 4.22 9.66l.53-3.1L2.5 4.37l3.1-.53L6.5 1z"/>
                  </svg>
                ))}
              </div>
              <div>
                <p className="font-body font-bold text-[13.5px]" style={{ color: 'var(--text-primary)' }}>
                  5.0 average rating
                </p>
                <p className="font-mono text-[9.5px] tracking-[0.10em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  Across all client projects
                </p>
              </div>
            </div>

            {/* Countries note */}
            <p
              className="font-mono text-[9.5px] tracking-[0.12em] uppercase text-center"
              style={{ color: '#9CA3AF' }}
            >
              Clients in the US, UK, Australia, Canada &amp; beyond
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
