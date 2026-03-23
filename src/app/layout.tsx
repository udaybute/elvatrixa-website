// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Elvatrixa — Digital Innovation Studio',
    template: '%s | Elvatrixa',
  },

  description:
    'Elvatrixa builds world-class SaaS platforms, AI automation systems, and high-converting digital products for businesses in the US, UK, and globally.',

  keywords: [
    'SaaS development UK',
    'AI automation agency',
    'web development company',
    'Shopify development agency',
    'digital innovation studio',
  ],

  authors: [{ name: 'Uday Mohanrao Bute', url: 'https://elvatrixa.com' }],
  creator: 'Elvatrixa',

  metadataBase: new URL('https://elvatrixa.com'),

  openGraph: {
    title: 'Elvatrixa — Digital Innovation Studio',
    description:
      'We design and build premium SaaS platforms, AI systems, and digital products that scale globally.',
    url: 'https://elvatrixa.com',
    siteName: 'Elvatrixa',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // add this in public folder
        width: 1200,
        height: 630,
        alt: 'Elvatrixa Digital Studio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Elvatrixa — Digital Innovation Studio',
    description:
      'Premium SaaS, AI automation, and digital product development.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
}
export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
 <html lang='en' className='scroll-smooth'>
 <body className='bg-navy text-text-primary font-body antialiased'>
 {/* Navbar will be added here in the next build step */}
 <main>{children}</main>
 {/* Footer will be added here in the next build step */}
 </body>
 </html>
 )
}