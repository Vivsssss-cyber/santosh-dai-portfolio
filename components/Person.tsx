"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero avatar. Alpha-channel video support is split across engines, so we pick
 * the render path at runtime:
 *   • Blink / Gecko (Chrome, Edge, Firefox) decode VP8/VP9 alpha in WebM →
 *     play the rotating cut-out with a real transparent background.
 *   • WebKit (Safari macOS + every iOS browser) has no transparent-WebM and no
 *     HEVC-with-alpha asset here — the only mp4 is opaque H.264. Playing it
 *     shows a dark box plus Safari's start-playback button. Serve the
 *     transparent still (person.webp is RGBA) instead: no box, no overlay.
 *
 * SSR / first paint render the <video>, but with playback JS-driven (no
 * autoPlay attribute) and a transparent poster, so WebKit never auto-starts the
 * opaque mp4 before the effect swaps it out — no dark-box flash.
 */
export function Person() {
  const [stillOnly, setStillOnly] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isBlink = /Chrome|Chromium|Edg|OPR/.test(ua) && "chrome" in window;
    const isGecko = /Firefox/.test(ua);
    const isWebKit = /AppleWebKit/.test(ua) && !isBlink && !isGecko;

    if (isWebKit) {
      setStillOnly(true);
      return;
    }

    // Kick playback ourselves — defeats Safari/Chromium autoplay suspension
    // (Low Power Mode, "never auto-play" site setting) that paints a play overlay.
    videoRef.current?.play().catch(() => {});
  }, []);

  if (stillOnly) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="person"
        src="/assets/person.webp"
        alt="Santosh Dahal — 3D avatar"
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
