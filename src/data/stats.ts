/* ================================================================
   ELVATRIXA — HOMEPAGE STATS DATA
   File: src/data/stats.ts

   Animated counter numbers shown in the StatsBar section.
   Also used on the /about page.

   Rules for stat copy (US/UK buyer psychology):
   - Numbers must be specific and credible — round numbers feel fake
   - Suffix context matters: '48+' reads as 'at least 48'
   - Labels should name the outcome, not the vanity metric
   - Keep labels to 3–4 words maximum

   The AnimatedCounter component reads these at render time and
   counts from 0 → value over ~1.8 seconds on scroll-into-view.
================================================================ */

import type { Stat } from '@/types'


/* ── PRIMARY STATS (StatsBar — homepage above fold) ─────────── */

export const stats: Stat[] = [

  {
    value:  48,
    suffix: '+',
    label:  'Projects Delivered',
    prefix: '',
  },

  {
    value:  32,
    suffix: '+',
    label:  'Clients Worldwide',
    prefix: '',
  },

  {
    value:  12,
    suffix: '',
    label:  'Countries Served',
    prefix: '',
  },

  {
    value:  99,
    suffix: '%',
    label:  'On-Time Delivery',
    prefix: '',
  },

]


/* ── EXTENDED STATS (/about page) ────────────────────────────── */
/*
 * Shown on the About page in a wider grid.
 * Includes the four primary stats plus four supporting ones.
 */

export const aboutStats: Stat[] = [

  ...stats,

  {
    value:  4,
    suffix: 'hr',
    label:  'Avg. Response Time',
    prefix: '<',
  },

  {
    value:  8,
    suffix: 'wk',
    label:  'Typical MVP Timeline',
    prefix: '',
  },

  {
    value:  2,
    suffix: '+',
    label:  'Years Building Products',
    prefix: '',
  },

  {
    value:  5,
    suffix: '★',
    label:  'Average Client Rating',
    prefix: '',
  },

]