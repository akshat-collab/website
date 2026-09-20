import { useMemo, useState } from "react";
import { SeoHead } from "@/components/SeoHead";
import { COLLEGES, EXAM_OPTIONS, type ExamType } from "@/data/colleges";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CutoffExplorer() {
  const examsWithData = useMemo(() => {
    const set = new Set<string>();
    COLLEGES.forEach((c) => Object.keys(c.cutoffs).forEach((e) => set.add(e)));
    return [...set].sort();
  }, []);

  const [exam, setExam] = useState<string>(examsWithData[0] ?? "JEE Main");

  const rows = useMemo(() => {
    return COLLEGES.filter((c) => c.cutoffs[exam as ExamType])
      .map((c) => ({ college: c, cut: c.cutoffs[exam as ExamType]! }))
      .sort((a, b) => a.cut.general - b.cut.general);
  }, [exam]);

  const accepting = useMemo(
    () => COLLEGES.filter((c) => c.exams.includes(exam as ExamType)),
    [exam]
  );

  return (
    <div className="space-y-8">
      <SeoHead title="Cutoffs | Student Corner" path="/student-corner/cutoffs" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Cutoff Explorer</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Indicative cutoffs for planning. {accepting.length} registered colleges accept{" "}
          <strong>{exam}</strong>. Verify on official counselling portals.
        </p>
      </div>

      <div className="max-w-xs space-y-1.5">
        <Label>Exam</Label>
        <Select value={exam} onValueChange={setExam}>
          <SelectTrigger className="rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(examsWithData.length ? examsWithData : EXAM_OPTIONS).map((e) => (
              <SelectItem key={e} value={e}>
                {e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {accepting.length > 0 && (
        <div className="rounded-2xl border border-border p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            Colleges accepting this exam
          </p>
          <div className="flex flex-wrap gap-1.5">
            {accepting.map((c) => (
              <Badge key={c.id} variant="outline" className="rounded-full font-normal text-[11px]">
                {c.shortName}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-border overflow-hidden">
        <div className="hidden sm:grid grid-cols-5 gap-2 px-4 py-3 bg-muted/40 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="col-span-2">College</span>
          <span>General</span>
          <span>OBC</span>
          <span>SC</span>
        </div>
        {rows.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">
            No numeric cutoff samples for this exam yet — see colleges that accept it above.
          </p>
        )}
        {rows.map(({ college, cut }, i) => (
          <div
            key={college.id}
            className={`grid sm:grid-cols-5 gap-2 px-4 py-4 text-sm ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className="sm:col-span-2">
              <p className="font-medium">{college.shortName}</p>
              <p className="text-xs text-muted-foreground">{cut.note}</p>
              <Badge variant="outline" className="mt-1 rounded-full text-[10px] sm:hidden">
                {college.type}
              </Badge>
            </div>
            <p>
              <span className="sm:hidden text-muted-foreground text-xs">GEN · </span>
              {cut.general.toLocaleString()}
            </p>
            <p>
              <span className="sm:hidden text-muted-foreground text-xs">OBC · </span>
              {cut.obc?.toLocaleString() ?? "—"}
            </p>
            <p>
              <span className="sm:hidden text-muted-foreground text-xs">SC · </span>
              {cut.sc?.toLocaleString() ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
