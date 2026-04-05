'use client'
/* ================================================================
   ELVATRIXA — TECH STACK (v3 — Asymmetric Premium)
   File: src/components/sections/TechStack.tsx

   Architecture:
   ┌──────────────────────────────────────────────────────────────┐
   │  TechStack (section shell)                                   │
   │    └─ TechCategory (category group)                          │
   │         └─ TechCard (individual item — icon + 3D hover)      │
   └──────────────────────────────────────────────────────────────┘

   Layout — Asymmetric CSS Grid:
   ─────────────────────────────
   • Base grid: grid-cols-2 sm:grid-cols-4 lg:grid-cols-6
   • Large cards  (React, Next.js, Spring Boot): col-span-2, row-span-2
     → Appear as prominent anchor points within the grid
   • Medium cards (AWS): col-span-2, row-span-1
     → Wider emphasis card without extra height
   • Normal cards: col-span-1
   • grid-auto-flow: dense fills gaps naturally, creating the
     asymmetric feel without manual placement

   3D Hover — Cursor Tracking via requestAnimationFrame:
   ────────────────────────────────────────────────────
   1. mouseenter → disable CSS transition (instant cursor response)
   2. mousemove  → RAF-batched; normalises cursor to [-1,+1];
                   applies rotateX/Y (±10°) + scale3d(1.04);
                   dynamic radial glow follows cursor position
   3. mouseleave → re-enable spring ease (cubic-bezier 0.23,1,0.32,1);
                   reset transform + fade glow; restore original border
   4. Touch     → isTouchDevice skips all 3D; framer-motion
                   whileHover scale handles mobile interaction

   Entrance Animation — framer-motion:
   ────────────────────────────────────
   • staggerChildren: 0.05s between cards in each category
   • Each card: opacity 0→1, translateY 20→0, duration 0.5s
   • whileInView (once) triggers per category row entering viewport
================================================================ */

import React, { useRef, useCallback, useMemo } from 'react'
import { motion, type Variants }                from 'framer-motion'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiVuedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiSpring,
  SiDotnet,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
}                                               from 'react-icons/si'
import { FaJava, FaAws }                        from 'react-icons/fa'
import ScrollReveal                             from '@/components/ui/ScrollReveal'


/* ── Types ───────────────────────────────────────────────────── */

type IconComp = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>

/** 'large' = col-span-2 row-span-2 | 'medium' = col-span-2 | 'normal' = col-span-1 */
type CardSize = 'large' | 'medium' | 'normal'

interface TechItem {
  name:     string
  size?:    CardSize   // defaults to 'normal'
  caption?: string     // tagline shown on large/medium cards only
}

interface CategoryData {
  category: string
  items:    TechItem[]
  accent:   string   // brand colour for this category's accents
  glow:     string   // rgba of accent at low opacity
}


/* ── Brand icon + colour registry ───────────────────────────── */
/* Official brand colours sourced from each brand's press kit.   */

interface TechConfig { Icon: IconComp; color: string }

const TECH_CONFIG: Record<string, TechConfig> = {
  'React':        { Icon: SiReact,          color: '#61DAFB' },
  'Next.js':      { Icon: SiNextdotjs,      color: '#FFFFFF' },
  'TypeScript':   { Icon: SiTypescript,     color: '#3178C6' },
  'Vue.js':       { Icon: SiVuedotjs,       color: '#42B883' },
  'Tailwind CSS': { Icon: SiTailwindcss,    color: '#06B6D4' },
  'Node.js':      { Icon: SiNodedotjs,      color: '#68A063' },
  'Java':         { Icon: FaJava,           color: '#5382A1' },
  'Spring Boot':  { Icon: SiSpring,         color: '#6DB33F' },
  '.NET':         { Icon: SiDotnet,         color: '#512BD4' },
  'Python':       { Icon: SiPython,         color: '#3776AB' },
  'GraphQL':      { Icon: SiGraphql,        color: '#E10098' },
  'PostgreSQL':   { Icon: SiPostgresql,     color: '#336791' },
  'MySQL':        { Icon: SiMysql,          color: '#4479A1' },
  'MongoDB':      { Icon: SiMongodb,        color: '#47A248' },
  'AWS':          { Icon: FaAws,            color: '#FF9900' },
  'Docker':       { Icon: SiDocker,         color: '#2496ED' },
  'Kubernetes':   { Icon: SiKubernetes,     color: '#326CE5' },
  'CI/CD':        { Icon: SiGithubactions,  color: '#2088FF' },
}

