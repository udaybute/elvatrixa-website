/* ================================================================
   ELVATRIXA — PRICING PAGE  (REDESIGN)
   File: src/app/(marketing)/pricing/page.tsx

   Premium dark navy + gold aesthetic.
   Indian market · INR pricing · Lead-generation optimised.
   Server Component — zero client JS.
================================================================ */

import type { Metadata } from 'next'
import Link              from 'next/link'
import * as Accordion    from '@radix-ui/react-accordion'
import { buildPageMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { services }      from '@/data/services'
import ScrollReveal      from '@/components/ui/ScrollReveal'

export const metadata: Metadata = buildPageMetadata({
  title:       'Pricing — Website Packages Starting ₹15,000 | Elvatrixa',
  description:
    'Transparent fixed-price website packages for Indian businesses. ' +
    'Starter ₹15K, Business ₹35K, Premium ₹75K. No hidden charges. GST invoice included.',
  canonical:   '/pricing',
  keywords:    ['website design price india', 'web development cost india', 'website package rupees', 'fixed price web design'],
})


/* ════════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════════ */

const PRICING_FAQS = [
  {
    question: 'Do you bill hourly or fixed price?',
    answer:   'Always fixed price. Before any project starts you receive a written proposal with a fixed total, clear deliverables, and a milestone payment plan. You will never receive an unexpected invoice.',
  },
  {
    question: 'What does the starting price include?',
    answer:   'The starting price covers a fully production-ready website with all agreed pages, mobile-responsive design, WhatsApp integration, basic SEO, and 30-day post-launch support. Everything is confirmed in writing before we begin.',
  },
  {
    question: 'How does payment work?',
    answer:   'We split into two milestones: 50% advance to kick off the project, 50% on final delivery and your approval. For projects above ₹50,000 we offer a three-milestone plan (40 / 30 / 30). EMI via bank transfer is also available.',
  },
  {
    question: 'Do you offer ongoing maintenance plans?',
    answer:   'Yes. Our Website Care plans start at ₹2,499 / month and cover hosting, SSL, security patches, content edits, speed monitoring, and priority support — everything to keep your site fast and up to date.',
  },
  {
    question: 'How soon can my website go live?',
    answer:   'Starter websites go live in as little as 7 days. Business packages typically take 2–3 weeks, Premium 4–6 weeks. We commit to a firm deadline in your proposal and hit it.',
  },
  {
    question: 'Can I get a proposal before paying anything?',
    answer:   'Absolutely. Share your requirements via the contact form or WhatsApp. We will send a detailed written proposal within 24 hours — completely free, zero commitment.',
  },
  {
    question: 'Do you provide a GST invoice?',
    answer:   'Yes. A proper GST invoice is issued for every project. All prices shown are exclusive of GST at 18%.',
  },
  {
    question: 'What if I am not happy with the design?',
    answer:   'Each package includes revision rounds. If the final delivery does not match the agreed scope we will fix it at no extra cost. We stand behind everything we ship.',
  },
]

const TIERS = [
  {
    name:      'Starter',
    emoji:     '🚀',
    price:     '₹15,000',
    suffix:    'onwards',
    period:    'one-time',
    timeline:  '7–10 days',
    pill:      'Best for Local Businesses',
    tagline:   'Go online fast with a clean, professional website that builds instant trust.',
    features: [
      'Up to 5 pages (Home · About · Services · Gallery · Contact)',
      'Mobile-first responsive design',
      'WhatsApp & click-to-call buttons',
      'Google Maps embed',
      'Basic on-page SEO',
      '1 revision round',
      '15-day post-launch support',
    ],
    cta:         'Get Started',
    highlighted: false,
    badge:       null as string | null,
  },
  {
    name:      'Business',
    emoji:     '📈',
    price:     '₹35,000',
    suffix:    'onwards',
    period:    'one-time',
    timeline:  '2–3 weeks',
    pill:      'Best for Growing Brands',
    tagline:   'A high-converting website engineered to generate enquiries and rank on Google.',
    features: [
      'Up to 12 pages + blog',
      'Custom UI / UX design',
      'Lead capture forms & CRM connect',
      'WhatsApp live chat widget',
      'Google Analytics + Search Console',
      'Core Web Vitals optimised',
      'Social media integration',
      '2-milestone payment plan',
      '30-day post-launch support',
    ],
    cta:         'Get a Free Quote',
    highlighted: true,
    badge:       'Most Popular' as string | null,
  },
  {
    name:      'Premium',
    emoji:     '🏆',
    price:     '₹75,000',
    suffix:    'onwards',
    period:    'one-time',
    timeline:  '4–6 weeks',
    pill:      'Best for Enterprises',
    tagline:   'Full-featured platform with custom backend, payments, and a dedicated PM.',
    features: [
      'Unlimited pages + web application',
      'Custom backend / database',
      'E-commerce or booking system',
      'Razorpay / Stripe integration',
      'Admin dashboard & CMS',
      'Dedicated project manager',
      '3-milestone payment plan',
      '60-day post-launch support',
    ],
    cta:         'Discuss Your Project',
    highlighted: false,
    badge:       null as string | null,
  },
]

const SERVICE_MENU = [
  { title: 'Business Website',       price: '₹15,000+',    timeline: '7–10 days',  tag: 'Most Ordered' },
  { title: 'E-Commerce Store',       price: '₹35,000+',    timeline: '3–4 weeks',  tag: 'High ROI'     },
  { title: 'Landing Page',           price: '₹8,000+',     timeline: '3–5 days',   tag: 'Fast'         },
  { title: 'Portfolio / Personal',   price: '₹10,000+',    timeline: '5–7 days',   tag: 'Popular'      },
  { title: 'Clinic / Hospital',      price: '₹20,000+',    timeline: '10–14 days', tag: 'Healthcare'   },
  { title: 'Real Estate Website',    price: '₹25,000+',    timeline: '2–3 weeks',  tag: 'Lead Gen'     },
  { title: 'Restaurant / Cafe',      price: '₹12,000+',    timeline: '7–10 days',  tag: 'Local Biz'    },
  { title: 'SaaS / Web App',         price: '₹75,000+',    timeline: '6–12 weeks', tag: 'Enterprise'   },
  { title: 'SEO Optimisation',       price: '₹8,000/mo+',  timeline: 'Ongoing',    tag: 'Rank Higher'  },
  { title: 'Website Maintenance',    price: '₹2,499/mo+',  timeline: 'Monthly',    tag: 'Care Plan'    },
]

const TRUST_ITEMS = [
  { icon: '🏆', label: '50+ Projects' },
  { icon: '⚡', label: '7-Day Delivery' },
  { icon: '📋', label: 'GST Invoice' },
  { icon: '💳', label: 'EMI Available' },
  { icon: '🔒', label: '50% Pay Later' },
  { icon: '✅', label: 'Fixed Pricing' },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Share Requirements', desc: 'Tell us about your business and goals via form or WhatsApp. Takes 2 minutes.' },
  { step: '02', title: 'Free Proposal', desc: 'Receive a detailed written quote with scope, timeline, and fixed price within 24 hrs.' },
  { step: '03', title: 'Pay 50% & Kickoff', desc: 'Approve the proposal, pay the first milestone, and we begin immediately.' },
  { step: '04', title: 'Review & Launch', desc: 'You review the finished site, request changes, approve, and we go live.' },
]


/* ════════════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════════════ */

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5l3 3L11 3"/>
  </svg>
)

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    className="transition-transform duration-300 group-data-[state=open]:rotate-180"
    aria-hidden="true">
    <path d="M4 6l4 4 4-4"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5h9M8 3.5l3 3-3 3"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.526 5.526 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.847L.057 23.487a.75.75 0 0 0 .921.921l5.64-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.965-1.358l-.356-.21-3.694.968.984-3.594-.231-.371A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
  </svg>
)


