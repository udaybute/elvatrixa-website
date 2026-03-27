'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children:   ReactNode
  className?: string
  /** Extra stagger delay class e.g. 'reveal-delay-2' */
  delay?:     string
  /** Variant: 'up' (default) | 'left' | 'scale' */
  variant?:   'up' | 'left' | 'scale'
  /** IntersectionObserver threshold — default 0.15 */
  threshold?: number
  /** Only reveal once — default true */
  once?:      boolean
}

/*
  ScrollReveal — wraps any content and adds a fade-in-up animation
  when the element scrolls into the viewport.

  Uses IntersectionObserver (not scroll events) for performance.
  Adds the CSS class `.visible` which triggers transitions defined
  in globals.css (.reveal, .reveal-left, .reveal-scale).

  Usage:
    <ScrollReveal delay="reveal-delay-2">
      <ServiceCard ... />
    </ScrollReveal>
*/
export default function ScrollReveal({
  children,
  className,
  delay,
  variant  = 'up',
  threshold = 0.15,
  once      = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Map variant to the CSS class defined in globals.css
  const baseClass = variant === 'left'
    ? 'reveal-left'
    : variant === 'scale'
      ? 'reveal-scale'
      : 'reveal'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={cn(baseClass, delay, className)}
    >
      {children}
    </div>
  )
}