/* ================================================================
   ELVATRIXA — MOBILE MENU
   File: src/components/layout/MobileMenu.tsx

   Full-screen overlay that slides in from the right.
   Triggered by the hamburger button in Navbar.tsx.

   Features:
   - Slides in from right (translateX animation)
   - Services accordion expands inline — no separate page
   - "Book a Call" CTA always pinned to bottom
   - WhatsApp link pinned above CTA
   - ESC key closes the menu
   - Body scroll locked while open
   - Focus trap inside menu while open
================================================================ */

'use client'

import { useEffect, useRef }  from 'react'
import Link                   from 'next/link'
import { usePathname }        from 'next/navigation'
import {
  X, ChevronDown, Phone, MessageCircle,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { cn }                 from '@/lib/utils'
import { serviceNavItems }    from '@/data/services'
import Button                 from '@/components/ui/Button'
import { useState }           from 'react'

/* ── TYPES ───────────────────────────────────────────────────── */

interface MobileMenuProps {
  isOpen:   boolean
  onClose:  () => void
}

/* ── NAV ITEMS ───────────────────────────────────────────────── */

const mainLinks = [
  { label: 'Home',     href: '/'        },
  { label: 'Work',     href: '/work'    },
  { label: 'About',    href: '/about'   },
  { label: 'Pricing',  href: '/pricing' },
  { label: 'Blog',     href: '/blog'    },
  { label: 'FAQ',      href: '/faq'     },
]

/* ── COMPONENT ───────────────────────────────────────────────── */

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname                          = usePathname()
  const [servicesOpen, setServicesOpen]   = useState(false)
  const menuRef                           = useRef<HTMLDivElement>(null)
  const firstFocusRef                     = useRef<HTMLButtonElement>(null)

  /* ── Close on route change ── */
  useEffect(() => {
    onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /* ── ESC key ── */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      /* Move focus into menu */
      setTimeout(() => firstFocusRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* ── Active check ── */
  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-overlay',
          'bg-navy-0/80 backdrop-blur-sm',
          'transition-opacity duration-slow',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />

      {/* ── Panel ──────────────────────────────────────── */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-modal',
          'w-full max-w-sm',
          'flex flex-col',
          'bg-navy-3 border-l border-border-subtle',
          'transition-transform duration-slow ease-luxury',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
          <Link
            href="/"
            onClick={onClose}
            className="font-display font-bold text-xl text-text-1"
          >
            Elvatrixa
          </Link>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className={cn(
              'flex items-center justify-center',
              'w-9 h-9 rounded-sm',
              'text-text-3 hover:text-text-1',
              'border border-border-subtle hover:border-border-medium',
              'transition-colors duration-fast',
            )}
            aria-label="Close menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* ── Nav links ──────────────────────────────── */}
        <nav
          className="flex-1 overflow-y-auto px-4 py-6"
          aria-label="Mobile navigation links"
        >
          <ul className="flex flex-col gap-1" role="list">

            {/* Main links */}
            {mainLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-3 py-3 rounded-md',
                    'font-body text-base font-medium',
                    'transition-colors duration-fast',
                    isActive(link.href)
                      ? 'text-gold bg-gold-dim'
                      : 'text-text-2 hover:text-text-1 hover:bg-white/[0.03]',
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      className="ml-auto w-1 h-1 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}

            {/* Services accordion */}
            <li>
              <button
                onClick={() => setServicesOpen(v => !v)}
                className={cn(
                  'w-full flex items-center justify-between',
                  'px-3 py-3 rounded-md',
                  'font-body text-base font-medium',
                  'transition-colors duration-fast',
                  (isActive('/services') || servicesOpen)
                    ? 'text-gold bg-gold-dim'
                    : 'text-text-2 hover:text-text-1 hover:bg-white/[0.03]',
                )}
                aria-expanded={servicesOpen}
                aria-controls="mobile-services"
              >
                Services
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform duration-normal',
                    servicesOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Services sub-list */}
              <div
                id="mobile-services"
                className={cn(
                  'overflow-hidden transition-all duration-normal ease-luxury',
                  servicesOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                <ul
                  className="mt-1 ml-3 pl-3 border-l border-border-subtle flex flex-col gap-0.5"
                  role="list"
                >
                  {serviceNavItems.map(service => {
                    const IconComponent = (
                      LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>
                    )[service.icon] ?? LucideIcons.Settings2

                    return (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-2.5 px-3 py-2.5 rounded-md',
                            'font-body text-sm',
                            'transition-colors duration-fast',
                            isActive(service.href)
                              ? 'text-gold bg-gold-dim'
                              : 'text-text-3 hover:text-text-1 hover:bg-white/[0.03]',
                          )}
                        >
                          <IconComponent
                            size={14}
                            className="shrink-0 text-gold/60"
                            aria-hidden="true"
                          />
                          {service.label}
                        </Link>
                      </li>
                    )
                  })}
                  {/* View all */}
                  <li>
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-md font-mono text-xs text-gold hover:text-gold-light transition-colors duration-fast"
                    >
                      View all services →
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

          </ul>

          {/* ── Divider ── */}
          <div className="my-6 h-px bg-border-subtle" aria-hidden="true" />

          {/* ── Contact links ── */}
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/918668296156"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-md',
                'font-body text-sm text-text-3 hover:text-teal',
                'hover:bg-teal-dim',
                'transition-colors duration-fast',
              )}
            >
              <MessageCircle size={16} className="text-teal shrink-0" aria-hidden="true" />
              WhatsApp Us
            </a>
            <a
              href="mailto:hello@elvatrixa.com"
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-md',
                'font-body text-sm text-text-3 hover:text-text-1',
                'hover:bg-white/[0.03]',
                'transition-colors duration-fast',
              )}
            >
              <Phone size={16} className="text-text-4 shrink-0" aria-hidden="true" />
              hello@elvatrixa.com
            </a>
          </div>
        </nav>

        {/* ── Pinned CTA ──────────────────────────────── */}
        <div className="px-6 py-5 border-t border-border-subtle">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={onClose}
          >
            Book a Free Strategy Call
          </Button>
          <p className="mt-3 text-center font-body text-xs text-text-4">
            Free 30-min call · No obligation
          </p>
        </div>

      </div>
    </>
  )
}