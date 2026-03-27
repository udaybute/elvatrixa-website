/* ================================================================
   ELVATRIXA — CONTACT FORM STEP 2
   File: src/components/forms/Step2Scope.tsx

   Budget range selector + timeline selector + description textarea.
   Budget and timeline use pill-style toggle buttons (no dropdowns).
   Description is an optional free-text area.
================================================================ */

'use client'

import { cn }                  from '@/lib/utils'
import type { BudgetRange, Timeline } from '@/types'


/* ── OPTIONS ─────────────────────────────────────────────────── */

const BUDGET_OPTIONS: BudgetRange[] = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $8,000',
  '$8,000 – $20,000',
  '$20,000+',
]

const TIMELINE_OPTIONS: Timeline[] = [
  'ASAP (within 2 weeks)',
  '1 – 3 months',
  '3 – 6 months',
  '6+ months',
  'Flexible',
]


/* ── PROPS ───────────────────────────────────────────────────── */

interface Step2Props {
  budget:      BudgetRange
  timeline:    Timeline
  description: string
  onBudget:      (v: BudgetRange)  => void
  onTimeline:    (v: Timeline)     => void
  onDescription: (v: string)       => void
}


/* ── PILL SELECTOR ───────────────────────────────────────────── */

function PillGroup<T extends string>({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label:    string
  hint?:    string
  options:  T[]
  value:    T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <div className="mb-3">
        <p className="font-body font-bold text-sm" style={{ color: 'var(--text-1)' }}>
          {label}
        </p>
        {hint && (
          <p className="font-body text-xs mt-0.5" style={{ color: 'var(--text-4)' }}>
            {hint}
          </p>
        )}
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={label}
      >
        {options.map(option => {
          const isSelected = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={isSelected}
              className={cn(
                'font-body text-sm px-4 py-2.5 rounded-md',
                'transition-all duration-200 ease-luxury',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                isSelected
                  ? 'font-semibold'
                  : 'hover:border-[var(--border-medium)] hover:text-[var(--text-1)]',
              )}
              style={{
                background:  isSelected ? 'var(--gold-dim)'    : 'var(--bg-4)',
                border:      `1px solid ${isSelected ? 'var(--gold-border)' : 'var(--border-subtle)'}`,
                color:       isSelected ? 'var(--gold)'        : 'var(--text-3)',
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Step2Scope({
  budget,
  timeline,
  description,
  onBudget,
  onTimeline,
  onDescription,
}: Step2Props) {
  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <p
          className="font-mono text-[11px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--text-4)' }}
        >
          Step 2 of 3
        </p>
        <h2
          className="font-display font-bold mb-2"
          style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          Tell us about your project.
        </h2>
        <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>
          This helps us tailor our proposal to your exact situation.
        </p>
      </div>

      <div className="flex flex-col gap-8">

        {/* Budget */}
        <PillGroup
          label="What is your approximate budget?"
          hint="All budgets are in USD. Fixed-price proposals only — no surprise invoices."
          options={BUDGET_OPTIONS}
          value={budget}
          onChange={onBudget}
        />

        {/* Timeline */}
        <PillGroup
          label="When do you need this delivered?"
          options={TIMELINE_OPTIONS}
          value={timeline}
          onChange={onTimeline}
        />

        {/* Description */}
        <div>
          <label
            htmlFor="project-description"
            className="block font-body font-bold text-sm mb-1"
            style={{ color: 'var(--text-1)' }}
          >
            Project description
            <span className="font-normal ml-1" style={{ color: 'var(--text-4)' }}>
              (optional)
            </span>
          </label>
          <p className="font-body text-xs mb-3" style={{ color: 'var(--text-4)' }}>
            Briefly describe what you&apos;re building and any key requirements.
            The more detail you give, the more specific our proposal will be.
          </p>
          <textarea
            id="project-description"
            value={description}
            onChange={e => onDescription(e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder="e.g. We need a multi-tenant SaaS platform with Stripe billing, role-based access, and an analytics dashboard. We have a Figma design ready..."
            className="textarea-dark w-full"
            style={{ resize: 'vertical', minHeight: '110px' }}
          />
          {/* Character count */}
          <p
            className="text-right font-mono text-[10px] mt-1"
            style={{ color: description.length > 1800 ? 'var(--gold)' : 'var(--text-4)' }}
          >
            {description.length} / 2000
          </p>
        </div>

      </div>
    </div>
  )
}