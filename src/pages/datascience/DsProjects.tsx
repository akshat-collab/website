import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderKanban } from "lucide-react";
import { LEVEL8_CAPSTONES } from "@/data/datascience";
import { SeoHead } from "@/components/SeoHead";

const TOOLS = ["Python", "Pandas", "Scikit-learn", "NumPy", "Matplotlib"];

export default function DsProjects() {
  return (
    <div className="space-y-8 animate-fade-in">
      <SeoHead
        title="Projects | Data Science | TechMasterAI"
        description="Real-world capstone projects: Fraud Detection, Customer Churn, Recommendation Engine"
        path="/datascience/projects"
      />

      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">Portfolio-ready capstone projects from Level 8</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVEL8_CAPSTONES.map((project, i) => (
          <Card
            key={project.id}
            className="rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/30 group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderKanban className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="shrink-0">
                  {i === 0 ? "Medium" : i === 1 ? "Hard" : "Advanced"}
                </Badge>
              </div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">{project.businessProblem}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {TOOLS.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {project.requirements.slice(0, 3).map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    {r}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Unlocks in Level 8</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
