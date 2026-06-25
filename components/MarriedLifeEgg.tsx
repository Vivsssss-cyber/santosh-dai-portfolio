"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Easter egg — hidden "Happy Married Life" card.
   Not in the DOM until summoned: type the secret sequence Shift+L then M
   anywhere on the site to reveal it; Escape (or a scrim click) dismisses. Speaks the site's
   Amber Dusk language — serif display head with a single gradient word, hairline
   .plus registration corners echoing the blueprint frame, warm modal scrim.
   DESIGN.md §10. Keypress is ignored while typing in a field, and the toggle
   guards e.repeat so a held key doesn't flicker. */

function isTypingTarget(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

export function MarriedLifeEgg() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Global secret sequence: Shift + L, then M (within 1.2s) toggles the egg.
  // `key === "L"`/"M" is what Shift produces, so this is layout-safe; lowercase
  // fallbacks cover odd keymaps. A stray key (or timeout) resets the sequence.
  useEffect(() => {
    let armed = false; // true after a valid Shift+L, waiting for M
    let timer: ReturnType<typeof setTimeout> | undefined;
    const disarm = () => {
      armed = false;
      if (timer) clearTimeout(timer);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || isTypingTarget(e.target)) return;
      const k = e.key.toLowerCase();
      if (!armed) {
        if (e.shiftKey && k === "l") {
          armed = true;
          timer = setTimeout(disarm, 1200);
        }
        return;
      }
      // armed: only M completes it; anything else resets
      if (k === "m") {
        e.preventDefault();
        disarm();
        setOpen((v) => !v);
      } else if (k !== "shift") {
        disarm();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // While open: Escape closes and the page behind is scroll-locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="egg-scrim"
          role="dialog"
          aria-modal="true"
          aria-label="Happy married life"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.22 }}
        >
          <motion.div
            className="egg-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: reduce ? 0 : 14, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 8, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* shared amber gradient for the decorative hearts */}
            <svg width="0" height="0" focusable="false" aria-hidden="true" style={{ position: "absolute" }}>
              <defs>
                <linearGradient id="eggGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c35108" />
                  <stop offset="100%" stopColor="#fbc27d" />
                </linearGradient>
              </defs>
            </svg>

            {/* blueprint registration corners — echo the .frame .plus marks */}
            <span className="egg-corners" aria-hidden="true">
              <i className="tl" />
              <i className="tr" />
              <i className="bl" />
              <i className="br" />
            </span>

            {/* the couple — bg removed, lit by a soft amber spotlight */}
            <figure className="egg-photo">
              <span className="egg-spot" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="egg-couple"
                src="/assets/dai-couple.webp"
                alt="Santosh dai and his partner"
                width={775}
                height={1141}
                decoding="async"
              />
              <span className="egg-ground" aria-hidden="true" />
            </figure>

            {/* tiny floating hearts — decorative, amber gradient (no emoji) */}
            <span className="egg-hearts" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="url(#eggGrad)"
                    d="M12 21s-7.5-4.6-10-9.2C.4 8.6 1.9 5 5.3 5c2 0 3.3 1.2 4.1 2.3l.3.4.3-.4C10.8 6.2 12.1 5 14.1 5 17.5 5 19 8.6 17.6 11.8 15.1 16.4 12 21 12 21z"
                  />
                </svg>
              ))}
            </span>

            <h2 className="egg-title">
              Happy <span className="egg-grad">Married</span> Life,
              <br />
              Santosh dai
            </h2>
            <p className="egg-body">
              Wishing you the very best — may your married life glow as warmly as
              this portfolio, and shine far longer. Here&rsquo;s to a lifetime lit
              from the corners, like golden hour that never quite fades.
            </p>
            <p className="egg-hint">Press Esc or click away to close.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
