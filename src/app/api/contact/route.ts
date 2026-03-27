/* ================================================================
   ELVATRIXA — CONTACT FORM API ROUTE
   File: src/app/api/contact/route.ts

   Handles POST requests from the 3-step contact form.

   Flow:
   1. Validate request body with Zod schema
   2. Send notification email to hello@elvatrixa.com via Resend
   3. Send confirmation email to the client
   4. Return typed JSON response

   Environment variables required:
     RESEND_API_KEY      — from resend.com → API Keys
     CONTACT_EMAIL       — recipient e.g. uday@elvatrixa.com
================================================================ */

import { NextRequest, NextResponse } from 'next/server'
import { z }                          from 'zod'


/* ── ZOD VALIDATION SCHEMA ───────────────────────────────────── */
/*
  Mirrors the ContactFormData type in src/types/index.ts.
  Zod validates server-side — never trust client input.
*/

const ContactSchema = z.object({
  projectType: z.string().min(1, 'Project type is required'),
  budget:      z.string().min(1, 'Budget range is required'),
  timeline:    z.string().min(1, 'Timeline is required'),
  description: z.string().max(2000).optional().default(''),
  name:        z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:       z.string().email('Please enter a valid email address'),
  company:     z.string().max(100).optional().default(''),
  country:     z.string().min(1, 'Country is required'),
  phone:       z.string().max(30).optional().default(''),
  gdprConsent: z.boolean().refine(v => v === true, {
    message: 'You must accept the privacy policy to continue',
  }),
})


/* ── RATE LIMITING (simple in-memory) ───────────────────────── */
/*
  Prevents spam submissions. Tracks IP → last submission time.
  Resets on server restart — sufficient for low-traffic use.
  For production scale, replace with Redis/Upstash.
*/

const submissionMap = new Map<string, number>()
const RATE_LIMIT_MS = 60_000   /* 1 submission per IP per minute */

function isRateLimited(ip: string): boolean {
  const last = submissionMap.get(ip)
  if (!last) return false
  return Date.now() - last < RATE_LIMIT_MS
}


/* ── EMAIL HTML BUILDER — NOTIFICATION ───────────────────────── */

function buildNotificationEmail(data: z.infer<typeof ContactSchema>, refId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead — Elvatrixa</title>
</head>
<body style="margin:0;padding:0;background:#080A0E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080A0E;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#161B22;border:1px solid rgba(201,168,76,0.20);border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#161B22,#1C2128);padding:32px 36px;border-bottom:1px solid rgba(201,168,76,0.15);">
              <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#C9A84C;letter-spacing:-0.02em;">
                Elvatrixa
              </p>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#484F58;">
                New Project Enquiry
              </p>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:rgba(201,168,76,0.08);padding:16px 36px;border-bottom:1px solid rgba(201,168,76,0.12);">
              <p style="margin:0;font-size:13px;color:#E8C96A;font-weight:600;">
                🔔 New lead received — Ref: ${refId}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">

              <!-- Project details -->
              <p style="margin:0 0 20px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#484F58;">Project Details</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['Project Type', data.projectType],
                  ['Budget Range', data.budget],
                  ['Timeline',     data.timeline],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <span style="font-size:11px;color:#484F58;text-transform:uppercase;letter-spacing:0.10em;">${label}</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);text-align:right;">
                    <span style="font-size:13px;color:#C9D1D9;font-weight:600;">${value}</span>
                  </td>
                </tr>`).join('')}
              </table>

              ${data.description ? `
              <div style="margin:20px 0;padding:16px;background:rgba(255,255,255,0.03);border-radius:8px;border-left:3px solid rgba(201,168,76,0.40);">
                <p style="margin:0 0 8px;font-size:11px;color:#484F58;text-transform:uppercase;letter-spacing:0.10em;">Description</p>
                <p style="margin:0;font-size:14px;color:#C9D1D9;line-height:1.6;">${data.description}</p>
              </div>` : ''}

              <!-- Contact details -->
              <p style="margin:24px 0 16px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#484F58;">Contact Information</p>

              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ['Name',    data.name],
                  ['Email',   data.email],
                  ['Company', data.company || '—'],
                  ['Country', data.country],
                  ['Phone',   data.phone   || '—'],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <span style="font-size:11px;color:#484F58;text-transform:uppercase;letter-spacing:0.10em;">${label}</span>
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);text-align:right;">
                    <span style="font-size:13px;color:#C9D1D9;">${value}</span>
                  </td>
                </tr>`).join('')}
              </table>

            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 32px;">
              <a
                href="mailto:${data.email}?subject=Re: Your Elvatrixa enquiry (${refId})"
                style="display:inline-block;background:#C9A84C;color:#060810;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;padding:14px 28px;text-decoration:none;margin-top:8px;"
              >
                Reply to ${data.name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:11px;color:#484F58;">
                Submitted ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short' })} GMT
                &nbsp;·&nbsp; Ref: ${refId}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim()
}


