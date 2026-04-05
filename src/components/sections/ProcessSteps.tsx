import Link          from 'next/link'
import ScrollReveal  from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { PROCESS_STEPS } from '@/data'

/*
  ProcessSteps — 4-step engagement process section.

  Design decisions:
  - Alternating bg-2 creates visual contrast from WhyElvatrixa (bg-1)
  - Horizontal step flow on desktop, vertical on mobile
  - Gold circle with step number as the visual connector node
  - Horizontal connector line between steps (desktop only)
  - Duration and deliverable shown in muted DM Mono below the step
  - Section reduces buyer risk by making the process transparent
*/
export default function ProcessSteps() {
  return (
    <section className="section-pad" style={{ background: 'var(--bg-page)' }}>
      <div className="section-container">

        {/* ── Heading ── */}
        <ScrollReveal>
          <SectionHeading
            label="How we work"
            heading="Clear Process. No Surprises."
            subheading="Every Elvatrixa engagement follows a structured four-step process designed to eliminate ambiguity and ensure on-time delivery."
            align="center"
            className="mb-16"
          />
        </ScrollReveal>

        {/* ── Steps ── */}
        <div className="relative">

          {/* ── Connector line (desktop only) ── */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[30px] left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--gold-border) 10%, var(--gold-border) 90%, transparent 100%)',
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal
                key={step.step}
                delay={`reveal-delay-${i + 1}` as `reveal-delay-${number}`}
              >
                <div className="flex flex-col items-center text-center">

                  {/* ── Step number circle ── */}
                  <div
                    className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full mb-6 flex-shrink-0 z-10"
                    style={{
                      background: 'var(--bg-3)',
                      border:     '1px solid var(--gold-border)',
                    }}
                  >
                    {/* Inner ring */}
                    <div
                      className="absolute inset-[6px] rounded-full"
                      style={{ background: 'var(--gold-glow)' }}
                    />
                    {/* Number */}
                    <span
                      className="relative font-display font-bold text-xl leading-none"
                      style={{ color: 'var(--gold)' }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* ── Step title ── */}
                  <h3
                    className="font-body font-bold text-base mb-3 leading-snug"
                    style={{ color: 'var(--text-1)' }}
                  >
                    {step.title}
                  </h3>

                  {/* ── Body ── */}
                  <p
                    className="font-body text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {step.body}
                  </p>

                  {/* ── Duration + deliverable ── */}
                  <div className="flex flex-col gap-1 mt-auto">
                    {step.duration && (
                      <span
                        className="font-mono text-[10px] tracking-wider uppercase"
                        style={{ color: 'var(--teal)' }}
                      >
                        {step.duration}
                      </span>
                    )}
                    {step.deliverable && (
                      <span
                        className="font-mono text-[10px] tracking-wider uppercase"
                        style={{ color: 'var(--text-4)' }}
                      >
                        {step.deliverable}
                      </span>
                    )}
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <ScrollReveal className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p
            className="font-body text-sm"
            style={{ color: 'var(--text-3)' }}
          >
            Ready to start Step 01?
          </p>
          <Link href="/contact" className="btn-primary">
            Book Your Discovery Call
          </Link>
        </ScrollReveal>

      </div>
    </section>
  )
}