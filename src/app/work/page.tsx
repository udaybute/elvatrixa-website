/* ================================================================
   ELVATRIXA — WORK / PORTFOLIO PAGE
   File: src/app/work/page.tsx

   Design direction: Editorial precision meets dark luxury.
   An agency-grade portfolio grid that communicates credibility
   through specificity — real metrics, not vague claims.

   Layout:
   - Full-bleed hero with oversized display type
   - Masonry-inspired asymmetric grid (CSS Grid areas)
   - First card spans 2 columns — featured treatment
   - Each card: full-bleed image, results overlay, hover reveal
   - Pure Server Component — zero client JS
================================================================ */

import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { buildPageMetadata, breadcrumbSchema } from '@/lib/seo'
import { CASE_STUDIES }  from '@/data/caseStudies'
import ScrollReveal      from '@/components/ui/ScrollReveal'

export const metadata: Metadata = buildPageMetadata({
  title:       'Our Work',
  description:
    'Case studies from Elvatrixa — SaaS platforms, AI automation, and e-commerce ' +
    'projects delivered for US and UK clients with measurable results.',
  canonical:   '/work',
  keywords: [
    'SaaS development case studies',
    'AI automation projects',
    'web development portfolio UK',
    'digital agency work',
  ],
})

/* ── SVG ICONS ───────────────────────────────────────────────── */

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
)

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11L11 3M5 3h6v6"/>
  </svg>
)

/* ── SERVICE COLOUR MAP ──────────────────────────────────────── */
/*
  Each service category gets a distinct accent colour for
  its badge — creates visual taxonomy across the grid.
*/
const SERVICE_ACCENT: Record<string, { bg: string; text: string; border: string }> = {
  'SaaS Development':       { bg: 'rgba(201,168,76,0.12)',  text: '#E8C96A', border: 'rgba(201,168,76,0.30)'  },
  'AI & Automation':        { bg: 'rgba(29,184,160,0.12)',  text: '#2DD4BC', border: 'rgba(29,184,160,0.30)'  },
  'E-Commerce Development': { bg: 'rgba(248,113,113,0.12)', text: '#FCA5A5', border: 'rgba(248,113,113,0.30)' },
  'Data & Analytics':       { bg: 'rgba(88,166,255,0.12)',  text: '#79B8FF', border: 'rgba(88,166,255,0.30)'  },
  'Performance':            { bg: 'rgba(52,211,153,0.12)',  text: '#6EE7B7', border: 'rgba(52,211,153,0.30)'  },
}

