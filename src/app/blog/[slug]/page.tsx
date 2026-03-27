/* ================================================================
   ELVATRIXA — BLOG POST DETAIL PAGE
   File: src/app/blog/[slug]/page.tsx

   Fetches a single post from Sanity via fetchBlogPost(slug).
   Renders Portable Text body via @portabletext/react.
   ISR revalidates every 3600s.

   Fields used (from BLOG_POST_QUERY):
     _id, title, slug, excerpt, publishedAt, readTime,
     category, body, imageUrl, author, metaTitle, metaDescription
================================================================ */

import type { Metadata }         from 'next'
import { notFound }              from 'next/navigation'
import Link                      from 'next/link'
import Image                     from 'next/image'
import { PortableText }          from '@portabletext/react'
import {
  fetchBlogPost,
  fetchBlogSlugs,
}                                from '@/lib/sanity'
import {
  buildPageMetadata,
  articleSchema,
  breadcrumbSchema,
  SITE_URL,
}                                from '@/lib/seo'
import { formatDate, isoDate }   from '@/lib/utils'
import ScrollReveal              from '@/components/ui/ScrollReveal'


/* ── STATIC PARAMS ───────────────────────────────────────────── */

export async function generateStaticParams() {
  const slugs = await fetchBlogSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

/* ── ISR ── */
export const revalidate = 3600


/* ── BLOG POST TYPE ──────────────────────────────────────────── */

interface SanityBlogPost {
  _id:             string
  title:           string
  slug:            string
  excerpt?:        string
  publishedAt?:    string
  readTime?:       number
  category?:       string
  body?:           unknown[]      /* Portable Text blocks */
  imageUrl?:       string
  author?:         string
  metaTitle?:      string
  metaDescription?: string
}


/* ── METADATA ────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post     = await fetchBlogPost<SanityBlogPost>(slug)
  if (!post) return {}

  return buildPageMetadata({
    title:       post.metaTitle   ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? post.title,
    canonical:   `/blog/${slug}`,
    ogImage:     post.imageUrl,
  })
}


/* ── PORTABLE TEXT COMPONENTS ────────────────────────────────── */
/*
 * Maps Sanity Portable Text block types to styled JSX.
 * Every element uses the Elvatrixa design tokens.
 */

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p
        className="font-body text-base leading-[1.85] mb-6"
        style={{ color: 'var(--text-2)' }}
      >
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        className="font-display font-bold mt-12 mb-5"
        style={{
          fontSize: 'clamp(24px, 3vw, 34px)',
          lineHeight: '1.15',
          letterSpacing: '-0.02em',
          color: 'var(--text-1)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        className="font-body font-bold text-xl mt-10 mb-4 leading-snug"
        style={{ color: 'var(--text-1)' }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4
        className="font-mono font-medium text-base mt-8 mb-3 tracking-wide uppercase"
        style={{ color: 'var(--gold)', letterSpacing: '0.06em' }}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        className="relative my-8 pl-6 py-1"
        style={{ borderLeft: '3px solid var(--gold)' }}
      >
        <p
          className="font-display font-bold text-xl leading-relaxed italic"
          style={{ color: 'var(--text-1)' }}
        >
          {children}
        </p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 flex flex-col gap-2 pl-0" style={{ listStyle: 'none' }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 flex flex-col gap-2 pl-0" style={{ listStyle: 'none', counterReset: 'list-counter' }}>
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3">
        <span
          className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[10px]"
          style={{ background: 'var(--gold)' }}
        />
        <span className="font-body text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
          {children}
        </span>
      </li>
    ),
    number: ({ children, index }: { children?: React.ReactNode; index?: number }) => (
      <li className="flex items-start gap-3">
        <span
          className="flex-shrink-0 font-mono text-sm font-bold w-6 text-right mt-0.5"
          style={{ color: 'var(--gold)' }}
        >
          {(index ?? 0) + 1}.
        </span>
        <span className="font-body text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
          {children}
        </span>
      </li>
    ),
  },

  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold" style={{ color: 'var(--text-1)' }}>
        {children}
      </strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic" style={{ color: 'var(--text-2)' }}>
        {children}
      </em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code
        className="font-code text-sm px-1.5 py-0.5 rounded"
        style={{
          background: 'var(--bg-4)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--teal-light)',
        }}
      >
        {children}
      </code>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => {
      const href    = value?.href ?? '#'
      const isExt   = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExt ? '_blank' : undefined}
          rel={isExt ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-2 transition-colors duration-150 text-gold hover:text-gold-light"
          style={{ textDecorationColor: 'var(--gold-border)' }}
        >
          {children}
        </a>
      )
    },
  },

  types: {
    image: ({ value }: { value?: { asset?: { url?: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-10 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <Image
              src={value.asset.url}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption
              className="px-4 py-3 font-mono text-[11px] tracking-wide text-center"
              style={{
                background: 'var(--bg-4)',
                borderTop: '1px solid var(--border-subtle)',
                color: 'var(--text-4)',
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    callout: ({ value }: { value?: { text?: string; tone?: string } }) => (
      <div
        className="my-8 flex gap-4 p-5 rounded-lg"
        style={{
          background: 'var(--gold-dim)',
          border: '1px solid var(--gold-border)',
          borderLeft: '3px solid var(--gold)',
        }}
      >
        <span className="flex-shrink-0 text-lg" style={{ color: 'var(--gold)' }}>💡</span>
        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
          {value?.text}
        </p>
      </div>
    ),

    code: ({ value }: { value?: { code?: string; language?: string } }) => (
      <pre
        className="my-8 p-5 rounded-xl overflow-x-auto"
        style={{
          background: 'var(--bg-0)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {value?.language && (
          <div
            className="font-mono text-[10px] tracking-widest uppercase mb-3"
            style={{ color: 'var(--text-4)' }}
          >
            {value.language}
          </div>
        )}
        <code className="font-code text-sm" style={{ color: 'var(--teal-light)' }}>
          {value?.code}
        </code>
      </pre>
    ),
  },
}


/* ── INLINE ICONS ────────────────────────────────────────────── */

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 7H3M6 3.5L2.5 7 6 10.5"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6.5" cy="6.5" r="5.5"/><path d="M6.5 3.5v3l2 1.5"/>
  </svg>
)


/* ── PAGE COMPONENT ──────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post     = await fetchBlogPost<SanityBlogPost>(slug)
  if (!post) notFound()

  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const ogImage      = post.imageUrl ?? `${SITE_URL}/images/og-default.jpg`

  return (
    <div style={{ background: 'var(--bg-1)' }}>

      {/* ── JSON-LD SCHEMA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleSchema(
              post.title,
              post.excerpt ?? post.title,
              `/blog/${slug}`,
              ogImage,
              post.publishedAt ?? new Date().toISOString(),
            ),
            breadcrumbSchema([
              { name: 'Home', url: '/'     },
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${slug}` },
            ]),
          ]),
        }}
      />


      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'var(--bg-0)',
          paddingTop: 'clamp(80px, 10vw, 120px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(201,168,76,0.11) 0%, transparent 60%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-bg opacity-20" />

        <div className="section-container relative z-10 max-w-[800px] mx-auto">

          {/* Breadcrumb */}
          <ScrollReveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
              <Link
                href="/blog"
                className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors duration-150 text-text-4 hover:text-gold"
              >
                <ArrowLeft /> All Articles
              </Link>
              <span style={{ color: 'var(--border-medium)' }}>/</span>
              {post.category && (
                <span className="font-mono text-[11px] tracking-wider uppercase" style={{ color: 'var(--gold)' }}>
                  {post.category}
                </span>
              )}
            </nav>
          </ScrollReveal>

          {/* Category badge */}
          {post.category && (
            <ScrollReveal>
              <div className="mb-5">
                <span className="badge badge-lg">{post.category}</span>
              </div>
            </ScrollReveal>
          )}

          {/* Title */}
          <ScrollReveal delay="reveal-delay-1">
            <h1
              className="font-display font-bold mb-6"
              style={{
                fontSize: 'clamp(32px, 5.5vw, 64px)',
                lineHeight: '1.05',
                letterSpacing: '-0.025em',
                color: 'var(--text-1)',
              }}
            >
              {post.title}
            </h1>
          </ScrollReveal>

          {/* Excerpt */}
          {post.excerpt && (
            <ScrollReveal delay="reveal-delay-2">
              <p
                className="font-body leading-relaxed mb-8"
                style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-3)' }}
              >
                {post.excerpt}
              </p>
            </ScrollReveal>
          )}

          {/* Meta row */}
          <ScrollReveal delay="reveal-delay-3">
            <div
              className="flex flex-wrap items-center gap-5 py-4"
              style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
            >
              {post.author && (
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm"
                    style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', color: 'var(--gold)' }}
                  >
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--text-2)' }}>
                    {post.author}
                  </span>
                </div>
              )}

              {post.publishedAt && (
                <span
                  className="font-mono text-[11px] tracking-wider uppercase"
                  style={{ color: 'var(--text-4)' }}
                >
                  <time dateTime={isoDate(post.publishedAt)}>
                    {formatDate(post.publishedAt)}
                  </time>
                </span>
              )}

              {post.readTime && (
                <span
                  className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase"
                  style={{ color: 'var(--text-4)' }}
                >
                  <ClockIcon />
                  {post.readTime} min read
                </span>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ── COVER IMAGE ── */}
      {post.imageUrl && (
        <div className="section-container max-w-[800px] mx-auto -mt-2 mb-0 px-0 md:px-8">
          <div
            className="relative w-full overflow-hidden"
            style={{
              paddingBottom: '52%',
              borderRadius: '0 0 16px 16px',
              border: '1px solid var(--border-subtle)',
              borderTop: 'none',
            }}
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        </div>
      )}


      {/* ── ARTICLE BODY ── */}
      <section
        className="section-pad"
        style={{ background: 'var(--bg-1)' }}
      >
        <div className="section-container max-w-[800px] mx-auto">

          {/* Portable Text */}
          {post.body && Array.isArray(post.body) && post.body.length > 0 ? (
            <article className="prose-elvatrixa">
              {/* @ts-expect-error — PortableText value type is loosely typed by design */}
              <PortableText value={post.body} components={ptComponents} />
            </article>
          ) : (
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: 'var(--text-3)' }}
            >
              Article content coming soon.
            </p>
          )}

          {/* ── Post footer ── */}
          <div
            className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            {/* Author card */}
            {post.author && (
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-base flex-shrink-0"
                  style={{
                    background: 'var(--gold-dim)',
                    border: '1px solid var(--gold-border)',
                    color: 'var(--gold)',
                  }}
                >
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-body font-bold text-sm" style={{ color: 'var(--text-1)' }}>
                    {post.author}
                  </p>
                  <p className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'var(--text-4)' }}>
                    Elvatrixa
                  </p>
                </div>
              </div>
            )}

            {/* Back to blog */}
            <Link
              href="/blog"
              className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider transition-colors duration-150 text-text-3 hover:text-gold"
            >
              <ArrowLeft />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section
        className="section-pad-sm"
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div className="section-container max-w-[800px] mx-auto">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl"
            style={{
              background: 'var(--bg-3)',
              border: '1px solid var(--border-subtle)',
              borderTop: '3px solid var(--gold)',
            }}
          >
            <div className="flex-1 min-w-0">
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-2"
                style={{ color: 'var(--gold)' }}
              >
                Ready to apply this?
              </p>
              <h2
                className="font-display font-bold text-2xl mb-2"
                style={{ color: 'var(--text-1)' }}
              >
                Let&apos;s Build It Together
              </h2>
              <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>
                Book a free 30-minute strategy call and let&apos;s turn what you just
                read into a working system for your business.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3">
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Book a Free Call
              </Link>
              <Link href="/blog" className="btn-secondary whitespace-nowrap text-center">
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}