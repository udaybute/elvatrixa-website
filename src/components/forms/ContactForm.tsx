/* ================================================================
   ELVATRIXA — CONTACT FORM ORCHESTRATOR
   File: src/components/forms/ContactForm.tsx

   Manages state across all 3 steps.
   Handles submission to /api/contact.
   Redirects to /thank-you on success.

   State machine:
   idle → step 1 → step 2 → step 3 → submitting → success/error
================================================================ */

'use client'

import { useState, useCallback } from 'react'
import { useRouter }             from 'next/navigation'
import { cn }                    from '@/lib/utils'
import Step1ProjectType          from './Step1ProjectType'
import Step2Scope                from './Step2Scope'
import Step3Contact              from './Step3Contact'
import type {
  ContactFormData,
  FormStatus,
  ProjectType,
  BudgetRange,
  Timeline,
  ContactApiResponse,
}                                from '@/types'


/* ── INITIAL STATE ───────────────────────────────────────────── */

const INITIAL_DATA: ContactFormData = {
  projectType:  '',
  budget:       '',
  timeline:     '',
  description:  '',
  name:         '',
  email:        '',
  company:      '',
  country:      '',
  phone:        '',
  gdprConsent:  false,
}


/* ── PROGRESS BAR ────────────────────────────────────────────── */

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const labels = ['Project', 'Scope', 'Details']

  return (
    <div className="mb-10">
      {/* Step labels + numbers */}
      <div className="flex items-center gap-0 mb-4">
        {labels.map((label, i) => {
          const stepNum  = (i + 1) as 1 | 2 | 3
          const done     = step > stepNum
          const active   = step === stepNum

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              {/* Node */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full',
                    'font-mono text-xs font-bold',
                    'transition-all duration-300',
                    done   && 'bg-gold text-bg-0',
                    active && 'bg-gold-dim border-2 border-gold text-gold',
                    !done && !active && 'bg-bg-4 border border-border-subtle text-text-4',
                  )}
                  style={{
                    background: done   ? 'var(--gold)'    : active ? 'var(--gold-dim)'   : 'var(--bg-4)',
                    border:     active ? '2px solid var(--gold)' : done ? 'none' : '1px solid var(--border-subtle)',
                    color:      done   ? 'var(--bg-0)'    : active ? 'var(--gold)'        : 'var(--text-4)',
                  }}
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true">
                      <path d="M2 6l3 3 5-5"/>
                    </svg>
                  ) : stepNum}
                </div>
                <span
                  className="font-mono text-[10px] tracking-wider uppercase mt-1.5"
                  style={{ color: active ? 'var(--gold)' : done ? 'var(--text-3)' : 'var(--text-4)' }}
                >
                  {label}
                </span>
              </div>

              {/* Connector line — not after last step */}
              {i < labels.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-5 transition-all duration-500"
                  style={{ background: done ? 'var(--gold)' : 'var(--border-subtle)' }}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


/* ── STEP 3 ERRORS TYPE ──────────────────────────────────────── */

type Step3Errors = {
  name?:        string
  email?:       string
  country?:     string
  gdprConsent?: string
}


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function ContactForm() {
  const router = useRouter()

  const [step,   setStep]   = useState<1 | 2 | 3>(1)
  const [data,   setData]   = useState<ContactFormData>(INITIAL_DATA)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Step3Errors>({})
  const [apiError, setApiError] = useState<string>('')


  /* ── Field updater ── */
  const updateField = useCallback(
    <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
      setData(prev => ({ ...prev, [field]: value }))
      /* Clear the field's error when user corrects it */
      if (field in errors) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    },
    [errors],
  )


  /* ── Step 1 validation ── */
  function validateStep1(): boolean {
    return data.projectType !== ''
  }

  /* ── Step 2 validation ── */
  function validateStep2(): boolean {
    return data.budget !== '' && data.timeline !== ''
  }

  /* ── Step 3 validation ── */
  function validateStep3(): boolean {
    const newErrors: Step3Errors = {}

    if (!data.name.trim() || data.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.'
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!data.country) {
      newErrors.country = 'Please select your country.'
    }
    if (!data.gdprConsent) {
      newErrors.gdprConsent = 'You must accept the privacy policy to continue.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  /* ── Next step ── */
  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2)
    if (step === 2 && validateStep2()) setStep(3)
  }

  /* ── Back step ── */
  function handleBack() {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3)
  }


  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateStep3()) return

    setStatus('submitting')
    setApiError('')

    try {
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer:  document.referrer,
      }

      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      const json: ContactApiResponse = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? 'Submission failed. Please try again.')
      }

      setStatus('success')
      /* Redirect to thank-you page with reference ID */
      router.push(`/thank-you?ref=${json.referenceId ?? ''}`)

    } catch (err) {
      setStatus('error')
      setApiError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.',
      )
    }
  }


  /* ── Render ── */
  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* Progress indicator */}
      <ProgressBar step={step} />

      {/* Step content */}
      <div className="mb-8">
        {step === 1 && (
          <Step1ProjectType
            value={data.projectType as ProjectType}
            onChange={v => updateField('projectType', v)}
          />
        )}

        {step === 2 && (
          <Step2Scope
            budget={data.budget      as BudgetRange}
            timeline={data.timeline  as Timeline}
            description={data.description}
            onBudget={v      => updateField('budget',      v)}
            onTimeline={v    => updateField('timeline',    v)}
            onDescription={v => updateField('description', v)}
          />
        )}

        {step === 3 && (
          <Step3Contact
            name={data.name}
            email={data.email}
            company={data.company}
            country={data.country}
            phone={data.phone}
            gdprConsent={data.gdprConsent}
            errors={errors}
            onChange={(field, value) =>
              updateField(field as keyof ContactFormData, value as never)
            }
          />
        )}
      </div>

      {/* API error */}
      {apiError && (
        <div
          className="flex items-start gap-3 p-4 rounded-lg mb-6"
          style={{
            background: 'rgba(248,113,113,0.08)',
            border:     '1px solid rgba(248,113,113,0.25)',
          }}
          role="alert"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="8" cy="8" r="7"/><path d="M8 5v3M8 11h.01"/>
          </svg>
          <p className="font-body text-sm" style={{ color: '#FCA5A5' }}>{apiError}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-4">

        {/* Back button */}
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            disabled={status === 'submitting'}
            className={cn(
              'flex items-center gap-2 font-body text-sm font-medium',
              'px-5 py-3 rounded-md',
              'transition-all duration-200',
              'hover:text-text-1 disabled:opacity-40 disabled:cursor-not-allowed',
            )}
            style={{
              background: 'var(--bg-4)',
              border:     '1px solid var(--border-subtle)',
              color:      'var(--text-3)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <path d="M12 7H2M6 3l-4 4 4 4"/>
            </svg>
            Back
          </button>
        ) : (
          <div /> /* Spacer */
        )}

        {/* Next / Submit button */}
        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={
              (step === 1 && !validateStep1()) ||
              (step === 2 && !validateStep2())
            }
            className={cn(
              'flex items-center gap-2',
              'btn-primary',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
            )}
          >
            Continue
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4"/>
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={cn(
              'flex items-center gap-2',
              'btn-primary',
              'disabled:opacity-60 disabled:cursor-not-allowed',
            )}
          >
            {status === 'submitting' ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="animate-spin" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send My Brief
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </>
            )}
          </button>
        )}

      </div>

      {/* Trust line */}
      {step === 3 && (
        <p
          className="mt-4 text-center font-mono text-[10px] tracking-widest uppercase"
          style={{ color: 'var(--text-4)' }}
        >
          Reply within 4 hours · Fixed-price proposals · No commitment required
        </p>
      )}

    </form>
  )
}