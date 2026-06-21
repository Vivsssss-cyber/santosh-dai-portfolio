"use client";

/**
 * ResearchExplorer — filter tabs + a studio coverflow 3D carousel.
 *
 * Tabs (All / Speech / NLP / Computer Vision) filter the set the carousel
 * cycles. The centered card is flat (2D, focused); neighbors are rotated in 3D,
 * dimmed and scaled back. Controls: prev/next arrows, drag/swipe, click-a-side-
 * card-to-center, dot indicators. Autoplay advances every 10s, pausing on
 * hover / focus / drag and skipping under reduced-motion. Reduced-motion falls
 * back to a flat fade slider.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import ResearchCard from "@/components/ui/research-card";
import styles from "./research-explorer.module.css";

type Category = "Speech" | "NLP" | "Computer Vision";

type Item = {
  id: string;
  category: Category;
  title: string;
  description: string;
  tags: string[];
};

const ITEMS: Item[] = [
  {
    id: "mope-lora",
    category: "Speech",
    title: "MoPE-LoRA — Mixture of Phonetic Experts for Accented ASR",
    description:
      "A PEFT framework routing Conformer encoder frames to six manner-of-articulation LoRA experts, sharpening recognition on accented L2 speech.",
    tags: ["LoRA/PEFT", "Conformer", "Phonetics"],
  },
  {
    id: "on-device-kd",
    category: "Speech",
    title: "On-Device ASR with Knowledge Distillation",
    description:
      "A lightweight on-device ASR distilled from a Fast Conformer RNN-T teacher — keeps accuracy while shrinking enough to run locally.",
    tags: ["RNN-T", "Distillation", "NeMo"],
  },
  {
    id: "browser-asr",
    category: "Speech",
    title: "Browser-Based ASR",
    description:
      "A full in-browser ASR pipeline in JavaScript on ONNX Runtime Web — recognition with no server round-trip.",
    tags: ["ONNX Runtime Web", "WASM"],
  },
  {
    id: "nepali-srmh",
    category: "NLP",
    title: "LLM Evaluation for Low-Resource Nepali (SRMH)",
    description:
      "Technical lead on a Bill & Melinda Gates Foundation–funded project. Deployed a RAG-based sexual & reproductive mental-health chatbot for real Nepali users.",
    tags: ["RAG", "LLM eval", "Nepali"],
  },
  {
    id: "undp-gov",
    category: "NLP",
    title: "Improving Government Service Delivery via NLP",
    description:
      "Technical lead on a UNDP-funded project. Built a multilingual RAG chatbot digitizing citizen charters, deployed across two municipalities.",
    tags: ["Multilingual", "RAG", "Civic tech"],
  },
  {
    id: "slam-ar",
    category: "Computer Vision",
    title: "SLAM-Based AR Localization",
    description:
      "SLAM-based localization APIs for persistent augmented reality on mobile — relocalizing devices into a shared map in real time (2020–2022).",
    tags: ["SLAM", "AR", "Mobile CV"],
  },
];

const FILTERS = ["All", "Speech", "NLP", "Computer Vision"] as const;
type Filter = (typeof FILTERS)[number];

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 10000;
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/* Coverflow placement for a card `offset` slots from center. */
function getPos(offset: number, reduce: boolean) {
  const a = Math.min(Math.abs(offset), 3);
  const sign = Math.sign(offset);
  const X = [0, 300, 520, 640][a];
  const ROT = [0, 28, 36, 40][a];
  const SCALE = [1, 0.86, 0.72, 0.66][a];
  const OPACITY = [1, 0.55, 0.28, 0][a];
  const Z = [30, 20, 10, 0][a];
  const BLUR = [0, 1, 2, 3][a];
  return {
    x: sign * X,
    rotateY: reduce ? 0 : -sign * ROT,
    scale: reduce ? (a === 0 ? 1 : 0.85) : SCALE,
    opacity: OPACITY,
    z: Z,
    blur: BLUR,
  };
}

/* Nearest circular distance i→index so the carousel wraps both ways. */
function wrapOffset(raw: number, n: number) {
  if (n <= 1) return raw;
  let off = raw;
  if (off > n / 2) off -= n;
  else if (off < -n / 2) off += n;
  return off;
}

