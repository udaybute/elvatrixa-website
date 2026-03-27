/* ================================================================
   ELVATRIXA — TYPESCRIPT TYPE DEFINITIONS
   File: src/types/index.ts

   Single source of truth for every type in the project.
   All components, data files, and API routes import from here.

   TABLE OF CONTENTS
   1.  Navigation
   2.  Services
   3.  Case Studies / Portfolio
   4.  Testimonials
   5.  Stats (Homepage counters)
   6.  Process Steps
   7.  Why Elvatrixa items
   8.  Tech Stack
   9.  Blog / Content
  10.  Contact Form
  11.  API Responses
  12.  UI Component Props
  13.  SEO / Metadata
  14.  Sanity CMS (future)
================================================================ */


/* ================================================================
   1. NAVIGATION
================================================================ */

/** A single item in the main navigation bar */
export interface NavLink {
  /** Display text shown in the nav */
  label: string
  /** URL path e.g. '/services' or '/contact' */
  href: string
  /** Whether this link triggers the mega menu dropdown */
  hasMega?: boolean
  /** Optional: open in new tab (for external links) */
  external?: boolean
}

/** A single service item inside the Services mega menu */
export interface ServiceNavItem {
  /** Display label e.g. 'SaaS Development' */
  label: string
  /** URL path e.g. '/services/saas-development' */
  href: string
  /** Emoji icon identifier e.g. '⚙' */
  icon: string
  /** One-line description shown in mega menu */
  description?: string
}

/** A footer link column */
export interface FooterColumn {
  /** Column heading e.g. 'Services', 'Company' */
  heading: string
  /** Array of links in this column */
  links: { label: string; href: string }[]
}


/* ================================================================
   2. SERVICES
================================================================ */

/** A full service offering — used on Services hub and sub-pages */
export interface Service {
  /**
   * URL-safe identifier matching the sub-page route.
   * e.g. 'saas-development' → /services/saas-development
   */
  slug: string

  /**
   * lucide-react icon name stored as a string.
   * e.g. 'Settings' | 'Bot' | 'ShoppingBag' | 'BarChart3'
   * We store the name, not the component, so it can live in data files.
   */
  icon: string

  /** Short display title e.g. 'SaaS Product Development' */
  title: string

  /**
   * One-line value proposition shown on service cards.
   * Keep under 60 characters.
   */
  tagline: string

  /**
   * 2–3 sentence description for cards and sub-pages.
   * Should include the primary SEO keyword naturally.
   */
  description: string

  /**
   * 3–5 specific deliverables / features for this service.
   * Used as bullet points on the service card and sub-page.
   */
  features: string[]

  /**
   * Technology tags shown as badges.
   * 3–5 items maximum.
   */
  tags: string[]

  /** Optional: SEO meta description for the sub-page */
  metaDescription?: string

  /** Optional: starting price string e.g. 'From $1,500' */
  startingFrom?: string
}

/** Minimal service data for navigation and index listings */
export interface ServiceSummary {
  slug:    string
  icon:    string
  title:   string
  tagline: string
}


/* ================================================================
   3. CASE STUDIES / PORTFOLIO
================================================================ */

/** A single measurable result within a case study */
export interface CaseStudyResult {
  /** Metric label e.g. 'Reduction in manual reporting' */
  label: string
  /** Metric value e.g. '73%' or '2.4x' or '$1.2M' */
  value: string
}

/** A full case study entry */
export interface CaseStudy {
  /**
   * URL-safe identifier matching the dynamic route.
   * e.g. 'saas-crm-platform' → /work/saas-crm-platform
   */
  slug: string

  /** Project title */
  title: string

  /**
   * Client identifier — keep vague if confidential.
   * e.g. 'Confidential — UK FinTech'
   */
  client: string

  /** Which Elvatrixa service this project used */
  service: string

  /** Client's industry e.g. 'Financial Services' */
  industry: string

  /**
   * 2–4 sentence project description.
   * Describe the challenge, approach, and outcome.
   */
  description: string

  /**
   * 2–4 measurable results with specific numbers.
   * Avoid vague claims.
   */
  results: CaseStudyResult[]

  /** Technologies used — shown as badges. 4–6 items. */
  tech: string[]

  /**
   * Full URL to the hero/cover image.
   * Use Unsplash URLs for placeholders.
   */
  imageUrl: string

  /** Optional: brief quote from the client */
  clientQuote?: string

  /** Optional: client name for the quote attribution */
  clientName?: string
}

/** Minimal case study data for index/grid listings */
export interface CaseStudySummary {
  slug:     string
  title:    string
  client:   string
  service:  string
  industry: string
  results:  CaseStudyResult[]
  imageUrl: string
}


/* ================================================================
   4. TESTIMONIALS
================================================================ */

/** A client testimonial */
export interface Testimonial {
  /** Unique numeric ID */
  id: number

  /** Client's full name */
  name: string

  /** Client's job title e.g. 'CEO' or 'Head of Operations' */
  role: string

  /** Company name */
  company: string

  /** Country e.g. 'United Kingdom' or 'United States' */
  country: string

