/* ================================================================
   ELVATRIXA — CONTACT PAGE
   File: src/app/(marketing)/contact/page.tsx

   Layout:
   - Left column: headline + trust signals + contact details
   - Right column: 3-step ContactForm
   - Below fold: FAQ strip + WhatsApp CTA
================================================================ */

import type { Metadata }     from 'next'
import { buildPageMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo'
import ContactForm           from '@/components/forms/ContactForm'
import ScrollReveal          from '@/components/ui/ScrollReveal'

export const metadata: Metadata = buildPageMetadata({
  title:       'Contact Us',
  description:
    'Book a free 30-minute strategy call with Elvatrixa. ' +
    'Tell us about your project and receive a fixed-price proposal within 48 hours.',
  canonical:   '/contact',
  keywords:    ['contact Elvatrixa', 'book strategy call', 'get a quote', 'web development quote UK'],
})

const CONTACT_FAQS = [
  {
    question: 'How quickly will you respond?',
    answer:   'We respond to every enquiry within 4 business hours. If your project is urgent, WhatsApp us directly for an immediate reply.',
  },
  {
    question: 'Do you offer fixed-price projects?',
    answer:   'Yes — always. We never bill hourly. Every project starts with a detailed written proposal with a fixed price and clear milestone plan. No surprises.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:   'You will receive an automated confirmation with a reference number. Uday will then review your brief personally and reply within 4 hours with initial thoughts and next steps.',
  },
  {
    question: 'Can you sign an NDA before we discuss the project?',
    answer:   'Absolutely. We sign NDAs routinely for agency white-label work and confidential product builds. Just mention it in your brief or reply to the confirmation email.',
  },
]

/* ── ICONS ───────────────────────────────────────────────────── */

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.29l3-.05a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.09 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21 16z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  </svg>
)

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 1l1.5 3.1L12 4.7l-2.5 2.4.6 3.4L7 9l-3.1 1.6.6-3.4L2 4.7l3.5-.6L7 1z"/>
  </svg>
)

/* ── PAGE ────────────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(CONTACT_FAQS)) }} />

      <div style={{ background: 'var(--bg-1)' }}>

        {/* ── HERO + FORM ── */}
        <section
          className="relative overflow-hidden section-pad"
          style={{ background: 'var(--bg-0)' }}
        >
          {/* Glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.12) 0%, transparent 65%)' }} />
          {/* Dot grid */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

              {/* ── Left column: context ── */}
              <div className="lg:sticky lg:top-28">
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="block h-px w-8 shrink-0" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                    <span className="section-label">Get in touch</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay="reveal-delay-1">
                  <h1
                    className="font-display font-bold mb-5"
                    style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: '0.94', letterSpacing: '-0.03em', color: 'var(--text-1)' }}
                  >
                    Let&apos;s Build<br />
                    <span className="text-gold-gradient">Something Great.</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay="reveal-delay-2">
                  <p className="font-body leading-relaxed mb-8 max-w-md" style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'var(--text-3)' }}>
                    Fill in the brief below and we&apos;ll send you a fixed-price proposal within 48 hours. No fluff, no vague estimates — just a clear plan and price.
                  </p>
                </ScrollReveal>

                {/* Trust badges */}
                <ScrollReveal delay="reveal-delay-3">
                  <div className="flex flex-col gap-3 mb-10">
                    {[
                      { icon: <ClockIcon />, text: 'Reply within 4 business hours' },
                      { icon: <ShieldIcon />, text: 'Fixed-price proposals — no hourly billing' },
                      { icon: <StarIcon />, text: '5-star rated by US & UK clients' },
                    ].map(item => (
                      <div key={item.text} className="flex items-center gap-3">
                        <span style={{ color: 'var(--gold)' }}>{item.icon}</span>
                        <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Divider */}
                <div className="w-full h-px mb-8" style={{ background: 'var(--border-subtle)' }} />

                {/* Direct contact */}
                <ScrollReveal delay="reveal-delay-4">
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: 'var(--text-4)' }}>
                    Or reach us directly
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:hello@elvatrixa.com"
                      className="flex items-center gap-3 font-body text-sm transition-colors duration-150 hover:text-gold group w-fit"
                      style={{ color: 'var(--text-3)' }}>
                      <span style={{ color: 'var(--text-4)' }} className="group-hover:text-gold transition-colors duration-150"><MailIcon /></span>
                      hello@elvatrixa.com
                    </a>
                    <a href="tel:+918668296156"
                      className="flex items-center gap-3 font-body text-sm transition-colors duration-150 hover:text-gold group w-fit"
                      style={{ color: 'var(--text-3)' }}>
                      <span style={{ color: 'var(--text-4)' }} className="group-hover:text-gold transition-colors duration-150"><PhoneIcon /></span>
                      +91 86682 96156
                    </a>
                    <a href="https://wa.me/918668296156?text=Hi%20Uday%2C%20I%27d%20like%20to%20discuss%20a%20project."
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 font-body text-sm transition-colors duration-150 group w-fit"
                      style={{ color: 'var(--teal)' }}>
                      <WhatsAppIcon />
                      WhatsApp us now
                    </a>
                  </div>
                </ScrollReveal>

                {/* Social proof strip */}
                <ScrollReveal delay="reveal-delay-5">
                  <div className="mt-10 pt-8 flex items-center gap-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    {/* Avatar stack */}
                    <div className="flex -space-x-2">
                      {['🇬🇧', '🇺🇸', '🇦🇺', '🇨🇦'].map((flag, i) => (
                        <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
                          style={{ background: 'var(--bg-3)', borderColor: 'var(--bg-0)' }}>
                          {flag}
                        </div>
                      ))}
                    </div>
                    <p className="font-body text-xs leading-snug" style={{ color: 'var(--text-4)' }}>
                      Trusted by founders and operators<br />across 12+ countries
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* ── Right column: form ── */}
              <ScrollReveal delay="reveal-delay-2">
                <div
                  className="rounded-2xl p-7 md:p-10"
                  style={{
                    background: 'var(--bg-3)',
                    border:     '1px solid var(--border-subtle)',
                    borderTop:  '3px solid var(--gold)',
                  }}
                >
                  <ContactForm />
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>


        {/* ── MINI FAQ ── */}
        <section className="section-pad" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section-container max-w-[800px]">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} aria-hidden="true" />
                <span className="section-label">Common questions</span>
              </div>
              <h2 className="font-display font-bold mb-10" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-1)', lineHeight: 1.1 }}>
                Before You Hit Send
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-5">
              {CONTACT_FAQS.map((faq, i) => (
                <ScrollReveal key={faq.question} delay={(['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'] as const)[i]}>
                  <div
                    className="p-5 rounded-xl"
                    style={{ background: 'var(--bg-3)', border: '1px solid var(--border-subtle)' }}
                  >
                    <h3 className="font-body font-bold text-base mb-2" style={{ color: 'var(--text-1)' }}>
                      {faq.question}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                      {faq.answer}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}