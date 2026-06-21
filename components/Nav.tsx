import Link from "next/link";

/* Site navigation — shared across pages. Section links point at the home
   page (/#…) so they resolve from anywhere; brand + Writing are routes. */
export function Nav() {
  return (
    <nav className="nav">
      <Link className="brand" href="/">
        Santosh Dahal
      </Link>
      <div className="nav-links">
        <a href="/#about">ABOUT</a>
        <a href="/#research">RESEARCH</a>
        <a href="/#building">BUILDING</a>
        <a href="/#education">EDUCATION</a>
        <a href="/#stack">STACK</a>
        <Link href="/blogs">WRITING</Link>
      </div>
      <div className="nav-actions">
        <a href="/#contact" className="nav-contact">
          CONTACT ME
        </a>
      </div>
    </nav>
  );
}
