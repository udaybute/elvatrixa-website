/* ================================================================
   ELVATRIXA — TECH STACK DATA
   File: src/data/techStack.ts

   Technology logos displayed in the TechStack section.
   Also used on individual service sub-pages.

   Structure:
   - Each item has a name, category, and SVG-safe logo identifier
   - logoUrl points to the SVG stored in /public/images/tech/
   - Grouped by category for filtering on the /services hub

   Logo files to add to /public/images/tech/:
   Each filename matches the `logo` field below (e.g. nextjs.svg).
   Source: https://simpleicons.org — all SVGs are free to use.

   Display rules from the master plan:
   - Show logos in a horizontal scrolling row on mobile
   - 3-column grid on tablet, 6-column grid on desktop
   - Greyscale by default, full colour on hover
   - No logo wider than 120px
================================================================ */

export interface TechItem {
  /** Display name shown on hover tooltip */
  name:     string
  /** Category for grouping and filtering */
  category: TechCategory
  /** Filename without extension — matches /public/images/tech/[logo].svg */
  logo:     string
  /** Optional: URL to the technology's website */
  url?:     string
}

export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud & Infra'
  | 'AI & ML'
  | 'E-Commerce'
  | 'CMS & Content'
  | 'Analytics'
  | 'Design'


/* ── FULL TECH STACK ─────────────────────────────────────────── */

export const techStack: TechItem[] = [

  /* ── Frontend ────────────────────────────────────────────── */
  {
    name:     'Next.js',
    category: 'Frontend',
    logo:     'nextjs',
    url:      'https://nextjs.org',
  },
  {
    name:     'React',
    category: 'Frontend',
    logo:     'react',
    url:      'https://react.dev',
  },
  {
    name:     'TypeScript',
    category: 'Frontend',
    logo:     'typescript',
    url:      'https://typescriptlang.org',
  },
  {
    name:     'Tailwind CSS',
    category: 'Frontend',
    logo:     'tailwindcss',
    url:      'https://tailwindcss.com',
  },
  {
    name:     'Framer Motion',
    category: 'Frontend',
    logo:     'framer',
    url:      'https://framer.com/motion',
  },

  /* ── Backend ─────────────────────────────────────────────── */
  {
    name:     'Node.js',
    category: 'Backend',
    logo:     'nodedotjs',
    url:      'https://nodejs.org',
  },
  {
    name:     'Python',
    category: 'Backend',
    logo:     'python',
    url:      'https://python.org',
  },
  {
    name:     'Stripe',
    category: 'Backend',
    logo:     'stripe',
    url:      'https://stripe.com',
  },
  {
    name:     'Resend',
    category: 'Backend',
    logo:     'resend',
    url:      'https://resend.com',
  },

  /* ── Database ────────────────────────────────────────────── */
  {
    name:     'PostgreSQL',
    category: 'Database',
    logo:     'postgresql',
    url:      'https://postgresql.org',
  },
  {
    name:     'Supabase',
    category: 'Database',
    logo:     'supabase',
    url:      'https://supabase.com',
  },
  {
    name:     'MongoDB',
    category: 'Database',
    logo:     'mongodb',
    url:      'https://mongodb.com',
  },
  {
    name:     'Redis',
    category: 'Database',
    logo:     'redis',
    url:      'https://redis.io',
  },

  /* ── Cloud & Infra ───────────────────────────────────────── */
  {
    name:     'Vercel',
    category: 'Cloud & Infra',
    logo:     'vercel',
    url:      'https://vercel.com',
  },
  {
    name:     'AWS',
    category: 'Cloud & Infra',
    logo:     'amazonaws',
    url:      'https://aws.amazon.com',
  },
  {
    name:     'Cloudflare',
    category: 'Cloud & Infra',
    logo:     'cloudflare',
    url:      'https://cloudflare.com',
  },
  {
    name:     'Docker',
    category: 'Cloud & Infra',
    logo:     'docker',
    url:      'https://docker.com',
  },
  {
    name:     'GitHub',
    category: 'Cloud & Infra',
    logo:     'github',
    url:      'https://github.com',
  },

  /* ── AI & ML ─────────────────────────────────────────────── */
  {
    name:     'OpenAI',
    category: 'AI & ML',
    logo:     'openai',
    url:      'https://openai.com',
  },
  {
    name:     'LangChain',
    category: 'AI & ML',
    logo:     'langchain',
    url:      'https://langchain.com',
  },
  {
    name:     'n8n',
    category: 'AI & ML',
    logo:     'n8n',
    url:      'https://n8n.io',
  },

  /* ── E-Commerce ──────────────────────────────────────────── */
  {
    name:     'Shopify',
    category: 'E-Commerce',
    logo:     'shopify',
    url:      'https://shopify.com',
  },
  {
    name:     'Klaviyo',
    category: 'E-Commerce',
    logo:     'klaviyo',
    url:      'https://klaviyo.com',
  },

  /* ── CMS & Content ───────────────────────────────────────── */
  {
    name:     'Sanity',
    category: 'CMS & Content',
    logo:     'sanity',
    url:      'https://sanity.io',
  },

  /* ── Analytics ───────────────────────────────────────────── */
  {
    name:     'Google Analytics',
    category: 'Analytics',
    logo:     'googleanalytics',
    url:      'https://analytics.google.com',
  },

  /* ── Design ──────────────────────────────────────────────── */
  {
    name:     'Figma',
    category: 'Design',
    logo:     'figma',
    url:      'https://figma.com',
  },

]


/* ── HELPERS ─────────────────────────────────────────────────── */

/**
 * Homepage TechStack section — top 12 most recognisable logos.
 * These are the ones a US/UK buyer will immediately recognise.
 */
export const featuredTech: TechItem[] = techStack.filter(t =>
  [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Supabase',
    'Vercel',
    'OpenAI',
    'Shopify',
    'Figma',
  ].includes(t.name),
)

/**
 * Filter the full stack by category.
 * Used on the /services hub page technology breakdown.
 *
 * e.g. getTechByCategory('AI & ML')
 */
export function getTechByCategory(category: TechCategory): TechItem[] {
  return techStack.filter(t => t.category === category)
}

/**
 * Get tech items relevant to a specific service slug.
 * Maps service slugs to the most relevant tech categories.
 */
export function getTechForService(serviceSlug: string): TechItem[] {
  const categoryMap: Record<string, TechCategory[]> = {
    'saas-development':  ['Frontend', 'Backend', 'Database', 'Cloud & Infra'],
    'ai-automation':     ['AI & ML', 'Backend', 'Database'],
    'ecommerce':         ['E-Commerce', 'Frontend', 'Backend'],
    'data-analytics':    ['Database', 'Backend', 'Analytics', 'Cloud & Infra'],
    'ui-ux-design':      ['Design', 'Frontend'],
    'digital-marketing': ['Analytics', 'E-Commerce'],
    'performance':       ['Frontend', 'Cloud & Infra'],
    'maintenance':       ['Cloud & Infra', 'Backend'],
  }

  const categories = categoryMap[serviceSlug] ?? []
  return techStack.filter(t => categories.includes(t.category))
}