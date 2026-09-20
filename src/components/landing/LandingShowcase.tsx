import { Link } from "react-router-dom";

export function LandingShowcase() {
  return (
    <section
      id="showcase"
      className="scroll-mt-8 px-6 py-24 sm:py-32"
      style={{ background: "var(--tm-bg-alt)" }}
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="showcase-heading"
          className="text-3xl sm:text-5xl tracking-tight mb-12 sm:mb-16"
          style={{ letterSpacing: "-0.04em" }}
        >
          Built to showcase skill.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[240px]">
          {/* Large tile */}
          <Link
            to="/dsa"
            className="md:col-span-2 md:row-span-2 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group transition-transform duration-300 hover:scale-[1.01]"
            style={{
              background: "#000000",
              boxShadow: "0 0 80px rgba(0, 113, 227, 0.22)",
            }}
          >
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 20%, rgba(0,113,227,0.45), transparent 55%)",
              }}
            />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-2">DSA Practice</p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                5,000+ problems.
                <br />
                One arena.
              </h3>
            </div>
          </Link>

          <Link
            to="/dsa/duels"
            className="rounded-3xl border p-6 flex flex-col justify-end transition-colors duration-200 hover:border-[var(--tm-text)]"
            style={{
              background: "var(--tm-tile)",
              borderColor: "var(--tm-border)",
            }}
          >
            <p className="text-xs uppercase tracking-widest text-[var(--tm-muted)] mb-2">1v1</p>
            <h3 className="text-xl font-semibold tracking-tight">CodeArena Duels</h3>
          </Link>

          <Link
            to="/ctf"
            className="rounded-3xl border p-6 flex flex-col justify-end transition-colors duration-200 hover:border-[var(--tm-text)]"
            style={{
              background: "var(--tm-tile)",
              borderColor: "var(--tm-border)",
            }}
          >
            <p className="text-xs uppercase tracking-widest text-[var(--tm-muted)] mb-2">Security</p>
            <h3 className="text-xl font-semibold tracking-tight">CTF Challenges</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
