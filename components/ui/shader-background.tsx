"use client";

/**
 * ShaderBackground — animated amber-plasma WebGL field for the CTA panel.
 *
 * Adapted from a generic "neon plasma" shader and rebuilt for this project:
 *  - Recolored to the Amber Dusk palette (DESIGN.md §2 bans purple/blue neon).
 *  - Scoped to its parent element (not fixed-fullscreen) so it only rasterizes
 *    the CTA band, not the whole viewport.
 *  - Optimized for speed: dead grid code stripped, fewer plasma lines, DPR
 *    clamped, animation paused when off-screen or the tab is hidden, and a
 *    single static frame for prefers-reduced-motion. Full GL teardown on unmount.
 *
 * This repo has no Tailwind/shadcn, so styling is inline (project convention),
 * not utility classes. Drop it inside a `position: relative; overflow: hidden`
 * container — it absolutely fills the parent and renders behind sibling content.
 */

import { useEffect, useRef, type CSSProperties } from "react";

type ShaderBackgroundProps = {
  className?: string;
  style?: CSSProperties;
  /** Cap device-pixel-ratio to bound fragment count on hi-dpi screens. */
  maxDpr?: number;
};

const VERTEX_SRC = `attribute vec4 aVertexPosition;void main(){gl_Position=aVertexPosition;}`;

/* Fragment shader — only the plasma path is kept (the original's grid/axis
   helpers were dead code and were removed). Colors are the amber ramp. */
const FRAGMENT_SRC = `
precision highp float;
uniform vec2 iResolution;
uniform float iTime;

const float overallSpeed = 0.2;
const float gridSmoothWidth = 0.015;
const float scale = 5.0;
const vec4 lineColor = vec4(0.92, 0.52, 0.16, 1.0);   // amber filament
const float minLineWidth = 0.01;
const float maxLineWidth = 0.2;
const float lineSpeed = 1.0 * overallSpeed;
const float lineAmplitude = 1.0;
const float lineFrequency = 0.2;
const float warpSpeed = 0.2 * overallSpeed;
const float warpFrequency = 0.5;
const float warpAmplitude = 1.0;
const float offsetFrequency = 0.5;
const float offsetSpeed = 1.33 * overallSpeed;
const float minOffsetSpread = 0.6;
const float maxOffsetSpread = 2.0;
const int linesPerGroup = 10;          // was 16 — fewer iterations, same feel

#define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
#define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
#define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

float random(float t) {
  return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
}

float getPlasmaY(float x, float horizontalFade, float offset) {
  return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord.xy / iResolution.xy;
  vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

  float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
  float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

  space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
  space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

  vec4 lines = vec4(0.0);
  // warm near-black canvas, deep amber at the right edge
  vec4 bgColor1 = vec4(0.10, 0.055, 0.0, 1.0);
  vec4 bgColor2 = vec4(0.22, 0.10, 0.02, 1.0);

  for (int l = 0; l < linesPerGroup; l++) {
    float normalizedLineIndex = float(l) / float(linesPerGroup);
    float offsetTime = iTime * offsetSpeed;
    float offsetPosition = float(l) + space.x * offsetFrequency;
    float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
    float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
    float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
    float linePosition = getPlasmaY(space.x, horizontalFade, offset);
    float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

    float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
    vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
    float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

    line = line + circle;
    lines += line * lineColor * rand;
  }

  vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
  fragColor *= verticalFade;
  fragColor.a = 1.0;
  fragColor += lines;

  gl_FragColor = fragColor;
}
`;

export default function ShaderBackground({
  className,
  style,
  maxDpr = 1.25,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.warn("WebGL not supported — ShaderBackground skipped.");
      return;
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    // linked program retains the binaries; the shader objects are now dead weight
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(program, "aVertexPosition");
    const uRes = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    let bufW = 0;
    let bufH = 0;
    let lastT = 6.0; // a balanced still used for static / paused redraws

    const resize = () => {
      const cssW = parent?.clientWidth || canvas.clientWidth || 1;
      const cssH = parent?.clientHeight || canvas.clientHeight || 1;
      const w = Math.max(1, Math.round(cssW * dpr));
      const h = Math.max(1, Math.round(cssH * dpr));
      if (w === bufW && h === bufH) return false;
      bufW = w;
      bufH = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      return true;
    };

    const draw = (t: number) => {
      lastT = t;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    resize();

    // Static path: one frame, no loop.
    if (prefersReduced) {
      draw(lastT);
      const ro = new ResizeObserver(() => {
        if (resize()) draw(lastT);
      });
      if (parent) ro.observe(parent);
      return () => {
        ro.disconnect();
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    // Animated path — only runs while visible + tab focused.
    let raf = 0;
    let running = false;
    let onScreen = true;
    let tabVisible = !document.hidden;
    let startTs = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (startTs === 0) startTs = now;
      draw((now - startTs) / 1000);
    };
    const play = () => {
      if (running || !onScreen || !tabVisible) return;
      running = true;
      startTs = 0; // re-anchor time so it picks up smoothly after a pause
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? play() : pause();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      tabVisible ? play() : pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      if (resize() && !running) draw(lastT);
    });
    if (parent) ro.observe(parent);

    play();

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [maxDpr]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}
