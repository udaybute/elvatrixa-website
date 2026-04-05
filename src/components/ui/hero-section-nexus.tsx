"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
  type SVGProps,
} from "react";
import {
  motion,
  AnimatePresence,
  type Transition,
  type VariantLabels,
  type Target,
  type AnimationControls,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import Link from "next/link";

/* ─── Utility ─────────────────────────────────────────────────── */
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─── Elvatrixa palette ────────────────────────────────────────── */
const GOLD   = "#C9A84C";
const NAVY   = "#060D1A";
const NAVY_2 = "#0A1628";

/* ═══════════════════════════════════════════════════════════════
   ROTATING TEXT
═══════════════════════════════════════════════════════════════ */
interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | AnimationControls | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0.01,
      staggerFrom = "last",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        try {
          const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
          return Array.from(segmenter.segment(text), (s) => s.segment);
        } catch {
          return text.split("");
        }
      }
      return text.split("");
    };

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex] ?? "";
      if (splitBy === "characters") {
        const words = currentText.split(/(\s+)/);
        let charCount = 0;
        return words
          .filter((p) => p.length > 0)
          .map((part) => {
            const isSpace = /^\s+$/.test(part);
            const chars = isSpace ? [part] : splitIntoCharacters(part);
            const startIndex = charCount;
            charCount += chars.length;
            return { characters: chars, isSpace, startIndex };
          });
      }
      if (splitBy === "words") {
        return currentText
          .split(/(\s+)/)
          .filter((w) => w.length > 0)
          .map((word, i) => ({
            characters: [word],
            isSpace: /^\s+$/.test(word),
            startIndex: i,
          }));
      }
      return currentText.split("\n").map((line, i) => ({
        characters: [line],
        isSpace: false,
        startIndex: i,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const totalElements = useMemo(
      () => elements.reduce((sum, el) => sum + el.characters.length, 0),
      [elements]
    );

    const getStaggerDelay = useCallback(
      (index: number, total: number): number => {
        if (total <= 1 || !staggerDuration) return 0;
        const s = staggerDuration;
        if (staggerFrom === "first") return index * s;
        if (staggerFrom === "last") return (total - 1 - index) * s;
        if (staggerFrom === "center") return Math.abs((total - 1) / 2 - index) * s;
        if (staggerFrom === "random") return Math.random() * (total - 1) * s;
        if (typeof staggerFrom === "number")
          return Math.abs(Math.max(0, Math.min(staggerFrom, total - 1)) - index) * s;
        return index * s;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const n =
        currentTextIndex === texts.length - 1
          ? loop ? 0 : currentTextIndex
          : currentTextIndex + 1;
      if (n !== currentTextIndex) handleIndexChange(n);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const p =
        currentTextIndex === 0
          ? loop ? texts.length - 1 : currentTextIndex
          : currentTextIndex - 1;
      if (p !== currentTextIndex) handleIndexChange(p);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const v = Math.max(0, Math.min(index, texts.length - 1));
        if (v !== currentTextIndex) handleIndexChange(v);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next, previous, jumpTo, reset,
    ]);

    useEffect(() => {
      if (!auto || texts.length <= 1) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto, texts.length]);

    return (
      <motion.span
        className={cn(
          "inline-flex flex-wrap whitespace-pre-wrap relative align-bottom pb-[8px]",
          mainClassName
        )}
        {...rest}
        layout
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className="inline-flex flex-wrap flex-row items-baseline relative"
            layout
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {elements.map((el, elIdx) => (
              <span
                key={elIdx}
                className={cn("inline-flex", splitLevelClassName)}
                style={{ whiteSpace: "pre" }}
              >
                {el.characters.map((char, charIdx) => {
                  const globalIndex = el.startIndex + charIdx;
                  return (
                    <motion.span
                      key={`${char}-${charIdx}`}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(globalIndex, totalElements),
                      }}
                      className={cn(
                        "inline-block leading-none tracking-tight",
                        elementLevelClassName
                      )}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);
RotatingText.displayName = "RotatingText";

/* ═══════════════════════════════════════════════════════════════
   SHINY TEXT BADGE
═══════════════════════════════════════════════════════════════ */
const ShinyBadge: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => (
  <span className={cn("relative overflow-hidden inline-block", className)}>
    {text}
    <span
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
        animation: "ev-shine 2.5s infinite linear",
        pointerEvents: "none",
      }}
    />
    <style>{`@keyframes ev-shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
  </span>
);

/* ═══════════════════════════════════════════════════════════════
   CANVAS DOT GRID TYPES
═══════════════════════════════════════════════════════════════ */
interface Dot {
  x: number;
  y: number;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════════════════════════ */
export const ElvatrixaHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const DOT_SPACING        = 28;
  const BASE_OP_MIN        = 0.15;
  const BASE_OP_MAX        = 0.28;
  const BASE_RADIUS        = 1.2;
  const INTERACTION_RADIUS = 160;
  const INTERACTION_R_SQ   = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST      = 0.65;
  const RADIUS_BOOST       = 2.8;
  const GRID_CELL          = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

  const onMouseMove = useCallback((e: globalThis.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) { mouseRef.current = { x: null, y: null }; return; }
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (!width || !height) return;
    const dots: Dot[] = [];
    const grid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const key = `${Math.floor(x / GRID_CELL)}_${Math.floor(y / GRID_CELL)}`;
        if (!grid[key]) grid[key] = [];
        grid[key].push(dots.length);
        const op = Math.random() * (BASE_OP_MAX - BASE_OP_MIN) + BASE_OP_MIN;
        dots.push({
          x, y,
          targetOpacity: op,
          currentOpacity: op,
          opacitySpeed: Math.random() * 0.004 + 0.001,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = dots;
    gridRef.current = grid;
  }, [DOT_SPACING, GRID_CELL, BASE_OP_MIN, BASE_OP_MAX, BASE_RADIUS]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvasSizeRef.current = { width: w, height: h };
      createDots();
    }
  }, [createDots]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mx, y: my } = mouseRef.current;

    if (!ctx || !dots.length || !width || !height) {
      animFrameId.current = requestAnimationFrame(animate);
      return;
    }
    ctx.clearRect(0, 0, width, height);

    /* collect nearby dot indices via spatial grid */
    const near = new Set<number>();
    if (mx !== null && my !== null) {
      const cx = Math.floor(mx / GRID_CELL);
      const cy = Math.floor(my / GRID_CELL);
      const r  = Math.ceil(INTERACTION_RADIUS / GRID_CELL);
      for (let di = -r; di <= r; di++)
        for (let dj = -r; dj <= r; dj++) {
          const key = `${cx + di}_${cy + dj}`;
          grid[key]?.forEach((idx) => near.add(idx));
        }
    }

    dots.forEach((dot, idx) => {
      /* breathing opacity */
      dot.currentOpacity += dot.opacitySpeed;
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OP_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(BASE_OP_MIN, Math.min(dot.currentOpacity, BASE_OP_MAX));
        dot.targetOpacity = Math.random() * (BASE_OP_MAX - BASE_OP_MIN) + BASE_OP_MIN;
      }

      let factor = 0;
      dot.currentRadius = dot.baseRadius;
      if (mx !== null && my !== null && near.has(idx)) {
        const dx = dot.x - mx, dy = dot.y - my;
        const dSq = dx * dx + dy * dy;
        if (dSq < INTERACTION_R_SQ) {
          const t = 1 - Math.sqrt(dSq) / INTERACTION_RADIUS;
          factor = t * t;
        }
      }

      const finalOp = Math.min(1, dot.currentOpacity + factor * OPACITY_BOOST);
      dot.currentRadius = dot.baseRadius + factor * RADIUS_BOOST;

      ctx.beginPath();
      /* gold dots: rgba(201,168,76,...) */
      ctx.fillStyle = `rgba(201,168,76,${finalOp.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animFrameId.current = requestAnimationFrame(animate);
  }, [GRID_CELL, INTERACTION_RADIUS, INTERACTION_R_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OP_MIN, BASE_OP_MAX]);

  useEffect(() => {
    handleResize();
    const onLeave = () => { mouseRef.current = { x: null, y: null }; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("mouseleave", onLeave);
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [handleResize, onMouseMove, animate]);

  /* ── animation variants ── */
  const contentDelay    = 0.25;
  const inc             = 0.1;
  const fadeUp = (delay: number): Variants => ({
    hidden:  { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  });

  return (
    <div
      className="relative text-gray-300 min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_2} 100%)` }}
    >
      {/* Canvas interactive dot field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.85 }}
      />

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(6,13,26,0.85) 100%)",
        }}
      />

      {/* Gold top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px z-[2]"
        style={{
          background:
            `linear-gradient(90deg, transparent 0%, ${GOLD}60 25%, ${GOLD} 50%, ${GOLD}60 75%, transparent 100%)`,
        }}
      />

      {/* ── Main content ── */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-12 pb-20 relative z-10">

        {/* Announcement badge */}
        <motion.div
          variants={fadeUp(contentDelay)}
          initial="hidden"
          animate="visible"
          className="mb-7"
        >
          <ShinyBadge
            text="✦  Now accepting projects for Q3 2026  ✦"
            className="border px-5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase cursor-pointer transition-colors"
            style={{
              background: "rgba(201,168,76,0.06)",
              borderColor: `${GOLD}40`,
              color: GOLD,
            } as React.CSSProperties}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp(contentDelay + inc)}
          initial="hidden"
          animate="visible"
          className="font-display font-bold text-white leading-tight max-w-5xl mb-5"
          style={{ fontSize: "clamp(38px, 6.5vw, 88px)", letterSpacing: "-0.03em", lineHeight: "0.95" }}
        >
          We Build Digital Products<br />That Drive{" "}
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ height: "1.15em" }}
          >
            <RotatingText
              texts={["Revenue", "Conversions", "Growth", "Results", "Impact"]}
              mainClassName="mx-1"
              elementLevelClassName=""
              staggerFrom="last"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "110%", opacity: 0 }}
              staggerDuration={0.012}
              transition={{ type: "spring", damping: 18, stiffness: 250 }}
              rotationInterval={2400}
              splitBy="characters"
              auto
              loop
              style={{ color: GOLD }}
            />
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp(contentDelay + inc * 2)}
          initial="hidden"
          animate="visible"
          className="font-body text-gray-400 max-w-2xl mx-auto mb-10"
          style={{ fontSize: "clamp(15px, 1.9vw, 20px)", lineHeight: 1.7 }}
        >
          SaaS platforms, AI automation systems, and high-converting digital products
          for ambitious businesses in the{" "}
          <span style={{ color: "#D1D5DB" }}>US, UK, and beyond</span> — at half the
          cost of traditional agencies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(contentDelay + inc * 3)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
        >
          <motion.a
            href="/contact"
            className="px-7 py-3 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-all"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #A68A2E)`,
              color: NAVY,
              boxShadow: `0 4px 24px rgba(201,168,76,0.28)`,
            }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Book a Free Strategy Call
          </motion.a>
          <motion.a
            href="/contact?type=audit"
            className="px-7 py-3 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-all"
            style={{
              border: `1px solid ${GOLD}50`,
              color: GOLD,
              background: "rgba(201,168,76,0.06)",
            }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Get Free Website Audit →
          </motion.a>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={fadeUp(contentDelay + inc * 4)}
          initial="hidden"
          animate="visible"
          className="font-mono text-[11px] tracking-widest uppercase mb-12"
          style={{ color: "#6B7280" }}
        >
          Fixed-price · No hourly billing · 30-day guarantee
        </motion.p>

        {/* Trust signals row */}
        <motion.div
          variants={fadeUp(contentDelay + inc * 5)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2 mb-12"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#4B5563" }}>
            Trusted by businesses in
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-sm" style={{ color: "#9CA3AF" }}>
            {["🇺🇸 United States", "🇬🇧 United Kingdom", "🇦🇺 Australia", "🇨🇦 Canada"].map((c) => (
              <span key={c} className="whitespace-nowrap">{c}</span>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp(contentDelay + inc * 6)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "40%", label: "Avg Conversion Lift" },
            { value: "12+", label: "Countries Served" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="font-display font-bold leading-none"
                style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: GOLD }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-center" style={{ color: "#6B7280" }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </main>
    </div>
  );
};

export default ElvatrixaHero;
