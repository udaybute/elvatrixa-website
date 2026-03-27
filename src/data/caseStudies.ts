/* ================================================================
   ELVATRIXA — CASE STUDIES DATA
   File: src/data/caseStudies.ts

   Static case study data for:
   - /work  portfolio grid
   - /work/[slug]  detail pages
   - FeaturedWork section on homepage (first 3)

   Replace placeholder content with real client projects.
   Keep results specific — numbers build credibility.
================================================================ */

import type { CaseStudy } from '@/types'


export const CASE_STUDIES: CaseStudy[] = [

  /* ── 1. SaaS CRM Platform ─────────────────────────────────── */
  {
    slug:        'saas-crm-platform',
    title:       'Multi-Tenant SaaS CRM Platform',
    client:      'Confidential — UK FinTech',
    service:     'SaaS Development',
    industry:    'Financial Services',
    description:
      'A UK FinTech needed to replace a legacy CRM that was costing £4,000/month ' +
      'in licencing fees with a custom multi-tenant platform built around their ' +
      'exact sales workflow. We designed and shipped a full Next.js + PostgreSQL ' +
      'SaaS product with role-based access, pipeline management, and Stripe billing ' +
      'in nine weeks.',
    results: [
      { label: 'Monthly SaaS licence savings',  value: '£4,200'  },
      { label: 'Reduction in data entry time',  value: '68%'     },
      { label: 'Active users at launch',        value: '140+'    },
      { label: 'Weeks from brief to production',value: '9'       },
    ],
    tech:     ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Vercel'],
    imageUrl: '/images/p1.jpg',
    clientQuote:
      'Elvatrixa replaced a tool we had been paying £4k a month for, ' +
      'built exactly around how our team actually works.',
    clientName: 'Head of Sales Operations',
  },

  /* ── 2. AI Automation Pipeline ────────────────────────────── */
  {
    slug:        'ai-reporting-automation',
    title:       'AI-Powered Reporting Automation',
    client:      'Confidential — US Logistics Company',
    service:     'AI & Automation',
    industry:    'Logistics & Supply Chain',
    description:
      'A US logistics operator was spending 40+ hours per week manually ' +
      'aggregating data from three systems into Excel for weekly board reports. ' +
      'We built an AI automation pipeline using Python and OpenAI that pulls, ' +
      'reconciles, and formats the full report automatically — delivered to ' +
      'inboxes every Monday at 7am without human input.',
    results: [
      { label: 'Hours saved per week',         value: '38'   },
      { label: 'Report generation time',       value: '9min' },
      { label: 'Data accuracy improvement',    value: '99.4%'},
      { label: 'Payback period on investment', value: '6wk'  },
    ],
    tech:     ['Python', 'OpenAI', 'n8n', 'PostgreSQL', 'AWS Lambda'],
    imageUrl: '/images/p2.jpg',
    clientQuote:
      'Our Monday morning reports now arrive in inboxes before anyone is ' +
      'even at their desk. That used to take two people all of Friday.',
    clientName: 'VP of Operations',
  },

  /* ── 3. E-Commerce Conversion Rebuild ─────────────────────── */
  {
    slug:        'ecommerce-conversion-rebuild',
    title:       'E-Commerce Conversion Rate Rebuild',
    client:      'Alden & Roe — UK Fashion Brand',
    service:     'E-Commerce Development',
    industry:    'Retail / Fashion',
    description:
      'A UK fashion brand with strong organic traffic was converting at 1.8% — ' +
      'well below the 3–4% industry benchmark. We rebuilt the product pages, ' +
      'checkout flow, and mobile experience on Shopify, informed by Hotjar ' +
      'session recordings and A/B test data. The result was a near-doubling ' +
      'of conversion rate within 60 days of launch.',
    results: [
      { label: 'Conversion rate improvement',  value: '1.8% → 3.4%' },
      { label: 'Revenue uplift (same traffic)', value: '+89%'        },
      { label: 'Mobile checkout completion',   value: '+41%'        },
      { label: 'Average order value',          value: '+12%'        },
    ],
    tech:     ['Shopify', 'Liquid', 'Klaviyo', 'Hotjar', 'Google Analytics'],
    imageUrl: '/images/p3.jpg',
    clientQuote:
      'Same traffic, nearly double the revenue. The ROI on this project ' +
      'paid back in the first three weeks after launch.',
    clientName: 'E-Commerce Director',
  },

  /* ── 4. BI Dashboard ──────────────────────────────────────── */
  {
    slug:        'business-intelligence-dashboard',
    title:       'Real-Time BI Dashboard',
    client:      'Confidential — US SaaS Company',
    service:     'Data & Analytics',
    industry:    'Software / SaaS',
    description:
      'A US SaaS company with 50+ employees had no real-time visibility into ' +
      'revenue, churn, or activation metrics. Leadership were flying blind ' +
      'between monthly board packs. We designed and built a custom React ' +
      'dashboard pulling live data from Stripe, Intercom, and their PostgreSQL ' +
      'database — updating every 15 minutes.',
    results: [
      { label: 'Time to first insight after deploy', value: '< 1hr'  },
      { label: 'Manual reporting eliminated',        value: '100%'   },
      { label: 'Metrics now tracked in real-time',   value: '24'     },
      { label: 'Decision cycle improvement',         value: '4× faster' },
    ],
    tech:     ['React', 'PostgreSQL', 'dbt', 'Stripe API', 'Vercel'],
    imageUrl: '/images/p4.jpg',
  },

  /* ── 5. Performance Optimisation ─────────────────────────── */
  {
    slug:        'core-web-vitals-optimisation',
    title:       'Core Web Vitals Overhaul',
    client:      'Confidential — UK Professional Services',
    service:     'Performance',
    industry:    'Professional Services',
    description:
      'A UK professional services firm had a Lighthouse score of 41 and an LCP ' +
      'of 6.8 seconds — costing them ranking positions and leads. We conducted ' +
      'a full performance audit and implemented image optimisation, JavaScript ' +
      'code splitting, critical CSS inlining, and edge caching on Vercel. ' +
      'Lighthouse score went from 41 to 96 in two weeks.',
    results: [
      { label: 'Lighthouse score improvement', value: '41 → 96'   },
      { label: 'LCP improvement',              value: '6.8s → 1.4s' },
      { label: 'JS bundle size reduction',     value: '67%'       },
      { label: 'Organic traffic after 8 weeks',value: '+23%'      },
    ],
    tech:     ['Next.js', 'Vercel', 'Cloudflare', 'WebP', 'Lighthouse CI'],
    imageUrl: '/images/p5.jpg',
  },
]


/* ── HELPERS ─────────────────────────────────────────────────── */

/**
 * First 3 case studies — used in FeaturedWork homepage section.
 */
export const featuredCaseStudies: CaseStudy[] = CASE_STUDIES.slice(0, 3)

/**
 * Find a case study by slug.
 * Returns undefined if not found — page should call notFound().
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(c => c.slug === slug)
}

/**
 * All slugs for generateStaticParams in /work/[slug].
 */
export function getCaseStudySlugs(): { slug: string }[] {
  return CASE_STUDIES.map(c => ({ slug: c.slug }))
}