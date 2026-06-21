import type { ReactNode } from "react";

/**
 * InfoCard — icon + serif title + muted sub-label.
 *
 * Used in the hero's right rail (credentials) and reusable for any
 * stat / fact / credential block. Styling: `.info-card` + `.ic-*` in globals.css.
 *
 *   <InfoCard icon={<IconCTO />} title="Former CTO · Diyo.ai"
 *             sub="2022–2025 — led AI product & engineering" />
 */
export type InfoCardProps = {
  icon: ReactNode;
  title: ReactNode;
  sub: ReactNode;
};

export function InfoCard({ icon, title, sub }: InfoCardProps) {
  return (
    <div className="info-card">
      <div className="ic-icon">{icon}</div>
      <div className="ic-title">{title}</div>
      <div className="ic-sub">{sub}</div>
    </div>
  );
}
