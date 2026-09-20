import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** Next challenge countdown — resets every 3 hours from a fixed epoch for a live feel */
function useCountdown(hoursCycle = 3) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const cycleMs = hoursCycle * 60 * 60 * 1000;
    const tick = () => {
      const now = Date.now();
      setRemaining(cycleMs - (now % cycleMs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hoursCycle]);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function LandingHero() {
  const countdown = useCountdown(3);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center tm-hero-in"
      aria-label="Hero"
    >
      <h1
        className="tm-wordmark text-[var(--tm-text)]"
        style={{ fontSize: "clamp(3.4rem, 13vw, 10.5rem)" }}
      >
        TechMaster
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-[var(--tm-muted)] font-normal tracking-tight max-w-md">
        Master code. Win competitions.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link to="/dsa/duels" className="tm-btn tm-btn-primary">
          Join a challenge
        </Link>
        <a href="#leaderboard" className="tm-btn tm-btn-secondary">
          See the leaderboard
        </a>
      </div>

      <p className="mt-10 flex items-center gap-2.5 text-sm text-[var(--tm-muted)]">
        <span className="tm-live-dot shrink-0" aria-hidden />
        <span>
          Next challenge starts in{" "}
          <time dateTime={`PT${countdown.replace(/:/g, "H").slice(0, 2)}`} className="tabular-nums text-[var(--tm-text)] font-medium">
            {countdown}
          </time>
        </span>
      </p>
    </section>
  );
}
