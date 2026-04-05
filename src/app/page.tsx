/* ================================================================
   ELVATRIXA — HOMEPAGE
   File: src/app/page.tsx

   Assembles all 9 homepage sections in the correct narrative order.
   Each section is a Server Component (no 'use client') except
   Hero and StatsBar which contain AnimatedCounter ('use client').

   Section order (from the master plan):
   1. Hero          — hook, headline, stats strip
   2. StatsBar      — animated counters: projects, clients, countries
   3. ServicesGrid  — 8 service cards
   4. FeaturedWork  — 3 case study cards
   5. WhyElvatrixa  — 6 differentiator cards
   6. ProcessSteps  — 4-step engagement process
   7. Testimonials  — 3 client quotes
   8. TechStack     — technology name chips
   9. CTASection    — full-width closing CTA
================================================================ */

import type { Metadata } from 'next'
import { buildPageMetadata, organizationSchema } from '@/lib/seo'

import { ElvatrixaHero } from '@/components/ui/hero-section-nexus'
import StatsBar      from '@/components/sections/StatsBar'
import ServicesGrid  from '@/components/sections/ServicesGrid'
import FeaturedWork  from '@/components/sections/FeaturedWork'
import IdealClient   from '@/components/sections/IdealClient'
import PricingTeaser from '@/components/sections/PricingTeaser'
import WhyElvatrixa  from '@/components/sections/WhyElvatrixa'
import ProcessSteps  from '@/components/sections/ProcessSteps'
import Testimonials  from '@/components/sections/Testimonials'
import TechStack     from '@/components/sections/TechStack'
import CTASection    from '@/components/sections/CTASection'


/* ── Page SEO metadata ── */
export const metadata: Metadata = buildPageMetadata({
  title:       'Elvatrixa — Digital Innovation Studio',
  description:
    'Elvatrixa builds world-class SaaS platforms, AI automation systems, and ' +
    'high-converting digital products for businesses in the US, UK, and globally.',
  canonical:   '/',
  keywords: [
    'SaaS development company UK',
    'AI automation agency',
    'web development agency UK',
    'Shopify development agency',
    'digital innovation studio',
  ],
})


/* ── Homepage component ── */
export default function HomePage() {
  return (
    <>
      {/* Page-level JSON-LD: WebSite schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'WebSite',
            name:       'Elvatrixa',
            url:        'https://elvatrixa.com',
            potentialAction: {
              '@type':       'SearchAction',
              target:        'https://elvatrixa.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* 1 ── Hero */}
      <ElvatrixaHero />

    

      {/* 3 ── Services Grid */}
      <ServicesGrid />

      {/* 4 ── Featured Work */}
      <FeaturedWork />

      {/* 5 ── Who We Work With (Ideal Client) */}
      <IdealClient />

      {/* 6 ── Pricing Teaser */}
      <PricingTeaser />

      {/* 7 ── Why Elvatrixa */}
      <WhyElvatrixa />

      {/* 6 ── Process Steps */}
      <ProcessSteps />

      {/* 7 ── Testimonials */}
      <Testimonials />

      {/* 8 ── Tech Stack */}
      <TechStack />

      {/* 9 ── CTA Section */}
      <CTASection />
    </>
  )
}