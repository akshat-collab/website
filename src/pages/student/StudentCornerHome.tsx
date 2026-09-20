import { Link } from "react-router-dom";
import { SeoHead } from "@/components/SeoHead";
import { COLLEGES, EXAM_OPTIONS } from "@/data/colleges";
import { Mail, Search, GitCompare, BarChart3, FileCheck, FilePenLine } from "lucide-react";

const TOOLS = [
  {
    to: "/student-corner/email-writer",
    title: "Email Writer",
    desc: "Draft professional emails for professors, HRs, and admissions.",
    icon: Mail,
  },
  {
    to: "/student-corner/college-finder",
    title: "College Finder",
    desc: `${COLLEGES.length}+ registered colleges with entrance exams.`,
    icon: Search,
  },
  {
    to: "/student-corner/college-compare",
    title: "College Comparison",
    desc: "Side-by-side fees, NIRF, branches, and cutoffs.",
    icon: GitCompare,
  },
  {
    to: "/student-corner/cutoffs",
    title: "Cutoff Explorer",
    desc: `Indicative cutoffs across ${EXAM_OPTIONS.length} exams.`,
    icon: BarChart3,
  },
  {
    to: "/student-corner/resume-checker",
    title: "Resume Checker",
    desc: "Upload a .docx and score against fixed quality parameters.",
    icon: FileCheck,
  },
  {
    to: "/student-corner/resume-editor",
    title: "Resume Editor",
    desc: "Build and edit a clean one-page resume, then export text.",
    icon: FilePenLine,
  },
];

export default function StudentCornerHome() {
  return (
    <div className="space-y-10">
      <SeoHead
        title="Student Corner | TechMaster"
        description="Email writer, college finder, cutoffs, resume checker and editor for students."
        path="/student-corner"
      />
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
          Student Corner
        </p>
        <h1
          className="text-3xl sm:text-4xl font-semibold tracking-tight"
          style={{ letterSpacing: "-0.04em" }}
        >
          Tools between class and career.
        </h1>
        <p className="mt-3 text-muted-foreground text-base leading-relaxed">
          Use the sidebar to open any tool. Browse {COLLEGES.length} registered colleges and their
          entrance exams, compare institutes, check cutoffs, and polish your resume.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="group rounded-3xl border border-border bg-card/40 p-6 transition-all hover:border-foreground/25 hover:shadow-md"
            >
              <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-semibold tracking-tight text-lg">{t.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-3xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Exams covered</p>
        <p>{EXAM_OPTIONS.join(" · ")}</p>
        <p className="mt-3 text-xs">
          Cutoffs are indicative samples for planning only — always verify with JoSAA, MCC, state
          counselling, and college websites.
        </p>
      </div>
    </div>
  );
}
