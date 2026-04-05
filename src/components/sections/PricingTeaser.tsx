/* ================================================================
   ELVATRIXA — PRICING TEASER
   File: src/components/sections/PricingTeaser.tsx

   Server Component — no 'use client'.
   Layout: header → trust bar → 3 full-feature cards → WaaS stripe → CTAs.
   Dark navy (#0A1628) section — alternates with light IdealClient above.
   All hover effects via Tailwind group-hover — no JS.
================================================================ */

import Link         from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'


/* ── Icons ──────────────────────────────────────────────────── */

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6l2.5 2.5L10 3" />
  </svg>
)

const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6h8M7 3l3 3-3 3" />
  </svg>
)

const Zap = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1.5L2 7.5h5L6 12.5l6-6H7L8 1.5z" />
  </svg>
)


/* ── Data ────────────────────────────────────────────────────── */

const TIERS = [
  {
    name:     'Essentials',
    price:    'From $8K',
    timeline: '3–5 weeks · Fixed price',
    tagline:  'Launch your digital presence fast and professionally.',
    featured: false,
    badge:    null as string | null,
    features: [
      'Up to 8 pages or screens',
      'Mobile-first responsive design',
      'Brand integration & design system',
      '2 rounds of revisions',
      'Basic SEO & performance setup',
      '30-day post-launch support',
    ],
    cta:     'Start a Project',
    href:    '/contact',
  },
  {
    name:     'Growth',
    price:    'From $18K',
    timeline: '6–10 weeks · 3 milestones',
    tagline:  'Performance-focused build for companies ready to scale.',
    featured: true,
    badge:    'Most Popular' as string | null,
    features: [
      'Up to 20 pages or app screens',
      'Custom UI/UX design included',
      'CMS or database integration',
      'API & third-party integrations',
      'A/B testing & analytics setup',
      'SEO foundation + Core Web Vitals',
      '3 milestone payment schedule',
      '60-day post-launch support',
    ],
    cta:     'Get a Fixed Quote',
    href:    '/contact',
  },
  {
    name:     'Enterprise',
    price:    'From $55K',
    timeline: '12–20 weeks · Custom scope',
    tagline:  'Full platform build with custom architecture and SLA.',
    featured: false,
    badge:    null as string | null,
    features: [
      'Full SaaS or e-commerce platform',
      'Custom backend architecture',
      'Multi-tenant / role-based access',
      'AI & automation integrations',
      'Dedicated project manager',
      'Quarterly strategy reviews',
      'SLA + uptime guarantee',
    ],
    cta:     'Discuss Your Project',
    href:    '/contact',
  },
]

const TRUST = [
  'Scoped before we start',
  'No hourly billing surprises',
  'Milestone payment schedule',
]


