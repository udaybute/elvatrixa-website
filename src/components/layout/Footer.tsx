/* ================================================================
   ELVATRIXA — FOOTER
   File: src/components/layout/Footer.tsx

   All icons are inline SVGs. Zero lucide-react dependency.
   All placeholder data filled in (columns, socialLinks).
================================================================ */

import Link            from 'next/link'
import Image           from 'next/image'
import { GoldDivider } from '@/components/ui/GoldLine'
import type { FooterColumn } from '@/types'


/* ── INLINE ICONS ────────────────────────────────────────────── */

function IconMail({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.29l3-.05a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
    </svg>
  )
}

function IconWhatsApp({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function IconArrowUpRight({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
    </svg>
  )
}

function IconLinkedin({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function IconTwitter({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function IconGithub({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}


/* ── FOOTER DATA ─────────────────────────────────────────────── */

const columns: FooterColumn[] = [
  {
    heading: 'Services',
    links: [
      { label: 'SaaS Development',  href: '/services/saas-development'  },
      { label: 'AI & Automation',   href: '/services/ai-automation'     },
      { label: 'E-Commerce',        href: '/services/ecommerce'         },
      { label: 'Data & Analytics',  href: '/services/data-analytics'    },
      { label: 'UI/UX Design',      href: '/services/ui-ux-design'      },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Performance',       href: '/services/performance'       },
      { label: 'Maintenance',       href: '/services/maintenance'       },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '/about'   },
      { label: 'Work',    href: '/work'    },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog',    href: '/blog'    },
      { label: 'FAQ',     href: '/faq'     },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use',   href: '/terms'   },
      { label: 'Cookie Policy',  href: '/cookies' },
    ],
  },
]

const socialLinks = [
  { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/elvatrixa', Icon: IconLinkedin },
  { label: 'Twitter / X', href: 'https://twitter.com/elvatrixa',              Icon: IconTwitter  },
  { label: 'GitHub',      href: 'https://github.com/elvatrixa',               Icon: IconGithub   },
]

const legalLinks = [
  { label: 'Privacy',  href: '/privacy' },
  { label: 'Terms',    href: '/terms'   },
  { label: 'Cookies',  href: '/cookies' },
]


/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-border-subtle"
      style={{ background: 'var(--bg-0)' }}
      aria-label="Site footer"
    >

      {/* ── Main grid ── */}
      <div className="section-container section-pad-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Logo */}
            <Link
              href="/"
              className="w-fit group"
              aria-label="Elvatrixa homepage"
            >
              <Image
                src="/logo-full.png"
                alt="Elvatrixa"
                width={150}
                height={62}
                style={{ display: 'block' }}
                className="transition-opacity duration-normal group-hover:opacity-80"
              />
            </Link>

            {/* Tagline */}
            <p className="font-body text-sm leading-relaxed max-w-[300px]" style={{ color: 'var(--text-3)' }}>
              Digital Innovation Studio building world-class SaaS platforms,
              AI automation systems, and high-converting digital products
              for scaling businesses in the US and UK.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hello@elvatrixa.com"
                className="flex items-center gap-2 font-mono text-xs w-fit group transition-colors duration-fast hover:text-gold"
                style={{ color: 'var(--text-3)' }}
              >
                <span style={{ color: 'var(--text-4)' }} className="group-hover:text-gold transition-colors duration-fast">
                  <IconMail size={13} />
                </span>
                hello@elvatrixa.com
              </a>

              <a
                href="tel:+918668296156"
                className="flex items-center gap-2 font-mono text-xs w-fit group transition-colors duration-fast hover:text-gold"
                style={{ color: 'var(--text-3)' }}
              >
                <span style={{ color: 'var(--text-4)' }} className="group-hover:text-gold transition-colors duration-fast">
                  <IconPhone size={13} />
                </span>
                +91 86682 96156
              </a>

              <a
                href="https://wa.me/918668296156"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs w-fit group transition-colors duration-fast"
                style={{ color: 'var(--teal)' }}
              >
                <IconWhatsApp size={13} />
                WhatsApp
                <IconArrowUpRight size={10} />
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2" role="list" aria-label="Social media links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  role="listitem"
                  className="flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-fast hover:text-gold hover:border-gold-border"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    color:  'var(--text-4)',
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {columns.map(col => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3
                className="font-mono text-xs font-medium tracking-widest uppercase"
                style={{ color: 'var(--text-1)' }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2" role="list">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm transition-colors duration-fast hover:text-gold"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gold divider ── */}
      <GoldDivider subtle />

      {/* ── Bottom bar ── */}
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">

          <p className="font-mono text-xs" style={{ color: 'var(--text-4)' }}>
            © {year} Elvatrixa. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {legalLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs transition-colors duration-fast hover:text-text-3"
                style={{ color: 'var(--text-4)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px]" style={{ color: 'var(--text-4)' }}>elvatrixa.com</span>
            <span className="w-px h-3" style={{ background: 'var(--border-subtle)' }} aria-hidden="true" />
            <span className="font-mono text-[10px]" style={{ color: 'var(--text-4)' }}>elvatrixa.co.uk</span>
          </div>
        </div>
      </div>

    </footer>
  )
}