/* Shared site footer — © line + real links only (no dead routes). */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-copy">© 2026 Santosh Dahal — All rights reserved.</div>
        <nav className="foot-links">
          <a href="https://github.com/santoshdahal2016" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/endahalsantosh/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="/blogs">Writing</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
