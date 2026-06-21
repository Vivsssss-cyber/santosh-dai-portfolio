"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

/* ─── TUNING KNOBS ─────────────────────────────────────────────
   DURATION  → travel time of one element (sec). Bigger = slower.
   STAGGER   → delay between each element starting (sec). Bigger = wider wave.
   DELAY     → pause before anything moves (sec).
   EASE      → cubic-bezier curve. This one = strong ease-out.
                Softer: [0.25, 0.1, 0.25, 1]. Snappier: [0.7, 0, 0.3, 1].
   ──────────────────────────────────────────────────────────── */
const DURATION = 1.0;
const STAGGER = 0.12;
const DELAY = 0.15;
const EASE = [0.16, 1, 0.3, 1] as const;

// Parent only orchestrates timing — it staggers every RevealLine beneath it,
// in DOM order, regardless of how deeply they're nested.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren: DELAY } },
};

// Each element starts pushed down (clipped by the mask), then slides up to 0.
const lineVariant: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DURATION, ease: EASE } },
};

/* ── RevealGroup ───────────────────────────────────────────────
   Wrap a region (e.g. the hero copy). Owns the single timeline:
   sets initial/animate once, then staggers all RevealLines inside.
   Honors prefers-reduced-motion (snaps straight to final state).    */
export function RevealGroup({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    <MotionTag
      className={className}
      variants={container}
      initial={reduce ? "show" : "hidden"}
      animate="show"
    >
      {children}
    </MotionTag>
  );
}

/* ── RevealLine ────────────────────────────────────────────────
   One masked element that slides up. Inherits timing from the
   nearest RevealGroup — do NOT pass initial/animate here.

   Mask clips the BLOCK axis only (overflow-y: clip) so a long line
   can extend horizontally past its column WITHOUT being shaved.
   overflow-x stays visible because the paired axis is `clip`.       */
export function RevealLine({
  children,
  as: Tag = "span",
  className,
  display = "block",
}: {
  children: ReactNode;
  /** Inner element tag — e.g. "p" for body copy, "div" for a button row. */
  as?: ElementType;
  /** Class applied to the moving inner element (keeps your existing styles). */
  className?: string;
  /** Inner display: "block" for text, "flex" for a button row. */
  display?: CSSProperties["display"];
}) {
  const [isComplete, setIsComplete] = useState(false);
  // Memoize: recreating motion(Tag) on the isComplete re-render would remount
  // and replay the line from y:110% with the mask already open → stuck offset.
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    // The MASK. paddingBottom + matching negative margin gives descenders
    // (p, g, y) room so they aren't shaved — layout position stays put.
    <span
      style={{
        display: "block",
        overflowX: "visible",
        overflowY: isComplete ? "visible" : "clip",
        paddingBottom: "0.12em",
        marginBottom: "-0.12em",
      }}
    >
      <MotionTag
        variants={lineVariant}
        className={className}
        style={{ display, willChange: "transform" }}
        onAnimationComplete={() => setIsComplete(true)}
      >
        {children}
      </MotionTag>
    </span>
  );
}
