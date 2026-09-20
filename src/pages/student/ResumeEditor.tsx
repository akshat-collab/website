import { useEffect, useMemo, useState } from "react";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download, Save } from "lucide-react";

const STORAGE_KEY = "techmaster_resume_draft";

interface ResumeDraft {
  name: string;
  email: string;
  phone: string;
  links: string;
  summary: string;
  education: string;
  experience: string;
  projects: string;
  skills: string;
}

const EMPTY: ResumeDraft = {
  name: "",
  email: "",
  phone: "",
  links: "",
  summary: "",
  education: "",
  experience: "",
  projects: "",
  skills: "",
};

function toPlain(d: ResumeDraft) {
  return [
    d.name,
    [d.email, d.phone, d.links].filter(Boolean).join(" | "),
    "",
    "SUMMARY",
    d.summary,
    "",
    "EDUCATION",
    d.education,
    "",
    "EXPERIENCE",
    d.experience,
    "",
    "PROJECTS",
    d.projects,
    "",
    "SKILLS",
    d.skills,
  ].join("\n");
}

export default function ResumeEditor() {
  const [draft, setDraft] = useState<ResumeDraft>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
    } catch {
      return EMPTY;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const preview = useMemo(() => toPlain(draft), [draft]);

  const set = (k: keyof ResumeDraft, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  const downloadTxt = () => {
    const blob = new Blob([preview], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${draft.name || "resume"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded resume .txt");
  };

  return (
    <div className="space-y-8">
      <SeoHead title="Resume Editor | Student Corner" path="/student-corner/resume-editor" />
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Resume Editor</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Edit sections live. Auto-saves in this browser. Export as plain text.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-full gap-2"
            onClick={() => {
              toast.success("Draft saved");
            }}
          >
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button className="rounded-full gap-2" onClick={downloadTxt}>
            <Download className="h-4 w-4" /> Export .txt
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-3xl border border-border p-5">
          {(
            [
              ["name", "Full name", false],
              ["email", "Email", false],
              ["phone", "Phone", false],
              ["links", "LinkedIn / GitHub", false],
              ["summary", "Summary", true],
              ["education", "Education", true],
              ["experience", "Experience", true],
              ["projects", "Projects", true],
              ["skills", "Skills", true],
            ] as const
          ).map(([k, label, multi]) => (
            <div key={k} className="space-y-1.5">
              <Label className="text-xs">{label}</Label>
              {multi ? (
                <Textarea
                  className="rounded-2xl min-h-[88px]"
                  value={draft[k]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={label}
                />
              ) : (
                <Input
                  className="rounded-xl"
                  value={draft[k]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={label}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-muted/20 p-6 lg:sticky lg:top-24 h-fit">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Preview</p>
          <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{preview || "Start typing…"}</pre>
        </div>
      </div>
    </div>
  );
}
