import { Link } from "react-router-dom";

const CHALLENGES = [
  {
    title: "DSA Practice",
    status: "Open",
    category: "Practice",
    prize: "Skill growth",
    href: "/dsa/problems",
  },
  {
    title: "CTF Capture the Flag",
    status: "Open",
    category: "Security",
    prize: "Scoreboard points",
    href: "/ctf",
  },
  {
    title: "Data Science Track",
    status: "Track",
    category: "ML",
    prize: "Certificate",
    href: "/datascience",
  },
  {
    title: "Type Forge",
    status: "Open",
    category: "Typing",
    prize: "Speed & accuracy",
    href: "/typeforge",
  },
];

export function LandingChallenges() {
  return (
    <section
      id="challenges"
      className="scroll-mt-8 px-6 py-24 sm:py-32"
      style={{ background: "var(--tm-bg-alt)" }}
      aria-labelledby="challenges-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="challenges-heading"
          className="text-3xl sm:text-5xl tracking-tight mb-12 sm:mb-16"
          style={{ letterSpacing: "-0.04em" }}
        >
          Real problems. Real prizes.
        </h2>

        <ul className="list-none p-0 m-0">
          {CHALLENGES.map((c, i) => (
            <li key={c.title}>
              {i > 0 && <hr className="tm-divider" />}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 sm:py-7">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-1 text-sm text-[var(--tm-muted)]">
                    <span>{c.status}</span>
                    <span className="mx-2 text-[var(--tm-border)]">·</span>
                    {c.category}
                  </p>
                </div>
                <div className="text-sm font-medium text-[var(--tm-text)] sm:w-40 sm:text-right shrink-0">
                  {c.prize}
                </div>
                <Link to={c.href} className="tm-btn tm-btn-primary shrink-0 !py-2.5 !px-5 text-sm">
                  Join
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
