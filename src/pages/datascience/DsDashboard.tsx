import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, BookOpen, Trophy, Target, CheckCircle2 } from "lucide-react";
import { DS_COURSE_OUTLINE, DS_BADGES } from "@/data/datascience";
import { getOverallProgress } from "@/features/datascience/dsProgress";
import { hasBadge } from "@/features/datascience/dsStorage";
import { SeoHead } from "@/components/SeoHead";
import { DsAnimatedChart } from "@/components/datascience/DsAnimatedChart";
import { DsHeroVisual } from "@/components/datascience/DsHeroVisual";

export default function DsDashboard() {
  const progress = getOverallProgress();

  return (
    <div className="space-y-8">
      <SeoHead
        title="Professional Data Science | TechMasterAI"
        description="Complete Data Science track: Python → Analytics → Statistics → ML → Deployment. Certification-based, auto-gradable."
        path="/datascience"
      />

      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <DsHeroVisual />
        </div>
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          <img src="/ds-logo.svg" alt="" className="h-10 w-10" />
          <BarChart3 className="h-8 w-8 text-primary" />
          Professional Data Science
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Python Foundations → Advanced Python → Data Analytics → Statistics → Graph Theory → Machine Learning → Advanced ML → Capstone & Certification
        </p>
        <div className="flex justify-center gap-6 text-sm flex-wrap">
          <span className="text-muted-foreground">
            <span className="font-semibold text-primary">8</span> Levels
          </span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-primary">{progress.completedTopics}/{progress.totalTopics}</span> Topics
          </span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-primary">{progress.earnedBadges.length}/4</span> Badges
          </span>
        </div>
        <div className="max-w-xs mx-auto">
          <Progress value={progress.percent} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{progress.percent}% complete</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Track Visualization
          </CardTitle>
          <CardDescription>
            Visual overview of the 8-level learning path
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <DsAnimatedChart />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DS_COURSE_OUTLINE.levels.map((level) => (
          <Link key={level.id} to={`/datascience/level/${level.order}`}>
            <Card
              className="transition-all hover:border-primary/50 hover:shadow-md h-full"
              style={{ borderLeftWidth: 4, borderLeftColor: level.color }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: level.color }}
                      />
                      Level {level.order}: {level.title}
                    </CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {level.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {level.durationWeeks}w
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {level.topics.slice(0, 3).map((t) => (
                    <Badge key={t.id} variant="secondary" className="text-xs">
                      {t.title}
                    </Badge>
                  ))}
                  {level.topics.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{level.topics.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Badges
            </CardTitle>
            <CardDescription>
              Bronze (Python) → Silver (Analyst) → Gold (ML Engineer) → Platinum (Data Scientist)
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              {DS_BADGES.map((b) => (
                <Badge
                  key={b.id}
                  variant={hasBadge(b.id) ? "default" : "outline"}
                  className={hasBadge(b.id) ? "bg-amber-500/20 text-amber-600 border-amber-500/30" : ""}
                >
                  {hasBadge(b.id) && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {b.icon} {b.name}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Certification
            </CardTitle>
            <CardDescription>
              Capstone project + Proctored exam. Certificate & digital badge on completion.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Philosophy
          </CardTitle>
          <CardDescription className="space-y-2">
            <p>• Problem-solving first approach</p>
            <p>• Case-study driven learning</p>
            <p>• Code-first implementation</p>
            <p>• Industry-aligned projects</p>
            <p>• Portfolio-ready outputs</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
