import type { Config } from 'tailwindcss'

/* ================================================================
   ELVATRIXA — TAILWIND CSS CONFIGURATION
   File: tailwind.config.ts
================================================================ */

const config: Config = {

  /* ── CONTENT PATHS ─────────────────────────────────────────── */
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {

      /* ── COLOURS ─────────────────────────────────────────── */
      colors: {
        navy: {
          DEFAULT: '#0D1117',
          0:       '#060810',
          2:       '#111520',
          3:       '#161B22',
          4:       '#1C2128',
          5:       '#21262D',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C96A',
          pale:    '#F5E4A0',
          dim:     'rgba(201,168,76,0.10)',
          border:  'rgba(201,168,76,0.20)',
          glow:    'rgba(201,168,76,0.08)',
        },
        teal: {
          DEFAULT: '#1DB8A0',
          light:   '#2DD4BC',
          dim:     'rgba(29,184,160,0.10)',
          border:  'rgba(29,184,160,0.25)',
        },
        'text-1': '#F0F6FC',
        'text-2': '#C9D1D9',
        'text-3': '#8B949E',
        'text-4': '#484F58',
        'border-subtle': 'rgba(255,255,255,0.055)',
        'border-medium': 'rgba(255,255,255,0.10)',
        'border-gold':   'rgba(201,168,76,0.20)',
      },

      /* ── FONT FAMILIES ───────────────────────────────────── */
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        mono:    ['DM Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
        body:    ['Lato', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        code:    ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'monospace'],
      },

      /* ── FONT SIZES ──────────────────────────────────────── */
      fontSize: {
        'hero': [
          'clamp(52px, 9vw, 108px)',
          { lineHeight: '0.94', letterSpacing: '-0.03em' },
        ],
        'display': [
          'clamp(36px, 5vw, 60px)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
        'heading': [
          'clamp(22px, 3vw, 36px)',
          { lineHeight: '1.20', letterSpacing: '-0.01em' },
        ],
        'subhead': [
          'clamp(16px, 2vw, 20px)',
          { lineHeight: '1.50' },
        ],
      },

      /* ── SPACING ─────────────────────────────────────────── */
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '28': '7rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },

      /* ── MAX WIDTHS ──────────────────────────────────────── */
      maxWidth: {
        'site':    '1280px',
        'content': '800px',
        'narrow':  '640px',
        'form':    '480px',
      },

      /* ── BORDER RADIUS ───────────────────────────────────── */
      borderRadius: {
        'none': '0px',
        'sm':   '4px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        '2xl':  '24px',
        'full': '9999px',
      },

      /* ── BACKGROUND IMAGES ───────────────────────────────── */
      backgroundImage: {
        'hero-radial': [
          'radial-gradient(',
          '  ellipse 90% 60% at 50% -5%,',
          '  rgba(201,168,76,0.14) 0%,',
          '  transparent           65%',
          ')',
        ].join(''),

        'dot-grid': [
          'radial-gradient(',
          '  circle,',
          '  rgba(201,168,76,0.13) 1px,',
          '  transparent           1px',
          ')',
        ].join(''),

        'gold-gradient':        'linear-gradient(135deg, #C9A84C 0%, #E8C96A 55%, #F5E4A0 100%)',
        'gold-gradient-subtle': 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.20) 50%, transparent 100%)',
        'dark-gradient':        'linear-gradient(180deg, #0D1117 0%, #060810 100%)',
        'card-gradient':        'linear-gradient(135deg, #161B22 0%, #1C2128 100%)',
        'image-overlay':        'linear-gradient(to top, rgba(6,8,16,0.95) 0%, rgba(6,8,16,0.60) 50%, transparent 100%)',
      },

      /* ── BOX SHADOWS ─────────────────────────────────────── */
      boxShadow: {
        'card':       '0 4px 24px rgba(0,0,0,0.40)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.50), 0 0 0 1px rgba(201,168,76,0.05)',
        'gold-sm':    '0 0 20px rgba(201,168,76,0.18)',
        'gold-md':    '0 0 40px rgba(201,168,76,0.12), 0 0 80px rgba(201,168,76,0.05)',
        'gold-lg':    '0 8px 40px rgba(201,168,76,0.30)',
        'gold-xl':    '0 12px 48px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.10)',
        'teal-sm':    '0 0 20px rgba(29,184,160,0.20)',
        'nav':        '0 1px 0 rgba(201,168,76,0.12), 0 4px 24px rgba(0,0,0,0.30)',
        'inner-gold': 'inset 0 0 16px rgba(201,168,76,0.06)',
      },

      /* ── ANIMATIONS ──────────────────────────────────────── */
      animation: {
        'fade-up':      'fadeUp 700ms cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 500ms ease forwards',
        'float':        'float 5s ease-in-out infinite',
        'pulse-gold':   'pulseGold 3s ease-in-out infinite',
        'spin-slow':    'spinSlow 24s linear infinite',
        'border-pulse': 'borderPulse 2.5s ease-in-out infinite',
        'slide-right':  'slideRight 900ms cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-down':   'slideDown 250ms cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer':      'shimmer 2.5s ease-in-out infinite',
      },

      /* ── KEYFRAMES ───────────────────────────────────────── */
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)'  },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.35' },
          '50%':      { opacity: '0.85' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        slideRight: {
          '0%':   { transform: 'scaleX(0)', transformOrigin: 'left center' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left center' },
        },
        spinSlow: {
          '0%':   { transform: 'rotate(0deg)'   },
          '100%': { transform: 'rotate(360deg)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(201,168,76,0.20)' },
          '50%':      { borderColor: 'rgba(201,168,76,0.55)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'      },
        },
      },

      /* ── TRANSITION TIMING FUNCTIONS ─────────────────────── */
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'sharp':  'cubic-bezier(0.4, 0, 0.6, 1)',
      },

      /* ── TRANSITION DURATIONS ────────────────────────────── */
      transitionDuration: {
        'fast':   '180ms',
        'normal': '260ms',
        'slow':   '420ms',
        'xslow':  '700ms',
      },

      /* ── BACKDROP BLUR ───────────────────────────────────── */
      backdropBlur: {
        'xs':  '4px',
        'nav': '20px',
        '3xl': '64px',
      },

      /* ── Z-INDEX SCALE ───────────────────────────────────── */
      zIndex: {
        'nav':      '50',
        'dropdown': '100',
        'overlay':  '200',
        'modal':    '300',
        'toast':    '400',
        'progress': '9999',
      },

      /* ── LINE HEIGHT ─────────────────────────────────────── */
      lineHeight: {
        'tight-display': '0.92',
        'display':       '1.00',
        'heading':       '1.15',
        'relaxed-body':  '1.80',
      },

      /* ── LETTER SPACING ──────────────────────────────────── */
      letterSpacing: {
        'display': '-0.03em',
        'heading': '-0.02em',
        'body':     '0em',
        'wide':     '0.06em',
        'wider':    '0.09em',
        'widest':   '0.20em',
      },

      /* ── SCREENS ─────────────────────────────────────────── */
      screens: {
        '3xl': '1600px',
      },

    },
  },

  plugins: [],

}

export default config