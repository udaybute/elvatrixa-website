/* ================================================================
   ELVATRIXA — SANITY CMS CLIENT
   File: src/lib/sanity.ts

   Configures the Sanity client used across the project.
   Used for:
   - Blog post fetching (/blog, /blog/[slug])
   - Case study fetching (/work, /work/[slug])
   - Live preview (future — Phase 3)

   Environment variables required in .env.local:
     NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
     NEXT_PUBLIC_SANITY_DATASET=production
     SANITY_API_TOKEN=sk_...  (server-only — never NEXT_PUBLIC_)
================================================================ */

import { createClient }   from '@sanity/client'
import imageUrlBuilder    from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'


/* ── 1. PROJECT CONFIG ───────────────────────────────────────── */

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production'
const apiVersion = '2025-01-01'  // Pin to a date — never use 'latest'

/* Sanity projectId must be a-z, 0-9, dashes. Skip client creation when not set. */
const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId)


/* ── 2. PUBLIC CLIENT (read-only, no auth) ───────────────────── */
/*
 * Used in Server Components, generateStaticParams, and ISR.
 * Does NOT include the API token — safe to use in any context.
 * CDN caching is enabled for maximum edge performance.
 *
 * Will be null if NEXT_PUBLIC_SANITY_PROJECT_ID is not set —
 * all fetch helpers handle this gracefully (return empty data).
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn:      true,
      perspective: 'published',
    })
  : null


/* ── 3. SERVER CLIENT (authenticated, no CDN) ────────────────── */
/*
 * Used for ISR revalidation and server-side draft preview.
 * Includes the API token — ONLY use in server-side code.
 *
 * IMPORTANT: Never import this in Client Components.
 */
export const sanityServerClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn:  false,
      token:   process.env.SANITY_API_TOKEN,
      perspective: 'published',
    })
  : null


/* ── 4. IMAGE URL BUILDER ────────────────────────────────────── */
/*
 * Builds optimised image URLs from Sanity image references.
 *
 * Usage:
 *   import { urlFor } from '@/lib/sanity'
 *   const src = urlFor(post.mainImage).width(1200).format('webp').url()
 */
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity not configured — set NEXT_PUBLIC_SANITY_PROJECT_ID')
  return builder.image(source)
}


/* ── 5. GROQ QUERIES ─────────────────────────────────────────── */
/*
 * All GROQ queries centralised here.
 * Import the query constant into the fetch function below.
 * Keep queries lean — only select fields actually used.
 */

/** All blog posts — listing page (/blog) */
export const BLOG_LIST_QUERY = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    category,
    "imageUrl": mainImage.asset->url,
    "author": author->name,
  }
`

/** Single blog post — detail page (/blog/[slug]) */
export const BLOG_POST_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    category,
    body,
    "imageUrl": mainImage.asset->url,
    "author": author->name,
    metaTitle,
    metaDescription,
  }
`

/** All case study slugs — for generateStaticParams (/work/[slug]) */
export const WORK_SLUGS_QUERY = `
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current,
  }
`

/** All case studies — listing page (/work) */
export const WORK_LIST_QUERY = `
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    service,
    industry,
    description,
    results,
    tech,
    "imageUrl": coverImage.asset->url,
  }
`

/** Single case study — detail page (/work/[slug]) */
export const WORK_POST_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    service,
    industry,
    description,
    results,
    tech,
    "imageUrl": coverImage.asset->url,
    clientQuote,
    clientName,
  }
`

/** All blog slugs — for generateStaticParams (/blog/[slug]) */
export const BLOG_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
  }
`


/* ── 6. FETCH HELPERS ────────────────────────────────────────── */
/*
 * Typed wrappers around sanityClient.fetch().
 * Use these in Server Components and page.tsx files.
 *
 * All fetches use Next.js ISR — revalidate every 3600 seconds.
 * Force revalidation via: POST /api/revalidate (future webhook).
 */

const ISR_REVALIDATE = 3600  // 1 hour

/**
 * Fetch all blog posts for the /blog listing page.
 * Returns [] when Sanity is not configured.
 */
export async function fetchBlogList<T = unknown>(): Promise<T[]> {
  if (!sanityClient) return []
  return sanityClient.fetch<T[]>(
    BLOG_LIST_QUERY,
    {},
    { next: { revalidate: ISR_REVALIDATE, tags: ['posts'] } },
  )
}

/**
 * Fetch a single blog post by slug.
 * Returns null if not found (triggers notFound() in page).
 */
export async function fetchBlogPost<T = unknown>(
  slug: string,
): Promise<T | null> {
  if (!sanityClient) return null
  return sanityClient.fetch<T | null>(
    BLOG_POST_QUERY,
    { slug },
    { next: { revalidate: ISR_REVALIDATE, tags: [`post-${slug}`] } },
  )
}

/**
 * Fetch all case studies for the /work listing page.
 * Returns [] when Sanity is not configured.
 */
export async function fetchWorkList<T = unknown>(): Promise<T[]> {
  if (!sanityClient) return []
  return sanityClient.fetch<T[]>(
    WORK_LIST_QUERY,
    {},
    { next: { revalidate: ISR_REVALIDATE, tags: ['caseStudies'] } },
  )
}

/**
 * Fetch a single case study by slug.
 * Returns null if not found.
 */
export async function fetchWorkPost<T = unknown>(
  slug: string,
): Promise<T | null> {
  if (!sanityClient) return null
  return sanityClient.fetch<T | null>(
    WORK_POST_QUERY,
    { slug },
    { next: { revalidate: ISR_REVALIDATE, tags: [`caseStudy-${slug}`] } },
  )
}

/**
 * Fetch all blog slugs for generateStaticParams.
 * Returns [] when Sanity is not configured.
 */
export async function fetchBlogSlugs(): Promise<{ slug: string }[]> {
  if (!sanityClient) return []
  return sanityClient.fetch<{ slug: string }[]>(
    BLOG_SLUGS_QUERY,
    {},
    { next: { revalidate: ISR_REVALIDATE } },
  )
}

/**
 * Fetch all case study slugs for generateStaticParams.
 * Returns [] when Sanity is not configured.
 */
export async function fetchWorkSlugs(): Promise<{ slug: string }[]> {
  if (!sanityClient) return []
  return sanityClient.fetch<{ slug: string }[]>(
    WORK_SLUGS_QUERY,
    {},
    { next: { revalidate: ISR_REVALIDATE } },
  )
}