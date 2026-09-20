import { useMemo, useState } from "react";
import { SeoHead } from "@/components/SeoHead";
import { getRegisteredColleges } from "@/data/colleges";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CollegeCompare() {
  const registry = useMemo(() => getRegisteredColleges(), []);
  const [a, setA] = useState(registry[0]?.id ?? "");
  const [b, setB] = useState(registry[2]?.id ?? registry[1]?.id ?? "");

  const left = useMemo(() => registry.find((c) => c.id === a), [a, registry]);
  const right = useMemo(() => registry.find((c) => c.id === b), [b, registry]);

  const rows: Array<{ label: string; va: string; vb: string }> =
    left && right
      ? [
          { label: "Full name", va: left.name, vb: right.name },
          { label: "Location", va: `${left.city}, ${left.state}`, vb: `${right.city}, ${right.state}` },
          { label: "Type", va: left.type, vb: right.type },
          {
            label: "NIRF (approx)",
            va: left.nirfApprox != null ? String(left.nirfApprox) : "—",
            vb: right.nirfApprox != null ? String(right.nirfApprox) : "—",
          },
          {
            label: "Fees (₹L / yr)",
            va: String(left.feesLakhPerYear),
            vb: String(right.feesLakhPerYear),
          },
          { label: "Exams", va: left.exams.join(", "), vb: right.exams.join(", ") },
          { label: "Branches", va: left.branches.join(", "), vb: right.branches.join(", ") },
          { label: "Highlights", va: left.highlights.join("; "), vb: right.highlights.join("; ") },
        ]
      : [];

  return (
    <div className="space-y-8">
      <SeoHead title="College Compare | Student Corner" path="/student-corner/college-compare" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">College Comparison</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Compare any two of {registry.length} registered institutes — fees, exams, branches, and more.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>College A</Label>
          <Select value={a} onValueChange={setA}>
            <SelectTrigger className="rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {registry.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.shortName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>College B</Label>
          <Select value={b} onValueChange={setB}>
            <SelectTrigger className="rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {registry.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.shortName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {left && right && (
        <div className="flex flex-wrap gap-2">
          {left.exams.map((e) => (
            <Badge key={`a-${e}`} variant="outline" className="rounded-full text-[10px]">
              A · {e}
            </Badge>
          ))}
          {right.exams.map((e) => (
            <Badge key={`b-${e}`} variant="secondary" className="rounded-full text-[10px]">
              B · {e}
            </Badge>
          ))}
        </div>
      )}

      <div className="rounded-3xl border border-border overflow-hidden">
        <div className="grid grid-cols-3 gap-0 bg-muted/40 text-xs font-medium uppercase tracking-wider text-muted-foreground px-4 py-3">
          <span>Parameter</span>
          <span>{left?.shortName}</span>
          <span>{right?.shortName}</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-3 gap-3 px-4 py-4 text-sm ${i > 0 ? "border-t border-border" : ""}`}
          >
            <span className="text-muted-foreground font-medium">{r.label}</span>
            <span>{r.va}</span>
            <span>{r.vb}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
