/* Corner light glows — fixed to the viewport, the persistent backdrop on
   every page (DESIGN.md §4). Render once, before .shell. */
export function Backdrop() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="light light-left" src="/assets/Left-light.png" alt="" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="light light-right" src="/assets/right-light.png" alt="" aria-hidden="true" />
    </>
  );
}
