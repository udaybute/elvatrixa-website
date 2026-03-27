/* ================================================================
   ELVATRIXA — SEO CONFIGURATION
   File: src/lib/seo.ts

   Single source of truth for all SEO metadata.
   Every page imports its defaults from here and overrides
   only the fields specific to that page.

   Used by:
   - src/app/layout.tsx  (root Metadata object)
   - Individual page.tsx files via generateMetadata()
   - JSON-LD schema helpers at the bottom of this file
================================================================ */

import type { Metadata } from 'next'
import type { PageSEO }  from '@/types'


/* ── 1. SITE CONSTANTS ───────────────────────────────────────── */

export const SITE_URL         = 'https://elvatrixa.com'
export const SITE_NAME        = 'Elvatrixa'
export const SITE_HANDLE      = '@elvatrixa'
export const SITE_LOCALE      = 'en_GB'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`
export const FOUNDER_NAME     = 'Uday Mohanrao Bute'
export const CONTACT_EMAIL    = 'hello@elvatrixa.com'
export const CONTACT_PHONE    = '+918668296156'

/**
 * Core keywords shared across the whole site.
 * Individual pages append their own specific keywords on top.
 */
export const GLOBAL_KEYWORDS = [
  'SaaS development company UK',
  'SaaS development company USA',
  'AI automation agency UK',
  'web development agency UK',
  'digital innovation studio',
  'custom software development',
  'Elvatrixa',
]


/* ── 2. ROOT METADATA (src/app/layout.tsx) ───────────────────── */

/**
 * The base Metadata object spread into layout.tsx.
 *
 * Individual pages override specific fields using
 * generateMetadata() or a static export const metadata.
 * They never need to repeat the shared fields below.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  `${SITE_NAME} — Digital Innovation Studio`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    'Elvatrixa builds world-class SaaS platforms, AI automation systems, and ' +
    'high-converting digital products for scaling businesses in the US, UK, and globally.',

  keywords: GLOBAL_KEYWORDS,

  authors: [
    { name: FOUNDER_NAME, url: SITE_URL },
  ],

  creator:   SITE_NAME,
  publisher: SITE_NAME,

  /* ── Open Graph ── */
  openGraph: {
    type:        'website',
    locale:      SITE_LOCALE,
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} — Digital Innovation Studio`,
    description:
      'We build world-class SaaS platforms, AI automation systems, and ' +
      'high-converting digital products for businesses in the US and UK.',
    images: [
      {
        url:    DEFAULT_OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME} — Digital Innovation Studio`,
      },
    ],
  },

  /* ── Twitter / X ── */
  twitter: {
    card:        'summary_large_image',
    site:        SITE_HANDLE,
    creator:     SITE_HANDLE,
    title:       `${SITE_NAME} — Digital Innovation Studio`,
    description:
      'World-class SaaS, AI automation, and web development for US & UK businesses.',
    images: [DEFAULT_OG_IMAGE],
  },

  /* ── Robots ── */
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  /* ── Icons ── */
  icons: {
    icon:     '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple:    '/apple-touch-icon.png',
  },

  /* ── Web App Manifest ── */
  manifest: '/site.webmanifest',

  /* ── Search Console Verification ── */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
  },

  /* ── Canonical ── */
  alternates: {
    canonical: SITE_URL,
  },

  category: 'technology',
}


/* ── 3. PAGE METADATA BUILDER ────────────────────────────────── */

/**
 * Build a full Next.js Metadata object for a specific page.
 * Only pass the fields that differ from the root defaults.
 * Everything else is inherited automatically via layout.tsx.
 *
 * Usage in any page.tsx:
 *
 *   import { buildPageMetadata } from '@/lib/seo'
 *
 *   export const metadata = buildPageMetadata({
 *     title:       'SaaS Product Development',
 *     description: 'We build scalable SaaS platforms...',
 *     canonical:   '/services/saas-development',
 *     keywords:    ['saas development uk', 'saas mvp agency'],
 *   })
 */
export function buildPageMetadata(page: PageSEO): Metadata {
  const canonicalUrl = page.canonical
    ? `${SITE_URL}${page.canonical}`
    : SITE_URL

  const ogImage         = page.ogImage ?? DEFAULT_OG_IMAGE
  const fullTitle       = `${page.title} | ${SITE_NAME}`
  const mergedKeywords  = [...(page.keywords ?? []), ...GLOBAL_KEYWORDS]

  return {
    title:       page.title,
    description: page.description,
    keywords:    mergedKeywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type:        'website',
      locale:      SITE_LOCALE,
      url:         canonicalUrl,
      siteName:    SITE_NAME,
      title:       fullTitle,
      description: page.description,
      images: [
        {
          url:    ogImage,
          width:  1200,
          height: 630,
          alt:    page.title,
        },
      ],
    },

    twitter: {
      card:        'summary_large_image',
      site:        SITE_HANDLE,
      creator:     SITE_HANDLE,
      title:       fullTitle,
      description: page.description,
      images:      [ogImage],
    },

    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true,  follow: true  },
  }
}


/* ── 4. JSON-LD SCHEMA HELPERS ───────────────────────────────── */
/*
  Every function returns a plain object ready for:
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
  />

  All schemas are injected in layout.tsx (global) or
  individual page.tsx files (page-specific).
*/

/**
 * Organization schema — injected globally via layout.tsx.
 *
 * Enables the Google Knowledge Panel for Elvatrixa.
 * Shows up in branded searches: "Elvatrixa agency"
 */
export function organizationSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      'Organization',
    name:          SITE_NAME,
    url:           SITE_URL,
    logo:         `${SITE_URL}/images/elvatrixa-logo.png`,
    description:
      'Elvatrixa is a digital innovation studio building SaaS platforms, ' +
      'AI automation systems, and high-converting digital products for US and UK businesses.',
    email:         CONTACT_EMAIL,
    telephone:     CONTACT_PHONE,
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name:     FOUNDER_NAME,
    },
    address: {
      '@type':          'PostalAddress',
      addressCountry:   'GB',
    },
    sameAs: [
      'https://www.linkedin.com/company/elvatrixa',
      'https://twitter.com/elvatrixa',
      'https://github.com/elvatrixa',
    ],
    areaServed:  ['GB', 'US', 'Worldwide'],
    knowsAbout: [
      'SaaS Development',
      'AI Automation',
      'Web Development',
      'E-Commerce Development',
      'UI/UX Design',
      'Digital Marketing',
    ],
  }
}

/**
 * LocalBusiness schema — injected via layout.tsx.
 *
 * Helps Elvatrixa appear in local UK Google searches.
 * Also powers the 'priceRange' indicator in search results.
 */
export function localBusinessSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      'LocalBusiness',
    '@id':        `${SITE_URL}/#business`,
    name:          SITE_NAME,
    url:           SITE_URL,
    email:         CONTACT_EMAIL,
    telephone:     CONTACT_PHONE,
    priceRange:   '££££',
    description:
      'Digital innovation studio specialising in SaaS development, AI automation, ' +
      'and web development for US and UK businesses.',
    address: {
      '@type':          'PostalAddress',
      addressCountry:   'GB',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States'  },
    ],
    openingHours: 'Mo-Fr 09:00-18:00',
    image:         DEFAULT_OG_IMAGE,
  }
}

