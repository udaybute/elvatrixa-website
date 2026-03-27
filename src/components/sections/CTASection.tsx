import Link        from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

const WhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

/*
  CTASection — the penultimate section before the footer.

  Design decisions:
  - Darkest background (bg-0) makes this feel like the bottom of the page
  - Strong gold radial glow from below creates a sense of emergence
  - The heading is deliberately short and imperative — "Let's Build Together"
  - Three contact options: primary CTA button, WhatsApp, and email
  - Trust reinforcement line: "Reply within 4 hours · US & UK business hours"
  - The section removes the last possible hesitation before converting
*/
export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ background: 'var(--bg-0)' }}
    >
      {/* ── Background glow — upward radial from bottom ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(201,168,76,0.14) 0%, transparent 65%)',
        }}
      />

      {/* ── Subtle dot grid ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid-bg opacity-30"
        style={{ backgroundSize: '40px 40px' }}
      />

      {/* ── Gold top border ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--gold-border) 30%, var(--gold) 50%, var(--gold-border) 70%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="section-container relative z-10 text-center">

        {/* ── Label ── */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              className="block h-px w-8"
              style={{ background: 'linear-gradient(270deg, var(--gold), transparent)' }}
            />
            <span className="section-label">Start your project</span>
            <span
              className="block h-px w-8"
              style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
            />
          </div>
        </ScrollReveal>

        {/* ── Main headline ── */}
        <ScrollReveal delay="reveal-delay-1">
          <h2
            className="font-display font-bold mb-6 text-gold-gradient"
            style={{
              fontSize:      'clamp(44px, 7vw, 88px)',
              lineHeight:    '0.95',
              letterSpacing: '-0.025em',
            }}
          >
            Let&apos;s Build<br />Together.
          </h2>
        </ScrollReveal>

        {/* ── Supporting copy ── */}
        <ScrollReveal delay="reveal-delay-2">
          <p
            className="font-body leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'var(--text-3)' }}
          >
            Whether you need a SaaS MVP, an AI automation system, or a complete
            digital transformation — book a free 30-minute strategy call and
            let&apos;s define exactly what your project needs.
          </p>
        </ScrollReveal>

        {/* ── CTAs ── */}
        <ScrollReveal delay="reveal-delay-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/contact" className="btn-primary group">
              Book a Free Strategy Call
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight />
              </span>
            </Link>

            <a
              href="https://wa.me/918668296156?text=Hi%20Uday%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Elvatrixa."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary group"
            >
              <WhatsApp />
              WhatsApp Us
            </a>
          </div>
        </ScrollReveal>

        {/* ── Trust reassurance ── */}
        <ScrollReveal delay="reveal-delay-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              'Reply within 4 hours',
              'US & UK business hours',
              'No commitment required',
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    className="hidden sm:block w-px h-3"
                    style={{ background: 'var(--border-subtle)' }}
                  />
                )}
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: 'var(--text-4)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Direct email ── */}
        <ScrollReveal delay="reveal-delay-5" className="mt-6">
          <p
            className="font-body text-sm"
            style={{ color: 'var(--text-4)' }}
          >
            Or email directly:{' '}
            <a
              href="mailto:hello@elvatrixa.com"
              className="transition-colors duration-200 hover:underline"
              style={{ color: 'var(--gold)' }}
            >
              hello@elvatrixa.com
            </a>
          </p>
        </ScrollReveal>

      </div>
    </section>
  )
}