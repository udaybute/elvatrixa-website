/* ================================================================
   ELVATRIXA — BUTTON COMPONENT
   File: src/components/ui/Button.tsx

   FIX: Removed Loader2 import from lucide-react (breaks on v1.6.0).
   Replaced with an inline SVG spinner — identical appearance.
   Zero lucide-react imports.
================================================================ */

'use client'

import Link               from 'next/link'
import { cn }             from '@/lib/utils'
import type { ButtonProps } from '@/types'


/* ── INLINE SPINNER ──────────────────────────────────────────── */
/* Replaces lucide Loader2 — identical look, zero dependency.    */

function Spinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}


/* ── SIZE MAP ────────────────────────────────────────────────── */

const sizeClasses = {
  sm: 'h-9  px-4  text-xs  gap-1.5',
  md: 'h-11 px-6  text-sm  gap-2',
  lg: 'h-13 px-8  text-base gap-2.5',
} as const


/* ── VARIANT MAP ─────────────────────────────────────────────── */

const variantClasses = {
  primary: [
    'relative overflow-hidden',
    'bg-gold text-navy-0',
    'border border-gold',
    'font-body font-bold tracking-wide',
    'rounded-none',
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-transparent',
    'before:via-white/20 before:to-transparent',
    'before:-translate-x-full',
    'before:transition-transform before:duration-500',
    'hover:bg-gold-light hover:border-gold-light',
    'hover:before:translate-x-full',
    'hover:shadow-gold-lg',
    'active:scale-[0.98]',
    'transition-all duration-normal ease-luxury',
  ].join(' '),

  secondary: [
    'bg-transparent',
    'border border-gold-border',
    'text-gold',
    'font-body font-bold tracking-wide',
    'rounded-sm',
    'hover:bg-gold-dim',
    'hover:border-gold',
    'hover:text-gold-light',
    'hover:shadow-gold-sm',
    'active:scale-[0.98]',
    'transition-all duration-normal ease-luxury',
  ].join(' '),

  ghost: [
    'bg-transparent border-b border-transparent',
    'text-text-3',
    'font-body font-normal',
    'rounded-none px-0',
    'hover:text-gold',
    'hover:border-gold-border',
    'transition-colors duration-normal',
  ].join(' '),
} as const


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  href,
  external = false,
  disabled = false,
  loading  = false,
  iconRight,
  iconLeft,
  onClick,
  type     = 'button',
  className,
}: ButtonProps) {

  const spinnerSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 15

  const classes = cn(
    'inline-flex items-center justify-center whitespace-nowrap select-none outline-none',
    sizeClasses[size],
    variantClasses[variant],
    (disabled || loading) && 'opacity-50 pointer-events-none cursor-not-allowed',
    className,
  )

  const content = (
    <>
      {iconLeft && !loading && <span className="shrink-0 -ml-0.5">{iconLeft}</span>}
      {loading && <Spinner size={spinnerSize} />}
      <span>{children}</span>
      {iconRight && !loading && <span className="shrink-0 -mr-0.5">{iconRight}</span>}
    </>
  )

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-disabled={disabled || loading}>
        {content}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled || loading} tabIndex={disabled || loading ? -1 : undefined}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
    >
      {content}
    </button>
  )
}