import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  BookOpen,
  Trophy,
  Target,
  CheckCircle2,
  Play,
  Clock,
  ChevronRight,
} from "lucide-react";
import { DS_COURSE_OUTLINE, DS_BADGES } from "@/data/datascience";
import {
  getOverallProgress,
  getResumeTopic,
  getCurrentLevelStatus,
  getSkillDistribution,
} from "@/features/datascience/dsProgress";
import { hasBadge } from "@/features/datascience/dsStorage";
import { SeoHead } from "@/components/SeoHead";
import { cn } from "@/lib/utils";

const TOTAL_WEEKS = DS_COURSE_OUTLINE.levels.reduce((s, l) => s + (l.durationWeeks ?? 0), 0);

export default function DsDashboard() {
  const progress = getOverallProgress();
  const resume = getResumeTopic();
  const currentLevel = getCurrentLevelStatus();
  const skills = getSkillDistribution();

  return (
    <div className="space-y-8 animate-fade-in">
      <SeoHead
        title="Professional Data Science | TechMasterAI"
        description="Complete Data Science track: Python → Analytics → Statistics → ML → Deployment. Certification-based, auto-gradable."
        path="/datascience"
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-purple-500/5 p-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('/ds-logo.svg')] bg-center bg-no-repeat opacity-[0.03]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <img src="/ds-logo.svg" alt="" className="h-12 w-12" />
              Professional Data Science Track
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Master Python, Analytics, Machine Learning, and Real-world Projects
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                ~{TOTAL_WEEKS} weeks to complete
              </span>
              {currentLevel && (
                <span className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: DS_COURSE_OUTLINE.levels.find((l) => l.id === currentLevel.levelId)?.color ?? "#3b82f6" }}
                  />
                  Level {currentLevel.levelOrder}: {currentLevel.levelTitle} ({currentLevel.percent}%)
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {resume ? (
                <Link to={`/datascience/level/${resume.levelOrder}/topic/${resume.topicId}`}>
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]">
                    <Play className="h-4 w-4" />
                    Resume Learning
                  </Button>
                </Link>
              ) : (
                <Link to="/datascience/curriculum">
                  <Button size="lg" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    View Curriculum
                  </Button>
                </Link>
              )}
              <Link to="/datascience/progress">
                <Button variant="outline" size="lg" className="gap-2">
                  View Progress
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{progress.percent}%</div>
              <p className="text-xs text-muted-foreground">Overall Complete</p>
            </div>
            <Progress value={progress.percent} className="h-2 rounded-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress.completedTopics} topics</span>
              <span>{progress.earnedBadges.length}/4 badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL DISTRIBUTION CHART */}
      <Card className="overflow-hidden border-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Skill Distribution
          </CardTitle>
          <CardDescription>Progress across learning domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((s, i) => (
              <div
                key={s.skill}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted/30"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="2"
                      strokeDasharray={`${s.value} 100`}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{s.value}%</span>
                </div>
                <span className="text-xs font-medium text-center">{s.skill}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QUICK LINKS: Curriculum + Projects + Badges */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/datascience/curriculum">
          <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30 cursor-pointer group">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle>Curriculum</CardTitle>
              <CardDescription>8-level roadmap with timeline view</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/datascience/projects">
          <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30 cursor-pointer group">
            <CardHeader>
              <Target className="h-8 w-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle>Projects</CardTitle>
              <CardDescription>Fraud Detection, Churn, Recommendations</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link to="/datascience/certifications">
          <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30 cursor-pointer group">
            <CardHeader>
              <Trophy className="h-8 w-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Badges & professional certificate</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* BADGES PREVIEW */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Badge Progression
          </CardTitle>
          <CardDescription>Beginner → Analyst → ML Engineer → Data Scientist</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {DS_BADGES.map((b) => {
              const earned = hasBadge(b.id);
              return (
                <div
                  key={b.id}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all",
                    earned
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400"
                      : "bg-muted/30 border-border text-muted-foreground opacity-75"
                  )}
                >
                  {earned ? <CheckCircle2 className="h-4 w-4" /> : <span className="w-4 h-4 rounded-full border-2 border-muted-foreground" />}
                  <span className="text-lg">{b.icon}</span>
                  <span className="font-medium">{b.name}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
