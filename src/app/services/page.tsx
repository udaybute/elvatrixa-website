/* ================================================================
   ELVATRIXA — SERVICES HUB PAGE
   File: src/app/services/page.tsx

   Pure Server Component — zero event handlers.
================================================================ */

import type { Metadata }     from 'next'
import Image                 from 'next/image'
import Link                  from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { services }          from '@/data/services'
import ScrollReveal          from '@/components/ui/ScrollReveal'
import SectionHeading        from '@/components/ui/SectionHeading'
import type { JSX }          from 'react'

export const metadata: Metadata = buildPageMetadata({
  title:       'Services',
  description:
    'Elvatrixa offers end-to-end digital services — SaaS development, AI automation, ' +
    'e-commerce, data analytics, UI/UX design, digital marketing, and more for US and UK businesses.',
  canonical:   '/services',
  keywords: [
    'SaaS development agency UK',
    'AI automation services',
    'e-commerce development UK',
    'digital services agency',
  ],
})


/* ── CLIENT PORTFOLIO DATA ───────────────────────────────────── */

const CLIENT_PROJECTS = [
  {
    title:       'Modern Hospital Website',
    industry:    'Healthcare',
    description: 'A high-converting hospital website designed to drive patient appointments and build institutional trust — fast, accessible, and SEO-optimised.',
    highlight:   'Lead Generating Website',
    image:       'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    demo:        'https://modern-hospital-demo-website.vercel.app/',
    tag:         'Healthcare',
  },
  {
    title:       'Ethereal Wellness Clinic',
    industry:    'Wellness & Aesthetics',
    description: 'A luxury clinic experience that turns browsers into booked consultations — premium design matched with frictionless CTAs.',
    highlight:   'Premium Modern UI',
    image:       'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    demo:        'https://ethereal-clinic.vercel.app/',
    tag:         'Clinic',
  },
  {
    title:       'Dental Clinic Pro',
    industry:    'Dental',
    description: 'Clean, trustworthy dental practice website engineered to increase new patient enquiries with clear service breakdowns and appointment flows.',
    highlight:   'Conversion Optimised',
    image:       'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80',
    demo:        'https://dental-clinic-pi-six.vercel.app/',
    tag:         'Dental',
  },
  {
    title:       'Green Solution',
    industry:    'Sustainability',
    description: 'Bold brand presence for an eco-solutions company — showcasing services, driving enquiries, and communicating environmental credibility at a glance.',
    highlight:   'Brand-Forward Design',
    image:       'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    demo:        'https://greensolution-demo-website.vercel.app/',
    tag:         'Sustainability',
  },
  {
    title:       'Manufacturing Industry Website',
    industry:    'Manufacturing',
    description: 'Industrial-grade web presence built to attract B2B clients — capability showcases, RFQ flows, and credibility signals that close deals.',
    highlight:   'B2B Lead Engine',
    image:       'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    demo:        'https://manufacturing-website-akvy.vercel.app/',
    tag:         'Manufacturing',
  },
]


/* ── INLINE ICON MAP ─────────────────────────────────────────── */

const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l4 4 6-6"/>
  </svg>
)

const ExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)


