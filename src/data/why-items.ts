/* ================================================================
   ELVATRIXA — WHY ELVATRIXA DATA
   File: src/data/why-items.ts

   Aligned to WhyItem type from src/types/index.ts:
   - number:  zero-padded string e.g. '01'
   - title:   short heading
   - body:    2–3 sentence explanation
   - icon:    optional icon name (unused in current card design)

   Each item addresses a specific US/UK buyer objection.
================================================================ */

import type { WhyItem } from '@/types'

export const WHY_ITEMS: WhyItem[] = [
  {
    number: '01',
    title:  'Product-First Thinking',
    body:
      'We do not just execute tickets — we ask whether the feature actually ' +
      'moves the business forward. Every decision is filtered through its ' +
      'impact on your revenue, retention, or conversion rate.',
  },
  {
    number: '02',
    title:  'AI-Native Development',
    body:
      'We embed AI at the architecture level, not as an afterthought. ' +
      'From GPT-powered workflows to intelligent automation pipelines, ' +
      'we build systems that get smarter as your data grows.',
  },
  {
    number: '03',
    title:  'Performance Obsessed',
    body:
      'A 1-second delay costs 7% in conversions. Every build we ship ' +
      'targets sub-2-second load times, 95+ Lighthouse scores, and ' +
      'Core Web Vitals that protect your search rankings.',
  },
  {
    number: '04',
    title:  'Design That Converts',
    body:
      'Our interfaces are designed around buyer psychology and tested ' +
      'against real user behaviour. Beautiful and functional are not ' +
      'a trade-off — both are non-negotiable.',
  },
  {
    number: '05',
    title:  'Scalable Architecture',
    body:
      'We over-engineer for tomorrow so you never hit a ceiling today. ' +
      'Clean code, modular structure, and documented systems mean your ' +
      'next developer can hit the ground running.',
  },
  {
    number: '06',
    title:  'US & UK Delivery Standards',
    body:
      'We operate on London and New York business hours, communicate ' +
      'in plain English, and hold ourselves to the delivery standards ' +
      'that US and UK clients actually expect — not just promise.',
  },
]