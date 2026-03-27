'use client'

import { useState }         from 'react'
import type { Metadata }    from 'next'
import Link                 from 'next/link'
import ScrollReveal         from '@/components/ui/ScrollReveal'
import SectionHeading       from '@/components/ui/SectionHeading'

/* Note: metadata export cannot be used in 'use client' files.
   Move this to a separate generateMetadata if needed — for now
   the parent layout provides the base metadata. */

const CATEGORIES = ['All', 'Working With Us', 'Pricing', 'Process', 'Technical', 'Support']

const FAQS = [
  /* Working With Us */
  { q: 'Are you a freelancer or an agency?', a: 'Elvatrixa is a digital innovation studio — not a freelancer. We operate with agency-grade processes, communication standards, and delivery quality. Uday is the founder and lead engineer, supported by specialist collaborators per project.', cat: 'Working With Us' },
  { q: 'Where are you based and which time zones do you serve?', a: 'We are based in Pune, India, and operate on UK and US business hours. For UK clients we hold calls between 9am–6pm GMT. For US clients we overlap with EST and PST mornings. You will never wait more than 4 hours for a response during business days.', cat: 'Working With Us' },
  { q: 'Do you sign NDAs?', a: 'Yes. We are happy to sign your NDA before any project discussion. Send it to hello@elvatrixa.com and we will review and return it within 24 hours.', cat: 'Working With Us' },
  { q: 'Do you do white-label work for agencies?', a: 'Yes. We have worked with UK digital agencies as a white-label development partner. We are experienced in staying invisible — no Elvatrixa branding in deliverables, direct client access only if you authorise it.', cat: 'Working With Us' },
  { q: 'How quickly can you start a project?', a: 'Typical availability is within 1–2 weeks of proposal sign-off. For urgent projects we can occasionally begin within 48 hours — discuss this on your strategy call.', cat: 'Working With Us' },

  /* Pricing */
  { q: 'Do you charge hourly or fixed price?', a: 'Fixed price always. We scope every project precisely and present a written proposal with a single price before work begins. No timesheets, no surprise invoices, no scope creep billing.', cat: 'Pricing' },
  { q: 'What is your payment structure?', a: '50% deposit on project kick-off, 50% on production delivery. For larger engagements (over $10k) we split across milestones. Payments via bank transfer or Stripe.', cat: 'Pricing' },
  { q: 'Do you offer payment plans?', a: 'For ongoing retainer clients we offer quarterly pre-payment at a 5% discount. For project work, milestone-based payment schedules are available on Growth and Enterprise engagements.', cat: 'Pricing' },
  { q: 'Are prices in USD or GBP?', a: 'All published prices are in USD. We also quote in GBP for UK clients at the prevailing exchange rate. Just mention your preferred currency when you book your strategy call.', cat: 'Pricing' },

  /* Process */
  { q: 'How does the discovery call work?', a: 'It is a focused 30-minute video call — no pitch, no sales pressure. We listen to your project, ask clarifying questions, and tell you honestly whether we are the right fit. If we are, we send a written proposal within 48 hours.', cat: 'Process' },
  { q: 'How long does a typical project take?', a: 'SaaS MVPs typically take 6–10 weeks. E-commerce builds 3–5 weeks. Performance audits 1–2 weeks. AI automation pipelines 2–6 weeks depending on complexity. We define the exact timeline in your proposal.', cat: 'Process' },
  { q: 'Can I see progress during the build?', a: 'Yes — you have full access to a live staging environment from the end of week one. We update it after every sprint. You always know exactly what has been built.', cat: 'Process' },
  { q: 'What happens if I want changes mid-project?', a: 'Minor changes within the agreed scope are handled without fuss. If you want to add features or change direction significantly, we scope the change and agree a price before building it. No surprises.', cat: 'Process' },
  { q: 'Do you provide documentation?', a: 'Yes. Every project includes technical documentation covering architecture decisions, deployment process, environment variables, and a handover guide. You can onboard any competent developer to the codebase without our help.', cat: 'Process' },

  /* Technical */
  { q: 'What tech stack do you use?', a: 'Our primary stack is Next.js 14 + TypeScript + PostgreSQL + Vercel for web and SaaS projects. For AI work we use Python, LangChain, and OpenAI APIs. For e-commerce, Shopify and headless Next.js. We always recommend the right tool for your specific situation.', cat: 'Technical' },
  { q: 'Who owns the code after delivery?', a: 'You do. 100%. On final payment you receive full ownership of all source code, design files, and associated assets. We retain no rights whatsoever.', cat: 'Technical' },
  { q: 'Will my site be fast and SEO-ready?', a: 'Yes. Performance and SEO are built in from the start — not added as an afterthought. We target 95+ Lighthouse scores, sub-2-second LCP, and clean semantic HTML on every delivery.', cat: 'Technical' },
  { q: 'Can you work with our existing codebase?', a: 'Yes. We conduct a brief technical audit before quoting to understand the existing stack and identify any blockers. We have worked with inherited codebases in React, Vue, Laravel, WordPress, and Shopify.', cat: 'Technical' },

  /* Support */
  { q: 'What support do you provide after launch?', a: 'Every project includes 30 days of free post-launch support for bug fixes. After that, we offer monthly maintenance retainer plans starting at $450/mo with guaranteed response times and ongoing feature additions.', cat: 'Support' },
  { q: 'What is your response time for urgent issues?', a: 'Growth retainer clients receive a 4-hour response SLA. Enterprise retainer clients receive a 1-hour response SLA for critical issues. Non-retainer clients are handled on a best-effort basis with email support.', cat: 'Support' },
  { q: 'Can I cancel a retainer anytime?', a: 'Yes. All monthly retainer plans require 30 days written notice to cancel. No penalty, no lock-in. We earn your continued business every month.', cat: 'Support' },
]

