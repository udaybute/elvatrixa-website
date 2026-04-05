import Image        from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

/* ── Star rating icon ── */
const Star = ({ filled }: { filled: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.2"
  >
    <path d="M7 1l1.55 3.14L12 4.71l-2.5 2.43.59 3.44L7 9l-3.09 1.62.59-3.44L2 4.71l3.45-.57L7 1z" />
  </svg>
)

/*
  Testimonials — 3 client quote cards.

  Design decisions:
  - bg-1 again (same as Hero/WhyElvatrixa) so the section feels grounded
  - Large decorative opening quotation mark (Cormorant Garamond, gold, very large)
    positioned absolutely top-left of the card as background decoration
  - Stars above the quote for immediate credibility signal
  - Client photo in a circle with a gold ring
  - Company + country in DM Mono below name
  - Soft card-dark style with a gold top border
*/
export default function Testimonials() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-section)' }}>
      <div className="section-container">

        {/* ── Heading ── */}
        <ScrollReveal>
          <SectionHeading
            label="Client voices"
            heading="What Our Clients Say"
            subheading="We measure success by the outcomes our clients achieve — not by the hours we bill."
            align="center"
            className="mb-14"
          />
        </ScrollReveal>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal
              key={t.id}
              delay={`reveal-delay-${i + 1}` as `reveal-delay-${number}`}
              variant="scale"
            >
              <article
                className="relative flex flex-col p-7 rounded-xl overflow-hidden h-full"
                style={{
                  background: '#FFFFFF',
                  border:     '1px solid #E5E7EB',
                  borderTop:  '3px solid var(--gold)',
                  boxShadow:  '0 2px 12px rgba(10,22,40,0.06)',
                }}
              >
                {/* ── Decorative giant quote mark ── */}
                <div
                  aria-hidden="true"
                  className="absolute top-3 right-5 font-display font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontSize:   '120px',
                    color:      'var(--gold)',
                    opacity:    0.06,
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </div>

                {/* ── Stars ── */}
                <div
                  className="flex items-center gap-1 mb-5"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span
                      key={si}
                      style={{ color: si < t.rating ? 'var(--gold)' : '#D1D5DB' }}
                    >
                      <Star filled={si < t.rating} />
                    </span>
                  ))}
                </div>

                {/* ── Quote ── */}
                <blockquote
                  className="font-body text-sm leading-relaxed flex-1 mb-6 relative z-10"
                  style={{ color: '#374151' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* ── Divider ── */}
                <div
                  className="w-full h-px mb-5"
                  style={{ background: '#E5E7EB' }}
                />

                {/* ── Client info ── */}
                <div className="flex items-center gap-3">
                  {/* Photo */}
                  {t.imageUrl && (
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                      style={{ border: '1.5px solid var(--gold-border)' }}
                    >
                      <Image
                        src={t.imageUrl}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Name + role + company */}
                  <div>
                    <p
                      className="font-body font-bold text-sm leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="font-mono text-[10px] tracking-wide mt-0.5"
                      style={{ color: '#6B7280', letterSpacing: '0.06em' }}
                    >
                      {t.role} · {t.company} · {t.country}
                    </p>
                  </div>
                </div>

              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Trust line below ── */}
        <ScrollReveal className="mt-12 text-center">
          <p
            className="font-mono text-[11px] tracking-widest uppercase"
            style={{ color: '#9CA3AF' }}
          >
            Serving clients in the US, UK, Australia, Canada & beyond
          </p>
        </ScrollReveal>

      </div>
    </section>
  )
}