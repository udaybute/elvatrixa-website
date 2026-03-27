/* ================================================================
   ELVATRIXA — PROCESS STEPS DATA
   File: src/data/processSteps.ts

   The 4-step engagement process shown in ProcessSteps section.
   Sets clear client expectations and reduces purchase anxiety.
================================================================ */

import type { ProcessStep } from '@/types'


export const PROCESS_STEPS: ProcessStep[] = [

  {
    step:        '01',
    title:       'Discovery Call',
    body:
      'A focused 30-minute call to understand your project, goals, timeline, ' +
      'and budget. No sales pitch — just an honest conversation about whether ' +
      'we are the right fit for each other.',
    duration:    '30 minutes',
    deliverable: 'Project fit assessment + next steps',
  },

  {
    step:        '02',
    title:       'Proposal & Scope',
    body:
      'We send a detailed written proposal within 48 hours. Fixed price, ' +
      'fixed scope, clear milestones. No ambiguous hourly billing that spirals ' +
      'into unexpected invoices mid-project.',
    duration:    '48 hours',
    deliverable: 'Fixed-price proposal with milestone plan',
  },

  {
    step:        '03',
    title:       'Build & Review',
    body:
      'We build in focused sprints with a live staging environment you can ' +
      'review at any time. Weekly progress updates. You are never waiting ' +
      'weeks to see what we have built.',
    duration:    'Weekly sprints',
    deliverable: 'Live staging link updated weekly',
  },

  {
    step:        '04',
    title:       'Launch & Support',
    body:
      'We handle the full production deployment, run final QA, and stay ' +
      'available for 30 days post-launch to fix anything that needs attention. ' +
      'Ongoing retainer support available from month two.',
    duration:    '30-day post-launch support',
    deliverable: 'Production deployment + 30-day support window',
  },

]