  /**
   * The testimonial quote.
   * 2–5 sentences, specific and outcome-focused.
   * US/UK buyers distrust vague praise.
   */
  quote: string

  /** Star rating — always 5 for published testimonials */
  rating: number

  /** Optional: URL to client's headshot photo */
  imageUrl?: string

  /** Optional: LinkedIn URL for verification */
  linkedInUrl?: string
}


/* ================================================================
   5. STATS (Homepage animated counters)
================================================================ */

/** A single animated stat on the homepage stats bar */
export interface Stat {
  /**
   * The final numeric value the counter animates to.
   * e.g. 48 → counts from 0 to 48
   */
  value: number

  /**
   * String appended after the number.
   * e.g. '+' → '48+' | '%' → '99%' | '' → '8'
   */
  suffix: string

  /** Descriptive label below the number */
  label: string

  /** Optional: prefix before the number e.g. '$' */
  prefix?: string
}


/* ================================================================
   6. PROCESS STEPS
================================================================ */

/** A single step in the Elvatrixa engagement process */
export interface ProcessStep {
  /**
   * Zero-padded step number string.
   * e.g. '01', '02', '03', '04'
   */
  step: string

  /** Step title e.g. 'Discovery Call' */
  title: string

  /**
   * 2–3 sentence description of what happens in this step.
   * Should set clear client expectations.
   */
  body: string

  /** Optional: time or duration hint e.g. '30 minutes' */
  duration?: string

  /** Optional: what the client receives at end of this step */
  deliverable?: string
}


/* ================================================================
   7. WHY ELVATRIXA
================================================================ */

/** A single differentiator in the 'Why Choose Elvatrixa' section */
export interface WhyItem {
  /**
   * Display number — zero-padded string for visual styling.
   * e.g. '01', '02' ... '06'
   */
  number: string

  /** Short title e.g. 'ROI-First Thinking' */
  title: string

  /**
   * 2–3 sentence explanation.
   * Should directly address a buyer objection.
   */
  body: string
}


/* ================================================================
   8. TECH STACK
================================================================ */

/** A single technology in the tech stack display */
export interface TechItem {
  /** Technology name e.g. 'Next.js', 'PostgreSQL' */
  name: string

  /**
   * Category grouping — used for visual filtering.
   * Must be one of the TechCategory union values.
   */
  category: TechCategory
}

/** All valid technology category values */
export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud'
  | 'AI'
  | 'E-Commerce'
  | 'Payments'
  | 'CMS'
  | 'Deployment'
  | 'Language'


/* ================================================================
   9. BLOG / CONTENT
================================================================ */

/** A blog article — sourced from Sanity CMS in production */
export interface BlogPost {
  /**
   * URL-safe slug matching the dynamic route.
   * e.g. 'how-much-does-saas-development-cost'
   * → /blog/how-much-does-saas-development-cost
   */
  slug: string

  /** Article headline */
  title: string

  /**
   * 1–2 sentence excerpt for listing pages and meta description.
   * 150–160 characters ideal for SEO.
   */
  excerpt: string

  /**
   * Category label for filtering.
   * e.g. 'SaaS Development' | 'AI & Automation' | 'E-Commerce'
   */
  category: string

  /** Estimated reading time in minutes */
  readTime: number

  /**
   * ISO 8601 date string.
   * e.g. '2025-03-15'
   */
  publishedAt: string

  /**
   * Cover image URL.
   * Unsplash for placeholders, Sanity CDN in production.
   */
  imageUrl: string

  /** Author name */
  author?: string

  /** Optional: SEO-specific meta title if different from title */
  metaTitle?: string
}


/* ================================================================
   10. CONTACT FORM
================================================================ */

/**
 * The complete contact form data shape.
 * Matches the 3-step form structure:
 *   Step 1 → projectType
 *   Step 2 → budget, timeline, description
 *   Step 3 → name, email, company, country, phone, gdprConsent
 */
export interface ContactFormData {
  /** Step 1 — Which service the client is interested in */
  projectType: ProjectType

  /** Step 2 — Budget range */
  budget: BudgetRange

  /** Step 2 — Desired project timeline */
  timeline: Timeline

  /** Step 2 — Free-text project description */
  description: string

  /** Step 3 — Client's full name */
  name: string

  /** Step 3 — Business email address */
  email: string

  /** Step 3 — Company or organisation name */
  company: string

  /** Step 3 — Country e.g. 'United Kingdom' */
  country: string

  /** Step 3 — Phone / WhatsApp (optional) */
  phone: string

  /** Step 3 — GDPR consent checkbox (required for UK/EU) */
  gdprConsent: boolean
}

/** Valid project type options for Step 1 of the contact form */
export type ProjectType =
  | 'SaaS Platform'
  | 'AI & Automation'
  | 'E-Commerce Store'
  | 'Website / Redesign'
  | 'Digital Marketing'
  | 'Something Else'
  | ''

/** Valid budget range options for Step 2 */
export type BudgetRange =
  | 'Under $1,000'
  | '$1,000 – $3,000'
  | '$3,000 – $8,000'
  | '$8,000 – $20,000'
  | '$20,000+'
  | ''

