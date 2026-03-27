/* ================================================================
   ELVATRIXA — BLOG LISTING PAGE
   File: src/app/blog/page.tsx

   Fetches all published posts from Sanity via fetchBlogList().
   ISR revalidates every 3600s — instant on Vercel edge.

   Fields used (from BLOG_LIST_QUERY):
     _id, title, slug, excerpt, publishedAt, readTime,
     category, imageUrl, author
================================================================ */

import type { Metadata }    from 'next'
import Link                 from 'next/link'
import Image                from 'next/image'
import { buildPageMetadata } from '@/lib/seo'
import { fetchBlogList }    from '@/lib/sanity'
import type { BlogPost }    from '@/types'
import { formatDateShort }  from '@/lib/utils'
import ScrollReveal         from '@/components/ui/ScrollReveal'
import SectionHeading       from '@/components/ui/SectionHeading'


/* ── METADATA ────────────────────────────────────────────────── */

export const metadata: Metadata = buildPageMetadata({
  title:       'Blog',
  description:
    'Insights on SaaS development, AI automation, e-commerce, and digital marketing ' +
    'for US and UK businesses. Written by the Elvatrixa team.',
  canonical:   '/blog',
  keywords: [
    'SaaS development blog',
    'AI automation insights',
    'digital marketing tips UK',
    'web development articles',
  ],
})

/* ── ISR revalidation ── */
export const revalidate = 3600


/* ── INLINE ICONS ────────────────────────────────────────────── */

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 1.5"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="2" width="10" height="9" rx="1.5"/>
    <path d="M8 1v2M4 1v2M1 5h10"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 6.5h9M8 3l3 3.5L8 10"/>
  </svg>
)


/* ── EMPTY STATE ─────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--gold)' }}>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
        </svg>
      </div>
      <h2
        className="font-display font-bold text-2xl mb-3"
        style={{ color: 'var(--text-1)' }}
      >
        Articles Coming Soon
      </h2>
      <p
        className="font-body text-sm leading-relaxed max-w-sm mb-8"
        style={{ color: 'var(--text-3)' }}
      >
        We are publishing in-depth guides on SaaS development, AI automation,
        and digital growth. Check back shortly.
      </p>
      <Link href="/contact" className="btn-primary">
        Get Notified
      </Link>
    </div>
  )
}


/* ── POST CARD ───────────────────────────────────────────────── */

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full"
      aria-label={`Read: ${post.title}`}
    >
      <article
        className="relative h-full flex flex-col rounded-xl overflow-hidden transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover group-hover:border-gold-border"
        style={{
          background: 'var(--bg-3)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* Cover image */}
        <div className={`relative overflow-hidden flex-shrink-0 ${featured ? 'h-64' : 'h-48'}`}>
          {post.imageUrl ? (
            <>
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={featured
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, 33vw'
                }
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(22,27,34,0.85) 0%, rgba(22,27,34,0.20) 60%, transparent 100%)',
                }}
              />
            </>
          ) : (
            /* Placeholder when no image */
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'var(--bg-4)' }}
            >
              <span className="font-display font-bold text-5xl opacity-10" style={{ color: 'var(--gold)' }}>
                E
              </span>
            </div>
          )}

          {/* Category badge — over image */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="badge">{post.category}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">

          {/* Meta row */}
          <div className="flex items-center gap-4 mb-4">
            {post.publishedAt && (
              <span
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase"
                style={{ color: 'var(--text-4)' }}
              >
                <CalendarIcon />
                {formatDateShort(post.publishedAt)}
              </span>
            )}
            {post.readTime && (
              <span
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase"
                style={{ color: 'var(--text-4)' }}
              >
                <ClockIcon />
                {post.readTime} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            className={`font-body font-bold leading-snug mb-3 transition-colors duration-200 group-hover:text-gold-gradient ${featured ? 'text-xl' : 'text-base'}`}
            style={{ color: 'var(--text-1)' }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="font-body text-sm leading-relaxed flex-1 mb-5 line-clamp-3"
              style={{ color: 'var(--text-3)' }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Footer row */}
          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid var(--border-subtle)' }}
          >
            {/* Author */}
            {post.author && (
              <span
                className="font-mono text-[10px] tracking-wider uppercase"
                style={{ color: 'var(--text-4)' }}
              >
                {post.author}
              </span>
            )}

            {/* Read more */}
            <span
              className="flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5 ml-auto"
              style={{ color: 'var(--gold)' }}
            >
              Read
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight />
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}


/* ── PAGE COMPONENT ──────────────────────────────────────────── */

export default async function BlogPage() {
  const posts = await fetchBlogList<BlogPost>()

  return (
    <div style={{ background: 'var(--bg-1)' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden section-pad"
        style={{ background: 'var(--bg-0)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.13) 0%, transparent 65%)',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid-bg opacity-25" />

        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
              <span className="section-label">Insights & Guides</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-1">
            <h1
              className="font-display font-bold text-gold-gradient mb-6"
              style={{
                fontSize: 'clamp(44px, 7vw, 88px)',
                lineHeight: '0.95',
                letterSpacing: '-0.03em',
              }}
            >
              The Elvatrixa<br />Blog
            </h1>
          </ScrollReveal>

          <ScrollReveal delay="reveal-delay-2">
            <p
              className="font-body leading-relaxed max-w-2xl"
              style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'var(--text-3)' }}
            >
              In-depth guides on SaaS development, AI automation, e-commerce growth,
              and digital strategy — written for ambitious US and UK business leaders.
            </p>
          </ScrollReveal>

          {/* Post count */}
          {posts.length > 0 && (
            <ScrollReveal delay="reveal-delay-3">
              <div className="flex items-center gap-3 mt-8">
                <span
                  className="font-mono text-[11px] tracking-widest uppercase"
                  style={{ color: 'var(--text-4)' }}
                >
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
                </span>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>


      {/* ── POSTS GRID ── */}
      <section className="section-pad" style={{ background: 'var(--bg-1)' }}>
        <div className="section-container">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Featured post — first post, full width */}
              <ScrollReveal className="mb-8">
                <PostCard post={posts[0]} featured />
              </ScrollReveal>

              {/* Rest of posts — 3-column grid */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(1).map((post, i) => (
                    <ScrollReveal
                      key={post.slug}
                      delay={`reveal-delay-${(i % 3) + 1}` as `reveal-delay-${number}`}
                    >
                      <PostCard post={post} />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>


      {/* ── NEWSLETTER / CTA ── */}
      <section
        className="section-pad-sm"
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <div className="section-container">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl"
            style={{
              background: 'var(--bg-3)',
              border: '1px solid var(--border-subtle)',
              borderTop: '3px solid var(--gold)',
            }}
          >
            <div className="flex-1 min-w-0">
              <ScrollReveal>
                <p
                  className="font-mono text-[10px] tracking-widest uppercase mb-2"
                  style={{ color: 'var(--gold)' }}
                >
                  Want more insights?
                </p>
                <h2
                  className="font-display font-bold text-2xl mb-2"
                  style={{ color: 'var(--text-1)' }}
                >
                  Work with Elvatrixa
                </h2>
                <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>
                  Turn what you read into real results. Book a free strategy call and
                  let&apos;s build something that moves your business forward.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay="reveal-delay-2" className="flex-shrink-0">
              <Link href="/contact" className="btn-primary whitespace-nowrap">
                Book a Free Call
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  )
}