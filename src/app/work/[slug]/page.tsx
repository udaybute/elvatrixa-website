/* ================================================================
   ELVATRIXA — CASE STUDY DETAIL PAGE
   File: src/app/work/[slug]/page.tsx

   Design direction: Immersive editorial — think a premium
   agency case study, not a generic portfolio page.

   Layout sections:
   1. Hero  — full-bleed image, title, client, key metric
   2. Brief — challenge + approach two-column prose
   3. Results — large animated metric cards
   4. Tech stack — categorised chips
   5. Client quote — pulled quote with gold accent
   6. More work — 2 adjacent case study cards
   7. CTA — start a project

   Pure Server Component — statically generated via
   generateStaticParams(). Zero client JS.
================================================================ */

import type { Metadata }     from 'next'
import { notFound }          from 'next/navigation'
import Link                  from 'next/link'
import Image                 from 'next/image'
import {
  buildPageMetadata,
  breadcrumbSchema,
  articleSchema,
}                            from '@/lib/seo'
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  CASE_STUDIES,
}                            from '@/data/caseStudies'
import ScrollReveal          from '@/components/ui/ScrollReveal'


/* ── STATIC PARAMS ───────────────────────────────────────────── */

export function generateStaticParams() {
  return getCaseStudySlugs()
}


/* ── DYNAMIC METADATA ────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug }    = await params
  const study       = getCaseStudyBySlug(slug)
  if (!study) return {}

  return buildPageMetadata({
    title:       study.title,
    description: study.description.slice(0, 160),
    canonical:   `/work/${study.slug}`,
    ogImage:     study.imageUrl,
    keywords:    [study.service, study.industry, ...study.tech.slice(0, 3)],
  })
}


/* ── SVG ICONS ───────────────────────────────────────────────── */

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7H2M6 3l-4 4 4 4"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

const QuoteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
    <path d="M14 22c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-4l-4 6v-6zm20 0c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-4l-4 6v-6z"/>
  </svg>
)


/* ── SERVICE ACCENT COLOURS ──────────────────────────────────── */

const SERVICE_ACCENT: Record<string, string> = {
  'SaaS Development':       '#E8C96A',
  'AI & Automation':        '#2DD4BC',
  'E-Commerce Development': '#FCA5A5',
  'Data & Analytics':       '#79B8FF',
  'Performance':            '#6EE7B7',
}


