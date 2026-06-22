"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RevealMedia } from "./Reveal";

/* Memories — an infinite-scroll studio gallery.
   Speaks the site's language: tiles reveal with the SAME mask-slide as every
   other section (RevealMedia), on the Amber Dusk canvas. The studio touch lives
   in the hover state — registration crop-marks at the four corners (echoing the
   blueprint .plus frame) and an amber "open" ring — plus a click-to-zoom
   lightbox. Images are imported from suntos.com.np/memories, served locally.

   Layout is JS-distributed masonry (shortest-column packing), NOT CSS multicol:
   columns rebalance on append, which would make existing tiles jump during
   infinite scroll. Round-robin-by-height keeps placed tiles fixed as new
   batches land. DESIGN.md §5/§7. */

type Mem = { src: string; title: string; w: number; h: number };

// Real captions from the source page's alt text — no fabricated labels.
const MEMORIES: Mem[] = [
  { src: "/assets/memories/wro_coding.jpg", title: "WRO Coding Competition", w: 1533, h: 2048 },
  { src: "/assets/memories/yomari_winner.jpg", title: "Yomari · Winner", w: 1273, h: 960 },
  { src: "/assets/memories/eblood_winner.jpg", title: "eBlood · Winner", w: 765, h: 889 },
  { src: "/assets/memories/final_image.jpg", title: "On stage", w: 540, h: 405 },
  { src: "/assets/memories/club_image.jpg", title: "The club", w: 960, h: 640 },
  { src: "/assets/memories/club_iamge2.jpg", title: "The club", w: 849, h: 637 },
  { src: "/assets/memories/can_image.jpg", title: "CAN", w: 822, h: 616 },
  { src: "/assets/memories/koshi_team.jpg", title: "Koshi team", w: 2016, h: 1512 },
  { src: "/assets/memories/robocup_image.jpg", title: "RoboCup", w: 1052, h: 789 },
  { src: "/assets/memories/hult_winner.jpg", title: "Hult Prize · Winner", w: 2027, h: 960 },
];

const MAX_BATCHES = 8; // infinite-feel, bounded so the DOM never runs away

function ArrowOut() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Column count from viewport width — initial 3 matches SSR, effect corrects it. */
function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 599px)");
    const tablet = window.matchMedia("(min-width: 600px) and (max-width: 959px)");
    const update = () => setCols(mobile.matches ? 1 : tablet.matches ? 2 : 3);
    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

export function MemoriesGallery() {
  const reduce = useReducedMotion();
  const columns = useColumns();

  const [items, setItems] = useState<Mem[]>(MEMORIES);
  const batchRef = useRef(1);
  const [done, setDone] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Append the next batch — the source set rotated, so consecutive copies don't
  // stack the same tile twice in a row.
  const append = useCallback(() => {
    if (batchRef.current >= MAX_BATCHES) {
      setDone(true);
      return;
    }
    const offset = (batchRef.current * 3) % MEMORIES.length;
    const batch = MEMORIES.map((_, i) => MEMORIES[(i + offset) % MEMORIES.length]);
    batchRef.current += 1;
    setItems((prev) => [...prev, ...batch]);
    if (batchRef.current >= MAX_BATCHES) setDone(true);
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || done) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) append();
      },
      { rootMargin: "700px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [append, done]);

  // Shortest-column packing — deterministic over the items prefix, so already
  // placed tiles keep their column when a new batch is appended (no reflow jump).
  const buckets = useMemo(() => {
    const cols: { m: Mem; key: number }[][] = Array.from({ length: columns }, () => []);
    const heights = new Array(columns).fill(0);
    items.forEach((m, i) => {
      let c = 0;
      for (let j = 1; j < columns; j++) if (heights[j] < heights[c]) c = j;
      cols[c].push({ m, key: i });
      heights[c] += m.h / m.w; // normalized tile height
    });
    return cols;
  }, [items, columns]);

  // Lightbox — index into `items`, or null when closed.
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) =>
      setActive((a) => (a === null ? a : (a + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const activeMem = active === null ? null : items[active];

  return (
    <>
      <div className="mem-gallery">
        {buckets.map((col, ci) => (
          <div className="mem-col" key={ci}>
            {col.map(({ m, key }) => (
              <RevealMedia className="mem-tile" amount={0.12} key={key}>
                <button
                  type="button"
                  className="mem-card"
                  onClick={() => setActive(key)}
                  aria-label={`View memory: ${m.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mem-img"
                    src={m.src}
                    alt={m.title}
                    width={m.w}
                    height={m.h}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="mem-veil" aria-hidden="true" />
                  <span className="mem-corners" aria-hidden="true">
                    <i className="tl" />
                    <i className="tr" />
                    <i className="bl" />
                    <i className="br" />
                  </span>
                  <span className="mem-arrow" aria-hidden="true">
                    <ArrowOut />
                  </span>
                  <span className="mem-cap">{m.title}</span>
                </button>
              </RevealMedia>
            ))}
          </div>
        ))}
      </div>

      {!done && <div ref={sentinelRef} className="mem-sentinel" aria-hidden="true" />}
      {done && <p className="mem-end">That’s the reel — for now.</p>}

      <AnimatePresence>
        {activeMem && (
          <motion.div
            className="mem-lb"
            role="dialog"
            aria-modal="true"
            aria-label={activeMem.title}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <button type="button" className="mem-lb-close" aria-label="Close" onClick={close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6 18 18" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
            <button
              type="button"
              className="mem-lb-nav prev"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="mem-lb-nav next"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
            <motion.img
              key={activeMem.src + active}
              className="mem-lb-img"
              src={activeMem.src}
              alt={activeMem.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="mem-lb-cap">{activeMem.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
