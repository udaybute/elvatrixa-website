import Link         from 'next/link'
import Image        from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
// FIXED — use @/ alias + correct file
import { CASE_STUDIES } from '@/data/caseStudies';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4" />
  </svg>
)

/*
  FeaturedWork — 3 case study cards in a horizontal layout.

  Design decisions:
  - Full-bleed image with dark gradient overlay (image-overlay)
  - Service badge top-left over the image
  - Results metrics revealed at the bottom of the image
  - Client name and industry below the image
  - Tech stack badges
  - The card itself is a link — entire surface is clickable
  - On hover: image scales 1.05× (CSS transform on inner div)
    and the overlay darkens slightly for contrast
*/
export default function FeaturedWork() {
  return (
    <section
      className="section-pad"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="section-container">

        {/* ── Heading ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <ScrollReveal>
            <SectionHeading
              label="Featured work"
              heading="Results That Speak"
              subheading="A selection of projects delivered for clients in the US and UK."
            />
          </ScrollReveal>
          <ScrollReveal delay="reveal-delay-2">
            <Link
              href="/work"
              className="btn-ghost flex-shrink-0"
            >
              View all case studies
              <ArrowRight />
            </Link>
          </ScrollReveal>
        </div>

        {/* ── Case study cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, i) => (
            <ScrollReveal
              key={study.slug}
              delay={`reveal-delay-${i + 1}` as `reveal-delay-${number}`}
              variant="scale"
            >
              <Link
                href={`/work/${study.slug}`}
                className="group block rounded-xl overflow-hidden h-full"
                style={{
                  background: 'var(--bg-3)',
                  border:     '1px solid var(--border-subtle)',
                  transition: 'border-color 260ms ease, box-shadow 260ms ease',
                }}
                aria-label={`View case study: ${study.title}`}
              >

                {/* ── Image area ── */}
                <div className="relative h-52 overflow-hidden">

                  {/* Background image */}
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  >
                    <Image
                      src={study.imageUrl}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>

                  {/* Dark overlay — darkens on hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(6,8,16,0.95) 0%, rgba(6,8,16,0.55) 50%, rgba(6,8,16,0.2) 100%)',
                    }}
                  />

                  {/* ── Service badge top-left ── */}
                  <div className="absolute top-4 left-4">
                    <span className="badge">{study.service}</span>
                  </div>

                  {/* ── Industry badge top-right ── */}
                  <div className="absolute top-4 right-4">
                    <span className="badge-mono badge">{study.industry}</span>
                  </div>

                  {/* ── Results metrics at bottom of image ── */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex gap-4">
                      {study.results.slice(0, 2).map((result) => (
                        <div key={result.label} className="flex flex-col">
                          <span
                            className="font-display font-bold"
                            style={{ fontSize: '22px', color: 'var(--gold)', lineHeight: 1 }}
                          >
                            {result.value}
                          </span>
                          <span
                            className="font-body text-[10px] leading-tight mt-0.5"
                            style={{ color: 'var(--text-3)' }}
                          >
                            {result.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Content below image ── */}
                <div className="p-5 flex flex-col gap-3">

                  {/* Title */}
                  <h3
                    className="font-body font-bold text-base leading-snug group-hover:text-gold-gradient transition-colors duration-200"
                    style={{ color: 'var(--text-1)' }}
                  >
                    {study.title}
                  </h3>

                  {/* Client */}
                  <p
                    className="font-mono text-[11px] tracking-wide"
                    style={{ color: 'var(--text-4)', letterSpacing: '0.06em' }}
                  >
                    {study.client}
                  </p>

                  {/* Description */}
                  <p
                    className="font-body text-sm leading-relaxed line-clamp-3"
                    style={{ color: 'var(--text-3)' }}
                  >
                    {study.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="w-full h-px"
                    style={{ background: 'var(--border-subtle)' }}
                  />

                  {/* Tech tags + CTA row */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {study.tech.slice(0, 3).map((t) => (
                        <span key={t} className="badge-mono badge">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span
                      className="flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-200 flex-shrink-0 ml-2"
                      style={{ color: 'var(--gold)' }}
                    >
                      View
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight />
                      </span>
                    </span>
                  </div>

                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}