// tailwind.config.ts
import type { Config } from 'tailwindcss'
const config: Config = {
 content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
 theme: {
 extend: {
 colors: {
 navy: {
 DEFAULT: '#0D1117',
 surface: '#161B22',
 elevated: '#21262D',
 card: '#1C2128',
 },
 gold: {
 DEFAULT: '#C9A84C',
 light: '#E8C96A',
 pale: '#F5E199',
 dim: 'rgba(201,168,76,0.12)',
 },
 teal: {
 DEFAULT: '#1DB8A0',
 dim: 'rgba(29,184,160,0.1)',
 },
 text: {
 primary: '#F0F6FC',
 secondary: '#C9D1D9',
 muted: '#8B949E',
 },
 },
 fontFamily: {
 display: ['Cormorant Garamond', 'Georgia', 'serif'],
 mono: ['DM Mono', 'Courier New', 'monospace'],
 body: ['Lato', 'Helvetica Neue', 'sans-serif'],
 code: ['JetBrains Mono', 'Courier New', 'monospace'],
 },
 fontSize: {
 'hero': ['clamp(48px, 8vw, 96px)', { lineHeight: '1.0',
letterSpacing: '-0.02em' }],
 'display': ['clamp(36px, 5vw, 56px)', { lineHeight: '1.1',
letterSpacing: '-0.01em' }],
 'heading': ['clamp(24px, 3vw, 36px)', { lineHeight: '1.2' }],
 },
 spacing: {
 '18': '4.5rem',
 '22': '5.5rem',
 '30': '7.5rem',
 },
 maxWidth: {
 'site': '1280px',
 'content': '800px',
 },
 borderRadius: {
 'card': '12px',
 },
 animation: {
 'fade-up': 'fadeUp 0.6s ease-out forwards',
 'count-up': 'countUp 1.8s ease-out forwards',
 'pulse-gold': 'pulseGold 3s ease-in-out infinite',
 },
 keyframes: {
 fadeUp: {
 '0%': { opacity: '0', transform: 'translateY(20px)' },
 '100%': { opacity: '1', transform: 'translateY(0)' },
 },
 pulseGold: {
 '0%, 100%': { opacity: '0.6' },
 '50%': { opacity: '1' },
 },
 },
 },
 },
 plugins: [],
}
export default config