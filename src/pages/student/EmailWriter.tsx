import { useMemo, useState } from "react";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Sparkles } from "lucide-react";

const TEMPLATES: Record<string, { subject: string; body: (p: Record<string, string>) => string }> = {
  professor: {
    subject: "Request for meeting regarding {{topic}}",
    body: (p) =>
      `Dear Professor ${p.name || "[Last Name]"},\n\nI hope this email finds you well. My name is ${p.student || "[Your Name]"}, a student in ${p.course || "[Course/Year]"}.\n\nI am writing to request a brief meeting to discuss ${p.topic || "[topic]"}. I am available on ${p.availability || "[days/times]"} and would greatly appreciate 15–20 minutes of your time.\n\nThank you for your consideration.\n\nSincerely,\n${p.student || "[Your Name]"}\n${p.email || "[email]"}`,
  },
  internship: {
    subject: "Application for {{role}} Internship — {{student}}",
    body: (p) =>
      `Dear ${p.name || "Hiring Manager"},\n\nI am writing to express my interest in the ${p.role || "[Role]"} internship at ${p.company || "[Company]"}. I am currently pursuing ${p.course || "[Degree]"} and have experience with ${p.skills || "[skills]"}.\n\nI have attached my resume for your review. I would welcome the opportunity to contribute and learn with your team.\n\nThank you for your time.\n\nBest regards,\n${p.student || "[Your Name]"}\n${p.email || "[email]"}\n${p.phone || "[phone]"}`,
  },
  admissions: {
    subject: "Enquiry about admission — {{program}}",
    body: (p) =>
      `Dear Admissions Office,\n\nI am ${p.student || "[Your Name]"}, interested in the ${p.program || "[Program]"} at ${p.company || "[College]"}.\n\nCould you please share details on eligibility, application deadlines, and required documents for the upcoming intake?\n\nThank you.\n\nRegards,\n${p.student || "[Your Name]"}\n${p.email || "[email]"}`,
  },
  recommendation: {
    subject: "Request for letter of recommendation",
    body: (p) =>
      `Dear Professor ${p.name || "[Last Name]"},\n\nI hope you are doing well. I am ${p.student || "[Your Name]"} from your ${p.course || "[course]"} class.\n\nI am applying to ${p.program || "[program/opportunity]"} and would be grateful if you could provide a letter of recommendation. The deadline is ${p.deadline || "[date]"}. I can share my resume and statement of purpose if helpful.\n\nThank you for your support.\n\nSincerely,\n${p.student || "[Your Name]"}`,
  },
};

function fill(template: string, p: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => p[k] || `{{${k}}}`);
}

export default function EmailWriter() {
  const [type, setType] = useState("professor");
  const [fields, setFields] = useState({
    name: "",
    student: "",
    email: "",
    phone: "",
    course: "",
    topic: "",
    availability: "",
    role: "",
    company: "",
    skills: "",
    program: "",
    deadline: "",
  });

  const generated = useMemo(() => {
    const t = TEMPLATES[type];
    if (!t) return { subject: "", body: "" };
    return { subject: fill(t.subject, fields), body: t.body(fields) };
  }, [type, fields]);

  const set = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));

  const copyAll = async () => {
    await navigator.clipboard.writeText(`Subject: ${generated.subject}\n\n${generated.body}`);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <SeoHead title="Email Writer | Student Corner" path="/student-corner/email-writer" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Email Writer</h1>
        <p className="text-muted-foreground mt-1 text-sm">Generate polished emails from templates — edit fields, then copy.</p>
      </div>

      <div className="space-y-4 rounded-3xl border border-border p-5 sm:p-6">
        <div className="space-y-2">
          <Label>Email type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor / mentor</SelectItem>
              <SelectItem value="internship">Internship application</SelectItem>
              <SelectItem value="admissions">College admissions enquiry</SelectItem>
              <SelectItem value="recommendation">Recommendation request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["student", "Your name"],
            ["email", "Your email"],
            ["name", "Recipient name"],
            ["course", "Course / year"],
            ["topic", "Topic / purpose"],
            ["role", "Role (internship)"],
            ["company", "Company / college"],
            ["skills", "Skills"],
            ["program", "Program"],
            ["deadline", "Deadline"],
            ["availability", "Your availability"],
            ["phone", "Phone"],
          ].map(([k, label]) => (
            <div key={k} className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{label}</Label>
              <Input
                className="rounded-xl"
                value={fields[k as keyof typeof fields]}
                onChange={(e) => set(k, e.target.value)}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <Button onClick={copyAll} className="rounded-full gap-2">
          <Sparkles className="h-4 w-4" />
          Generate & copy
        </Button>
      </div>

      <div className="space-y-3 rounded-3xl border border-border bg-muted/30 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Preview</p>
          <Button variant="ghost" size="sm" className="rounded-full gap-1" onClick={copyAll}>
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        </div>
        <p className="text-sm font-medium">Subject: {generated.subject}</p>
        <Textarea readOnly value={generated.body} className="min-h-[220px] rounded-2xl font-mono text-sm" />
      </div>
    </div>
  );
}
