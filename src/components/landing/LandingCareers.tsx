import { Link } from "react-router-dom";

export function LandingCareers() {
  return (
    <section
      id="careers"
      className="scroll-mt-8 px-6 py-28 sm:py-36 text-center"
      aria-labelledby="careers-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="careers-heading"
          className="text-3xl sm:text-5xl md:text-6xl tracking-tight"
          style={{ letterSpacing: "-0.045em" }}
        >
          Your solutions are your résumé.
        </h2>
        <p className="mt-6 text-[var(--tm-muted)] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          Showcase verified challenge wins. Get discovered by teams hiring builders, not buzzwords.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/careers" className="tm-btn tm-btn-primary">
            Browse open roles
          </Link>
          <Link to="/signup" className="tm-btn tm-btn-secondary">
            Create your profile
          </Link>
        </div>
      </div>
    </section>
  );
}
