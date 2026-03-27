/* ================================================================
   ELVATRIXA — UTILITY FUNCTIONS
   File: src/lib/utils.ts

   Central helper library. Import from here, never duplicate logic.
   Every function is pure (no side effects) and fully typed.

   TABLE OF CONTENTS
   1.  Class Merging        — cn()
   2.  Date Formatting      — formatDate, formatDateShort, isoDate
   3.  String Utilities     — truncate, slugify, capitalise, deslugify
   4.  Number Formatting    — formatNumber, formatCompact, clamp, lerp
   5.  Reading Time         — estimateReadTime
   6.  URL Helpers          — isExternalUrl, stripTrailingSlash, absoluteUrl
   7.  Environment Guards   — isBrowser, isServer, isDev
================================================================ */

import { clsx, type ClassValue } from 'clsx'
import { twMerge }               from 'tailwind-merge'


/* ── 1. CLASS MERGING ────────────────────────────────────────── */

/**
 * cn() — Tailwind-safe class merger.
 *
 * Combines clsx (conditional classes) with tailwind-merge
 * (conflict resolution) so later classes always win cleanly.
 *
 * Why both?
 *   clsx alone doesn't resolve Tailwind conflicts:
 *     clsx('px-4', 'px-8')  →  'px-4 px-8'  ← both applied, px-4 wins (wrong)
 *   tailwind-merge fixes that:
 *     cn('px-4', 'px-8')    →  'px-8'        ← last one wins (correct)
 *
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-gold', className)
 *   cn('text-sm', size === 'lg' && 'text-lg', 'font-medium')
 *   cn('border border-subtle', variant === 'gold' && 'border-gold')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}


/* ── 2. DATE FORMATTING ──────────────────────────────────────── */

/**
 * Format an ISO date string to a long human-readable date.
 *
 * '2025-03-15'  →  '15 March 2025'
 *
 * Uses en-GB locale so dates appear in the correct format
 * for both UK and US audiences (day before month).
 * Used on blog post pages and case study timestamps.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}

/**
 * Format an ISO date string to a short compact label.
 *
 * '2025-03-15'  →  '15 Mar 2025'
 *
 * Used where horizontal space is limited — blog cards,
 * sidebar meta, badge-style date chips.
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  })
}

/**
 * Return the ISO 8601 date string for <time dateTime="..."> elements.
 *
 * '2025-03-15T10:30:00.000Z'  →  '2025-03-15'
 *
 * Required for semantic HTML and search engine date parsing.
 */
export function isoDate(dateString: string): string {
  return new Date(dateString).toISOString().split('T')[0]
}


/* ── 3. STRING UTILITIES ─────────────────────────────────────── */

/**
 * Truncate a string to maxLength characters with an ellipsis.
 *
 * truncate('Hello world this is long', 11)  →  'Hello world…'
 *
 * Uses the proper Unicode ellipsis character (…) not three dots (...).
 * Trims trailing whitespace before appending so you don't get 'word …'
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '\u2026'
}

/**
 * Convert a plain string to a URL-safe slug.
 *
 * 'SaaS Product Development!'  →  'saas-product-development'
 * 'AI & Automation Solutions'  →  'ai-automation-solutions'
 *
 * Used when programmatically generating dynamic route paths
 * from data that doesn't already have a slug field.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove all non-word chars (keeps letters, digits, hyphens)
    .replace(/[\s_-]+/g, '-')    // Collapse whitespace and underscores into a single hyphen
    .replace(/^-+|-+$/g, '')     // Strip any leading or trailing hyphens
}

/**
 * Capitalise only the first letter of a string.
 *
 * 'hello world'  →  'Hello world'
 *
 * Intentionally does NOT title-case the full string —
 * use for sentence-case labels only.
 */
export function capitalise(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert a URL slug back to a readable title.
 *
 * 'saas-product-development'  →  'Saas Product Development'
 *
 * Used to generate breadcrumb labels and page headings
 * from URL path segments when no explicit title is available.
 */
export function deslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => capitalise(word))
    .join(' ')
}

/**
 * Strip HTML tags from a string.
 *
 * '<p>Hello <strong>world</strong></p>'  →  'Hello world'
 *
 * Used to generate plain-text excerpts from Portable Text
 * or HTML content for meta descriptions and OG tags.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}


/* ── 4. NUMBER FORMATTING ────────────────────────────────────── */

/**
 * Format a number with locale-aware thousand separators.
 *
 * 1234567  →  '1,234,567'
 *
 * Used for displaying raw counts where precision matters.
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-GB').format(n)
}

/**
 * Format a number as a compact abbreviated string.
 *
 * 1_500       →  '1.5K'
 * 1_200_000   →  '1.2M'
 * 999         →  '999'
 *
 * Used in the Stats Bar for large metric displays.
 */