/* Letter fallback for brands without a react-icons entry */
function LetterIcon({ name, color }: { name: string; color: string }) {
  const initials = name.replace(/[^A-Z0-9]/gi, ' ').split(' ')
    .filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '26px', height: '26px', borderRadius: '6px',
        background: `${color}20`, border: `1px solid ${color}40`,
        fontFamily: 'monospace', fontSize: '11px', fontWeight: 700,
        color, letterSpacing: '-0.02em', flexShrink: 0,
      }}
    >
      {initials}
    </span>
  )
}


/* ── Tech Stack Data ─────────────────────────────────────────── */
/* Structured dataset — UI is built by mapping, nothing hardcoded */

const TECH_DATA: CategoryData[] = [
  {
    category: 'Frontend',
    accent:   '#C9A84C',
    glow:     'rgba(201,168,76,0.18)',
    items: [
      { name: 'React',        size: 'large',  caption: 'UI component library'  },
      { name: 'Next.js',      size: 'large',  caption: 'Full-stack framework'  },
      { name: 'TypeScript'                                                      },
      { name: 'Vue.js'                                                          },
      { name: 'Tailwind CSS'                                                    },
    ],
  },
  {
    category: 'Backend',
    accent:   '#2DD4BC',
    glow:     'rgba(45,212,188,0.15)',
    items: [
      { name: 'Spring Boot',  size: 'large',  caption: 'Enterprise Java'       },
      { name: 'Node.js'                                                         },
      { name: 'Java'                                                            },
      { name: '.NET'                                                            },
      { name: 'C#'                                                              },
      { name: 'Python'                                                          },
    ],
  },
  {
    category: 'Architecture',
    accent:   '#A78BFA',
    glow:     'rgba(167,139,250,0.15)',
    items: [
      { name: 'Microservices' },
      { name: 'REST APIs'     },
      { name: 'GraphQL'       },
    ],
  },
  {
    category: 'Database',
    accent:   '#79B8FF',
    glow:     'rgba(121,184,255,0.15)',
    items: [
      { name: 'PostgreSQL' },
      { name: 'MySQL'      },
      { name: 'MongoDB'    },
    ],
  },
  {
    category: 'DevOps & Cloud',
    accent:   '#F59E0B',
    glow:     'rgba(245,158,11,0.15)',
    items: [
      { name: 'AWS',        size: 'medium',  caption: 'Cloud infrastructure'   },
      { name: 'Docker'                                                          },
      { name: 'Kubernetes'                                                      },
      { name: 'CI/CD'                                                           },
    ],
  },
]


/* ── framer-motion variants ──────────────────────────────────── */

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}


/* ── TechCard ────────────────────────────────────────────────── */
/*
  3D cursor-tracking tilt — full breakdown:

  handleMouseEnter: Remove CSS transition so tilt responds to cursor
    instantly without animation lag.

  handleMouseMove (RAF-batched):
    1. Capture clientX/Y (stale closure-safe before async RAF)
    2. Normalise cursor to [-1, +1] relative to card center
    3. Map to rotateX = -ny * 10°, rotateY = nx * 10°  (±10° max)
    4. Apply perspective(900px) rotateX rotateY scale3d(1.04)
    5. Update radial-gradient glow to follow cursor (specular reflection)

  handleMouseLeave:
    1. cancelAnimationFrame to kill orphan RAF loops
    2. Re-enable transition: 0.7s cubic-bezier spring ease
    3. Reset transform to identity, fade glow to opacity 0
    4. Restore original border-color / box-shadow

  isTouchDevice guard: if matchMedia('(pointer: coarse)'), all 3D
    handlers return early. framer-motion whileHover handles scale.
*/