function FaqItem({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background:  open ? 'var(--bg-3)' : 'var(--bg-2)',
        border:      `1px solid ${open ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
        borderLeft:  `3px solid ${open ? 'var(--gold)' : 'transparent'}`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-body font-bold text-base leading-snug" style={{ color: 'var(--text-1)' }}>
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background:  open ? 'var(--gold)' : 'var(--bg-4)',
            border:      `1px solid ${open ? 'var(--gold)' : 'var(--border-subtle)'}`,
            transform:   open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={open ? 'var(--bg-0)' : 'var(--text-3)'} strokeWidth="2" strokeLinecap="round">
            <path d="M6 2v8M2 6h8"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="w-full h-px mb-4" style={{ background: 'var(--border-subtle)' }} />
          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? FAQS : FAQS.filter((f) => f.cat === activeCategory)

  return (
    <div style={{ background: 'var(--bg-1)' }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden section-pad" style={{ background: 'var(--bg-0)' }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 65%)' }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-bg opacity-25" />
        <div className="section-container relative z-10 text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block h-px w-8" style={{ background: 'linear-gradient(270deg,var(--gold),transparent)' }}/>
              <span className="section-label">Common Questions</span>
              <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg,var(--gold),transparent)' }}/>
            </div>
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-1">
            <h1 className="font-display font-bold text-gold-gradient mb-6"
              style={{ fontSize: 'clamp(44px,7vw,88px)', lineHeight: '0.95', letterSpacing: '-0.03em' }}>
              Questions,<br />Answered.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-2">
            <p className="font-body leading-relaxed max-w-xl mx-auto mb-10"
              style={{ fontSize: 'clamp(16px,2vw,18px)', color: 'var(--text-3)' }}>
              Everything you need to know before starting a project with Elvatrixa —
              from pricing to process to post-launch support.
            </p>
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-3">
            <p className="font-body text-sm" style={{ color: 'var(--text-4)' }}>
              Can&apos;t find your answer?{' '}
              <Link href="/contact" className="underline transition-colors duration-150" style={{ color: 'var(--gold)' }}>
                Book a free call
              </Link>
              {' '}and ask us directly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ BODY ── */}
      <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
        <div className="section-container max-w-3xl mx-auto">

          {/* Category filter */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all duration-150"
                  style={{
                    background:  activeCategory === cat ? 'var(--gold)' : 'var(--bg-3)',
                    color:       activeCategory === cat ? 'var(--bg-0)' : 'var(--text-3)',
                    border:      `1px solid ${activeCategory === cat ? 'var(--gold)' : 'var(--border-subtle)'}`,
                    fontWeight:  activeCategory === cat ? 700 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQ items */}
          <div className="flex flex-col gap-3">
            {filtered.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={`reveal-delay-${(i % 3) + 1}` as `reveal-delay-${number}`}>
                <FaqItem faq={faq} />
              </ScrollReveal>
            ))}
          </div>

          {/* Still have questions */}
          <ScrollReveal className="mt-16">
            <div className="text-center p-10 rounded-2xl"
              style={{ background: 'var(--bg-3)', border: '1px solid var(--border-subtle)', borderTop: '3px solid var(--gold)' }}>
              <h2 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--text-1)' }}>
                Still have a question?
              </h2>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--text-3)' }}>
                Book a free 30-minute call and ask us anything — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn-primary">Book a Free Call</Link>
                <a href="mailto:hello@elvatrixa.com" className="btn-secondary">Email Us Directly</a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  )
}
