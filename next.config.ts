import type { NextConfig } from 'next'

/* ================================================================
   ELVATRIXA — NEXT.JS CONFIGURATION
   File: next.config.ts

   Production-ready configuration covering:
   - Image optimisation (WebP/AVIF, remote domains)
   - Security HTTP headers (CSP, HSTS, X-Frame-Options)
   - Aggressive caching for static assets
   - WWW → non-WWW redirect (SEO canonical enforcement)
   - UK domain redirect to .com (single canonical domain)
   - Bundle optimisation (tree-shaking for large libraries)
   - Console removal in production builds
================================================================ */

const nextConfig: NextConfig = {

  /* ── REACT STRICT MODE ───────────────────────────────────── */
  /*
    Enables additional runtime checks and warnings in development.
    Does NOT affect production builds.
    Helps catch deprecated patterns and side-effect bugs early.
  */
  reactStrictMode: true,


  /* ── IMAGE OPTIMISATION ──────────────────────────────────── */
  /*
    next/image automatically serves WebP/AVIF, resizes images
    to exactly the size needed, and lazy-loads below-fold images.

    remotePatterns: allowlist for external image domains.
    Any domain not listed here will throw an error if used
    in a <Image src="https://..."> component.
  */
  images: {
    remotePatterns: [
      /* Sanity CMS — for blog and case study images (Phase 3) */
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      /* Unsplash — for all placeholder images during development */
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      /* Unsplash Plus collection */
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],

    /*
      Serve images in next-gen formats — AVIF first (smallest),
      WebP as fallback. Only browsers that support them get them;
      others get the original format automatically.
    */
    formats: ['image/avif', 'image/webp'],

    /*
      deviceSizes: breakpoints for the srcset <img> attribute.
      Matches Elvatrixa's known design breakpoints exactly.
    */
    deviceSizes: [375, 640, 768, 1024, 1280, 1600],

    /*
      imageSizes: for images that are SMALLER than the viewport
      (e.g. thumbnails, avatars, icons).
    */
    imageSizes: [16, 32, 64, 128, 256, 384, 512],

    /*
      Cache optimised images for 1 year (31,536,000 seconds).
      Images are content-hashed so cache-busting is automatic
      when the source image changes.
    */
    minimumCacheTTL: 31_536_000,
  },


  /* ── HTTP SECURITY HEADERS ───────────────────────────────── */
  /*
    Applied to every response. These headers protect against
    clickjacking, MIME sniffing, and cross-site scripting.

    Required for:
    - GDPR compliance (UK ICO guidelines)
    - CCPA compliance (California users)
    - WCAG and UK public sector baseline standards
    - A+ rating on securityheaders.com
  */
  async headers() {
    return [

      /* ── Global headers — every route ── */
      {
        source: '/:path*',
        headers: [

          /*
            Prevent the page from being embedded in iframes.
            Blocks clickjacking attacks completely.
          */
          { key: 'X-Frame-Options', value: 'DENY' },

          /*
            Stop browsers from MIME-sniffing the content type.
            Prevents attackers from tricking the browser into
            executing a file as a different type than declared.
          */
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          /*
            Control how much referrer information is sent.
            'strict-origin-when-cross-origin' sends full URL for
            same-origin requests, only origin for cross-origin.
          */
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          /*
            Disable browser features not needed by the site.
            Prevents malicious scripts from accessing the camera,
            microphone, or geolocation even if injected.
          */
          {
            key:   'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },

          /*
            Allow DNS pre-fetching for faster resource loading.
            Works alongside the <link rel="preconnect"> tags
            in layout.tsx.
          */
          { key: 'X-DNS-Prefetch-Control', value: 'on' },

          /*
            Content Security Policy.
            Defines exactly which sources are allowed to load
            scripts, styles, fonts, images, and frames.

            Breaking down the directives:
            - default-src: fallback for anything not explicitly listed
            - script-src: allows GA4 tag manager + unsafe-inline for Next.js chunks
            - style-src: allows Google Fonts + Tailwind inline styles
            - font-src: allows Google Fonts CDN
            - img-src: allows Sanity CDN, Unsplash, GA4 tracking pixels
            - connect-src: allows GA4 analytics beacons
            - frame-src: allows Calendly embed on /contact page
            - object-src: blocks <object> and <embed> entirely (attack vector)
            - base-uri: prevent <base> tag injection
            - form-action: only allow form submissions to our own origin
          */
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://plus.unsplash.com https://www.google-analytics.com",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
              "frame-src https://calendly.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },

          /*
            HTTP Strict Transport Security.
            Forces HTTPS for 1 year after first visit.
            includeSubDomains: applies to elvatrixa.co.uk too.
            preload: allows submission to browser HSTS preload lists.
          */
          {
            key:   'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },

        ],
      },

      /* ── Next.js static assets — immutable long cache (production only) ── */
      /*
        /_next/static/ contains content-hashed JS and CSS chunks.
        These filenames change on every build, so a 1-year
        immutable cache is completely safe IN PRODUCTION.
        In development, Turbopack uses non-hashed names, so this
        header would cause browsers to cache stale bundles across
        restarts — hence the guard.
      */
      ...(process.env.NODE_ENV === 'production' ? [{
        source: '/_next/static/:path*',
        headers: [
          {
            key:   'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      }] : []),

      /* ── Public static files — long cache ── */
      /*
        Fonts, images, icons, and other assets in /public.
        These rarely change, so a 1-year cache is appropriate.
      */
      {
        source: '/:path*.(ico|png|jpg|jpeg|webp|avif|svg|woff|woff2)',
        headers: [
          {
            key:   'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      /* ── HTML pages — stale-while-revalidate (production only) ── */
      /*
        Pages can be served from CDN cache (s-maxage=3600 = 1 hour).
        After 1 hour, serve the stale version WHILE revalidating
        in the background (up to 24 hours).
        Only applied in production — dev always gets fresh SSR HTML.
      */
      ...(process.env.NODE_ENV === 'production' ? [{
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key:   'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      }] : []),

    ]
  },


  /* ── URL REDIRECTS ───────────────────────────────────────── */
  /*
    Enforce a single canonical domain.
    All www and .co.uk variants permanently redirect to elvatrixa.com.

    Why permanent (301) not temporary (302)?
    - 301s pass ~100% of link equity (PageRank) to the destination
    - Google consolidates crawl budget onto the canonical URL
    - Browsers cache 301s so repeat visitors get instant redirects
  */
  async redirects() {
    return [

      /* www.elvatrixa.com → elvatrixa.com */
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.elvatrixa.com' }],
        destination: 'https://elvatrixa.com/:path*',
        permanent:   true,
      },

      /* elvatrixa.co.uk → elvatrixa.com */
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'elvatrixa.co.uk' }],
        destination: 'https://elvatrixa.com/:path*',
        permanent:   true,
      },

      /* www.elvatrixa.co.uk → elvatrixa.com */
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.elvatrixa.co.uk' }],
        destination: 'https://elvatrixa.com/:path*',
        permanent:   true,
      },

    ]
  },


  /* ── BUNDLE OPTIMISATION ─────────────────────────────────── */
  /*
    optimizePackageImports tells Next.js to only include the
    specific exports actually used from these libraries — not
    the entire library.

    lucide-react alone has 1,400+ icons. Without this,
    importing `import { Settings } from 'lucide-react'`
    would bundle ALL 1,400 icons into your JS.
    With it, only Settings is included.

    Savings:
    - lucide-react:      ~400KB → ~2KB (per icon used)
    - framer-motion:     ~150KB → ~80KB
    - @radix-ui/*:       each ~30KB → ~8KB
  */
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      'framer-motion',
    ],
  },


  /* ── COMPILER OPTIONS ────────────────────────────────────── */
  /*
    removeConsole: strips all console.log() calls from the
    production bundle. Keeps the network tab clean for clients
    who inspect the console. Preserves console.warn and
    console.error so real production errors still surface.
  */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['warn', 'error'] }
        : false,
  },


  /* ── TYPESCRIPT ──────────────────────────────────────────── */
  /*
    ignoreBuildErrors: false (default) — TypeScript errors
    WILL fail the production build. This is intentional.
    A type error in production is a real bug.
  */
  typescript: {
    ignoreBuildErrors: false,
  },


  /* ── MISCELLANEOUS ───────────────────────────────────────── */

  /*
    output: 'standalone' — generates a self-contained build
    that can be run without node_modules in a Docker container.
    Required for deployment targets that don't support the full
    Node.js installation (some VPS setups, custom CI pipelines).
  */
  output: 'standalone',

  /*
    poweredByHeader: false — remove the X-Powered-By: Next.js
    response header. Minor security improvement — don't advertise
    your stack to attackers.
  */
  poweredByHeader: false,

  /*
    trailingSlash: false — /about not /about/
    Keeps URLs clean and consistent with the canonical tags.
  */
  trailingSlash: false,

}

export default nextConfig