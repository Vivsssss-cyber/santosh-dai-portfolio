"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useMemo, useState, type ElementType, type ReactNode } from "react";

/* Scroll-triggered reveal for below-the-fold sections.

   Speaks the SAME motion language as the hero (see RevealText): each element
   starts clipped behind a mask at y:110% and slides up to 0 — a pure transform,
   NO opacity fade — on the identical easing/duration/stagger. Only the trigger
   differs: these fire once on viewport entry instead of on mount. DESIGN.md §7. */
const DURATION = 1.0; // mirror RevealText (hero)
const STAGGER = 0.12;
const DELAY = 0.15;
const EASE = [0.16, 1, 0.3, 1] as const;

// Parent only orchestrates timing — staggers every RevealItem beneath it.
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren: DELAY } },
};

// Each element starts pushed down (clipped by the mask), then slides up to 0.
const item: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DURATION, ease: EASE } },
};

/** Wrap a block; staggers its <RevealItem> children when scrolled into view. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Memoize: motion(Tag) returns a NEW component type each call — recreating it
  // on render would remount children and replay/snap their reveal. See RevealItem.
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    <MotionTag
      className={className}
      variants={group}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </MotionTag>
  );
}

/** One masked element in the cascade — slides up from behind its mask.
    Inherits timing from the parent <Reveal>. Mirrors RevealText's RevealLine:
    the mask clips the block axis only and flips to visible once the slide is
    done, so hover lifts / shadows aren't shaved. */
export function RevealItem({
  children,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [isComplete, setIsComplete] = useState(reduce);
  // Memoize so flipping `isComplete` (clip → visible) re-renders WITHOUT
  // remounting the motion element — a remount would reset it to y:110% while
  // the mask is now visible, leaving it stuck at the wrong position.
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    // The MASK. paddingBottom + matching negative margin gives descenders
    // (p, g, y) room so they aren't shaved — layout position stays put.
    <span
      className="rv-mask"
      style={{
        display: "block",
        overflowX: "visible",
        overflowY: isComplete ? "visible" : "clip",
        paddingBottom: "0.12em",
        marginBottom: "-0.12em",
      }}
    >
      <MotionTag
        variants={item}
        className={className}
        style={{ willChange: "transform" }}
        onAnimationComplete={() => setIsComplete(true)}
      >
        {children}
      </MotionTag>
    </span>
  );
}