/* ── Shared check item ───────────────────────────────────────── */
function FeatureRow({ text, gold }: { text: string; gold?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="flex-shrink-0 mt-[2px]"
        style={{ color: gold ? '#C9A84C' : '#1DB8A0' }}
      >
        <Check />
      </span>
      <span
        className="font-body text-[13px] leading-snug"
        style={{ color: gold ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.48)' }}
      >
        {text}
      </span>
    </li>
  )
}


/* ── Section ─────────────────────────────────────────────────── */

export default function PricingTeaser() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Gold hairline top */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.85) 50%, rgba(201,168,76,0.4) 70%, transparent 100%)',
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

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)' }}
      />

      <div className="section-container relative z-10">

        {/* ── Header ─────────────────────────────────────────── */}
        <ScrollReveal className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6))' }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(201,168,76,0.7)' }}
            >
              Transparent Pricing
            </span>
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.6), transparent)' }}
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
            Fixed-Price Projects.{' '}
            <span className="text-gold-gradient">No Surprises.</span>
          </h2>

          <p
            className="font-body text-[15px] leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Every project is scoped and quoted upfront before we start.
            You know the total investment, the timeline, and exactly what you get.
          </p>
        </ScrollReveal>


        {/* ── Trust bar ──────────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
            {TRUST.map(item => (
              <div key={item} className="flex items-center gap-2">
                <span style={{ color: '#1DB8A0' }}>
                  <Check />
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.10em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>


        {/* ── Pricing cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch mb-6">
          {TIERS.map((tier, i) => (
            <ScrollReveal
              key={tier.name}
              delay={`reveal-delay-${i + 1}` as `reveal-delay-${number}`}
              variant="scale"
            >
              <div
                className={`group relative flex flex-col h-full rounded-2xl p-7 transition-all duration-300 ${tier.featured ? '' : 'hover:-translate-y-1'}`}
                style={
                  tier.featured
                    ? {
                        background: 'linear-gradient(145deg, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 100%)',
                        border:     '1.5px solid rgba(201,168,76,0.45)',
                        boxShadow:  '0 8px 48px rgba(201,168,76,0.08)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.025)',
                        border:     '1px solid rgba(255,255,255,0.07)',
                      }
                }
              >
                {/* Popular badge */}
                {tier.badge && (
                  <div className="absolute -top-[14px] inset-x-0 flex justify-center">
                    <span
                      className="font-mono text-[9px] tracking-[0.15em] uppercase px-3.5 py-1 rounded-full font-bold"
                      style={{ background: 'var(--gold)', color: '#060D1A' }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3"
                  style={{ color: tier.featured ? '#C9A84C' : 'rgba(255,255,255,0.3)' }}
                >
                  {tier.name}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="font-display font-bold leading-none"
                    style={{
                      fontSize:      'clamp(30px, 3.2vw, 42px)',
                      color:         tier.featured ? '#C9A84C' : '#F8F9FC',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {tier.price}
                  </span>
                </div>

                {/* Timeline */}
                <p
                  className="font-mono text-[9.5px] tracking-[0.10em] uppercase mb-3"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {tier.timeline}
                </p>

                {/* Tagline */}
                <p
                  className="font-body text-[13px] leading-relaxed mb-6"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {tier.tagline}
                </p>

                {/* Divider */}
                <div
                  className="w-full h-px mb-6"
                  style={{
                    background: tier.featured
                      ? 'rgba(201,168,76,0.18)'
                      : 'rgba(255,255,255,0.06)',
                  }}
                />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <FeatureRow key={f} text={f} gold={tier.featured} />
                  ))}
                </ul>

                {/* CTA button */}
                <Link
                  href={tier.href}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body text-[11.5px] font-bold tracking-[0.08em] uppercase transition-opacity duration-200 hover:opacity-85"
                  style={
                    tier.featured
                      ? {
                          background: 'var(--gold)',
                          color:      '#060D1A',
                        }
                      : {
                          background: 'transparent',
                          border:     '1px solid rgba(255,255,255,0.10)',
                          color:      'rgba(255,255,255,0.50)',
                        }
                  }
                >
                  {tier.cta}
                  <ArrowRight />
                </Link>

              </div>
            </ScrollReveal>
          ))}
        </div>


        {/* ── WaaS stripe ────────────────────────────────────── */}
        <ScrollReveal>
          <div
            className="flex flex-col sm:flex-row items-center gap-5 rounded-xl px-6 py-5 mb-10"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border:     '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(201,168,76,0.10)',
                border:     '1px solid rgba(201,168,76,0.20)',
                color:      '#C9A84C',
              }}
            >
              <Zap />
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <p className="font-body font-bold text-[14px]" style={{ color: '#F8F9FC' }}>
                Web-as-a-Service{' '}
                <span
                  className="font-mono text-[11px] tracking-wider"
                  style={{ color: '#C9A84C' }}
                >
                  — $0 down · $299/month
                </span>
              </p>
              <p className="font-body text-[12.5px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Full build, hosting, and ongoing maintenance under one flat monthly fee. No upfront cost.
              </p>
            </div>

            {/* Link */}
            <Link
              href="/pricing#waas"
              className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#C9A84C' }}
            >
              Learn More <ArrowRight />
            </Link>
          </div>
        </ScrollReveal>


        {/* ── Bottom CTAs ────────────────────────────────────── */}
        <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/pricing" className="btn-secondary">
            See Full Pricing Breakdown
          </Link>
          <Link href="/contact" className="btn-primary">
            Get a Fixed-Price Quote
          </Link>
        </ScrollReveal>

        {/* Fine print */}
        <p
          className="text-center font-mono mt-5"
          style={{ fontSize: '9px', letterSpacing: '0.10em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}
        >
          All prices in USD · GBP equivalent available · VAT not included
        </p>

      </div>
    </section>
  )
}