/* ── PAGE ────────────────────────────────────────────────────── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study    = getCaseStudyBySlug(slug)
  if (!study) notFound()

  /* Adjacent case studies for prev/next */
  const currentIdx = CASE_STUDIES.findIndex(s => s.slug === slug)
  const prevStudy  = currentIdx > 0 ? CASE_STUDIES[currentIdx - 1] : null
  const nextStudy  = currentIdx < CASE_STUDIES.length - 1 ? CASE_STUDIES[currentIdx + 1] : null

  /* More work — 2 other case studies (not current) */
  const moreWork = CASE_STUDIES
    .filter(s => s.slug !== slug)
    .slice(0, 2)

  const accentColour = SERVICE_ACCENT[study.service] ?? '#E8C96A'

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Work', url: '/work' },
              { name: study.title, url: `/work/${study.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema(
              study.title,
              study.description.slice(0, 160),
              `/work/${study.slug}`,
              study.imageUrl,
              new Date().toISOString().split('T')[0],
            ),
          ),
        }}
      />

      <article style={{ background: 'var(--bg-1)' }}>

        {/* ════════════════════════════════════════════
            HERO — Full bleed image + overlay content
        ════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{ minHeight: 'clamp(520px, 70vh, 760px)' }}
        >
          {/* Full-bleed cover image */}
          <div className="absolute inset-0">
            <Image
              src={study.imageUrl}
              alt={study.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Multi-layer gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(6,8,16,0.98) 0%, rgba(6,8,16,0.82) 35%, rgba(6,8,16,0.45) 65%, rgba(6,8,16,0.20) 100%)',
            }}
          />
          {/* Left vignette for text contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(6,8,16,0.65) 0%, transparent 55%)',
            }}
          />

          {/* Coloured accent line at bottom — service-specific colour */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${accentColour} 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />

          {/* Hero content */}
          <div className="section-container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16"
            style={{ paddingTop: 'clamp(120px, 18vw, 180px)' }}
          >
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mb-8"
            >
              <Link
                href="/work"
                className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors duration-150 hover:opacity-100 opacity-70"
                style={{ color: 'var(--text-2)' }}
              >
                <ArrowLeft />
                All Work
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.20)' }}>/</span>
              <span
                className="font-mono text-[11px] tracking-wider uppercase"
                style={{ color: accentColour }}
              >
                {study.service}
              </span>
            </nav>

            {/* Client + Industry */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-sm"
                style={{
                  background: `${accentColour}18`,
                  border:     `1px solid ${accentColour}40`,
                  color:      accentColour,
                }}
              >
                {study.service}
              </span>
              <span
                className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-sm"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border:     '1px solid rgba(255,255,255,0.10)',
                  color:      'var(--text-4)',
                }}
              >
                {study.industry}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display font-bold mb-6 max-w-3xl"
              style={{
                fontSize:      'clamp(36px, 6vw, 72px)',
                lineHeight:    '0.95',
                letterSpacing: '-0.03em',
                color:         'var(--text-1)',
              }}
            >
              {study.title}
            </h1>

            {/* Client */}
            <p
              className="font-mono text-sm tracking-wider"
              style={{ color: 'var(--text-3)' }}
            >
              {study.client}
            </p>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            RESULTS METRICS
        ════════════════════════════════════════════ */}
        <section
          style={{
            background:   'var(--bg-2)',
            borderTop:    `1px solid ${accentColour}30`,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="section-container py-12 md:py-16">
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${Math.min(study.results.length, 4)}, 1fr)`,
              }}
            >
              {study.results.map((result, i) => (
                <ScrollReveal
                  key={result.label}
                  delay={
                    (['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[
                      Math.min(i, 3)
                    ]
                  }
                >
                  <div
                    className="relative flex flex-col items-center text-center px-6 py-8"
                    style={i > 0 ? { borderLeft: '1px solid var(--border-subtle)' } : {}}
                  >
                    {/* Metric value */}
                    <p
                      className="font-display font-bold leading-none mb-2"
                      style={{
                        fontSize: 'clamp(36px, 5vw, 56px)',
                        color:    accentColour,
                      }}
                    >
                      {result.value}
                    </p>
                    {/* Gold underline */}
                    <span
                      className="block w-8 h-px mb-3"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accentColour}, transparent)`,
                      }}
                      aria-hidden="true"
                    />
                    {/* Label */}
                    <p
                      className="font-body text-sm tracking-wide"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {result.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            BRIEF — CHALLENGE + APPROACH
        ════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

              {/* Main prose — 8 cols */}
              <div className="lg:col-span-8">

                {/* Section label */}
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="block h-px w-8"
                      style={{ background: `linear-gradient(90deg, ${accentColour}, transparent)` }}
                      aria-hidden="true"
                    />
                    <span className="section-label">The Project</span>
                  </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal delay="reveal-delay-1">
                  <p
                    className="font-body leading-[1.85] mb-8"
                    style={{
                      fontSize: 'clamp(16px, 1.8vw, 18px)',
                      color:    'var(--text-2)',
                    }}
                  >
                    {study.description}
                  </p>
                </ScrollReveal>

                {/* Client quote — if present */}
                {study.clientQuote && (
                  <ScrollReveal delay="reveal-delay-2">
                    <blockquote
                      className="relative pl-6 my-10"
                      style={{ borderLeft: `3px solid ${accentColour}` }}
                    >
                      {/* Decorative open quote */}
                      <div
                        className="absolute -top-4 -left-3 opacity-[0.12]"
                        style={{ color: accentColour }}
                      >
                        <QuoteIcon />
                      </div>
                      <p
                        className="font-display font-bold italic mb-4 relative z-10"
                        style={{
                          fontSize: 'clamp(20px, 2.5vw, 28px)',
                          color:    'var(--text-1)',
                          lineHeight: 1.3,
                        }}
                      >
                        &ldquo;{study.clientQuote}&rdquo;
                      </p>
                      {study.clientName && (
                        <cite
                          className="font-mono text-[11px] tracking-widest uppercase not-italic"
                          style={{ color: 'var(--text-4)' }}
                        >
                          — {study.clientName}, {study.client}
                        </cite>
                      )}
                    </blockquote>
                  </ScrollReveal>
                )}
              </div>

              {/* Sidebar — 4 cols */}
              <div className="lg:col-span-4">
                <ScrollReveal delay="reveal-delay-2">

                  {/* Project meta card */}
                  <div
                    className="rounded-xl p-6 sticky top-24"
                    style={{
                      background: 'var(--bg-3)',
                      border:     '1px solid var(--border-subtle)',
                      borderTop:  `3px solid ${accentColour}`,
                    }}
                  >
                    <h2
                      className="font-mono text-[11px] tracking-widest uppercase mb-5"
                      style={{ color: 'var(--text-4)' }}
                    >
                      Project Details
                    </h2>

                    {[
                      { label: 'Client',   value: study.client   },
                      { label: 'Service',  value: study.service  },
                      { label: 'Industry', value: study.industry },
                    ].map(row => (
                      <div
                        key={row.label}
                        className="flex flex-col gap-0.5 py-3"
                        style={{ borderBottom: '1px solid var(--border-subtle)' }}
                      >
                        <span
                          className="font-mono text-[10px] tracking-widest uppercase"
                          style={{ color: 'var(--text-4)' }}
                        >
                          {row.label}
                        </span>
                        <span
                          className="font-body text-sm font-medium"
                          style={{ color: 'var(--text-2)' }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}

                    {/* CTA */}
                    <div className="mt-6">
                      <Link href="/contact" className="btn-primary w-full text-center block">
                        Start a Similar Project
                      </Link>
                    </div>
                  </div>

                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            TECH STACK
        ════════════════════════════════════════════ */}
        <section
          className="section-pad-sm"
          style={{
            background: 'var(--bg-2)',
            borderTop:  '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="section-container">
            <ScrollReveal>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p
                    className="font-mono text-[11px] tracking-widest uppercase mb-2"
                    style={{ color: 'var(--text-4)' }}
                  >
                    Built with
                  </p>
                  <h2
                    className="font-display font-bold"
                    style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text-1)' }}
                  >
                    Technology Stack
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.tech.map(tech => (
                    <span
                      key={tech}
                      className="font-mono text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'var(--bg-3)',
                        border:     `1px solid ${accentColour}30`,
                        color:      accentColour,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            MORE WORK
        ════════════════════════════════════════════ */}
        {moreWork.length > 0 && (
          <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
            <div className="section-container">

              <ScrollReveal>
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="block h-px w-8"
                        style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                        aria-hidden="true"
                      />
                      <span className="section-label">More Work</span>
                    </div>
                    <h2
                      className="font-display font-bold"
                      style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', color: 'var(--text-1)', lineHeight: 1.1 }}
                    >
                      Other Case Studies
                    </h2>
                  </div>
                  <Link
                    href="/work"
                    className="hidden sm:flex items-center gap-2 font-body text-sm transition-colors duration-150 hover:text-gold"
                    style={{ color: 'var(--text-3)' }}
                  >
                    View all
                    <ArrowRight />
                  </Link>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {moreWork.map((s, i) => {
                  const accent = SERVICE_ACCENT[s.service] ?? '#E8C96A'
                  return (
                    <ScrollReveal
                      key={s.slug}
                      delay={i === 0 ? 'reveal-delay-1' : 'reveal-delay-2'}
                    >
                      <Link
                        href={`/work/${s.slug}`}
                        className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                        style={{
                          background: 'var(--bg-3)',
                          border:     '1px solid var(--border-subtle)',
                        }}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden shrink-0">
                          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                            <Image
                              src={s.imageUrl}
                              alt={s.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                'linear-gradient(to top, rgba(22,27,34,1) 0%, rgba(22,27,34,0.5) 50%, transparent 100%)',
                            }}
                          />
                          {/* Accent top border on hover */}
                          <div
                            className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                            style={{ background: accent }}
                            aria-hidden="true"
                          />
                          <div className="absolute top-4 left-4">
                            <span
                              className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm"
                              style={{
                                background: `${accent}18`,
                                border:     `1px solid ${accent}40`,
                                color:      accent,
                              }}
                            >
                              {s.service}
                            </span>
                          </div>
                          {/* Metrics */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-5">
                            {s.results.slice(0, 2).map(r => (
                              <div key={r.label}>
                                <p
                                  className="font-display font-bold leading-none"
                                  style={{ fontSize: '20px', color: accent }}
                                >
                                  {r.value}
                                </p>
                                <p
                                  className="font-body text-[10px] mt-0.5"
                                  style={{ color: 'var(--text-3)' }}
                                >
                                  {r.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col gap-2">
                          <p
                            className="font-mono text-[10px] tracking-widest uppercase"
                            style={{ color: 'var(--text-4)' }}
                          >
                            {s.client}
                          </p>
                          <h3
                            className="font-body font-bold text-base leading-snug transition-colors duration-200 group-hover:text-gold"
                            style={{ color: 'var(--text-1)' }}
                          >
                            {s.title}
                          </h3>
                          <div
                            className="flex items-center gap-1.5 mt-1 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
                            style={{ color: 'var(--gold)' }}
                          >
                            View Case Study
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              <ArrowRight />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>

            </div>
          </section>
        )}


        {/* ════════════════════════════════════════════
            PREV / NEXT NAVIGATION
        ════════════════════════════════════════════ */}
        <section
          style={{
            background:   'var(--bg-0)',
            borderTop:    '1px solid var(--border-subtle)',
          }}
        >
          <div className="section-container">
            <div className="flex items-center justify-between py-8">

              {prevStudy ? (
                <Link
                  href={`/work/${prevStudy.slug}`}
                  className="flex items-center gap-3 group max-w-xs"
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full border shrink-0 transition-all duration-200 group-hover:border-gold group-hover:text-gold"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-4)' }}
                  >
                    <ArrowLeft />
                  </span>
                  <div>
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--text-4)' }}
                    >
                      Previous
                    </p>
                    <p
                      className="font-body text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-gold line-clamp-1"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {prevStudy.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/work"
                  className="flex items-center gap-2 font-body text-sm transition-colors duration-150 hover:text-gold"
                  style={{ color: 'var(--text-3)' }}
                >
                  <ArrowLeft />
                  All Work
                </Link>
              )}

              {nextStudy ? (
                <Link
                  href={`/work/${nextStudy.slug}`}
                  className="flex items-center gap-3 group max-w-xs text-right"
                >
                  <div>
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--text-4)' }}
                    >
                      Next
                    </p>
                    <p
                      className="font-body text-sm font-medium leading-snug transition-colors duration-200 group-hover:text-gold line-clamp-1"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {nextStudy.title}
                    </p>
                  </div>
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full border shrink-0 transition-all duration-200 group-hover:border-gold group-hover:text-gold"
                    style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-4)' }}
                  >
                    <ArrowRight />
                  </span>
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="flex items-center gap-2 font-body text-sm transition-colors duration-150 hover:text-gold"
                  style={{ color: 'var(--text-3)' }}
                >
                  Start a Project
                  <ArrowRight />
                </Link>
              )}

            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════
            CTA
        ════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden section-pad"
          style={{ background: 'var(--bg-0)' }}
        >
          {/* Upward glow in the service accent colour */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 50% 120%, ${accentColour}14 0%, transparent 65%)`,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColour}40 30%, ${accentColour} 50%, ${accentColour}40 70%, transparent 100%)`,
            }}
          />

          <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
            <ScrollReveal>
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-4)' }}
              >
                Ready to build yours?
              </p>
              <h2
                className="font-display font-bold text-gold-gradient mb-5"
                style={{ fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: '0.95', letterSpacing: '-0.025em' }}
              >
                Let&apos;s Create<br />Your Case Study
              </h2>
              <p
                className="font-body leading-relaxed mb-8"
                style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'var(--text-3)' }}
              >
                Book a free 30-minute strategy call. We&apos;ll scope your project,
                answer every question, and send you a fixed-price proposal within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Book a Free Strategy Call
                </Link>
                <a
                  href="https://wa.me/918668296156"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  WhatsApp Us
                </a>
              </div>
              <p
                className="mt-5 font-mono text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--text-4)' }}
              >
                Reply within 4 hours · Fixed-price proposals · No commitment required
              </p>
            </ScrollReveal>
          </div>
        </section>

      </article>
    </>
  )
}