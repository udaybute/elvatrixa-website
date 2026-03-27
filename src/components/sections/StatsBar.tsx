import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal    from '@/components/ui/ScrollReveal'
import { stats }       from '@/data/stats'

/*
  StatsBar — a full-width band of 4 animated statistics.

  Design decisions:
  - Semi-transparent dark surface slightly different from page bg
    creates the visual impression of a floating band
  - Gold horizontal accent lines top and bottom
  - Each stat: large Cormorant number + DM Mono suffix + Lato label
  - 1px vertical dividers between stats (hidden on mobile)
  - Numbers animate 0 → final value when scrolled into view
  - Section sits between Hero and ServicesGrid to maintain scroll momentum
*/
export default function StatsBar() {
  return (
    <section
      aria-label="Key statistics"
      style={{
        background:   'var(--bg-2)',
        borderTop:    '1px solid var(--border-gold)',
        borderBottom: '1px solid var(--border-gold)',
      }}
    >
      <div className="section-container py-14 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-0">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={`reveal-delay-${i + 1}` as `reveal-delay-${number}`}
            >
              <div className="relative flex flex-col items-center text-center px-4">

                {/* ── Vertical divider — visible on lg only ── */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                    style={{ background: 'var(--border-subtle)' }}
                  />
                )}

                {/* ── Number ── */}
                <div
                  className="font-display font-bold leading-none mb-2"
                  style={{
                    fontSize: 'clamp(42px, 5vw, 64px)',
                    color:    'var(--gold)',
                  }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2000}
                  />
                </div>

                {/* ── Gold underline accent ── */}
                <span
                  className="block w-8 h-px mb-3"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--gold), transparent)',
                  }}
                />

                {/* ── Label ── */}
                <span
                  className="font-body text-sm tracking-wide uppercase"
                  style={{ color: 'var(--text-3)', letterSpacing: '0.08em' }}
                >
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}