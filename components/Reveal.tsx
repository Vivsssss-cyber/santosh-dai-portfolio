"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  useMemo,
  useState,
  type ElementType,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

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

/* ─── MEDIA REVEAL ─────────────────────────────────────────────
   Images, video and composed visual blocks reveal in the SAME motion
   language as the text: each slides up from behind a mask (y:110% → 0%),
   a pure transform — NO opacity fade, NO scale — on the identical
   easing/duration. Viewport-triggered, fires once, snaps under reduced-motion.

   Mask clips the BLOCK axis only (overflow-y), so a galaxy/carousel can still
   extend horizontally past its column while the wipe runs; it flips to fully
   visible the instant the slide completes (hover lifts / 3D depth not shaved). */
const mediaLine: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DURATION, ease: EASE } },
};

/** Wrap a media/visual block (component, figure) so it slides up like the text.
    Self-contained: owns its own viewport trigger (no parent <Reveal> needed). */
export function RevealMedia({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Extra pause before the slide (sec) — for hand-staggering siblings. */
  delay?: number;
  /** Fraction of the element that must enter the viewport to trigger. */
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const [isComplete, setIsComplete] = useState(reduce);
  // Memoize: motion(Tag) is a fresh type each call; recreating it would remount
  // and replay the slide from y:110% with the mask already open → stuck offset.
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  // The viewport trigger lives on the OUTER span — it stays in normal flow and is
  // never transformed, so its IntersectionObserver box matches its layout slot.
  // The inner element carries the y:110% slide; observing IT would mean watching a
  // box pushed ~110% of its own height below the slot, so on tall blocks it never
  // crosses the viewport where it visually belongs and the reveal never fires
  // (left clipped → invisible). Same orchestrate-then-slide split as Reveal/RevealItem.
  return (
    <motion.span
      style={{
        display: "block",
        overflowX: "visible",
        overflowY: isComplete ? "visible" : "clip",
      }}
      variants={group}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      <MotionTag
        className={className}
        variants={mediaLine}
        transition={{ delay }}
        style={{ willChange: "transform" }}
        onAnimationComplete={() => setIsComplete(true)}
      >
        {children}
      </MotionTag>
    </motion.span>
  );
}

/** Mask-slide for a single <img>. The MASK carries `className` (so an
    absolutely-positioned / transform-centred image keeps its own anchor node),
    while the inner <img> fills it and slides up from behind it. Same pure-
    transform reveal as the text — no fade, no scale. */
export function RevealImg({
  className,
  amount = 0.25,
  delay = 0,
  ...img
}: Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  // framer-motion redefines these handlers — drop the DOM versions to avoid clash
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "style"
> & {
  amount?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [isComplete, setIsComplete] = useState(reduce);

  return (
    // NB: no inline `display` — the mask carries the image's class, whose CSS
    // may toggle display responsively (e.g. .contact-monk none→block). An inline
    // display:block would override that and leak the image onto small screens.
    //
    // The viewport trigger lives on this OUTER span (its own slot, never
    // transformed) — NOT on the <img>, which slides from y:110% and whose
    // observed box would sit a full image-height below the slot, so it would
    // never enter the viewport and the reveal would never fire (image invisible).
    <motion.span
      className={className}
      style={{
        overflowX: "visible",
        overflowY: isComplete ? "visible" : "clip",
      }}
      variants={group}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      <motion.img
        variants={mediaLine}
        transition={{ delay }}
        style={{ display: "block", width: "100%", height: "auto", willChange: "transform" }}
        onAnimationComplete={() => setIsComplete(true)}
        {...img}
      />
    </motion.span>
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
