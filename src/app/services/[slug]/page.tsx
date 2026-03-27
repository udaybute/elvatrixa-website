/* ================================================================
   ELVATRIXA — SERVICE DETAIL PAGE
   File: src/app/services/[slug]/page.tsx

   Dynamically generates a detail page for each of the 8 services.
   Pre-rendered at build time via generateStaticParams.

   Data source: src/data/services.ts
   Route:       /services/[slug]
================================================================ */

import type { Metadata }     from 'next'
import Link                  from 'next/link'
import { notFound }          from 'next/navigation'
import { buildPageMetadata, breadcrumbSchema } from '@/lib/seo'
import { getServiceBySlug, getServiceSlugs, services } from '@/data/services'
import { CASE_STUDIES }      from '@/data/caseStudies'
import ScrollReveal          from '@/components/ui/ScrollReveal'
import type { JSX }          from 'react'


/* ── STATIC PARAMS ───────────────────────────────────────────── */

export async function generateStaticParams() {
  return getServiceSlugs()
}


/* ── METADATA ────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service  = getServiceBySlug(slug)
  if (!service) return {}

  return buildPageMetadata({
    title:       service.title,
    description: service.metaDescription ?? service.description,
    canonical:   `/services/${slug}`,
    keywords:    [service.title, 'Elvatrixa', 'UK agency', 'US agency'],
  })
}


/* ── INLINE ICON MAP ─────────────────────────────────────────── */

const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7.5l4 4 7-7"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7H2M6 3L2 7l4 4"/>
  </svg>
)