export default function ResearchExplorer() {
  const [active, setActive] = useState<Filter>("All");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const draggingRef = useRef(false);

  const countOf = (f: Filter) =>
    f === "All" ? ITEMS.length : ITEMS.filter((i) => i.category === f).length;

  const visible =
    active === "All" ? ITEMS : ITEMS.filter((i) => i.category === active);
  const n = visible.length;

  // reset to first card whenever the filter changes
  useEffect(() => {
    setIndex(0);
  }, [active]);

  // autoplay — advance every 10s. Pauses on hover/focus/drag, skips under
  // reduced-motion or a single card, and idles when the tab is hidden. Depending
  // on `index` restarts the countdown after any manual navigation.
  useEffect(() => {
    if (reduce || paused || n <= 1) return;
    const id = window.setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setIndex((i) => (i + 1) % n);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, n, index]);

  const go = (delta: number) => setIndex((i) => (((i + delta) % n) + n) % n);
  const goTo = (i: number) => setIndex(clamp(i, 0, n - 1));

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const { x: dx } = info.offset;
    const { x: vx } = info.velocity;
    if (dx < -80 || vx < -400) go(1);
    else if (dx > 80 || vx > 400) go(-1);
    // allow the click guard to clear after this gesture, then resume autoplay
    window.setTimeout(() => {
      draggingRef.current = false;
      setPaused(false);
    }, 0);
  };

  return (
    <div className={styles.explorer}>
      <div className={styles.tabs} role="tablist" aria-label="Filter research by area">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className={[styles.tab, active === f ? styles.tabActive : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setActive(f)}
          >
            {f}
            <span className={styles.count}>{countOf(f)}</span>
          </button>
        ))}
      </div>

      <motion.div
        className={[styles.stage, n > 1 ? styles.stageDraggable : ""]
          .filter(Boolean)
          .join(" ")}
        role="group"
        aria-roledescription="carousel"
        aria-label="Research projects"
        tabIndex={0}
        drag={n > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragSnapToOrigin
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onDragStart={() => {
          draggingRef.current = true;
          setPaused(true);
        }}
        onDragEnd={onDragEnd}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }
        }}
      >
        {visible.map((item, i) => {
          const offset = wrapOffset(i - index, n);
          const pos = getPos(offset, reduce);
          const isCenter = offset === 0;
          const hidden = pos.opacity === 0;
          return (
            <motion.div
              key={item.id}
              className={[styles.cardWrap, isCenter ? "" : styles.cardWrapSide]
                .filter(Boolean)
                .join(" ")}
              initial={false}
              animate={{
                x: pos.x,
                rotateY: pos.rotateY,
                scale: pos.scale,
                opacity: pos.opacity,
                filter: `blur(${pos.blur}px)`,
              }}
              transition={
                reduce
                  ? { duration: 0.2, ease: EASE }
                  : {
                      // soft spring drives the 3D move; opacity + blur ride a
                      // tween so the gradient/blur falloff stays smooth (springs
                      // animate `filter` in coarse, juddery steps).
                      type: "spring",
                      stiffness: 210,
                      damping: 32,
                      mass: 0.9,
                      opacity: { duration: 0.55, ease: EASE },
                      filter: { duration: 0.55, ease: EASE },
                    }
              }
              style={{
                zIndex: pos.z,
                pointerEvents: hidden ? "none" : "auto",
              }}
              aria-hidden={!isCenter}
              {...(isCenter ? { "aria-current": "true" as const } : {})}
              onClick={() => {
                if (draggingRef.current) return;
                if (!isCenter && !hidden) goTo(i);
              }}
            >
              <ResearchCard
                category={item.category}
                title={item.title}
                description={item.description}
                tags={item.tags}
                isActive={isCenter}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {n > 1 ? (
        <div className={styles.controls}>
          <div className={styles.dots} role="tablist" aria-label="Select project">
            {visible.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={[styles.dot, i === index ? styles.dotActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`Go to ${item.title}`}
                aria-selected={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
