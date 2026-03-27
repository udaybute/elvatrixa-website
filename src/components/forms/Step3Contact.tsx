/* ================================================================
   ELVATRIXA — CONTACT FORM STEP 3
   File: src/components/forms/Step3Contact.tsx

   Personal details step — name, email, company, country, phone.
   GDPR consent checkbox (required for UK/EU compliance).
   All inputs use the .input-dark class from globals.css.
================================================================ */

'use client'

import { cn } from '@/lib/utils'


/* ── COUNTRY LIST ────────────────────────────────────────────── */
/*
  US and UK at the top (primary markets), then alphabetical.
*/

const COUNTRIES = [
  'United States',
  'United Kingdom',
  '—',
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bolivia',
  'Bosnia and Herzegovina', 'Brazil', 'Bulgaria',
  'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia',
  'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'Estonia', 'Ethiopia',
  'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kuwait',
  'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg',
  'Malaysia', 'Malta', 'Mexico', 'Moldova', 'Morocco',
  'Netherlands', 'New Zealand', 'Nigeria', 'Norway',
  'Oman',
  'Pakistan', 'Panama', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia',
  'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden',
  'Switzerland', 'Syria',
  'Taiwan', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'Uruguay', 'Uzbekistan',
  'Venezuela', 'Vietnam',
  'Yemen',
  'Zimbabwe',
  'Other',
]


/* ── PROPS ───────────────────────────────────────────────────── */

interface Step3Props {
  name:        string
  email:       string
  company:     string
  country:     string
  phone:       string
  gdprConsent: boolean
  errors:      Partial<Record<keyof Step3Props, string>>
  onChange:    (field: keyof Omit<Step3Props, 'errors' | 'onChange'>, value: string | boolean) => void
}


/* ── FORM FIELD WRAPPER ──────────────────────────────────────── */

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label:     string
  required?: boolean
  hint?:     string
  error?:    string
  children:  React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-medium" style={{ color: 'var(--text-2)' }}>
        {label}
        {required && (
          <span className="ml-1" style={{ color: 'var(--gold)' }} aria-hidden="true">*</span>
        )}
      </label>
      {hint && (
        <p className="font-body text-xs -mt-0.5" style={{ color: 'var(--text-4)' }}>{hint}</p>
      )}
      {children}
      {error && (
        <p className="font-body text-xs flex items-center gap-1" style={{ color: '#F87171' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <circle cx="6" cy="6" r="5"/><path d="M6 4v2M6 8h.01"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Step3Contact({
  name, email, company, country, phone, gdprConsent,
  errors, onChange,
}: Step3Props) {
  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <p
          className="font-mono text-[11px] tracking-widest uppercase mb-2"
          style={{ color: 'var(--text-4)' }}
        >
          Step 3 of 3
        </p>
        <h2
          className="font-display font-bold mb-2"
          style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          How can we reach you?
        </h2>
        <p className="font-body text-sm" style={{ color: 'var(--text-3)' }}>
          We will respond within 4 business hours with a personalised reply.
        </p>
      </div>

      <div className="flex flex-col gap-5">

        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full name" required error={errors.name}>
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={e => onChange('name', e.target.value)}
              placeholder="James Whitfield"
              className={cn('input-dark', errors.name && 'border-red-400 focus:border-red-400')}
              aria-required="true"
              aria-invalid={!!errors.name}
            />
          </Field>

          <Field label="Business email" required error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => onChange('email', e.target.value)}
              placeholder="james@company.com"
              className={cn('input-dark', errors.email && 'border-red-400')}
              aria-required="true"
              aria-invalid={!!errors.email}
            />
          </Field>
        </div>

        {/* Company + Country row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Company name"
            hint="Optional — but helps us tailor the proposal."
          >
            <input
              type="text"
              autoComplete="organization"
              value={company}
              onChange={e => onChange('company', e.target.value)}
              placeholder="Acme Corp"
              className="input-dark"
            />
          </Field>

          <Field label="Country" required error={errors.country}>
            <select
              value={country}
              onChange={e => onChange('country', e.target.value)}
              className={cn('input-dark', errors.country && 'border-red-400')}
              aria-required="true"
              aria-invalid={!!errors.country}
              style={{ cursor: 'pointer' }}
            >
              <option value="" disabled>Select your country</option>
              {COUNTRIES.map(c =>
                c === '—'
                  ? <option key="sep" disabled>──────────────</option>
                  : <option key={c} value={c}>{c}</option>
              )}
            </select>
          </Field>
        </div>

        {/* Phone */}
        <Field
          label="Phone / WhatsApp"
          hint="Optional. Providing this speeds up communication significantly."
        >
          <input
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={e => onChange('phone', e.target.value)}
            placeholder="+1 555 000 0000"
            className="input-dark"
          />
        </Field>

        {/* GDPR Consent */}
        <div
          className={cn(
            'relative flex items-start gap-4 p-4 rounded-lg transition-colors duration-200',
            errors.gdprConsent ? 'border border-red-400/40' : 'border border-[var(--border-subtle)]',
          )}
          style={{ background: 'var(--bg-4)' }}
        >
          {/* Custom checkbox */}
          <button
            type="button"
            role="checkbox"
            aria-checked={gdprConsent}
            onClick={() => onChange('gdprConsent', !gdprConsent)}
            className={cn(
              'shrink-0 flex items-center justify-center w-5 h-5 rounded mt-0.5',
              'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            )}
            style={{
              background: gdprConsent ? 'var(--gold)'            : 'var(--bg-3)',
              border:     `1.5px solid ${gdprConsent ? 'var(--gold)' : 'var(--border-medium)'}`,
            }}
          >
            {gdprConsent && (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                stroke="var(--bg-0)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M1.5 5.5l3 3 5-5"/>
              </svg>
            )}
          </button>

          <div>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              I agree to Elvatrixa storing and processing my data in accordance with the{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors duration-150 hover:text-gold"
                style={{ color: 'var(--gold)' }}
              >
                Privacy Policy
              </a>
              {' '}for the purpose of responding to my enquiry.{' '}
              <span className="text-red-400">*</span>
            </p>
            {errors.gdprConsent && (
              <p className="font-body text-xs mt-1" style={{ color: '#F87171' }}>
                {errors.gdprConsent}
              </p>
            )}
          </div>
        </div>

        {/* Security note */}
        <p className="font-body text-xs flex items-center gap-2" style={{ color: 'var(--text-4)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
          </svg>
          Your information is encrypted and will never be shared with third parties.
        </p>

      </div>
    </div>
  )
}