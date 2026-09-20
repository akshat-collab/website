import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: "var(--tm-border)" }}
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--tm-muted)]">
        <p>© {new Date().getFullYear()} TechMaster</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
          <Link to="/about" className="hover:text-[var(--tm-text)] transition-colors">
            About
          </Link>
          <Link to="/privacy" className="hover:text-[var(--tm-text)] transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-[var(--tm-text)] transition-colors">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-[var(--tm-text)] transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
