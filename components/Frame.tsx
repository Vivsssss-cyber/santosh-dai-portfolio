/* Inset hairline frame + registration (+) marks — the blueprint overlay.
   Desktop-only via CSS. Render as the first child inside .shell (DESIGN.md §4). */
export function Frame() {
  return (
    <div className="frame" aria-hidden="true">
      <span className="plus tl" />
      <span className="plus tr" />
      <span className="plus bl" />
      <span className="plus br" />
      <span className="plus ml" />
      <span className="plus mr" />
      <span className="plus ml2" />
    </div>
  );
}
