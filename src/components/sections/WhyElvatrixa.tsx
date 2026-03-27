/* ================================================================
   ELVATRIXA — WHY ELVATRIXA SECTION
   File: src/components/sections/WhyElvatrixa.tsx

   Pure Server Component — zero event handlers, zero 'use client'.

   Hover effect: left border goes from transparent → gold using a
   pseudo-element technique via Tailwind's group-hover — no JS.
   Card background darkens via group-hover:bg-navy-4.

   Bugs fixed vs original:
   - Removed onMouseEnter / onMouseLeave (not allowed in Server Components)
   - Changed item.number  → correct (was missing in old data)
   - Changed item.body    → correct (old data used `description`)
   - Fixed import path    → @/data/why-items (was @/data/why-items, now correct)
================================================================ */

import ScrollReveal   from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { WHY_ITEMS }  from '@/data/why-items'

const DELAYS = [
  'reveal-delay-1',
  'reveal-delay-2',
  'reveal-delay-3',
  'reveal-delay-1',
  'reveal-delay-2',
  'reveal-delay-3',
] as const

export default function WhyElvatrixa() {
  return (
    <section className="section-pad bg-navy">
      <div className="section-container">

        {/* ── Heading ── */}
        <ScrollReveal>
          <SectionHeading
            label="Why choose us"
            heading="Built Different."
            subheading="What separates Elvatrixa from the thousands of agencies in this space is not just technical skill — it is perspective."
            align="center"
            className="mb-16"
          />
        </ScrollReveal>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map((item, i) => (
            <ScrollReveal key={item.number} delay={DELAYS[i]}>

              {/*
                Hover technique — pure CSS:
                - `group` on the outer div
                - Left border is always present but transparent by default
                - `group-hover:border-l-gold` makes it visible on hover
                - `group-hover:bg-navy-4` darkens card background
                - The 4px left border is achieved with border-l-[3px]
              */}
              <div className={[
                'group relative p-7 rounded-lg h-full',
                /* Background */
                'bg-navy-3',
                /* All borders subtle by default */
                'border border-border-subtle',
                /* Left border override — thicker, transitions to gold */
                'border-l-[3px] border-l-transparent',
                /* Hover states — pure CSS */
                'hover:border-l-gold',
                'hover:bg-navy-4',
                /* Transition */
                'transition-[border-color,background-color] duration-normal ease-luxury',
              ].join(' ')}>

                {/* ── Number ── */}
                <div
                  className="font-display font-bold mb-5 leading-none select-none"
                  style={{ fontSize: '48px', color: 'var(--gold)', opacity: 0.35 }}
                  aria-hidden="true"
                >
                  {item.number}
                </div>

                {/* ── Title ── */}
                <h3 className="font-body font-bold text-base text-text-1 mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* ── Body ── */}
                <p className="font-body text-sm text-text-3 leading-relaxed">
                  {item.body}
                </p>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}