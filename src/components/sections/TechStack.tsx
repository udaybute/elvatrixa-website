'use client'
/* ================================================================
   ELVATRIXA — TECH STACK
   File: src/components/sections/TechStack.tsx

   Architecture: 3 modular sub-components
   ┌──────────────────────────────────────────────────────────────┐
   │  TechStack (section shell)                                   │
   │    └─ TechCategory (category row — label + card grid)        │
   │         └─ TechCard (individual tech — icon + name + 3D)     │
   └──────────────────────────────────────────────────────────────┘

   Animation system:
   1. Entrance: framer-motion whileInView + staggerChildren
      - Each category row fades+slides up (translateY 24px → 0)
      - Cards stagger 0.06s apart within each row
   2. Hover: 3D cursor-tracking tilt via requestAnimationFrame
      - rotateX / rotateY capped at ±8° (subtle, premium)
      - `transition: none` during move → spring ease on leave
      - Dynamic radial gradient follows cursor (reflection effect)
      - GPU composited: only transform + opacity animated
   3. Mobile: 3D tilt disabled via CSS @media, replaced with
      simple framer-motion scale + shadow lift

   Icon strategy:
   - react-icons/si (Simple Icons) for all major brand icons
   - LetterIcon fallback for brands without a Simple Icon entry
   - Icons are dimmed (opacity 0.45) by default, full color on hover

   Performance:
   - willChange: 'transform' on each card
   - cancelAnimationFrame on mouse leave to prevent orphan frames
   - No layout shifts — cards use fixed aspect ratio

   Section color: dark navy #0A1628
   Sits between light Testimonials and dark CTA — provides contrast.
================================================================ */

import React, { useRef, useCallback, useMemo } from 'react'
import { motion }                               from 'framer-motion'
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiStripe,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiRedis,
  SiVercel,
  SiCloudflare,
  SiDocker,
  SiGithub,
  SiOpenai,
  SiShopify,
  SiGoogleanalytics,
  SiFigma,
  SiSanity,
} from 'react-icons/si'
import { FaAws }                                from 'react-icons/fa'
import { techStack, type TechCategory }         from '@/data/techStack'
import ScrollReveal                             from '@/components/ui/ScrollReveal'


/* ── Brand icon + color registry ────────────────────────────── */
/*
  Maps each tech name to its official brand icon (react-icons/si)
  and hex color. Icons with no Simple Icons entry use LetterIcon.
  Colors sourced from each brand's official press kit.
*/
type IconComp = React.ComponentType<{ size?: number; style?: React.CSSProperties }>

interface TechConfig { Icon: IconComp; color: string }

const TECH_CONFIG: Record<string, TechConfig> = {
  'Next.js':          { Icon: SiNextdotjs,          color: '#FFFFFF'  },
  'React':            { Icon: SiReact,               color: '#61DAFB'  },
  'TypeScript':       { Icon: SiTypescript,          color: '#3178C6'  },
  'Tailwind CSS':     { Icon: SiTailwindcss,         color: '#06B6D4'  },
  'Framer Motion':    { Icon: SiFramer,              color: '#0055FF'  },
  'Node.js':          { Icon: SiNodedotjs,           color: '#68A063'  },
  'Python':           { Icon: SiPython,              color: '#3776AB'  },
  'Stripe':           { Icon: SiStripe,              color: '#635BFF'  },
  'PostgreSQL':       { Icon: SiPostgresql,          color: '#336791'  },
  'Supabase':         { Icon: SiSupabase,            color: '#3ECF8E'  },
  'MongoDB':          { Icon: SiMongodb,             color: '#47A248'  },
  'Redis':            { Icon: SiRedis,               color: '#DC382D'  },
  'Vercel':           { Icon: SiVercel,              color: '#FFFFFF'  },
  'AWS':              { Icon: FaAws,                 color: '#FF9900'  },
  'Cloudflare':       { Icon: SiCloudflare,          color: '#F38020'  },
  'Docker':           { Icon: SiDocker,              color: '#2496ED'  },
  'GitHub':           { Icon: SiGithub,              color: '#FFFFFF'  },
  'OpenAI':           { Icon: SiOpenai,              color: '#74AA9C'  },
  'Shopify':          { Icon: SiShopify,             color: '#96BF48'  },
  'Sanity':           { Icon: SiSanity,              color: '#F03E2F'  },
  'Google Analytics': { Icon: SiGoogleanalytics,     color: '#E37400'  },
  'Figma':            { Icon: SiFigma,               color: '#F24E1E'  },
}

