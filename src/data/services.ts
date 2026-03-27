/* ================================================================
   ELVATRIXA — SERVICES DATA
   File: src/data/services.ts

   Single source of truth for all 8 service offerings.
   Used by:
   - ServicesGrid section (homepage)
   - /services hub page
   - All 8 /services/[slug] sub-pages
   - Services mega menu in Navbar
   - SEO metadata generation for each service page

   Import pattern:
     import { services, getServiceBySlug } from '@/data/services'
================================================================ */

import type { Service, ServiceNavItem } from '@/types'


/* ── SERVICE DATA ────────────────────────────────────────────── */

export const services: Service[] = [

  /* ── 1. SaaS Development ──────────────────────────────────── */
  {
    slug:        'saas-development',
    icon:        'Settings2',
    title:       'SaaS Product Development',
    tagline:     'From concept to scalable platform — end to end.',
    description:
      'We architect and build production-grade SaaS platforms for founders and ' +
      'operators across the US and UK. From MVP to multi-tenant enterprise product, ' +
      'every system we ship is designed to scale from day one.',
    features: [
      'Full-stack MVP build in 6–10 weeks',
      'Multi-tenant architecture with role-based access',
      'Subscription billing via Stripe',
      'Admin dashboards and analytics',
      'API-first design for third-party integrations',
    ],
    tags:           ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    startingFrom:   'From $3,500',
    metaDescription:
      'Elvatrixa builds scalable SaaS platforms for US and UK founders. ' +
      'From MVP to enterprise product — we ship fast, clean, and production-ready.',
  },

  /* ── 2. AI & Automation ───────────────────────────────────── */
  {
    slug:        'ai-automation',
    icon:        'Bot',
    title:       'AI & Automation Systems',
    tagline:     'Eliminate manual work. Ship smarter workflows.',
    description:
      'We design and deploy AI-powered automation pipelines that eliminate repetitive ' +
      'manual processes, reduce operational cost, and unlock compounding efficiency gains ' +
      'for growing businesses in the UK and US.',
    features: [
      'Custom GPT-4o and Claude integrations',
      'Intelligent document processing and extraction',
      'Automated reporting and data pipelines',
      'CRM and ERP workflow automation',
      'RAG systems and internal knowledge bases',
    ],
    tags:           ['OpenAI', 'LangChain', 'Python', 'n8n', 'Zapier'],
    startingFrom:   'From $2,000',
    metaDescription:
      'Elvatrixa builds AI automation systems for UK and US businesses. ' +
      'Custom GPT integrations, document processing, and workflow automation that saves real hours.',
  },

  /* ── 3. E-Commerce ────────────────────────────────────────── */
  {
    slug:        'ecommerce',
    icon:        'ShoppingBag',
    title:       'E-Commerce Development',
    tagline:     'Revenue-optimised stores built to convert.',
    description:
      'We build and optimise e-commerce experiences that turn browsers into buyers. ' +
      'Whether you need a new Shopify store, a headless commerce migration, or a ' +
      'conversion rate overhaul, we engineer stores that perform.',
    features: [
      'Custom Shopify theme development',
      'Headless commerce with Next.js',
      'Checkout optimisation and A/B testing',
      'Product feed and marketplace integrations',
      'Post-purchase email flows via Klaviyo',
    ],
    tags:           ['Shopify', 'Next.js', 'Klaviyo', 'Stripe', 'Sanity'],
    startingFrom:   'From $1,800',
    metaDescription:
      'Elvatrixa builds high-converting Shopify and headless e-commerce stores for ' +
      'UK and US brands. Revenue-first development, not just pretty design.',
  },

  /* ── 4. Data & Analytics ──────────────────────────────────── */
  {
    slug:        'data-analytics',
    icon:        'BarChart3',
    title:       'Data & Analytics Dashboards',
    tagline:     'Turn raw data into decisions that move the needle.',
    description:
      'We design and build custom business intelligence dashboards and data pipelines ' +
      'that give leadership teams real-time visibility into the metrics that drive growth. ' +
      'Built for enterprise and scale-up teams across finance, operations, and marketing.',
    features: [
      'Custom BI dashboards (Metabase, custom React)',
      'ETL pipeline design and implementation',
      'SQL data modelling and warehousing',
      'Real-time KPI monitoring',
      'Automated weekly/monthly reporting',
    ],
    tags:           ['PostgreSQL', 'dbt', 'Metabase', 'Python', 'BigQuery'],
    startingFrom:   'From $2,500',
    metaDescription:
      'Elvatrixa builds business intelligence dashboards and data pipelines for UK and US businesses. ' +
      'Real-time KPIs, automated reporting, and ETL — built by senior data engineers.',
  },

  /* ── 5. UI/UX Design ──────────────────────────────────────── */
  {
    slug:        'ui-ux-design',
    icon:        'Layers',
    title:       'UI/UX Design',
    tagline:     'Interfaces that feel inevitable — and perform.',
    description:
      'We design product interfaces and marketing experiences that balance aesthetic ' +
      'precision with conversion performance. Every design decision is grounded in ' +
      'user behaviour data and aligned to your commercial goals.',
    features: [
      'Full product UX audit and redesign',
      'Figma design system and component library',
      'Responsive web and mobile app design',
      'User journey mapping and flow design',
      'Prototype testing and iterative refinement',
    ],
    tags:           ['Figma', 'Framer', 'Maze', 'Hotjar', 'Lottie'],
    startingFrom:   'From $1,500',
    metaDescription:
      'Elvatrixa\'s UI/UX design team creates high-converting product interfaces for ' +
      'SaaS, e-commerce, and marketing sites across the US and UK.',
  },

  /* ── 6. Digital Marketing ─────────────────────────────────── */
  {
    slug:        'digital-marketing',
    icon:        'Megaphone',
    title:       'Digital Marketing',
    tagline:     'Visibility, leads, revenue — in that order.',
    description:
      'We run performance-led digital marketing campaigns for B2B and B2C businesses ' +
      'that need measurable revenue impact, not vanity metrics. ' +
      'From paid search to technical SEO — every campaign is tied to a clear commercial outcome.',
    features: [
      'Google Ads and Meta Ads management',
      'Technical SEO and content strategy',
      'LinkedIn B2B lead generation',
      'Conversion rate optimisation (CRO)',
      'Monthly reporting with revenue attribution',
    ],
    tags:           ['Google Ads', 'Meta Ads', 'SEMrush', 'GA4', 'HubSpot'],
    startingFrom:   'From $1,200/mo',
    metaDescription:
      'Elvatrixa runs performance-led digital marketing campaigns for UK and US businesses. ' +
      'Paid search, SEO, and LinkedIn B2B — all tied to measurable revenue outcomes.',
  },

  /* ── 7. Performance Optimisation ─────────────────────────── */
  {
    slug:        'performance',
    icon:        'Zap',
    title:       'Website Performance',
    tagline:     'Sub-2-second load times. 95+ Lighthouse. Every time.',
    description:
      'A 1-second delay costs 7% in conversions. We conduct deep performance audits and ' +
      'implement surgical optimisations across Core Web Vitals, JavaScript bundles, ' +
      'image delivery, and server response times to make your site measurably faster.',
    features: [
      'Core Web Vitals audit and remediation',
      'Image optimisation pipeline (WebP, AVIF)',
      'JavaScript bundle analysis and code splitting',
      'Server-side rendering and edge caching strategy',
      'Lighthouse score from < 60 to > 95',
    ],
    tags:           ['Next.js', 'Vercel', 'Cloudflare', 'WebP', 'Lighthouse'],
    startingFrom:   'From $800',
    metaDescription:
      'Elvatrixa improves website performance for UK and US businesses — ' +
      'Core Web Vitals, Lighthouse scores, and page speed that converts.',
  },

  /* ── 8. Maintenance & Support ─────────────────────────────── */
  {
    slug:        'maintenance',
    icon:        'Shield',
    title:       'Maintenance & Support',
    tagline:     'Your site, always up. Always secure. Always current.',
    description:
      'We act as the dedicated technical partner for businesses that want their digital ' +
      'products kept secure, performant, and up-to-date without hiring in-house. ' +
      'Monthly retainer plans give you direct access to senior engineers — no tickets, no delays.',
    features: [
      'Monthly dependency and security updates',
      'Priority bug fixes within 4 business hours',
      'Uptime monitoring with instant alerting',
      'Monthly performance and SEO health report',
      'Ongoing feature additions on retainer',
    ],
    tags:           ['GitHub', 'Vercel', 'Sentry', 'Uptime Robot', 'Slack'],
    startingFrom:   'From $450/mo',
    metaDescription:
      'Elvatrixa offers website maintenance plans for UK and US businesses. ' +
      'Security updates, priority bug fixes, uptime monitoring — on a monthly retainer.',
  },
]


/* ── LOOKUP HELPERS ──────────────────────────────────────────── */

/**
 * Find a service by its slug.
 * Returns undefined if not found — let the calling page call notFound().
 *
 * Usage:
 *   const service = getServiceBySlug('saas-development')
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}

/**
 * All service slugs — used in generateStaticParams for /services/[slug].
 *
 * Usage:
 *   export async function generateStaticParams() {
 *     return getServiceSlugs()
 *   }
 */
export function getServiceSlugs(): { slug: string }[] {
  return services.map(s => ({ slug: s.slug }))
}

/**
 * Minimal service data shaped for the Navbar mega menu.
 * Keeps the nav bundle small — only what the dropdown needs.
 */
export const serviceNavItems: ServiceNavItem[] = services.map(s => ({
  label:       s.title,
  href:        `/services/${s.slug}`,
  icon:        s.icon,
  description: s.tagline,
}))