/* ================================================================
   ELVATRIXA — PROCESS STEPS
   File: src/components/sections/ProcessSteps.tsx

   Server Component — no 'use client', zero event handlers.

   Layout strategy:
   ┌─────────────────────────────────────────────────────────────┐
   │ Desktop (lg+): 4-column horizontal rail                     │
   │   Each step: number node → content card                     │
   │   Connector line between nodes (absolute, full-width)       │
   │                                                             │
   │ Mobile/tablet: vertical stack                               │
   │   Each step: left timeline bar + right content              │
   │   Avoids horizontal scroll, maintains clear sequence        │
   └─────────────────────────────────────────────────────────────┘

   Design patterns adapted from 21st.dev Process Timeline:
   - Dashed gold connector line across desktop nodes
   - Per-step icon inside the numbered circle
   - Deliverable pill at card bottom
   - Hover: card lifts + gold border intensifies
   - Dark navy section (#060D1A) — alternates with light sections

   Accessibility:
   - ol > li for semantic ordered list
   - aria-label on section
   - connector line is aria-hidden
   - step numbers have aria-hidden (visual only, list order conveys sequence)
================================================================ */

import Link         from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { PROCESS_STEPS } from '@/data/processSteps'


/* ── Per-step SVG icons ──────────────────────────────────────── */
/*
  Each icon reinforces the step's action at a glance.
  Inline SVGs — no external dependency, zero network request.
*/
const STEP_ICONS: Record<string, () => React.ReactElement> = {
  '01': () => (  /* Discovery — speech bubble / dialogue */
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  '02': () => (  /* Proposal — document / clipboard */
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  '03': () => (  /* Build — code brackets */
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  '04': () => (  /* Launch — rocket */
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
}

/* ── Deliverable pill ────────────────────────────────────────── */
function DeliverablePill({ text }: { text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 mt-auto pt-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Small diamond tick */}
      <span
        className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center"
        style={{ background: 'rgba(29,184,160,0.15)', border: '1px solid rgba(29,184,160,0.25)' }}
        aria-hidden="true"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
          stroke="#1DB8A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1.5 4l1.5 1.5L6.5 2.5"/>
        </svg>
      </span>
      <span
        className="font-mono text-[9.5px] tracking-[0.10em] uppercase leading-tight"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        {text}
      </span>
    </div>
  )
}

/* ── Step card ───────────────────────────────────────────────── */
/*
  Used on both mobile (vertical stack) and desktop (horizontal rail).
  The `index` prop drives staggered ScrollReveal delays.
  Card is intentionally tall enough to show full content without truncation.
*/
interface StepCardProps {
  step:        string
  title:       string
  body:        string
  duration?:   string
  deliverable?: string
  index:       number
  isLast:      boolean
}

function StepCard({ step, title, body, duration, deliverable, index, isLast }: StepCardProps) {
  const Icon = STEP_ICONS[step]
  const delay = `reveal-delay-${Math.min(index + 1, 5)}` as `reveal-delay-${number}`

  return (
    <ScrollReveal delay={delay} variant="scale" className="flex flex-col h-full">

      {/* ── Node + connector (desktop) ─────────────────────── */}
      {/*
        On desktop: a gold circle node sits above the card, centred on the
        column. The horizontal dashed connector line is drawn separately as
        an absolute-positioned element that spans all nodes.
        On mobile: the node is hidden; a vertical timeline line takes its place.
      */}
      <div className="hidden lg:flex flex-col items-center mb-6" aria-hidden="true">
        {/* Circle node */}
        <div
          className="relative flex items-center justify-center w-14 h-14 rounded-full z-10 transition-all duration-300"
          style={{
            background: 'rgba(201,168,76,0.10)',
            border:     '1.5px solid rgba(201,168,76,0.40)',
            boxShadow:  '0 0 0 6px rgba(201,168,76,0.04)',
          }}
        >
          {/* Icon */}
          <span style={{ color: '#C9A84C' }}>
            {Icon && <Icon />}
          </span>

          {/* Step number — absolute, top-right */}
          <span
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-bold"
            style={{ background: '#C9A84C', color: '#060D1A' }}
          >
            {step}
          </span>
        </div>
      </div>

      {/* ── Content card ───────────────────────────────────── */}
      <article
        className="group relative flex flex-col flex-1 p-6 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'rgba(255,255,255,0.028)',
          border:     '1px solid rgba(255,255,255,0.07)',
        }}
        aria-label={`Step ${step}: ${title}`}
      >
        {/* Gold left accent bar — scales into view on hover */}
        <span
          className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-l-xl"
          style={{ background: '#C9A84C' }}
          aria-hidden="true"
        />

        {/* Hover glow overlay */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(201,168,76,0.05) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Mobile-only: step node inline */}
        <div className="flex lg:hidden items-center gap-3 mb-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{
              background: 'rgba(201,168,76,0.10)',
              border:     '1.5px solid rgba(201,168,76,0.35)',
            }}
          >
            <span style={{ color: '#C9A84C' }}>{Icon && <Icon />}</span>
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[8px] font-bold"
              style={{ background: '#C9A84C', color: '#060D1A' }}
              aria-hidden="true"
            >
              {step}
            </span>
          </div>
          {/* Duration badge */}
          {duration && (
            <span
              className="font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(29,184,160,0.10)',
                border:     '1px solid rgba(29,184,160,0.20)',
                color:      '#1DB8A0',
              }}
            >
              {duration}
            </span>
          )}
        </div>

        {/* Duration badge — desktop only, top-right */}
        {duration && (
          <div className="hidden lg:flex justify-end mb-3">
            <span
              className="font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(29,184,160,0.10)',
                border:     '1px solid rgba(29,184,160,0.20)',
                color:      '#1DB8A0',
              }}
            >
              {duration}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="font-body font-bold text-[15.5px] leading-snug mb-3 relative z-10"
          style={{ color: '#F8F9FC', letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>

        {/* Body */}
        <p
          className="font-body text-[13px] leading-relaxed flex-1 relative z-10"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {body}
        </p>

        {/* Deliverable pill */}
        {deliverable && <DeliverablePill text={deliverable} />}
      </article>

    </ScrollReveal>
  )
}


