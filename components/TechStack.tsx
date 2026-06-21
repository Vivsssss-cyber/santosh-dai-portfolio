import type { CSSProperties } from "react";

/**
 * TechStack — an orbiting "amber galaxy" of the tools Santosh works with.
 *
 * DESIGN.md tension this resolves: the galaxy is the requested look, but §2
 * mandates a single amber accent and §7/§8 ban perpetual loops outright. So:
 *   • Every node is amber/cream monochrome — no brand-colour logos (§2).
 *   • The slow orbit is the ONE intentional loop on the page; it freezes flat
 *     under prefers-reduced-motion (handled in globals.css) — honouring §7.
 *   • Below 768px the orbit is replaced by a categorised chip grid (§6 collapse).
 *
 * Accessibility: the orbit is decorative (aria-hidden). The real, ordered
 * content lives in `.ts-list`, which is visible on mobile and kept available
 * to screen-readers (visually clipped) on desktop.
 */

// Source of truth — grouped by category for the accessible / mobile list.
const GROUPS: { cat: string; items: string[] }[] = [
  { cat: "Languages", items: ["Python", "C/C++"] },
  {
    cat: "ML & AI",
    items: [
      "PyTorch",
      "NVIDIA NeMo",
      "Hugging Face Transformers",
      "LangChain",
      "FAISS",
      "LanceDB",
    ],
  },
  { cat: "Web & API", items: ["React", "Next.js", "Vue.js", "Django", "FastAPI"] },
  { cat: "Data & Infra", items: ["PostgreSQL", "Docker"] },
  { cat: "Conversational & Robotics", items: ["Rasa", "SLAM", "ROS", "Computer Vision"] },
];

// Orbit rings — short labels keep pills compact on the curve; `full` carries
// the real name to the tooltip. Offsets stop chips from lining up radially.
type Node = { l: string; full?: string };
const RINGS: { items: Node[]; offset: number }[] = [
  {
    offset: 0,
    items: [
      { l: "Python" },
      { l: "C/C++" },
      { l: "PyTorch" },
      { l: "NeMo", full: "NVIDIA NeMo" },
      { l: "HF Transformers", full: "Hugging Face Transformers" },
    ],
  },
  {
    offset: 26,
    items: [
      { l: "LangChain" },
      { l: "FAISS" },
      { l: "LanceDB" },
      { l: "PostgreSQL" },
      { l: "Rasa" },
      { l: "Vision", full: "Computer Vision" },
      { l: "SLAM" },
    ],
  },
  {
    offset: 12,
    items: [
      { l: "React" },
      { l: "Next.js" },
      { l: "Vue.js" },
      { l: "Django" },
      { l: "FastAPI" },
      { l: "Docker" },
      { l: "ROS" },
    ],
  },
];

export function TechStack() {
  return (
    <div className="ts-stage-wrap">
      {/* DECORATIVE orbit — desktop only, hidden from assistive tech */}
      <div className="ts-stage" aria-hidden="true">
        <div className="ts-paths">
          <span className="ts-path ts-path-1" />
          <span className="ts-path ts-path-2" />
          <span className="ts-path ts-path-3" />
        </div>
        <span className="ts-core" />

        {RINGS.map((ring, ri) => (
          <div key={ri} className={`ts-ring ts-ring-${ri + 1}`}>
            {ring.items.map((node, i) => {
              const angle = (360 / ring.items.length) * i + ring.offset;
              return (
                <div
                  key={node.l}
                  className="ts-spoke"
                  style={{ "--a": `${angle}deg` } as CSSProperties}
                >
                  <div className="ts-cell">
                    <span className="orbit-chip" title={node.full ?? node.l}>
                      {node.l}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ACCESSIBLE / mobile source — categorised chips */}
      <ul className="ts-list">
        {GROUPS.map((g) => (
          <li key={g.cat} className="ts-cat">
            <span className="eyebrow ts-cat-label">{g.cat}</span>
            <ul className="taglist">
              {g.items.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
