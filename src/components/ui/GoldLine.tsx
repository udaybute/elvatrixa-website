/* ================================================================
   ELVATRIXA — GOLD LINE COMPONENT
   File: src/components/ui/GoldLine.tsx

   Decorative gold divider / accent line.
   Used throughout the site as a visual separator and
   as the animated underline beneath the hero headline.

   Variants:
   'left'    → Fades left→right  (default, section headings)
   'center'  → Fades both ends   (centred sections, hero)
   'full'    → Solid across full width (section dividers)
   'right'   → Fades right→left  (right-aligned headings)

   Animated variant:
   Pass `animated` to trigger a scaleX(0→1) reveal.
   The line grows from left to right on mount.
   Used under the hero headline and section headings.

   Sizes:
   'sm'   → 32px wide (default — section labels)
   'md'   → 64px wide
   'lg'   → 120px wide
   'full' → 100% of container
================================================================ */

'use client'

import { cn } from '@/lib/utils'


/* ── TYPES ───────────────────────────────────────────────────── */

interface GoldLineProps {
  variant?:  'left' | 'center' | 'full' | 'right'
  size?:     'sm' | 'md' | 'lg' | 'full'
  animated?: boolean
  className?: string
  /** Height in px — default 1 */
  thickness?: 1 | 2
}


/* ── WIDTH MAP ───────────────────────────────────────────────── */

const widthMap = {
  sm:   'w-8',
  md:   'w-16',
  lg:   'w-30',
  full: 'w-full',
} as const


/* ── GRADIENT MAP ────────────────────────────────────────────── */

const gradientMap = {
  left:   'linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0) 100%)',
  center: 'linear-gradient(90deg, rgba(201,168,76,0) 0%, var(--gold) 50%, rgba(201,168,76,0) 100%)',
  full:   'var(--gold)',
  right:  'linear-gradient(90deg, rgba(201,168,76,0) 0%, var(--gold) 100%)',
} as const


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function GoldLine({
  variant   = 'left',
  size      = 'sm',
  animated  = false,
  thickness = 1,
  className,
}: GoldLineProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block shrink-0',
        /* Height */
        thickness === 2 ? 'h-0.5' : 'h-px',
        /* Width */
        widthMap[size],
        /* Animation */
        animated && 'animate-slide-right origin-left',
        className,
      )}
      style={{
        background: gradientMap[variant],
      }}
    />
  )
}


/* ── GOLD DIVIDER ────────────────────────────────────────────── */
/*
 * Full-width horizontal divider between page sections.
 * Fades at both edges — avoids a harsh hard line.
 *
 * Usage:
 *   <GoldDivider />
 *   <GoldDivider subtle />   ← even lower opacity
 */

interface GoldDividerProps {
  subtle?:    boolean
  className?: string
}

export function GoldDivider({ subtle = false, className }: GoldDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('w-full h-px', className)}
      style={{
        background: subtle
          ? 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.10) 30%, rgba(201,168,76,0.10) 70%, transparent 100%)'
          : 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.20) 30%, rgba(201,168,76,0.20) 70%, transparent 100%)',
      }}
    />
  )
}