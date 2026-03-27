/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { cn }          from '@/lib/utils'
import { serviceNavItems } from '@/data/services'

const ICON_MAP: Record<string, string> = {
  Settings2:'⚙',Bot:'🤖',ShoppingBag:'🛍',BarChart3:'📊',Layers:'🎨',Megaphone:'📣',Zap:'⚡',Shield:'🛡',
}

const NAV_LINKS = [
  { label:'Home',     href:'/'        },
  { label:'Services', href:'/services', hasMega:true },
  { label:'Work',     href:'/work'    },
  { label:'About',    href:'/about'   },
  { label:'Pricing',  href:'/pricing' },
  { label:'Blog',     href:'/blog'    },
] as const

const ChevronIcon = ({ open }:{open:boolean}) => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{transition:'transform 0.2s',transform:open?'rotate(180deg)':'rotate(0deg)'}}>
    <path d="M2 4l3.5 3.5L9 4"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 6h16M3 11h16M3 16h10"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 4l12 12M16 4L4 16"/>
  </svg>
)

function MegaMenu({ visible }:{visible:boolean}) {
  return (
    <div style={{
      position:'absolute',top:'100%',left:'50%',marginTop:'8px',width:'600px',
      background:'var(--bg-3)',border:'1px solid var(--border-subtle)',borderTop:'2px solid var(--gold)',
      borderRadius:'12px',boxShadow:'0 24px 64px rgba(0,0,0,0.5)',
      opacity:visible?1:0,
      transform:`translateX(-50%) translateY(${visible?'0px':'-8px'})`,
      pointerEvents:visible?'auto':'none',
      transition:'opacity 0.2s,transform 0.2s',zIndex:100,overflow:'hidden',
    }}>
      <div style={{padding:'16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4px'}}>
        {serviceNavItems.map(item=>(
          <Link key={item.href} href={item.href}
            style={{display:'flex',alignItems:'flex-start',gap:'12px',padding:'12px',borderRadius:'8px',textDecoration:'none',transition:'background 0.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--gold-dim)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
            <span style={{flexShrink:0,width:'32px',height:'32px',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px',background:'var(--gold-dim)',border:'1px solid var(--gold-border)'}}>
              {ICON_MAP[item.icon]??'◆'}
            </span>
            <span style={{display:'flex',flexDirection:'column',gap:'2px',minWidth:0}}>
              <span style={{fontFamily:'var(--font-body)',fontWeight:700,fontSize:'13px',color:'var(--text-1)',lineHeight:'1.2'}}>{item.label}</span>
              {item.description&&<span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'var(--text-4)',lineHeight:'1.4',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.description}</span>}
            </span>
          </Link>
        ))}
      </div>
      <div style={{padding:'10px 20px',borderTop:'1px solid var(--border-subtle)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--text-4)'}}>All Services</span>
        <Link href="/services" style={{fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--gold)',textDecoration:'none'}}>View all →</Link>
      </div>
    </div>
  )
}

function MobileMenu({open,onClose,pathname}:{open:boolean;onClose:()=>void;pathname:string}) {
  const [servicesOpen,setServicesOpen]=useState(false)

  useEffect(()=>{
    document.body.style.overflow=open?'hidden':''
    return ()=>{document.body.style.overflow=''}
  },[open])

  useEffect(()=>{
    if(!open)return
    const h=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()}
    document.addEventListener('keydown',h)
    return ()=>document.removeEventListener('keydown',h)
  },[open,onClose])

  const isActive=(href:string)=>href==='/'?pathname==='/':pathname.startsWith(href)

  return (
    <>
      <div aria-hidden="true" onClick={onClose} style={{position:'fixed',inset:0,zIndex:200,background:'rgba(6,8,16,0.75)',backdropFilter:'blur(4px)',opacity:open?1:0,pointerEvents:open?'auto':'none',transition:'opacity 0.3s'}}/>
      <div role="dialog" aria-modal="true" style={{position:'fixed',top:0,right:0,bottom:0,zIndex:300,width:'min(360px,90vw)',display:'flex',flexDirection:'column',background:'var(--bg-3)',borderLeft:'1px solid var(--border-subtle)',transform:open?'translateX(0)':'translateX(100%)',transition:'transform 0.3s cubic-bezier(0.16,1,0.3,1)'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',borderBottom:'1px solid var(--border-subtle)'}}>
          <Link href="/" onClick={onClose} style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'22px',color:'var(--gold)',textDecoration:'none'}}>Elvatrixa</Link>
          <button onClick={onClose} aria-label="Close" style={{padding:'4px',color:'var(--text-3)',border:'none',background:'none',cursor:'pointer'}}><CloseIcon/></button>
        </div>

        <nav style={{flex:1,overflowY:'auto',padding:'16px'}}>
          <ul style={{display:'flex',flexDirection:'column',gap:'2px',listStyle:'none',padding:0,margin:0}}>
            {NAV_LINKS.map(link=>{
              const active=isActive(link.href)
              if ('hasMega' in link && link.hasMega){
                return (
                  <li key={link.href}>
                    <button onClick={()=>setServicesOpen(v=>!v)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderRadius:'8px',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontWeight:500,fontSize:'15px',background:servicesOpen||isActive('/services')?'var(--gold-dim)':'transparent',color:servicesOpen||isActive('/services')?'var(--gold)':'var(--text-2)',transition:'background 0.15s,color 0.15s'}}>
                      Services <ChevronIcon open={servicesOpen}/>
                    </button>
                    <div style={{overflow:'hidden',maxHeight:servicesOpen?'600px':'0',transition:'max-height 0.3s ease',marginLeft:'12px',paddingLeft:'12px',borderLeft:'1px solid var(--border-subtle)'}}>
                      {serviceNavItems.map(item=>(
                        <Link key={item.href} href={item.href} onClick={onClose}
                          style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',borderRadius:'6px',textDecoration:'none',fontFamily:'var(--font-body)',fontSize:'13px',color:isActive(item.href)?'var(--gold)':'var(--text-3)',transition:'color 0.15s'}}
                          onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)'}}
                          onMouseLeave={e=>{e.currentTarget.style.color=isActive(item.href)?'var(--gold)':'var(--text-3)'}}>
                          <span style={{fontSize:'14px'}}>{ICON_MAP[item.icon]??'◆'}</span>{item.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                )
              }
              return (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderRadius:'8px',textDecoration:'none',fontFamily:'var(--font-body)',fontWeight:500,fontSize:'15px',background:active?'var(--gold-dim)':'transparent',color:active?'var(--gold)':'var(--text-2)',transition:'background 0.15s,color 0.15s'}}>
                    {link.label}
                    {active&&<span style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--gold)'}}/>}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div style={{height:'1px',background:'var(--border-subtle)',margin:'16px 0'}}/>
          <a href="https://wa.me/918668296156" target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 16px',borderRadius:'8px',textDecoration:'none',fontFamily:'var(--font-body)',fontSize:'14px',color:'var(--teal)',transition:'background 0.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--teal-dim)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
            💬 WhatsApp Us
          </a>
        </nav>

        <div style={{padding:'20px 24px',borderTop:'1px solid var(--border-subtle)',display:'flex',flexDirection:'column',gap:'10px'}}>
          <Link href="/contact" onClick={onClose} className="btn-primary" style={{textAlign:'center',width:'100%',justifyContent:'center'}}>Book a Free Strategy Call</Link>
          <p style={{textAlign:'center',fontFamily:'var(--font-mono)',fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--text-4)'}}>Free 30-min · No obligation</p>
        </div>
      </div>
    </>
  )
}

export default function Navbar() {
  const pathname=usePathname()
  const [scrolled,setScrolled]=useState(false)
  const [megaOpen,setMegaOpen]=useState(false)
  const [mobileOpen,setMobileOpen]=useState(false)
  const megaTimeout=useRef<ReturnType<typeof setTimeout>|null>(null)

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>12)
    window.addEventListener('scroll',h,{passive:true})
    h()
    return ()=>window.removeEventListener('scroll',h)
  },[])

  useEffect(()=>{setMegaOpen(false);setMobileOpen(false)},[pathname])

  const openMega=useCallback(()=>{
    if(megaTimeout.current)clearTimeout(megaTimeout.current)
    setMegaOpen(true)
  },[])
  const closeMega=useCallback(()=>{
    megaTimeout.current=setTimeout(()=>setMegaOpen(false),150)
  },[])

  const isActive=(href:string)=>href==='/'?pathname==='/':pathname.startsWith(href)

  return (
    <>
      <header style={{
        position:'fixed',top:0,left:0,right:0,zIndex:50,
        transition:'background 0.3s,border-color 0.3s,box-shadow 0.3s',
        background:scrolled?'rgba(13,17,23,0.92)':'transparent',
        backdropFilter:scrolled?'blur(16px) saturate(1.2)':'none',
        WebkitBackdropFilter:scrolled?'blur(16px) saturate(1.2)':'none',
        borderBottom:scrolled?'1px solid var(--border-subtle)':'1px solid transparent',
        boxShadow:scrolled?'0 4px 32px rgba(0,0,0,0.4)':'none',
      }}>
        <div className="section-container">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px'}}>

            <Link href="/" aria-label="Elvatrixa homepage"
              style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'26px',color:'var(--gold)',textDecoration:'none',flexShrink:0}}>
              Elvatrixa
            </Link>

            <nav className="hidden md:flex" aria-label="Main navigation" style={{alignItems:'center',gap:'4px'}}>
              {NAV_LINKS.map(link=>{
                const active=isActive(link.href)
                if ('hasMega' in link && link.hasMega){
                  return (
                    <div key={link.href} style={{position:'relative'}} onMouseEnter={openMega} onMouseLeave={closeMega}>
                      <button aria-haspopup="true" aria-expanded={megaOpen} onClick={()=>setMegaOpen(v=>!v)}
                        style={{display:'flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'6px',border:'none',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:500,background:'transparent',cursor:'pointer',color:active?'var(--gold)':'var(--text-2)',transition:'color 0.15s',position:'relative'}}
                        onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)'}}
                        onMouseLeave={e=>{e.currentTarget.style.color=active?'var(--gold)':'var(--text-2)'}}>
                        {link.label} <ChevronIcon open={megaOpen}/>
                        {active&&<span style={{position:'absolute',bottom:'2px',left:'14px',right:'14px',height:'1px',background:'var(--gold)'}}/>}
                      </button>
                      <MegaMenu visible={megaOpen}/>
                    </div>
                  )
                }
                return (
                  <Link key={link.href} href={link.href} aria-current={active?'page':undefined}
                    style={{display:'block',padding:'8px 14px',borderRadius:'6px',fontFamily:'var(--font-body)',fontSize:'14px',fontWeight:500,color:active?'var(--gold)':'var(--text-2)',textDecoration:'none',position:'relative',transition:'color 0.15s'}}
                    onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)'}}
                    onMouseLeave={e=>{e.currentTarget.style.color=active?'var(--gold)':'var(--text-2)'}}>
                    {link.label}
                    {active&&<span style={{position:'absolute',bottom:'2px',left:'14px',right:'14px',height:'1px',background:'var(--gold)'}}/>}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden md:flex" style={{alignItems:'center'}}>
              <Link href="/contact" className="btn-primary" style={{padding:'10px 20px',fontSize:'12px'}}>Book a Free Call</Link>
            </div>

            <button className="flex md:hidden" onClick={()=>setMobileOpen(true)} aria-label="Open navigation" aria-expanded={mobileOpen}
              style={{alignItems:'center',justifyContent:'center',width:'40px',height:'40px',borderRadius:'6px',border:'1px solid var(--border-subtle)',color:'var(--text-2)',background:'transparent',cursor:'pointer',transition:'border-color 0.15s,color 0.15s'}}
              onMouseEnter={e=>{e.currentTarget.style.color='var(--gold)';e.currentTarget.style.borderColor='var(--gold-border)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='var(--text-2)';e.currentTarget.style.borderColor='var(--border-subtle)'}}>
              <MenuIcon/>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={()=>setMobileOpen(false)} pathname={pathname}/>
      <div style={{height:'68px'}} aria-hidden="true"/>
    </>
  )
}