interface TechCardProps {
  name:    string
  size:    CardSize
  caption: string | undefined
  accent:  string
  glow:    string
  baseBg:  string   // base background for this card
}

function TechCard({ name, size, caption, accent, glow, baseBg }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const rafRef  = useRef<number | null>(null)

  const isTouchDevice = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  )

  const cfg     = TECH_CONFIG[name]
  const color   = cfg?.color ?? accent
  const isLarge = size === 'large'

  /* --- span classes for the motion.div wrapper --- */
  const spanClass =
    size === 'large'  ? 'col-span-2 row-span-2' :
    size === 'medium' ? 'col-span-2'             :
    'col-span-1'

  /* --- base card styles (non-hover) --- */
  const baseStyle: React.CSSProperties = {
    background:           baseBg,
    border:               `1px solid ${isLarge ? color + '28' : 'rgba(255,255,255,0.07)'}`,
    backdropFilter:       'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow:            isLarge
      ? `0 4px 24px rgba(0,0,0,0.28), 0 0 0 1px ${color}18, inset 0 1px 0 rgba(255,255,255,0.07)`
      : '0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
    willChange:           'transform',
    transformStyle:       'preserve-3d',
    transition:           'transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.3s ease',
    outlineColor:         accent,
  }

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return
    /* Hover visual state — applies on both touch and mouse */
    cardRef.current.style.borderColor = `${accent}55`
    cardRef.current.style.boxShadow   = `0 8px 36px rgba(0,0,0,0.35), 0 0 0 1px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.10)`
    /* 3D only on fine-pointer devices */
    if (isTouchDevice) return
    cardRef.current.style.transition  = 'none'
  }, [isTouchDevice, accent])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return
      const cx = e.clientX, cy = e.clientY
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current
        if (!card) return
        const r  = card.getBoundingClientRect()
        /* Normalise cursor position to [-1, +1] */
        const nx =  ((cx - r.left) / r.width  - 0.5) * 2
        const ny =  ((cy - r.top)  / r.height - 0.5) * 2
        /* ±10° rotation — premium, not gimmicky */
        const ry =  nx * 10
        const rx = -ny * 10
        card.style.transform =
          `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.04,1.04,1.04)`
        /* Specular reflection glow follows cursor */
        if (glowRef.current) {
          const px = ((cx - r.left) / r.width)  * 100
          const py = ((cy - r.top)  / r.height) * 100
          glowRef.current.style.background =
            `radial-gradient(circle at ${px}% ${py}%, ${color}3A 0%, transparent 60%)`
          glowRef.current.style.opacity = '1'
        }
      })
    },
    [isTouchDevice, color],
  )

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (!cardRef.current) return
    /* Spring ease reset */
    cardRef.current.style.transition  =
      'transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.3s ease'
    cardRef.current.style.transform   =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    /* Restore base border/shadow */
    cardRef.current.style.borderColor =
      isLarge ? `${color}28` : 'rgba(255,255,255,0.07)'
    cardRef.current.style.boxShadow   = isLarge
      ? `0 4px 24px rgba(0,0,0,0.28), 0 0 0 1px ${color}18, inset 0 1px 0 rgba(255,255,255,0.07)`
      : '0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [isLarge, color])

  return (
    /*
      motion.div = animation wrapper (entrance stagger only)
      inner div  = visual card + 3D tilt surface (has the ref)
      group class on inner div lets Tailwind group-hover: work on children
    */
    <motion.div variants={cardVariants} className={spanClass}>
      <div
        ref={cardRef}
        className="group relative h-full flex flex-col items-center justify-center gap-2 rounded-xl cursor-default select-none focus-visible:outline-none focus-visible:ring-2"
        style={{
          ...baseStyle,
          padding:   isLarge ? 'clamp(20px,3vw,32px) 20px' : '16px 12px',
          minHeight: isLarge ? '0' : '88px',
        }}
        role="listitem"
        aria-label={name}
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {/* Cursor-following radial glow (specular reflection layer) */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, borderRadius: '11px',
            opacity: 0, transition: 'opacity 0.35s ease',
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* Ambient radial glow behind large cards */}
        {isLarge && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: '-1px', borderRadius: '12px',
              background: `radial-gradient(ellipse at 50% 100%, ${color}12 0%, transparent 70%)`,
              pointerEvents: 'none', zIndex: 0,
            }}
          />
        )}

        {/* Top accent hairline: scale-x 0→1 on hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}bb, transparent)` }}
        />

        {/*
          Icon — translateZ(14px) lifts it above the card plane in 3D space.
          Opacity & filter managed via Tailwind group-hover (no JS re-renders).
        */}
        <div
          aria-hidden="true"
          className="relative z-10 flex items-center justify-center"
          style={{ transform: 'translateZ(14px)', transition: 'transform 0.3s ease' }}
        >
          {cfg?.Icon ? (
            <cfg.Icon
              size={isLarge ? 42 : 26}
              style={{ color }}
              className="opacity-45 group-hover:opacity-100 transition-[opacity,filter] duration-300"
            />
          ) : (
            <LetterIcon name={name} color={color} />
          )}
        </div>

        {/* Name — translateZ(8px) gives slight depth separation from icon */}
        <span
          className={[
            'relative z-10 font-mono text-center leading-snug',
            'text-white/30 group-hover:text-white/80 transition-colors duration-300',
          ].join(' ')}
          style={{
            fontSize:      isLarge ? '12px' : '10px',
            fontWeight:    isLarge ? 600 : 500,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            transform:     'translateZ(8px)',
          }}
        >
          {name}
        </span>

        {/* Caption — large/medium cards only */}
        {caption && (size === 'large' || size === 'medium') && (
          <span
            className="relative z-10 font-body text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              fontSize:      '10px',
              color:         `${color}90`,
              letterSpacing: '0.03em',
              transform:     'translateZ(6px)',
              marginTop:     '2px',
              lineHeight:    1.3,
            }}
          >
            {caption}
          </span>
        )}
      </div>
    </motion.div>
  )
}


