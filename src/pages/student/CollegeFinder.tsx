import { useMemo, useState } from "react";
import { SeoHead } from "@/components/SeoHead";
import { EXAM_OPTIONS, getRegisteredColleges } from "@/data/colleges";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CollegeFinder() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [state, setState] = useState("all");
  const [exam, setExam] = useState("all");
  const [maxFees, setMaxFees] = useState("all");

  const registry = useMemo(() => getRegisteredColleges(), []);
  const states = useMemo(() => [...new Set(registry.map((c) => c.state))].sort(), [registry]);
  const types = useMemo(() => [...new Set(registry.map((c) => c.type))].sort(), [registry]);

  const results = useMemo(() => {
    return registry.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.city.toLowerCase().includes(q.toLowerCase()) ||
        c.shortName.toLowerCase().includes(q.toLowerCase());
      const matchType = type === "all" || c.type === type;
      const matchState = state === "all" || c.state === state;
      const matchExam = exam === "all" || c.exams.includes(exam as (typeof c.exams)[number]);
      const matchFees = maxFees === "all" || c.feesLakhPerYear <= Number(maxFees);
      return matchQ && matchType && matchState && matchExam && matchFees;
    });
  }, [q, type, state, exam, maxFees, registry]);

  return (
    <div className="space-y-8">
      <SeoHead title="College Finder | Student Corner" path="/student-corner/college-finder" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">College Finder</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {registry.length} registered institutes with entrance exams — filter by exam, state, type, and fees.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 rounded-3xl border border-border bg-card/40 p-4 sm:p-5">
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
          <Label className="text-xs">Search</Label>
          <Input
            className="rounded-full"
            placeholder="Name, city, or short name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Entrance exam</Label>
          <Select value={exam} onValueChange={setExam}>
            <SelectTrigger className="rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All exams</SelectItem>
              {EXAM_OPTIONS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All states</SelectItem>
              {states.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
          <Label className="text-xs">Max fees (₹ lakh / year)</Label>
          <Select value={maxFees} onValueChange={setMaxFees}>
            <SelectTrigger className="rounded-full max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">≤ 1</SelectItem>
              <SelectItem value="2">≤ 2</SelectItem>
              <SelectItem value="3">≤ 3</SelectItem>
              <SelectItem value="5">≤ 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{results.length} colleges</p>

      <ul className="space-y-3">
        {results.map((c) => (
          <li
            key={c.id}
            className="rounded-3xl border border-border p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:border-foreground/20 transition-colors bg-card/30"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold tracking-tight">{c.shortName}</h2>
                <Badge variant="outline" className="rounded-full text-[10px]">
                  {c.type}
                </Badge>
                {c.nirfApprox != null && (
                  <Badge variant="secondary" className="rounded-full text-[10px]">
                    NIRF ~{c.nirfApprox}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{c.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {c.city}, {c.state} · ₹{c.feesLakhPerYear}L / yr
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {c.exams.map((e) => (
                  <Badge
                    key={e}
                    className="rounded-full text-[10px] bg-foreground/5 text-foreground border border-border font-normal"
                  >
                    {e}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{c.highlights.join(" · ")}</p>
              <p className="text-xs mt-1.5">Branches: {c.branches.join(", ")}</p>
            </div>
            {c.website && (
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium underline-offset-4 hover:underline shrink-0"
              >
                Website
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