/* ════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════ */

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(PRICING_FAQS)) }} />

      <div style={{ background: '#060D1A' }}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden section-pad" style={{ background: '#060D1A' }}>

          {/* ── Layered background atmosphere ── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 90% 65% at 50% -5%, rgba(201,168,76,0.18) 0%, transparent 60%)' }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 50%, rgba(29,184,160,0.05) 0%, transparent 65%)' }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.18) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          {/* Gold top hairline */}
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.9) 50%, transparent 100%)' }} />

          <div className="section-container relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              <ScrollReveal>
                <div className="inline-flex items-center gap-3 mb-7">
                  <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7))' }} />
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: 'rgba(201,168,76,0.75)' }}>
                    Transparent Pricing · India
                  </span>
                  <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.7), transparent)' }} />
                </div>
              </ScrollReveal>

              <ScrollReveal delay="reveal-delay-1">
                <h1 className="font-display font-bold mb-5"
                  style={{ fontSize: 'clamp(40px, 6.5vw, 82px)', lineHeight: '0.95', letterSpacing: '-0.035em', color: '#F8F9FC' }}>
                  Websites That Win{' '}
                  <br className="hidden sm:block" />
                  <span style={{
                    background: 'linear-gradient(135deg, #C9A84C 0%, #F0D98A 45%, #C9A84C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Customers.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay="reveal-delay-2">
                <p className="font-body leading-relaxed mb-3 max-w-2xl mx-auto"
                  style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.48)' }}>
                  Fixed price. On-time delivery. Every rupee agreed in writing before we start —
                  no hidden charges, no surprises, no hourly billing.
                </p>
              </ScrollReveal>

              {/* Urgency pill */}
              <ScrollReveal delay="reveal-delay-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-9"
                  style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.22)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
                  <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase" style={{ color: 'rgba(201,168,76,0.8)' }}>
                    Limited slots this month — lock your price today
                  </span>
                </div>
              </ScrollReveal>

              {/* CTA row */}
              <ScrollReveal delay="reveal-delay-3">
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                  <Link href="/contact"
                    className="inline-flex items-center gap-2.5 font-body font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(201,168,76,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)', color: '#060D1A' }}>
                    Get a Free Quote
                    <ArrowRight />
                  </Link>
                  <a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 font-body font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.28)', color: '#25D366' }}>
                    <WhatsAppIcon />
                    WhatsApp Us
                  </a>
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)' }}>
                    Contact Us
                  </Link>
                </div>
              </ScrollReveal>

              {/* Trust bar */}
              <ScrollReveal delay="reveal-delay-4">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {TRUST_ITEMS.map(t => (
                    <div key={t.label} className="flex items-center gap-2">
                      <span className="text-sm">{t.icon}</span>
                      <span className="font-mono text-[9px] tracking-[0.12em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.32)' }}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            STATS BAND
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: 'rgba(201,168,76,0.06)', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="section-container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: '50+',    lbl: 'Projects Delivered'  },
                { val: '98%',    lbl: 'Client Satisfaction' },
                { val: '7 Days', lbl: 'Fastest Delivery'    },
                { val: '24 hrs', lbl: 'Free Quote Turnaround'},
              ].map(s => (
                <div key={s.lbl}>
                  <p className="font-display font-bold mb-0.5"
                    style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#C9A84C', letterSpacing: '-0.02em' }}>
                    {s.val}
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.14em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════════════════════
            PRICING TIERS
        ══════════════════════════════════════════════════════ */}
        <section id="packages" className="section-pad" style={{ background: '#0A1628' }}>
          <div className="section-container">

            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6))' }} />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.7)' }}>Choose Your Package</span>
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.6), transparent)' }} />
              </div>
              <h2 className="font-display font-bold mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 50px)', color: '#F8F9FC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                Simple, Fixed-Price Packages
              </h2>
              <p className="font-body max-w-xl mx-auto"
                style={{ fontSize: '15px', color: 'rgba(255,255,255,0.38)' }}>
                Every package is scoped and priced upfront. Pay in milestones. Receive exactly what is promised.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
              {TIERS.map((tier, i) => (
                <ScrollReveal
                  key={tier.name}
                  delay={(['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[i]}
                  variant="scale"
                >
                  <div
                    className="group relative flex flex-col h-full rounded-2xl p-7 transition-all duration-400 hover:-translate-y-2"
                    style={
                      tier.highlighted
                        ? {
                            background: 'linear-gradient(160deg, rgba(201,168,76,0.11) 0%, rgba(201,168,76,0.04) 100%)',
                            border:     '1.5px solid rgba(201,168,76,0.5)',
                            boxShadow:  '0 16px 64px rgba(201,168,76,0.12), inset 0 1px 0 rgba(201,168,76,0.2)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.025)',
                            border:     '1px solid rgba(255,255,255,0.07)',
                            boxShadow:  '0 4px 24px rgba(0,0,0,0.2)',
                          }
                    }
                  >
                    {/* Top gold line on featured */}
                    {tier.highlighted && (
                      <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
                    )}

                    {/* Popular badge */}
                    {tier.badge && (
                      <div className="absolute -top-[13px] inset-x-0 flex justify-center">
                        <span className="font-mono text-[9px] tracking-[0.16em] uppercase px-4 py-1.5 rounded-full font-bold"
                          style={{ background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)', color: '#060D1A' }}>
                          ✦ {tier.badge}
                        </span>
                      </div>
                    )}

                    {/* Emoji + tier name row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{tier.emoji}</span>
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase"
                          style={{ color: tier.highlighted ? '#C9A84C' : 'rgba(255,255,255,0.3)' }}>
                          {tier.name}
                        </p>
                      </div>
                      <span className="font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                        style={{
                          background: tier.highlighted ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                          border:     tier.highlighted ? '1px solid rgba(201,168,76,0.22)' : '1px solid rgba(255,255,255,0.07)',
                          color:      tier.highlighted ? '#C9A84C' : 'rgba(255,255,255,0.28)',
                        }}>
                        {tier.pill}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mb-0.5">
                      <span className="font-display font-bold leading-none"
                        style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', color: tier.highlighted ? '#C9A84C' : '#F8F9FC', letterSpacing: '-0.03em' }}>
                        {tier.price}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase"
                        style={{ color: 'rgba(255,255,255,0.28)' }}>{tier.suffix}</span>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="font-mono text-[9px] tracking-[0.10em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.25)' }}>⏱ {tier.timeline}</span>
                      <span className="font-mono text-[9px] tracking-[0.10em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.25)' }}>· {tier.period}</span>
                    </div>

                    {/* Tagline */}
                    <p className="font-body text-[13px] leading-relaxed mb-6"
                      style={{ color: 'rgba(255,255,255,0.42)' }}>
                      {tier.tagline}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px mb-6"
                      style={{ background: tier.highlighted ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.06)' }} />

                    {/* Features */}
                    <ul className="flex flex-col gap-3 flex-1 mb-8">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-3">
                          <span className="flex-shrink-0 mt-[2px]"
                            style={{ color: tier.highlighted ? '#C9A84C' : '#1DB8A0' }}>
                            <CheckIcon />
                          </span>
                          <span className="font-body text-[13px] leading-snug"
                            style={{ color: tier.highlighted ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.46)' }}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href="/contact"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-body font-bold text-[12px] tracking-[0.1em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                      style={
                        tier.highlighted
                          ? { background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)', color: '#060D1A', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }
                          : { background: 'transparent', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.48)' }
                      }>
                      {tier.cta}
                      <ArrowRight />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Payment reassurance strip */}
            <ScrollReveal className="mt-8 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl px-8 py-5"
                style={{ background: 'rgba(29,184,160,0.04)', border: '1px solid rgba(29,184,160,0.12)' }}>
                {[
                  '50% to start · 50% on delivery',
                  'EMI on ₹35K+ projects',
                  'GST invoice issued',
                  'Fixed price — no overruns',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <span style={{ color: '#1DB8A0' }}><CheckIcon /></span>
                    <span className="font-mono text-[9.5px] tracking-[0.10em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.35)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            WEBSITE MAINTENANCE WAAS STRIP
        ══════════════════════════════════════════════════════ */}
        <ScrollReveal>
          <div className="section-container pb-0">
            <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl px-7 py-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.22)', color: '#C9A84C' }}>
                <ZapIcon />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-body font-bold text-sm" style={{ color: '#F8F9FC' }}>
                  Website Care Plan{' '}
                  <span className="font-mono text-[11px] tracking-wider" style={{ color: '#C9A84C' }}>
                    — ₹0 upfront · ₹2,499 / month
                  </span>
                </p>
                <p className="font-body text-[12.5px] mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Full website build, hosting, SSL, monthly updates & priority support — one flat monthly fee.
                </p>
              </div>
              <Link href="/contact"
                className="flex-shrink-0 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-opacity duration-200 hover:opacity-70"
                style={{ color: '#C9A84C' }}>
                Learn More <ArrowRight />
              </Link>
            </div>
          </div>
        </ScrollReveal>


        {/* ══════════════════════════════════════════════════════
            QUICK PRICE MENU
        ══════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: '#060D1A', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="section-container">

            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.8), transparent)' }} />
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
                      style={{ color: 'rgba(201,168,76,0.7)' }}>Price Menu</span>
                  </div>
                  <h2 className="font-display font-bold"
                    style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: '#F8F9FC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                    What Does Your Website Cost?
                  </h2>
                  <p className="font-body text-sm mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Quick reference by project type — honest starting points.
                  </p>
                </div>
                <Link href="/contact"
                  className="flex-shrink-0 inline-flex items-center gap-2 font-body font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}>
                  Get Custom Quote <ArrowRight />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_MENU.map((s, i) => (
                <ScrollReveal
                  key={s.title}
                  delay={(['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-1', 'reveal-delay-2'] as const)[i % 3]}
                >
                  <div
                    className="group flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                    style={{
                      background:  'rgba(255,255,255,0.025)',
                      border:      '1px solid rgba(255,255,255,0.06)',
                      transition:  'border-color 0.3s, transform 0.3s',
                    }}
                  >
                    <div>
                      <p className="font-body font-bold text-sm" style={{ color: '#F8F9FC' }}>{s.title}</p>
                      <p className="font-mono text-[9px] tracking-wider uppercase mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.25)' }}>⏱ {s.timeline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:block font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(201,168,76,0.65)' }}>
                        {s.tag}
                      </span>
                      <span className="font-display font-bold"
                        style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#C9A84C', letterSpacing: '-0.02em' }}>
                        {s.price}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mt-5 text-center">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                All prices in INR · GST extra · Final quote after free consultation
              </p>
            </ScrollReveal>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            SERVICE PRICE TABLE (from data)
        ══════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: '#0A1628', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="section-container">

            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.8), transparent)' }} />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.7)' }}>All Services</span>
              </div>
              <h2 className="font-display font-bold mb-10"
                style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: '#F8F9FC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                Full Service Price List
              </h2>
            </ScrollReveal>

            <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.035)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <th className="text-left px-6 py-4 font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Service</th>
                    <th className="text-left px-6 py-4 font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>Starting From</th>
                    <th className="text-left px-6 py-4 font-mono text-[10px] tracking-[0.16em] uppercase hidden md:table-cell" style={{ color: 'rgba(255,255,255,0.28)' }}>Tags</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, i) => (
                    <tr
                      key={service.slug}
                      className="group transition-all duration-150 hover:bg-white/[0.02]"
                      style={{
                        background:   i % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'rgba(255,255,255,0.028)',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      <td className="px-6 py-4">
                        <p className="font-body font-bold text-sm" style={{ color: '#F0F0F5' }}>{service.title}</p>
                        <p className="font-body text-xs mt-0.5 hidden sm:block" style={{ color: 'rgba(255,255,255,0.28)' }}>{service.tagline}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-bold" style={{ color: '#C9A84C' }}>
                          {service.startingFrom ?? 'Custom'}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 3).map(t => (
                            <span key={t}
                              className="font-mono text-[8.5px] tracking-wide rounded-full px-2.5 py-0.5"
                              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.32)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase ml-auto w-fit opacity-35 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ color: '#C9A84C' }}>
                          Details <ArrowRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ScrollReveal className="mt-5 text-center">
              <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                All prices are starting points. Final quotes depend on scope and complexity.{' '}
                <Link href="/contact" className="underline underline-offset-2"
                  style={{ color: 'rgba(201,168,76,0.6)' }}>
                  Submit a brief for an exact quote.
                </Link>
              </p>
            </ScrollReveal>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: '#060D1A', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="section-container">

            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6))' }} />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.7)' }}>Our Process</span>
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.6), transparent)' }} />
              </div>
              <h2 className="font-display font-bold"
                style={{ fontSize: 'clamp(24px, 4vw, 44px)', color: '#F8F9FC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                From Enquiry to Live Site
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {PROCESS_STEPS.map((step, i) => (
                <ScrollReveal
                  key={step.step}
                  delay={(['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[i]}
                  variant="scale"
                >
                  <div className="relative flex flex-col p-6 rounded-2xl h-full"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {/* Connector line */}
                    {i < 3 && (
                      <div className="hidden lg:block absolute top-8 -right-2.5 w-5 h-px"
                        style={{ background: 'rgba(201,168,76,0.3)' }} />
                    )}
                    <span className="font-display font-bold mb-4 leading-none"
                      style={{ fontSize: '36px', color: 'rgba(201,168,76,0.15)', letterSpacing: '-0.04em' }}>
                      {step.step}
                    </span>
                    <h3 className="font-body font-bold text-sm mb-2" style={{ color: '#F0F0F5' }}>
                      {step.title}
                    </h3>
                    <p className="font-body text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>
        </section>


        {/* ══════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: '#0A1628', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="section-container max-w-[840px]">

            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.8), transparent)' }} />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(201,168,76,0.7)' }}>FAQ</span>
              </div>
              <h2 className="font-display font-bold mb-10"
                style={{ fontSize: 'clamp(24px, 4vw, 44px)', color: '#F8F9FC', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                Questions We Get Asked Most
              </h2>
            </ScrollReveal>

            <Accordion.Root type="multiple" className="flex flex-col gap-3">
              {PRICING_FAQS.map((faq, i) => (
                <ScrollReveal
                  key={faq.question}
                  delay={(['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-1', 'reveal-delay-2'] as const)[i]}
                >
                  <Accordion.Item
                    value={`faq-${i}`}
                    className="rounded-xl overflow-hidden group"
                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <Accordion.Trigger
                      className="group w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-200 hover:bg-white/[0.02]"
                      style={{ background: 'rgba(255,255,255,0.025)' }}
                    >
                      <span className="font-body font-bold text-sm pr-4" style={{ color: '#F0F0F5' }}>
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-data-[state=open]:bg-gold/10"
                        style={{ color: '#C9A84C', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
                        <ChevronIcon />
                      </span>
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
                      <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
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


        {/* ══════════════════════════════════════════════════════
            FINAL CONVERSION CTA
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden section-pad" style={{ background: '#060D1A' }}>
          {/* Atmosphere */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 115%, rgba(201,168,76,0.16) 0%, transparent 65%)' }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.14) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 50%, transparent 100%)' }} />

          <div className="section-container relative z-10">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.2)' }}>

                {/* Inner glow */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%)' }} />

                <div className="relative z-10">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
                    style={{ color: 'rgba(201,168,76,0.65)' }}>
                    👉 Ready to grow your business?
                  </p>

                  <h2 className="font-display font-bold mb-4"
                    style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: '#F8F9FC', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                    Get Your Fixed-Price{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #C9A84C 0%, #F0D98A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Proposal Today
                    </span>
                  </h2>

                  <p className="font-body leading-relaxed mb-9 max-w-lg mx-auto"
                    style={{ fontSize: '15px', color: 'rgba(255,255,255,0.42)' }}>
                    Share your requirements in 2 minutes. Receive a detailed written proposal
                    within 24 hours — free, no commitment required.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <Link href="/contact"
                      className="inline-flex items-center gap-2.5 font-body font-bold text-sm uppercase tracking-wider px-9 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(201,168,76,0.35)]"
                      style={{ background: 'linear-gradient(135deg, #C9A84C, #E8CB7A)', color: '#060D1A' }}>
                      Get Free Quote Now
                      <ArrowRight />
                    </Link>
                    <a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 font-body font-bold text-sm uppercase tracking-wider px-9 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: 'rgba(37,211,102,0.09)', border: '1px solid rgba(37,211,102,0.28)', color: '#25D366' }}>
                      <WhatsAppIcon />
                      WhatsApp Us
                    </a>
                    <Link href="/contact"
                      className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-wider px-9 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.25)', color: 'rgba(201,168,76,0.7)' }}>
                      Contact Us
                    </Link>
                  </div>

                  {/* Mini trust row */}
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    {['50% Pay After Delivery', 'GST Invoice', 'Free Proposal in 24 hrs', 'No Hidden Charges'].map(t => (
                      <div key={t} className="flex items-center gap-1.5">
                        <span style={{ color: '#1DB8A0' }}><CheckIcon /></span>
                        <span className="font-mono text-[9px] tracking-[0.12em] uppercase"
                          style={{ color: 'rgba(255,255,255,0.28)' }}>{t}</span>
                      </div>
                    ))}
                  </div>

                  <p className="font-mono text-[8.5px] tracking-[0.12em] uppercase mt-6"
                    style={{ color: 'rgba(255,255,255,0.16)' }}>
                    All prices in INR · GST extra at 18% · Final quote after free consultation
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </>
  )
}