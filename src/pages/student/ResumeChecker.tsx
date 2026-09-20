import { useState } from "react";
import mammoth from "mammoth";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { checkResumeText, type ResumeCheckResult } from "@/features/student/resumeChecker";
import { toast } from "sonner";
import { FileUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResumeChecker() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeCheckResult | null>(null);

  const onFile = async (file: File | null) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".docx")) {
      toast.error("Only .docx files are supported");
      return;
    }
    setLoading(true);
    setFileName(file.name);
    try {
      const buffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });
      if (!value.trim()) {
        toast.error("Could not extract text from this DOCX");
        setResult(null);
        return;
      }
      setResult(checkResumeText(value));
      toast.success("Resume analyzed");
    } catch {
      toast.error("Failed to parse DOCX");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <SeoHead title="Resume Checker | Student Corner" path="/student-corner/resume-checker" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Resume Checker</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Upload a <strong>.docx</strong> only. Scored against fixed parameters (contact, education, skills, ATS, and more).
        </p>
      </div>

      <label className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border p-10 cursor-pointer hover:border-foreground/40 transition-colors bg-muted/20">
        <input
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        ) : (
          <FileUp className="h-8 w-8 text-muted-foreground" />
        )}
        <span className="text-sm font-medium">{fileName || "Drop or click to upload .docx"}</span>
        <span className="text-xs text-muted-foreground">DOCX parse only — PDF not supported</span>
      </label>

      {result && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border p-6 flex items-center gap-6">
            <div
              className={cn(
                "h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold",
                result.overall >= 75
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : result.overall >= 50
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
              )}
            >
              {result.overall}
            </div>
            <div>
              <p className="font-semibold tracking-tight">Overall score</p>
              <p className="text-sm text-muted-foreground">{result.wordCount} words extracted</p>
            </div>
          </div>

          <ul className="space-y-3">
            {result.breakdown.map((b) => (
              <li key={b.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm">{b.label}</p>
                    <p className="text-xs text-muted-foreground">Weight {b.weight}%</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{b.score}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground/80 transition-all"
                    style={{ width: `${b.score}%` }}
                  />
                </div>
                {b.tips.length > 0 && (
                  <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
                    {b.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
