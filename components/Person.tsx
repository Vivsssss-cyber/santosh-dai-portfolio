"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "video" | "anim" | "static";

/**
 * Hero avatar. Alpha-channel video support is split across engines, so we pick
 * the render path at runtime:
 *   • Blink / Gecko (Chrome, Edge, Firefox) decode VP8/VP9 alpha in WebM →
 *     play the rotating cut-out with a real transparent background.
 *   • WebKit (Safari macOS + every iOS browser) can't decode transparent WebM
 *     and we have no HEVC-with-alpha asset (can't encode it off a Mac). The mp4
 *     is opaque H.264 — playing it shows a dark box + Safari's start-playback
 *     button. Instead serve an animated transparent WebP (person-anim.webp,
 *     RGBA, loops natively as an <img>): same rotation, no box, no overlay.
 *   • Reduced-motion on WebKit → the static still (person.webp).
 *
 * SSR / first paint render the <video>, but playback is JS-driven (no autoPlay
 * attribute) with a transparent poster, so WebKit never auto-starts the opaque
 * mp4 before the effect swaps it out — no dark-box flash.
 */
export function Person() {
  const [mode, setMode] = useState<Mode>("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isBlink = /Chrome|Chromium|Edg|OPR/.test(ua) && "chrome" in window;
    const isGecko = /Firefox/.test(ua);
    const isWebKit = /AppleWebKit/.test(ua) && !isBlink && !isGecko;

    if (isWebKit) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setMode(reduce ? "static" : "anim");
      return;
    }

    // Kick playback ourselves — defeats Safari/Chromium autoplay suspension
    // (Low Power Mode, "never auto-play" site setting) that paints a play overlay.
    videoRef.current?.play().catch(() => {});
  }, []);

  if (mode !== "video") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="person"
        src={mode === "anim" ? "/assets/person-anim.webp" : "/assets/person.webp"}
        alt="Santosh Dahal — 3D avatar, rotating"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="person"
      loop
      muted
      playsInline
      poster="/assets/person.webp"
      aria-label="Santosh Dahal — 3D avatar, rotating"
    >
      <source src="/assets/person.webm" type="video/webm" />
      <source src="/assets/person.mp4" type="video/mp4" />
    </video>
  );
}