/* Letter fallback for brands without a Simple Icon */
function LetterIcon({ name, color }: { name: string; color: string }) {
  const initials = name.split(/[\s.]+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <span
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '28px',
        height:         '28px',
        borderRadius:   '6px',
        background:     `${color}22`,
        border:         `1px solid ${color}44`,
        fontFamily:     'var(--font-mono)',
        fontSize:       '11px',
        fontWeight:     700,
        color,
        letterSpacing:  '-0.02em',
        lineHeight:     1,
        flexShrink:     0,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}


/* ── Category style map ──────────────────────────────────────── */
const CATEGORY_STYLES: Record<TechCategory, { accent: string; glow: string }> = {
  'Frontend':      { accent: '#C9A84C', glow: 'rgba(201,168,76,0.15)'    },
  'Backend':       { accent: '#2DD4BC', glow: 'rgba(45,212,188,0.15)'    },
  'Database':      { accent: '#79B8FF', glow: 'rgba(121,184,255,0.15)'   },
  'Cloud & Infra': { accent: '#B794F4', glow: 'rgba(183,148,244,0.15)'   },
  'AI & ML':       { accent: '#FCD34D', glow: 'rgba(252,211,77,0.15)'    },
  'E-Commerce':    { accent: '#FCA5A5', glow: 'rgba(252,165,165,0.15)'   },
  'CMS & Content': { accent: '#C4B5FD', glow: 'rgba(196,181,253,0.15)'   },
  'Analytics':     { accent: '#6EE7B7', glow: 'rgba(110,231,183,0.15)'   },
  'Design':        { accent: '#F9A8D4', glow: 'rgba(249,168,212,0.15)'   },
}


/* ── framer-motion animation variants ───────────────────────── */
/*
  Category rows use staggerChildren so cards reveal sequentially.
  Each card: fade (opacity 0→1) + slide up (translateY 24px→0).
  Duration 0.45s with easeOut curve for a premium "settle" feel.
*/
const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 22 },
  visible:  {
    opacity: 1,
    y:       0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}


/* ── TechCard ────────────────────────────────────────────────── */
/*
  Implements the full 3D cursor-tracking tilt:

  1. Mouse enter → disable CSS transition (responsive to cursor)
  2. Mouse move  → requestAnimationFrame recalculates rotateX/Y
     - Position is normalised to [-1, +1] relative to card centre
     - Clamped to ±8° (subtle, premium)
     - Dynamic radial gradient simulates specular reflection
  3. Mouse leave → re-enable spring transition, reset to identity
  4. Mobile     → no tilt (transform is never set, CSS media query
     on the class could also block it, but JS check is more reliable)

  Uses willChange: 'transform' to hint GPU layer promotion.
  Only transform + opacity are animated — no layout properties.
*/
interface TechCardProps {
  name:     string
  accent:   string
  glow:     string
  index:    number
}

