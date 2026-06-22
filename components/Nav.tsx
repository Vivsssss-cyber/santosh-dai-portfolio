"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

/* Site nav — shared across pages. Sticky, with a smart hide-on-scroll bar, a
   top scroll-progress hairline, and a home-page scrollspy that sets
   aria-current on the in-view section's link (semantic only — no visual
   indicator). On subpages there are no sections, so the observer is a no-op
   and links jump home via `/#id`. Motion snaps instant under reduced motion. */
const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "research", label: "RESEARCH" },
  { id: "building", label: "PROFESSIONAL" },
  { id: "education", label: "EDUCATION" },
  { id: "stack", label: "STACK" },
] as const;

export function Nav() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on route change so a tapped link never leaves it open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: Escape closes, and the page behind is scroll-locked.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // From home, anchors stay same-page (#id) so the browser smooth-scrolls; from
  // anywhere else they carry the route (/#id) so they navigate then scroll.
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // Top progress bar — scaleX tracks scroll, smoothed by a spring so it glides
  // instead of jittering frame-to-frame. Effectively instant under reduced motion.
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(
    scrollYProgress,
    reduce ? { duration: 0 } : { stiffness: 140, damping: 30, restDelta: 0.001 },
  );

  // Smart-sticky: `hidden` slides the bar away on a downward scroll and snaps it
  // back the instant you scroll up. Reduced motion keeps it put. A per-event
  // delta gate (>6px) stops flicker on tiny scroll jitters.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    if (reduce) {
      setHidden(false);
      return;
    }
    const delta = y - lastY.current;
    if (Math.abs(delta) > 6) {
      // hide only well past the top so the hero's nav never vanishes immediately
      setHidden(delta > 0 && y > 140);
      lastY.current = y;
    }
  });
  const navClass =
    (hidden ? "nav nav--hidden" : "nav") + (open ? " nav--menu-open" : "");

  useEffect(() => {
    if (!onHome) {
      setActive("");
      return;
    }
    // The section crossing the middle band is "current"; topmost wins when two
    // overlap the band on a fast scroll.
    const ids = [...LINKS.map((l) => l.id), "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [onHome]);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <nav className={navClass}>
        <Link className="brand" href="/">
          <span className="brand-mark">Santosh Dahal</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                href={href(l.id)}
                aria-current={on ? "true" : undefined}
              >
                <span className="nav-label">{l.label}</span>
              </a>
            );
          })}
          <Link href="/blogs">
            <span className="nav-label">WRITING</span>
          </Link>
          <Link href="/memories">
            <span className="nav-label">MEMORIES</span>
          </Link>
        </div>
        <div className="nav-actions">
          <a
            href={href("contact")}
            className="nav-contact"
            aria-current={active === "contact" ? "true" : undefined}
          >
            CONTACT ME
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer + scrim. Always mounted; CSS slides it in on `.is-open`
          and `inert` keeps the links out of the tab order while closed. */}
      <div
        className={"mobile-scrim" + (open ? " is-open" : "")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        className={"mobile-menu" + (open ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
      >
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={href(l.id)}
            onClick={() => setOpen(false)}
            aria-current={active === l.id ? "true" : undefined}
          >
            {l.label}
          </a>
        ))}
        <Link href="/blogs" onClick={() => setOpen(false)}>
          WRITING
        </Link>
        <Link href="/memories" onClick={() => setOpen(false)}>
          MEMORIES
        </Link>
        <span className="mobile-menu-divider" aria-hidden="true" />
        <a
          href={href("contact")}
          className="mobile-contact"
          onClick={() => setOpen(false)}
          aria-current={active === "contact" ? "true" : undefined}
        >
          CONTACT ME
        </a>
      </div>
    </>
  );
}
