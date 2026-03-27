import ScrollReveal  from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { techStack } from '@/data/techStack'

/*
  TechStack — technology name grid.

  Design decisions:
  - Alternating bg-2 for visual rhythm
  - No images/logos needed — clean DM Mono name chips are more
    readable than tiny logos at small sizes, and zero maintenance
  - Category colour-coding: Frontend=gold, Backend=teal, Database=blue,
    Cloud=purple, AI=coral, etc.
  - Cards have a subtle gold border and shimmer on hover
  - This section targets technical buyers (CTOs, devs) who care about stack
*/

const CATEGORY_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  Frontend:   { bg: 'rgba(201,168,76,0.08)',  text: '#E8C96A', border: 'rgba(201,168,76,0.22)' },
  Backend:    { bg: 'rgba(29,184,160,0.08)',  text: '#2DD4BC', border: 'rgba(29,184,160,0.25)' },
  Language:   { bg: 'rgba(29,184,160,0.06)',  text: '#2DD4BC', border: 'rgba(29,184,160,0.20)' },
  Database:   { bg: 'rgba(88,166,255,0.08)',  text: '#79B8FF', border: 'rgba(88,166,255,0.22)' },
  Cloud:      { bg: 'rgba(159,122,234,0.08)', text: '#B794F4', border: 'rgba(159,122,234,0.22)' },
  AI:         { bg: 'rgba(252,211,77,0.08)',  text: '#FCD34D', border: 'rgba(252,211,77,0.22)'  },
  'E-Commerce':{ bg: 'rgba(248,113,113,0.08)', text: '#FCA5A5', border: 'rgba(248,113,113,0.22)' },
  Payments:   { bg: 'rgba(52,211,153,0.08)',  text: '#6EE7B7', border: 'rgba(52,211,153,0.22)'  },
  CMS:        { bg: 'rgba(167,139,250,0.08)', text: '#C4B5FD', border: 'rgba(167,139,250,0.22)' },
  Deployment: { bg: 'rgba(255,255,255,0.04)', text: '#C9D1D9', border: 'rgba(255,255,255,0.10)' },
}

export default function TechStack() {
  return (
    <section className="section-pad-sm" style={{ background: 'var(--bg-2)' }}>
      <div className="section-container">

        {/* ── Heading ── */}
        <ScrollReveal>
          <SectionHeading
            label="Our stack"
            heading="Technologies We Master"
            subheading="Modern, battle-tested tools chosen for performance, scalability, and developer experience."
            align="center"
            className="mb-12"
          />
        </ScrollReveal>

        {/* ── Tech chips grid ── */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => {
              const colours = CATEGORY_COLOURS[tech.category] ?? CATEGORY_COLOURS.Deployment
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-md"
                  style={{
                    background:   colours.bg,
                    border:       `1px solid ${colours.border}`,
                    animation:    `fadeUp 600ms cubic-bezier(0.16,1,0.3,1) ${i * 40}ms both`,
                  }}
                >
                  <span
                    className="font-mono font-medium text-sm"
                    style={{ color: colours.text }}
                  >
                    {tech.name}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase opacity-60"
                    style={{ color: colours.text }}
                  >
                    {tech.category}
                  </span>
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        {/* ── Supporting line ── */}
        <ScrollReveal className="mt-10 text-center">
          <p
            className="font-body text-sm"
            style={{ color: 'var(--text-4)' }}
          >
            We select the right tool for each problem — not the most fashionable one.
          </p>
        </ScrollReveal>

      </div>
    </section>
  )
}