/* ── EMAIL HTML BUILDER — CONFIRMATION ───────────────────────── */

function buildConfirmationEmail(name: string, projectType: string, refId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your brief — Elvatrixa</title>
</head>
<body style="margin:0;padding:0;background:#080A0E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080A0E;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#161B22;border:1px solid rgba(201,168,76,0.20);border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#161B22,#1C2128);padding:32px 36px;border-bottom:1px solid rgba(201,168,76,0.15);">
              <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#C9A84C;letter-spacing:-0.02em;">
                Elvatrixa
              </p>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#484F58;">
                Digital Innovation Studio
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 36px 28px;">
              <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:28px;font-weight:700;color:#F0F6FC;line-height:1.2;">
                We&rsquo;ve received<br />your brief, ${name}.
              </p>
              <p style="margin:20px 0 0;font-size:15px;color:#8B949E;line-height:1.7;">
                Thank you for reaching out about your <strong style="color:#C9D1D9;">${projectType}</strong> project.
                We review every enquiry personally and will be in touch within <strong style="color:#C9A84C;">4 business hours</strong>
                with an initial response.
              </p>
              <p style="margin:16px 0 0;font-size:15px;color:#8B949E;line-height:1.7;">
                If your project is time-sensitive, feel free to WhatsApp us directly at
                <a href="https://wa.me/918668296156" style="color:#1DB8A0;text-decoration:none;">+91 86682 96156</a>.
              </p>
            </td>
          </tr>

          <!-- Reference -->
          <tr>
            <td style="padding:0 36px 28px;">
              <div style="padding:16px;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);border-radius:8px;">
                <p style="margin:0 0 4px;font-size:11px;color:#484F58;text-transform:uppercase;letter-spacing:0.12em;">Your reference number</p>
                <p style="margin:0;font-size:16px;color:#C9A84C;font-weight:700;letter-spacing:0.08em;">${refId}</p>
              </div>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding:0 36px 28px;">
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#484F58;">What happens next</p>
              ${[
                ['Within 4 hours',   'Uday will review your brief and send an initial response.'],
                ['Within 48 hours',  'You will receive a detailed written proposal with a fixed price and milestone plan.'],
                ['Discovery call',   'We schedule a 30-minute call to align on scope and answer your questions.'],
              ].map(([step, desc], i) => `
              <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
                <div style="flex-shrink:0;width:28px;height:28px;border-radius:50%;background:rgba(201,168,76,0.10);border:1px solid rgba(201,168,76,0.25);display:flex;align-items:center;justify-content:center;font-size:11px;color:#C9A84C;font-weight:700;text-align:center;line-height:28px;">
                  ${i + 1}
                </div>
                <div>
                  <p style="margin:0 0 2px;font-size:13px;color:#C9D1D9;font-weight:600;">${step}</p>
                  <p style="margin:0;font-size:13px;color:#8B949E;line-height:1.5;">${desc}</p>
                </div>
              </div>`).join('')}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:12px;color:#484F58;line-height:1.6;">
                Elvatrixa Digital Innovation Studio &nbsp;·&nbsp;
                <a href="https://elvatrixa.com" style="color:#484F58;text-decoration:none;">elvatrixa.com</a>
                &nbsp;·&nbsp;
                <a href="mailto:hello@elvatrixa.com" style="color:#484F58;text-decoration:none;">hello@elvatrixa.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim()
}