function TechCard({ name, accent, glow, index }: TechCardProps) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const glowRef   = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number | null>(null)

  /* Detect coarse pointer (touch devices) — disable 3D tilt */
  const isTouchDevice = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    [],
  )

  const cfg   = TECH_CONFIG[name]
  const color = cfg?.color ?? accent

  /* --- Mouse enter: remove transition for instant cursor response --- */
  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice || !cardRef.current) return
    cardRef.current.style.transition = 'none'
  }, [isTouchDevice])

  /* --- Mouse move: RAF-batched 3D tilt + cursor glow --- */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return

      /* Capture values before async RAF frame */
      const clientX = e.clientX
      const clientY = e.clientY

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current
        if (!card) return

        const rect = card.getBoundingClientRect()
        /* Normalise cursor to [-1, +1] relative to card centre */
        const nx = ((clientX - rect.left) / rect.width  - 0.5) * 2
        const ny = ((clientY - rect.top)  / rect.height - 0.5) * 2

        /* Max ±8° rotation — premium, not gimmicky */
        const rotateY =  nx * 8
        const rotateX = -ny * 8

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`

        /* Dynamic reflection gradient follows cursor */
        if (glowRef.current) {
          const px = ((clientX - rect.left) / rect.width)  * 100
          const py = ((clientY - rect.top)  / rect.height) * 100
          glowRef.current.style.background =
            `radial-gradient(circle at ${px}% ${py}%, ${color}28 0%, transparent 65%)`
          glowRef.current.style.opacity = '1'
        }
      })
    },
    [isTouchDevice, color],
  )

  /* --- Mouse leave: spring ease back to identity --- */
  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (!cardRef.current) return

    /* Spring-like cubic-bezier — not instant snap */
    cardRef.current.style.transition =
      'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'

    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }, [])

  return (
    <motion.div
      variants={cardVariants}
      /* framer-motion handles entrance only — runtime tilt is raw CSS */
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="listitem"
        aria-label={name}
        tabIndex={0}
        className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl cursor-default select-none focus-visible:outline-none focus-visible:ring-2"
        style={{
          /*
            Glass card: semi-transparent background + blur.
            Backdrop-filter creates depth illusion on the dark navy bg.
          */
          background:     'rgba(255,255,255,0.03)',
          border:         '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          boxShadow:      '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          willChange:     'transform',
          transformStyle: 'preserve-3d',
          /* Base transition — overridden during mouse move */
          transition:     'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease',
          minHeight:      '96px',
          /* Focus ring color */
          outlineColor:   accent,
        }}
      >
        {/* Dynamic cursor-following reflection layer */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position:   'absolute',
            inset:      0,
            borderRadius: '11px',
            opacity:    0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex:     0,
          }}
        />

        {/*
          Gold accent border line on hover — top edge only.
          scale-x-0 → scale-x-100 on hover (CSS group-hover).
          Drawn via ::before would need Tailwind arbitrary — this
          inline approach is more reliable in Server/Client hybrid.
        */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

        {/* Icon — translateZ lifts it above the card plane in 3D */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            transform: 'translateZ(12px)',  /* 3D depth layer */
            transition: 'opacity 0.25s ease',
          }}
        >
          {cfg?.Icon ? (
            <cfg.Icon
              size={28}
              style={{
                color:      color,
                opacity:    0.5,
                transition: 'opacity 0.25s ease, filter 0.25s ease',
                filter:     'grayscale(0.3)',
              }}
            />
          ) : (
            <LetterIcon name={name} color={color} />
          )}
        </div>

        {/* Name label */}
        <span
          className="relative z-10 font-mono text-center leading-tight"
          style={{
            fontSize:      '10.5px',
            fontWeight:    500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.35)',
            transition:    'color 0.25s ease',
            transform:     'translateZ(8px)',  /* Slight 3D depth separation */
          }}
        >
          {name}
        </span>

        {/*
          CSS hover overrides for icon opacity and name color.
          Applied via inline :hover using a wrapping class trick:
          We use Tailwind group-hover on parent, but since icon styles
          are inline, we'll use the group-hover approach via className.
        */}
        <style>{`
          [aria-label="${name}"]:hover svg,
          [aria-label="${name}"]:focus-visible svg {
            opacity: 1 !important;
            filter: none !important;
          }
          [aria-label="${name}"]:hover span:last-child,
          [aria-label="${name}"]:focus-visible span:last-child {
            color: rgba(255,255,255,0.75) !important;
          }
          [aria-label="${name}"]:hover {
            border-color: ${accent}40 !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.10) !important;
          }
          [aria-label="${name}"]:focus-visible {
            border-color: ${accent}60 !important;
          }
        `}</style>
      </div>
    </motion.div>
  )
}


/* ── TechCategory ────────────────────────────────────────────── */
/*
  One row per technology category.
  Label column (fixed) + card grid (flex-wrap).
  framer-motion whileInView triggers stagger once when row enters viewport.
  viewport margin: 10% from bottom to trigger slightly before fully visible.
*/
interface TechCategoryProps {
  category: TechCategory
  items:    typeof techStack
  index:    number
  isLast:   boolean
}

function TechCategoryRow({ category, items, index, isLast }: TechCategoryProps) {
  const s = CATEGORY_STYLES[category]

  return (
    <div>
      <div
        className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8"
        style={{ paddingTop: '28px', paddingBottom: '28px' }}
      >

        {/* ── Category label ─────────────────────────────────── */}
        <div
          className="flex items-center gap-3 flex-shrink-0"
          style={{ width: 'clamp(130px, 13vw, 168px)' }}
        >
          {/* Pulsing accent dot */}
          <span
            aria-hidden="true"
            style={{
              display:      'inline-block',
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   s.accent,
              flexShrink:   0,
              boxShadow:    `0 0 8px ${s.accent}80, 0 0 16px ${s.accent}30`,
            }}
          />

          <div className="flex flex-col gap-[3px]">
            <span
              className="font-mono"
              style={{
                fontSize:      '9px',
                letterSpacing: '0.18em',
                color:         'rgba(255,255,255,0.20)',
                textTransform: 'uppercase',
                lineHeight:    1,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="font-mono font-medium"
              style={{
                fontSize:      '11px',
                letterSpacing: '0.08em',
                color:         s.accent,
                textTransform: 'uppercase',
                lineHeight:    1,
              }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* ── Card grid ──────────────────────────────────────── */}
        {/*
          whileInView + variants.visible triggers staggerChildren once.
          amount: 0.1 means 10% of the row must be visible before trigger.
        */}
        <motion.div
          className="grid flex-1"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap:                 '8px',
          }}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
          aria-label={`${category} technologies`}
        >
          {items.map((tech, i) => (
            <TechCard
              key={tech.name}
              name={tech.name}
              accent={s.accent}
              glow={s.glow}
              index={i}
            />
          ))}
        </motion.div>

      </div>

      {/* Category divider */}
      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 100%)',
          }}
        />
      )}
    </div>
  )
}


/* ── TechStack (Section) ──────────────────────────────────────── */

export default function TechStack() {
  /* Group tech items by category preserving insertion order */
  const categoryEntries = useMemo(() => {
    const grouped = techStack.reduce<Partial<Record<TechCategory, typeof techStack>>>(
      (acc, tech) => {
        if (!acc[tech.category]) acc[tech.category] = []
        acc[tech.category]!.push(tech)
        return acc
      },
      {},
    )
    return Object.entries(grouped) as [TechCategory, typeof techStack][]
  }, [])

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
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.35) 70%, transparent 100%)',
        }}
      />

      {/* Dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Radial ambient glow — top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)' }}
      />

      {/* "STACK" outline watermark — depth decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/2 -right-4 -translate-y-1/2 font-display font-bold"
        style={{
          fontSize:         'clamp(100px, 15vw, 220px)',
          color:            'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.04)',
          lineHeight:       1,
          letterSpacing:    '-0.03em',
          whiteSpace:       'nowrap',
        }}
      >
        STACK
      </div>

      <div className="section-container relative z-10">

        {/* ── Section header ─────────────────────────────────── */}
        <ScrollReveal className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="h-px w-8 flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }}
              aria-hidden="true"
            />
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(201,168,76,0.7)' }}
            >
              Our Stack
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-bold"
              style={{
                fontSize:      'clamp(32px, 4vw, 52px)',
                color:         '#F8F9FC',
                lineHeight:    1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Technologies We{' '}
              <span className="text-gold-gradient">Master</span>
            </h2>

            <p
              className="font-body text-[14px] leading-relaxed lg:max-w-xs lg:text-right"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Modern, battle-tested tools selected for performance
              and scalability — not trend. Every technology earns its place.
            </p>
          </div>
        </ScrollReveal>


        {/* ── Category rows ──────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border:     '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          <div className="px-6 lg:px-8">
            {categoryEntries.map(([category, items], i) => (
              <TechCategoryRow
                key={category}
                category={category}
                items={items}
                index={i}
                isLast={i === categoryEntries.length - 1}
              />
            ))}
          </div>
        </div>


        {/* ── Bottom stat strip ──────────────────────────────── */}
        <ScrollReveal className="mt-8">
          <div
            className="flex flex-wrap items-center justify-between gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-display font-bold"
                style={{ fontSize: '22px', color: '#C9A84C', letterSpacing: '-0.03em' }}
              >
                {techStack.length}
              </span>
              <span
                className="font-mono text-[9.5px] tracking-[0.12em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Technologies
              </span>
              <span
                aria-hidden="true"
                className="w-px h-4 mx-1"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
              <span
                className="font-mono text-[9.5px] tracking-[0.10em] uppercase"
                style={{ color: 'rgba(255,255,255,0.22)' }}
              >
                {categoryEntries.length} Categories
              </span>
            </div>

            <p
              className="font-mono text-[9px] tracking-[0.12em] uppercase"
              style={{ color: 'rgba(255,255,255,0.18)' }}
            >
              Chosen for outcomes · Not trends
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
