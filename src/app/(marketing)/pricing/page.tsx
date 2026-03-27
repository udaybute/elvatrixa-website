/* ================================================================
   ELVATRIXA — PRICING PAGE
   File: src/app/(marketing)/pricing/page.tsx

   Transparent starting-from price ranges per service.
   Three engagement tiers: Project, Retainer, Enterprise.
   FAQ accordion using Radix UI.
   No hidden fees — all cards show fixed-price promise.
================================================================ */

import type { Metadata }     from 'next'
import Link                  from 'next/link'
import * as Accordion        from '@radix-ui/react-accordion'
import { buildPageMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { services }          from '@/data/services'
import ScrollReveal          from '@/components/ui/ScrollReveal'

export const metadata: Metadata = buildPageMetadata({
  title:       'Pricing',
  description:
    'Transparent starting-from prices for every Elvatrixa service. ' +
    'Fixed-price projects — no hourly billing, no surprise invoices.',
  canonical:   '/pricing',
  keywords:    ['web development pricing UK', 'SaaS development cost', 'digital agency pricing'],
})

const PRICING_FAQS = [
  {
    question: 'Do you bill hourly or fixed price?',
    answer:   'Always fixed price. Before any project starts, you receive a written proposal with a fixed total, clear deliverables, and a milestone payment plan. You will never receive an unexpected invoice.',
  },
  {
    question: 'What is included in the "starting from" price?',
    answer:   'The starting price reflects the minimum scope for a production-ready delivery of that service. Larger or more complex projects are priced accordingly — everything is agreed in writing before work begins.',
  },
  {
    question: 'How does payment work?',
    answer:   'We work on a milestone basis: typically 40% upfront, 30% at mid-project review, and 30% on delivery. For larger projects, we can agree on a custom payment schedule.',
  },
  {
    question: 'Do you offer retainer / ongoing plans?',
    answer:   'Yes. Our Maintenance & Support plans start at $450/month and cover dependency updates, priority bug fixes, uptime monitoring, and ongoing feature additions. Custom retainer rates are available for larger builds.',
  },
  {
    question: 'Can I see a full proposal before committing?',
    answer:   'Absolutely. Submit a brief via the contact form and we will send a detailed written proposal within 48 hours — completely free, with no obligation to proceed.',
  },
  {
    question: 'What currencies do you invoice in?',
    answer:   'We invoice in USD for US clients and GBP for UK clients. Other currencies can be arranged on request.',
  },
]

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l4 4 6-6"/>
  </svg>
)

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    className="transition-transform duration-200 group-data-[state=open]:rotate-180"
    aria-hidden="true">
    <path d="M4 6l4 4 4-4"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

/* ── ENGAGEMENT TIERS ─────────────────────────────────────────── */