/* ── GENERATE REFERENCE ID ───────────────────────────────────── */

function generateRefId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random    = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ELV-${timestamp}-${random}`
}


/* ── POST HANDLER ────────────────────────────────────────────── */

export async function POST(req: NextRequest) {

  /* ── 1. Rate limit check ── */
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
              ?? req.headers.get('x-real-ip')
              ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a minute before trying again.' },
      { status: 429 },
    )
  }

  /* ── 2. Parse body ── */
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request format.' },
      { status: 400 },
    )
  }

  /* ── 3. Zod validation ── */
  const parsed = ContactSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Validation failed.'
    return NextResponse.json(
      { success: false, message: firstError },
      { status: 422 },
    )
  }

  const data  = parsed.data
  const refId = generateRefId()

  /* ── 4. Send emails via Resend ── */
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_EMAIL  = process.env.CONTACT_EMAIL ?? 'hello@elvatrixa.com'

  if (!RESEND_API_KEY) {
    /*
      In development without a Resend key, skip email sending
      but return success so the form flow can be tested.
    */
    console.warn('[contact/route] RESEND_API_KEY not set — skipping email send.')
    submissionMap.set(ip, Date.now())
    return NextResponse.json(
      {
        success:     true,
        message:     'Your brief has been received. We will be in touch within 4 hours.',
        referenceId: refId,
      },
      { status: 200 },
    )
  }

  try {
    /* Send both emails concurrently */
    const [notifyRes, confirmRes] = await Promise.allSettled([

      /* Notification to Uday */
      fetch('https://api.resend.com/emails', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:    'Elvatrixa Contact Form <noreply@elvatrixa.com>',
          to:      [CONTACT_EMAIL],
          subject: `New Lead: ${data.projectType} — ${data.name} (${refId})`,
          html:    buildNotificationEmail(data, refId),
          reply_to: data.email,
        }),
      }),

      /* Confirmation to client */
      fetch('https://api.resend.com/emails', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:    'Uday at Elvatrixa <hello@elvatrixa.com>',
          to:      [data.email],
          subject: `We received your brief — Ref: ${refId}`,
          html:    buildConfirmationEmail(data.name, data.projectType, refId),
        }),
      }),

    ])

    /* Log any email send failures — don't block the user response */
    if (notifyRes.status === 'rejected') {
      console.error('[contact/route] Notification email failed:', notifyRes.reason)
    }
    if (confirmRes.status === 'rejected') {
      console.error('[contact/route] Confirmation email failed:', confirmRes.reason)
    }

    /* Check if Resend returned an API error on the notification */
    if (notifyRes.status === 'fulfilled') {
      const resendResponse = notifyRes.value
      if (!resendResponse.ok) {
        const errBody = await resendResponse.json().catch(() => ({}))
        console.error('[contact/route] Resend API error:', errBody)
        /* Still return success — we don't want to penalise users for Resend issues */
      }
    }

  } catch (err) {
    console.error('[contact/route] Unexpected email error:', err)
    /* Return success anyway — form data was valid, issue is email delivery */
  }

  /* ── 5. Record IP for rate limiting ── */
  submissionMap.set(ip, Date.now())

  /* ── 6. Success response ── */
  return NextResponse.json(
    {
      success:     true,
      message:     'Your brief has been received. We will be in touch within 4 hours.',
      referenceId: refId,
    },
    {
      status: 200,
      headers: {
        /* Prevent caching of API responses */
        'Cache-Control': 'no-store',
      },
    },
  )
}


/* ── GET HANDLER (health check) ─────────────────────────────── */

export async function GET() {
  return NextResponse.json(
    { status: 'ok', endpoint: '/api/contact', method: 'POST' },
    { status: 200 },
  )
}