function ServiceBadge({ service }: { service: string }) {
  const accent = SERVICE_ACCENT[service] ?? SERVICE_ACCENT['SaaS Development']
  return (
    <span
      className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm"
      style={{ background: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}
    >
      {service}
    </span>
  )
}

/* ── FEATURED CARD (first case study, large) ─────────────────── */

function FeaturedCard({ study }: { study: typeof CASE_STUDIES[0] }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative block rounded-2xl overflow-hidden"
      style={{ minHeight: '520px' }}
      aria-label={`View case study: ${study.title}`}
    >
      {/* Background image */}
      <div className="absolute inset-0 transition-transform duration-700 ease-luxury group-hover:scale-105">
        <Image
          src={study.imageUrl}
          alt={study.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>

      {/* Gradient overlays — layered for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(6,8,16,0.97) 0%, rgba(6,8,16,0.75) 40%, rgba(6,8,16,0.20) 70%, transparent 100%)',
        }}
      />
      {/* Left-side vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(6,8,16,0.50) 0%, transparent 60%)',
        }}
      />

      {/* Gold top border — revealed on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
        style={{
          background:
            'linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
        {/* Top row — badges */}
        <div className="flex items-start justify-between">
          <ServiceBadge service={study.service} />
          <span
            className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border:     '1px solid rgba(255,255,255,0.10)',
              color:      'var(--text-4)',
            }}
          >
            {study.industry}
          </span>
        </div>

        {/* Bottom — title + metrics + CTA */}
        <div>
          {/* Client */}
          <p
            className="font-mono text-[11px] tracking-widest uppercase mb-3"
            style={{ color: 'var(--text-4)' }}
          >
            {study.client}
          </p>

          {/* Title */}
          <h2
            className="font-display font-bold mb-6 leading-tight transition-colors duration-300 group-hover:text-gold-gradient"
            style={{
              fontSize:      'clamp(28px, 3.5vw, 48px)',
              color:         'var(--text-1)',
              letterSpacing: '-0.02em',
            }}
          >
            {study.title}
          </h2>

          {/* Metrics row */}
          <div
            className="flex flex-wrap gap-6 mb-6 pb-6"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {study.results.slice(0, 3).map(result => (
              <div key={result.label}>
                <p
                  className="font-display font-bold leading-none mb-1"
                  style={{ fontSize: '28px', color: 'var(--gold)' }}
                >
                  {result.value}
                </p>
                <p
                  className="font-body text-xs leading-tight"
                  style={{ color: 'var(--text-4)' }}
                >
                  {result.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tech + CTA row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {study.tech.slice(0, 4).map(t => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-wide px-2 py-1 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border:     '1px solid rgba(255,255,255,0.08)',
                    color:      'var(--text-3)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <span
              className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider shrink-0 transition-all duration-200 group-hover:gap-3"
              style={{ color: 'var(--gold)' }}
            >
              View Case Study
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── COMPACT CARD (remaining case studies) ───────────────────── */

function CompactCard({ study }: { study: typeof CASE_STUDIES[0] }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'var(--bg-3)',
        border:     '1px solid var(--border-subtle)',
        minHeight:  '400px',
      }}
      aria-label={`View case study: ${study.title}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <div className="absolute inset-0 transition-transform duration-500 ease-luxury group-hover:scale-105">
          <Image
            src={study.imageUrl}
            alt={study.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(22,27,34,1) 0%, rgba(22,27,34,0.6) 50%, rgba(22,27,34,0.1) 100%)',
          }}
        />
        {/* Gold top border on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
          style={{ background: 'var(--gold)' }}
          aria-hidden="true"
        />
        {/* Badges over image */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <ServiceBadge service={study.service} />
        </div>
        {/* Metrics anchored to bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-5">
            {study.results.slice(0, 2).map(r => (
              <div key={r.label}>
                <p
                  className="font-display font-bold leading-none"
                  style={{ fontSize: '22px', color: 'var(--gold)' }}
                >
                  {r.value}
                </p>
                <p
                  className="font-body text-[10px] mt-0.5 leading-tight"
                  style={{ color: 'var(--text-3)' }}
                >
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--text-4)' }}
        >
          {study.client}
        </p>

        <h3
          className="font-body font-bold text-base leading-snug mb-3 transition-colors duration-200 group-hover:text-gold"
          style={{ color: 'var(--text-1)' }}
        >
          {study.title}
        </h3>

        <p
          className="font-body text-sm leading-relaxed mb-4 flex-1 line-clamp-3"
          style={{ color: 'var(--text-3)' }}
        >
          {study.description}
        </p>

        {/* Divider */}
        <div className="w-full h-px mb-4" style={{ background: 'var(--border-subtle)' }} />

        {/* Tech + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            {study.tech.slice(0, 3).map(t => (
              <span
                key={t}
                className="font-mono text-[9px] tracking-wide px-2 py-0.5 rounded"
                style={{
                  background: 'var(--bg-4)',
                  border:     '1px solid var(--border-subtle)',
                  color:      'var(--text-4)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <span
            className="flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase shrink-0 transition-all duration-200 group-hover:gap-1.5 group-hover:opacity-100 opacity-70"
            style={{ color: 'var(--gold)' }}
          >
            View <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ── PAGE ────────────────────────────────────────────────────── */

export default function WorkPage() {
  const [featured, ...rest] = CASE_STUDIES

  return (
    <>
      {/* JSON-LD: Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Work', url: '/work' },
            ]),
          ),
        }}
      />

      <div style={{ background: 'var(--bg-1)' }}>

        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'var(--bg-0)', paddingTop: 'clamp(80px, 12vw, 140px)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}
        >
          {/* Radial gold glow — top centre */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(201,168,76,0.12) 0%, transparent 65%)',
            }}
          />
          {/* Dot grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.18) 1px, transparent 1px)',
              backgroundSize:  '28px 28px',
            }}
          />
          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
            style={{ background: 'linear-gradient(to top, var(--bg-1), transparent)' }}
          />

          <div className="section-container relative z-10">
            <div className="max-w-4xl">

              {/* Label row */}
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-7">
                  <span
                    className="block h-px w-10 shrink-0"
                    style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                    aria-hidden="true"
                  />
                  <span className="section-label">Portfolio</span>
                </div>
              </ScrollReveal>

              {/* Headline — two lines, different weights */}
              <ScrollReveal delay="reveal-delay-1">
                <h1
                  className="font-display font-bold mb-6"
                  style={{ letterSpacing: '-0.03em', lineHeight: '0.93' }}
                >
                  <span
                    className="block text-gold-gradient"
                    style={{ fontSize: 'clamp(52px, 8.5vw, 112px)' }}
                  >
                    Results
                  </span>
                  <span
                    className="block"
                    style={{ fontSize: 'clamp(36px, 6vw, 80px)', color: 'var(--text-2)' }}
                  >
                    That Speak.
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subheading */}
              <ScrollReveal delay="reveal-delay-2">
                <p
                  className="font-body leading-relaxed max-w-xl"
                  style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-3)' }}
                >
                  Every engagement below is measured by business outcomes —
                  revenue generated, hours saved, scores improved.
                  Numbers, not adjectives.
                </p>
              </ScrollReveal>

              {/* Stats strip */}
              <ScrollReveal delay="reveal-delay-3">
                <div
                  className="flex flex-wrap gap-8 mt-10 pt-8"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  {[
                    { value: `${CASE_STUDIES.length}+`, label: 'Case Studies' },
                    { value: '3',                        label: 'Industries' },
                    { value: 'US & UK',                  label: 'Markets' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <p
                        className="font-display font-bold leading-none mb-1"
                        style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: 'var(--gold)' }}
                      >
                        {stat.value}
                      </p>
                      <p className="font-body text-sm" style={{ color: 'var(--text-4)' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            PORTFOLIO GRID
        ════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
          <div className="section-container">

            {/* Featured card — full width */}
            <ScrollReveal className="mb-6">
              <FeaturedCard study={featured} />
            </ScrollReveal>

            {/* Remaining cards — 3-column grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((study, i) => (
                  <ScrollReveal
                    key={study.slug}
                    delay={
                      (
                        ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const
                      )[i % 3]
                    }
                  >
                    <CompactCard study={study} />
                  </ScrollReveal>
                ))}
              </div>
            )}

          </div>
        </section>


        {/* ════════════════════════════════════════════
            BOTTOM CTA BAND
        ════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{
            background: 'var(--bg-0)',
            borderTop:  '1px solid var(--border-subtle)',
            paddingTop: 'clamp(64px, 8vw, 100px)',
            paddingBottom: 'clamp(64px, 8vw, 100px)',
          }}
        >
          {/* Upward glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 110%, rgba(201,168,76,0.10) 0%, transparent 65%)',
            }}
          />

          <div className="section-container relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

              <div className="max-w-lg">
                <p
                  className="font-mono text-[10px] tracking-widest uppercase mb-3"
                  style={{ color: 'var(--text-4)' }}
                >
                  Your project, next
                </p>
                <h2
                  className="font-display font-bold leading-tight"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-1)', letterSpacing: '-0.02em' }}
                >
                  Ready to add your results to this page?
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <Link href="/contact" className="btn-primary">
                  Start a Project
                </Link>
                <Link href="/services" className="btn-secondary">
                  View Services
                </Link>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  )
}