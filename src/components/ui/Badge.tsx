/* ================================================================
   ELVATRIXA — BADGE COMPONENT
   File: src/components/ui/Badge.tsx

   Small label chip used across the site for:
   - Tech tags on service cards and case study cards
   - Blog post category labels
   - Process step indicators
   - "New" / "Featured" highlights

   Three visual variants:
   'gold'  → Default. Gold dim bg, gold text, gold border.
             Used for tech tags, featured labels.
   'teal'  → Teal dim bg, teal text.
             Used for success states, process step numbers.
   'mono'  → Dark subtle bg, muted text.
             Used for neutral labels (read time, industry).

   Two sizes:
   'sm'  → 10px text — default. Tight chip inside cards.
   'md'  → 11px text — slightly larger, used in headings.

   No interactivity by default — pure display component.
   For clickable filter badges, wrap in a <button>.
================================================================ */

import { cn }           from '@/lib/utils'
import type { BadgeProps } from '@/types'


/* ── VARIANT MAP ─────────────────────────────────────────────── */

const variantClasses = {
  gold: [
    'bg-gold-dim',
    'text-gold-light',
    'border border-gold-border',
  ].join(' '),

  teal: [
    'bg-teal-dim',
    'text-teal-light',
    'border border-teal-border',
  ].join(' '),

  mono: [
    'bg-white/[0.04]',
    'text-text-3',
    'border border-border-subtle',
  ].join(' '),
} as const


/* ── SIZE MAP ────────────────────────────────────────────────── */

const sizeClasses = {
  sm: 'px-2.5 py-1   text-[10px]',
  md: 'px-3.5 py-1.5 text-[11px]',
} as const


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Badge({
  children,
  variant   = 'gold',
  size      = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        /* Layout */
        'inline-flex items-center gap-1',
        /* Shape */
        'rounded-[3px]',
        /* Typography — DM Mono, uppercase, spaced */
        'font-mono font-medium',
        'tracking-[0.10em] uppercase',
        'leading-none whitespace-nowrap',
        /* Size */
        sizeClasses[size],
        /* Variant */
        variantClasses[variant],
        /* Override */
        className,
      )}
    >
      {children}
    </span>
  )
}


/* ── BADGE LIST ──────────────────────────────────────────────── */
/*
 * Convenience wrapper that renders an array of string tags
 * as a row of Badges. Used on service cards and case studies.
 *
 * Usage:
 *   <BadgeList tags={['Next.js', 'Stripe', 'PostgreSQL']} />
 *   <BadgeList tags={service.tags} variant="teal" />
 */

interface BadgeListProps {
  tags:       string[]
  variant?:   BadgeProps['variant']
  size?:      BadgeProps['size']
  className?: string
  /** Max number of badges to show before "+N more" label */
  maxVisible?: number
}

export function BadgeList({
  tags,
  variant     = 'gold',
  size        = 'sm',
  className,
  maxVisible,
}: BadgeListProps) {
  const visible  = maxVisible ? tags.slice(0, maxVisible) : tags
  const overflow = maxVisible ? tags.length - maxVisible : 0

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5',
        className,
      )}
    >
      {visible.map(tag => (
        <Badge key={tag} variant={variant} size={size}>
          {tag}
        </Badge>
      ))}

      {overflow > 0 && (
        <Badge variant="mono" size={size}>
          +{overflow}
        </Badge>
      )}
    </div>
  )
}