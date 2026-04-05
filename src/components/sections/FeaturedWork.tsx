/* ================================================================
   ELVATRIXA — FEATURED WORK
   File: src/components/sections/FeaturedWork.tsx

   Server Component — no 'use client'.
   Layout: asymmetric bento grid (1 large + 2 stacked).
   Dark navy section for maximum visual contrast after ServicesGrid.
   All hover effects via Tailwind group-hover.
================================================================ */

import Image        from 'next/image'
import Link         from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { featuredCaseStudies } from '@/data/caseStudies'
import type { CaseStudy } from '@/types'


/* ── Icons ──────────────────────────────────────────────────── */

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5h9M8 3.5l3 3-3 3"/>
  </svg>
)


/* ── Shared badge ────────────────────────────────────────────── */
function Badge({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      className="inline-flex items-center font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
      style={
        gold
          ? { background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: '#C9A84C' }
          : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.65)' }
      }
    >
      {children}
    </span>
  )
}


/* ── Result metric pill ──────────────────────────────────────── */
function Metric({ value, label, large = false }: { value: string; label: string; large?: boolean }) {
  return (
    <div className="flex flex-col">
      <span
        className="font-display font-bold leading-none"
        style={{ fontSize: large ? '32px' : '22px', color: '#C9A84C', letterSpacing: '-0.02em' }}
      >
        {value}
      </span>
      <span
        className="font-mono leading-tight mt-1"
        style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}
      >
        {label}
      </span>
    </div>
  )
}


