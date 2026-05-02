/* ================================================================
   ELVATRIXA — SERVICES GRID + CLIENT PORTFOLIO
   File: src/components/sections/ServicesGrid.tsx

   Pure Server Component — zero event handlers, zero 'use client'.
   Hover effects: Tailwind group-hover only.
================================================================ */

import Image          from 'next/image'
import Link           from 'next/link'
import ScrollReveal   from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { services }   from '@/data/services'
import type { JSX }   from 'react'


/* ── Placeholder images — replace with final assets ─────────── */
const SERVICE_IMAGES: Record<string, string> = {
  Settings2:
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=75',
  Bot:
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=75',
  ShoppingBag:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=75',
  BarChart3:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75',
  Layers:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=75',
  Megaphone:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75',
  Zap:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=75',
  Shield:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75',
}

/* ── Client Portfolio Projects ───────────────────────────────── */
const CLIENT_PROJECTS = [
  {
    title:       'Modern Hospital Website',
    industry:    'Healthcare',
    description: 'A high-converting hospital website designed to drive patient appointments and build institutional trust — fast, accessible, and SEO-optimised.',
    highlight:   'Lead Generating Website',
    image:       'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
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


/* ── SVG icons ────────────────────────────────────────────────── */
const ICONS: Record<string, () => JSX.Element> = {
  Settings2: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Bot: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/>
      <rect width="16" height="12" x="4" y="8" rx="2"/>
      <path d="M2 14h2M20 14h2M9 18v2M15 18v2M9 12h.01M15 12h.01"/>
    </svg>
  ),
  ShoppingBag: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  BarChart3: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  ),
  Layers: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  Zap: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
}

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5h9M8 3.5l3 3-3 3"/>
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


/* ── Section ──────────────────────────────────────────────────── */

export default function ServicesGrid() {
  return (
    <>
      {/* ── SERVICES GRID ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--bg-page)' }}>
        <div className="section-container">

          {/* Heading */}
          <ScrollReveal>
            <SectionHeading
              label="What we build"
              heading="End-to-End Digital Solutions"
              subheading="From concept to scale — we deliver technology that drives measurable business outcomes for clients in the US, UK, and beyond."
              className="mb-14"
            />
          </ScrollReveal>

          {/* Grid — 1 col → 2 col → 4 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => {
              const Icon  = ICONS[service.icon]
              const image = SERVICE_IMAGES[service.icon]
              const delay = (
                ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'] as const
              )[Math.min((i % 4) + 1, 4)]

              return (
                <ScrollReveal key={service.slug} delay={delay} variant="scale">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <article className="relative h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">

                      {/* Image header */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
                        <Image
                          src={image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                        <span
                          className="absolute bottom-3 right-3 font-mono text-[9px] tracking-widest uppercase rounded-full px-2.5 py-1 backdrop-blur-sm"
                          style={{
                            background: 'rgba(6,13,26,0.78)',
                            border:     '1px solid rgba(201,168,76,0.4)',
                            color:      '#C9A84C',
                          }}
                        >
                          {service.startingFrom}
                        </span>
                        <span
                          className="absolute bottom-3 left-3 font-mono text-[9px] tracking-widest uppercase"
                          style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                          {service.tags[0]}
                        </span>
                      </div>

                      {/* Gold slide-in divider on hover */}
                      <div
                        className="h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                        style={{ background: 'var(--gold)' }}
                      />

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 w-9 h-9 mt-0.5 rounded-lg flex items-center justify-center transition-all duration-300 bg-gold-dim border border-gold-border text-gold group-hover:bg-gold group-hover:text-navy">
                            {Icon && <Icon />}
                          </div>
                          <div className="min-w-0">
                            <h3
                              className="font-body font-bold text-[14.5px] leading-snug"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {service.title}
                            </h3>
                            <p
                              className="font-mono text-[9.5px] tracking-[0.07em] mt-0.5 uppercase"
                              style={{ color: 'var(--gold)' }}
                            >
                              {service.tagline}
                            </p>
                          </div>
                        </div>

                        <p className="font-body text-[13px] leading-relaxed mb-4 flex-1 line-clamp-3" style={{ color: '#6B7280' }}>
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {service.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="font-mono text-[9.5px] tracking-wide rounded-full px-2.5 py-0.5"
                              style={{
                                background: 'rgba(10,22,40,0.05)',
                                color:      'rgba(10,22,40,0.55)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3.5 border-t border-gray-100">
                          <span
                            className="flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5"
                            style={{ color: 'var(--gold)' }}
                          >
                            Explore Service
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                              <ArrowRight />
                            </span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal className="mt-14 text-center">
            <p className="font-body text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Not sure which service fits your project?
            </p>
            <Link href="/contact" className="btn-secondary">
              Book a free discovery call
            </Link>
          </ScrollReveal>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          CLIENT PORTFOLIO — Real Projects. Real Results.
      ══════════════════════════════════════════════════════════ */}
      <section
        className="section-pad relative overflow-hidden"
        style={{ background: 'var(--bg-0)' }}
      >
        {/* Subtle background texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.10) 1px, transparent 1px)',
            backgroundSize:  '40px 40px',
          }}
        />
        {/* Gold top-edge glow */}
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
              Real Projects.<br />Real Results.
            </h2>
            <p
              className="font-body leading-relaxed max-w-xl mb-14"
              style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'var(--text-3)' }}
            >
              We design high-converting websites that help businesses attract customers and grow faster. Every project below is live, proven, and built to generate leads.
            </p>
          </ScrollReveal>

          {/* Projects — first card full-width hero, rest 3-col */}
          <div className="flex flex-col gap-5">

            {/* ── Hero card (first project) ── */}
            <ScrollReveal>
              <a
                href={CLIENT_PROJECTS[0].demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={`View live demo of ${CLIENT_PROJECTS[0].title}`}
              >
                <article
                  className="relative overflow-hidden rounded-2xl border transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl"
                  style={{
                    borderColor: 'rgba(201,168,76,0.2)',
                    background:  'var(--bg-3)',
                    minHeight:   '360px',
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
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(6,13,26,0.93) 42%, rgba(6,13,26,0.45) 100%)' }} />
                  </div>

                  {/* Gold border slide-in on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: 'var(--gold)' }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div className="max-w-lg">
                      {/* Highlight badge */}
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

                    {/* CTA */}
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

            {/* ── Remaining 4 projects — 2-col on md, 4-col on xl ── */}
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
                            className="object-cover transition-transform duration-600 group-hover:scale-107"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                          {/* Industry tag */}
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
                          {/* Highlight badge */}
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
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {project.title}
                          </h3>
                          <p
                            className="font-body text-[12.5px] leading-relaxed mb-4 flex-1 line-clamp-3"
                            style={{ color: 'var(--text-3, #6B7280)' }}
                          >
                            {project.description}
                          </p>

                          {/* CTA */}
                          <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
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
          </div>


          {/* ── Conversion CTA block ───────────────────────────── */}
          <ScrollReveal className="mt-20">
            <div
              className="relative overflow-hidden rounded-2xl p-10 md:p-14 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.10) 0%, rgba(6,13,26,0.95) 60%)',
                border:     '1px solid rgba(201,168,76,0.25)',
              }}
            >
              {/* Decorative glow */}
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
                    {/* WhatsApp icon */}
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
    </>
  )
}