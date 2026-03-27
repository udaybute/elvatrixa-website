/* ================================================================
   ELVATRIXA — ROOT LAYOUT
   File: src/app/layout.tsx

   Wraps every single page on the site.
   Responsibilities:
   - Load and apply Google Fonts (via globals.css import)
   - Set root <html> and <body> attributes
   - Inject global metadata (title template, OG, robots)
   - Inject Organization + LocalBusiness JSON-LD schema
   - Render scroll-progress bar element
   - Mount Navbar and Footer (added in next build step)
================================================================ */

import type { Metadata }   from 'next'
import type { ReactNode }  from 'react'
import Script              from 'next/script'

import './globals.css'
import Navbar  from '@/components/layout/Navbar'
import Footer  from '@/components/layout/Footer'

import {
  rootMetadata,
  organizationSchema,
  localBusinessSchema,
  SITE_URL,
  SITE_NAME,
} from '@/lib/seo'


/* ── EXPORTED METADATA ───────────────────────────────────────── */
/* next.js reads this export at build time to generate <head> tags */

export const metadata: Metadata = {
  ...rootMetadata,

  /*
   * metadataBase must be set here (not just in seo.ts) so that
   * relative image paths resolve correctly in all environments.
   */
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL,
  ),
}


/* ── ROOT LAYOUT COMPONENT ───────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="scroll-smooth"
      /* Suppress hydration warning caused by browser extensions
         that inject attributes onto <html> (e.g. Grammarly) */
      suppressHydrationWarning
    >
      <head>
        {/* ── DNS pre-connect for Google Fonts (perf) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ── Google Fonts — full stylesheet (all weights needed) ── */}
        {/*
          Loaded as a regular stylesheet so all font weights render.
          preconnect tags above ensure fast connection.
          Covers: Cormorant Garamond, DM Mono, Lato, JetBrains Mono
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Lato:wght@300;400;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
        />

        {/* ── Theme colour (browser UI on mobile) ── */}
        <meta name="theme-color" content="#C9A84C" />

        {/* ── Apple mobile ── */}
        <meta name="apple-mobile-web-app-capable"        content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title"          content={SITE_NAME} />

        {/* ── Structured Data: Organization ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />

        {/* ── Structured Data: LocalBusiness ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </head>

      <body
        className={[
          /* Background and text from design tokens */
          'bg-navy text-text-1',
          /* Body font stack */
          'font-body',
          /* Smooth subpixel rendering */
          'antialiased',
          /* Prevent horizontal scroll from overflowing elements */
          'overflow-x-hidden',
          /* Minimum full viewport height */
          'min-h-screen',
        ].join(' ')}
      >

        {/* ── Scroll Progress Bar ────────────────────────────── */}
        {/*
          The gold line that fills from 0→100% as the user scrolls.
          Width is driven by the script below — no React state needed.
          z-index: 9999 keeps it above the sticky navbar (z-50).
        */}
        <div
          id="scroll-progress"
          aria-hidden="true"
        />

        {/* ── Skip to main content (accessibility) ──────────── */}
        <a
          href="#main-content"
          className={[
            'sr-only focus:not-sr-only',
            'focus:fixed focus:top-4 focus:left-4',
            'focus:z-[9999] focus:px-4 focus:py-2',
            'focus:bg-gold focus:text-navy-0',
            'focus:font-body focus:text-sm focus:font-bold',
            'focus:rounded-md focus:outline-none',
          ].join(' ')}
        >
          Skip to main content
        </a>

        {/*
          ── Navbar ──────────────────────────────────────────────
        */}
        <Navbar />

        {/* ── Page Content ────────────────────────────────────── */}
        <main id="main-content">
          {children}
        </main>

        {/*
          ── Footer ──────────────────────────────────────────────
        */}
        <Footer />

        {/* ── Google Analytics 4 ──────────────────────────────── */}
        {/*
          Loaded with strategy="afterInteractive" so it never
          blocks the critical rendering path or LCP score.
          Only injected when the measurement ID is present so
          localhost development stays clean.
        */}
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure',
                  });
                `,
              }}
            />
          </>
        )}

        {/* ── Scroll Progress Bar Script ───────────────────────── */}
        {/*
          Vanilla JS — no React re-renders needed.
          Uses requestAnimationFrame for 60fps smoothness.
          Runs after the page is interactive so it never
          blocks paint.
        */}
        <Script
          id="scroll-progress-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var bar = document.getElementById('scroll-progress');
                if (!bar) return;
                var ticking = false;
                function update() {
                  var scrollTop = window.scrollY || document.documentElement.scrollTop;
                  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
                  var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                  bar.style.width = pct.toFixed(2) + '%';
                  ticking = false;
                }
                window.addEventListener('scroll', function () {
                  if (!ticking) {
                    requestAnimationFrame(update);
                    ticking = true;
                  }
                }, { passive: true });
              })();
            `,
          }}
        />

      </body>
    </html>
  )
}