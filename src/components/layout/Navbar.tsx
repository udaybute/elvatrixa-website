'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link                from 'next/link'
import { usePathname }     from 'next/navigation'
import { serviceNavItems } from '@/data/services'

/* ─── Nav items ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Work',     href: '/work'     },
  { label: 'About',    href: '/about'    },
  { label: 'Pricing',  href: '/pricing'  },
  { label: 'Blog',     href: '/blog'     },
] as const

/* ─── Icons ─────────────────────────────────────────────────── */
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="9" height="9" viewBox="0 0 9 9"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
  >
    <path d="M1.5 3l3 3 3-3" />
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="3" y1="5" x2="17" y2="5" />
    <line x1="3" y1="10" x2="17" y2="10" />
    <line x1="3" y1="15" x2="12" y2="15" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="3" x2="15" y2="15" />
    <line x1="15" y1="3" x2="3" y2="15" />
  </svg>
)

/* Service icons — one per service slug */
const SVC_ICONS: Record<string, React.FC<{ size?: number }>> = {
  Settings2:   ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85" />
    </svg>
  ),
  Bot:         ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <rect x="2" y="6" width="12" height="7" rx="1.5" />
      <path d="M5.5 9.5h.01M10.5 9.5h.01M6 12h4" />
      <path d="M8 6V3.5M6 3.5h4" />
    </svg>
  ),
  ShoppingBag: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M3 5h10l-1.2 7H4.2L3 5z" />
      <path d="M6 5c0-1.5.8-2.5 2-2.5S10 3.5 10 5" />
    </svg>
  ),
  BarChart3:   ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <line x1="3"  y1="13" x2="3"  y2="7"  />
      <line x1="7"  y1="13" x2="7"  y2="3"  />
      <line x1="11" y1="13" x2="11" y2="8"  />
      <line x1="15" y1="13" x2="15" y2="5"  />
      <line x1="1"  y1="13" x2="15" y2="13" />
    </svg>
  ),
  Layers:      ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M1.5 8l6.5-3.5L14.5 8 8 11.5 1.5 8z" />
      <path d="M1.5 11.5L8 15l6.5-3.5" />
      <path d="M1.5 4.5L8 1l6.5 3.5" />
    </svg>
  ),
  Megaphone:   ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M5 7v4l1.5 2.5H3.5A.5.5 0 013 13V7.5A.5.5 0 013.5 7H5z" />
      <path d="M5 7L12 3.5v9L5 11V7z" />
      <path d="M13.5 5.5c.8.7 1.2 1.7 1.2 2.5s-.4 1.8-1.2 2.5" />
    </svg>
  ),
  Zap:         ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M9.5 1.5L3.5 9h5l-2 5.5 7-8.5H8l1.5-4.5z" />
    </svg>
  ),
  Shield:      ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M8 1.5L2.5 4v4.5c0 3 2 5.5 5.5 6.5 3.5-1 5.5-3.5 5.5-6.5V4L8 1.5z" />
      <path d="M5.5 8.5l2 2 3.5-3.5" />
    </svg>
  ),
}

/* ─── Brand wordmark ─────────────────────────────────────────── */
const Wordmark = () => (
  <span className="flex items-center gap-2.5 select-none">
    {/* Gold diamond mark */}
    <span
      aria-hidden="true"
      style={{
        width: 7, height: 7,
        background: 'var(--gold)',
        display: 'inline-block',
        transform: 'rotate(45deg)',
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontFamily:    'var(--font-display)',
        fontSize:      '20px',
        fontWeight:    700,
        letterSpacing: '-0.04em',
        color:         '#F8F9FC',
        lineHeight:    1,
      }}
    >
      Elvatrixa
    </span>
  </span>
)

