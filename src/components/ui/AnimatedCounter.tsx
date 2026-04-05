/* ================================================================
   ELVATRIXA — ANIMATED COUNTER
   File: src/components/ui/AnimatedCounter.tsx

   FIX: Counter was stuck at 0.
   Root cause: the `hasRun` state check inside the useEffect
   dependency array was preventing the observer from ever
   reconnecting after the initial render. Also, on fast
   connections the element may already be in view before the
   observer fires — added an immediate check on mount.

   Also respects prefers-reduced-motion by jumping to final value.
================================================================ */

'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, easeOutQuart, clamp }     from '@/lib/utils'
import type { AnimatedCounterProps }   from '@/types'


export default function AnimatedCounter({
  value,
  suffix   = '',
  prefix   = '',
  duration = 1800,
  className,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value) /* Start at actual value — no zero flash on SSR */
  const hasRun       = useRef(false)        /* ref not state — avoids re-render loop */
  const ref          = useRef<HTMLSpanElement>(null)
  const rafRef       = useRef<number | null>(null)
  /* Read prefers-reduced-motion in a ref (never on server) */
  const prefersReduced = useRef(false)

  function runAnimation() {
    if (hasRun.current) return
    hasRun.current = true

    /* Reduced motion — jump straight to final value */
    if (prefersReduced.current) {
      setDisplay(value)
      return
    }

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed  = now - start
      const progress = clamp(elapsed / duration, 0, 1)
      const eased    = easeOutQuart(progress)
      const current  = Math.round(eased * value)

      setDisplay(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(value) /* Guarantee exact final value — no float rounding */
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* Read prefers-reduced-motion on the client (safe here — inside useEffect) */
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Shared cleanup — reset hasRun so StrictMode remount works correctly */
    const cleanup = () => {
      hasRun.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    /* Check immediately — element may already be visible on fast connections */
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      runAnimation()
      return cleanup
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)

    return () => {
      cleanup()
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) /* Empty deps — intentional, runAnimation uses ref not state */

  return (
    <span
      ref={ref}
      className={cn('tabular-nums', className)}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}{display}{suffix}
    </span>
  )
}