/* ── TechCategory ────────────────────────────────────────────── */
/*
  Renders a labelled row for one technology category.
  The card grid uses:
  - grid-cols-2 (mobile)  → sm:grid-cols-4 (tablet) → lg:grid-cols-6 (desktop)
  - gridAutoFlow: 'dense' fills gaps around 2×2 large cards automatically
  - gridAutoRows: '88px'  gives row height baseline for row-span-2 calculation
*/

function TechCategory({ category, items, accent, glow, index }: CategoryData & { index: number }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8"
      style={{ paddingTop: '24px', paddingBottom: '24px' }}
    >
      {/* Category label */}
      <div
        className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-2 flex-shrink-0 sm:pt-1"
        style={{ width: 'clamp(120px, 12vw, 156px)' }}
      >
        <div className="flex items-center gap-2">
          {/* Pulsing accent dot */}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block', width: '6px', height: '6px',
              borderRadius: '50%', background: accent, flexShrink: 0,
              boxShadow: `0 0 8px ${accent}99, 0 0 16px ${accent}44`,
            }}
          />
          <span
            className="font-mono"
            style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <span
          className="font-mono font-semibold"
          style={{ fontSize: '11px', letterSpacing: '0.08em', color: accent, textTransform: 'uppercase' }}
        >
          {category}
        </span>
      </div>

      {/* Asymmetric card grid */}
      <motion.div
        className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6"
        style={{
          gap:           '8px',
          /*
            dense auto-flow: browser fills gaps left by large cards,
            creating the asymmetric visual imbalance we want.
          */
          gridAutoFlow:  'dense',
          /*
            fixed row height so row-span-2 cards = exactly 2×88+8 = 184px tall.
          */
          gridAutoRows:  '88px',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        role="list"
        aria-label={`${category} technologies`}
      >
        {items.map((tech) => {
          const size    = tech.size ?? 'normal'
          const isLarge = size === 'large'
          /* Featured cards get a subtle gradient background */
          const baseBg  = isLarge
            ? `linear-gradient(135deg, ${tech.caption ? TECH_CONFIG[tech.name]?.color ?? accent : accent}0D 0%, rgba(255,255,255,0.025) 100%)`
            : 'rgba(255,255,255,0.025)'

          return (
            <TechCard
              key={tech.name}
              name={tech.name}
              size={size}
              caption={tech.caption}
              accent={accent}
              glow={glow}
              baseBg={baseBg}
            />
          )
        })}
      </motion.div>
    </div>
  )
}


