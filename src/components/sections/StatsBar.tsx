import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal    from '@/components/ui/ScrollReveal'
import { stats }       from '@/data/stats'

/*
  StatsBar — premium 4-up metrics band.

  Design language:
  - bg-0 (darkest layer) creates maximum contrast against surrounding sections
  - Gold gradient rules top + bottom signal a "curated precision" aesthetic
  - 1px gap trick: the grid background IS the divider — zero extra markup
  - Per-cell radial gold glow radiates behind each number for depth
  - Per-cell top accent line (left 20%–right 20%) anchors the glow visually
  - Numbers use text-gold-gradient class (3-stop: pale → light → gold)
  - Micro-copy beneath label adds credibility without clutter
  - 2×2 on mobile (never a single column) — each stat retains visual weight
*/

const STAT_CONTEXT = [
  'shipped without exception',
  'US, UK & beyond',
  'across 4 continents',
  'milestone-guaranteed',
]

export default function StatsBar() {
  return (
    <section
      aria-label="Key statistics"
      style={{ background: 'var(--bg-nav)', position: 'relative' }}
    >

      {/* ── Top gold gradient rule ────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--border-gold) 15%, var(--gold) 50%, var(--border-gold) 85%, transparent 100%)',
        }}
      />

      <div
        className="section-container"
        style={{
          paddingTop:    'clamp(72px, 9vw, 104px)',
          paddingBottom: 'clamp(72px, 9vw, 104px)',
        }}
      >

        {/*
          1px-gap hairline grid.
          The parent's background: var(--border-subtle) shows through
          the 1px gaps — each gap becomes a hairline divider.
          Each child resets its own background to var(--bg-0).
        */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1px', background: 'var(--border-subtle)' }}
        >
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={`reveal-delay-${i + 1}`}
            >
              <div
                style={{
                  background:    'var(--bg-nav)',
                  padding:       'clamp(44px, 5.5vw, 68px) clamp(20px, 3vw, 40px)',
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  textAlign:     'center',
                  gap:           '12px',
                  position:      'relative',
                  overflow:      'hidden',
                  height:        '100%',
                }}
              >

                {/* Radial ambient glow — bleeds up behind the number */}
                <div
                  aria-hidden="true"
                  style={{
                    position:      'absolute',
                    top:           '-20px',
                    left:          '50%',
                    transform:     'translateX(-50%)',
                    width:         '260px',
                    height:        '220px',
                    background:    'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.13) 0%, transparent 68%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Per-card top accent line */}
                <div
                  aria-hidden="true"
                  style={{
                    position:   'absolute',
                    top:        0,
                    left:       '18%',
                    right:      '18%',
                    height:     '1px',
                    background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
                  }}
                />

                {/* ── Animated number ── */}
                <div
                  className="font-display font-bold"
                  style={{
                    fontSize:      'clamp(60px, 5.5vw, 88px)',
                    lineHeight:    1,
                    letterSpacing: '-0.025em',
                  }}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2000}
                    className="text-gold-gradient"
                  />
                </div>

                {/* Thin gold rule below number */}
                <div
                  aria-hidden="true"
                  style={{
                    width:      '28px',
                    height:     '1px',
                    flexShrink: 0,
                    background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
                  }}
                />

                {/* ── Stat label ── */}
                <span
                  className="font-body"
                  style={{
                    fontSize:      '11px',
                    fontWeight:    700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color:         'var(--text-1)',
                    lineHeight:    1.4,
                  }}
                >
                  {stat.label}
                </span>

                {/* ── Context micro-copy ── */}
                <span
                  className="font-mono"
                  style={{
                    fontSize:      '9px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color:         'var(--text-4)',
                  }}
                >
                  {STAT_CONTEXT[i]}
                </span>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* ── Bottom gold gradient rule ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          height:     '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--border-gold) 15%, var(--gold) 50%, var(--border-gold) 85%, transparent 100%)',
        }}
      />

    </section>
  )
}
