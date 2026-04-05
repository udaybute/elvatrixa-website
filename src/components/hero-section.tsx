"use client";

import React, { useEffect, useRef } from "react";

/* ── Elvatrixa navy / gold palette ── */
const colors = {
  50:  "#F8F9FC",   // page-light
  100: "#E8E4D4",   // warm cream
  200: "#C9A84C",   // Elvatrixa gold
  300: "#A68A2E",   // gold-dark
  400: "#9CA3AF",   // muted text
  500: "#C9A84C",   // gold (glow)
  600: "#1D3461",   // mid navy
  700: "#0F1E3D",   // deep navy
  800: "#0A1628",   // Elvatrixa navy
  900: "#060D1A",   // darkest
};

const STYLES = `
  @keyframes ev-word-appear {
    0%   { opacity: 0; transform: translateY(24px) scale(0.85); filter: blur(8px); }
    60%  { opacity: 0.9; transform: translateY(4px) scale(0.98); filter: blur(1px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes ev-pulse-glow {
    0%   { opacity: 0.15; transform: translate(-50%,-50%) scale(1); }
    50%  { opacity: 0.4;  transform: translate(-50%,-50%) scale(12); }
    100% { opacity: 0;    transform: translate(-50%,-50%) scale(20); }
  }
`;

export function HeroSection() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>(".ev-word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.opacity   = "0";
        word.style.animation = "ev-word-appear 0.8s ease-out forwards";
      }, delay);
    });

    // Mouse gradient
    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top  = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Word hover glow
    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(201,168,76,0.45)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    // Click ripple
    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position     = "fixed";
      ripple.style.left         = e.clientX + "px";
      ripple.style.top          = e.clientY + "px";
      ripple.style.width        = "4px";
      ripple.style.height       = "4px";
      ripple.style.background   = "rgba(201,168,76,0.5)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform    = "translate(-50%, -50%)";
      ripple.style.pointerEvents= "none";
      ripple.style.animation    = "ev-pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);

    // Floating elements on scroll
    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll<HTMLElement>(".ev-floating").forEach((el, i) => {
          setTimeout(() => { el.style.animationPlayState = "running"; }, i * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    <div
      className="min-h-screen text-[#F8F9FC] font-primary overflow-hidden relative w-full"
      style={{
        background: `linear-gradient(135deg, ${colors[900]} 0%, ${colors[800]} 50%, ${colors[700]} 100%)`,
      }}
    >
      {/* ── SVG grid ── */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ev-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(201,168,76,0.07)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ev-grid)" />
        <line x1="0"   y1="20%" x2="100%" y2="20%" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" style={{ animationDelay: "0.5s" }} />
        <line x1="0"   y1="80%" x2="100%" y2="80%" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" style={{ animationDelay: "1s" }} />
        <line x1="20%" y1="0"   x2="20%"  y2="100%" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" style={{ animationDelay: "1.5s" }} />
        <line x1="80%" y1="0"   x2="80%"  y2="100%" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5" style={{ animationDelay: "2s" }} />
        <line x1="50%" y1="0"   x2="50%"  y2="100%" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" style={{ animationDelay: "2.5s" }} />
        <line x1="0"   y1="50%" x2="100%" y2="50%"   stroke="rgba(201,168,76,0.04)" strokeWidth="0.5" style={{ animationDelay: "3s" }} />
        <circle cx="20%" cy="20%" r="2" fill="rgba(201,168,76,0.3)" style={{ animationDelay: "3s" }} />
        <circle cx="80%" cy="20%" r="2" fill="rgba(201,168,76,0.3)" style={{ animationDelay: "3.2s" }} />
        <circle cx="20%" cy="80%" r="2" fill="rgba(201,168,76,0.3)" style={{ animationDelay: "3.4s" }} />
        <circle cx="80%" cy="80%" r="2" fill="rgba(201,168,76,0.3)" style={{ animationDelay: "3.6s" }} />
        <circle cx="50%" cy="50%" r="1.5" fill="rgba(201,168,76,0.2)" style={{ animationDelay: "4s" }} />
      </svg>

      {/* ── Floating ambient dots ── */}
      <div className="ev-floating absolute w-1 h-1 rounded-full opacity-20" style={{ top: "25%", left: "15%", background: colors[200], animationDelay: "5s" }} />
      <div className="ev-floating absolute w-1 h-1 rounded-full opacity-20" style={{ top: "60%", left: "85%", background: colors[200], animationDelay: "5.5s" }} />
      <div className="ev-floating absolute w-1 h-1 rounded-full opacity-20" style={{ top: "40%", left: "10%", background: colors[200], animationDelay: "6s" }} />
      <div className="ev-floating absolute w-1 h-1 rounded-full opacity-20" style={{ top: "75%", left: "90%", background: colors[200], animationDelay: "6.5s" }} />

      {/* ── Gold top accent line ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colors[300]}80 25%, ${colors[200]} 50%, ${colors[300]}80 75%, transparent 100%)`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between items-center px-8 py-12 md:px-16 md:py-20">

        {/* Top tagline */}
        <div className="text-center">
          <h2
            className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80"
            style={{ color: colors[200] }}
          >
            <span className="ev-word opacity-0" data-delay="0">Welcome</span>{" "}
            <span className="ev-word opacity-0" data-delay="200">to</span>{" "}
            <span className="ev-word opacity-0" data-delay="400"><b>Elvatrixa</b></span>
            <span className="ev-word opacity-0" data-delay="600"> — </span>
            <span className="ev-word opacity-0" data-delay="800">Powering</span>{" "}
            <span className="ev-word opacity-0" data-delay="1000">your</span>{" "}
            <span className="ev-word opacity-0" data-delay="1200">digital</span>{" "}
            <span className="ev-word opacity-0" data-delay="1400">transformation.</span>
          </h2>
          <div
            className="mt-4 mx-auto w-16 h-px opacity-40"
            style={{ background: `linear-gradient(to right, transparent, ${colors[200]}, transparent)` }}
          />
        </div>

        {/* Main headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1
            className="font-display font-bold leading-tight tracking-tight"
            style={{ fontSize: "clamp(40px, 7vw, 96px)", lineHeight: "0.95", letterSpacing: "-0.03em" }}
          >
            <div className="mb-3">
              <span className="ev-word opacity-0 block" data-delay="1600" style={{ color: colors[50] }}>
                AI-Powered Websites
              </span>
              <span className="ev-word opacity-0 block" data-delay="1800" style={{ color: colors[50] }}>
                That Drive
              </span>
              <span
                className="ev-word opacity-0 block"
                data-delay="2000"
                style={{
                  background: `linear-gradient(135deg, ${colors[200]} 0%, ${colors[100]} 50%, ${colors[200]} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                40% More Conversions
              </span>
            </div>
            <div
              className="font-body font-light leading-relaxed mt-6"
              style={{ fontSize: "clamp(15px, 2vw, 20px)", color: colors[400], letterSpacing: "normal" }}
            >
              <span className="ev-word opacity-0" data-delay="2400">We build SaaS platforms,</span>{" "}
              <span className="ev-word opacity-0" data-delay="2600">AI automation systems,</span>{" "}
              <span className="ev-word opacity-0" data-delay="2800">and high-converting</span>{" "}
              <span className="ev-word opacity-0" data-delay="3000">digital products for</span>{" "}
              <span className="ev-word opacity-0" data-delay="3200">businesses in the US,</span>{" "}
              <span className="ev-word opacity-0" data-delay="3400">UK, and globally.</span>
            </div>
          </h1>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 opacity-0"
            style={{ animation: "ev-word-appear 1s ease-out forwards", animationDelay: "3.8s" }}
          >
            <a
              href="/contact"
              className="px-7 py-3.5 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${colors[200]}, ${colors[300]})`,
                color: colors[800],
                boxShadow: `0 4px 20px rgba(201,168,76,0.3)`,
              }}
            >
              Book a Free Strategy Call
            </a>
            <a
              href="/contact?type=audit"
              className="px-7 py-3.5 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: `1px solid ${colors[200]}40`,
                color: colors[200],
                background: "rgba(201,168,76,0.06)",
              }}
            >
              Get Free Website Audit →
            </a>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center">
          <div
            className="mb-4 mx-auto w-16 h-px opacity-40"
            style={{ background: `linear-gradient(to right, transparent, ${colors[200]}, transparent)` }}
          />
          <h2
            className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-70"
            style={{ color: colors[200] }}
          >
            <span className="ev-word opacity-0" data-delay="4200">Fixed-price projects</span>
            <span className="ev-word opacity-0" data-delay="4350"> · </span>
            <span className="ev-word opacity-0" data-delay="4400">US timezone overlap</span>
            <span className="ev-word opacity-0" data-delay="4550"> · </span>
            <span className="ev-word opacity-0" data-delay="4600">Enterprise-grade delivery.</span>
          </h2>
          {/* Scroll indicator dots */}
          <div
            className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{ animation: "ev-word-appear 1s ease-out forwards", animationDelay: "4.8s" }}
          >
            <div className="w-1 h-1 rounded-full opacity-40" style={{ background: colors[200] }} />
            <div className="w-1 h-1 rounded-full opacity-60" style={{ background: colors[200] }} />
            <div className="w-1 h-1 rounded-full opacity-40" style={{ background: colors[200] }} />
          </div>
        </div>

      </div>

      {/* ── Mouse-follow gold gradient ── */}
      <div
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background: `radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 100%)`,
        }}
      />
    </div>
    </>
  );
}
