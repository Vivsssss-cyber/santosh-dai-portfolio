/**
 * ResearchCard — Amber Dusk glass research-paper card (slim).
 *
 * Title (Redaction Display) with a top-right category badge, a description, and
 * tag pills. No illustration / metric / "why" line. Glass nesting + amber glow.
 * Styling: research-card.module.css (scoped to the project's amber tokens).
 *
 *   <ResearchCard
 *     category="Speech"
 *     title="On-Device ASR with Knowledge Distillation"
 *     description="Built a lightweight on-device ASR…"
 *     tags={["ASR", "Knowledge Distillation", "Fast Conformer", "Edge AI"]}
 *   />
 */
import styles from "./research-card.module.css";

export type ResearchCardProps = {
  category: string;
  title: string;
  description: string;
  tags?: string[];
  /** If set, the card renders as a link. */
  href?: string;
  className?: string;
  isActive?: boolean;
};

export function ResearchCard({
  category,
  title,
  description,
  tags = [],
  href,
  className,
  isActive,
}: ResearchCardProps) {
  const cls = [
    styles.card,
    isActive ? styles.cardActive : "",
    className
  ].filter(Boolean).join(" ");

  const content = (
    <>
      {/* amber ambient glow (decorative) */}
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.badge}>{category}</span>
          </div>
          <p className={styles.desc}>{description}</p>
        </div>

        {tags.length > 0 ? (
          <ul className={styles.tags}>
            {tags.map((t) => (
              <li key={t} className={styles.pill}>
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <article className={cls}>{content}</article>;
}

export default ResearchCard;