const TIERS = [
  {
    name:        'Project',
    price:       'From $800',
    period:      'one-time',
    description: 'Best for a defined scope — a new SaaS build, an e-commerce launch, a performance overhaul.',
    features: [
      'Fixed price, fixed scope',
      'Written proposal within 48 hours',
      'Milestone-based payment plan',
      '30-day post-launch support',
      'Full codebase handover',
    ],
    cta:         'Get a Quote',
    highlighted: false,
  },
  {
    name:        'Retainer',
    price:       'From $450',
    period:      '/month',
    description: 'Best for ongoing maintenance, iterative feature development, or monthly campaign management.',
    features: [
      'Priority response (< 4 hours)',
      'Monthly hours allocation',
      'Security & dependency updates',
      'Uptime monitoring & alerting',
      'Monthly report & review call',
    ],
    cta:         'Discuss Retainer',
    highlighted: true,  /* Gold card */
  },
  {
    name:        'Enterprise',
    price:       'Custom',
    period:      '',
    description: 'For organisations with complex, multi-system builds or white-label development needs.',
    features: [
      'Dedicated team allocation',
      'NDA and custom contracts',
      'Enterprise SLA available',
      'Multi-project discount rates',
      'Quarterly strategy review',
    ],
    cta:         'Contact Us',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(PRICING_FAQS)) }} />

      <div style={{ background: 'var(--bg-1)' }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden section-pad" style={{ background: 'var(--bg-0)' }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 65%)' }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="block h-px w-8" style={{ background: 'linear-gradient(270deg, var(--gold), transparent)' }} aria-hidden="true" />
                <span className="section-label">Transparent pricing</span>
                <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay="reveal-delay-1">
              <h1
                className="font-display font-bold text-gold-gradient mb-5"
                style={{ fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: '0.94', letterSpacing: '-0.03em' }}
              >
                No Surprises. Ever.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay="reveal-delay-2">
              <p className="font-body leading-relaxed" style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-3)' }}>
                Every Elvatrixa engagement starts with a fixed-price proposal. You always know
                exactly what you are getting and exactly what it costs — before a single line of code is written.
              </p>
            </ScrollReveal>
          </div>
        </section>


        {/* ── ENGAGEMENT TIERS ── */}
        <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TIERS.map((tier, i) => (
                <ScrollReveal
                  key={tier.name}
                  delay={(['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[i]}
                >
                  <div
                    className="relative flex flex-col p-7 rounded-2xl h-full"
                    style={{
                      background: tier.highlighted ? 'var(--bg-3)' : 'var(--bg-3)',
                      border:     tier.highlighted
                        ? '2px solid var(--gold-border)'
                        : '1px solid var(--border-subtle)',
                      boxShadow:  tier.highlighted ? '0 0 40px rgba(201,168,76,0.08)' : 'none',
                    }}
                  >
                    {/* Popular badge */}
                    {tier.highlighted && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full"
                        style={{ background: 'var(--gold)', color: 'var(--bg-0)', whiteSpace: 'nowrap' }}
                      >
                        Most Popular
                      </div>
                    )}

                    {/* Gold top border */}
                    {tier.highlighted && (
                      <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full" style={{ background: 'var(--gold)' }} aria-hidden="true" />
                    )}

                    {/* Name */}
                    <p className="font-mono text-[11px] tracking-widest uppercase mb-3" style={{ color: 'var(--text-4)' }}>
                      {tier.name}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-2">
                      <span
                        className="font-display font-bold"
                        style={{ fontSize: tier.price === 'Custom' ? '36px' : '40px', color: tier.highlighted ? 'var(--gold)' : 'var(--text-1)', lineHeight: 1 }}
                      >
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="font-body text-sm" style={{ color: 'var(--text-4)' }}>{tier.period}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--text-3)' }}>
                      {tier.description}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px mb-6" style={{ background: 'var(--border-subtle)' }} />

                    {/* Features */}
                    <ul className="flex flex-col gap-3 flex-1 mb-7">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className="shrink-0 mt-0.5" style={{ color: tier.highlighted ? 'var(--gold)' : 'var(--teal)' }}>
                            <CheckIcon />
                          </span>
                          <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className={tier.highlighted ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ── SERVICE PRICE TABLE ── */}
        <section className="section-pad" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section-container">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                <span className="section-label">By service</span>
              </div>
              <h2
                className="font-display font-bold mb-10"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-1)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                Starting-From Prices
              </h2>
            </ScrollReveal>

            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-subtle)' }}>
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-3)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th className="text-left px-6 py-4 font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--text-4)' }}>Service</th>
                    <th className="text-left px-6 py-4 font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--text-4)' }}>Starting From</th>
                    <th className="text-left px-6 py-4 font-mono text-[11px] tracking-widest uppercase hidden md:table-cell" style={{ color: 'var(--text-4)' }}>Tags</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, i) => (
                    <tr
                      key={service.slug}
                      className="group transition-colors duration-150"
                      style={{
                        background:   i % 2 === 0 ? 'var(--bg-3)' : 'var(--bg-4)',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <td className="px-6 py-4">
                        <p className="font-body font-bold text-sm" style={{ color: 'var(--text-1)' }}>{service.title}</p>
                        <p className="font-body text-xs mt-0.5 hidden sm:block" style={{ color: 'var(--text-4)' }}>{service.tagline}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-bold" style={{ color: 'var(--gold)' }}>
                          {service.startingFrom ?? 'Custom'}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 3).map(t => (
                            <span key={t} className="badge">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex items-center gap-1 font-mono text-[11px] tracking-wider uppercase ml-auto w-fit transition-colors duration-150 hover:opacity-100 opacity-50 group-hover:opacity-100"
                          style={{ color: 'var(--gold)' }}
                        >
                          Details <ArrowRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ScrollReveal>
              <p className="mt-4 font-body text-xs text-center" style={{ color: 'var(--text-4)' }}>
                All prices are starting points. Final quotes depend on scope, complexity, and timeline.
                Submit a brief for an exact fixed-price proposal.
              </p>
            </ScrollReveal>
          </div>
        </section>


        {/* ── FAQ ACCORDION ── */}
        <section className="section-pad" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section-container max-w-[800px]">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                <span className="section-label">Pricing FAQ</span>
              </div>
              <h2
                className="font-display font-bold mb-10"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-1)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                Pricing Questions
              </h2>
            </ScrollReveal>

            <Accordion.Root type="multiple" className="flex flex-col gap-3">
              {PRICING_FAQS.map((faq, i) => (
                <ScrollReveal
                  key={faq.question}
                  delay={(['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[i]}
                >
                  <Accordion.Item
                    value={`faq-${i}`}
                    className="rounded-xl overflow-hidden"
                    style={{ border: '1px solid var(--border-subtle)' }}
                  >
                    <Accordion.Trigger
                      className="group w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-150"
                      style={{ background: 'var(--bg-3)' }}
                    >
                      <span className="font-body font-bold text-sm pr-4" style={{ color: 'var(--text-1)' }}>
                        {faq.question}
                      </span>
                      <span className="shrink-0" style={{ color: 'var(--gold)' }}>
                        <ChevronIcon />
                      </span>
                    </Accordion.Trigger>
                    <Accordion.Content
                      className="overflow-hidden"
                      style={{ background: 'var(--bg-4)' }}
                    >
                      <div className="px-6 py-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </ScrollReveal>
              ))}
            </Accordion.Root>
          </div>
        </section>


        {/* ── CTA ── */}
        <section className="relative overflow-hidden section-pad-sm" style={{ background: 'var(--bg-0)', borderTop: '1px solid var(--border-subtle)' }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 110%, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />

          <div className="section-container relative z-10 text-center">
            <ScrollReveal>
              <h2
                className="font-display font-bold mb-4"
                style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', color: 'var(--text-1)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Get Your Fixed-Price Proposal
              </h2>
              <p className="font-body text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--text-3)' }}>
                Submit a brief in 3 minutes. We will send a detailed written proposal within 48 hours — free, with no obligation.
              </p>
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </>
  )
}