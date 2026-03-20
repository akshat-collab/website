import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BarChart3, Target } from "lucide-react";
import { DS_COURSE_OUTLINE } from "@/data/datascience";
import {
  getOverallProgress,
  getSkillDistribution,
  getLevelProgress,
} from "@/features/datascience/dsProgress";
import { SeoHead } from "@/components/SeoHead";

export default function DsProgressPage() {
  const progress = getOverallProgress();
  const skills = getSkillDistribution();

  return (
    <div className="space-y-8 animate-fade-in">
      <SeoHead
        title="Progress | Data Science | TechMasterAI"
        description="Track your learning progress across all levels and skills"
        path="/datascience/progress"
      />

      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground mt-1">Your learning report and skill distribution</p>
      </div>

      {/* Overall Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.percent}%</p>
                <p className="text-sm text-muted-foreground">Overall Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/15 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {progress.completedTopics}/{progress.totalTopics}
                </p>
                <p className="text-sm text-muted-foreground">Topics Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {progress.earnedBadges.length}/4
                </p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Progress Bar */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>Track completion across all 8 levels</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress.percent} className="h-4 rounded-full" />
          <p className="text-sm text-muted-foreground mt-2">{progress.completedTopics} of {progress.totalTopics} topics completed</p>
        </CardContent>
      </Card>

      {/* Skill Distribution Chart */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Skill Distribution</CardTitle>
          <CardDescription>Progress by learning domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{s.skill}</span>
                  <span className="text-muted-foreground">{s.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.value}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Level-by-Level */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>Completion per level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {DS_COURSE_OUTLINE.levels.map((level) => {
              const prog = getLevelProgress(level.id);
              return (
                <div key={level.id} className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: level.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Level {level.order}: {level.title}</p>
                    <Progress value={prog.percent} className="h-2 mt-1 rounded-full" />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{prog.percent}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
