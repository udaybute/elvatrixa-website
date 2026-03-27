/* ================================================================
   ELVATRIXA — TESTIMONIALS DATA
   File: src/data/testimonials.ts

   Client testimonials displayed on:
   - Homepage Testimonials section
   - /about page
   - Service sub-pages (filtered by relevance)

   Guidelines for real testimonials (replace placeholders):
   - Quote must be outcome-specific — numbers beat adjectives
   - Always include role, company, and country
   - US/UK buyers need to see peers, not generic praise
   - 3–5 sentences is the ideal length
================================================================ */

import type { Testimonial } from '@/types'


export const testimonials: Testimonial[] = [

  /* ── 1 ─────────────────────────────────────────────────────── */
  {
    id:      1,
    name:    'James Whitfield',
    role:    'Co-Founder & CEO',
    company: 'Meridian Health Tech',
    country: 'United Kingdom',
    quote:
      'Elvatrixa took our messy Figma prototype and turned it into a ' +
      'production SaaS product in under eight weeks. The codebase is clean, ' +
      'the architecture actually scales, and we launched to paying customers ' +
      'without a single critical bug. Honestly the most professional dev ' +
      'partner we have worked with.',
    rating:   5,
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
  },

  /* ── 2 ─────────────────────────────────────────────────────── */
  {
    id:      2,
    name:    'Sarah Okonkwo',
    role:    'Head of Operations',
    company: 'Vantage Logistics',
    country: 'United States',
    quote:
      'We were spending 40 hours a week manually pulling data from three ' +
      'different systems into Excel. Elvatrixa built an AI automation ' +
      'pipeline that now does it in under 10 minutes, completely unattended. ' +
      'The ROI was clear within the first month — we reallocated two full ' +
      'headcounts to higher-value work.',
    rating:   5,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  },

  /* ── 3 ─────────────────────────────────────────────────────── */
  {
    id:      3,
    name:    'Marcus Thornton',
    role:    'E-Commerce Director',
    company: 'Alden & Roe',
    country: 'United Kingdom',
    quote:
      'Our Shopify store conversion rate went from 1.8% to 3.4% after ' +
      'Elvatrixa rebuilt the checkout flow and product pages. That is nearly ' +
      'double the revenue from the same traffic. They did not just make it ' +
      'look better — they actually understood the buyer psychology and ' +
      'engineered it around that.',
    rating:   5,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },

  /* ── 4 ─────────────────────────────────────────────────────── */
  {
    id:      4,
    name:    'Priya Nair',
    role:    'CTO',
    company: 'Stackform AI',
    country: 'United States',
    quote:
      'I was sceptical about outsourcing any part of our core product, but ' +
      'Elvatrixa proved me wrong immediately. They asked the right questions, ' +
      'pushed back on two decisions that would have caused us technical debt, ' +
      'and delivered code I would be happy to put in front of any senior ' +
      'engineer. I have already referred two other founders to them.',
    rating:   5,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  },

  /* ── 5 ─────────────────────────────────────────────────────── */
  {
    id:      5,
    name:    'Tom Ellery',
    role:    'Managing Director',
    company: 'Ellery Digital',
    country: 'United Kingdom',
    quote:
      'We brought Elvatrixa in as a white-label development partner for two ' +
      'of our agency clients. They were on time, communicated clearly, and ' +
      'the work was good enough that one client specifically asked to keep ' +
      'working with the same team. That is exactly what you want from a ' +
      'sub-contractor.',
    rating:   5,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },

  /* ── 6 ─────────────────────────────────────────────────────── */
  {
    id:      6,
    name:    'Rachel Huang',
    role:    'VP of Product',
    company: 'Clearpath Analytics',
    country: 'United States',
    quote:
      'Our reporting dashboard went from a once-a-week manual email to a ' +
      'live interface that our entire leadership team checks every morning. ' +
      'Elvatrixa designed and built the whole thing in four weeks — data ' +
      'modelling, backend pipelines, and the frontend. Zero errors in three ' +
      'months of production use.',
    rating:   5,
    imageUrl: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=80&h=80&fit=crop&crop=face',
  },
]


/* ── HELPERS ─────────────────────────────────────────────────── */

/**
 * Returns the 3 featured testimonials for the homepage section.
 * Swap out IDs to control which three appear above the fold.
 */
export const featuredTestimonials: Testimonial[] = testimonials.filter(
  t => [1, 3, 4].includes(t.id),
)

/**
 * Filter testimonials by country for geo-targeted pages.
 * e.g. getTestimonialsByCountry('United Kingdom')
 */
export function getTestimonialsByCountry(country: string): Testimonial[] {
  return testimonials.filter(t => t.country === country)
}