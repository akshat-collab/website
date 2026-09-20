const LEADERS = [
  { rank: 1, name: "Aanya Kapoor", points: "12,480" },
  { rank: 2, name: "Rohan Mehta", points: "11,920" },
  { rank: 3, name: "Priya Nair", points: "10,355" },
  { rank: 4, name: "Dev Sharma", points: "9,840" },
  { rank: 5, name: "Ishaan Rao", points: "9,210" },
];

export function LandingLeaderboard() {
  return (
    <section
      id="leaderboard"
      className="scroll-mt-8 px-6 py-24 sm:py-32"
      aria-labelledby="leaderboard-heading"
    >
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <h2
            id="leaderboard-heading"
            className="text-3xl sm:text-5xl tracking-tight"
            style={{ letterSpacing: "-0.04em" }}
          >
            Climb the ranks.
          </h2>
          <p className="mt-5 text-[var(--tm-muted)] text-base sm:text-lg max-w-sm leading-relaxed">
            Compete in challenges, earn points, and rise through the TechMaster leaderboard.
          </p>
        </div>

        <ol className="list-none p-0 m-0 rounded-3xl border overflow-hidden" style={{ borderColor: "var(--tm-border)" }}>
          {LEADERS.map((p, i) => (
            <li key={p.rank}>
              {i > 0 && <hr className="tm-divider" />}
              <div className="flex items-center gap-4 px-5 py-4">
                <span
                  className="w-8 text-sm font-semibold tabular-nums text-[var(--tm-muted)]"
                  aria-label={`Rank ${p.rank}`}
                >
                  {String(p.rank).padStart(2, "0")}
                </span>
                <span className="flex-1 font-medium tracking-tight">{p.name}</span>
                <span className="text-sm tabular-nums text-[var(--tm-muted)]">{p.points}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
