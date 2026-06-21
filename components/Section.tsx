import type { ReactNode } from "react";

/**
 * SectionHead — the "01 / 04 · Label" header that opens each major section.
 * Numerals echo the technical-frame voice (Redaction serif, muted). DESIGN.md §4.
 */
export function SectionHead({
  num,
  total = "04",
  label,
  lead,
}: {
  num: string;
  total?: string;
  label: string;
  lead?: ReactNode;
}) {
  return (
    <header className="sec-head">
      <h2 className="sec-title">{label}</h2>
      {lead ? <p className="sec-lead">{lead}</p> : null}
    </header>
  );
}

/**
 * TagList — pill chips for skills / research labels. Reuses the nav-pill look
 * (--pill surface, --radius). DESIGN.md §4.
 */
export function TagList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={["taglist", className].filter(Boolean).join(" ")}>
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}