/* ── TechStack (Section) ─────────────────────────────────────── */

export default function TechStack() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: '#0A1628' }}
      aria-label="Technologies we work with"
    >
      {/* Gold top hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.75) 50%, rgba(201,168,76,0.3) 70%, transparent 100%)',
        }}
      />

      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,168,76,0.045) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Ambient glow — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.055) 0%, transparent 62%)' }}
      />

      {/* "STACK" outline watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/2 -right-6 -translate-y-1/2 font-bold"
        style={{
          fontSize:         'clamp(110px, 15vw, 230px)',
          color:            'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.04)',
          lineHeight:       1,
          letterSpacing:    '-0.04em',
        }}
      >
        STACK
      </div>

      <div className="section-container relative z-10">

        {/* ── Section header ─────────────────────────────────── */}
        <ScrollReveal className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              aria-hidden="true"
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.55), transparent)' }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(201,168,76,0.75)' }}
            >
              Our Stack
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2
              className="font-display font-bold"
              style={{
                fontSize:      'clamp(30px, 4vw, 52px)',
                color:         '#F8F9FC',
                lineHeight:    1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Technologies We{' '}
              <span className="text-gold-gradient">Master</span>
            </h2>
            <p
              className="font-body text-[14px] leading-relaxed lg:max-w-[300px] lg:text-right"
              style={{ color: 'rgba(255,255,255,0.36)' }}
            >
              Modern, battle-tested tools chosen for performance and
              scalability — not trend. Every technology earns its place.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Category grid container ────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border:     '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.012)',
          }}
        >
          <div className="px-5 lg:px-8">
            {TECH_DATA.map((cat, i) => (
              <React.Fragment key={cat.category}>
                <TechCategory
                  category={cat.category}
                  items={cat.items}
                  accent={cat.accent}
                  glow={cat.glow}
                  index={i}
                />
                {i < TECH_DATA.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      height:     '1px',
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.055) 20%, rgba(255,255,255,0.055) 80%, transparent 100%)',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Bottom stat strip ──────────────────────────────── */}
        <ScrollReveal className="mt-8">
          <div
            className="flex flex-wrap items-center justify-between gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex flex-wrap items-center gap-8">
              {[
                { num: '5+',   label: 'Languages mastered'  },
                { num: '20+',  label: 'Technologies in use'  },
                { num: '100%', label: 'Modern toolchain'     },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col gap-[5px]">
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: '26px', color: '#C9A84C', lineHeight: 1 }}
                  >
                    {num}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="btn-primary text-sm"
              aria-label="Discuss your tech stack requirements"
            >
              Discuss Your Stack
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
