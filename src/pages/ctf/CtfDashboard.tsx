import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Flag, CheckCircle2, Lock, Search } from "lucide-react";
import { CTF_CHALLENGES } from "@/features/ctf/ctfChallenges";
import { getSolvedIds, getTotalScore } from "@/features/ctf/ctfStorage";
import { SeoHead } from "@/components/SeoHead";

const PER_PAGE = 12;

const TYPE_LABELS: Record<string, string> = {
  logic: "Logic",
  dsa: "DSA",
  encoding: "Encoding",
  "state-flow": "State & Flow",
  terminal: "Terminal",
  "time-behavior": "Time",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function CtfDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const solvedIds = getSolvedIds();
  const totalScore = getTotalScore();

  const filtered = useMemo(() => {
    let list = CTF_CHALLENGES;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") {
      list = list.filter((c) => c.type === typeFilter);
    }
    if (difficultyFilter !== "all") {
      list = list.filter((c) => c.difficulty === difficultyFilter);
    }
    return list;
  }, [search, typeFilter, difficultyFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  const totalPoints = CTF_CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = CTF_CHALLENGES.filter((c) => solvedIds.includes(c.id)).reduce(
    (sum, c) => sum + c.points,
    0
  );

  // JSON-LD structured data for CTF section
  useEffect(() => {
    const sampleChallenges = CTF_CHALLENGES.slice(0, 12);
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "CTF Challenges | TechMasterAI",
      description: "Capture the Flag challenges for developers. Logic puzzles, DSA problems, encoding tasks, terminal simulations, and time-based challenges. Sharpen algorithmic thinking—no inspect or devtools required.",
      url: "https://techmasterai.org/ctf",
      numberOfItems: CTF_CHALLENGES.length,
      itemListElement: sampleChallenges.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "LearningResource",
          name: c.title,
          description: c.description,
          url: `https://techmasterai.org/ctf/challenge/${c.id}`,
          learningResourceType: c.type,
          educationalLevel: c.difficulty,
        },
      })),
    };
    let el = document.getElementById("ctf-jsonld");
    if (el) el.remove();
    el = document.createElement("script");
    el.id = "ctf-jsonld";
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => el?.remove();
  }, []);

  return (
    <div className="space-y-8">
      <SeoHead
        title="CTF Challenges | Capture The Flag"
        description="1200+ CTF challenges for developers: logic puzzles, DSA problems, Base64/hex/ROT13/Caesar/XOR encoding, terminal simulations, and time-based challenges. Sharpen algorithmic thinking—no inspect or devtools required."
        path="/ctf"
        keywords="CTF, capture the flag, coding challenges, logic puzzles, DSA, algorithm challenges, Base64 decode, Caesar cipher, ROT13, XOR cipher, coding practice, TechMasterAI"
        ogType="website"
      />
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          <Flag className="h-8 w-8 text-primary" />
          Capture The Flag
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Logic puzzles, DSA challenges, encoding tasks, and more. Flags are derived from correct
          solutions—no inspect or devtools needed.
        </p>
        <div className="flex justify-center gap-6 text-sm flex-wrap">
          <span className="text-muted-foreground">
            Solved: <span className="font-semibold text-primary">{solvedIds.length}</span> /{" "}
            {CTF_CHALLENGES.length}
          </span>
          <span className="text-muted-foreground">
            Score: <span className="font-semibold text-primary">{totalScore}</span> / {totalPoints}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="all">All types</option>
          <option value="logic">Logic</option>
          <option value="dsa">DSA</option>
          <option value="encoding">Encoding</option>
          <option value="state-flow">State & Flow</option>
          <option value="terminal">Terminal</option>
          <option value="time-behavior">Time</option>
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => {
            setDifficultyFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="all">All difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No challenges match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {paginated.map((challenge) => {
            const solved = solvedIds.includes(challenge.id);
            return (
              <Link key={challenge.id} to={`/ctf/challenge/${challenge.id}`}>
                <Card
                  className={cn(
                    "transition-all hover:border-primary/50 hover:shadow-md h-full",
                    solved && "border-emerald-500/30 bg-emerald-500/5"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {solved ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
                          )}
                          {challenge.title}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {challenge.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0 items-end">
                        <Badge variant="outline" className={DIFFICULTY_COLORS[challenge.difficulty]}>
                          {challenge.difficulty}
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50">
                          {challenge.points} pts
                        </Badge>
                        <Badge variant="outline" className="bg-muted/50 text-xs">
                          {TYPE_LABELS[challenge.type] ?? challenge.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {totalPages > 1 && filtered.length > 0 && (
        <div className="flex justify-center pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                  className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
