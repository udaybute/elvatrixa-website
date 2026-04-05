/* ================================================================
   ELVATRIXA — WHY ELVATRIXA
   File: src/components/sections/WhyElvatrixa.tsx

   Server Component — no 'use client', no event handlers.
   Layout: asymmetric bento grid — 2 large (col-span-3) + 4 small
   (col-span-2) cards on a 6-col desktop grid.

   Design patterns (adapted from 21st.dev Features-10):
   - Corner bracket decorators: 4 absolute-positioned spans per card
   - Gold left accent bar: scale-y-0 → scale-y-100 on hover (CSS only)
   - Number watermark: large gold display text, low opacity, aria-hidden
   - Per-item inline SVG icon — no external icon lib needed
   - Featured first card: subtle gold tint + stronger border
================================================================ */

import React        from 'react'
import Link         from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { WHY_ITEMS } from '@/data/why-items'


/* ── Per-item SVG icons ──────────────────────────────────────── */
/*
  Each icon maps to an item number. Inline SVGs — zero runtime cost,
  no external dependency, perfectly tree-shakeable as Server Components.
*/
const ICONS: Record<string, () => React.ReactElement> = {
  '01': () => (                       /* Product-First — target / bullseye */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  '02': () => (                       /* AI-Native — circuit brain */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  ),
  '03': () => (                       /* Performance — zap / lightning */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  '04': () => (                       /* Design — pen tool */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      <path d="M2 2l7.586 7.586"/>
      <circle cx="11" cy="11" r="2"/>
    </svg>
  ),
  '05': () => (                       /* Scalable — layers stack */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  '06': () => (                       /* US & UK — globe */
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  ),
}


/* ── Corner bracket decorators (from 21st.dev Features-10) ──── */
/*
  Four 8×8px spans positioned at each corner — styled with 2px gold
  border on two sides each. Creates a premium "technical" frame effect.
  All aria-hidden so screen readers skip them.
*/
function CardBrackets() {
  return (
    <>
      <span aria-hidden="true" className="absolute -left-px -top-px block w-2 h-2 border-l-2 border-t-2"
        style={{ borderColor: 'rgba(201,168,76,0)' }} />
      <span aria-hidden="true" className="absolute -right-px -top-px block w-2 h-2 border-r-2 border-t-2"
        style={{ borderColor: 'rgba(201,168,76,0)' }} />
      <span aria-hidden="true" className="absolute -left-px -bottom-px block w-2 h-2 border-l-2 border-b-2"
        style={{ borderColor: 'rgba(201,168,76,0)' }} />
      <span aria-hidden="true" className="absolute -right-px -bottom-px block w-2 h-2 border-r-2 border-b-2"
        style={{ borderColor: 'rgba(201,168,76,0)' }} />
      {/* Bracket spans activated by group-hover via an outer group wrapper */}
    </>
  )
}

/* Hover-activated version — inlines the gold color directly */
function CardBracketsHover() {
  return (
    <span aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {/* Top-left */}
      <span className="absolute left-0 top-0 w-2 h-2 border-l-2 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: '#C9A84C' }} />
      {/* Top-right */}
      <span className="absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: '#C9A84C' }} />
      {/* Bottom-left */}
      <span className="absolute left-0 bottom-0 w-2 h-2 border-l-2 border-b-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: '#C9A84C' }} />
      {/* Bottom-right */}
      <span className="absolute right-0 bottom-0 w-2 h-2 border-r-2 border-b-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderColor: '#C9A84C' }} />
    </span>
  )
}


/* ── Individual differentiator card ──────────────────────────── */
/*
  `featured`: first card gets a gold tint background and stronger border.
  Hover effects are pure CSS via Tailwind group-hover — no JS required.
*/
interface CardProps {
  number: string
  title:  string
  body:   string
  featured?: boolean
}

function DiffCard({ number, title, body, featured = false }: CardProps) {
  const Icon = ICONS[number]

  return (
    <div
      className="group relative flex flex-col p-7 rounded-xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
      style={
        featured
          ? {
              background: 'linear-gradient(135deg, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 100%)',
              border:     '1.5px solid rgba(201,168,76,0.35)',
              boxShadow:  '0 4px 32px rgba(201,168,76,0.06)',
            }
          : {
              background: '#FFFFFF',
              border:     '1px solid #E5E7EB',
              boxShadow:  '0 1px 6px rgba(10,22,40,0.04)',
            }
      }
    >
      {/* Corner brackets — fade in on hover */}
      <CardBracketsHover />

      {/* Gold left accent bar — slides down from top on hover */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-l-xl"
        style={{ background: '#C9A84C' }}
        aria-hidden="true"
      />

      {/* Number watermark — decorative, bottom-right */}
      <span
        className="absolute bottom-4 right-5 font-display font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize:    '72px',
          color:       featured ? 'rgba(201,168,76,0.12)' : 'rgba(10,22,40,0.04)',
          letterSpacing: '-0.04em',
          lineHeight:  1,
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Icon pill */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300"
        style={
          featured
            ? { background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.30)', color: '#C9A84C' }
            : { background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)', color: '#C9A84C' }
        }
      >
        {Icon && <Icon />}
      </div>

      {/* Title */}
      <h3
        className="font-body font-bold text-[15.5px] leading-snug mb-3"
        style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>

      {/* Body */}
      <p
        className="font-body text-[13px] leading-relaxed relative z-10"
        style={{ color: 'var(--text-muted)' }}
      >
        {body}
      </p>
    </div>
  )
}


/* ── Section ─────────────────────────────────────────────────── */

export default function WhyElvatrixa() {
  /*
    Bento grid strategy (desktop 6 cols):
    - Items 0 & 1 → col-span-3 each (large half-width, 2-per-row)
    - Items 2–5   → col-span-2 each (smaller, 3-per-row)
    This creates visual hierarchy — the first two differentiators
    (Product-First + AI-Native) command more attention.
  */
  const [first, second, ...rest] = WHY_ITEMS

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.055) 1px, transparent 1px)',
          backgroundSize:  '40px 40px',
        }}
      />

      <div className="section-container relative z-10">

        {/* ── Section header ─────────────────────────────────── */}
        <ScrollReveal>
          <div className="text-center mb-12">

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
                Why Choose Us
              </span>
              <span
                className="h-px w-8 flex-shrink-0"
                style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }}
                aria-hidden="true"
              />
            </div>

            {/* Heading */}
            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize:      'clamp(32px, 4vw, 54px)',
                color:         'var(--text-primary)',
                lineHeight:    1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Built{' '}
              <span className="text-gold-gradient">Different.</span>
            </h2>

            {/* Subheading */}
            <p
              className="font-body text-[15px] leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              What separates Elvatrixa from thousands of agencies is not just technical skill —
              it&rsquo;s perspective, standards, and obsession with outcomes.
            </p>
          </div>
        </ScrollReveal>


        {/* ── Bento grid ─────────────────────────────────────── */}
        {/*
          Mobile:  1 column, all cards full-width
          Tablet:  2 columns uniform
          Desktop: 6-col bento — first 2 cards half-width (col-span-3),
                   remaining 4 cards one-third-width (col-span-2)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

          {/* ── Large featured pair ── */}
          {first && (
            <ScrollReveal delay="reveal-delay-1" variant="scale" className="lg:col-span-3">
              <DiffCard
                number={first.number}
                title={first.title}
                body={first.body}
                featured
              />
            </ScrollReveal>
          )}

          {second && (
            <ScrollReveal delay="reveal-delay-2" variant="scale" className="lg:col-span-3">
              <DiffCard
                number={second.number}
                title={second.title}
                body={second.body}
              />
            </ScrollReveal>
          )}

          {/* ── Smaller quad ── */}
          {rest.map((item, i) => (
            <ScrollReveal
              key={item.number}
              delay={`reveal-delay-${i + 1}` as `reveal-delay-${number}`}
              variant="scale"
              className="lg:col-span-2"
            >
              <DiffCard
                number={item.number}
                title={item.title}
                body={item.body}
              />
            </ScrollReveal>
          ))}

        </div>


        {/* ── Bottom proof strip ─────────────────────────────── */}
        {/*
          Three quick-read proof points that reinforce the claims above.
          Separated by vertical hairlines. Leads into a CTA.
        */}
        <ScrollReveal className="mt-12">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8"
            style={{ borderTop: '1px solid #E5E7EB' }}
          >
            {/* Proof points */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
              {[
                { value: '95+',  label: 'Average Lighthouse Score' },
                { value: '<2s',  label: 'Target Load Time'         },
                { value: '100%', label: 'Fixed-Price Delivery'     },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <span
                      className="hidden sm:block h-8 w-px"
                      style={{ background: '#E5E7EB' }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex flex-col items-center md:items-start">
                    <span
                      className="font-display font-bold leading-none"
                      style={{ fontSize: '26px', color: '#C9A84C', letterSpacing: '-0.03em' }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-mono text-[9px] tracking-[0.12em] uppercase mt-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/contact" className="btn-primary flex-shrink-0">
              Work With Us
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
