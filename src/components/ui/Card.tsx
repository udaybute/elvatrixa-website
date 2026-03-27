/* ================================================================
   ELVATRIXA — CARD COMPONENT
   File: src/components/ui/Card.tsx

   Base card component with three visual variants.
   All page-level cards (service, case study, testimonial,
   process step) are built on top of this base.

   Variants:
   'dark'     → bg-3 + subtle border → hover lifts + gold border
                Default. Used for service cards, why-elvatrixa.
   'elevated' → bg-4 + medium border → hover lifts slightly
                Used for testimonial cards, step cards.
   'outline'  → Transparent + gold border → hover fills gold-glow
                Used for pricing tiers, featured highlights.

   The `hover` prop (default true) enables the lift/border
   transition. Pass `hover={false}` for static cards (e.g.
   inside a selected/active state that should not re-animate).

   The `topBorder` prop adds the 3px gold accent along the top
   edge — matching the service card spec in the master plan.
================================================================ */

import { cn } from '@/lib/utils'


/* ── TYPES ───────────────────────────────────────────────────── */

interface CardProps {
  children:    React.ReactNode
  variant?:    'dark' | 'elevated' | 'outline'
  hover?:      boolean
  topBorder?:  boolean
  padding?:    'none' | 'sm' | 'md' | 'lg'
  className?:  string
  /** Forward any HTML div props (e.g. onClick, role, aria-*) */
  [key: string]: unknown
}


/* ── VARIANT MAP ─────────────────────────────────────────────── */

const variantBase = {
  dark: [
    'bg-navy-3',
    'border border-border-subtle',
    'rounded-lg',
  ].join(' '),

  elevated: [
    'bg-navy-4',
    'border border-border-medium',
    'rounded-lg',
  ].join(' '),

  outline: [
    'bg-transparent',
    'border border-gold-border',
    'rounded-lg',
  ].join(' '),
} as const


const variantHover = {
  dark: [
    'transition-[border-color,transform,box-shadow]',
    'duration-normal ease-luxury',
    'hover:border-gold-border',
    'hover:-translate-y-1',
    'hover:shadow-card-hover',
  ].join(' '),

  elevated: [
    'transition-[border-color,transform]',
    'duration-normal ease-luxury',
    'hover:border-gold-border',
    'hover:-translate-y-0.5',
  ].join(' '),

  outline: [
    'transition-[background,border-color]',
    'duration-normal ease-luxury',
    'hover:bg-gold-glow',
    'hover:border-gold',
  ].join(' '),
} as const


/* ── PADDING MAP ─────────────────────────────────────────────── */

const paddingMap = {
  none: '',
  sm:   'p-5',
  md:   'p-7',
  lg:   'p-9',
} as const


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Card({
  children,
  variant    = 'dark',
  hover      = true,
  topBorder  = false,
  padding    = 'md',
  className,
  ...rest
}: CardProps) {

  /* Extract only valid HTML div attributes */
  const {
    onClick, role, tabIndex, 'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy, id, style,
  } = rest as React.HTMLAttributes<HTMLDivElement>

  return (
    <div
      id={id}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      style={style}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      className={cn(
        /* Base variant styles */
        variantBase[variant],

        /* Optional gold top border — 3px, service card spec */
        topBorder && 'border-t-[3px] border-t-gold',

        /* Padding */
        paddingMap[padding],

        /* Hover interactions */
        hover && variantHover[variant],

        /* Cursor hint when card is interactive */
        onClick && 'cursor-pointer',

        className,
      )}
    >
      {children}
    </div>
  )
}


/* ── CARD HEADER ─────────────────────────────────────────────── */
/*
 * Optional sub-component for consistent card headers:
 * icon + title + optional badge in a flex row.
 *
 * Usage:
 *   <CardHeader icon={<Settings2 />} title="SaaS Development" />
 */

interface CardHeaderProps {
  icon?:      React.ReactNode
  title:      string
  badge?:     React.ReactNode
  className?: string
}

export function CardHeader({ icon, title, badge, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-4', className)}>
      {/* Icon container */}
      {icon && (
        <div
          className={[
            'shrink-0 flex items-center justify-center',
            'w-11 h-11 rounded-md',
            'bg-gold-dim border border-gold-border',
            'text-gold',
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h3
        className={[
          'flex-1',
          'font-mono font-medium',
          'text-base text-text-1',
          'leading-snug',
        ].join(' ')}
      >
        {title}
      </h3>

      {/* Optional badge slot */}
      {badge && <div className="shrink-0">{badge}</div>}
    </div>
  )
}


/* ── CARD BODY ───────────────────────────────────────────────── */
/*
 * Consistent body text wrapper inside cards.
 */

interface CardBodyProps {
  children:   React.ReactNode
  className?: string
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn(
        'font-body text-sm text-text-3 leading-relaxed',
        className,
      )}
    >
      {children}
    </div>
  )
}


/* ── CARD FOOTER ─────────────────────────────────────────────── */
/*
 * Footer row — typically contains a ghost button or tags.
 * Adds a subtle top border to visually separate from body.
 */

interface CardFooterProps {
  children:   React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'mt-5 pt-4',
        'border-t border-border-subtle',
        'flex items-center justify-between gap-3',
        className,
      )}
    >
      {children}
    </div>
  )
}