/* ── PAGE ────────────────────────────────────────────────────── */

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service  = getServiceBySlug(slug)

  if (!service) notFound()

  const Icon = ICONS[service.icon]

  /* Related services — 3 others (exclude self) */
  const related = services.filter(s => s.slug !== slug).slice(0, 3)

  /* Related case studies — match by service label */
  const relatedWork = CASE_STUDIES.filter(
    cs => cs.service.toLowerCase().includes(service.title.toLowerCase().split(' ')[0].toLowerCase())
  ).slice(0, 2)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home',     url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/services/${slug}` },
          ])),
        }}
      />

      <div style={{ background: 'var(--bg-1)' }}>

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden section-pad"
          style={{ background: 'var(--bg-0)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.13) 0%, transparent 65%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="section-container relative z-10">
            {/* Breadcrumb */}
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-8">
                <Link
                  href="/services"
                  className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors duration-150 text-text-4 hover:text-gold"
                >
                  <ArrowLeft /> All Services
                </Link>
              </div>
            </ScrollReveal>

            <div className="max-w-4xl">
              {/* Icon + price */}
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-xl"
                    style={{
                      background: 'var(--gold-dim)',
                      border: '1px solid var(--gold-border)',
                      color: 'var(--gold)',
                    }}
                  >
                    {Icon ? <Icon /> : null}
                  </div>
                  {service.startingFrom && (
                    <span
                      className="font-mono text-[11px] tracking-wider uppercase px-3 py-1.5 rounded"
                      style={{
                        background: 'var(--gold-dim)',
                        border: '1px solid var(--gold-border)',
                        color: 'var(--gold)',
                      }}
                    >
                      {service.startingFrom}
                    </span>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay="reveal-delay-1">
                <h1
                  className="font-display font-bold text-gold-gradient mb-4"
                  style={{
                    fontSize: 'clamp(40px, 6vw, 80px)',
                    lineHeight: '0.95',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {service.title}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay="reveal-delay-2">
                <p
                  className="font-mono tracking-wider uppercase mb-6"
                  style={{ fontSize: '13px', color: 'var(--gold)' }}
                >
                  {service.tagline}
                </p>
                <p
                  className="font-body leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-3)' }}
                >
                  {service.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay="reveal-delay-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-8">
                  <Link href="/contact" className="btn-primary">
                    Get a Fixed-Price Quote
                  </Link>
                  <Link href="/work" className="btn-secondary flex items-center gap-2">
                    See Our Work <ArrowRight />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>


        {/* ── FEATURES + TECH ── */}
        <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Features */}
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="block h-px w-8"
                    style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                    aria-hidden="true"
                  />
                  <span className="section-label">What&apos;s included</span>
                </div>
                <h2
                  className="font-display font-bold mb-8"
                  style={{
                    fontSize: 'clamp(26px, 3.5vw, 42px)',
                    color: 'var(--text-1)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Deliverables &amp;<br />Key Features
                </h2>
                <ul className="flex flex-col gap-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full mt-0.5"
                        style={{
                          background: 'rgba(0,200,160,0.10)',
                          border: '1px solid rgba(0,200,160,0.20)',
                          color: 'var(--teal)',
                        }}
                      >
                        <CheckIcon />
                      </span>
                      <span
                        className="font-body text-base leading-relaxed"
                        style={{ color: 'var(--text-2)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {/* Tech + Pricing */}
              <ScrollReveal delay="reveal-delay-2">

                {/* Technologies */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="block h-px w-8"
                    style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                    aria-hidden="true"
                  />
                  <span className="section-label">Technologies</span>
                </div>
                <h2
                  className="font-display font-bold mb-6"
                  style={{
                    fontSize: 'clamp(26px, 3.5vw, 42px)',
                    color: 'var(--text-1)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Our Stack
                </h2>
                <div className="flex flex-wrap gap-2 mb-10">
                  {service.tags.map((tag) => (
                    <span key={tag} className="badge-lg badge">{tag}</span>
                  ))}
                </div>

                {/* Pricing card */}
                {service.startingFrom && (
                  <div
                    className="p-6 rounded-xl"
                    style={{
                      background: 'var(--bg-3)',
                      border: '1px solid var(--border-subtle)',
                      borderTop: '3px solid var(--gold)',
                    }}
                  >
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-2"
                      style={{ color: 'var(--gold)' }}
                    >
                      Investment
                    </p>
                    <p
                      className="font-display font-bold mb-1"
                      style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--gold)' }}
                    >
                      {service.startingFrom}
                    </p>
                    <p
                      className="font-body text-sm mb-5"
                      style={{ color: 'var(--text-3)' }}
                    >
                      Fixed-price proposals — no hourly billing, no scope creep surprises.
                      Get a detailed quote within 48 hours of your discovery call.
                    </p>
                    <Link href="/contact" className="btn-primary w-full text-center block">
                      Book a Free Strategy Call
                    </Link>
                  </div>
                )}
              </ScrollReveal>

            </div>
          </div>
        </section>


        {/* ── HOW IT WORKS ── */}
        <section
          style={{
            background: 'var(--bg-2)',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="section-container py-16 md:py-20">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="block h-px w-8"
                  style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                  aria-hidden="true"
                />
                <span className="section-label">Our process</span>
              </div>
              <h2
                className="font-display font-bold mb-12"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 42px)',
                  color: 'var(--text-1)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                How We Work
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Discovery Call',
                  body: 'We learn your goals, constraints, and commercial context. No templates — every brief is bespoke.',
                  duration: '30 min',
                },
                {
                  step: '02',
                  title: 'Fixed-Price Proposal',
                  body: 'You receive a detailed scope and fixed-price proposal within 48 hours. No ambiguity, no surprises.',
                  duration: '48 hrs',
                },
                {
                  step: '03',
                  title: 'Design & Build',
                  body: 'We execute with senior engineers and designers. You receive weekly progress updates.',
                  duration: 'Project sprint',
                },
                {
                  step: '04',
                  title: 'Handover & Support',
                  body: 'Full handover with documentation, training, and 30-day post-launch support included.',
                  duration: '30-day warranty',
                },
              ].map((step, i) => (
                <ScrollReveal
                  key={step.step}
                  delay={(['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[i]}
                >
                  <div
                    className="relative p-6 rounded-xl h-full"
                    style={{
                      background: 'var(--bg-3)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      className="font-display font-bold leading-none mb-4 select-none"
                      style={{ fontSize: '52px', color: 'var(--gold)', opacity: 0.25 }}
                      aria-hidden="true"
                    >
                      {step.step}
                    </div>
                    <h3
                      className="font-body font-bold text-base mb-2 leading-snug"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed mb-4"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {step.body}
                    </p>
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded"
                      style={{
                        background: 'var(--gold-dim)',
                        border: '1px solid var(--gold-border)',
                        color: 'var(--gold)',
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ── RELATED WORK ── */}
        {relatedWork.length > 0 && (
          <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
            <div className="section-container">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="block h-px w-8"
                        style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                        aria-hidden="true"
                      />
                      <span className="section-label">Proof of work</span>
                    </div>
                    <h2
                      className="font-display font-bold"
                      style={{
                        fontSize: 'clamp(26px, 3.5vw, 42px)',
                        color: 'var(--text-1)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Related Case Studies
                    </h2>
                  </div>
                  <Link
                    href="/work"
                    className="hidden md:flex items-center gap-2 font-body text-xs font-bold uppercase tracking-wider transition-colors duration-150 text-gold hover:text-gold"
                    style={{ color: 'var(--gold)' }}
                  >
                    View All Work <ArrowRight />
                  </Link>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedWork.map((cs, i) => (
                  <ScrollReveal key={cs.slug} delay={i === 0 ? '' : 'reveal-delay-1'}>
                    <Link href={`/work/${cs.slug}`} className="group block h-full">
                      <article
                        className="h-full p-6 rounded-xl transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover group-hover:border-[color:var(--gold-border)]"
                        style={{
                          background: 'var(--bg-3)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span className="badge mb-2 inline-block">{cs.service}</span>
                            <h3
                              className="font-body font-bold text-base leading-snug"
                              style={{ color: 'var(--text-1)' }}
                            >
                              {cs.title}
                            </h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {cs.results.slice(0, 2).map((r) => (
                            <div
                              key={r.label}
                              className="p-3 rounded-lg"
                              style={{ background: 'var(--bg-4)', border: '1px solid var(--border-subtle)' }}
                            >
                              <p
                                className="font-display font-bold mb-1"
                                style={{ fontSize: '20px', color: 'var(--gold)' }}
                              >
                                {r.value}
                              </p>
                              <p
                                className="font-mono text-[9px] tracking-wider uppercase leading-tight"
                                style={{ color: 'var(--text-4)' }}
                              >
                                {r.label}
                              </p>
                            </div>
                          ))}
                        </div>
                        <span
                          className="flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
                          style={{ color: 'var(--gold)' }}
                        >
                          Read Case Study <ArrowRight />
                        </span>
                      </article>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* ── OTHER SERVICES ── */}
        <section
          style={{
            background: 'var(--bg-2)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div className="section-container py-16 md:py-20">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="block h-px w-8"
                  style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
                  aria-hidden="true"
                />
                <span className="section-label">Also from Elvatrixa</span>
              </div>
              <h2
                className="font-display font-bold mb-10"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 42px)',
                  color: 'var(--text-1)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Related Services
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((s, i) => {
                const RelIcon = ICONS[s.icon]
                return (
                  <ScrollReveal
                    key={s.slug}
                    delay={(['', 'reveal-delay-1', 'reveal-delay-2'] as const)[i]}
                  >
                    <Link href={`/services/${s.slug}`} className="group block h-full">
                      <div
                        className="flex items-start gap-4 p-5 rounded-xl h-full transition-[border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-[color:var(--gold-border)]"
                        style={{
                          background: 'var(--bg-3)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <div
                          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg"
                          style={{
                            background: 'var(--gold-dim)',
                            border: '1px solid var(--gold-border)',
                            color: 'var(--gold)',
                          }}
                        >
                          {RelIcon ? <RelIcon /> : null}
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="font-body font-bold text-sm mb-1 leading-snug"
                            style={{ color: 'var(--text-1)' }}
                          >
                            {s.title}
                          </h3>
                          <p
                            className="font-body text-xs leading-relaxed"
                            style={{ color: 'var(--text-3)' }}
                          >
                            {s.tagline}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>


        {/* ── CTA ── */}
        <section
          className="relative overflow-hidden section-pad"
          style={{ background: 'var(--bg-0)', borderTop: '1px solid var(--border-subtle)' }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 120%, rgba(201,168,76,0.10) 0%, transparent 65%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--gold-border) 30%, var(--gold) 50%, var(--gold-border) 70%, transparent 100%)',
            }}
          />

          <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
            <ScrollReveal>
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-4"
                style={{ color: 'var(--text-4)' }}
              >
                Let&apos;s work together
              </p>
              <h2
                className="font-display font-bold text-gold-gradient mb-5"
                style={{
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.025em',
                }}
              >
                Ready to Start Your<br />{service.title} Project?
              </h2>
              <p
                className="font-body leading-relaxed mb-8"
                style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'var(--text-3)' }}
              >
                Book a free 30-minute strategy call. We&apos;ll review your requirements
                and send a fixed-price proposal within 48 hours — no obligation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Book a Free Strategy Call
                </Link>
                <Link href="/services" className="btn-secondary flex items-center gap-2">
                  <ArrowLeft /> All Services
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </>
  )
}