/** Valid timeline options for Step 2 */
export type Timeline =
  | 'ASAP (within 2 weeks)'
  | '1 – 3 months'
  | '3 – 6 months'
  | '6+ months'
  | 'Flexible'
  | ''

/** Contact form submission lifecycle state */
export type FormStatus =
  | 'idle'       /* Initial state — nothing submitted yet  */
  | 'submitting' /* In-flight — API call in progress       */
  | 'success'    /* Server confirmed receipt               */
  | 'error'      /* Server returned an error               */

/** Payload sent to the /api/contact route */
export interface ContactApiPayload {
  formData:   ContactFormData
  timestamp:  string
  userAgent?: string
  referrer?:  string
}

/** Response shape from the /api/contact route */
export interface ContactApiResponse {
  success:       boolean
  message:       string
  /** Server-generated reference number for the lead */
  referenceId?: string
}


/* ================================================================
   11. API RESPONSES
================================================================ */

/** Generic typed wrapper for all API responses */
export interface ApiResponse<T = null> {
  success:  boolean
  data?:    T
  error?:   string
  message?: string
}

/** Pagination metadata for list endpoints */
export interface PaginationMeta {
  page:        number
  perPage:     number
  total:       number
  totalPages:  number
  hasNextPage: boolean
  hasPrevPage: boolean
}

/** Paginated list response */
export interface PaginatedResponse<T> {
  items: T[]
  meta:  PaginationMeta
}


/* ================================================================
   12. UI COMPONENT PROPS
================================================================ */

/** Base props extended by most components */
export interface BaseProps {
  /** Optional additional CSS class names */
  className?: string
}

/** Props for the reusable SectionHeading component */
export interface SectionHeadingProps extends BaseProps {
  /** Small uppercase DM Mono label above the heading */
  label?: string
  /** Main heading text */
  heading: string
  /** Optional descriptive paragraph below the heading */
  subheading?: string
  /** Text alignment — default 'left' */
  align?: 'left' | 'center' | 'right'
  /** Apply gold gradient to the heading text */
  gradient?: boolean
}

/** Props for the Button component */
export interface ButtonProps extends BaseProps {
  children:   React.ReactNode
  variant?:   'primary' | 'secondary' | 'ghost'
  size?:      'sm' | 'md' | 'lg'
  href?:      string
  external?:  boolean
  disabled?:  boolean
  loading?:   boolean
  iconRight?: React.ReactNode
  iconLeft?:  React.ReactNode
  onClick?:   () => void
  type?:      'button' | 'submit' | 'reset'
}

/** Props for the Badge component */
export interface BadgeProps extends BaseProps {
  children: React.ReactNode
  variant?: 'gold' | 'teal' | 'mono'
  size?:    'sm' | 'md'
}

/** Props for the AnimatedCounter component */
export interface AnimatedCounterProps extends BaseProps {
  /** Target number to count to */
  value:       number
  suffix?:     string
  prefix?:     string
  /** Animation duration in ms — default 1800 */
  duration?:   number
  /** Controlled by IntersectionObserver in the parent */
  isVisible?:  boolean
}

/** Props for image components with fallback handling */
export interface ImageWithFallbackProps extends BaseProps {
  src:          string
  alt:          string
  width?:       number
  height?:      number
  priority?:    boolean
  fill?:        boolean
  fallbackSrc?: string
  objectFit?:   'cover' | 'contain' | 'fill'
}


/* ================================================================
   13. SEO / METADATA
================================================================ */

/** SEO metadata shape for a page */
export interface PageSEO {
  /** Page title — formatted as 'Title | Elvatrixa' */
  title:        string
  /** Meta description — 150–160 characters */
  description:  string
  /** Canonical URL */
  canonical?:   string
  /** Open Graph image — 1200×630px */
  ogImage?:     string
  /** JSON-LD schema type for this page */
  schemaType?:  'WebPage' | 'Service' | 'Article' | 'FAQPage' | 'Organization'
  /** Additional keywords for the meta keywords tag */
  keywords?:    string[]
  /** Prevent search engines indexing this page */
  noIndex?:     boolean
}


/* ================================================================
   14. SANITY CMS (ready for Phase 3 — blog integration)
================================================================ */

/** Base fields on every Sanity document */
export interface SanityDocument {
  _id:        string
  _type:      string
  _createdAt: string
  _updatedAt: string
  _rev:       string
}

/** Sanity image reference with optional alt text */
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref:  string
    _type: 'reference'
  }
  alt?:     string
  caption?: string
}

/** Sanity slug field */
export interface SanitySlug {
  _type:   'slug'
  current: string
}

/** A Portable Text rich-text block from Sanity */
export interface PortableTextBlock {
  _type:    string
  _key:     string
  style?:   string
  children?: {
    _key:   string
    _type:  string
    text:   string
    marks?: string[]
  }[]
  markDefs?: {
    _key:   string
    _type:  string
    href?:  string
  }[]
}