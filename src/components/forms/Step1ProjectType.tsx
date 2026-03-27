/* ================================================================
   ELVATRIXA — CONTACT FORM STEP 1
   File: src/components/forms/Step1ProjectType.tsx

   Visual tile selector for project type.
   6 large clickable option tiles — no dropdowns.
   Each tile: icon + label + one-line description.
   Selected tile shows gold fill + check indicator.
================================================================ */

'use client'

import { cn }              from '@/lib/utils'
import type { ProjectType } from '@/types'
import type { JSX }        from 'react'


/* ── PROJECT TYPE OPTIONS ────────────────────────────────────── */

interface ProjectOption {
  value:       ProjectType
  label:       string
  description: string
  icon:        () => JSX.Element
}

const OPTIONS: ProjectOption[] = [
  {
    value:       'SaaS Platform',
    label:       'SaaS Platform',
    description: 'Web application or MVP build',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    value:       'AI & Automation',
    label:       'AI & Automation',
    description: 'Workflows, pipelines, integrations',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/>
        <path d="M2 14h2M20 14h2M9 12h.01M15 12h.01"/>
      </svg>
    ),
  },
  {
    value:       'E-Commerce Store',
    label:       'E-Commerce Store',
    description: 'Shopify, headless, conversion',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    value:       'Website / Redesign',
    label:       'Website / Redesign',
    description: 'Marketing site or full redesign',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    value:       'Digital Marketing',
    label:       'Digital Marketing',
    description: 'Ads, SEO, growth campaigns',
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
  },
  {
    value:       'Something Else',
    label:       'Something Else',
    description: "Tell us — we love a challenge",
    icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
      </svg>
    ),
  },
]

/* ── CHECK ICON ──────────────────────────────────────────────── */

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l4 4 6-6"/>
  </svg>
)


/* ── PROPS ───────────────────────────────────────────────────── */

interface Step1Props {
  value:    ProjectType
  onChange: (value: ProjectType) => void
}


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Step1ProjectType({ value, onChange }: Step1Props) {
  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <p
          className="font-mono text-[11px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--text-4)' }}
        >
          Step 1 of 3
        </p>
        <h2
          className="font-display font-bold mb-2"
          style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          What are you looking to build?
        </h2>
        <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>
          Select the option that best describes your project.
        </p>
      </div>

      {/* Tile grid — 2 cols on mobile, 3 on desktop */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        role="group"
        aria-label="Project type selection"
      >
        {OPTIONS.map(option => {
          const isSelected = value === option.value
          const Icon       = option.icon

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={cn(
                'group relative flex flex-col items-start p-4 rounded-lg text-left',
                'transition-all duration-200 ease-luxury',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                isSelected
                  ? 'bg-gold-dim border-gold shadow-gold-sm'
                  : 'hover:-translate-y-0.5 hover:border-[var(--border-medium)] hover:bg-white/[0.02]',
              )}
              style={{
                background: isSelected ? 'var(--gold-dim)' : 'var(--bg-4)',
                border:     `1px solid ${isSelected ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
              }}
            >
              {/* Check indicator — top right */}
              <span
                className={cn(
                  'absolute top-3 right-3 flex items-center justify-center',
                  'w-5 h-5 rounded-full transition-all duration-200',
                  isSelected
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75',
                )}
                style={{
                  background: 'var(--gold)',
                  color:      'var(--bg-0)',
                }}
                aria-hidden="true"
              >
                <CheckIcon />
              </span>

              {/* Icon */}
              <span
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-md mb-3',
                  'transition-colors duration-200',
                )}
                style={{
                  background: isSelected ? 'rgba(201,168,76,0.20)' : 'var(--bg-3)',
                  border:     `1px solid ${isSelected ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
                  color:      isSelected ? 'var(--gold)' : 'var(--text-3)',
                }}
                aria-hidden="true"
              >
                <Icon />
              </span>

              {/* Label */}
              <span
                className="font-body font-bold text-sm leading-tight mb-1 block"
                style={{ color: isSelected ? 'var(--gold)' : 'var(--text-1)' }}
              >
                {option.label}
              </span>

              {/* Description */}
              <span
                className="font-body text-[11px] leading-snug"
                style={{ color: isSelected ? 'var(--gold-light)' : 'var(--text-4)' }}
              >
                {option.description}
              </span>
            </button>
          )
        })}
      </div>

      {/* Validation hint */}
      {!value && (
        <p
          className="mt-4 font-body text-xs"
          style={{ color: 'var(--text-4)' }}
        >
          Please select one option to continue.
        </p>
      )}
    </div>
  )
}