'use client'

import { cn } from '@/lib/utils'
import type { SectionHeadingProps } from '@/types'

/*
  SectionHeading — used at the top of every homepage section.
  
  Renders:
  1. Gold accent line
  2. DM Mono uppercase label (e.g. "What we build")
  3. Cormorant Garamond display heading
  4. Optional Lato subheading paragraph
  
  Usage:
    <SectionHeading
      label="What we build"
      heading="End-to-End Digital Solutions"
      subheading="From concept to scale..."
      align="center"
      gradient
    />
*/
export default function SectionHeading({
  label,
  heading,
  subheading,
  align = 'left',
  gradient = false,
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const isRight  = align === 'right'

  return (
    <div
      className={cn(
        'max-w-3xl',
        isCenter && 'mx-auto text-center',
        isRight  && 'ml-auto text-right',
        className,
      )}
    >
      {/* ── Gold line + label ── */}
      {label && (
        <div
          className={cn(
            'flex items-center gap-3 mb-4',
            isCenter && 'justify-center',
            isRight  && 'justify-end',
          )}
        >
          {/* Gold accent line — fades in the direction of text */}
          <span
            className="block h-px w-8 flex-shrink-0"
            style={{
              background: isRight
                ? 'linear-gradient(270deg, var(--gold), transparent)'
                : 'linear-gradient(90deg, var(--gold), transparent)',
            }}
          />
          <span className="section-label">{label}</span>
          {isCenter && (
            <span
              className="block h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(270deg, var(--gold), transparent)' }}
            />
          )}
        </div>
      )}

      {/* ── Main heading ── */}
      <h2
        className={cn(
          'font-display font-bold leading-[1.0] tracking-[-0.025em]',
          'text-display',           /* clamp(36px → 60px) from tailwind config */
          gradient
            ? 'text-gold-gradient' /* 3-stop gold gradient defined in globals.css */
            : 'text-text-1',
        )}
      >
        {heading}
      </h2>

      {/* ── Optional subheading ── */}
      {subheading && (
        <p
          className={cn(
            'mt-5 text-text-3 font-body leading-relaxed',
            'text-base md:text-lg',
            'max-w-2xl',
            isCenter && 'mx-auto',
            isRight  && 'ml-auto',
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}