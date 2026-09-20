/**
 * Resume checker — fixed parameters only (DOCX text analysis)
 */

export interface ResumeCheckParam {
  id: string;
  label: string;
  description: string;
  weight: number;
  /** Returns score 0–100 */
  score: (text: string) => number;
  tips: string[];
}

const has = (text: string, re: RegExp) => re.test(text);
const count = (text: string, re: RegExp) => (text.match(re) || []).length;

export const RESUME_PARAMS: ResumeCheckParam[] = [
  {
    id: "contact",
    label: "Contact info",
    description: "Email, phone, LinkedIn / GitHub",
    weight: 12,
    score: (t) => {
      let s = 0;
      if (has(t, /[\w.+-]+@[\w.-]+\.\w{2,}/i)) s += 40;
      if (has(t, /(\+?\d[\d\s()-]{8,}\d)/)) s += 30;
      if (has(t, /linkedin\.com|github\.com/i)) s += 30;
      return Math.min(100, s);
    },
    tips: ["Add a professional email", "Include phone with country code", "Link LinkedIn and GitHub"],
  },
  {
    id: "summary",
    label: "Summary / objective",
    description: "Short professional summary near the top",
    weight: 10,
    score: (t) => {
      if (has(t, /summary|objective|profile|about me/i)) return 100;
      const first = t.slice(0, 400);
      return first.split(/\s+/).length >= 25 ? 55 : 20;
    },
    tips: ["Add a 2–3 line Summary section", "Mention role target and key strengths"],
  },
  {
    id: "education",
    label: "Education",
    description: "Degree, college, year, CGPA/percentage",
    weight: 14,
    score: (t) => {
      let s = 0;
      if (has(t, /education|b\.?tech|b\.?e\.?|bachelor|master|m\.?tech|degree/i)) s += 40;
      if (has(t, /university|institute|college|iit|nit|iiit/i)) s += 30;
      if (has(t, /cgpa|gpa|%|percentage|20\d{2}/i)) s += 30;
      return Math.min(100, s);
    },
    tips: ["List degree + institution + graduation year", "Include CGPA if competitive"],
  },
  {
    id: "experience",
    label: "Experience / projects",
    description: "Internships, jobs, or academic projects with impact",
    weight: 20,
    score: (t) => {
      let s = 0;
      if (has(t, /experience|internship|project|worked|developed|built/i)) s += 35;
      const bullets = count(t, /^[\s]*[-•*]/gm) + count(t, /\n[\s]*[-•*]/g);
      if (bullets >= 3) s += 35;
      if (has(t, /\d+%|\d+\+|users|latency|revenue|improved|reduced/i)) s += 30;
      return Math.min(100, s);
    },
    tips: ["Use bullet points with action verbs", "Quantify impact (%, users, time saved)"],
  },
  {
    id: "skills",
    label: "Skills section",
    description: "Technical and soft skills listed clearly",
    weight: 14,
    score: (t) => {
      let s = 0;
      if (has(t, /skills|technologies|tech stack|languages/i)) s += 40;
      const tech = count(
        t,
        /\b(python|java|javascript|typescript|react|node|sql|c\+\+|html|css|aws|docker|git|ml|pandas)\b/gi
      );
      s += Math.min(60, tech * 8);
      return Math.min(100, s);
    },
    tips: ["Group skills (Languages, Frameworks, Tools)", "Match skills to the job description"],
  },
  {
    id: "length",
    label: "Length & density",
    description: "Ideal ~400–900 words for early career",
    weight: 10,
    score: (t) => {
      const words = t.trim().split(/\s+/).filter(Boolean).length;
      if (words < 150) return 25;
      if (words < 300) return 55;
      if (words <= 900) return 100;
      if (words <= 1200) return 70;
      return 40;
    },
    tips: ["Keep to 1 page if <3 years experience", "Cut fluff; keep impact"],
  },
  {
    id: "formatting",
    label: "Structure keywords",
    description: "Clear section headings",
    weight: 10,
    score: (t) => {
      const sections = ["education", "experience", "project", "skill", "achievement", "certification"].filter((k) =>
        new RegExp(k, "i").test(t)
      );
      return Math.min(100, sections.length * 20);
    },
    tips: ["Use standard headings: Education, Experience, Projects, Skills"],
  },
  {
    id: "ats",
    label: "ATS-friendly text",
    description: "Avoid tables/graphics-only content (text extractable)",
    weight: 10,
    score: (t) => {
      const words = t.trim().split(/\s+/).filter(Boolean).length;
      if (words < 80) return 15;
      if (has(t, /\t{3,}|_{5,}/)) return 50;
      return words > 200 ? 95 : 70;
    },
    tips: ["Prefer simple layouts over text boxes", "Ensure DOCX text is selectable"],
  },
];

export interface ResumeCheckResult {
  overall: number;
  breakdown: Array<{
    id: string;
    label: string;
    score: number;
    weight: number;
    weighted: number;
    tips: string[];
  }>;
  wordCount: number;
}

export function checkResumeText(text: string): ResumeCheckResult {
  const clean = text.replace(/\s+/g, " ").trim();
  const wordCount = clean ? clean.split(" ").length : 0;
  const breakdown = RESUME_PARAMS.map((p) => {
    const score = wordCount === 0 ? 0 : p.score(text);
    return {
      id: p.id,
      label: p.label,
      score,
      weight: p.weight,
      weighted: (score * p.weight) / 100,
      tips: score < 70 ? p.tips : [],
    };
  });
  const totalWeight = RESUME_PARAMS.reduce((s, p) => s + p.weight, 0);
  const overall = Math.round(breakdown.reduce((s, b) => s + b.weighted, 0) * (100 / totalWeight));
  return { overall, breakdown, wordCount };
}
