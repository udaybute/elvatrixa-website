// src/lib/seo.ts
export const defaultSEO = {
 titleTemplate: '%s | Elvatrixa',
 defaultTitle: 'Elvatrixa — Digital Innovation Studio | SaaS, AI & Web
Development',
 description:'Elvatrixa builds world-class SaaS platforms, AI automation systems,
and',
 + ' high-converting digital products for businesses in the US, UK, and
globally.',
 canonical: 'https://elvatrixa.com',
 openGraph: {
 type: 'website',
 locale: 'en_GB',
 url: 'https://elvatrixa.com',
 siteName: 'Elvatrixa',
 images: [{
 url: 'https://elvatrixa.com/images/og-image.jpg',
 width: 1200,
 height: 630,
 alt: 'Elvatrixa — Digital Innovation Studio',
 }],
 },
 twitter: {
 handle: '@elvatrixa',
 site: '@elvatrixa',
 cardType: 'summary_large_image',
 },
 additionalMetaTags: [
 { name: 'viewport', content: 'width=device-width, initial-scale=1' },
 { name: 'theme-color', content: '#C9A84C' },
 ],
}