/* ── PAGE ────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <div style={{ background: 'var(--bg-1)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-0)' }}
      >
        {/* Gold radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.14) 0%, transparent 65%)',
          }}
        />
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.13) 1px, transparent 1px)',
            backgroundSize:  '32px 32px',
          }}
        />

        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="block h-px w-8"
                style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
              />
              <span className="section-label">What we build</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-1">
            <h1
              className="font-display font-bold text-gold-gradient mb-6"
              style={{ fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: '0.95', letterSpacing: '-0.03em' }}
            >
              End-to-End<br />Digital Services
            </h1>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-2">
            <p
              className="font-body leading-relaxed max-w-2xl"
              style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-3)' }}
            >
              From concept to scale — every service Elvatrixa delivers is tied to a
              measurable business outcome. We are an end-to-end partner for US and UK
              businesses that demand results, not activity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon  = ICONS[service.icon]
              const delay = (['', 'reveal-delay-1', 'reveal-delay-2'] as const)[
                Math.min((i % 2) + 1, 2)
              ]

              return (
                <ScrollReveal key={service.slug} delay={delay}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <article
                      className={[
                        'relative h-full flex flex-col p-8 rounded-xl overflow-hidden',
                        'border border-[var(--border-subtle)] border-t-[3px] border-t-[color:var(--gold-border)]',
                        'transition-[transform,border-color,box-shadow] duration-300 ease-luxury',
                        'group-hover:-translate-y-1',
                        'group-hover:border-t-[color:var(--gold)]',
                        'group-hover:shadow-card-hover',
                      ].join(' ')}
                      style={{ background: 'var(--bg-3)' }}
                    >
                      {/* ── Icon + price row ── */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={[
                            'flex items-center justify-center w-12 h-12 rounded-lg',
                            'transition-all duration-300',
                            'group-hover:bg-gold group-hover:border-gold group-hover:text-navy-0',
                          ].join(' ')}
                          style={{
                            background: 'var(--gold-dim)',
                            border:     '1px solid var(--gold-border)',
                            color:      'var(--gold)',
                          }}
                        >
                          {Icon ? <Icon /> : null}
                        </div>

                        {service.startingFrom && (
                          <span
                            className="font-mono text-[11px] tracking-wider uppercase px-3 py-1.5 rounded"
                            style={{
                              background: 'var(--gold-dim)',
                              border:     '1px solid var(--gold-border)',
                              color:      'var(--gold)',
                            }}
                          >
                            {service.startingFrom}
                          </span>
                        )}
                      </div>

                      {/* ── Title + tagline ── */}
                      <h2
                        className="font-body font-bold text-xl mb-2 leading-snug"
                        style={{ color: 'var(--text-1)' }}
                      >
                        {service.title}
                      </h2>
                      <p
                        className="font-mono text-[11px] tracking-wider uppercase mb-4"
                        style={{ color: 'var(--gold)' }}
                      >
                        {service.tagline}
                      </p>

                      {/* ── Description ── */}
                      <p
                        className="font-body text-sm leading-relaxed mb-6"
                        style={{ color: 'var(--text-3)' }}
                      >
                        {service.description}
                      </p>

                      {/* ── Features ── */}
                      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--teal)' }}>
                              <CheckIcon />
                            </span>
                            <span className="font-body text-sm" style={{ color: 'var(--text-2)' }}>
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* ── Tech tags ── */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.tags.map((t) => (
                          <span key={t} className="badge">{t}</span>
                        ))}
                      </div>

                      {/* ── Divider ── */}
                      <div className="w-full h-px mb-5" style={{ background: 'var(--border-subtle)' }} />

                      {/* ── CTA ── */}
                      <div
                        className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-3"
                        style={{ color: 'var(--gold)' }}
                      >
                        Learn More
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          <ArrowRight />
                        </span>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          CLIENT PORTFOLIO — Our Work That Generates Leads
      ══════════════════════════════════════════════════════════ */}
      <section
        className="section-pad relative overflow-hidden"
        style={{ background: 'var(--bg-0)' }}
      >
        {/* Background dot texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.10) 1px, transparent 1px)',
            backgroundSize:  '40px 40px',
          }}
        />
        {/* Gold top border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
        />

        <div className="section-container relative z-10">

          {/* Section heading */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block h-px w-8"
                style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }}
              />
              <span className="section-label">Portfolio</span>
            </div>
            <h2
              className="font-display font-bold text-gold-gradient mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: '1', letterSpacing: '-0.025em' }}
            >
              Our Work That<br />Generates Leads.
            </h2>
            <p
              className="font-body leading-relaxed max-w-xl mb-14"
              style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--text-3)' }}
            >
              We design high-converting websites that help businesses attract customers and grow faster. Every project below is live, proven, and built to deliver results.
            </p>
          </ScrollReveal>

          {/* ── Hero project card ── */}
          <ScrollReveal>
            <a
              href={CLIENT_PROJECTS[0].demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group block mb-5"
              aria-label={`View live demo of ${CLIENT_PROJECTS[0].title}`}
            >
              <article
                className="relative overflow-hidden rounded-2xl border transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
                style={{
                  borderColor: 'rgba(201,168,76,0.2)',
                  background:  'var(--bg-3)',
                  minHeight:   '380px',
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={CLIENT_PROJECTS[0].image}
                    alt={CLIENT_PROJECTS[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(105deg, rgba(6,13,26,0.93) 42%, rgba(6,13,26,0.45) 100%)' }}
                  />
                </div>

                {/* Gold bottom-line reveal */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: 'var(--gold)' }}
                />

                {/* Content */}
                <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                  <div className="max-w-lg">
                    <span
                      className="inline-block font-mono text-[9px] tracking-widest uppercase rounded-full px-3 py-1 mb-5"
                      style={{
                        background: 'rgba(201,168,76,0.12)',
                        border:     '1px solid rgba(201,168,76,0.35)',
                        color:      '#C9A84C',
                      }}
                    >
                      ✦ {CLIENT_PROJECTS[0].highlight}
                    </span>
                    <p
                      className="font-mono text-[11px] tracking-widest uppercase mb-2"
                      style={{ color: 'rgba(201,168,76,0.6)' }}
                    >
                      {CLIENT_PROJECTS[0].industry}
                    </p>
                    <h3
                      className="font-display font-bold mb-4 leading-tight"
                      style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', color: '#FFFFFF' }}
                    >
                      {CLIENT_PROJECTS[0].title}
                    </h3>
                    <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {CLIENT_PROJECTS[0].description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <span
                      className="inline-flex items-center gap-2.5 font-body text-sm font-bold uppercase tracking-wider px-7 py-4 rounded-lg transition-all duration-300 group-hover:gap-4"
                      style={{
                        background: 'var(--gold)',
                        color:      'var(--bg-0)',
                      }}
                    >
                      View Live Demo
                      <ExternalLink />
                    </span>
                  </div>
                </div>
              </article>
            </a>
          </ScrollReveal>

          {/* ── Remaining 4 projects — responsive grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {CLIENT_PROJECTS.slice(1).map((project, i) => {
              const delay = (
                ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'] as const
              )[Math.min(i + 1, 3)]

              return (
                <ScrollReveal key={project.demo} delay={delay} variant="scale">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <article
                      className="relative h-full flex flex-col overflow-hidden rounded-xl border transition-all duration-400 group-hover:-translate-y-1.5 group-hover:shadow-2xl"
                      style={{
                        borderColor: 'rgba(201,168,76,0.12)',
                        background:  'var(--bg-3)',
                        minHeight:   '340px',
                      }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <span
                          className="absolute top-3 left-3 font-mono text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1"
                          style={{
                            background: 'rgba(6,13,26,0.75)',
                            border:     '1px solid rgba(201,168,76,0.3)',
                            color:      '#C9A84C',
                          }}
                        >
                          {project.tag}
                        </span>
                      </div>

                      {/* Gold bottom-line reveal */}
                      <div
                        className="h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                        style={{ background: 'var(--gold)' }}
                      />

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <span
                          className="inline-block self-start font-mono text-[8.5px] tracking-widest uppercase rounded-full px-2.5 py-0.5 mb-3"
                          style={{
                            background: 'rgba(201,168,76,0.1)',
                            border:     '1px solid rgba(201,168,76,0.25)',
                            color:      'var(--gold)',
                          }}
                        >
                          ✦ {project.highlight}
                        </span>

                        <h3
                          className="font-body font-bold text-[15px] leading-snug mb-2"
                          style={{ color: 'var(--text-1)' }}
                        >
                          {project.title}
                        </h3>
                        <p
                          className="font-body text-[12.5px] leading-relaxed mb-4 flex-1 line-clamp-3"
                          style={{ color: 'var(--text-3)' }}
                        >
                          {project.description}
                        </p>

                        <div
                          className="flex items-center gap-2 pt-3 border-t"
                          style={{ borderColor: 'rgba(201,168,76,0.12)' }}
                        >
                          <span
                            className="flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
                            style={{ color: 'var(--gold)' }}
                          >
                            View Live Demo
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                              <ExternalLink />
                            </span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </a>
                </ScrollReveal>
              )
            })}
          </div>


          {/* ── Portfolio CTA block ─────────────────────────────── */}
          <ScrollReveal className="mt-20">
            <div
              className="relative overflow-hidden rounded-2xl p-10 md:p-14 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.10) 0%, rgba(6,13,26,0.95) 60%)',
                border:     '1px solid rgba(201,168,76,0.25)',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 50% 110%, rgba(201,168,76,0.18) 0%, transparent 65%)',
                }}
              />

              <div className="relative z-10">
                <p
                  className="font-mono text-[11px] tracking-widest uppercase mb-4"
                  style={{ color: 'rgba(201,168,76,0.7)' }}
                >
                  👉 Ready to grow?
                </p>
                <h3
                  className="font-display font-bold mb-4"
                  style={{ fontSize: 'clamp(26px, 4vw, 46px)', color: '#FFFFFF', lineHeight: '1.05' }}
                >
                  Want a Website Like This?
                </h3>
                <p
                  className="font-body mb-8 max-w-md mx-auto"
                  style={{ fontSize: 'clamp(14px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.6)' }}
                >
                  Let&apos;s build a high-converting website for your business — designed to attract customers and generate leads from day one.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    style={{
                      background: 'var(--gold)',
                      color:      'var(--bg-0)',
                    }}
                  >
                    Get Free Demo
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'transparent',
                      border:     '1px solid rgba(201,168,76,0.4)',
                      color:      'var(--gold)',
                    }}
                  >
                    Contact Us
                  </Link>
                  <a
                    href="https://wa.me/447700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(37,211,102,0.12)',
                      border:     '1px solid rgba(37,211,102,0.3)',
                      color:      '#25D366',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.847L.057 23.487a.75.75 0 0 0 .921.921l5.64-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.73 9.73 0 0 1-4.965-1.358l-.356-.21-3.694.968.984-3.594-.231-.371A9.716 9.716 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* ── BOTTOM CTA ── */}
      <section
        className="section-pad-sm"
        style={{
          background: 'var(--bg-2)',
          borderTop:  '1px solid var(--border-subtle)',
        }}
      >
        <div className="section-container text-center">
          <ScrollReveal>
            <p
              className="font-mono text-[11px] tracking-widest uppercase mb-4"
              style={{ color: 'var(--text-4)' }}
            >
              Not sure what you need?
            </p>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-1)' }}
            >
              Let&apos;s Define the Right Approach Together
            </h2>
            <p
              className="font-body text-sm mb-8 max-w-lg mx-auto"
              style={{ color: 'var(--text-3)' }}
            >
              Book a free 30-minute strategy call. We&apos;ll listen to your goals and
              recommend exactly what your project needs — no upselling.
            </p>
            <Link href="/contact" className="btn-primary">
              Book a Free Strategy Call
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}