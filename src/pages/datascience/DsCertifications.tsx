import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DS_BADGES } from "@/data/datascience";
import { hasBadge } from "@/features/datascience/dsStorage";
import { SeoHead } from "@/components/SeoHead";

export default function DsCertifications() {
  return (
    <div className="space-y-8 animate-fade-in">
      <SeoHead
        title="Certifications | Data Science | TechMasterAI"
        description="Earn badges and professional certificate: Python → Analyst → ML Engineer → Data Scientist"
        path="/datascience/certifications"
      />

      <div>
        <h1 className="text-3xl font-bold">Certifications</h1>
        <p className="text-muted-foreground mt-1">Badges and professional certificate</p>
      </div>

      {/* Badge Progression */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Badge Progression
          </CardTitle>
          <CardDescription>Unlock badges as you complete levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DS_BADGES.map((b) => {
              const earned = hasBadge(b.id);
              return (
                <Card
                  key={b.id}
                  className={cn(
                    "rounded-xl overflow-hidden transition-all duration-300",
                    earned
                      ? "border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/10"
                      : "opacity-75 border-border"
                  )}
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                          earned ? "bg-amber-500/20" : "bg-muted"
                        )}
                      >
                        {earned ? <CheckCircle2 className="h-8 w-8 text-amber-500" /> : <Lock className="h-8 w-8 text-muted-foreground" />}
                      </div>
                      <span className="text-4xl" aria-hidden>{b.icon}</span>
                      <div>
                        <p className="font-semibold">{b.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{b.description}</p>
                      </div>
                      <Badge variant={earned ? "default" : "outline"} className={earned ? "bg-amber-500/20 text-amber-600 border-amber-500/30" : ""}>
                        {earned ? "Earned" : "Locked"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview */}
      <Card className="rounded-2xl border-2 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Professional Data Scientist Certificate
          </CardTitle>
          <CardDescription>Earned upon completing the full track + Capstone + Proctored Exam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-12 text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold">Certificate Preview</p>
            <p className="text-sm text-muted-foreground mt-1">Complete all 8 levels, 1 capstone project, and pass the proctored exam to unlock</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