/**
 * Service schema — inject on each /services/[slug] page.
 *
 * Makes the service eligible for rich snippets in search results.
 *
 * @param name         e.g. 'SaaS Product Development'
 * @param description  Service description paragraph
 * @param url          Relative URL e.g. '/services/saas-development'
 */
export function serviceSchema(
  name:        string,
  description: string,
  url:         string,
) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Service',
    name,
    description,
    url:        `${SITE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name:     SITE_NAME,
      url:      SITE_URL,
    },
    areaServed:  ['GB', 'US', 'Worldwide'],
    serviceType: name,
  }
}

/**
 * BreadcrumbList schema — inject on all inner pages.
 *
 * Renders the breadcrumb trail directly in Google search results
 * below the page title.
 *
 * Usage:
 *   breadcrumbSchema([
 *     { name: 'Home',             url: '/'                           },
 *     { name: 'Services',         url: '/services'                   },
 *     { name: 'SaaS Development', url: '/services/saas-development'  },
 *   ])
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type':   'ListItem',
      position:  index + 1,
      name:      item.name,
      item:      `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Article schema — inject on each /blog/[slug] page.
 *
 * Enables article rich results: image, author, and publish date
 * shown directly in Google search snippets.
 *
 * @param title        Article headline
 * @param description  Meta description / excerpt
 * @param url          Relative URL e.g. '/blog/my-article'
 * @param imageUrl     Absolute URL of the cover image
 * @param publishedAt  ISO 8601 date string e.g. '2025-03-15'
 */
export function articleSchema(
  title:       string,
  description: string,
  url:         string,
  imageUrl:    string,
  publishedAt: string,
) {
  return {
    '@context':      'https://schema.org',
    '@type':         'Article',
    headline:         title,
    description,
    url:             `${SITE_URL}${url}`,
    image:            imageUrl,
    datePublished:    publishedAt,
    dateModified:     publishedAt,
    author: {
      '@type': 'Person',
      name:     FOUNDER_NAME,
      url:      SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name:     SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url:    `${SITE_URL}/images/elvatrixa-logo.png`,
      },
    },
  }
}

/**
 * FAQPage schema — inject on /faq and service sub-pages.
 *
 * Renders FAQ dropdown accordions directly in Google
 * search results — significant CTR booster.
 *
 * @param faqs  Array of { question, answer } pairs
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type':          'Question',
      name:              faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
  }
}

/**
 * AggregateRating schema — inject on /testimonials.
 *
 * Shows the star rating directly in Google search results.
 * Only add once you have a meaningful number of genuine reviews.
 *
 * @param ratingValue  Average score e.g. 4.9
 * @param reviewCount  Total review count e.g. 32
 */
export function aggregateRatingSchema(
  ratingValue: number,
  reviewCount: number,
) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Organization',
    name:        SITE_NAME,
    url:         SITE_URL,
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:    ratingValue.toFixed(1),
      bestRating:    '5',
      worstRating:   '1',
      reviewCount:    String(reviewCount),
    },
  }
}