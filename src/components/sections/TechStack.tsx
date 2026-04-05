import ScrollReveal   from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { techStack }  from '@/data/techStack'
import type { TechCategory } from '@/data/techStack'

/*
  TechStack — category-grouped technology showcase.

  Design language:
  - Grouped rows: numbered category label (left, fixed 160px) + chips (right, flex-wrap)
  - 1px hairline dividers between category rows
  - Each category has a unique accent colour (matching global token palette)
  - Coloured dot with glow indicator anchors each category label visually
  - Chips: subtle coloured bg + border, DM Mono name, no category repeat
  - "STACK" outline watermark behind content — luxury agency depth technique
  - Heading is left-aligned (mirrors editorial print layout)
  - Bottom rule with live tech count grounds the section
  - Mobile: label stacks above chips (column), desktop: side-by-side (row)

  Target audience: technical buyers (CTOs, engineering leads) — the layout
  signals precision and deliberate curation, not a "we use everything" shotgun.
*/

const CATEGORY_STYLES: Record<TechCategory, { color: string; bg: string; border: string }> = {
  'Frontend':      { color: '#E8C96A', bg: 'rgba(201,168,76,0.07)',  border: 'rgba(201,168,76,0.18)'  },
  'Backend':       { color: '#2DD4BC', bg: 'rgba(29,184,160,0.07)',  border: 'rgba(29,184,160,0.20)'  },
  'Database':      { color: '#79B8FF', bg: 'rgba(88,166,255,0.07)',  border: 'rgba(88,166,255,0.18)'  },
  'Cloud & Infra': { color: '#B794F4', bg: 'rgba(159,122,234,0.07)', border: 'rgba(159,122,234,0.18)' },
  'AI & ML':       { color: '#FCD34D', bg: 'rgba(252,211,77,0.07)',  border: 'rgba(252,211,77,0.18)'  },
  'E-Commerce':    { color: '#FCA5A5', bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.18)' },
  'CMS & Content': { color: '#C4B5FD', bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.18)' },
  'Analytics':     { color: '#6EE7B7', bg: 'rgba(52,211,153,0.07)',  border: 'rgba(52,211,153,0.18)'  },
  'Design':        { color: '#F9A8D4', bg: 'rgba(236,72,153,0.07)',  border: 'rgba(236,72,153,0.18)'  },
}

/* Group tech items by category, preserving data-file insertion order */
const groupedTech = techStack.reduce<Partial<Record<TechCategory, typeof techStack>>>(
  (acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = []
    acc[tech.category]!.push(tech)
    return acc
  },
  {},
)
const categoryEntries = Object.entries(groupedTech) as [TechCategory, typeof techStack][]


export default function TechStack() {
  return (
    <section
      className="section-pad"
      style={{ background: 'var(--bg-page)', position: 'relative', overflow: 'hidden' }}
    >

      {/* ── "STACK" outline watermark — depth layer ─────────── */}
      <div
        aria-hidden="true"
        style={{
          position:         'absolute',
          top:              '50%',
          right:            '-1%',
          transform:        'translateY(-50%)',
          fontFamily:       'var(--font-display)',
          fontSize:         'clamp(100px, 13vw, 200px)',
          fontWeight:       700,
          color:            'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.05)',
          lineHeight:       1,
          letterSpacing:    '-0.03em',
          pointerEvents:    'none',
          userSelect:       'none',
          whiteSpace:       'nowrap',
        }}
      >
        STACK
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Heading — left-aligned editorial style ─────────── */}
        <ScrollReveal>
          <SectionHeading
            label="Our stack"
            heading="Technologies We Master"
            subheading="Modern, battle-tested tools selected for performance and scalability — not trend. Every technology earns its place."
            align="left"
            className="mb-16 max-w-2xl"
          />
        </ScrollReveal>

        {/* ── Category rows ─────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categoryEntries.map(([category, items], rowIndex) => {
            const s      = CATEGORY_STYLES[category]
            const isLast = rowIndex === categoryEntries.length - 1

            return (
              <ScrollReveal
                key={category}
                delay={`reveal-delay-${Math.min(rowIndex + 1, 8)}`}
              >

                {/* Row */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center"
                  style={{
                    gap:           'clamp(14px, 2vw, 32px)',
                    paddingTop:    'clamp(20px, 2.5vw, 32px)',
                    paddingBottom: 'clamp(20px, 2.5vw, 32px)',
                  }}
                >

                  {/* ── Category label column ── */}
                  <div
                    className="flex items-center gap-3 flex-shrink-0"
                    style={{ width: 'clamp(140px, 14vw, 180px)' }}
                  >
                    {/* Accent dot with glow */}
                    <div
                      aria-hidden="true"
                      style={{
                        width:        '6px',
                        height:       '6px',
                        borderRadius: '50%',
                        background:   s.color,
                        flexShrink:   0,
                        boxShadow:    `0 0 8px ${s.color}70`,
                      }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {/* Row index */}
                      <span
                        className="font-mono"
                        style={{
                          fontSize:      '9px',
                          letterSpacing: '0.18em',
                          color:         'var(--text-4)',
                          textTransform: 'uppercase',
                          lineHeight:    1,
                        }}
                      >
                        {String(rowIndex + 1).padStart(2, '0')}
                      </span>
                      {/* Category name */}
                      <span
                        className="font-mono"
                        style={{
                          fontSize:      '11px',
                          fontWeight:    500,
                          letterSpacing: '0.06em',
                          color:         s.color,
                          textTransform: 'uppercase',
                          lineHeight:    1,
                        }}
                      >
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* ── Tech chips ── */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                    {items.map(tech => (
                      <div
                        key={tech.name}
                        style={{
                          background:    s.bg,
                          border:        `1px solid ${s.border}`,
                          color:         s.color,
                          padding:       '7px 16px',
                          borderRadius:  '3px',
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '12px',
                          fontWeight:    500,
                          letterSpacing: '0.04em',
                          whiteSpace:    'nowrap',
                          lineHeight:    1,
                        }}
                      >
                        {tech.name}
                      </div>
                    ))}
                  </div>

                </div>

                {/* Hairline row divider */}
                {!isLast && (
                  <div style={{ height: '1px', background: 'var(--border-subtle)' }} />
                )}

              </ScrollReveal>
            )
          })}
        </div>

        {/* ── Bottom rule with tech count ───────────────────── */}
        <ScrollReveal className="mt-14">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-subtle)' }} />
            <span
              className="font-mono"
              style={{
                fontSize:      '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         'var(--text-4)',
                whiteSpace:    'nowrap',
              }}
            >
              {techStack.length} technologies — chosen for outcomes
            </span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-subtle)' }} />
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