/* ── Large (hero) card ───────────────────────────────────────── */
function LargeCard({ study }: { study: CaseStudy }) {
  return (
    <ScrollReveal delay="reveal-delay-1" variant="scale" className="lg:col-span-4 lg:row-span-2">
      <Link
        href={`/work/${study.slug}`}
        className="group relative flex h-[420px] lg:h-full overflow-hidden rounded-2xl"
        aria-label={`View case study: ${study.title}`}
      >
        {/* Image */}
        <Image
          src={study.imageUrl}
          alt={study.title}
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />

        {/* Base gradient — always visible for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(4,9,20,0.97) 0%, rgba(4,9,20,0.6) 45%, rgba(4,9,20,0.15) 75%, transparent 100%)',
          }}
        />

        {/* Gold tint overlay — appears on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(201,168,76,0.08) 0%, transparent 60%)' }}
        />

        {/* Top badges */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <Badge gold>{study.service}</Badge>
          <Badge>{study.industry}</Badge>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">

          {/* Metrics row — top 3 results */}
          <div className="flex gap-6 mb-5">
            {study.results.slice(0, 3).map(r => (
              <Metric key={r.label} value={r.value} label={r.label} large />
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Title */}
          <h3
            className="font-display font-bold mb-2 transition-colors duration-200 group-hover:text-gold-gradient"
            style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#F8F9FC', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            {study.title}
          </h3>

          {/* Client + CTA */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {study.client}
            </span>
            <span
              className="flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
              style={{ color: '#C9A84C' }}
            >
              View Case Study
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight />
              </span>
            </span>
          </div>

          {/* Client quote — visible on hover */}
          {study.clientQuote && (
            <div
              className="mt-4 overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-20"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p
                className="font-body text-xs italic leading-relaxed pt-3 line-clamp-2"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                &ldquo;{study.clientQuote}&rdquo;
                {study.clientName && (
                  <span className="not-italic font-semibold ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    — {study.clientName}
                  </span>
                )}
              </p>
            </div>
          )}

        </div>

        {/* Ring glow on hover */}
        <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 group-hover:ring-gold/25 transition-all duration-300 pointer-events-none" />
      </Link>
    </ScrollReveal>
  )
}


/* ── Small card ──────────────────────────────────────────────── */
function SmallCard({ study, delay }: { study: CaseStudy; delay: string }) {
  return (
    <ScrollReveal delay={delay as `reveal-delay-${number}`} variant="scale" className="lg:col-span-2">
      <Link
        href={`/work/${study.slug}`}
        className="group relative flex h-[260px] lg:h-full overflow-hidden rounded-2xl"
        aria-label={`View case study: ${study.title}`}
      >
        {/* Image */}
        <Image
          src={study.imageUrl}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(4,9,20,0.97) 0%, rgba(4,9,20,0.5) 50%, rgba(4,9,20,0.1) 100%)',
          }}
        />

        {/* Gold hover tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(201,168,76,0.1) 0%, transparent 55%)' }}
        />

        {/* Service badge */}
        <div className="absolute top-4 left-4">
          <Badge gold>{study.service}</Badge>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5">

          {/* Key metric */}
          <div className="mb-3">
            <Metric value={study.results[0].value} label={study.results[0].label} />
          </div>

          {/* Title */}
          <h3
            className="font-body font-bold text-sm leading-snug mb-2 transition-colors duration-200"
            style={{ color: '#F8F9FC' }}
          >
            {study.title}
          </h3>

          {/* Client + tech tags row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1.5 flex-wrap">
              {study.tech.slice(0, 2).map(t => (
                <span
                  key={t}
                  className="font-mono text-[9px] tracking-wide rounded-full px-2 py-0.5"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              className="flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase flex-shrink-0 transition-all duration-200 group-hover:gap-1.5"
              style={{ color: '#C9A84C' }}
            >
              View <ArrowUpRight />
            </span>
          </div>

        </div>

        {/* Ring glow on hover */}
        <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 group-hover:ring-gold/25 transition-all duration-300 pointer-events-none" />
      </Link>
    </ScrollReveal>
  )
}


/* ── Section ─────────────────────────────────────────────────── */

export default function FeaturedWork() {
  const [featured, second, third] = featuredCaseStudies

  if (!featured) return null

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{
        background:           '#060D1A',
        backgroundImage:      'radial-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)',
        backgroundSize:       '28px 28px',
      }}
    >
      {/* Gold top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.4) 70%, transparent 100%)',
        }}
      />

      {/* Ambient glow — top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">

        {/* ── Section header ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">

          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="h-px w-8 flex-shrink-0"
                  style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.7)' }}
                >
                  Featured Work
                </span>
              </div>

              <h2
                className="font-display font-bold"
                style={{
                  fontSize:      'clamp(32px, 4vw, 52px)',
                  color:         '#F8F9FC',
                  letterSpacing: '-0.03em',
                  lineHeight:    1.05,
                }}
              >
                Results That{' '}
                <span className="text-gold-gradient">Speak for Themselves</span>
              </h2>

              <p
                className="mt-3 font-body text-sm max-w-lg"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                A selection of projects delivered for clients in the US and UK —
                each with verified commercial outcomes.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-2">
            <Link
              href="/work"
              className="group flex-shrink-0 flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-3"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <span className="group-hover:text-white transition-colors duration-200">
                View all case studies
              </span>
              <span
                className="flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200 group-hover:border-gold/50 group-hover:text-gold"
                style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.35)' }}
              >
                <ArrowRight />
              </span>
            </Link>
          </ScrollReveal>

        </div>


        {/* ── Bento grid ─────────────────────────────────── */}
        {/*
          Desktop: large card (col-span-4 × row-span-2) + 2 stacked cards (col-span-2 × row-span-1 each)
          Each row is 300px → large card = 300+gap+300 ≈ 604px tall
        */}
        <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-[300px_300px] gap-4">
          {/* Large featured card */}
          <LargeCard study={featured} />

          {/* Stacked smaller cards */}
          {second && <SmallCard study={second} delay="reveal-delay-2" />}
          {third  && <SmallCard study={third}  delay="reveal-delay-3" />}
        </div>


        {/* ── Trust metrics strip ─────────────────────────── */}
        <ScrollReveal className="mt-10">
          <div
            className="flex flex-wrap items-center justify-between gap-6 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {[
              { value: '50+',  label: 'Projects Delivered'        },
              { value: '£4.2M', label: 'Client Revenue Generated' },
              { value: '12+',  label: 'Countries Served'          },
              { value: '98%',  label: 'Client Satisfaction'       },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="font-display font-bold leading-none"
                  style={{ fontSize: '28px', color: '#C9A84C', letterSpacing: '-0.02em' }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.12em] uppercase mt-1"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}

            <Link
              href="/contact"
              className="btn-primary flex-shrink-0"
              style={{ fontSize: '12px', padding: '10px 20px' }}
            >
              Start Your Project
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