/* ── Section ─────────────────────────────────────────────────── */

export default function ProcessSteps() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: '#060D1A' }}
      aria-label="Our engagement process"
    >
      {/* Gold top hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.35) 70%, transparent 100%)',
        }}
      />

      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Ambient glow — bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)' }}
      />

      <div className="section-container relative z-10">

        {/* ── Section header ─────────────────────────────────── */}
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))' }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(201,168,76,0.7)' }}
            >
              How We Work
            </span>
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }}
              aria-hidden="true"
            />
          </div>

          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize:      'clamp(32px, 4vw, 52px)',
              color:         '#F8F9FC',
              lineHeight:    1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Clear Process.{' '}
            <span className="text-gold-gradient">No Surprises.</span>
          </h2>

          <p
            className="font-body text-[15px] leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Every Elvatrixa engagement follows a structured four-step process
            designed to eliminate ambiguity and ensure on-time delivery.
          </p>
        </ScrollReveal>


        {/* ── Steps layout ───────────────────────────────────── */}
        <div className="relative">

          {/*
            Desktop connector rail:
            A horizontal dashed gold line connecting all 4 node circles.
            Positioned to bisect the 56px node circles (top: 28px from
            the top of the node row, which sits in a 56px + 24px mb wrapper).
            aria-hidden — purely decorative.
          */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute z-0"
            style={{
              top:        '27px',        /* vertically centred on the 56px node */
              left:       'calc(12.5% + 28px)',
              right:      'calc(12.5% + 28px)',
              height:     '1px',
              background: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.35) 0px, rgba(201,168,76,0.35) 6px, transparent 6px, transparent 14px)',
            }}
          />

          {/*
            Mobile vertical timeline bar:
            A thin gold line running down the left side of the step stack,
            inside the cards container. Visible only on mobile/tablet.
          */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute left-[19px] top-10 bottom-10 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.1) 100%)',
            }}
          />

          {/* Ordered list — semantic sequence for screen readers */}
          <ol
            className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-4 relative z-10"
            aria-label="Project engagement steps"
          >
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.step} className="flex flex-col">
                {/* Mobile left offset — aligns content right of the vertical bar */}
                <div className="flex lg:flex-col gap-4 lg:gap-0 lg:h-full pl-10 lg:pl-0">
                  {/*
                    Mobile dot — sits on the vertical timeline bar.
                    Absolutely positioned relative to the li.
                  */}
                  <div
                    className="lg:hidden absolute left-[9px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-20"
                    style={{
                      background: 'rgba(201,168,76,0.15)',
                      border:     '1.5px solid rgba(201,168,76,0.5)',
                      top:        `calc(${i * 25}% + 0.5rem)`,
                    }}
                    aria-hidden="true"
                  >
                    <span style={{ color: '#C9A84C', fontSize: '8px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {step.step}
                    </span>
                  </div>

                  {/* The actual card */}
                  <div className="flex-1 flex flex-col">
                    <StepCard
                      step={step.step}
                      title={step.title}
                      body={step.body}
                      duration={step.duration}
                      deliverable={step.deliverable}
                      index={i}
                      isLast={i === PROCESS_STEPS.length - 1}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>


        {/* ── CTA strip ──────────────────────────────────────── */}
        <ScrollReveal className="mt-14">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div>
              <p
                className="font-display font-bold text-[17px] mb-1"
                style={{ color: '#F8F9FC', letterSpacing: '-0.01em' }}
              >
                Ready to start Step 01?
              </p>
              <p
                className="font-mono text-[9.5px] tracking-[0.10em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Free 30-minute call · No obligation · Response within 24 hours
              </p>
            </div>

            <Link href="/contact" className="btn-primary flex-shrink-0">
              Book Your Discovery Call
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