export function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-GB', {
    notation:              'compact',
    maximumFractionDigits: 1,
  }).format(n)
}

/**
 * Clamp a number within a lower and upper bound.
 *
 * clamp(150, 0, 100)  →  100
 * clamp(-5,  0, 100)  →  0
 * clamp(42,  0, 100)  →  42
 *
 * Used in AnimatedCounter to keep progress between 0–1,
 * and in scroll calculations.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linear interpolation between two numbers.
 *
 * lerp(0, 100, 0.0)  →  0
 * lerp(0, 100, 0.5)  →  50
 * lerp(0, 100, 1.0)  →  100
 *
 * Used in the AnimatedCounter to calculate intermediate
 * display values during the count-up animation.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

/**
 * Quartic ease-out easing function.
 * Takes a progress value t ∈ [0, 1] and returns an eased value.
 *
 * easeOutQuart(0.0)  →  0.000  (slow start)
 * easeOutQuart(0.5)  →  0.938  (fast early, slows near end)
 * easeOutQuart(1.0)  →  1.000  (complete)
 *
 * Used by AnimatedCounter for a natural decelerating count-up.
 * The counter speeds through the first 90% of numbers and
 * slows down as it approaches the final value.
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}


/* ── 5. READING TIME ─────────────────────────────────────────── */

/**
 * Estimate reading time in minutes for a block of text.
 *
 * Based on an average adult reading speed of 200 words per minute.
 * Always returns at least 1 minute.
 *
 * estimateReadTime('...1000 word article...')  →  5
 *
 * Used on blog post cards to show the reading time badge.
 */
export function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}


/* ── 6. URL HELPERS ──────────────────────────────────────────── */

/**
 * Returns true if a URL string is external (absolute).
 *
 * isExternalUrl('https://google.com')  →  true
 * isExternalUrl('//cdn.example.com')   →  true
 * isExternalUrl('/about')              →  false
 * isExternalUrl('contact')             →  false
 *
 * Used in the Link component to decide whether to use
 * Next.js <Link> (internal) or <a target="_blank"> (external).
 */
export function isExternalUrl(url: string): boolean {
  return /^(https?:\/\/|\/\/)/.test(url)
}

/**
 * Strip the trailing slash from a URL path.
 *
 * stripTrailingSlash('/services/')  →  '/services'
 * stripTrailingSlash('/')           →  '/'   (root preserved)
 * stripTrailingSlash('/about')      →  '/about'
 *
 * Used in the Navbar for accurate active-link comparison
 * because Next.js router.pathname never has a trailing slash
 * but href values sometimes do.
 */
export function stripTrailingSlash(path: string): string {
  return path.endsWith('/') && path.length > 1
    ? path.slice(0, -1)
    : path
}

/**
 * Build an absolute URL from a relative path.
 *
 * Reads NEXT_PUBLIC_SITE_URL from .env.local in development
 * and from Vercel environment variables in production.
 *
 * absoluteUrl('/blog/my-post')
 *   →  'https://elvatrixa.com/blog/my-post'
 *
 * absoluteUrl('blog/my-post')   (no leading slash — also works)
 *   →  'https://elvatrixa.com/blog/my-post'
 *
 * Used in:
 *   - JSON-LD schema generation (canonical URLs)
 *   - Open Graph image URL construction
 *   - Sitemap generation
 */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://elvatrixa.com'
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}


/* ── 7. ENVIRONMENT GUARDS ───────────────────────────────────── */

/**
 * True when code is executing in a browser context.
 *
 * Use to guard any code that accesses browser-only globals:
 *   window, document, localStorage, navigator, etc.
 *
 * if (isBrowser) { window.scrollTo(0, 0) }
 */
export const isBrowser: boolean = typeof window !== 'undefined'

/**
 * True when code is executing on the server (Node.js / Edge).
 *
 * Inverse of isBrowser. Use to guard server-only operations
 * like reading environment variables or Node.js built-ins.
 */
export const isServer: boolean = !isBrowser

/**
 * True when NODE_ENV === 'development'.
 *
 * Use to gate:
 *   - console.log debug output
 *   - Development-only UI overlays
 *   - Mock data and fixtures
 *
 * if (isDev) { console.log('Debug:', data) }
 */
export const isDev: boolean = process.env.NODE_ENV === 'development'

/**
 * True when NODE_ENV === 'production'.
 *
 * Use to gate:
 *   - Analytics tracking (don't pollute GA4 with dev traffic)
 *   - Error reporting services
 *   - Performance monitoring
 */
export const isProd: boolean = process.env.NODE_ENV === 'production'