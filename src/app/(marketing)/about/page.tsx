/* ================================================================
   ELVATRIXA — ABOUT PAGE
   File: src/app/(marketing)/about/page.tsx

   Sections:
   1. Hero — founder statement
   2. Mission & values
   3. Why Elvatrixa exists (founder story)
   4. Stats grid
   5. WHY_ITEMS (6 differentiators)
   6. CTA
================================================================ */

import type { Metadata }     from 'next'
import Link                  from 'next/link'
import { buildPageMetadata, breadcrumbSchema } from '@/lib/seo'
import { aboutStats }        from '@/data/stats'
import { WHY_ITEMS }         from '@/data/why-items'
import ScrollReveal          from '@/components/ui/ScrollReveal'
import AnimatedCounter       from '@/components/ui/AnimatedCounter'

export const metadata: Metadata = buildPageMetadata({
  title:       'About Us',
  description:
    'Elvatrixa is a digital innovation studio founded by Uday Mohanrao Bute. ' +
    'We build world-class SaaS, AI automation, and digital products for US and UK businesses.',
  canonical:   '/about',
  keywords:    ['about Elvatrixa', 'digital agency UK', 'Uday Bute', 'SaaS development studio'],
})

const VALUES = [
  {
    number: '01',
    title:  'Honesty over comfort',
    body:
      'We tell clients what they need to hear, not what they want to hear. If a feature won\'t serve your goals, we\'ll say so — and propose a better alternative.',
  },
  {
    number: '02',
    title:  'Results, not activity',
    body:
      'We measure every engagement by its business outcome. Lines of code written, meetings held, and hours logged are irrelevant. Revenue moved, costs reduced, and products shipped are not.',
  },
  {
    number: '03',
    title:  'Fixed price, fixed scope',
    body:
      'Ambiguous hourly billing erodes trust and incentivises inefficiency. Every Elvatrixa project starts with a detailed, fixed-price proposal — so you always know exactly what you are getting.',
  },
  {
    number: '04',
    title:  'Speed without sloppiness',
    body:
      'We move fast because our process is disciplined, not because we skip steps. A well-structured project builds and ships faster than a chaotic one — with better code quality.',
  },
]

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }])) }} />

      <div style={{ background: 'var(--bg-1)' }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden section-pad" style={{ background: 'var(--bg-0)' }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 65%)' }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="section-container relative z-10">
            <div className="max-w-3xl">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                  <span className="section-label">Our story</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay="reveal-delay-1">
                <h1
                  className="font-display font-bold text-gold-gradient mb-6"
                  style={{ fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: '0.94', letterSpacing: '-0.03em' }}
                >
                  Built Different.<br />By Design.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay="reveal-delay-2">
                <p className="font-body leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-3)' }}>
                  Elvatrixa is a digital innovation studio founded with one conviction: that most
                  agencies fail their clients not because of a lack of technical skill, but because
                  of a lack of commercial perspective. We built Elvatrixa to be different.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>


        {/* ── FOUNDER STORY ── */}
        <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Story prose */}
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                  <span className="section-label">The founder</span>
                </div>
                <h2
                  className="font-display font-bold mb-6"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-1)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
                >
                  Why Elvatrixa Exists
                </h2>
                <div className="flex flex-col gap-5">
                  {[
                    'I started Elvatrixa because I was frustrated watching capable clients get burned by agencies that treated every project as a time-billing exercise rather than a business outcome exercise. The agency would deliver the code. The client would get a site. Nobody would measure whether it actually worked.',
                    'The businesses I wanted to serve — scaling companies in the US and UK — needed a partner who thought like a product person and delivered like an engineer. Someone who would push back on bad ideas, propose better ones, and be accountable for the result.',
                    'Every hire, every process, every decision at Elvatrixa is built around that simple idea: your success is the only metric that matters.',
                  ].map((para, i) => (
                    <p key={i} className="font-body leading-[1.85]" style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: i === 0 ? 'var(--text-2)' : 'var(--text-3)' }}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Founder signature */}
                <div className="flex items-center gap-4 mt-8 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl shrink-0"
                    style={{ background: 'var(--gold-dim)', border: '2px solid var(--gold-border)', color: 'var(--gold)' }}
                  >
                    U
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm" style={{ color: 'var(--text-1)' }}>Uday Mohanrao Bute</p>
                    <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-4)' }}>Founder, Elvatrixa</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Values */}
              <ScrollReveal delay="reveal-delay-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                  <span className="section-label">How we operate</span>
                </div>
                <h2
                  className="font-display font-bold mb-8"
                  style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-1)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
                >
                  Four Non-Negotiables
                </h2>
                <div className="flex flex-col gap-4">
                  {VALUES.map(v => (
                    <div
                      key={v.number}
                      className="flex items-start gap-4 p-5 rounded-xl transition-all duration-200 hover:border-[var(--gold-border)]"
                      style={{ background: 'var(--bg-3)', border: '1px solid var(--border-subtle)' }}
                    >
                      <span
                        className="font-display font-bold leading-none shrink-0 mt-0.5 opacity-40"
                        style={{ fontSize: '28px', color: 'var(--gold)' }}
                      >
                        {v.number}
                      </span>
                      <div>
                        <p className="font-body font-bold text-sm mb-1.5" style={{ color: 'var(--text-1)' }}>{v.title}</p>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{v.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>


        {/* ── STATS GRID ── */}
        <section
          style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="section-container py-14 md:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-0">
              {aboutStats.map((stat, i) => (
                <ScrollReveal
                  key={stat.label}
                  delay={(['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'] as const)[Math.min(i, 7)]}
                >
                  <div className="relative flex flex-col items-center text-center px-4">
                    {i % 4 !== 0 && (
                      <span
                        aria-hidden="true"
                        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px"
                        style={{ background: 'var(--border-subtle)' }}
                      />
                    )}
                    <div
                      className="font-display font-bold leading-none mb-2"
                      style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', color: 'var(--gold)' }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={1800} />
                    </div>
                    <span className="block w-8 h-px mb-3"
                      style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
                      aria-hidden="true" />
                    <span className="font-body text-xs tracking-wide uppercase" style={{ color: 'var(--text-3)', letterSpacing: '0.08em' }}>
                      {stat.label}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ── WHY ELVATRIXA (differentiators) ── */}
        <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
          <div className="section-container">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                <span className="section-label">Our edge</span>
              </div>
              <h2
                className="font-display font-bold mb-14 max-w-xl"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-1)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                What Sets Us Apart
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_ITEMS.map((item, i) => (
                <ScrollReveal
                  key={item.number}
                  delay={(['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const)[i]}
                >
                  <div
                    className="group relative p-7 rounded-lg h-full border-l-[3px] border-l-transparent hover:border-l-[color:var(--gold)] hover:bg-[var(--bg-4)] transition-[border-color,background-color] duration-300"
                    style={{ background: 'var(--bg-3)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div className="font-display font-bold mb-5 leading-none select-none" style={{ fontSize: '48px', color: 'var(--gold)', opacity: 0.35 }} aria-hidden="true">
                      {item.number}
                    </div>
                    <h3 className="font-body font-bold text-base mb-3 leading-snug" style={{ color: 'var(--text-1)' }}>{item.title}</h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{item.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ── CTA ── */}
        <section className="relative overflow-hidden section-pad" style={{ background: 'var(--bg-0)', borderTop: '1px solid var(--border-subtle)' }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 120%, rgba(201,168,76,0.10) 0%, transparent 65%)' }} />
          <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 0%, var(--gold-border) 30%, var(--gold) 50%, var(--gold-border) 70%, transparent 100%)' }} />

          <div className="section-container relative z-10 text-center max-w-xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--text-4)' }}>
                Work with us
              </p>
              <h2
                className="font-display font-bold text-gold-gradient mb-5"
                style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: '0.95', letterSpacing: '-0.025em' }}
              >
                Ready to Build Something?
              </h2>
              <p className="font-body leading-relaxed mb-8" style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'var(--text-3)' }}>
                Book a free 30-minute strategy call. We will review your project and
                send a fixed-price proposal within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact" className="btn-primary">Book a Free Strategy Call</Link>
                <Link href="/work" className="btn-secondary flex items-center gap-2">
                  View Our Work <ArrowRight />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </>
  )
}