/* ─── Mega menu ─────────────────────────────────────────────── */
function MegaMenu({ visible }: { visible: boolean }) {
  return (
    <div
      role="menu"
      aria-hidden={!visible}
      style={{
        position:     'absolute',
        top:          'calc(100% + 10px)',
        left:         '50%',
        transform:    `translateX(-50%) translateY(${visible ? '0' : '-6px'})`,
        width:        '580px',
        background:   '#0D111C',
        border:       '1px solid rgba(201,168,76,0.15)',
        borderTop:    '2px solid var(--gold)',
        borderRadius: '12px',
        boxShadow:    '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.04)',
        opacity:      visible ? 1 : 0,
        pointerEvents:visible ? 'auto' : 'none',
        transition:   'opacity 0.18s ease, transform 0.18s ease',
        zIndex:       100,
        overflow:     'hidden',
      }}
    >
      <div style={{ padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
        {serviceNavItems.map(item => {
          const Icon = SVC_ICONS[item.icon] ?? SVC_ICONS.Shield
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="group"
              style={{
                display:      'flex',
                alignItems:   'flex-start',
                gap:          '12px',
                padding:      '11px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition:   'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.07)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {/* Icon container */}
              <span style={{
                flexShrink:      0,
                width:           32,
                height:          32,
                borderRadius:    '7px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                background:      'rgba(201,168,76,0.08)',
                border:          '1px solid rgba(201,168,76,0.18)',
                color:           'var(--gold)',
                transition:      'background 0.15s, border-color 0.15s',
              }}>
                <Icon size={15} />
              </span>

              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                <span style={{
                  fontFamily:  'var(--font-body)',
                  fontWeight:  600,
                  fontSize:    '13px',
                  color:       '#E5E7EB',
                  lineHeight:  '1.2',
                  transition:  'color 0.15s',
                }}
                  className="group-hover:text-white"
                >
                  {item.label}
                </span>
                {item.description && (
                  <span style={{
                    fontFamily:   'var(--font-body)',
                    fontSize:     '11px',
                    color:        '#6B7280',
                    lineHeight:   '1.4',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                  }}>
                    {item.description}
                  </span>
                )}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Footer bar */}
      <div style={{
        padding:       '9px 16px',
        borderTop:     '1px solid rgba(255,255,255,0.06)',
        display:       'flex',
        justifyContent:'space-between',
        alignItems:    'center',
        background:    'rgba(0,0,0,0.2)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4B5563' }}>
          8 Services Available
        </span>
        <Link href="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', transition: 'opacity 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
          View all services →
        </Link>
      </div>
    </div>
  )
}

/* ─── Mobile menu ───────────────────────────────────────────── */
function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean
  onClose: () => void
  pathname: string
}) {
  const [servicesOpen, setServicesOpen] = useState(false)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Reset sub-menu when panel closes
  useEffect(() => {
    if (!open) setServicesOpen(false)
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        200,
          background:    'rgba(4,8,18,0.80)',
          backdropFilter:'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          opacity:        open ? 1 : 0,
          pointerEvents:  open ? 'auto' : 'none',
          transition:    'opacity 0.3s ease',
        }}
      />

      {/* Slide-in drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position:  'fixed',
          top:       0,
          right:     0,
          bottom:    0,
          zIndex:    300,
          width:     'min(340px, 88vw)',
          display:   'flex',
          flexDirection: 'column',
          background: '#0D111C',
          borderLeft: '1px solid rgba(201,168,76,0.12)',
          transform:  open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          padding:       '18px 20px',
          borderBottom:  '1px solid rgba(255,255,255,0.06)',
        }}>
          <Link href="/" onClick={onClose}>
            <Wordmark />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              width:          32,
              height:         32,
              borderRadius:  '6px',
              border:        '1px solid rgba(255,255,255,0.08)',
              background:    'transparent',
              color:         '#9CA3AF',
              cursor:        'pointer',
              transition:    'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F8F9FC'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px', listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_LINKS.map(link => {
              const active = isActive(link.href)

              if ('hasMega' in link && link.hasMega) {
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => setServicesOpen(v => !v)}
                      style={{
                        width:         '100%',
                        display:       'flex',
                        alignItems:    'center',
                        justifyContent:'space-between',
                        padding:       '11px 14px',
                        borderRadius:  '8px',
                        border:        'none',
                        cursor:        'pointer',
                        fontFamily:    'var(--font-body)',
                        fontWeight:    500,
                        fontSize:      '14.5px',
                        background:    servicesOpen || isActive('/services') ? 'rgba(201,168,76,0.08)' : 'transparent',
                        color:         servicesOpen || isActive('/services') ? 'var(--gold)' : '#CBD5E1',
                        transition:    'background 0.15s, color 0.15s',
                      }}
                    >
                      Services <ChevronIcon open={servicesOpen} />
                    </button>

                    <div style={{
                      overflow:   'hidden',
                      maxHeight:  servicesOpen ? '800px' : '0',
                      transition: 'max-height 0.3s ease',
                      marginLeft: '8px',
                      paddingLeft:'12px',
                      borderLeft: '1px solid rgba(201,168,76,0.12)',
                      marginTop:  servicesOpen ? '4px' : '0',
                    }}>
                      {serviceNavItems.map(item => {
                        const Icon = SVC_ICONS[item.icon] ?? SVC_ICONS.Shield
                        const itemActive = isActive(item.href)
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            style={{
                              display:    'flex',
                              alignItems: 'center',
                              gap:        '10px',
                              padding:    '9px 12px',
                              borderRadius:'6px',
                              textDecoration:'none',
                              fontFamily: 'var(--font-body)',
                              fontSize:   '13px',
                              color:      itemActive ? 'var(--gold)' : '#9CA3AF',
                              transition: 'color 0.15s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = itemActive ? 'var(--gold)' : '#9CA3AF' }}
                          >
                            <span style={{ color: 'var(--gold)', opacity: 0.7, flexShrink: 0 }}>
                              <Icon size={13} />
                            </span>
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </li>
                )
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    style={{
                      display:       'flex',
                      alignItems:    'center',
                      justifyContent:'space-between',
                      padding:       '11px 14px',
                      borderRadius:  '8px',
                      textDecoration:'none',
                      fontFamily:    'var(--font-body)',
                      fontWeight:    500,
                      fontSize:      '14.5px',
                      background:    active ? 'rgba(201,168,76,0.08)' : 'transparent',
                      color:         active ? 'var(--gold)' : '#CBD5E1',
                      transition:    'background 0.15s, color 0.15s',
                    }}
                  >
                    {link.label}
                    {active && (
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA footer */}
        <div style={{
          padding:    '16px 20px',
          borderTop:  '1px solid rgba(255,255,255,0.06)',
          display:    'flex',
          flexDirection:'column',
          gap:        '10px',
        }}>
          <a
            href="https://calendly.com/elvatrixa/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}
          >
            Book a Free Strategy Call
          </a>
          <p style={{
            textAlign:    'center',
            fontFamily:   'var(--font-mono)',
            fontSize:     '9px',
            letterSpacing:'0.15em',
            textTransform:'uppercase',
            color:        '#4B5563',
          }}>
            Free 30-min · No obligation
          </p>
        </div>
      </div>
    </>
  )
}

/* ─── Navbar ────────────────────────────────────────────────── */
export default function Navbar() {
  const pathname   = usePathname()
  const [scrolled, setScrolled]   = useState(false)
  const [megaOpen, setMegaOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const openMega  = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    setMegaOpen(true)
  }, [])

  const closeMega = useCallback(() => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 160)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        style={{
          position:          'fixed',
          top:               0,
          left:              0,
          right:             0,
          zIndex:            50,
          transition:        'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          background:        scrolled ? 'rgba(6,13,26,0.94)' : 'transparent',
          backdropFilter:    scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom:      scrolled ? '1px solid rgba(201,168,76,0.10)' : '1px solid transparent',
          boxShadow:         scrolled ? '0 1px 40px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="section-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

            {/* ── Wordmark ── */}
            <Link href="/" aria-label="Elvatrixa — back to homepage" style={{ flexShrink: 0, textDecoration: 'none' }}>
              <Wordmark />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex" aria-label="Main navigation" style={{ alignItems: 'center', gap: '2px' }}>
              {NAV_LINKS.map(link => {
                const active = isActive(link.href)

                if ('hasMega' in link && link.hasMega) {
                  return (
                    <div
                      key={link.href}
                      style={{ position: 'relative' }}
                      onMouseEnter={openMega}
                      onMouseLeave={closeMega}
                    >
                      <button
                        aria-haspopup="menu"
                        aria-expanded={megaOpen}
                        onClick={() => setMegaOpen(v => !v)}
                        style={{
                          display:    'flex',
                          alignItems: 'center',
                          gap:        '5px',
                          padding:    '7px 13px',
                          borderRadius:'6px',
                          border:     'none',
                          background: 'transparent',
                          cursor:     'pointer',
                          fontFamily: 'var(--font-body)',
                          fontSize:   '13.5px',
                          fontWeight: 500,
                          letterSpacing: '0.01em',
                          color:      active ? 'var(--gold)' : '#CBD5E1',
                          transition: 'color 0.15s',
                          position:   'relative',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F8F9FC' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active ? 'var(--gold)' : '#CBD5E1' }}
                      >
                        {link.label}
                        <ChevronIcon open={megaOpen} />
                        {active && (
                          <span style={{
                            position: 'absolute', bottom: 1, left: 13, right: 13,
                            height: '1px', background: 'var(--gold)',
                          }} />
                        )}
                      </button>
                      <MegaMenu visible={megaOpen} />
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      display:     'block',
                      padding:     '7px 13px',
                      borderRadius:'6px',
                      fontFamily:  'var(--font-body)',
                      fontSize:    '13.5px',
                      fontWeight:  500,
                      letterSpacing:'0.01em',
                      color:       active ? 'var(--gold)' : '#CBD5E1',
                      textDecoration: 'none',
                      position:    'relative',
                      transition:  'color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F8F9FC' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = active ? 'var(--gold)' : '#CBD5E1' }}
                  >
                    {link.label}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: 1, left: 13, right: 13,
                        height: '1px', background: 'var(--gold)',
                      }} />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Desktop right: availability + CTA ── */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '6px',
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '10px',
                  letterSpacing:'0.12em',
                  textTransform:'uppercase',
                  color:       '#9CA3AF',
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
                2 slots left
              </span>
              <a
                href="https://calendly.com/elvatrixa/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '9px 18px', fontSize: '12px', letterSpacing: '0.06em' }}
              >
                Book a Free Call
              </a>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="flex md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              style={{
                alignItems:    'center',
                justifyContent:'center',
                width:          38,
                height:         38,
                borderRadius:  '7px',
                border:        '1px solid rgba(255,255,255,0.10)',
                color:         '#CBD5E1',
                background:    'transparent',
                cursor:        'pointer',
                transition:    'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#CBD5E1'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)' }}
            >
              <MenuIcon />
            </button>

          </div>
        </div>
      </header>

      {/* Spacer so content doesn't sit behind fixed header */}
      <div style={{ height: '68px' }} aria-hidden="true" />

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  )
}
