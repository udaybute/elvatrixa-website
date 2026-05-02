/* ================================================================
   ELVATRIXA — PRICING TEASER
   File: src/components/sections/PricingTeaser.tsx

   Server Component — no 'use client'.
   Indian market pricing in INR — lead generation optimised.
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

const Star = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

const Rupee = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12M6 8h12M15 21L6 8M10 8a4 4 0 0 0 0 8"/>
  </svg>
)


/* ── Data ────────────────────────────────────────────────────── */

const TIERS = [
  {
    name:      'Starter',
    price:     '₹15,000',
    suffix:    'onwards',
    timeline:  '7–10 days · Fixed price',
    tagline:   'Perfect for small businesses, local shops & personal brands ready to go online.',
    featured:  false,
    badge:     null as string | null,
    highlight: 'Best for Startups',
    features: [
      'Up to 5 pages (Home, About, Services, Gallery, Contact)',
      'Mobile-first responsive design',
      'WhatsApp & call button integration',
      'Google Maps embed',
      'Basic SEO setup',
      '1 round of revisions',
      '15-day post-launch support',
    ],
    cta:  'Get Started Today',
    href: '/contact',
  },
  {
    name:      'Business',
    price:     '₹35,000',
    suffix:    'onwards',
    timeline:  '2–3 weeks · 2 milestones',
    tagline:   'High-converting website built to generate enquiries and grow your customer base.',
    featured:  true,
    badge:     'Most Popular' as string | null,
    highlight: 'Best for Growing Businesses',
    features: [
      'Up to 12 pages or screens',
      'Custom UI/UX design',
      'Lead capture forms & CRM integration',
      'WhatsApp chat widget',
      'Google Analytics & Search Console',
      'On-page SEO + Core Web Vitals',
      '2 milestone payment schedule',
      '30-day post-launch support',
    ],
    cta:  'Get a Free Quote',
    href: '/contact',
  },
  {
    name:      'Premium',
    price:     '₹75,000',
    suffix:    'onwards',
    timeline:  '4–6 weeks · Custom scope',
    tagline:   'Full-featured platform for established brands demanding performance and scale.',
    featured:  false,
    badge:     null as string | null,
    highlight: 'Best for Enterprises',
    features: [
      'Unlimited pages + web application',
      'Custom backend / database',
      'E-commerce or booking system',
      'Payment gateway integration',
      'Admin dashboard & CMS',
      'Dedicated project manager',
      'Quarterly strategy reviews',
      '60-day post-launch support',
    ],
    cta:  'Discuss Your Project',
    href: '/contact',
  },
]

const TRUST = [
  '100% fixed pricing — no hidden charges',
  'On-time delivery guaranteed',
  'EMI options available',
  'GST invoice provided',
]

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '7 Days', label: 'Fastest Delivery' },
  { value: '24/7', label: 'WhatsApp Support' },
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
              Transparent Pricing · India
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
              fontSize:      'clamp(30px, 4vw, 52px)',
              color:         '#F8F9FC',
              lineHeight:    1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Websites That Win Customers.{' '}
            <span className="text-gold-gradient">Starting ₹15,000.</span>
          </h2>

          <p
            className="font-body text-[15px] leading-relaxed max-w-xl mx-auto mb-6"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Fixed price. On-time delivery. Every rupee accounted for upfront —
            no hidden charges, no surprises. Just results.
          </p>

          {/* Urgency nudge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(201,168,76,0.08)',
              border:     '1px solid rgba(201,168,76,0.2)',
            }}
          >
            <span style={{ color: '#C9A84C' }}><Star /></span>
            <span
              className="font-mono text-[9.5px] tracking-[0.12em] uppercase"
              style={{ color: 'rgba(201,168,76,0.85)' }}
            >
              Limited slots available this month — Book now to lock your price
            </span>
          </div>
        </ScrollReveal>


        {/* ── Stats bar ──────────────────────────────────────── */}
        <ScrollReveal>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10 rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-5 px-4 text-center"
                style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)' }}
              >
                <span
                  className="font-display font-bold mb-1"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#C9A84C', letterSpacing: '-0.02em' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.12em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>


        {/* ── Trust bar ──────────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12">
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

                {/* Tier name + highlight */}
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: tier.featured ? '#C9A84C' : 'rgba(255,255,255,0.3)' }}
                  >
                    {tier.name}
                  </p>
                  <span
                    className="font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: tier.featured ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                      color:      tier.featured ? '#C9A84C' : 'rgba(255,255,255,0.25)',
                      border:     tier.featured ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {tier.highlight}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-0.5">
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
                  <span
                    className="font-mono text-[10px] tracking-wider uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {tier.suffix}
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
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body text-[11.5px] font-bold tracking-[0.08em] uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
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


        {/* ── WaaS / Monthly stripe ───────────────────────────── */}
        <ScrollReveal>
          <div
            className="flex flex-col sm:flex-row items-center gap-5 rounded-xl px-6 py-5 mb-6"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border:     '1px solid rgba(255,255,255,0.06)',
            }}
          >
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

            <div className="flex-1 text-center sm:text-left">
              <p className="font-body font-bold text-[14px]" style={{ color: '#F8F9FC' }}>
                Website + Maintenance Plan{' '}
                <span
                  className="font-mono text-[11px] tracking-wider"
                  style={{ color: '#C9A84C' }}
                >
                  — ₹0 upfront · ₹2,499/month
                </span>
              </p>
              <p className="font-body text-[12.5px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Full website build, hosting, SSL, updates & support — all in one affordable monthly plan. No big upfront cost.
              </p>
            </div>

            <Link
              href="/pricing#monthly"
              className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#C9A84C' }}
            >
              Learn More <ArrowRight />
            </Link>
          </div>
        </ScrollReveal>


        {/* ── EMI / reassurance strip ─────────────────────────── */}
        <ScrollReveal>
          <div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl px-6 py-4 mb-10"
            style={{
              background: 'rgba(29,184,160,0.04)',
              border:     '1px solid rgba(29,184,160,0.10)',
            }}
          >
            {[
              '50% on start · 50% on delivery',
              'EMI available on ₹35K+ projects',
              'GST invoice included',
              'Refund policy on non-delivery',
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <span style={{ color: '#1DB8A0' }}><Check /></span>
                <span
                  className="font-mono text-[9.5px] tracking-[0.10em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>


        {/* ── Bottom CTAs ────────────────────────────────────── */}
        <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/pricing" className="btn-secondary">
            See Full Pricing Breakdown
          </Link>
          <Link href="/contact" className="btn-primary">
            Get a Free Quote Now
          </Link>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(37,211,102,0.10)',
              border:     '1px solid rgba(37,211,102,0.25)',
              color:      '#25D366',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.847L.057 23.487a.75.75 0 0 0 .921.921l5.64-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.965-1.358l-.356-.21-3.694.968.984-3.594-.231-.371A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            WhatsApp Us
          </a>
        </ScrollReveal>

        {/* Fine print */}
        <p
          className="text-center font-mono mt-5"
          style={{ fontSize: '9px', letterSpacing: '0.10em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}
        >
          All prices in INR · GST extra as applicable · Final quote after free consultation
        </p>

      </div>
    </section>
  )
}