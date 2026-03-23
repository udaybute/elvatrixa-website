// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
 // Allow images from these external domains
 images: {
 remotePatterns: [
 { protocol: 'https', hostname: 'cdn.sanity.io' },
 { protocol: 'https', hostname: 'images.unsplash.com' },
 ],
 formats: ['image/avif', 'image/webp'],
 },
 // Security and performance HTTP headers
 async headers() {
 return [
 {
 source: '/(.*)',
 headers: [
 { key: 'X-Frame-Options', value: 'DENY' },
 { key: 'X-Content-Type-Options', value: 'nosniff' },
 { key: 'Referrer-Policy', value: 'strict-origin-whencross-origin' },
 { key: 'Permissions-Policy', value: 'camera=(),microphone=(), geolocation=()' },
 { key: 'X-DNS-Prefetch-Control', value: 'on' },
 ],
 },
 {
 // Long cache for all static assets
 source: '/(.*)\.(ico|png|jpg|jpeg|webp|svg|woff2)',
 headers: [
 { key: 'Cache-Control', value: 'public, max-age=31536000,immutable' },
 ],
 },
 ]
 },
 // Redirect www to non-www (SEO — prevents duplicate content)
 async redirects() {
 return [
 {
 source: '/:path*',
 has: [{ type: 'host', value: 'www.elvatrixa.com' }],
 destination: 'https://elvatrixa.com/:path*',
 permanent: true,
 },
 ]
 },
}
module.exports = nextConfig